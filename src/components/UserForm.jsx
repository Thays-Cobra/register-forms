import { useState } from "react";
import { validateName, validateEmail } from "../utils";

export default function FormComponent({onSubmit}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: false,
        hasError: false
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });
    const hasErrors = Object.values(errors).some(err => err !== "");
    const hasEmptyFields = Object.values(formData).some((value) => value === "");
    const isFormInvalid = hasErrors || hasEmptyFields || !formData.terms;
    const [isLoading, setIsLoading] = useState(false);

    function validatePassword(value) {
        if (!value) {
            return "A senha é obrigatória";
        }
        if (value.length < 6) {
            return "Mínimo de 6 caracteres";
        }
        return "";
    }

    function validateTerms(value) {
        if (!value) {
            return "Aceite os termos para continuar";
        }
        return "";
    }

    function validateField(name, value) {
        switch (name) {
            case "name":
                return validateName(value);
            case "email":
                return validateEmail(value);
            case "password":
                return validatePassword(value);
            case "terms":
                return validateTerms(value);
            default:
                return "";
        }
    }

    const simulateRequest = () =>  {
        return new Promise((resolve) => {
            setTimeout(() => {
                const simulatedData = { id: 1, name: "Thays" };
                resolve(simulatedData); // só resolve, não loga
            }, 2000);
        });
    };

    function handleChange(e) {
        //identifica qual input disparou (name, email, password)
        const {name, value, type, checked} = e.target;

        setFormData((prev) => ({
            ...prev,
                [name]: type === "checkbox" ? checked : value
        }));
    }

    function handleBlur(e) {
        const {name, value, type, checked} = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
        const error = validateField(name, fieldValue); 
        setErrors((prev) => ({ ...prev, [name]: error}));
    }
    
    // eslint-disable-next-line
    async function handleSubmit(e) {
        //evita que ele submeta ao servidor
        e.preventDefault();

        const errors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            terms: validateTerms(formData.terms)
        };
        setErrors(errors);

        // verifica se tem pelo menos um erro
        const hasError = Object.values(errors).some(err => err !== "");
        if (hasError) return;

        //1 - ativando o estado de carregamento
        setIsLoading(true);

        //2 - aqui a "requisição" roda como se fosse real
        try {
            const data = await simulateRequest();
            console.log("Resposta simulada: ", data);

            //3 - Quando terminar, chamar o onSubmit de verdade
            onSubmit(formData);
        } catch (err) {
            console.error("Erro de simulação: ", err);
        } finally {
             //4 - Desativar o estado de carregamento SEMPRE
            setIsLoading(false);
        }
        setFormData({ name: "", email: "", password: "", terms: false, hasError: false });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="form">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        data-testid="input-name"
                        name="name"
                        className="form-control"
                        autoComplete="off"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.name}
                        aria-describedby="name-error"
                    />
                    {errors.name && (
                        <p id="name-error" role="alert" style={{color: "red"}}>
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        data-testid="input-email"
                        name="email"
                        className="form-control"
                        autoComplete="off"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.email}
                        aria-describedby="email-error"
                    />
                    {errors.email && (
                        <p id="email-error" role="alert" style={{color: "red"}}>
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        data-testid="input-password"
                        name="password"
                        className="form-control"
                        autoComplete="off"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.password}
                        aria-describedby="password-error"
                    />
                    {errors.password && (
                        <p id="password-error" role="alert" style={{color: "red"}}>
                            {errors.password}
                        </p>
                    )}
                </div>
            </div>

            <fieldset>
                <legend>Termos e Condições</legend>
                <div className="checkbox-group">
                    <div className="checkbox-terms">
                        <p><em>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</em></p>
                        <br></br>
                        <p><em>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</em></p>
                        <br></br>
                        <p><em>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</em></p>
                    </div>
                <label>
                    <input
                    type="checkbox"
                    name="terms"
                    data-testid="input-terms"
                    className="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.terms}
                    aria-describedby="terms-error"
                    required/>Li e aceito os termos e condições.
                </label>
                {errors.terms && (
                        <p id="terms-error" role="alert" style={{color: "red"}}>
                            {errors.terms}
                        </p>
                    )}
            </div>
            </fieldset>

            <div className="btn-group">
                <button
                type="submit"
                data-testid="button-submit"
                name="btn-group-submit"
                disabled={isFormInvalid || isLoading}
                id="btn-submit"
                >
                    {isLoading ? "Enviando..": "Enviar"}
                </button>
            </div>
        </form>
    );
}