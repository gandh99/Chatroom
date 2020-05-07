import {
    stringLengthIsValid, 
    stringCharactersAreValid, 
    stringHasNoTrailingWhitespaces
} from '../generalValidator'

export const usernameConstants = {
    MIN_USERNAME_LENGTH: 1,
    MAX_USERNAME_LENGTH: 15,
    ALLOWED_CHARACTERS: /^[\w\-_ ]$/
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

export function usernameHasNoTrailingWhitespaces(username) {
    return stringHasNoTrailingWhitespaces(username)
}