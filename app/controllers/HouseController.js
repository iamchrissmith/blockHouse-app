const House = require('../models/house');

class HouseController {

  create (req, res) {
    const house = new House();
    house.address = req.body.address;
    house.name = req.body.name;
    house.price = req.body.price;
    house.forSale = req.body.forSale;
    house.owner = req.body.owner;
    
    house.save( err => {
      if(err)
        res.send(err);

      res.json({message: 'House created!'});
    });
  }

  index (req, res) {
    House.find( (err, houses) => {
        if (err)
          res.send(err);
  
        res.json(houses);
      });
  }

  show (req, res) {
    House.findById(req.params.house_id, (err, house) => {
      if (err)
        res.send(err);

      res.json(house);
    });
  }

  update (req, res) {
    House.findById(req.params.house_id, (err, house) => {
      if (err)
        res.send(err);

      house.name = req.body.name;
      house.price = req.body.price;
      house.forSale = req.body.forSale;
      house.owner = req.body.owner;

      res.json({message: 'House updated!'});
    });
  }

  destroy (req, res) {
    House.remove({
      _id: req.params.house_id
    }, (err, house) => {
      if (err)
        res.send(err);

      res.json({message: 'Successfully deleted'});
    });
  }
}

module.exports = HouseController;