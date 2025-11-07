import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';
import Avatar from '@/Components/Avatar';
import toast from 'react-hot-toast';

interface Chat {
    id: number;
    name: string;
    other_user: {
        id: number;
        name: string;
        avatar: string;
    };
    last_message: {
        id: number;
        message: string | null;
        has_attachments: boolean;
        sender_id: number;
        created_at: string;
    } | null;
    unread_count: number;
    created_at: string;
    updated_at: string;
}

interface Message {
    id: number;
    message: string | null;
    sender_id: number;
    receiver_id: number;
    sender: {
        id: number;
        name: string;
        avatar: string;
    };
    attachments: Array<{
        id: number;
        file_path: string;
        file_name: string;
        file_size: number;
        mime_type: string;
    }>;
    is_read: boolean;
    created_at: string;
    created_at_human: string;
}

interface ChatIndexProps {
    chats: Chat[];
}

// Helper function to extract error message from response
const getErrorMessage = async (response: Response, defaultMessage: string): Promise<string> => {
    try {
        const data = await response.json();
        // Try different possible error message formats
        if (data.message) return data.message;
        if (data.error) return data.error;
        if (data.errors && typeof data.errors === 'object') {
            // Laravel validation errors
            const firstError = Object.values(data.errors)[0];
            if (Array.isArray(firstError) && firstError.length > 0) {
                return firstError[0] as string;
            }
            return String(firstError);
        }
        if (typeof data === 'string') return data;
    } catch (e) {
        // If JSON parsing fails, use default message
    }
    return defaultMessage;
};

