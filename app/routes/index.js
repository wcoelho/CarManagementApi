const veiculoRoutes = require('./veiculo_routes');

module.exports = function(app, db) {
  veiculoRoutes(app, db);
  // Other route groups could go here, in the future
};