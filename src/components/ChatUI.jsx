import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatUI = () => {
    return (
        <div className="flex flex-col h-screen pt-16 bg-white dark:bg-neutral-900">
            <MessageList />
            <ChatInput />
        </div>
    );
};

export default ChatUI;