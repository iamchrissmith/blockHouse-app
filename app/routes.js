const path = require('path');
const HouseController = require('./controllers/HouseController');
const houseController = new HouseController;

module.exports = function(router) {

  router.route('/api/v1/houses')
    .post( houseController.create )
    .get( houseController.index );

  router.route('/api/v1/houses/:house_id')
    .get( houseController.show )
    .put( houseController.update )
    .delete( houseController.destroy );
  
  router.route('/')
    .get( (req, res) => {
      res.json({message: 'API information'});
    });

  router.get('*', (req, res) => {
    res.sendfile(path.resolve('public/index.html'));
  });
};