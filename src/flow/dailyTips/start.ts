import BotWhatsapp from '@bot-whatsapp/bot';
import { runDailyTips } from 'src/services/openai';
import { likeOrDislikeFlow } from './likeOrDisLike';


export const dailyTipsFlow = BotWhatsapp.addKeyword("TIPS DIARIOS")
    .addAnswer(["1️⃣ TIP DE HOY", "2️⃣ SALIR"],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                if (ctx.body === "1" || ctx.body.toUpperCase() === "TIP DE HOY") {
                    const previuosTips = state.get("previousTips")
                    const userName = state.get("name")
                    const couple = state.get("couple")
                    const relationship = state.get("relationship")
                    const newDailyTip = await runDailyTips(previuosTips, userName, couple.name, relationship.typeOfRelationship)
                    await flowDynamic([{ body: newDailyTip }])
                    await state.update({ previousTips: [...previuosTips, { previousTip: newDailyTip }] })
                    await gotoFlow(likeOrDislikeFlow)
                }

            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })