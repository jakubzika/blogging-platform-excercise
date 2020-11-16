import { StoreObject } from '../types'

export const boolToString = (value: boolean): string => {
    return value ? 'true' : 'false'
}

export const cropString = (s: string, maxLength: number, decorator: string = '...'): string => {
    if (s.length > maxLength) {
        return `${s.slice(0, maxLength - 3)}${decorator}`
    }
    return s
}

export const mapToObject = <T>(values: T[], by: keyof T): StoreObject<T> => {
    const res = values.reduce((map: StoreObject<T>, val: T) => {
        map[val[by.valueOf()]] = val
        return map
    }, {})
    return res
}
