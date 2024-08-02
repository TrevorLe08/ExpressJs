export const createUserValidationSchema = {
    username: {
        isLength: {
            option: {
                min: 2,
                max: 9999
            },
            errorMessage: "Username must be at least 2 characters"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        },
    },
    score: {
        notEmpty: true
    }
}

export const getUserValidationSchema = {
    filter: {
        isString: true,
        notEmpty: true,
        isLength: {
            option: {
                min: 2,
                max: 9999
            },
            errorMessage: "Filter must be at least 2 characters"
        }
    },
    value: {
        notEmpty: true,
    }
}