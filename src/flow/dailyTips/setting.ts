import BotWhatsapp from '@bot-whatsapp/bot';
import flow from '..';


export const settingsDailyTipsFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["Agrega sugerencias sobre como te gustan los consejos",
        "Por ejemplo:",
        "Me gustaria que tengas en cuenta ...",
        "No me gustan los consejos que ...",
        "Profundiza mas en ...",
        "Se mas informal en tu comunicación",
    ],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                const dailyTips = state.getMyState()?.dailyTips
                dailyTips.setting = ctx.body
                await await state.update(dailyTips)
                flowDynamic([{ body: "Gracias por tu feedback, lo tendremos en cuenta para darte mejores consejos." }])
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })