const categorySchema = {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    image: {
        originalName: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: false,
        }
    }
  }
  
  module.exports = categorySchema;