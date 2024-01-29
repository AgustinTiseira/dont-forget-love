import BotWhatsapp from '@bot-whatsapp/bot';
import { getNameFlow } from './register';

const user: boolean = false


export const welcomeFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAction(async (ctx, { state, gotoFlow, flowDynamic }) => {
        try {
            if (user) {

            }
            else {
                await flowDynamic("Hola! bienvenido a la plataforma de don't forget love \n Voy a ayudarte a mejorar tu relación con tu pareja")
                await gotoFlow(getNameFlow)
            }
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })
