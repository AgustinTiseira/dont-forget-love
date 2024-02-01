import BotWhatsapp from '@bot-whatsapp/bot';
import { ICouple } from 'src/@types/couple';
import { changeBirthDateToAge } from 'src/utils/date';
import { howTheyMetFlow } from './relationship';
import { getUserByPhoneFunction, updateUserFunction } from 'src/services/functions/users';

//obtengo el nombre de la pareja

export const getCoupleNameFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Cual es el nombre de tu pareja? (puedes usar su apodo o mejor aun, como le gusta que la llamen)"],
        { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            try {
                await flowDynamic([{
                    body: `Sera un gusto ayudarte en tu relacion con ${ctx.body}!
    Usaremos su nombre para crear un perfil completo sobre tu pareja.` }, { body: "Pregunta: 1/5 ✅" }])
                await updateUserFunction(ctx.from, { couple: { coupleName: ctx.body } })
                await gotoFlow(getCoupleAgeFlow)
            } catch (err) {
                console.log(`[ERROR]:`, err)
                return
            }
        })

// Obtengo la edad de la pareja

export const getCoupleAgeFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION).addAnswer(["¿Cual es la fecha de nacimiento de tu pareja?", "usa el formato dd/mm/aaaa", "Por Ejemplo: 25/01/1990"],
    { capture: true }, async (ctx, { gotoFlow, flowDynamic }) => {
        try {
            const coupleAge = changeBirthDateToAge(ctx.body)
            const user = await getUserByPhoneFunction(ctx.from)
            await flowDynamic([{ body: `Genial, entonces ${user.name} tiene ${coupleAge} años y tu ${changeBirthDateToAge(user.birthDate)} años` }, { body: "Pregunta: 2/5 ✅✅" }])
            await updateUserFunction(ctx.from, { couple: { ...user.couple, coupleBirthDate: ctx.body } })
            await gotoFlow(getCoupleGenderFlow)
        }
        catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })

// Obtengo el genero de la pareja

export const getCoupleGenderFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Cual es el genero de tu pareja?"],
        { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            await flowDynamic([{ body: `Perfecto, ya tenemos la información basica sobre tu pareja` }, { body: "Pregunta: 3/5 ✅✅✅" }])
            const couple = (await getUserByPhoneFunction(ctx.from)).couple
            await updateUserFunction(ctx.from, { couple: { ...couple, coupleGender: ctx.body } })
            await gotoFlow(getCoupleDescriptionFlow)
        })

// Obtengo la descripcion de la pareja

export const getCoupleDescriptionFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Como describirias a tu pareja?",
        "Expláyate todo lo que necesites",
        "- Cuentanos que le saca una sonrisa",
        "- Su plato favorito",
        "- Algo que si o si necesitemos saber",
        "- Algo que odie",
        "que la motiva?",
        "usa un solo mensaje"],
        { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            await flowDynamic([{ body: `Excelente, solo una pregunta mas...` }, { body: "Pregunta: 4/5 ✅✅✅✅" }])
            const couple = (await getUserByPhoneFunction(ctx.from)).couple
            await updateUserFunction(ctx.from, { couple: { ...couple, coupleDescription: ctx.body } })
            await gotoFlow(reasonForFallingInLoveFlow)
        })

// Obtengo la razon por la que su pareja se enamoro del usuario

export const reasonForFallingInLoveFlow = BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.ACTION)
    .addAnswer(["¿Que hizo que tu pareja se enamore de vos?"],
        { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
            await flowDynamic([{ body: `Gracias por la información` },
            { body: "ℹ️ Esta información nos permite crear un informe completo sobre sus personalidades" },
            { body: "Pregunta: 5/5 ✅✅✅✅✅" }])
            const couple = (await getUserByPhoneFunction(ctx.from)).couple
            await updateUserFunction(ctx.from, { couple: { ...couple, reasonForFallingInLove: ctx.body } })
            await gotoFlow(howTheyMetFlow)
        })