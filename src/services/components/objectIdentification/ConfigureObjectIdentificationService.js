import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (token, receivedOptionalId) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      if (!decodedToken.newUserToken2.role.admin) {
        return 'You do not have permissions to perform this action'
      }

      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + 'POST -> Insert new optional id')

      // Validate input (check if collection title already in database)
      let db = await Mongo.getDB()
      const module = await db.collection('modules').findOne({ moduleName: 'objectIdentification' })
      for (let i = 0; i < module.optionalId.values.length; i++) {
        if (module.optionalId.values[i] === receivedOptionalId.optionalId) {
          return 'Collection already in database! (not inserted)'
        }
      }

      // Insert collection into DB
      await db.collection('modules').updateOne(
        { moduleName: 'objectIdentification' },
        { $push: { 'optionalId.values': receivedOptionalId.optionalId } }
      )

      // Create log
      var log = {
        time: today,
        action: 'Insert optional id',
        objectId: receivedOptionalId.optionalId,
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Inserted new optional id: ' + receivedOptionalId.optionalId
    }
  })
}
