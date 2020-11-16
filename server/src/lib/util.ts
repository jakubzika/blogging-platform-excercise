/**
 * Converts string boolean from URL query into normal boolean
 *
 * @param  {String} value - boolean in a string representation from URL request query
 * @returns boolean - converted string boolean
 */
export const queryParamToBool = (value: String): boolean => {
    return (value + '').toLowerCase() === 'true'
}
