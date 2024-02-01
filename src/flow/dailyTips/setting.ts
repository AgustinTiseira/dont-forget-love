import BotWhatsapp from '@bot-whatsapp/bot';
import flow from '..';
import { getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';


export const settingsDailyTipsFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["Agrega sugerencias sobre como te gustan los consejos",
        "Por ejemplo:",
        "Me gustaria que tengas en cuenta ...",
        "No me gustan los consejos que ...",
        "Profundiza mas en ...",
        "Se mas informal en tu comunicación",
    ],
        { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            try {
                const user = await getUserByPhoneFunction(ctx.from)
                updateUserFunction(ctx.from, { dailyTips: { previuosTips: [...user.dailyTips.previuosTips], setting: ctx.body } })
                flowDynamic([{ body: "Gracias por tu feedback, lo tendremos en cuenta para darte mejores consejos." }])
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })