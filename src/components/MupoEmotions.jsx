import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import QuoteManager from "./MupoQuoteManager";
import EffectManager from "./MupoEffectsManager";

const MupoEmotions = forwardRef(({ emotion, hat, glasses, isPetting, onEmotionReset }, ref) => {

    const [effectId, setEffectId] = useState(null);
    const timeoutRef = useRef(null);

    // Trigger effects, quote
    const [triggeredEffect, setTriggeredEffect] = useState(null);
    const [triggeredQuote, setTriggeredQuote] = useState(null);

    // Trigger animation show/hide
    const [showEffect, setShowEffect] = useState(false);
    const [showQuote, setShowQuote] = useState(false);

    useImperativeHandle(ref, () => ({
        playEffect: (effectName) => {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Generate a new ID
            const newId = Date.now();
            setEffectId(newId);
            setTriggeredEffect(effectName);
            setShowEffect(true);

            // Set new timeout
            timeoutRef.current = setTimeout(() => {
                setShowEffect(false);
                setTriggeredEffect(null);
                timeoutRef.current = null;
            }, 4500);
        },
        playQuote: (quoteName) => {
            setTriggeredQuote(quoteName);
            setShowQuote(true);

            setTimeout(() => {
                setShowQuote(false);
                setTriggeredQuote(null);
            }, 4500);
        }
    }));

    return (
        <div className="relative flex flex-col items-center">
            {showEffect && <EffectManager
                name={triggeredEffect}
                key={effectId}
                onComplete={() => {
                    onEmotionReset?.()
                }}
            />}
            {showQuote && <QuoteManager name={triggeredQuote}  />}

            <img
                src={`/emotions/${emotion}.png`}
                alt="penguin"
                className="w-100 h-100 object-contain object-center bg-transparent z-[2]"
            />
            {hat &&
                <img
                    src={`/items/${hat}`}
                    alt="hat"
                    className='w-100 h-100 object-contain object-center bg-transparent absolute -top-5 z-[3]'
                />
            }
            {glasses &&
                <img
                    src={`/items/${glasses}`}
                    alt="glasses"
                    className='w-100 h-100 object-contain object-center bg-transparent absolute -top-5 z-[3]'
                />
            }
        </div>
    );
});

export default MupoEmotions