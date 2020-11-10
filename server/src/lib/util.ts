export const queryParamToBool = (value: String): boolean => {
    return (value + '').toLowerCase() === 'true'
}
