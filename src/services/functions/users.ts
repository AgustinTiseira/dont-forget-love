import User, { IUser } from "../models/users";

export const createUserFunction = async (phone: string): Promise<IUser> => {
    try {
        const user = new User({ phone, onboardingComplete: false, dailyTips: { previuosTips: [], setting: "" } });
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
        console.log(phone)
        const user = await User.findOneAndUpdate({ phone }, data, { new: true });
        if (user) {
            await user.save()
            return user
        }
    } catch (error) {
        console.error("[UPDATE_USER_FUNCTION]", error);
    }
}