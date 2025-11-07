<?php

namespace App\Http\Controllers;

use App\Mail\NewMessageReceived;
use App\Models\Chat;
use App\Models\ChatAttachment;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Get all chats where user is either created_by or created_for
        $chats = Chat::where(function ($query) use ($user) {
            $query->where('created_by', $user->id)
                  ->orWhere('created_for', $user->id);
        })
        ->with(['lastMessage' => function ($query) {
            $query->with(['sender', 'receiver', 'attachments']);
        }])
        ->with(['createdBy', 'createdFor', 'puppy'])
        ->orderByDesc('updated_at')
        ->get()
        ->map(function ($chat) use ($user) {
            // Get other user: if current user is created_by, return created_for, otherwise return created_by
            $otherUser = $chat->created_by === $user->id 
                ? $chat->createdFor 
                : $chat->createdBy;
            
            $lastMessage = $chat->lastMessage;
            // Get unread count for this chat
            $unreadCount = ChatMessage::where('chat_id', $chat->id)
                ->where('receiver_id', $user->id)
                ->where('is_read', false)
                ->count();

            return [
                'id' => $chat->id,
                'name' => $chat->name,
                'other_user' => [
                    'id' => $otherUser->id,
                    'name' => $otherUser->name,
                    'avatar' => $otherUser->avatar,
                ],
                'last_message' => $lastMessage ? [
                    'id' => $lastMessage->id,
                    'message' => $lastMessage->message,
                    'has_attachments' => $lastMessage->attachments->count() > 0,
                    'sender_id' => $lastMessage->sender_id,
                    'created_at' => $lastMessage->created_at->format('Y-m-d H:i:s'),
                ] : null,
                'unread_count' => $unreadCount,
                'created_at' => $chat->created_at,
                'updated_at' => $chat->updated_at,
            ];
        });

        // return response()->json($chats);

        return Inertia::render('Chat/Index', [
            'chats' => $chats,
        ]);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();

        $chat = Chat::with(['messages' => function ($query) {
            $query->with(['sender', 'receiver', 'attachments'])
                  ->orderBy('created_at', 'asc');
        }])
        ->with(['createdBy', 'createdFor', 'puppy'])
        ->findOrFail($id);

        // Check if user is part of this chat (either as created_by or created_for)
        $isAuthorized = $chat->created_by === $user->id || $chat->created_for === $user->id;

        // Allow access if user is created_by or created_for
        if (!$isAuthorized) {
            abort(403, 'You are not authorized to view this chat');
        }

        // Get other user: if current user is created_by, return created_for, otherwise return created_by
        $otherUser = $chat->created_by === $user->id 
            ? $chat->createdFor 
            : $chat->createdBy;

        // Get unread count BEFORE marking as read
        $unreadCount = ChatMessage::where('chat_id', $chat->id)
            ->where('receiver_id', $user->id)
            ->where('is_read', false)
            ->count();

        // Mark messages as read (only if there are messages)
        if ($chat->messages()->count() > 0) {
            ChatMessage::where('chat_id', $chat->id)
                ->where('receiver_id', $user->id)
                ->where('is_read', false)
                ->update([
                    'is_read' => true,
                    'read_at' => now(),
                ]);
        }

        $messages = $chat->messages->map(function ($message) {
            return [
                'id' => $message->id,
                'message' => $message->message,
                'sender_id' => $message->sender_id,
                'receiver_id' => $message->receiver_id,
                'sender' => [
                    'id' => $message->sender->id,
                    'name' => $message->sender->name,
                    'avatar' => $message->sender->avatar,
                ],
                'attachments' => $message->attachments->map(function ($attachment) {
                    return [
                        'id' => $attachment->id,
                        'file_path' => $attachment->file_path,
                        'file_name' => $attachment->file_name,
                        'file_size' => $attachment->file_size,
                        'mime_type' => $attachment->mime_type,
                    ];
                }),
                'is_read' => $message->is_read,
                'created_at' => $message->created_at->format('Y-m-d H:i:s'),
                'created_at_human' => $message->created_at->diffForHumans(),
            ];
        });

        $chatData = [
            'id' => $chat->id,
            'name' => $chat->name,
        ];
        
        if ($otherUser) {
            $chatData['other_user'] = [
                'id' => $otherUser->id,
                'name' => $otherUser->name,
                'avatar' => $otherUser->avatar,
            ];
        }

        return response()->json([
            'chat' => $chatData,
            'messages' => $messages,
            'unread_count' => $unreadCount,
            'other_user' => $otherUser ? [
                'id' => $otherUser->id,
                'name' => $otherUser->name,
                'avatar' => $otherUser->avatar,
            ] : null,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'puppy_id' => 'nullable|exists:puppies,id',
        ]);

        $sender = $user;
        $receiver = User::findOrFail($validated['receiver_id']);

        if ($sender->id === $receiver->id) {
            return response()->json([
                'error' => 'You cannot chat with yourself'
            ], 400);
        }

        // Check if chat already exists between these users
        // Check both directions: sender->receiver or receiver->sender
        $existingChat = Chat::where(function ($query) use ($sender, $receiver) {
            $query->where(function ($q) use ($sender, $receiver) {
                $q->where('created_by', $sender->id)
                  ->where('created_for', $receiver->id);
            })->orWhere(function ($q) use ($sender, $receiver) {
                $q->where('created_by', $receiver->id)
                  ->where('created_for', $sender->id);
            });
        })
        ->where('puppy_id', $validated['puppy_id'] ?? null)
        ->first();

        if ($existingChat) {
            // Get other user info: if current user is created_by, return created_for, otherwise return created_by
            $otherUser = $existingChat->created_by === $sender->id 
                ? $existingChat->createdFor 
                : $existingChat->createdBy;
            
            $response = [
                'chat_id' => $existingChat->id,
                'created' => false,
            ];
            
            if ($otherUser) {
                $response['other_user'] = [
                    'id' => $otherUser->id,
                    'name' => $otherUser->name,
                    'avatar' => $otherUser->avatar,
                ];
            }
            
            return response()->json($response);
        }

        // Create new chat
        $chatName = $sender->name . ' & ' . $receiver->name;
        $chat = Chat::create([
            'name' => $chatName,
            'created_by' => $sender->id,
            'created_for' => $receiver->id,
            'puppy_id' => $validated['puppy_id'] ?? null,
        ]);

        return response()->json([
            'chat_id' => $chat->id,
            'created' => true,
            'other_user' => [
                'id' => $receiver->id,
                'name' => $receiver->name,
                'avatar' => $receiver->avatar,
            ],
        ]);
    }

    public function sendMessage(Request $request, $chatId)
    {
        $validated = $request->validate([
            'message' => 'nullable|string',
            'receiver_id' => 'required|exists:users,id',
            'attachments' => 'nullable|array',
            // Attachments can be either strings (URLs) or arrays (with url and path)
            'attachments.*' => 'nullable',
        ]);

        $user = $request->user();
        $chat = Chat::findOrFail($chatId);

        // Get receiver from request (sender is authenticated user)
        $receiver = User::findOrFail($validated['receiver_id']);

        // Create message (even if empty, attachments require it)
        $message = ChatMessage::create([
            'chat_id' => $chat->id,
            'sender_id' => $user->id,
            'receiver_id' => $receiver->id,
            'message' => $validated['message'] ?? null,
        ]);

        // Handle attachments if provided
        if (!empty($validated['attachments'])) {
            $disk = Storage::disk(config('media-library.disk_name'));
            
            foreach ($validated['attachments'] as $attachmentData) {
                // Handle both string (URL) and array (URL + path) formats
                $attachmentUrl = is_array($attachmentData) ? $attachmentData['url'] : $attachmentData;
                $attachmentPath = is_array($attachmentData) ? ($attachmentData['path'] ?? null) : null;
                
                // If path is not provided, try to parse it from URL
                if (!$attachmentPath) {
                    $parsedPath = parse_url($attachmentUrl, PHP_URL_PATH);
                    $parsedPath = ltrim($parsedPath, '/');
                    
                    // Remove /storage/ prefix if present
                    if (strpos($parsedPath, 'storage/') === 0) {
                        $parsedPath = substr($parsedPath, 8); // Remove 'storage/' prefix
                    }
                    
                    $attachmentPath = $parsedPath;
                }
                
                // Try to get file info from storage
                $fileInfo = null;
                $fileSize = 0;
                $mimeType = 'image/jpeg'; // Default
                
                if ($attachmentPath && $disk->exists($attachmentPath)) {
                    $fileInfo = pathinfo($attachmentPath);
                    $fileSize = $disk->size($attachmentPath);
                    $mimeType = $disk->mimeType($attachmentPath);
                } else {
                    // If file doesn't exist in storage, try to extract info from URL
                    $fileInfo = pathinfo(parse_url($attachmentUrl, PHP_URL_PATH));
                    // Try to get mime type from file extension
                    $extension = strtolower($fileInfo['extension'] ?? '');
                    $mimeTypes = [
                        'jpg' => 'image/jpeg',
                        'jpeg' => 'image/jpeg',
                        'png' => 'image/png',
                        'gif' => 'image/gif',
                        'webp' => 'image/webp',
                    ];
                    $mimeType = $mimeTypes[$extension] ?? 'image/jpeg';
                }
                
                // Create attachment record
                ChatAttachment::create([
                    'chat_id' => $chat->id,
                    'chat_message_id' => $message->id,
                    'file_path' => $attachmentUrl,
                    'file_name' => $fileInfo['basename'] ?? 'attachment',
                    'file_size' => $fileSize,
                    'mime_type' => $mimeType,
                ]);
            }
        }

        // Update chat's updated_at
        $chat->touch();

        // Reload message with relationships
        $message->load(['sender', 'receiver', 'attachments']);

        // Send email notification to receiver if they have notifications enabled
        if ($receiver->enable_notification ?? true) {
            Mail::queue(new NewMessageReceived($receiver, $message));
        }

        return response()->json([
            'message' => [
                'id' => $message->id,
                'message' => $message->message,
                'sender_id' => $message->sender_id,
                'receiver_id' => $message->receiver_id,
                'sender' => [
                    'id' => $message->sender->id,
                    'name' => $message->sender->name,
                    'avatar' => $message->sender->avatar,
                ],
                'attachments' => $message->attachments->map(function ($attachment) {
                    return [
                        'id' => $attachment->id,
                        'file_path' => $attachment->file_path,
                        'file_name' => $attachment->file_name,
                        'file_size' => $attachment->file_size,
                        'mime_type' => $attachment->mime_type,
                    ];
                }),
                'is_read' => $message->is_read,
                'created_at' => $message->created_at->format('Y-m-d H:i:s'),
                'created_at_human' => $message->created_at->diffForHumans(),
            ],
        ]);
    }

    public function uploadAttachment(Request $request)
    {
        $validated = $request->validate([
            'attachment' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        $path = $request->file('attachment')->store('chat-attachments', config('media-library.disk_name'));
        $url = Storage::disk(config('media-library.disk_name'))->url($path);

        return response()->json([
            'url' => $url,
            'path' => $path,
        ]);
    }

    public function markAsRead(Request $request, $chatId)
    {
        $user = $request->user();

        ChatMessage::where('chat_id', $chatId)
            ->where('receiver_id', $user->id)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return response()->json(['success' => true]);
    }

    public function getUnreadCount(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'total_unread' => 0,
                'unread_by_chat' => [],
            ]);
        }

        $unreadCount = ChatMessage::where('receiver_id', $user->id)
            ->where('is_read', false)
            ->count();

        // Get unread counts per chat
        $unreadByChat = ChatMessage::where('receiver_id', $user->id)
            ->where('is_read', false)
            ->selectRaw('chat_id, count(*) as count')
            ->groupBy('chat_id')
            ->pluck('count', 'chat_id')
            ->toArray();

        return response()->json([
            'total_unread' => $unreadCount,
            'unread_by_chat' => $unreadByChat,
        ]);
    }

    private function getOtherUser(Chat $chat, User $currentUser)
    {
        // Get other user: if current user is created_by, return created_for, otherwise return created_by
        return $chat->created_by === $currentUser->id 
            ? $chat->createdFor 
            : $chat->createdBy;
    }
}
