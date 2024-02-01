import BotWhatsapp from '@bot-whatsapp/bot';
import { getNameFlow } from './register';
import { mainMenuFlow } from './mainMenu';
import { createUserFunction, getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';
import { redirectToMissingInformationFlow } from 'src/utils/flows';

export const welcomeFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAction(async (ctx, { gotoFlow, flowDynamic }) => {
        try {
            let user = await getUserByPhoneFunction(ctx.from)
            if (!user) {
                user = await createUserFunction(ctx.from)
            }
            if (!user.onboardingComplete) {
                const flow = redirectToMissingInformationFlow(user)
                if (flow) {
                    await flowDynamic([{ body: `Hola! bienvenido al asistente de "don't forget love". Voy a ayudarte a mejorar tu relación con tu pareja o a llevarla al siguiente nivel` },
                    { body: `Para esto vamos a utilizar inteligencia artificial para que disfrutes de un asesor especializado en tu relación y te ayude a:` },
                    { body: `📝 Recordarte fechas importantes` },
                    { body: `🎨 Darte tips romanticos que le van a encantar a tu pareja` },
                    { body: `🎡 Ayudarte a planear citas diferentes, 100% personalizadas` },
                    { body: `🗣️ Charlar con vos sobre tu relación` },
                    { body: `😈 Salir de la monotonía` }
                    ])
                    return await gotoFlow(redirectToMissingInformationFlow(user))
                }
                await updateUserFunction(ctx.from, { onboardingComplete: true })
            }
            return await gotoFlow(mainMenuFlow)
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })
