var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var Movie = require('./models/movie')
var _ = require('underscore')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()

console.log('start~~~');

mongoose.connect('mongodb://localhost/node')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)


app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: '首页',
            movies: movies
        })
    })
})

app.get('/movie/:id', function(req, res) {
    var id = req.params.id
    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: '详情',
            movie: movie
        })
    })
})

app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: '列表',
            movies: movies
        })
    })
})

//admin update
app.get('/admin/update/:id', function(req, res) {
        var id = req.params.id

        if (id) {
            Movie.findById(id, function(err, movie) {
                res.render('admin', {
                    title: '后台更新',
                    movie: movie
                })

            })
        }
    })
    //admin post movie
app.post('/admin/movie/new', function(req, res) {
    console.log(req.body);
    console.log(req.body.movie);

    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie

    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }

            _movie = _.extend(movie, movieObj)
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie({
            title: movieObj.title,
            country: movieObj.country
        })
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }

            res.redirect('/movie/' + movie._id)
        })
    }
})

app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: '录入',
        movie: {
            title: ''
        }
    })
})
