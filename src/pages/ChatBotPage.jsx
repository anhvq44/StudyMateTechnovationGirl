import { useState, useEffect } from 'react';
import { ChatProvider } from '../context/ChatContext';
import ChatUI from '../components/ChatUI';
import NavBar from '../components/NavBar';

const ChatBotPage = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    

    return (
        <ChatProvider>
            <NavBar/>
            <div className="ml-20 w-[calc(100%-5rem)] min-h-screen bg-white text-neutral-900 items-center justify-center">
                {/* Header */}
                <header
                    className={`fixed w-[calc(100%-5rem)] top-0 right-0 z-10  transition-colors duration-300 py-4 px-6 ${scrolled
                        ? 'bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm shadow-md'
                        : 'bg-transparent'
                        }`}
                >
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <h1 className="text-xl font-bold text-[#1c1f52]">StudyMate Assistant</h1>
                        </div>
                    </div>
                </header>
                <main className="container mx-auto w-full">
                    <ChatUI />
                </main>
            </div>
        </ChatProvider>
    );
};

export default ChatBotPage;