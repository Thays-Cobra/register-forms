import { validateName,validateEmail,validatePassword,validateTerms, validateField } from "../utils/validations"

describe("validateName", () => {
    it("should return empty string if the name is valid", () => {
        expect(validateName("Ana Carolina da Silva")).toBe("")
    })
    
    it("should return error if the name is empty", () => {
        expect(validateName("")).toBe("O nome é obrigatório")
    })

    it("should return error if the name contains numbers", () => {
        expect(validateName("Jade1 Campos")).toBe("Apenas letras são permitidas")
    })

    it("should return error if the name contains characters", () => {
        expect(validateName("Jade@# Campos")).toBe("Apenas letras são permitidas")
    })

    it("should return error if the name has less than 3 letters", () => {
        expect(validateName("Ja")).toBe("Mínimo de 3 letras")
    })
} )


describe("validateEmail", () => {
    it("should return empty string if the e-mail is valid", () => {
        expect(validateEmail("teste@teste.com")).toBe("")
    })
    
    it("should return error if the e-mail is empty", () => {
        expect(validateEmail("")).toBe("O e-mail é obrigatório")
    })

    it("should return error if the e-mail is not valid", () => {
        expect(validateEmail("teste@teste")).toBe("Formato de e-mail inválido")
    })
})


describe("validatePassword", () => {
    it("should return empty string if the password is valid", () => {
        expect(validatePassword("teste123")).toBe("")
    })
    
    it("should return error if the password is empty", () => {
        expect(validatePassword("")).toBe("A senha é obrigatória")
    })

    it("should return error if the password has less than 6 characters", () => {
        expect(validatePassword("test1")).toBe("Mínimo de 6 caracteres")
    })
})


describe("validateTerms", () => {
    it("should return true if the term is checked", () => {
        expect(validateTerms(true)).toBe("")
    })
    
    it("should return false if the term is not checked", () => {
        expect(validateTerms(false)).toBe("Aceite os termos para continuar")
    })
})


describe("validateField", () => {
    //VERIFICAR
    it("should return empty string if all fields are completed correctly", () => {
        expect(validateField("unknown", "")).toBe("")
    })


})