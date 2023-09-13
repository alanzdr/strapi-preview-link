export default {
  'admin-api': {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/config',
        handler: 'strapi-preview-link.getConfig',
        config: {
          policies: ['admin::isAuthenticatedAdmin'],
        },
      },
    ],
  },
  'content-api': {
    type: 'content-api',
    routes: [
      {
        method: 'GET',
        path: '/data',
        handler: 'strapi-preview-link.getData'
      }
    ],
  },
}