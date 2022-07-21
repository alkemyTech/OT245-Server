const { ErrorObject } = require('../helpers/error')
const db = require('../database/models/index')

const { Activity } = db

exports.postActivity = async (activity) => {
  try {
    const newActivity = await Activity.create(activity)
    return newActivity
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateActivity = async (req) => {
  try {
    const { id } = req.params
    const { name, content, image } = req.body
    await Activity.update({
      name,
      content,
      image,
    }, { where: { id } })
    const activity = await Activity.findByPk(id)
    if (!activity) {
      throw new ErrorObject('Activity not found', 404)
    }
    return activity
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
