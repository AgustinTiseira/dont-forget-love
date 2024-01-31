import { model, Schema, Types } from "mongoose";
import { ICouple } from "src/@types/couple";
import { IRelationship } from "src/@types/relationship";



export interface IUser {
    id: Types.ObjectId;
    phone: string;
    name?: string;
    birthDate?: string;
    gender?: string;
    description?: string;
    couple?: ICouple
    relationship?: IRelationship
}

const IUserSchema = new Schema<IUser>({
    phone: { type: String, required: true, unique: true },
    name: { type: String },
    birthDate: { type: String },
    gender: { type: String },
    description: { type: String },
    couple: { type: Object },
    relationship: { type: Object }
});

export default model<IUser>("User", IUserSchema);
