import BotWhatsapp from '@bot-whatsapp/bot';
import { welcomeFlow } from './welcome.flow';
import { descriptionFlow, getAgeFlow, getGenderFlow, getNameFlow } from './register';
import { getCoupleAgeFlow, getCoupleDescriptionFlow, getCoupleGenderFlow, getCoupleNameFlow, reasonForFallingInLoveFlow } from './couple';
import { CouplesGoal, howTheyMetFlow, typeOfRelationship } from './relationship';
import { dailyTipsFlow } from './dailyTips/start';
import { mainMenuFlow } from './mainMenu';
import { likeOrDislikeFlow } from './dailyTips/likeOrDisLike';
import { settingsDailyTipsFlow } from './dailyTips/setting';


export default BotWhatsapp.createFlow(
    [
        welcomeFlow,
        getNameFlow,
        descriptionFlow,
        getGenderFlow,
        getAgeFlow,
        getCoupleNameFlow,
        getCoupleAgeFlow,
        getCoupleGenderFlow,
        getCoupleDescriptionFlow,
        reasonForFallingInLoveFlow,
        mainMenuFlow,
        CouplesGoal,
        typeOfRelationship,
        howTheyMetFlow,
        dailyTipsFlow,
        likeOrDislikeFlow,
        settingsDailyTipsFlow
    ]
)