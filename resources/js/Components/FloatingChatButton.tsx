import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import FloatingChatPopup from './FloatingChatPopup';

interface OtherUser {
    id: number;
    name: string;
    avatar: string;
}

const STORAGE_KEY = 'floating_chat_state';

interface StoredChatState {
    chatId: number;
    initialOtherUser: OtherUser | null;
    isVisible: boolean;
    isOpen: boolean;
}

const FloatingChatButton: React.FC = () => {
    // Load state from localStorage on mount
    const loadStoredState = (): StoredChatState | null => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading chat state from localStorage:', error);
        }
        return null;
    };

    const storedState = loadStoredState();
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(storedState?.isOpen || false);
    const [currentChatId, setCurrentChatId] = useState<number | null>(storedState?.chatId || null);
    const [initialOtherUser, setInitialOtherUser] = useState<OtherUser | null>(storedState?.initialOtherUser || null);
    const [isVisible, setIsVisible] = useState(storedState?.isVisible || false);

    // Save state to localStorage
    const saveState = (chatId: number | null, otherUser: OtherUser | null, visible: boolean, open: boolean) => {
        try {
            if (chatId && visible) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    chatId,
                    initialOtherUser: otherUser,
                    isVisible: visible,
                    isOpen: open,
                }));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (error) {
            console.error('Error saving chat state to localStorage:', error);
        }
    };

    useEffect(() => {
        // Fetch unread count on mount and periodically
        const fetchUnreadCount = async () => {
            try {
                const response = await fetch('/api/chat/unread/count', {
                    credentials: 'same-origin',
                });
                const data = await response.json();
                setUnreadCount(data.total_unread || 0);
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 10000); // Poll every 10s

        // Listen for openChatPopup events
        const handleOpenChat = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail && customEvent.detail.chatId) {
                const chatId = customEvent.detail.chatId;
                const otherUser = customEvent.detail.otherUser || null;
                setCurrentChatId(chatId);
                setInitialOtherUser(otherUser);
                setIsOpen(true);
                setIsVisible(true);
                saveState(chatId, otherUser, true, true);
            }
        };

        window.addEventListener('openChatPopup', handleOpenChat);

        return () => {
            clearInterval(interval);
            window.removeEventListener('openChatPopup', handleOpenChat);
        };
    }, []);

    const toggleChat = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        // Save state when toggling
        if (currentChatId) {
            saveState(currentChatId, initialOtherUser, isVisible, newIsOpen);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setCurrentChatId(null);
        setInitialOtherUser(null);
        setIsVisible(false);
        // Clear localStorage when completely closed
        localStorage.removeItem(STORAGE_KEY);
    };

    const handleMinimize = () => {
        setIsOpen(false);
        // Save state with popup closed but chat still active
        if (currentChatId) {
            saveState(currentChatId, initialOtherUser, isVisible, false);
        }
    };

    // Don't render anything if not visible
    if (!isVisible) {
        return null;
    }

    return (
        <>
            <button
                onClick={toggleChat}
                className="position-fixed"
                style={{
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#ffb300',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffc107'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffb300'}
            >
                <img src="/images/svgs/icon-mail-dark.svg" alt="Chat" width="24" height="24" style={{ filter: 'brightness(0) invert(1)' }} />
                {unreadCount > 0 && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>
            {isOpen && (
                <div
                    id="floating-chat-popup"
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '20px',
                        width: '400px',
                        maxWidth: 'calc(100vw - 40px)',
                        height: '500px',
                        maxHeight: 'calc(100vh - 120px)',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}
                >
                    <FloatingChatPopup
                        chatId={currentChatId}
                        initialOtherUser={initialOtherUser}
                        onMinimize={handleMinimize}
                        onClose={handleClose}
                    />
                </div>
            )}
        </>
    );
};

export default FloatingChatButton;

