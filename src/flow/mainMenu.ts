import BotWhatsapp from '@bot-whatsapp/bot';
import { dailyTipsFlow } from './dailyTips/start';
import { conversationModeStartFlow } from './conversationMode/start';
import { time } from 'src/@types/time';
import { finalyFlow } from './finalyFlow';

export const mainMenuFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["1️⃣ Tips diarios 📝",
        "2️⃣ modo conversacion 🗣️",
        "3️⃣ Salir de la monotonía 😈",
        "4️⃣ Premium 🌟",
        /*         "5️⃣ Configuración ⚙️",
                "6️⃣ Regalos 🎁",
                "7️⃣ Recordatorios 📅",
                "8️⃣ Planificador de citas 🎡", */


    ], { capture: true, idle: time['2_MINUTES'] }, async (ctx, { state, gotoFlow, fallBack }) => {
        try {
            const currentFlow = await state.getMyState()?.currentFlow

            if (ctx.idleFallBack) {
                return await gotoFlow(finalyFlow)
            }
            if (!currentFlow) {
                if (!ctx.body.includes("1") && !ctx.body.includes("2") && !ctx.body.includes("3") && !ctx.body.includes("4") && !ctx.body.toUpperCase().includes("TIPS DIARIOS") && !ctx.body.toUpperCase().includes("MODO CONVERSACION")) {
                    return fallBack("Por favor, elige una opción válida 🙏")
                }
                if (ctx.body === "1" || ctx.body.toUpperCase() === "TIPS DIARIOS") {
                    await state.update({ currentFlow: "dailyTipsFlow" })
                    return await gotoFlow(dailyTipsFlow)
                }
                if (ctx.body === "2" || ctx.body.toUpperCase() === "MODO CONVERSACION") {
                    await state.update({ currentFlow: "conversationModeStartFlow" })
                    return await gotoFlow(conversationModeStartFlow)
                }
            }
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })