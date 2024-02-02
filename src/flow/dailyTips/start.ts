import BotWhatsapp from '@bot-whatsapp/bot';
import { runDailyTips } from 'src/services/openai';
import { likeOrDislikeFlow } from './likeOrDisLike';
import { settingsDailyTipsFlow } from './setting';
import { getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';
import { mainMenuFlow } from '../mainMenu';


export const dailyTipsFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["1️⃣ TIP DE HOY", "2️⃣ CONFIGURACIÓN", "3️⃣ SALIR"],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                if (ctx.body === "1" || ctx.body.toUpperCase() === "TIP DE HOY") {
                    await flowDynamic("Buscando tu tip de hoy... 💬")
                    const user = await getUserByPhoneFunction(ctx.from)
                    const newDailyTip = await runDailyTips(user.dailyTips.previuosTips, user.name, user.couple.coupleName, user.relationship.goal, user.relationship.howTheyMet, user.couple.reasonForFallingInLove, user.relationship.typeOfRelationship, user.dailyTips.setting)
                    await flowDynamic([{ body: newDailyTip }])
                    await updateUserFunction(ctx.from, { dailyTips: { previuosTips: [...user.dailyTips.previuosTips, { tip: newDailyTip }] } })
                    await gotoFlow(likeOrDislikeFlow)
                }
                if (ctx.body === "2" || ctx.body.toUpperCase() === "CONFIGURACIÓN") {
                    await gotoFlow(settingsDailyTipsFlow)
                } if (ctx.body === "3" || ctx.body.toUpperCase() === "SALIR") {
                    await gotoFlow(mainMenuFlow)
                }

            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })