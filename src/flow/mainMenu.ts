import BotWhatsapp from '@bot-whatsapp/bot';
import { dailyTipsFlow } from './dailyTips/start';

export const mainMenuFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["1️⃣ Tips diarios 📝",
        "2️⃣ Recordatorios 📅",
        "3️⃣ Planificador de citas 🎡",
        "4️⃣ Charla con nosotros 🗣️",
        "5️⃣ Salir de la monotonía 😈",
        "6️⃣ Regalos 🎁",
        "7️⃣ Ajustes ⚙️",
    ], { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
        try {
            if (ctx.body === "1" || ctx.body.toUpperCase() === "TIPS DIARIOS") {
                await gotoFlow(dailyTipsFlow)
            }
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })