const db = require('../../services/db')
const { TABLES } = require('./constants')
const { ErrorHandler } = require('../../error')

module.exports = {
  getAllUsers: async () => db(TABLES.USERS).orderBy('name'),

  getUserById: async (userId) => db(TABLES.USERS).where({ user_id: userId }),

  createUser: async (name, email, phone) => {
    if (!name) {
      throw new ErrorHandler('Name cannot be empty', {
        expose: true
      })
    }
    if (!email) {
      throw new ErrorHandler('Email cannot be empty', {
        expose: true
      })
    }
    if (!phone) {
      throw new ErrorHandler('Phone cannot be empty', {
        expose: true
      })
    }
    return db(TABLES.USERS)
      .insert({ name: name, email: email, phone: phone })
      .then(() => {})
  },

  updateUserById: async (
    userId,
    name,
    nameVisibility,
    email,
    emailVisibility,
    phone,
    phoneVisibility,
    university,
    universityVisibility
  ) => {
    if (
      !userId &&
      !name &&
      !nameVisibility &&
      !email &&
      !emailVisibility &&
      !phone &&
      !phoneVisibility &&
      !university &&
      !universityVisibility
    ) {
      throw new ErrorHandler('Nothing to update', {
        expose: true
      })
    }
    const updateFields = {
      ...(name && { name: name }),
      ...(nameVisibility && { name_visibility_status_id: nameVisibility }),
      ...(email && { email: email }),
      ...(emailVisibility && { email_visibility_status_id: emailVisibility }),
      ...(phone && { phone: phone }),
      ...(phoneVisibility && { phone_visibility_status_id: phoneVisibility }),
      ...(university && { university_id: university }),
      ...(universityVisibility && {
        university_visibility_status_id: universityVisibility
      })
    }
    return await db(TABLES.USERS)
      .where({ user_id: userId })
      .update(updateFields)
      .then(() => {})
  },

  deleteUserById: async (userId) =>
    db(TABLES.USERS)
      .where({ user_id: userId })
      .del()
      .then(() => {})
}
