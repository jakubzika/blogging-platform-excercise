export const queryParamToBool = (value: String): Boolean => {
    return (value + '').toLowerCase() === 'true'
}
