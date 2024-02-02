import OpenAI from "openai";
import { generatePromptConversationMode, generatePromptDailyTips } from "./prompt";
import { IHistoryDailyTips } from "src/@types/dailyTips";
import { ChatCompletionMessageParam } from "openai/resources";
import { IUser } from "../models/users";
import { addResponseAmountFunction } from "../functions/users";
import { FREE_VERSION_LIMIT } from "src/@types/limit";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



export const runDailyTips = async (GPTResponseAmount: number, phone: string, previousTips: IHistoryDailyTips[], userName: string, coupleName: string, CouplesGoal: string, howTheyMet: string, reasonForFallingInLove: string, typeOfRelationship: string, setting: string): Promise<string> => {
    try {
        if (GPTResponseAmount >= FREE_VERSION_LIMIT) {
            return "Lo siento, has alcanzado el límite de respuestas para la versión gratuita. Por favor actualiza tu plan."
        }
        await addResponseAmountFunction(phone)
        const promtp = generatePromptDailyTips(previousTips, userName, coupleName, CouplesGoal, howTheyMet, reasonForFallingInLove, typeOfRelationship, setting)
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


export const runConversationMode = async (history: ChatCompletionMessageParam[], user: IUser): Promise<string> => {
    try {
        if (user.GPTResponseAmount >= FREE_VERSION_LIMIT) {
            return "Lo siento, has alcanzado el límite de respuestas para la versión gratuita. Por favor actualiza tu plan."
        }
        await addResponseAmountFunction(user.phone)
        const promtp = generatePromptConversationMode(user)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": promtp
                },
                ...history
            ],
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        return response.choices[0].message.content
    } catch (err) {
        console.error("[ERROR]: ", err)
    }
}
