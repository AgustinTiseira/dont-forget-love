import BotWhatsapp from '@bot-whatsapp/bot';
import { getCoupleNameFlow } from './couple';
import { updateUserFunction } from 'src/services/functions/users';
import { checkFormat } from 'src/utils/date';
import { time } from 'src/@types/time';
import { finalyFlow } from './finalyFlow';

//Obtengo el nombre del usuario

export const getNameFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["Para empezar, ¿Cual es tu nombre? (No compartiremos tu información con nadie)"],
        { capture: true, idle: time['5_MINUTES'] }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                if (ctx.idleFallBack) {
                    return await gotoFlow(finalyFlow)
                }
                await flowDynamic([
                    { body: `Un gusto ${ctx.body}!` }, { body: "Pregunta: 1/3 ✅" }])
                await state.update({ name: ctx.body })
                await updateUserFunction(ctx.from, { name: ctx.body })
                return await gotoFlow(getAgeFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

// Obtengo la edad del usuario

export const getAgeFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Cual es tu fecha de nacimiento?", "usa el formato dd/mm/aaaa", "Por Ejemplo: 25/01/1990", "estas preguntas nos ayudan a hacer un plan personalizado para vos."],
        { capture: true, idle: time['5_MINUTES'] }, async (ctx, { state, gotoFlow, flowDynamic, fallBack }) => {
            try {
                if (ctx.idleFallBack) {
                    return await gotoFlow(finalyFlow)
                }
                /*                 if (!checkFormat(ctx.body)) {
                                    return fallBack("La fecha que ingresaste no es valida, por favor ingresala en el formato dd/mm/aaaa")
                                } */
                await flowDynamic([{ body: "Pregunta: 2/3 ✅✅" }])
                await state.update({ birthDate: ctx.body })
                await updateUserFunction(ctx.from, { birthDate: ctx.body })
                return await gotoFlow(getGenderFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

// Obtengo el genero del usuario

export const getGenderFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Cual es tu genero?"],
        { capture: true, idle: time['5_MINUTES'] }, async (ctx, { state, gotoFlow, flowDynamic }) => {
            try {
                if (ctx.idleFallBack) {
                    return await gotoFlow(finalyFlow)
                }
                await flowDynamic([{ body: "Pregunta: 3/3 ✅✅✅" }, { body: "Solo una cosita mas, necesitamos una breve descripción tuya" }])
                await state.update({ gender: ctx.body })
                await updateUserFunction(ctx.from, { gender: ctx.body })
                return await gotoFlow(descriptionFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

// Obtengo la descripcion del usuario y creo el usuario. sigue el flujo a las preguntas sobre la pareja

export const descriptionFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["Describete de la forma que mas te sientas comodo",
        "Usa tantos adjetivos como quieras PERO EN UN SOLO MENSAJE",
        "Mas adelante podras cambiar tu descripción cuando quieras",
        "No olvides mencionar: \n -A que te dedicas \n -Que te gusta hacer en tu tiempo libre \n etc.."],
        { capture: true, idle: time['10_MINUTES'] }, async (ctx, { state, gotoFlow, flowDynamic, fallBack }) => {
            try {
                if (ctx.idleFallBack) {
                    return await gotoFlow(finalyFlow)
                }
                /*                 if (ctx.body.length < 15) {
                                    return fallBack("Por favor, cuentanos un poco mas para alimentar mejor el algoritmo")
                                } */
                await state.update({ description: ctx.body })
                await flowDynamic([{ body: "¡Listo! Ya estas registrado en Don't forget love" }, { body: "Ahora vamos a conocer mejor a tu pareja" }])
                await updateUserFunction(ctx.from, { description: ctx.body })
                return await gotoFlow(getCoupleNameFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })