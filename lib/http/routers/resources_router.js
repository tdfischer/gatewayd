const requireAll = require('require-all');
const express = require('express');
const controllers = requireAll(__dirname+'/../controllers/resources/');

var router = new express.Router();
console.log(Object.keys(controllers));

Object.keys(controllers).forEach(function(resource) {
  router.get('/' + resource, controllers[resource].index);
  router.post('/' + resource, controllers[resource].create);
  router.get('/' + resource + '/:id', controllers[resource].show);
  router.put('/' + resource + '/:id', controllers[resource].update);
  router.delete('/' + resource + '/:id', controllers[resource].destroy);
})

module.exports = router;

