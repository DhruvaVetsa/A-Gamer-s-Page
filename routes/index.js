var express = require('express');
var router = express.Router();

var tasks_collection = require('./users');

const app = express();
app.use("/public", express.static("public/"));

router.get('/', function(req, res, next) {
  res.render('index', {
    pageTitle : `A Gamer's Page | Home`
  });
});

router.get('/post', function(req, res, next) {
  res.render('post', {
    pageTitle : `A Gamer's Page | Write A Review`
  });
});

router.get('/reviews', function(req, res, next) {
  tasks_collection.find().then((data) => {
    res.render('reviews', {
      pageTitle : `A Gamer's Page | Reviews from other Gamers`,
      reviews : data
    });
  })
});

router.get('/update', function(req, res, next) {
  res.render('update', {
    pageTitle : `A Gamer's Page | Update Your Review`
  });
});

router.post('/create-review', (req, res, next) => {
  var username = req.body.user_name;
  console.log(req.body.game_review);
  if (username == undefined) {
    username = "Anonymous Person";
  }
  tasks_collection.create({
    user_name_d : username,
    game_name_d : req.body.game_name,
    review_d : req.body.game_review
  }).then(() => {
    res.redirect('/reviews');
  });
});

router.get('/update-review/:review_id', (req, res, next) => {
        tasks_collection.findOne({_id : req.params.review_id}).then((game) => {
            res.render('update', {game_details : game, pageTitle : "A Gamer's Page | Update Your Review"});
        })
});

router.post('/edit-review/:review_id', (req, res, next) => {
    var updatedData = {
        user_name_d : req.body.user_name,
        game_name_d : req.body.game_name,
        review_d : req.body.game_review
    }
    tasks_collection.findByIdAndUpdate({_id : req.params.review_id}, {'$set' : updatedData}, {require : true}).then((updated_data) => {
        res.redirect('/reviews');
    });
});

router.get('/delete-review/:review_id', (req, res, next) => {
    tasks_collection.findByIdAndDelete({_id : req.params.review_id}, ).then(() => {
        res.redirect('/reviews');
    })
})

module.exports = router;