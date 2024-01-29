import BotWhatsapp from '@bot-whatsapp/bot';


const responseGetName = (name: string) => {
    return `Un gusto ${name}! \n
En "don't forget love" sabemos lo dificil que puede llegar a ser mantener el fuego del amor a lo largo del tiempo 😅 o ser detallista con la persona que te gusta 😍
Vamos a aprender todo lo que le gusta a tu pareja y armaremos un plan de acción para que puedas sorprenderla a diario\n
-Te recordaremos fechas importantes.
-Te daremos ideas de regalos.
-Te ayudaremos a planear citas diferentes.
-Y mucho más!
    `
}

export const getNameFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["Para empezar, ¿Cual es tu nombre? (No compartiremos tu información con nadie)"],
        { capture: true }, async (ctx, { state, flowDynamic, gotoFlow }) => {
            try {
                await flowDynamic([{ body: responseGetName(ctx.body) }, { body: "Pregunta: 1/3 ✅" }])
                state.update({ name: ctx.body })
                await gotoFlow(getAgeFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

export const getAgeFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Cual es tu edad?", "estas preguntas nos ayudan a hacer un plan personalizado para vos."],
        { capture: true }, async (ctx, { state, gotoFlow, flowDynamic }) => {
            try {
                await flowDynamic([{ body: "Pregunta: 2/3 ✅✅" }])
                state.update({ age: ctx.body })
                await gotoFlow(getGenderFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

export const getGenderFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Cual es tu genero?"],
        { capture: true }, async (ctx, { state, gotoFlow, flowDynamic }) => {
            try {
                await flowDynamic([{ body: "Pregunta: 3/3 ✅✅✅" }, { body: "Solo una cosita mas, necesitamos una breve descripción tuya" }])
                state.update({ gender: ctx.body })
                // logica de crear user
                //--------
                await gotoFlow(descriptionFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

export const descriptionFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["Describete de la forma que mas te sientas comodo",
        "Usa tantos adjetivos como quieras PERO EN UN SOLO MENSAJE",
        "Mas adelante podras cambiar tu descripción cuando quieras",
        "No olvides mencionar: \n -A que te dedicas \n -Que te gusta hacer en tu tiempo libre \n etc.."],
        { capture: true }, async (ctx, { state, gotoFlow, flowDynamic }) => {
            try {
                state.update({ description: ctx.body })
                // logica de crear user
                //--------
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })