import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { sendMessage } from '../utils/ChatService';
import { generateSystemPrompt } from '../utils/ChatService';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [hasStartedConversation, setHasStartedConversation] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([
            {
                id: '1',
                text: 'Hello! How can I help you today?',
                sender: 'bot',
                timestamp: new Date(),
            },
        ]);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addMessage = async (text) => {
        if (!text.trim()) return;

        // Prepare user message
        const userMessage = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        let updatedMessages = [];

        // Generate a system prompt only at the start of the conversation
        if (!hasStartedConversation) {
            const systemPrompt = await generateSystemPrompt();
            const systemMessage = {
                id: '0',
                text: systemPrompt,
                sender: 'system',
                timestamp: new Date(),
            };
            updatedMessages = [systemMessage, userMessage];
            setMessages((prev) => [...prev, systemMessage])
            setHasStartedConversation(true);
        }
        else {
            updatedMessages = [...(hasStartedConversation ? messages : []), userMessage];
        }

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await sendMessage(userMessage, updatedMessages);

            // Waiting time to feel like a real conversation
            setTimeout(() => {
                const botMessage = {
                    id: (Date.now() + 1).toString(),
                    text: response,
                    sender: 'bot',
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, botMessage]);
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Failed to send message. Please try again.');
            setIsLoading(false);
            console.error('Error sending message:', err);
        }
    };

    const value = {
        messages: messages.filter(msg => msg.sender !== 'system'),
        isLoading,
        error,
        addMessage,
        messagesEndRef,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};