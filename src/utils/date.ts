import { DateTime } from 'luxon';

export const changeBirthDateToAge = (birthDate: string) => {
    const date = DateTime.fromFormat(birthDate, 'dd/MM/yyyy')
    const age = date.diffNow('years').toObject().years
    return Math.trunc(Math.abs(age))
}

export const checkFormat = (date: string) => {
    return DateTime.fromFormat(date, 'dd/MM/yyyy').isValid
}