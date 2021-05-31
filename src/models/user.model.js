const userSchema = {
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        initialName: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: false,
        }
    }
}

module.exports = userSchema;
