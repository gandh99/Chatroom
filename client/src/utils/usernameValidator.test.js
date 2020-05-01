import {
    usernameLengthIsValid,
    usernameCharactersAreValid,
    usernameHasNoTrailingWhitespaces
} from './usernameValidator'

describe('InputValidator', () => {
    describe('Username testing', () => {
        it('Returns false for empty username', () => {
            const username = ''
            expect(usernameLengthIsValid(username)).toBeFalsy()
        })

        it('Returns false for username longer than 15 characters', () => {
            const username = 'abcdefghijklmnop'
            expect(usernameLengthIsValid(username)).toBeFalsy()
        })

        it('Returns true for username larger than min length and smaller than max length', () => {
            const username = 'user'
            expect(usernameLengthIsValid(username)).toBeTruthy()
        })

        it('Returns false for username with banned special characters', () => {
            let username = '~\`@#$%^&*()+={}[]\\:;"\'|<>,.'

            for (const c of username) {
                expect(usernameCharactersAreValid(c)).toBeFalsy()
            }
        })

        it('Returns true for username with allowed special characters', () => {
            let username = '_- '

            for (const c of username) {
                expect(usernameCharactersAreValid(c)).toBeTruthy()
            }
        })

        it('Returns true for username with alphabets/letters', () => {
            let usernameLowercaseAlphabets = 'abcdefghijklmnopqrstuvwxyz'
            for (const c of usernameLowercaseAlphabets) {
                expect(usernameCharactersAreValid(c)).toBeTruthy()
            }

            let usernameUppercaseAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            for (const c of usernameUppercaseAlphabets) {
                expect(usernameCharactersAreValid(c)).toBeTruthy()
            }

            let usernameLetters = '0123456789'
            for (const c of usernameLetters) {
                expect(usernameCharactersAreValid(c)).toBeTruthy()
            }
        })

        it('Returns false for username with trailing whitespaces', () => {
            let username = ' user'
            expect(usernameHasNoTrailingWhitespaces(username)).toBeFalsy()

            username = 'user '
            expect(usernameHasNoTrailingWhitespaces(username)).toBeFalsy()

            username = ' '
            expect(usernameHasNoTrailingWhitespaces(username)).toBeFalsy()
        })
    })
})