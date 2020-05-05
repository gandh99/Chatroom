export function stringLengthIsValid(string, minLength, maxLength) {
    return string.length >= minLength &&
        string.length <= maxLength
}

export function stringCharactersAreValid(string, validPattern) {
    return string.match(validPattern)
}

export function stringHasNoTrailingWhitespaces(string) {
    return string.charAt(0) !== ' ' &&
        string.charAt(string.length - 1) !== ' '
}