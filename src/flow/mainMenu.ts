import BotWhatsapp from '@bot-whatsapp/bot';
import { dailyTipsFlow } from './dailyTips/start';
import { conversationModeStartFlow } from './conversationMode/start';

export const mainMenuFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["1️⃣ Tips diarios 📝",
        "2️⃣ Recordatorios 📅",
        "3️⃣ Planificador de citas 🎡",
        "4️⃣ modo conversacion 🗣️",
        "5️⃣ Salir de la monotonía 😈",
        "6️⃣ Regalos 🎁",
        "7️⃣ Ajustes ⚙️",
    ], { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
        try {
            if (ctx.body === "1" || ctx.body.toUpperCase() === "TIPS DIARIOS") {
                await gotoFlow(dailyTipsFlow)
            }
            if (ctx.body === "4" || ctx.body.toUpperCase() === "MODO CONVERSACION") {
                await gotoFlow(conversationModeStartFlow)
            }
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })