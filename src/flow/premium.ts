import BotWhatsapp from '@bot-whatsapp/bot';

export const premiumFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(['Con nuestro paquete premium obtendras 100 mensajes nuevos para seguir recibiendo tips diarios y conversar con tu consejero de parejas',
        '1️⃣ COMPRAR',
        "2️⃣ SALIR"], { capture: true }, async (ctx, { endFlow, state }) => {
            try {
                if (ctx.body === "1" || ctx.body.toUpperCase() === "COMPRAR") {
                    return endFlow("Enviando link de compra...")
                }
                if (ctx.body === "2" || ctx.body.toUpperCase() === "SALIR") {
                    await state.update({ currentFlow: undefined })
                    return endFlow("Hasta luego! 👋")
                }
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })