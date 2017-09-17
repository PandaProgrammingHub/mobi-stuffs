/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/notifications', require('./api/notification'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/rfps', require('./api/rfp'));
  app.use('/api/groups', require('./api/groups'));
  app.use('/api/resetpassword', require('./api/resetpassword'));
  app.use('/api/search', require('./api/search'));
  app.use('/api/locations', require('./api/location'));
  app.use('/api/companies', require('./api/companies'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/hireds', require('./api/hired'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/recommendations', require('./api/recommendations'));
  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
