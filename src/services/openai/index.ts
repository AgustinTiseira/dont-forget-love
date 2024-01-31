import OpenAI from "openai";
import { generatePromptDailyTips } from "./prompt";
import { IHistoryDailyTips } from "src/@types/dailyTips";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



export const runDailyTips = async (previousTips: IHistoryDailyTips[], userName: string, coupleName: string, CouplesGoal: string): Promise<string> => {
    try {
        const promtp = generatePromptDailyTips(previousTips, userName, coupleName, CouplesGoal)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": promtp
                },
            ],
            temperature: 1,
            max_tokens: 800,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        return response.choices[0].message.content
    } catch (err) {
        console.error("[ERROR]: ", err)
    }
}
