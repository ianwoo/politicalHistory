var router = require('express').Router();
var presidentsClass = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
    console.log('doing homepage');
    res.render('index');
}

// api from here down
router.get('/api/read', do_read);
router.post('/api/create', do_create);
router.put('/api/update', do_update);
router.delete('/api/delete/:_id', do_delete);

function do_read(req, res) {
  console.log('reading all records');
  presidentsClass.find()
    .then(function (results) {
        console.log(results);
        res.json(results);
    })
}

function do_create(req, res) {
  console.log('creating record');
  console.log(req.body); // equals {user: 'bill'}

  var user = new presidentsClass(req.body);

  user.save()
    .then(function (result) {
        console.log(result);
        res.json({message:'saved'});
    });

}

function do_update(req, res) {
  console.log('updating record');
  console.log(req.body);
  var update = {
    $set: {
      number: req.body.number,
      president: req.body.president,
      birth_year: req.body.birth_year,
      death_year: req.body.death_year,
      took_office: req.body.took_office,
      left_office: req.body.left_office,
      party: req.body.party
    }
  }
  presidentsClass.findByIdAndUpdate(req.body._id, update)
    .then(function (result) {
        console.log(result);
        res.json({message: 'updated!'});
    });
}

function do_delete(req, res) {
  console.log('deleting record');
  console.log(req.params);

  presidentsClass.findByIdAndRemove(req.params._id)
  .then(function (result) {
      console.log(result);
      res.json({message: 'deleted'});
  });
  
}