import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../context/ChatContext';

const MessageList = () => {
  const { messages, isLoading, messagesEndRef } = useChat();

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 space-y-1">
      <div className="max-w-3xl mx-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        {/* Invisible element to auto-scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;