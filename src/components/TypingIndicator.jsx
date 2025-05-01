const TypingIndicator = () => {
    return (
        <div className="flex justify-start mb-4">
            <div className="bg-neutral-100 dark:bg-neutral-700 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-typing-dot" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-typing-dot" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-typing-dot" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;