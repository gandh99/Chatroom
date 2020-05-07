import { usernameLengthIsValid, usernameCharactersAreValid, usernameHasNoTrailingWhitespaces } from './usernameValidator'
import { passwordLengthIsValid, passwordCharactersAreValid, passwordHasNoTrailingWhitespaces } from './passwordValidator'

export const isValidCredentials = (username, password) => {
    return isValidUsername(username) && isValidPassword(password)
}

export const isValidUsername = username => {
    return usernameLengthIsValid(username) &&
        usernameCharactersAreValid(username) &&
        usernameHasNoTrailingWhitespaces(username)
}

export const isValidPassword = password => {
    return passwordLengthIsValid(password) &&
        passwordCharactersAreValid(password) &&
        passwordHasNoTrailingWhitespaces(password)
}