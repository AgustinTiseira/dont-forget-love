import BotWhatsapp from '@bot-whatsapp/bot';
import { welcomeFlow } from './welcome.flow';
import { descriptionFlow, getAgeFlow, getGenderFlow, getNameFlow } from './register';
/**
 * Debes de implementasr todos los flujos
 */
export default BotWhatsapp.createFlow(
    [
        welcomeFlow,
        getNameFlow,
        descriptionFlow,
        getGenderFlow,
        getAgeFlow
    ]
)