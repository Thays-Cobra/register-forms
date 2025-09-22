import { useEffect, useState } from "react";
import "../styles/forms.css";
import FormComponent from "../components/UserForm";

function Form() {
    const [submittedData, setSubmittedData] = useState(null);
    const [showMsg, setShowMsg] = useState(true);

    useEffect(() => {
        if (!submittedData) return;
        setShowMsg(true);
        const timer = setTimeout(() => {
            setShowMsg(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [submittedData]);

    return (
        <div className="form-center">
            <h1 className="text-center">Formulário de Cadastro</h1>
            <FormComponent onSubmit={setSubmittedData} />
            {submittedData && (
                <div className="confirmation">
                    <br></br>
                    {showMsg && <p id="submit-msg" role="alert" style={{color: "red"}}>Formulário enviado com sucesso!</p>}
                </div>
            )}
        </div>
    );
}

export default Form;