const House = require('../models/house');

class HouseController {

  create (req, res) {
    const house = new House();
    house.address = req.body.address;
    house.name = req.body.name;
    house.price = req.body.price;
    house.forSale = req.body.forSale;
    house.owner = req.body.owner;
    house.size = req.body.size;
    house.type = req.body.type;
    house.bedrooms = req.body.bedrooms;
    house.bathrooms = req.body.bathrooms;
    house.description = req.body.description;
    house.st_address = req.body.st_address;
    house.city = req.body.city;
    house.state = req.body.state;
    house.zipcode = req.body.zipcode;
    
    house.save( err => {
      if(err)
        return res.send(err);

      res.json({message: 'House created!', id: house._id});
    });
  }

  index (req, res) {
    House.find( (err, houses) => {
      if (err)
        return res.send(err);

      res.json(houses);
    });
  }

  show (req, res) {
    House.findById(req.params.house_id, (err, house) => {
      if (err)
        return res.send(err);

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
      house.size = req.body.size;
      house.type = req.body.type;
      house.bedrooms = req.body.bedrooms;
      house.bathrooms = req.body.bathrooms;
      house.description = req.body.description;
      house.st_address = req.body.st_address;
      house.city = req.body.city;
      house.state = req.body.state;
      house.zipcode = req.body.zipcode;

      house.save( err => {
        if(err)
          return res.send(err);

        res.json({message: 'House updated!', house});
      });
    });
  }

  destroy (req, res) {
    House.remove({
      _id: req.params.house_id
    }, (err, house) => {
      if (err)
        return res.send(err);

      res.json({message: 'Successfully deleted'});
    });
  }
}

module.exports = HouseController;