import BotWhatsapp from '@bot-whatsapp/bot';
import { mainMenuFlow } from './mainMenu';
import { getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';
import { time } from 'src/@types/time';
import { finalyFlow } from './finalyFlow';

//obtengo como se conocieron

export const howTheyMetFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Como se conocieron?",
        "Cuentanos a que edad se conocieron y como fue su primer encuentro",
        "¿amor a primera vista?",
        "¿Quien dio el primer paso?",
        "¿Que fue lo que mas te gusto de tu pareja cuando la conociste?"],
        { capture: true, idle: time['30_MINUTES'] }, async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            try {
                if (ctx.idleFallBack) {
                    return await gotoFlow(finalyFlow)
                }
                if (ctx.body.length < 15) {
                    return fallBack("Por favor, cuentanos un poco mas para alimentar mejor el algoritmo")
                }
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
        { capture: true, idle: time['30_MINUTES'] }, async (ctx, { flowDynamic, gotoFlow }) => {
            try {
                if (ctx.idleFallBack) {
                    return await gotoFlow(finalyFlow)
                }
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
    .addAnswer(["¿Cual es tu objetivo?  describilo libremente cuanto mas nos expliques mejor vamos a poder ayudarte a lograrlo 🎯",
        "Trata de usar terminos como:",
        "Pasar al siguiente nivel 🔝",
        "Salir de la rutina 💫",
        "Mejorar la comunicación 🗣️",
        "Conocerse mejor 🤝",
        "Llevarse mejor"
    ],
        { capture: true, idle: time['30_MINUTES'] }, async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            try {
                if (ctx.idleFallBack) {
                    return await gotoFlow(finalyFlow)
                }
                if (ctx.body.length < 15) {
                    return fallBack("Por favor, cuentanos un poco mas para alimentar mejor el algoritmo")
                }
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
