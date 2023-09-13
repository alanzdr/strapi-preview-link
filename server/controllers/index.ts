const previewController = ({strapi}) => ({
  async getConfig () {
    const config = await strapi.config.get('plugin.strapi-preview-link');
    return config;
  },
  async getData (ctx) {
      const { api, id, token, populate } = ctx.query
      const config = await this.getConfig();
      const controller = strapi.controllers[api]
    
      if (!token || token !== config.token || !controller) {
        return ctx.unauthorized('Unauthorized')
      }

      const query = controller.sanitizeQuery({
        ...ctx,
        query: {
          populate,
          publicationState: 'preview',
        }
      })
    
      const pageData = await strapi.entityService.findOne(api, id, query)
    
      if (!pageData) {
        return ctx.notFound('Page not Found')
      }

      const response = await controller.sanitizeOutput(pageData as any, ctx)
      return (controller  as any).transformResponse(response)
    }
  }
)

export default {
  'strapi-preview-link': previewController
}