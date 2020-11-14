export const boolToString = (value: boolean): string => {
    return value ? 'true' : 'false'
}

export const cropString = (s: string, maxLength: number, decorator: string = '...'): string => {
    if (s.length > maxLength) {
        return `${s.slice(0, maxLength - 3)}${decorator}`
    }
    return s
}
