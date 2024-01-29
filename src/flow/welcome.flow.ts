import BotWhatsapp from '@bot-whatsapp/bot';


export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAction(async (ctx, { state, gotoFlow }) => {
        try {
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })
