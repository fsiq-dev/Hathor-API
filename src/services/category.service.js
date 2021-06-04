const { category } = require('../models/index')
const  categoryMapper = require('../mapper/category.mapper')
const fileUtils = require('../utils/file.utils')

const { toDTO, toListByIdDTO  } = categoryMapper
const { moveFile, removeFile } = fileUtils


const listAll = async () => {
    const listCategoryDB = await category.find({})
    return listCategoryDB.map(categoryDB => {
        return toDTO(categoryDB)
    })
}

const createCategory = async (model) => {
    const newCategory = await category.create({
        name: model.name,
        description: model.description,
        status: model.status,
        image: {
            initialName: model.image.initialName,
            name: model.image.newName,
            type: model.image.type
        }
    })
    moveFile(model.image.initialDestination, model.image.newDestination)
    
    return {
        sucsses: true,
        message: `categoria criada com sucesso!`,
        data: toDTO(newCategory)
    }
}

const listCategoryById = async (id) => {
    const categoryDB = await category.findById(id)
    if(categoryDB) {
        return toListByIdDTO(categoryDB)
    }
    return;
}

const updateCategoryService = async (id, model) => {
    const categoryDB = await category.findOne({ _id: id })
    if(!categoryDB) {
        return {
            sucsses: false,
            message: 'não foi possível realizar a operação',
            details: [
                '"id" da categoria não existe.'
            ]
        }
    }

    categoryDB.name = model.name
    categoryDB.description = model.description
    categoryDB.status = model.status
    
    if (model.image) {
        removeFile('categorys', categoryDB.image.name)
        moveFile(model.image.initialDestination, model.image.newDestination)
        categoryDB.image = {
            initialName: model.image.initialName,
            name: model.image.newName,
            type: model.image.type
        }
    }    

    await categoryDB.save()

    return {
        sucsses: true,
        message: 'operação relaizada com sucesso',
        data: categoryMapper.toListByIdDTO(categoryDB)
    }
}

const deleteCategoryService = async (id) => {
    const categoryDB = await category.findOne({ _id: id })
    if(!categoryDB) {
        return {
            sucsses: false,
            message: 'não foi possível realizar a operação',
            details: [
                '"id" da categoria não existe.'
            ]
        }
    }
    const { image } = categoryDB
   removeFile('categorys', image.name)

   await category.deleteOne(categoryDB)
   return {
       sucsses: true,
       message: 'Operação realizada com sucesso.'
   }
}

module.exports = {
    listAll,
    createCategory,
    listCategoryById,
    updateCategoryService,
    deleteCategoryService
}