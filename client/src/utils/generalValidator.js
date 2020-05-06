export function stringLengthIsValid(string, minLength, maxLength) {
    return string.length >= minLength &&
        string.length <= maxLength
}

export function stringCharactersAreValid(string, validPattern) {
    for (let i = 0; i < string.length; i++ ) {
        if (!string[i].match(validPattern)) return false
    }
    return true
}

export function stringHasNoTrailingWhitespaces(string) {
    return string.charAt(0) !== ' ' &&
        string.charAt(string.length - 1) !== ' '
}