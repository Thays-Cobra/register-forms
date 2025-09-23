    export const simulateRequest = (formData) =>  {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(formData);
            }, 2000);
        });
    };