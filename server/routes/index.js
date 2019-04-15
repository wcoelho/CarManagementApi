const veiculoRoutes = require('./veiculo_routes');

module.exports = function(app, db) {
  veiculoRoutes(app, db);
};