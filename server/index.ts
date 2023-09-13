import controllers from './controllers';
import routes from './routes';

export default {
  async register({strapi}) {},
  async bootstrap({strapi}) {},
  config: {
    default: {},
    validator() {},
  },
  controllers,
  routes,
}
