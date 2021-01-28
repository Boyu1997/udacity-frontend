import { handleSubmit } from '../client/js/formHandler'
import { validateText } from '../client/js/validateText'

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined()
    })
    test("Testing the validateText() function", () => {
        expect(validateText).toBeDefined();
        expect(validateText("This, should be A? valid input..&")).toBe(true)
        expect(validateText("µ©¿é are not")).toBe(false)
    })
})