const nextRoutes = require('next-routes');

const routes = nextRoutes();
routes
  .add('test', '/@:nickname', 'apollo')
  .add('login', '/login')
  .add('cores', '/cores/:workspaceId', 'cores')
  .add('core', '/core/:workspaceId/:coreId/:tableId', 'core')
  .add('coreWithView', '/core/:workspaceId/:coreId/:tableId/:viewId', 'core')
  .add('styleguide', '/styleguide')
  .add('dashboard', '/dashboard');

module.exports = routes;
