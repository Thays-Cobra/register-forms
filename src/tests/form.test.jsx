import { fireEvent, render, screen } from "@testing-library/react"
import Form from "../pages/Form"

const renderForm = () => render(<Form></Form>);

describe("form", () => {
    //teste inicial, só pra entender se o campo existe
    it("Must render all fields", () => {
        renderForm();
        expect(screen.getByTestId("input-name")).toBeDefined();
    })

    it("Must send button start disabled", () => {
        renderForm();
        expect(screen.getByTestId("button-submit")).toBeDisabled();
    })

    it("Must send button not be disabled when fill out the form", () => {
        renderForm();
        fireEvent.change(screen.getByTestId("input-name"), {target:{value:"Usuário Teste"}});
        fireEvent.change(screen.getByTestId("input-email"), {target:{value:"teste@teste.com"}});
        fireEvent.change(screen.getByTestId("input-password"), {target:{value:"teste12345"}});
        fireEvent.click(screen.getByTestId("input-terms"));
        expect(screen.getByTestId("button-submit")).not.toBeDisabled();
    })

    it("Must show error message after a filed had been touched or changed", () => {
        renderForm();
    })

    it("Must send button be disabled while the form has error", () => {
        renderForm();
    })

    it("Must send button be disabled while the form has empty required fields", () => {
        renderForm();
    })

    it("Must simulate a charging status for 1-2s when the form is submitted", () => {
        renderForm();
    })

    it("Must the form be cleaned and show a success message after submitted", () => {
        renderForm();
    })

})