import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from "openai/resources"
import { getUserByPhoneFunction } from "src/services/functions/users"
import { runConversationMode } from 'src/services/openai';
import { mainMenuFlow } from '../mainMenu';

export const bypassFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer([`*Escribe "SALIR" para terminar la conversación*`, "*Response normal para continuar*"], { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
        try {
            if (ctx.body.toUpperCase() === "SALIR") {
                await flowDynamic("Hasta luego! 👋")
                return gotoFlow(mainMenuFlow)
            }
            const newHistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
            newHistory.push({
                role: 'user',
                content: ctx.body
            })
            const user = await getUserByPhoneFunction(ctx.from)
            const responseAI = await runConversationMode(newHistory, user)
            newHistory.push({
                role: 'assistant',
                content: responseAI
            })
            await state.update({ history: newHistory })
            await flowDynamic(responseAI)
            return gotoFlow(bypassFlow)
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })