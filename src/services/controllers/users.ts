import { Request, Response } from 'express';
import User from "../models/users";
import { createUserFunction, getUserByPhoneFunction, updateUserFunction } from '../functions/users';

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

export const getUserByPhoneController = async (req: Request, res: Response) => {
    try {
        const phone = req.params.phone;
        const user = await getUserByPhoneFunction(phone);
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(404).json(`User not found`);
        }
    } catch (error) {
        res.status(700).json(`GET_USER_BY_PHONE_CONTROLLER ${error}`);
    }
}

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const { phone, data } = req.body;
        const user = await updateUserFunction(phone, data);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json(`User not found`);
        }
    } catch (error) {
        res.status(700).json(`UPDATE_USER_CONTROLLER ${error}`);
    }
}
