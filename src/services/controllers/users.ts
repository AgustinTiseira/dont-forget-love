import { Request, Response } from 'express';
import User from "../models/users";
import { createUserFunction } from '../functions/users';

export const createUserController = async (req: Request, res: Response) => {
    try {
        const phone = req.body.phone;
        const user = await createUserFunction(phone);
        if (user) {
            return res.status(200).json(user);
        }
    } catch (error) {
        res.status(700).json(`CREATE_USER_CONTROLLER ${error}`);
    }
}