import { useState } from 'react';
import { useChat } from '../context/ChatContext';

const ChatInput = () => {
    const [message, setMessage] = useState('');
    const { addMessage, isLoading } = useChat();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            addMessage(message);
            setMessage('');
        }
    }

    return (
        <div className="border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-4 md:py-6">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">

                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full bg-neutral-100 dark:bg-neutral-700 border-none rounded-full py-3 px-4 pr-12 focus:ring-2 focus:ring-primary-500 focus:outline-none text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!message.trim() || isLoading}
                        className={`p-2 rounded-full ${message.trim() && !isLoading
                                ? 'bg-primary-500 hover:bg-[#fbb751] text-white'
                                : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                            } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                        aria-label="Send message"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;