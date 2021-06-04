const eventSchema = {
    events: [{
        title: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        start: {
            type: String,
            required: false
        },
        end: {
            type: String,
            required: false
        }
    }]
}

module.exports = eventSchema;