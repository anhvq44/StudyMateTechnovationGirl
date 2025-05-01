import { useState, useEffect } from 'react'
import { Home, ListTodo, MessageCircle, LogOut, HeartHandshake } from 'lucide-react';
import { supabase } from '../supabase_config';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate()

    const [isHovered, setIsHovered] = useState(false);
    const [currentPath, setCurrentPath] = useState('/');

    async function signOutHandle(){
      const{error} = await supabase.auth.signOut();
      navigate('/welcome-to-studymate')
    }
  
    useEffect(() => {
      setCurrentPath(window.location.pathname);
      
      const handlePathChange = () => {
        setCurrentPath(window.location.pathname);
      };
  
      window.addEventListener('popstate', handlePathChange);
      return () => window.removeEventListener('popstate', handlePathChange);
    }, []);
  
    const navItems = [
      { path: '/user-dashboard', icon: Home, label: 'Home' },
      { path: '/todo-goals', icon: ListTodo, label: 'Tasks' },
      { path: '/chatbot', icon: MessageCircle, label: 'Chat' },
      { path: '/visit-mupo', icon: HeartHandshake, label: 'Mupo'}
    ];
  
    const isActive = (path) => currentPath === path;
  
    return (
      <nav 
        className={`fixed h-screen bg-[#2F327D] transition-all duration-200 ease-in-out z-20
          ${isHovered ? 'w-64' : 'w-20'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="h-full flex flex-col p-4 space-y-6">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li 
              key={path}
              className={`w-full transition-colors ${isActive(path) ? 'bg-primary-dark-blue' : 'hover:bg-primary-dark-blue'}`}
            >
              <a 
                href={path}
                className={`flex items-center text-center p-4 transition-all
                    ${isHovered ? 'justify-start' : 'justify-center'}
                    ${isActive(path) 
                        ? 'text-primary opacity-100' 
                        : 'text-primary-dark opacity-70 hover:text-primary hover:opacity-100' }`}
              >
                <Icon className="w-8 h-8 min-w-[2rem]" />
                <span className={`ml-4 whitespace-nowrap text-lg ${isHovered ? 'block' : 'hidden'}`}>
                  {label}
                </span>
              </a>
            </li>
          ))}
          
          <li className="w-full mt-auto hover:bg-primary-dark-blue transition-colors">
                <a 
                // href={path}
                className={`flex items-center p-4 transition-all
                    ${isHovered ? 'justify-start' : 'justify-center'}
                    text-primary-dark hover:text-primary opacity-70 hover:opacity-100`}
                onClick={signOutHandle}
                >
              <LogOut className="w-8 h-8 min-w-[2rem]" />
              <span className={`ml-4 whitespace-nowrap text-lg ${isHovered ? 'block' : 'hidden'}`}>
                Log out
              </span>
            </a>
          </li>
        </ul>
      </nav>
    );
}

export default NavBar