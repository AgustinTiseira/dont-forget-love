import BotWhatsapp from '@bot-whatsapp/bot';
import { mainMenuFlow } from '../mainMenu';
import { getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';
import { time } from 'src/@types/time';
import { finalyFlow } from '../finalyFlow';


export const likeOrDislikeFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["1️⃣ Me gusta el consejo", "2️⃣ No me gusta el consejo"],
        { capture: true, idle: time['10_MINUTES'] }, async (ctx, { flowDynamic, gotoFlow }) => {
            try {
                if (ctx.idleFallBack) {
                    return await gotoFlow(finalyFlow)
                }
                const user = await getUserByPhoneFunction(ctx.from)
                const previuosTips = user.dailyTips.previuosTips
                if (ctx.body === "1" || ctx.body.toUpperCase() === "ME GUSTA") {
                    previuosTips[previuosTips.length - 1].like = true
                }
                if (ctx.body === "2" || ctx.body.toUpperCase() === "NO ME GUSTA") {
                    previuosTips[previuosTips.length - 1].like = false
                }
                await updateUserFunction(ctx.from, { dailyTips: { previuosTips: previuosTips } })
                await flowDynamic([{ body: "Usaremos tu feedback para darte mejores consejos, gracias." }])
                await gotoFlow(mainMenuFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })