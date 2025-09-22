import { validateName } from "../utils"

describe("validateName", () => {
    it("Must render all fields", () => {
        expect(validateName("")).toBe("O nome é obrigatório")
    })

    it("Must have only letters", () => {

    })

    it("Must have at least three letters", () => {

    })
} )