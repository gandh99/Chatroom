import {
    stringLengthIsValid, 
    stringCharactersAreValid, 
    stringHasNoTrailingWhitespaces
} from '../generalValidator'

export const passwordConstants = {
    MIN_PASSWORD_LENGTH: 1,
    MAX_PASSWORD_LENGTH: 15,
    ALLOWED_CHARACTERS: /^[\w\-_ !@#$%^&*.]$/
}

export function passwordLengthIsValid(password) {
    return stringLengthIsValid(
        password,
        passwordConstants.MIN_PASSWORD_LENGTH,
        passwordConstants.MAX_PASSWORD_LENGTH
    )
}

export function passwordCharactersAreValid(password) {
    return stringCharactersAreValid(password, passwordConstants.ALLOWED_CHARACTERS)
}

export function passwordHasNoTrailingWhitespaces(password) {
    return stringHasNoTrailingWhitespaces(password)
}