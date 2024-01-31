import BotWhatsapp from '@bot-whatsapp/bot';


export const likeOrDislikeFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["1️⃣ Me gusta el consejo", "2️⃣ No me gusta el consejo"],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                const previuosTips = state.get("previousTips")
                if (ctx.body === "1" || ctx.body.toUpperCase() === "ME GUSTA") {
                    previuosTips[previuosTips.length - 1].like = true
                }
                if (ctx.body === "2" || ctx.body.toUpperCase() === "NO ME GUSTA") {
                    previuosTips[previuosTips.length - 1].like = false
                }
                await state.update({ previousTips: previuosTips })
                await flowDynamic([{ body: "Usaremos tu feedback para darte mejores consejos, gracias." }])
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })