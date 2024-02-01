import { IMethodsChain } from "@bot-whatsapp/bot";
import { getCoupleAgeFlow, getCoupleDescriptionFlow, getCoupleNameFlow, reasonForFallingInLoveFlow } from "src/flow/couple";
import { descriptionFlow, getAgeFlow, getGenderFlow, getNameFlow } from "src/flow/register";
import { CouplesGoalFlow, howTheyMetFlow, typeOfRelationshipFlow } from "src/flow/relationship";
import { IUser } from "src/services/models/users"


export enum UserProperty {
    name = "name",
    birthDate = "birthDate",
    gender = "gender",
    description = "description",
}

export enum CoupleProperty {
    coupleName = "coupleName",
    coupleBirthDate = "coupleBirthDate",
    coupleGender = "coupleGender",
    coupleDescription = "coupleDescription",
    reasonForFallingInLove = "reasonForFallingInLove",
}

export enum RelationshipProperty {
    howTheyMet = "howTheyMet",
    typeOfRelationship = "typeOfRelationship",
    goal = "goal",
}

export const detectMissingInformation = (user: IUser) => {
    let missingProperty: UserProperty | CoupleProperty | RelationshipProperty | undefined;
    for (const property in UserProperty) {
        const propertyName = UserProperty[property];
        if (!user[propertyName]) {
            missingProperty = propertyName;
        }
    }
    for (const property in CoupleProperty) {
        const propertyName = CoupleProperty[property];
        if (!user.couple[propertyName]) {
            missingProperty = propertyName;
        }
    }
    for (const property in RelationshipProperty) {
        const propertyName = RelationshipProperty[property];
        if (!user.relationship[propertyName]) {
            missingProperty = propertyName;
        }
    }
    return missingProperty
}

export const redirectToMissingInformationFlow = (user: IUser) => {
    const map: Record<UserProperty | CoupleProperty | RelationshipProperty, IMethodsChain> = {
        [UserProperty.name]: getNameFlow,
        [UserProperty.birthDate]: getAgeFlow,
        [UserProperty.gender]: getGenderFlow,
        [UserProperty.description]: descriptionFlow,
        [CoupleProperty.coupleName]: getCoupleNameFlow,
        [CoupleProperty.coupleBirthDate]: getCoupleAgeFlow,
        [CoupleProperty.coupleGender]: getCoupleAgeFlow,
        [CoupleProperty.coupleDescription]: getCoupleDescriptionFlow,
        [CoupleProperty.reasonForFallingInLove]: reasonForFallingInLoveFlow,
        [RelationshipProperty.howTheyMet]: howTheyMetFlow,
        [RelationshipProperty.typeOfRelationship]: typeOfRelationshipFlow,
        [RelationshipProperty.goal]: CouplesGoalFlow,

    }
    const property = detectMissingInformation(user)
    if (!property) {
        return null
    }
    return map[property]
}