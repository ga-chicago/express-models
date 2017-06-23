var express = require('express'),
    app     = express(),
    server = require('http').createServer(app),
    path = require('path'),
    bodyParser = require('body-parser'),
    Wine = require('./models/Wine');

    require('./db/db')

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(request, response){
  Wine.find(function(err, wines){
    var allWines = {wines: wines};
    console.log(allWines);
    response.render('home', allWines);
  })
});

app.get('/wines', function(request, response){
  //return all the wines
  Wine.find(function(err, wines){
    console.log(wines);
    response.json(wines);
  });
})

app.get('/wines/:id', function(request, response){
  //return a specific wine by id
  var id = request.params.id;
  Wine.findById(id, function(err, wine){
    console.log(err);
    response.json(wine);
  })
})

app.post('/wines', function(request, response){
  //create a new wine from the request body
  console.log(request.body);
  var wine = new Wine({name: request.body.name,
                      type: request.body.type,
                      region: request.body.region,
                      vintage: request.body.vintage,
                      organic: request.body.organic})
  wine.save();
  response.send("success");
})

app.patch('/wines/:id', function(request, response){
  //update a wine by id with the request body
  var id = request.params.id;
  Wine.findById(id, function(err, wine){
    wine.name = request.body.name;
    wine.type = request.body.type;
    wine.region = request.body.region;
    wine.vintage = request.body.vintage;
    wine.organic = request.body.organic;
    wine.save();
    response.json(wine);
  })
})

app.delete('/wines/:id', function(request, response){
  //delete the wine by id
  var id = request.params.id;
  Wine.findById(id, function(err, wine){
    wine.remove();
    response.json("success");
  })
})

server.listen(3000, function(){
  console.log("listening on port 3000");
})
