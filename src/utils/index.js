    export function validateName(value) {  
        if (!value) {
            return "O nome é obrigatório";
        }
        if (!/^[A-Za-zÀ-ú\s]+$/i.test(value)) {
            return "Apenas letras são permitidas";
        }
        if (value.trim().length < 3) {
            return "Mínimo de 3 letras";
        }
        return "";
    }

    export function validateEmail(value) {
        if (!value) {
            return "O e-mail é obrigatório";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Formato de e-mail inválido";
        }
        return "";
    }