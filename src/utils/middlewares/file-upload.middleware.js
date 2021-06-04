const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const fileUtils = require('../file.utils')

const { renameFile, createAddress } = fileUtils
const fileUpload = (destination, isUpdate = false) => {

    const form = formidable.IncomingForm()   

    return (req, res, next) => {
         form.parse(req, (err, fields, files) => {

            req.body = {
                ...fields,
            }

            if(!files.image && !isUpdate) {
                return res.status(400).send({
                    message: 'Não foi possivel realizar a operação',
                    details: [
                        '"Imagem" é de preenchimento obrigatório.'
                    ]
                })
            }

            if (files.image) {
                const newName = renameFile(files.image.type)
                const newDestination = createAddress(destination, newName)

                req.body.image = {
                    type: files.image.type,
                    initialName: files.image.name,
                    initialDestination: files.image.path,
                    newName,
                    newDestination
                }
            }
            
            return next()
         })
    }

}

module.exports = fileUpload