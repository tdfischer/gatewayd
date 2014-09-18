const requireAll = require('require-all');
const express = require('express');
const controllers = requireAll(__dirname+'/../controllers/resources/');

var router = new express.Router();

function mapCRUD(router, prefix, controller) {
  router.get(prefix, controller.index);
  router.post(prefix, controller.create);
  router.get(prefix+'/:id', controller.show);
  router.put(prefix+'/:id', controller.update);
  router.delete(prefix+'/:id', controller.destroy);
}

Object.keys(controllers).forEach(function(key) { 
  mapCRUD(router, key, controllers[key]);
})

module.exports = router;

