
export const createUserValidationSchema = {
    name: {
        in: ["body"],
        isLength: {
            options: {
                min: 2,
            },
            errorMessage: "name must be at least 2 characters."
        },
        notEmpty: {
            errorMessage: "name cannot be empty"
        },
        isString: {
            errorMessage: "name must be a string!"
        },
        
    }
}