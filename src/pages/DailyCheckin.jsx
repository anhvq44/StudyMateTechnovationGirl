import React, { useState } from 'react';
import { EmotionSelector } from '../components/EmotionsSelector';
import { ScaleInput } from '../components/ScaleInput';
import { Sparkles } from 'lucide-react';
import { supabase } from '../supabase_config';
import { Link, useNavigate } from 'react-router-dom';

export function DailyCheckin() {
  // Save checkin
  const [checkin, setCheckin] = useState({
    date: new Date().toISOString().split('T')[0],
    emotions: [],
    highlight: '',
    gratitude: '',
    productivity: 5,
    sleepQuality: 5
  });

  // Navigate
  const navigate = useNavigate()

  const handleSave = async () => {
    // Get user Id
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userId = user.id;

    // Get information
    const payload = {
      user_id: userId,
      recorded_date: checkin.date,
      highlight_note: checkin.highlight === "" ? null : checkin.highlight,
      grateful_note: checkin.gratitude === "" ? null : checkin.gratitude,
      productivity: checkin.productivity,
      sleep_quality: checkin.sleepQuality,
    };

    // Insert to daily_checkin
    const { data: insertData, error} = await supabase
      .from('daily_checkin')
      .insert([payload])
      .select('id')
      .single()

    if (error) console.log(error.message);
    const checkinId = insertData.id;

    // Insert to emotion checkin
    const emotionsPayload = checkin.emotions.map((emotion) => ({
      checkin_id: checkinId,
      emotion: emotion,
    }));

    if (emotionsPayload.length > 0) {
      const { error } = await supabase
        .from('checkin_emotions')
        .insert(emotionsPayload);

      if (error) console.log(error.message);;
    }

    navigate('/user-dashboard')
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-8 h-8 text-[#FFCF6F]" />
        <h1 className="text-2xl font-bold text-[#3A3A90]">Daily Check-in</h1>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-[#3A3A90] mb-3">
            How are you feeling today? (Pick up to 3)
          </label>
          <EmotionSelector
            selectedEmotions={checkin.emotions}
            onSelect={(emotions) => setCheckin({ ...checkin, emotions })}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#3A3A90] mb-3">
            What was the highlight of your day?
          </label>
          <textarea
            value={checkin.highlight}
            onChange={(e) => setCheckin({ ...checkin, highlight: e.target.value })}
            className="w-full p-3 border border-[#7B6CA7] rounded-lg focus:ring-2 focus:ring-[#FFCF6F] focus:border-transparent"
            placeholder="Share your favorite moment..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#3A3A90] mb-3">
            One thing you're grateful for today?
          </label>
          <textarea
            value={checkin.gratitude}
            onChange={(e) => setCheckin({ ...checkin, gratitude: e.target.value })}
            className="w-full p-3 border border-[#7B6CA7] rounded-lg focus:ring-2 focus:ring-[#FFCF6F] focus:border-transparent"
            placeholder="Express your gratitude..."
            rows={2}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#3A3A90] mb-3">
            How productive did you feel today? (1-10)
          </label>
          <ScaleInput
            value={checkin.productivity}
            onChange={(productivity) => setCheckin({ ...checkin, productivity })}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#3A3A90] mb-3">
            How well did you sleep last night? (1-10)
          </label>
          <ScaleInput
            value={checkin.sleepQuality}
            onChange={(sleepQuality) => setCheckin({ ...checkin, sleepQuality })}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 px-6 bg-[#FFCF6F] text-white font-medium rounded-lg hover:bg-[#FFA9A3] transition-colors"
        >
          Save Today's Check-in
        </button>
      </div>
    </div>
  );
}