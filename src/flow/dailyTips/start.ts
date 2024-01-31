import BotWhatsapp from '@bot-whatsapp/bot';
import { runDailyTips } from 'src/services/openai';
import { likeOrDislikeFlow } from './likeOrDisLike';
import { settingsDailyTipsFlow } from './setting';
import { IDailyTips } from 'src/@types/dailyTips';
import { ICouple } from 'src/@types/couple';
import { IRelationship } from 'src/@types/relationship';


export const dailyTipsFlow = BotWhatsapp.addKeyword("TIPS DIARIOS")
    .addAnswer(["1️⃣ TIP DE HOY", "2️⃣ CONFIGURACIÓN", "3️⃣ SALIR"],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                if (ctx.body === "1" || ctx.body.toUpperCase() === "TIP DE HOY") {
                    const dailyTips = (state.getMyState()?.dailyTips ?? []) as IDailyTips
                    const userName = (state.getMyState()?.name ?? "") as string
                    const couple = (state.getMyState()?.couple) as ICouple
                    const relationship = state.getMyState()?.relationship as IRelationship
                    const newDailyTip = await runDailyTips(dailyTips.previuosTips, userName, couple.name, relationship.goal)
                    await flowDynamic([{ body: newDailyTip }])
                    dailyTips.previuosTips.push({ tip: newDailyTip })
                    await state.update(dailyTips)
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