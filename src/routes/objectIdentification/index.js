import EditObjectIdentificationController from './controllers/EditObjectIdentificationController'
import SearchObjectIdentificationController from './controllers/SearchObjectIdentificationController'
import ConfigureObjectIdentificationController from './controllers/ConfigureObjectIdentificationController'
import GetObjectIdentificationConfigController from './controllers/GetObjectIdentificationConfigController'
import ConfigureDeleteObjectIdentificationController from './controllers/ConfigureDeleteObjectIdentificationController'

export const plugin = {
  name: 'object-identification-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/object-identification/optional-id',
      method: 'GET',
      ...GetObjectIdentificationConfigController
    })

    server.route({
      path: '/search/object-identification/{token}',
      method: 'GET',
      ...SearchObjectIdentificationController
    })

    server.route({
      path: '/{id}/object-identification/edit/{token}',
      method: 'PUT',
      ...EditObjectIdentificationController
    })

    server.route({
      path: '/config/object-identification/{token}',
      method: 'PUT',
      ...ConfigureObjectIdentificationController
    })

    server.route({
      path: '/object-identification/optional-id/{token}',
      method: 'DELETE',
      ...ConfigureDeleteObjectIdentificationController
    })
  }
}
