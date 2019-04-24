import DeleteAssetService from '@/services/assets/DeleteAssetService'
// import Joi from 'joi'

const handler = async (request, h) => {
  return DeleteAssetService({
    id: request.payload.id
  })
}

const config = {
  description: 'Delete an asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
