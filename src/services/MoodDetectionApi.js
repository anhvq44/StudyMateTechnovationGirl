import { Client } from "@gradio/client";

export async function analyzeMood(text) {

    const client = await Client.connect("quet1120/study-mate");
    const result = await client.predict("/predict", { 		
		  text: text 
    });

    const moodList = result.data[0].confidences.map((mood) => {
        return{
            label: mood.label, 
            confidence: mood.confidence
        }
    })
    return moodList
}