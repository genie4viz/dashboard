// server.js
const next = require('next');
const express = require('express');
const routes = require('./routes');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});
const handler = routes.getRequestHandler(app);

// With express

try {
  app.prepare().then(() => {
    express()
      .use(handler)
      .listen(4000);
  });
} catch (err) {
  console.log(err);
}
