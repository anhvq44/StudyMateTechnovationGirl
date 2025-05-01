import React from "react";
import girlImg from "../assets/girl-landing-p.png"
import { BookHeart, HeartHandshake, BotMessageSquare } from 'lucide-react';
import CardWithIcon from "../components/CardWithIcon";
import { Link as ScrollLink } from "react-scroll" ;
import { Link as NavigateLink } from "react-router-dom";

function LandingPage(){
    return(
        <div className="min-h-screen">
            {/* Navigation Bar */}
            <nav className="fixed top-0 right-0 w-full py-5 px-10 flex justify-end items-center z-50 bg-[#FFF2E1]">
                <ScrollLink to="hero" smooth={true} duration={500} className="text-[#252641] hover:text-[#2F327D] transition-colors hover:cursor-pointer">Home</ScrollLink>
                <ScrollLink to="aboutUs" smooth={true} duration={500} className="text-[#252641] hover:text-[#2F327D] transition-colors ml-12 hover:cursor-pointer">About Us</ScrollLink>
                <ScrollLink to="features" smooth={true} duration={500} className="text-[#252641] hover:text-[#2F327D] transition-colors ml-12 hover:cursor-pointer">Features</ScrollLink>
                <NavigateLink to="/login" className="ml-12 not-first:px-8 py-2 rounded-full bg-white text-[#6C6C6C] hover:bg-transparent hover:border-2 hover:border-white hover:text-[#2F327D] transition-all hover:cursor-pointer">
                    Login
                </NavigateLink>
                <NavigateLink to="/signup" className="ml-12 px-8 py-2 rounded-full bg-[#fbb751] text-white font-medium hover:bg-transparent hover:border-2 hover:border-[#FFD9A0] hover:text-[#2F327D] transition-all">
                    Sign Up
                </NavigateLink>
            </nav>
            {/* Hero section */}
            <section id="hero" className="relative w-full h-[95vh] bg-[#FFF2E1] clip-custom overflow-hidden">
                <div className="absolute left-24 top-1/2 -translate-y-1/2 max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2F327D] mb-6">
                        <span className="text-[#fbb751]">A better way</span> to learn and reach your dreams.
                    </h1>
                    <p className="text-[#2F327D] mb-8 text-lg">
                        With StudyMate, unlock healthier study habits, personalized guidance, and the tools you need to achieve your goals—one step at a time.
                    </p>
                    <a href="/signup" className="px-8 py-3 rounded-full bg-[#fbb751] text-white font-medium hover:bg-transparent hover:border-2 hover:border-[#FFD9A0] hover:text-[#2F327D] transition-all inline-block">
                        Join right now
                    </a>
                </div>
                    <img 
                        src={girlImg}
                        className="absolute right-24 bottom-0 h-[530px] w-auto object-cover rounded-t-lg"
                    />
            </section>
            <section id="features" className="py-32">
                <div className="text-center mb-24">
                    <h2 className="text-3xl font-bold text-[#2F327D] mb-6">
                        All-in-one <span className="text-[#fbb751]">self-care and goal-setting hub</span>
                    </h2>
                    <p className="text-[#696984] max-w-3xl mx-auto">
                        We combines emotion check-ins, task tracking, and have a cute companion to support your mental health and productivity in a fun, engaging way.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-16">
                    <CardWithIcon 
                        icon={BookHeart}
                        title="Connect & Reflect"
                        color="bg-[#fbb751]"
                        description="Track your progress to achieve your goals in the most efficient way!"
                    />
                    <CardWithIcon 
                        icon={HeartHandshake}
                        title="Grow with Balance"
                        color="bg-[#81BFDA]"
                        description="Take care of yourself while studying! Your Mupo will always be the for you! Buy them cute items too."
                    />
                    <CardWithIcon 
                        icon={BotMessageSquare}
                        title="Study Buddy"
                        color="bg-[#A0D683]"
                        description="Get instant study help, personalized task planning, and motivation through an AI-powered chatbot."
                    />
                </div>
            </section>
            <section id="aboutUs" className="max-w-7xl mx-auto px-6 py-32">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold text-[#2F327D] mb-6">
                            What exactly is <span className="text-[#fbb751]">StudyMate?</span>
                        </h2>
                        <p className="text-[#696984] mb-8">
                            At StudyMate, we believe that studying should be fun, balanced, and stress-free. Our mission is to help students stay motivated, organized, and mentally well while they learn. 
                        </p>
                    </div>
                    <div className="flex-1 relative">
                        <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Classroom"
                            className="w-full rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>
            <footer className="bg-[#2F327D] text-[#b0b0b0] py-16">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <p>
                        Contact us:{' '}
                        <a href="" className="text-[#fbb751] hover:underline">
                            support@studymate.com
                        </a>
                    </p>
                    <p>
                        Follow us on{' '}
                        <a href="#" className="text-[#fbb751] hover:underline">Facebook</a>
                        {' '} | {' '}
                        <a href="#" className="text-[#fbb751] hover:underline">Twitter</a>
                        {' '} | {' '}
                        <a href="#" className="text-[#fbb751] hover:underline">LinkedIn</a>
                    </p>
                </div>
            </footer>
        </div>

    );
}

export default LandingPage