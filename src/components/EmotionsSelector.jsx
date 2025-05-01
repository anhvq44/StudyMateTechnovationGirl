import React from 'react';

const emotions = [
  'Calm', 'Stressed', 'Proud', 'Frustrated',
  'Motivated', 'Overwhelmed', 'Peaceful', 'Lonely'
];

export function EmotionSelector({ selectedEmotions, onSelect }) {
  const toggleEmotion = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      onSelect(selectedEmotions.filter(e => e !== emotion));
    } else if (selectedEmotions.length < 3) {
      onSelect([...selectedEmotions, emotion]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {emotions.map((emotion) => (
        <button
          key={emotion}
          onClick={() => toggleEmotion(emotion)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${selectedEmotions.includes(emotion)
              ? 'bg-[#FFCF6F] text-white'
              : 'bg-[#FFF9F0] text-[#3A3A90] hover:bg-[#F4A259] hover:text-white'
            }
            ${selectedEmotions.length >= 3 && !selectedEmotions.includes(emotion)
              ? 'opacity-50 cursor-not-allowed'
              : ''
            }`}
        >
          {emotion}
        </button>
      ))}
    </div>
  );
}