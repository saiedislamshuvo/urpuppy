import React from 'react';
import { usePage } from '@inertiajs/react';
import Button from './ui/Button';
import toast from 'react-hot-toast';

interface ChatButtonProps {
    senderId: number;
    receiverId: number;
    puppyId?: number;
    className?: string;
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

const ChatButton: React.FC<ChatButtonProps> = ({
    senderId,
    receiverId,
    puppyId,
    className
}) => {
    const { auth } = usePage().props;
    const currentUser = auth?.user as any;

    // Don't show button if user is trying to chat with themselves
    if (currentUser?.id === receiverId) {
        return null;
    }

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {

            // Create or get existing chat
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    receiver_id: receiverId,
                    puppy_id: puppyId || null,
                }),
            });

            if (!response.ok) {
                const errorMessage = await getErrorMessage(response, 'Failed to create chat');
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Trigger global event to open quick chat popup
            const event = new CustomEvent('openChatPopup', {
                detail: {
                    chatId: data.chat_id,
                    otherUser: data.other_user || null
                }
            });
            window.dispatchEvent(event);
        } catch (error) {
            console.error('Error creating chat:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to start conversation. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className || "btn btn-primary w-100 hstack justify-content-center gap-2"}
        >
            <img src="/images/svgs/icon-mail-dark.svg" alt="chat" width="16" height="16" style={{ filter: 'brightness(0) invert(1)' }} />
            Chat
        </button>
    );
};

export default ChatButton;

