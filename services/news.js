const { ErrorObject } = require('../helpers/error')
const { New } = require('../database/models')

exports.postNew = async (body) => {
  try {
    const createNew = await New.create(body)
    return createNew
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getNewById = async (id) => {
  try {
    const newById = await New.findByPk(id)
    if (!newById) {
      throw new ErrorObject('New not found', 404)
    }
    return newById
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateNew = async (req) => {
  try {
    const { id } = req.params
    const { name, content, image } = req.body
    const existentNew = await this.getNewById(id)
    if (!existentNew || existentNew.length === 0) {
      throw new ErrorObject('New not found', 404)
    }
    const createdNew = await New.update({
      name,
      content,
      image,
    }, { where: { id } })
    return createdNew
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteNew = async (id) => {
  try {
    const existentNew = await this.getNewById(id)
    if (!existentNew || existentNew.length === 0) {
      throw new ErrorObject('New not found', 404)
    }
    const deletedNew = await New.destroy({ where: { id } })
    return deletedNew
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getNews = async (page) => {
  try {
    const limit = 10
    const numberPage = page ? parseInt(page) : 1
    if (!Number.isInteger(numberPage) || numberPage <= 0) {
      throw new ErrorObject('query param not valid', 500)
    }
    const offset = numberPage && numberPage >= 1 ? ((numberPage - 1) * limit) : 0
    const currentPage = await New.findAll({ offset, limit })
    const metadata = {}
    const { previousPage, nextPage } = await this.pagination(limit, numberPage)
    if (Object.keys(previousPage).length !== 0) {
      metadata.previousPage = previousPage
    }
    if (Object.keys(nextPage).length !== 0) {
      metadata.nextPage = nextPage
    }
    return { currentPage, metadata }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.pagination = async (limit = 10, currentPage = 1) => {
  try {
    const previousPage = {}
    const nextPage = {}
    const newsAmount = await New.count()
    const pagesAmount = Math.ceil(newsAmount / limit)
    if (currentPage > pagesAmount) {
      throw new ErrorObject('invalid page', 500)
    }
    if (currentPage > 1) {
      previousPage.url = `/news?page=${currentPage - 1}`
      previousPage.content = await New.findAll({
        offset: ((currentPage - 2) * limit),
        limit,
      })
    }
    if (currentPage < pagesAmount) {
      nextPage.url = `/news?page=${currentPage + 1}`
      nextPage.content = await New.findAll({
        offset: (currentPage * limit),
        limit,
      })
    }
    return { previousPage, nextPage }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
