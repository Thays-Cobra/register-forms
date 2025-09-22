import { fireEvent, render, screen } from "@testing-library/react"
import Form from "../pages/Form"

const renderForm = () => render(<Form></Form>);

describe("form", () => {
    it("test", () => {
        expect(1).toBe(1)
    })

    //teste inicial, só pra entender se o campo existe
    it("Must render all fields", () => {
        renderForm();
        expect(screen.getByTestId("input-name")).toBeDefined();
    })

    it("Must start disabled", () => {
        renderForm();
        expect(screen.getByTestId("button-submit")).toBeDisabled();
    })

    it("Must not be disabled when fill out the form", () => {
        renderForm();
        fireEvent.change(screen.getByTestId("input-name"), {target:{value:"Usuário Teste"}});
        fireEvent.change(screen.getByTestId("input-email"), {target:{value:"teste@teste.com"}});
        fireEvent.change(screen.getByTestId("input-password"), {target:{value:"teste12345"}});
        fireEvent.click(screen.getByTestId("input-terms"));
        expect(screen.getByTestId("button-submit")).not.toBeDisabled();
    })

})