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
