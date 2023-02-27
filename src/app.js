const path = require('path')
const chalk = require('chalk')
const express = require('express')
const hbs = require('hbs')

const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const app = express()

// Define path for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup a static directory to serve 
app.use(express.static(publicPath))

// index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bharani'
    })
})
// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bharani'
    })
})
// help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bharani',
        contact: 'help@itechblooms.com'
    })
})
// weather page
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must enter the location to check the weather'
        })
    }else{
        geocode.get_geocode(req.query.address, (error, geocodeData) => {
            if(error){
                res.send({error})
            }else{
                // console.log(chalk.magenta('geocode result:'), geocodeData)
                forecast.get_forecast(geocodeData.lat, geocodeData.lon, (error, forecastData) => {
                    if(error){
                        res.send({error})
                    }else{
                        // console.log(chalk.magenta('forecast result:'), forecastData)
                        res.send({
                            forecast: forecastData.temperature+' degree celcius',
                            location: forecastData.location,
                            address: req.query.address
                        })
                    }
                })
            }
        })
    }
})
// product page
app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log('/products',req.query)
    res.send({
        products: []
    })
})
// 404 page in help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        err_msg: 'Help article not found',
        name: 'Bharani'
    })
})
// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        err_msg: '404 page not found',
        name: 'Bharani'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})