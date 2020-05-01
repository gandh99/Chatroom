import {
    passwordLengthIsValid,
    passwordCharactersAreValid,
    passwordHasNoTrailingWhitespaces
} from './passwordValidator'

describe('PasswordValidator', () => {
    describe('Password testing', () => {
        it('Returns false for empty password', () => {
            const password = ''
            expect(passwordLengthIsValid(password)).toBeFalsy()
        })

        it('Returns false for password longer than 15 characters', () => {
            const password = 'abcdefghijklmnop'
            expect(passwordLengthIsValid(password)).toBeFalsy()
        })

        it('Returns true for password larger than min length and smaller than max length', () => {
            const password = 'password'
            expect(passwordLengthIsValid(password)).toBeTruthy()
        })

        it('Returns false for password with banned special characters', () => {
            let password = '~\`()+={}[]\\:;"\'|<>,'

            for (const c of password) {
                expect(passwordCharactersAreValid(c)).toBeFalsy()
            }
        })

        it('Returns true for password with allowed special characters', () => {
            let password = '_- !@#$%^&*.'

            for (const c of password) {
                expect(passwordCharactersAreValid(c)).toBeTruthy()
            }
        })

        it('Returns true for password with alphabets/letters', () => {
            let passwordLowercaseAlphabets = 'abcdefghijklmnopqrstuvwxyz'
            for (const c of passwordLowercaseAlphabets) {
                expect(passwordCharactersAreValid(c)).toBeTruthy()
            }

            let passwordUppercaseAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            for (const c of passwordUppercaseAlphabets) {
                expect(passwordCharactersAreValid(c)).toBeTruthy()
            }

            let passwordLetters = '0123456789'
            for (const c of passwordLetters) {
                expect(passwordCharactersAreValid(c)).toBeTruthy()
            }
        })

        it('Returns false for password with trailing whitespaces', () => {
            let password = ' password'
            expect(passwordHasNoTrailingWhitespaces(password)).toBeFalsy()

            password = 'password '
            expect(passwordHasNoTrailingWhitespaces(password)).toBeFalsy()

            password = ' '
            expect(passwordHasNoTrailingWhitespaces(password)).toBeFalsy()
        })
    })
})