import { format } from 'date-fns';

const Message = ({ message }) => {
    const { text, sender, timestamp } = message;
    const isBot = sender === 'bot';

    // Format the timestamp
    const formattedTime = format(new Date(timestamp), 'h:mm a');

    return (
        <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`
        flex flex-col max-w-[75%] animate-message-pop
        ${isBot
                    ? 'items-start'
                    : 'items-end'}
      `}>
                <div className={`
          px-4 py-3 rounded-2xl shadow-sm
          ${isBot
                        ? 'bg-neutral-100 rounded-tl-sm text-neutral-800 '
                        : 'bg-primary-500 rounded-tr-sm text-neutral-800'}
        `}>
                    <p className="text-sm md:text-base whitespace-pre-wrap break-words">{text}</p>
                </div>

                <div className={`mt-1 text-xs text-neutral-500 dark:text-neutral-400 ${isBot ? 'ml-2' : 'mr-2'}`}>
                    {formattedTime}
                </div>
            </div>
        </div>
    );
};

export default Message;