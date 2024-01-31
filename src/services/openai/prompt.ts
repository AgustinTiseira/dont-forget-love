import { DailyTips } from "src/@types/dailyTips"


const PROMPT_DAILY_TIPS = `
Tomaras el rol de un consejero de parejas experto en mejorar relaciones y llevarlas al siguiente nivel, tu objetivo es dar un consejo corto de forma diaria.

tips anteriores: {previousTips}
nombre del usuario: {userName}
nombre de su pareja: {coupleName}
objetivo de la pareja: {CouplesGoal}

-Deberas tomar en cuenta los tips anteriores que le gustaron al usuario para dar un consejo nuevo.
-Usa el nombre del usuario y su pareja para dar un consejo personalizado.
-Da ejemplos de como puede aplicar el consejo.
-Tus tips deben ayudar a lograr el objetivo de la pareja y mejorar la relacion como pareja.
-El consejo debe ser corto y facil de aplicar.
-El consejo debe ser positivo y motivador.

`



export const generatePromptDailyTips = (previousTips: DailyTips[], userName: string, coupleName: string, CouplesGoal: string): string => {
    return PROMPT_DAILY_TIPS
        .replaceAll("{previousTips}", previousTips.map(tip => tip.previousTip).join("\n"))
        .replaceAll("{userName}", userName)
        .replaceAll("{coupleName}", coupleName)
        .replaceAll("{CouplesGoal}", CouplesGoal)
}
