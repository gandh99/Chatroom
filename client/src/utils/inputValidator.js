export const usernameConstants = {
    MIN_USERNAME_LENGTH: 1,
    MAX_USERNAME_LENGTH: 15,
    ALLOWED_CHARACTERS: /^[\w\-_ ]$/
}

export function usernameIsValid(username) {
    return usernameLengthIsValid(username) &&
        usernameCharactersAreValid(username) &&
        stringHasNoTrailingWhitespaces(username)
}

export function usernameLengthIsValid(username) {
    return stringLengthIsValid(
        username,
        usernameConstants.MIN_USERNAME_LENGTH,
        usernameConstants.MAX_USERNAME_LENGTH
    )
}

export function usernameCharactersAreValid(username) {
    return stringCharactersAreValid(username, usernameConstants.ALLOWED_CHARACTERS)
}

function stringLengthIsValid(string, minLength, maxLength) {
    return string.length >= minLength &&
        string.length <= maxLength
}

function stringCharactersAreValid(string, validPattern) {
    return string.match(validPattern)
}

export function stringHasNoTrailingWhitespaces(string) {
    return string.charAt(0) !== ' ' &&
        string.charAt(string.length - 1) !== ' '
}