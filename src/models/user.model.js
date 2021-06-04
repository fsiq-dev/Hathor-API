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
    address: {
        country: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        address:{
            type: String,
            required: false,
        },
        zip: {
            type: Number,
            required: false,
        }
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
