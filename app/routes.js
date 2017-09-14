const House = require('./models/house');

module.exports = function(app) {
  app.get('/api/v1', (req, res) => {
    res.json({message: 'API information'});
  });

  app.post('/api/v1/houses', (req, res) => {
    const house = new House();
    house.address = req.body.address;
    house.name = req.body.name;
    house.price = req.body.price;
    house.forSale = req.body.forSale;
    house.owner = req.body.owner;
    
    console.log(house);
    house.create( err => {
      if(err)
        res.send(err);

      res.json({message: 'House created!'});
    });
  });

  app.get('/api/v1/houses', (req, res) => {
    House.find( (err, houses) => {
      if (err)
        res.send(err);

      res.json(houses);
    });
  });

  app.get('*', (req, res) => {
    res.sendfile('./public/index.html');
  });
};