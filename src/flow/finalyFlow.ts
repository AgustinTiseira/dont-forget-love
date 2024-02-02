import BotWhatsapp from '@bot-whatsapp/bot';

export const finalyFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer('Se canceló por inactividad', {}, async (_, { state, endFlow }) => {
        await state.update({ currentFlow: undefined })
        return endFlow(
            'tranqui cuando quieras podes volver a iniciar la conversación, seguiras desde donde te quedaste! 🤗')
    })