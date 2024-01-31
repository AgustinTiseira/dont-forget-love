import BotWhatsapp from '@bot-whatsapp/bot';
import { getNameFlow } from './register';
import { mainMenuFlow } from './mainMenu';
import { createUserFunction } from 'src/services/functions/users';

const user: boolean = false


export const welcomeFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAction(async (ctx, { gotoFlow, flowDynamic }) => {
        try {
            if (user) {
                await gotoFlow(mainMenuFlow)
            }
            else {
                await createUserFunction(ctx.from)
                await flowDynamic([{ body: `Hola! bienvenido a la plataforma de "don't forget love".` },
                { body: `Voy a ayudarte a mejorar tu relación con tu pareja o a llevarla al siguiente nivel` },
                { body: `Para esto vamos a crear una inteligencia artificial especializado en tu pareja y en vos, que pueda:` },
                { body: `📝 Recordarte fechas importantes` },
                { body: `🎨 Darte tips romanticos que le van a encantar a tu pareja` },
                { body: `🎡 Ayudarte a planear citas diferentes, 100% personalizadas` },
                { body: `🗣️ Charlar con vos sobre tu relación` },
                { body: `😈 Salir de la monotonía` }
                ])
                await gotoFlow(getNameFlow)
            }
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })
