import { supabase } from "../supabase_config";
import { analyzeMood } from "../services/MoodDetectionApi";

export const sendMessage = async (message, fullMessages = []) => {
    const messageMood = await analyzeMood(message.text)
    const contextMessage = {
        id: '1',
        text: `Emotion check: The user's latest message shows emotions: ${messageMood.map(item => `${item.label} (${Math.round(item.confidence * 100)}%)`).join(', ')}.`,
        sender: 'system',
    }
    const messageList = [...fullMessages, contextMessage, message]

    const formattedMessages = messageList.map((msg) => ({
        role: msg.sender === 'bot' ? 'assistant'
            : msg.sender === 'user' ? 'user'
                : msg.sender === 'system' ? 'system'
                    : 'user',
        content: msg.text,
    }));
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_AI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "deepseek/deepseek-chat-v3-0324:free",
            "messages": formattedMessages
        })
    });

    const data = await response.json();
    if (!response.ok) console.log(data.error.message);
    const apiResponseText = data.choices[0].message.content.trim();
    return apiResponseText
};

export const generateSystemPrompt = async () => {
    const today = new Date().toISOString().split("T")[0];

    // Grab today checkin result
    const { data: checkin, error: checkinError } = await supabase
        .from('daily_checkin')
        .select('*')
        .eq('recorded_date', today)
        .single()

    // Grab checkin emotion
    const { data: mood, error: moodError } = await supabase
        .from('checkin_emotions')
        .select('emotion')
        .eq('checkin_id', checkin.id)
    if (moodError) {
        console.log("Error grabbing mood: ", moodError.message)
    }

    // Grab task
    const { data: tasks, error: taskError } = await supabase
        .from('tasks')
        .select('*')
        .eq('deleted', false)
        .eq('completed', false)
    if (taskError) {
        console.log(taskError.message)
    }

    // Put the data into sentence or not
    const moodString = mood ? `The user is currently feeling: ${mood.map((eachMood) => `${eachMood.emotion}, `)}.` : '';
    const qualityString = checkin ? `This is the user sleep quality last night: ${checkin.sleep_quality}. This is how productive the user is feeling: ${checkin.productivity}` : '';
    const highlightNote = checkin.highlight_note ? `This is the user's highlight note: ${checkin.highlight_note}.` : ``;
    const gratefulNote = checkin.grateful_note ? `This is the user's grateful note: ${checkin.gratefulNote}` : ``;
    const taskList = tasks?.length
        ? tasks.map((task) => `- ${task.task_name} (due ${task?.due_date})`).join('\n')
        : 'No uncompleted task.';

    return `
        You are a friendly, supportive chatbot who helps students with their mental health and productivity.
        ${highlightNote}
        ${gratefulNote}
        ${qualityString}
        ${moodString}
        Their uncompleted tasks are:
        ${taskList}

        For them, today is: ${today}
        Keep responses casual, warm, not too long, and helpful. If the user seems stressed or sad, be empathetic and give gentle suggestions.
    `.trim();
};