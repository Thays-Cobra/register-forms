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

    export function validatePassword(value) {
        if (!value) {
            return "A senha é obrigatória";
        }
        if (value.length < 6) {
            return "Mínimo de 6 caracteres";
        }
        return "";
    }

    export function validateTerms(value) {
        if (!value) {
            return "Aceite os termos para continuar";
        }
        return "";
    }
    
    export function validateField(name, value) {
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