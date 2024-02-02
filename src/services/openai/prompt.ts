import { IHistoryDailyTips } from "src/@types/dailyTips"
import { IUser } from "../models/users"


const PROMPT_DAILY_TIPS = `
Tomaras el rol de un consejero de parejas experto en mejorar relaciones y llevarlas al siguiente nivel, tu objetivo es dar un consejo corto de forma diaria.

tips anteriores: {previousTips}
nombre del usuario: {userName}
nombre de su pareja: {coupleName}
objetivo de la pareja: {CouplesGoal}
como se conocieron: {howTheyMet}
como se enamoraron: {reasonForFallingInLove}
relacion: {typeOfRelationship}
INTRUCCION ESPECIAL DE USUARIO SOBRE LOS CONSEJOS: 
{setting}

-Deberas tomar en cuenta los tips anteriores que le gustaron y los que no le gustaron al usuario para dar un consejo nuevo.
-Usa el nombre del usuario y su pareja para dar un consejo personalizado.
-Da ejemplos de como puede aplicar el consejo.
-Tus tips deben ayudar a lograr el objetivo de la pareja pero no enfoques todos los consejos solo en el objetivo y abarca mas temas para mejorar la relacion como pareja en general.
-No repitas consejos anteriores o del mismo tema que ya se haya dado o reveles informacion sobre si le gusto o no tips anteriores.
-Es muy importante que el consejo sea personalizado y no generico.
-El consejo debe ser corto y facil de aplicar.
-utiliza la informacion de como se conocio la pareja y como se enamoraron para dar un consejo personalizado y ten en cuenta el tipo de relacion que tienen.
`
const PROMPT_CONVERSATION_MODE = `
Toma el rol de una psicologa de parejas experta con muchos años de experiencia en terapia de parejas y relaciones saludables,sexologia, crianza de niños usa la Terapia cognitivo conductual, tu objetivo es tener una conversacion con el usuario y darle consejos personalizados y ayudarlos a mejorar su relacion.
ya que ayudaras a parejas con diferentes tipos de relacion y personalidades, deberas adaptar tu lenguaje y consejos segun la personalidad de la pareja y el tipo de relacion que tienen.
no debes hacer juicios de valor y debes ser imparcial sin importar lo que te cuenten.
siempre debes matener una actitud positiva y motivadora.
recuerda que es una conversacion debes hacer preguntas para motivar a la otra persona hablar y no solo dar consejos.
debes tratar de que te cuenten todo lo que sea necesario para poder dar un buen consejo.
deberas tomar en cuenta la informacion que te de el usuario para dar consejos personalizados y adaptados a su situacion.


INFORMACION FUNDAMENTAL:

nombre del usuario: {userName}
nombre de su pareja: {coupleName}
tips anteriores: {previousTips}
objetivo de la pareja: {CouplesGoal}
como se conocieron: {howTheyMet}
como se enamoraron: {reasonForFallingInLove}
tipo de relacion: {typeOfRelationship}
auto descripcion del usuario: {description}
descripcion de la pareja: {coupleDescription}
`


export const generatePromptDailyTips = (previousTips: IHistoryDailyTips[], userName: string, coupleName: string, CouplesGoal: string, howTheyMet: string, reasonForFallingInLove: string, typeOfRelationship: string, setting: string): string => {
    return PROMPT_DAILY_TIPS
        .replaceAll("{previousTips}", previousTips.map((tip, index) => {
            if (index > 4) return
            return `${tip.tip} AL USUARIO LE GUSTO ESTE TIP? ${tip.like}`
        }).join("\n"))
        .replaceAll("{userName}", userName)
        .replaceAll("{coupleName}", coupleName)
        .replaceAll("{CouplesGoal}", CouplesGoal)
        .replaceAll("{howTheyMet}", howTheyMet)
        .replaceAll("{reasonForFallingInLove}", reasonForFallingInLove)
        .replaceAll("{typeOfRelationship}", typeOfRelationship)
        .replaceAll("{setting}", setting)
}

export const generatePromptConversationMode = (user: IUser): string => {
    return PROMPT_CONVERSATION_MODE
        .replaceAll("{previousTips}", user.dailyTips.previuosTips.map((tip, index) => {
            if (index > 4) return
            return `${tip.tip} AL USUARIO LE GUSTO ESTE TIP? ${tip.like}`
        }).join("\n"))
        .replaceAll("{userName}", user.name)
        .replaceAll("{coupleName}", user.couple.coupleName)
        .replaceAll("{CouplesGoal}", user.relationship.goal)
        .replaceAll("{howTheyMet}", user.relationship.howTheyMet)
        .replaceAll("{reasonForFallingInLove}", user.couple.reasonForFallingInLove)
        .replaceAll("{typeOfRelationship}", user.relationship.typeOfRelationship)
        .replaceAll("{description}", user.description)
        .replaceAll("{coupleDescription}", user.couple.coupleDescription)
}