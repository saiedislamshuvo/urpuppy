import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import Avatar from './Avatar';
import toast from 'react-hot-toast';

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

interface Chat {
    id: number;
    name: string;
    other_user: {
        id: number;
        name: string;
        avatar: string;
    };
}

interface OtherUser {
    id: number;
    name: string;
    avatar: string;
}

interface FloatingChatPopupProps {
    chatId: number | null;
    initialOtherUser?: OtherUser | null;
    onMinimize: () => void;
    onClose: () => void;
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

const FloatingChatPopup: React.FC<FloatingChatPopupProps> = ({ chatId, initialOtherUser, onMinimize, onClose }) => {
    const { auth } = usePage().props;
    const currentUser = auth?.user as any;
    // Store the receiver ID from initialOtherUser to persist it
    const receiverIdRef = useRef<number | null>(initialOtherUser?.id || null);
    const [chat, setChat] = useState<Chat | null>(initialOtherUser ? {
        id: chatId || 0,
        name: '',
        other_user: initialOtherUser
    } : null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState('');
    const [attachments, setAttachments] = useState<string[]>([]);
    const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]); // Store files for upload
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (chatId) {
            // Store receiver ID from initialOtherUser
            if (initialOtherUser?.id) {
                receiverIdRef.current = initialOtherUser.id;
            }
            // If we have initialOtherUser, set chat immediately to show header
            if (initialOtherUser) {
                setChat({
                    id: chatId,
                    name: '',
                    other_user: initialOtherUser
                });
            }
            loadChat();
        } else {
            // Reset chat when chatId is null
            setChat(null);
            setMessages([]);
            receiverIdRef.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!chatId) return;

        // Poll for new messages every 10 seconds
        const interval = setInterval(() => {
            loadChat();
        }, 10000);

