const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partnerSchema = {
    companyName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },    
    cnpj: {
        type: String,
        required: true,
    },
    uf: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    accountable: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {          // Analise | Ativo | Inativo
        type: String,
        required: true,
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'employee'
    }]
}
  
  module.exports = partnerSchema;
  