const ChatIndex: React.FC<ChatIndexProps> = ({ chats: initialChats }) => {
    const { auth } = usePage().props;
    const currentUser = auth?.user as any;
    const [chats, setChats] = useState<Chat[]>(initialChats || []);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState('');
    const [attachments, setAttachments] = useState<string[]>([]);
    const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]); // Store files for upload
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = (force = false) => {
        const container = messagesContainerRef.current;
        if (!container) return;

        // Check if user is already near the bottom (within 100px)
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

        // Only auto-scroll if user is near bottom or force is true (e.g., when sending a new message)
        if (force || isNearBottom) {
            container.scrollTop = container.scrollHeight;
        }
    };

    useEffect(() => {
        // Only auto-scroll when messages change if user is at bottom
        // This prevents scrolling when loading old messages or polling
        scrollToBottom(false);
    }, [messages]);

    useEffect(() => {
        if (selectedChatId) {
            loadChat();
            // Scroll to bottom when a new chat is selected (after a brief delay to allow DOM update)
            setTimeout(() => scrollToBottom(true), 100);
        }
    }, [selectedChatId]);

    useEffect(() => {
        if (!selectedChatId) return;

        // Poll for new messages every 20 seconds
        const interval = setInterval(() => {
            loadChat();
        }, 20000);

        return () => clearInterval(interval);
    }, [selectedChatId]);

    const loadChatsList = async () => {
        // Chat list is loaded from initial props, no need to reload via API
        // This function is kept for future use if needed
    };

    const loadChat = async () => {
        if (!selectedChatId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/chat/${selectedChatId}`, {
                credentials: 'same-origin',
            });
            const data = await response.json();
            setSelectedChat(data.chat);
            setMessages(data.messages);
            // unread_count and other_user are now included in the response
            // Messages are automatically marked as read by the backend
        } catch (error) {
            console.error('Error loading chat:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newPreviewUrls: string[] = [];
        const newFiles: File[] = [];

        for (const file of Array.from(files)) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                toast.error('Only image files are allowed (jpg, png, gif, webp)');
                continue;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                continue;
            }

            // Create local preview URL immediately (no upload needed)
            const previewUrl = URL.createObjectURL(file);
            console.log('Created preview URL:', previewUrl, 'for file:', file.name, 'type:', file.type);
            newPreviewUrls.push(previewUrl);
            newFiles.push(file);
        }

        // Show preview immediately using local URLs
        if (newPreviewUrls.length > 0) {
            console.log('Setting attachments:', [...attachments, ...newPreviewUrls]);
            setAttachments([...attachments, ...newPreviewUrls]);
            setAttachmentFiles([...attachmentFiles, ...newFiles]);
        }
    };

    const handleSendMessage = async () => {
        if ((!messageText.trim() && attachments.length === 0) || !selectedChatId || isSending) {
            return;
        }

        setIsSending(true);
        try {
            // Get receiver_id from selectedChat.other_user
            const receiverId = selectedChat?.other_user?.id;

            if (!receiverId) {
                toast.error('Cannot send message: receiver information is missing');
                setIsSending(false);
                return;
            }

            // Upload attachments first if there are any files
            const uploadedAttachmentUrls: Array<{ url: string; path: string }> = [];
            if (attachmentFiles.length > 0) {
                for (const file of attachmentFiles) {
                    const formData = new FormData();
                    formData.append('attachment', file);

                    try {
                        const uploadResponse = await fetch('/api/chat/upload-attachment', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                            },
                            credentials: 'same-origin',
                            body: formData,
                        });

                        if (!uploadResponse.ok) {
                            const errorMessage = await getErrorMessage(uploadResponse, 'Failed to upload attachment');
                            throw new Error(errorMessage);
                        }

                        const uploadData = await uploadResponse.json();
                        uploadedAttachmentUrls.push({
                            url: uploadData.url,
                            path: uploadData.path
                        });
                    } catch (error) {
                        console.error('Error uploading attachment:', error);
                        const errorMessage = error instanceof Error ? error.message : 'Failed to upload attachment';
                        toast.error(errorMessage);
                        setIsSending(false);
                        return;
                    }
                }
            }

            const response = await fetch(`/api/chat/${selectedChatId}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    message: messageText.trim() || null,
                    receiver_id: receiverId,
                    attachments: uploadedAttachmentUrls,
                }),
            });

            if (!response.ok) {
                const errorMessage = await getErrorMessage(response, 'Failed to send message');
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Clean up local preview URLs
            attachments.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });

            // Clear input immediately
            setMessageText('');
            setAttachments([]);
            setAttachmentFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // Reload chat to refresh messages and ensure attachments are properly loaded
            await loadChat();

            // Force scroll to bottom when sending a new message
            setTimeout(() => scrollToBottom(true), 100);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
            toast.error(errorMessage);
        } finally {
            setIsSending(false);
        }
    };

    const removeAttachment = (index: number) => {
        // Revoke the object URL if it's a local preview
        const urlToRemove = attachments[index];
        if (urlToRemove && urlToRemove.startsWith('blob:')) {
            URL.revokeObjectURL(urlToRemove);
        }
        setAttachments(attachments.filter((_, i) => i !== index));
        setAttachmentFiles(attachmentFiles.filter((_, i) => i !== index));
    };

    const getLastMessagePreview = (chat: Chat) => {
        if (!chat.last_message) return 'No messages yet';
        if (chat.last_message.has_attachments && !chat.last_message.message) {
            return '📎 Attachment';
        }
        return chat.last_message.message || '📎 Attachment';
    };

    return (
        <DashboardLayout activeTab="Chat" metaTitle="Chat">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mb-md-5">Chat</h2>
                </div>
            </div>
            <div className="row">
                {/* Chat List Sidebar */}
                <div className="col-lg-4">
                    <div className="card border" style={{ height: '600px', overflowY: 'auto' }}>
                        <div className="card-body p-0">
                            {chats.length === 0 ? (
                                <div className="p-4 text-center text-muted">
                                    No conversations yet
                                </div>
                            ) : (
                                chats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => setSelectedChatId(chat.id)}
                                        className={`p-3 border-bottom cursor-pointer`}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedChatId === chat.id ? '#f5f5f5' : 'transparent'
                                        }}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <Avatar
                                                image_url={chat.other_user.avatar}
                                                initial_name={chat.other_user.name}
                                                size="sm"
                                            />
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <h6 className="mb-0">{chat.other_user.name}</h6>
                                                    {chat.unread_count > 0 && (
                                                        <span className="badge bg-primary rounded-pill">
                                                            {chat.unread_count}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mb-0 text-muted small" style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {getLastMessagePreview(chat)}
                                                </p>
                                                {chat.last_message && (
                                                    <small className="text-muted">
                                                        {new Date(chat.last_message.created_at).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </small>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat Conversation */}
                <div className="col-lg-8">
                    {selectedChatId && selectedChat ? (
                        <div className="card border" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
                            {/* Header */}
                            <div className="card-header border-bottom d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <Avatar
                                        image_url={selectedChat.other_user.avatar}
                                        initial_name={selectedChat.other_user.name}
                                        size="sm"
                                    />
                                    <div>
                                        <h6 className="mb-0">{selectedChat.other_user.name}</h6>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        // Dispatch event to open chat in popup
                                        const event = new CustomEvent('openChatPopup', {
                                            detail: {
                                                chatId: selectedChatId,
                                                otherUser: selectedChat.other_user
                                            }
                                        });
                                        window.dispatchEvent(event);
                                    }}
                                    className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                                    title="Open in popup"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span className="d-none d-md-inline">Open in Popup</span>
                                </button>
                            </div>

                            {/* Messages */}
                            <div ref={messagesContainerRef} className="card-body flex-grow-1 overflow-auto p-3">
                                {isLoading && messages.length === 0 ? (
                                    <div className="text-center text-muted">Loading...</div>
                                ) : messages.length === 0 ? (
                                    <div className="text-center text-muted">No messages yet. Start the conversation!</div>
                                ) : (
                                    messages.map((message) => {
                                        const isOwnMessage = message.sender_id === currentUser?.id;
                                        return (
                                            <div
                                                key={message.id}
                                                className={`mb-3 d-flex ${isOwnMessage ? 'justify-content-end' : 'justify-content-start'}`}
                                            >
                                                <div
                                                    className={`p-3 rounded ${isOwnMessage ? 'bg-primary text-white' : ''}`}
                                                    style={{
                                                        maxWidth: '70%',
                                                        backgroundColor: !isOwnMessage ? '#f5f5f5' : undefined
                                                    }}
                                                >
                                                    {!isOwnMessage && (
                                                        <div className="small mb-1" style={{ opacity: 0.8 }}>
                                                            {message.sender.name}
                                                        </div>
                                                    )}
                                                    {message.attachments.length > 0 && (
                                                        <div className="mb-2">
                                                            {message.attachments.map((attachment) => (
                                                                <img
                                                                    key={attachment.id}
                                                                    src={attachment.file_path}
                                                                    alt={attachment.file_name}
                                                                    className="img-fluid rounded"
                                                                    style={{ maxHeight: '200px' }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                    {message.message && <div>{message.message}</div>}
                                                    <div className="small mt-1" style={{ opacity: 0.7 }}>
                                                        {message.created_at_human}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Attachments Preview */}
                            {attachments.length > 0 && (
                                <div className="px-3 py-2 border-top d-flex gap-2 flex-wrap" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                                    {attachments.map((url, index) => (
                                        <div key={`preview-${index}-${url}`} className="position-relative" style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                                            <img
                                                key={`img-${index}-${url}`}
                                                src={url}
                                                alt={`Attachment ${index + 1}`}
                                                className="rounded"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    border: '1px solid #dee2e6',
                                                    display: 'block',
                                                    backgroundColor: '#f8f9fa',
                                                    minWidth: '80px',
                                                    minHeight: '80px'
                                                }}
                                                onError={(e) => {
                                                    console.error('Failed to load preview image:', url);
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                                onLoad={(e) => {
                                                    console.log('Preview image loaded successfully:', url);
                                                    e.currentTarget.style.display = 'block';
                                                }}
                                            />
                                            <button
                                                onClick={() => removeAttachment(index)}
                                                className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle"
                                                style={{ width: '20px', height: '20px', padding: 0, fontSize: '12px', transform: 'translate(30%, -30%)', zIndex: 10 }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Input */}
                            <div className="card-footer border-top p-3">
                                <div className="d-flex gap-2 align-items-center">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                        multiple
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="btn btn-text btn-sm"
                                        title="Upload attachment"
                                    >
                                        📎
                                    </button>
                                    <textarea
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                        placeholder="Type a message..."
                                        className="form-control"
                                        rows={1}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={(!messageText.trim() && attachments.length === 0) || isSending}
                                        className="btn btn-primary"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card border" style={{ height: '600px' }}>
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <div className="text-center text-muted">
                                    <h5>Select a conversation to start chatting</h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ChatIndex;

