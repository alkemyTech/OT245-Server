const { ErrorObject } = require('../helpers/error')
const { Member } = require('../database/models')
const { getPagination } = require('./categories')

exports.postMember = async (body) => {
  try {
    const { name } = body
    const existentMember = await Member.findOne({ where: { name } })
    if (existentMember) {
      throw new ErrorObject('Member already exists', 400)
    }
    const member = await Member.create(body)
    return member
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateMember = async (id, body) => {
  try {
    const member = await Member.findByPk(id)
    if (!member) {
      throw new ErrorObject('Member not found', 404)
    }
    const updatedMember = await member.update(body)
    return updatedMember
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteMember = async (id) => {
  try {
    const member = await Member.findByPk(id)
    if (!member) {
      throw new ErrorObject('Member not found', 404)
    }
    await member.destroy()
    return member
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getMembers = async (page = 1) => {
  try {
    const { limit, offset, nro } = getPagination(page)
    const members = await Member.findAndCountAll({ limit, offset })
    return this.getPagingData(members, nro, limit)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getPagingData = async (data, page, limit) => {
  const url = '/members?page='
  const { count: totalItems, rows: members } = data
  const currentPage = page ? +page : 1
  const finalPage = Math.ceil(totalItems / limit)
  if (page > finalPage) {
    throw new ErrorObject(`page ${page} not found, maximum number of pages: ${finalPage}`, 404)
  }
  const nextPage = totalItems / limit > page ? (currentPage + 1) : null
  const previousPage = currentPage > 1 && currentPage <= finalPage ? currentPage - 1 : null
  const metadata = { finalPage }
  if (previousPage) metadata.previousPage = url + previousPage
  if (nextPage) metadata.nextPage = url + nextPage
  return { members, metadata }
}
