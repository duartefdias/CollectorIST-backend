import GetCollectionsController from './controllers/GetCollectionsController'
import GetUserCollectionsController from './controllers/GetUserCollectionsController'
import InsertCollectionController from './controllers/InsertCollectionController'
import DeleteCollectionController from './controllers/DeleteCollectionController'
import EditObjectCollectionController from './controllers/EditObjectCollectionController'

export const plugin = {
  name: 'object-collection-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/object-collection/collections',
      method: 'GET',
      ...GetCollectionsController
    })

    server.route({
      path: '/object-collection/users/{token}',
      method: 'GET',
      ...GetUserCollectionsController
    })

    server.route({
      path: '/object-collection/collections/{token}',
      method: 'POST',
      ...InsertCollectionController
    })

    server.route({
      path: '/object-collection/collections/{token}',
      method: 'DELETE',
      ...DeleteCollectionController
    })

    server.route({
      path: '/{id}/object-collection/edit/{token}',
      method: 'PUT',
      ...EditObjectCollectionController
    })
  }
}
