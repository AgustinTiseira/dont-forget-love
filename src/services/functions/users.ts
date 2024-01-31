import User from "../models/users";

export const createUserFunction = async (phone: string) => {
    try {
        const user = new User({ phone });
        await user.save()
        return user;
    } catch (error) {
        console.error("[CREATE_USER_FUNCTION]", error);
    }
}