import BotWhatsapp from '@bot-whatsapp/bot';
import { mainMenuFlow } from './mainMenu';
import { getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';

//obtengo como se conocieron

export const howTheyMetFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Como se conocieron?",
        "Cuentanos a que edad se conocieron y como fue su primer encuentro",
        "¿amor a primera vista?",
        "¿Quien dio el primer paso?",
        "¿Que fue lo que mas te gusto de tu pareja cuando la conociste?"],
        { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            try {
                await updateUserFunction(ctx.from, { relationship: { howTheyMet: ctx.body } })
                await flowDynamic([{ body: "ℹ️ Usaremos estos recuerdos para poder darte sugerencias 100% personalizadas" }, { body: "Ultimas 2 preguntas" }])
                await gotoFlow(typeOfRelationshipFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

export const typeOfRelationshipFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Que tipo de relación tienen?",
        "-solo estan saliendo",
        "-novios",
        "casados",
        "relacion abierta"],
        { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            try {
                const relationship = (await getUserByPhoneFunction(ctx.from)).relationship
                await updateUserFunction(ctx.from, { relationship: { ...relationship, typeOfRelationship: ctx.body } })
                await flowDynamic([{ body: "ℹ️ Adaptaremos nuestros consejos segun el punto de la relacion en la que se encuentren" }, { body: "Ultima pregunta 👏" }])
                await gotoFlow(CouplesGoalFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

export const CouplesGoalFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Cual es tu objetivo?",
        "Pasar al siguiente nivel 🔝",
        "Salir de la rutina 💫",
        "Mejorar la comunicación 🗣️",
        "Conocerse mejor 🤝",
        "Terminar la relación 🙅‍♀️",
        "Llevarse mejor"
    ],
        { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            try {
                const relationship = (await getUserByPhoneFunction(ctx.from)).relationship
                await updateUserFunction(ctx.from, { relationship: { ...relationship, goal: ctx.body } })
                await flowDynamic([{ body: "Danos unos segundos para analizar su situacion actual, sus personalizadades y el objetivo que buscas." }])
                await updateUserFunction(ctx.from, { onboardingComplete: true })
                return await gotoFlow(mainMenuFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })
