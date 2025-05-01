import { motion, useTransform, useTime, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

function QuotesEffect({ imageUrl }) {
    return (
        <motion.img
            src={imageUrl}
            className={`absolute text-gray-700 font-medium text-lg pointer-events-none z-[5] ${
                imageUrl.includes("i_love") ? "scale-75 -top-30 -right-30" : "top-0 right-0"}`} 
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                rotate: [0, 3, -3, 3, -3, 3, -3, 3, 0],
            }}
            transition={{
                duration: 4.5,
                repeat: Infinity,
            }}
        >
        </motion.img>
    );
}

const FloatHearts = ({ x = 0, y = 0, onComplete }) => {
    return (
        <motion.img
            src="/effects/heart.png"
            className="absolute w-6 h-6 z-[5]"
            initial={{
                opacity: 0,
                y: 0,
                x,
                scale: 0.8,
                rotate: -10,
            }}
            animate={{
                opacity: [0, 1, 1, 0],
                y: y - 100,
                x: x + Math.random() * 30 - 15,
                rotate: 10,
                scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 3.5,
                ease: "easeInOut",
            }}
            style={{
                position: "absolute",
                width: 30,
                height: 30,
                pointerEvents: "none",
                bottom: "70px"
            }}
            onAnimationComplete={onComplete}
        />
    );
};

function BurningFireEffect({ onComplete }) {
    const controls = useAnimation();
    useEffect(() => {
        controls.start({
            opacity: [0, 1, 1, 0],
            scale: [1.2, 1.3, 1.25, 1.35, 1.1],
            filter: [
                "brightness(1)",
                "brightness(1.2)",
                "brightness(0.9)",
                "brightness(1.1)",
                "brightness(1)",
            ],
            transition: {
                duration: 3,
                ease: "easeInOut",
            },
        }).then(() => {
            onComplete?.();
        });
    }, []);

    return (
        <motion.img
            src='/effects/susuna_fire.png'
            className="absolute w-full h-full object-contain pointer-events-none z-0"
            animate={controls}
        />
    );
}

function AngryEffect({ onComplete }) {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            x: [0, 5, -5, 5, -5, 0],
            opacity: [1, 0.8, 1, 0.7, 1],
            transition: {
                duration: 4.5,
                ease: "easeInOut",
            },
        }).then(() => {
            onComplete?.();
        });
    }, []);

    return (
        <motion.img
            src='/effects/lua_angry.png'
            className="absolute pointer-events-none z-[5]"
            animate={controls}
        />
    );
}

export { FloatHearts, QuotesEffect, AngryEffect, BurningFireEffect }