import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from 'openai/resources';
import { getUserByPhoneFunction } from 'src/services/functions/users';
import { runConversationMode } from 'src/services/openai';
import { bypassFlow } from './bypass';
import { TEXT_MESSAGE_LIMIT } from 'src/@types/limit';
import { premiumFlow } from '../premium';

export const conversationModeStartFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["Podras tener una conversación con una AI especializada en tu relación, tu personalidad y la de tu pareja para darte los mejores consejos.",
        "Sientete libre de expresarte y preguntar todo lo que quieras. 🤗",
        "1️⃣ Empezar",
    ],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                if (ctx.body === "1" || ctx.body.toUpperCase() === "EMPEZAR") {
                    const user = await getUserByPhoneFunction(ctx.from)
                    await flowDynamic(`Hola ${user.name}.`)
                    return await gotoFlow(initConversationModeAIFlow)
                }
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

export const initConversationModeAIFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿cómo estuvo tu dia?"], { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
        try {
            const user = await getUserByPhoneFunction(ctx.from)
            const newHistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
            newHistory.push({
                role: 'assistant',
                content: `Hola ${user.name}. ¿Cómo estuvo tu día?`
            })

            newHistory.push({
                role: 'user',
                content: ctx.body
            })
            const responseAI = await runConversationMode(newHistory, user)
            if (responseAI === TEXT_MESSAGE_LIMIT) {
                await flowDynamic(responseAI)
                return await gotoFlow(premiumFlow)
            }
            await flowDynamic(responseAI)
            newHistory.push({
                role: 'assistant',
                content: responseAI
            })
            await state.update({ history: newHistory })
            return await gotoFlow(bypassFlow)
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })