import BotWhatsapp from '@bot-whatsapp/bot';
import { runDailyTips } from 'src/services/openai';
import { likeOrDislikeFlow } from './likeOrDisLike';
import { settingsDailyTipsFlow } from './setting';
import { getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';
import { mainMenuFlow } from '../mainMenu';
import { TEXT_MESSAGE_LIMIT } from 'src/@types/limit';
import { premiumFlow } from '../premium';


export const dailyTipsFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["1️⃣ TIP DE HOY", "2️⃣ CONFIGURACIÓN", "3️⃣ SALIR"],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                if (ctx.body === "1" || ctx.body.toUpperCase() === "TIP DE HOY") {
                    await flowDynamic("Buscando tu tip de hoy... 💬")
                    const user = await getUserByPhoneFunction(ctx.from)
                    const newDailyTip = await runDailyTips(user.GPTResponseAmount, user.phone, user.dailyTips.previuosTips, user.name, user.couple.coupleName, user.relationship.goal, user.relationship.howTheyMet, user.couple.reasonForFallingInLove, user.relationship.typeOfRelationship, user.dailyTips.setting)
                    await flowDynamic([{ body: newDailyTip }])
                    if (newDailyTip === TEXT_MESSAGE_LIMIT) {
                        return await gotoFlow(premiumFlow)
                    }
                    await updateUserFunction(ctx.from, { dailyTips: { previuosTips: [...user.dailyTips.previuosTips, { tip: newDailyTip }] } })
                    return await gotoFlow(likeOrDislikeFlow)
                }
                if (ctx.body === "2" || ctx.body.toUpperCase() === "CONFIGURACIÓN") {
                    return await gotoFlow(settingsDailyTipsFlow)
                } if (ctx.body === "3" || ctx.body.toUpperCase() === "SALIR") {
                    await flowDynamic("Hasta luego! 👋")
                    await state.update({ currentFlow: "mainMenuFlow" })
                    return await gotoFlow(mainMenuFlow)
                }

            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })