import User, { IUser } from "../models/users";

export const createUserFunction = async (phone: string): Promise<IUser> => {
    try {
        const user = new User({ phone, premium: false, GPTResponseAmount: 0, onboardingComplete: false, dailyTips: { previuosTips: [], setting: "" } });
        await user.save()
        return user;
    } catch (error) {
        console.error("[CREATE_USER_FUNCTION]", error);
    }
}

export const getUserByPhoneFunction = async (phone: string): Promise<IUser> => {
    try {
        const user = await User.findOne({ phone });
        return user
    } catch (error) {
        console.error("[GET_USER_BY_PHONE_FUNCTION]", error);
    }
}

export const updateUserFunction = async (phone: string, data: Partial<IUser>): Promise<IUser> => {
    try {
        const user = await User.findOneAndUpdate({ phone }, data, { new: true });
        return user
    } catch (error) {
        console.error("[UPDATE_USER_FUNCTION]", error);
    }
}

export const addResponseAmountFunction = async (phone: string): Promise<IUser> => {
    try {
        const user = await User.findOneAndUpdate({ phone }, { $inc: { GPTResponseAmount: 1 } }, { new: true });
        return user
    } catch (error) {
        console.error("[ADD_RESPONSE_AMOUNT_FUNCTION]", error);
    }

}