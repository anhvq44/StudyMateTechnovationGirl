import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function HeaderDashboard(){

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };
    

    const [date, setCurrentDate] = useState("Error loading date");
    useEffect(() => {
    // Set Date
        const formatter = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
    });
    
    setCurrentDate(formatter.format(new Date()));
    }, []);

    return (
        <div className="relative h-[40vh] w-full overflow-hidden bg-transparent">
            {/* Background Image */}
            <img
                src="https://picsum.photos/1000/2000/"
                alt="Peaceful mountain landscape"
                className="absolute inset-0 w-full h-full object-cover"
            />
          
            <div className="absolute inset-0 bg-[#3d4184]/70" />
          
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-8 bg-transparent">
                <div className="max-w-4xl">
                    <p className="text-[#FFD9A0] text-lg md:text-x0.5 mb-2">
                        Today is: {date}
                    </p>
                    <h1 className="text-[#fbb751] text-3xl md:text-3xl lg:text-4xl font-semibold mb-4">
                        {getGreeting()}, User
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default HeaderDashboard