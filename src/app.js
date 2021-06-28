const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//app.use telling the server to serve up static content from a certain path
const publicDirPath = path.join(__dirname,'../public')
app.use(express.static(publicDirPath))

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//tell express to use hbs template engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather app',
        name:'James'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Page',
        name:'James'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help Page',
        name:'James'
    })
})

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Please provide a location'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}) =>{
        if(error){
            return res.send({error: error})
        }
        console.log(latitude)
        console.log(longitude)
        console.log(location)

        forecast(longitude,latitude,(error,forecastData)=> {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    //what to send to the browser to display to the requester
    // res.send({
    //     forecast: 'It is cloudy',
    //     location: 'lincoln'
    // })

})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404 Error',
        errorMessage:'Page Not Found'
    })
})


//app.listen starts up the server on a port, the second argument is an optional callback function 
app.listen(port, ()=>{
    console.log('server started')
})