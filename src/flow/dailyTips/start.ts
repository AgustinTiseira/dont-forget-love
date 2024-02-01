import BotWhatsapp from '@bot-whatsapp/bot';
import { runDailyTips } from 'src/services/openai';
import { likeOrDislikeFlow } from './likeOrDisLike';
import { settingsDailyTipsFlow } from './setting';
import { IDailyTips } from 'src/@types/dailyTips';
import { ICouple } from 'src/@types/couple';
import { IRelationship } from 'src/@types/relationship';
import { getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';


export const dailyTipsFlow = BotWhatsapp.addKeyword("TIPS DIARIOS")
    .addAnswer(["1️⃣ TIP DE HOY", "2️⃣ CONFIGURACIÓN", "3️⃣ SALIR"],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                if (ctx.body === "1" || ctx.body.toUpperCase() === "TIP DE HOY") {
                    const user = await getUserByPhoneFunction(ctx.from)
                    const newDailyTip = await runDailyTips(user.dailyTips.previuosTips, user.name, user.couple.name, user.relationship.goal)
                    await flowDynamic([{ body: newDailyTip }])
                    await updateUserFunction(ctx.from, { dailyTips: { previuosTips: [...user.dailyTips.previuosTips, { tip: newDailyTip }] } })
                    await gotoFlow(likeOrDislikeFlow)
                }
                if (ctx.body === "2" || ctx.body.toUpperCase() === "CONFIGURACIÓN") {
                    await gotoFlow(settingsDailyTipsFlow)
                }

            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })