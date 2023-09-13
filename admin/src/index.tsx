
import PreviewButton from './components/preview-button';
import LiveButton from './components/live-button';
import reducers from './reducers';

export default {
  register(app: any) {
    const plugin = {
      id: 'strapi-preview-link',
      isReady: true,
      name: 'Preview',
    };

    app.addReducers(reducers);
    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'strapi-preview-link-live',
      Component: LiveButton
    });
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'strapi-preview-link-preview',
      Component: PreviewButton
    });
  }
};