        return () => clearInterval(interval);
    }, [chatId]);

    const loadChat = async () => {
        if (!chatId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/chat/${chatId}`, {
                credentials: 'same-origin',
            });
            if (!response.ok) {
                throw new Error('Failed to load chat');
            }
            const data = await response.json();
            // Merge with initial other_user if available
            // Use other_user from response if available, otherwise use initialOtherUser or chat.other_user
            const otherUser = data.other_user || data.chat?.other_user || initialOtherUser;

            if (data.chat) {
                // Update chat with other_user from response
                setChat({
                    ...data.chat,
                    other_user: otherUser || data.chat.other_user
                });
                // Update receiver ID if we get it from backend
                if (otherUser?.id) {
                    receiverIdRef.current = otherUser.id;
                } else if (data.chat.other_user?.id) {
                    receiverIdRef.current = data.chat.other_user.id;
                }
            } else if (initialOtherUser && chatId) {
                // Keep the initial other_user if chat data doesn't have it
                setChat({
                    id: chatId,
                    name: '',
                    other_user: initialOtherUser
                });
            }
            setMessages(data.messages || []);
        } catch (error) {
            console.error('Error loading chat:', error);
            // If chat doesn't exist or has no messages, still allow sending
            // The chat object will be created when first message is sent
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
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                toast.error('Only image files are allowed (jpg, png, gif, webp)');
                continue;
            }

            // Validate file size (5MB)
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
        if ((!messageText.trim() && attachments.length === 0) || !chatId || isSending) {
            return;
        }

        setIsSending(true);
        try {
            // Get receiver_id from ref (persisted from initialOtherUser) or chat.other_user or initialOtherUser
            const receiverId = receiverIdRef.current || chat?.other_user?.id || (initialOtherUser?.id);

            if (!receiverId) {
                toast.error('Cannot send message: receiver information is missing');
                setIsSending(false);
                return;
            }

            // Ensure receiverId is not the current user
            if (receiverId === currentUser?.id) {
                toast.error('Cannot send message: receiver ID is the same as sender');
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

            const response = await fetch(`/api/chat/${chatId}/message`, {
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

            // Always reload chat to ensure attachments are properly loaded
            await loadChat();

            setMessageText('');
            setAttachments([]);
            setAttachmentFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
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

    if (!chatId) {
        return (
            <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#666',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}>
                    <img
                        src="/images/svgs/icon-mail-dark.svg"
                        alt="Chat"
                        width="40"
                        height="40"
                        style={{ opacity: 0.5 }}
                    />
                </div>
                <h5 style={{ marginBottom: '10px', color: '#333', fontWeight: '600' }}>
                    No chat selected
                </h5>
                <p style={{ margin: 0, color: '#999', fontSize: '14px' }}>
                    Click a chat button to start a conversation
                </p>
            </div>
        );
    }

    // If chat is loading, show interface with input area (don't block typing)
    // If chat hasn't loaded yet, show interface to allow sending first message
    if (!chat) {
        // This means chat doesn't exist yet, but we have a chatId
        // Show interface to allow sending first message
        return (
            <div className="d-flex flex-column h-100">
                {/* Header */}
                <div className="p-3 border-bottom bg-gray d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <img
                                src="/images/svgs/icon-mail-dark.svg"
                                alt="Chat"
                                width="20"
                                height="20"
                                style={{ opacity: 0.5 }}
                            />
                        </div>
                        <div>
                            <div className="fw-bold">New Conversation</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <button
                            onClick={onMinimize}
                            className="btn btn-sm"
                            style={{
                                border: 'none',
                                background: 'transparent',
                                padding: '4px 8px',
                                fontSize: '18px',
                                lineHeight: '1',
                                color: '#666',
                            }}
                            aria-label="Minimize"
                            title="Minimize"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="btn-close"
                            aria-label="Close"
                            title="Close"
                        />
                    </div>
                </div>

                {/* Messages Area - Empty */}
                <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column align-items-center justify-content-center">
                    {isLoading ? (
                        <p className="text-muted text-center small">
                            Loading conversation...
                        </p>
                    ) : (
                        <p className="text-muted text-center small">
                            Start the conversation by sending a message
                        </p>
                    )}
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
                <div className="p-3 border-top d-flex gap-2 align-items-center">
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
                        style={{
                            backgroundColor: '#fff',
                            resize: 'none'
                        }}
                        onFocus={(e) => {
                            e.target.style.backgroundColor = '#fff';
                        }}
                        onBlur={(e) => {
                            e.target.style.backgroundColor = '#fff';
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={(!messageText.trim() && attachments.length === 0) || isSending}
                        className="btn btn-primary"
                        style={(!messageText.trim() && attachments.length === 0) || isSending ? { opacity: 0.65 } : {}}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }

    // If chat exists but no other_user info, show interface but with placeholder
    if (chat && !chat.other_user) {
        return (
            <div className="d-flex flex-column h-100">
                {/* Header */}
                <div className="p-3 border-bottom bg-gray d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <img
                                src="/images/svgs/icon-mail-dark.svg"
                                alt="Chat"
                                width="20"
                                height="20"
                                style={{ opacity: 0.5 }}
                            />
                        </div>
                        <div>
                            <div className="fw-bold">New Conversation</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <button
                            onClick={onMinimize}
                            className="btn btn-sm"
                            style={{
                                border: 'none',
                                background: 'transparent',
                                padding: '4px 8px',
                                fontSize: '18px',
                                lineHeight: '1',
                                color: '#666',
                            }}
                            aria-label="Minimize"
                            title="Minimize"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="btn-close"
                            aria-label="Close"
                            title="Close"
                        />
                    </div>
                </div>

                {/* Messages Area - Empty */}
                <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column align-items-center justify-content-center">
                    <p className="text-muted text-center small">
                        Start the conversation by sending a message
                    </p>
                </div>

                {/* Attachments Preview */}
                {attachments.length > 0 && (
                    <div className="px-3 py-2 border-top d-flex gap-2 flex-wrap" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                        {attachments.map((url, index) => (
                            <div key={index} className="position-relative">
                                <img
                                    src={url}
                                    alt={`Attachment ${index + 1}`}
                                    className="rounded"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                                <button
                                    onClick={() => removeAttachment(index)}
                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle"
                                    style={{ width: '20px', height: '20px', padding: 0, fontSize: '12px' }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="p-3 border-top d-flex gap-2 align-items-end">
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
                        className="btn btn-outline-primary"
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
                        style={{
                            backgroundColor: '#fff',
                            resize: 'none'
                        }}
                        onFocus={(e) => {
                            e.target.style.backgroundColor = '#fff';
                        }}
                        onBlur={(e) => {
                            e.target.style.backgroundColor = '#fff';
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={(!messageText.trim() && attachments.length === 0) || isSending}
                        className="btn btn-primary"
                        style={(!messageText.trim() && attachments.length === 0) || isSending ? { opacity: 0.65 } : {}}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }

    // Main chat interface - chat and other_user exist
    if (!chat || !chat.other_user) {
        return null; // This shouldn't happen, but handle it
    }

    return (
        <div className="d-flex flex-column h-100">
            {/* Header */}
            <div className="p-3 border-bottom bg-gray d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <Avatar
                        image_url={chat.other_user.avatar}
                        initial_name={chat.other_user.name}
                        size="sm"
                    />
                    <div>
                        <div className="fw-bold">{chat.other_user.name}</div>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button
                        onClick={onMinimize}
                        className="btn btn-sm"
                        style={{
                            border: 'none',
                            background: 'transparent',
                            padding: '4px 8px',
                            fontSize: '18px',
                            lineHeight: '1',
                            color: '#666',
                        }}
                        aria-label="Minimize"
                        title="Minimize"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button
                        onClick={onClose}
                        className="btn-close"
                        aria-label="Close"
                        title="Close"
                    />
                </div>
            </div>

            {/* Messages */}
            <div
                className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-3"
                style={{ maxHeight: '400px' }}
            >
                {isLoading && messages.length === 0 && chat ? (
                    <div className="text-center text-muted">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-muted">No messages yet. Start the conversation!</div>
                ) : (
                    messages.map((message) => {
                        const isOwnMessage = message.sender_id === currentUser?.id;
                        return (
                            <div
                                key={message.id}
                                className={`d-flex mb-2 ${isOwnMessage ? 'justify-content-end' : 'justify-content-start'}`}
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
                                        <div className="mb-2 d-flex flex-column gap-2">
                                            {message.attachments.map((attachment) => (
                                                <img
                                                    key={attachment.id}
                                                    src={attachment.file_path}
                                                    alt={attachment.file_name}
                                                    className="img-fluid rounded"
                                                    style={{ maxHeight: '200px', objectFit: 'contain' }}
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
                        <div key={index} className="position-relative" style={{ width: '80px', height: '80px' }}>
                            <img
                                src={url}
                                alt={`Attachment ${index + 1}`}
                                className="rounded"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    border: '1px solid #dee2e6'
                                }}
                                onError={(e) => {
                                    console.error('Failed to load preview image:', url);
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <button
                                onClick={() => removeAttachment(index)}
                                className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle"
                                style={{ width: '20px', height: '20px', padding: 0, fontSize: '12px', transform: 'translate(30%, -30%)' }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="p-3 border-top d-flex gap-2 align-items-center">
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
    );
};

export default FloatingChatPopup;

