import { fireEvent, render, screen } from "@testing-library/react"
import Form from "../pages/Form"
import { expect, vi } from "vitest";
import { simulateRequest } from "../utils/simulateRequest";
import * as api from "../utils/simulateRequest";
 
const renderForm = () => render(<Form />);

describe("form", () => {
    //teste inicial, só pra entender se o campo existe
    it("should render field name", () => {
        renderForm();
        expect(screen.getByTestId("input-name")).toBeDefined();
    })

    it("should render button submit", () => {
        renderForm();
        expect(screen.getByTestId("button-submit")).toBeDefined();
    })

    describe("button", () => {
        it("should send button be disabled when the page gets opened", () => {
            renderForm();
            expect(screen.getByTestId("button-submit")).toBeDisabled();
        })

        it("should send button not be disabled when fill out the form correctly", () => {
            renderForm();
            fireEvent.change(screen.getByTestId("input-name"), {target:{value:"Usuário Teste"}});
            fireEvent.change(screen.getByTestId("input-email"), {target:{value:"teste@teste.com"}});
            fireEvent.change(screen.getByTestId("input-password"), {target:{value:"teste12345"}});
            fireEvent.click(screen.getByTestId("input-terms"));
            expect(screen.getByTestId("button-submit")).not.toBeDisabled();
        })

        it("should send button be disabled if a field is not validated correctly", () => {
            renderForm();
            //valores válidos
            fireEvent.change(screen.getByTestId("input-name"), {target:{value:"Usuário Teste"}});
            fireEvent.change(screen.getByTestId("input-password"), {target:{value:"teste12345"}});
            fireEvent.click(screen.getByTestId("input-terms"));
            //valor inválido
            fireEvent.change(screen.getByTestId("input-email"), {target:{value:"teste@teste"}});
            fireEvent.blur(screen.getByTestId("input-email"));
            expect(screen.getByTestId("button-submit")).toBeDisabled();
        })

        it("should send button be disabled if a field is empty", () => {
            renderForm();
            //valores válidos
            fireEvent.change(screen.getByTestId("input-name"), {target:{value:"Usuário Teste"}});
            fireEvent.change(screen.getByTestId("input-email"), {target:{value:"teste@teste.com"}});
            fireEvent.change(screen.getByTestId("input-password"), {target:{value:"teste12345"}});
            expect(screen.getByTestId("button-submit")).toBeDisabled();
        })
    })

    describe("onBlur", () => {
        it("should show error if the field password is empty on blur", () => {
            renderForm();
            fireEvent.blur(screen.getByTestId("input-password"));
            expect(screen.getByText("A senha é obrigatória")).toBeInTheDocument();
        })

        it("should show error if the field terms is empty on blur", () => {
            renderForm();
            fireEvent.blur(screen.getByTestId("input-terms"));
            expect(screen.getByText("Aceite os termos para continuar")).toBeInTheDocument();
        })

        it("should stop showing error after the field name have shown error", () => {
            renderForm();
            fireEvent.change(screen.getByTestId("input-name"), {target:{value:"Usuário Teste123"}});
            fireEvent.blur(screen.getByTestId("input-name"));
            expect(screen.getByText("Apenas letras são permitidas")).toBeInTheDocument();
            fireEvent.change(screen.getByTestId("input-name"), {target:{value:"Usuário Teste"}});
            fireEvent.blur(screen.getByTestId("input-name"));
        })
    })

    describe("simulateRequest", () => {
        it("should load for two seconds after click submit button", async () => {
            const formData = { name: "Usuário Teste", email: "teste@teste.com", password: "teste12345", terms: true, hasError: false };

            //ativa o timer falso
            vi.useFakeTimers();
            const promise = simulateRequest(formData);

            //avançar o tempo artificialmente
            vi.advanceTimersByTime(2000);

            //aguardar a promise resolver
            const result = await promise;
            expect(result).toEqual( formData );
            vi.useRealTimers();

        })
    })

    describe("forms integration test", () => {
        it("should clean fields and show success message after clicking on submit button", async () => {
            // Mocka a função para resolver imediatamente
            let formData = { name: "Usuário Teste", email: "teste@teste.com", password: "teste12345", terms: true, hasError: false };
            vi.spyOn(api, "simulateRequest").mockResolvedValue({ formData });

            render(<Form />);

            // Preenche os campos
            fireEvent.change(screen.getByTestId("input-name"), { target: { value: formData.name } });
            fireEvent.change(screen.getByTestId("input-email"), { target: { value: formData.email } });
            fireEvent.change(screen.getByTestId("input-password"), { target: { value: formData.password } });
            fireEvent.click(screen.getByTestId("input-terms"));

            // Submete
            fireEvent.click(screen.getByTestId("button-submit"));

            // Apagar os campos e espera a mensagem aparecer
            const successMsg = await screen.findByTestId("submit-msg");
            formData = { name: "", email: "", password: "", terms: false, hasError: false };
            vi.spyOn(api, "simulateRequest").mockResolvedValue({ formData });
            expect(successMsg).toHaveTextContent("Formulário enviado com sucesso!");
        });

        it("should show loading error message after clicking on submit button", async () => {
            // Mocka a função para resolver imediatamente
            let formData = { name: "Usuário Teste", email: "teste@teste.com", password: "teste12345", terms: true, hasError: false };
            vi.spyOn(api, "simulateRequest").mockRejectedValue(new Error("simulation error"));

            render(<Form />);

            fireEvent.change(screen.getByTestId("input-name"), { target: { value: formData.name } });
            fireEvent.change(screen.getByTestId("input-email"), { target: { value: formData.email } });
            fireEvent.change(screen.getByTestId("input-password"), { target: { value: formData.password } });
            fireEvent.click(screen.getByTestId("input-terms"));
            fireEvent.click(screen.getByTestId("button-submit"));

            await screen.findByTestId("button-submit");
            const errorMsg = screen.queryByTestId("submit-msg");
            expect(errorMsg).toBeNull();
        });
    })

})