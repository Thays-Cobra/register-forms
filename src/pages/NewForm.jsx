import NewUseForm from "../components/NewUserForm";
import "../styles/forms.css";

function NewForm() {
    return (
        <div className="form-center">
            <h1 className="text-center">Formulário de Cadastro</h1>
            <NewUseForm />
        </div>
    )
}

export default NewForm;
