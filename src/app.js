const path=require('path')
const express=require('express')
const hbs=require('hbs')
const mapbox=require('./utils/mapbox')
const weather=require('./utils/weather')

// Paths for Express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsDirectoryPath=path.join(__dirname,'../templates/views')
const partialsDirectoryPath=path.join(__dirname,'../templates/partials')

//Initiate Express
const app = express()
const port = process.env.PORT || 3000

//Set handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//Set Static Directory
app.use(express.static(publicDirectoryPath))

//Routes
app.get('',(req,res)=>{

    res.render('index',{
        title: 'Hi Express HBS!',
        name: 'Navdeep Chawla'
    })

})

app.get ('/help',(req,res)=>{

    res.render('help')

}),

app.get('/about',(req,res)=>{

    res.render('about')

})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error: 'It is mandatory to query address'
        })
    }
    
    mapbox(req.query.address,(error,data={})=>{

        if(error)
        {
            res.send({
                error: error
            })
        }
        else
        {
            weather(data.latitude,data.longitude,(error,data={})=>{
                if(error)
                {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    weather: data,
                    address: req.query.address
                })
            })
        }
    })

})


app.get('*',(req,res)=>{
    
    res.render('404',{
        errorMSG: 'Page not found.'
    })

})

//Activate Express server on port 3000
app.listen(port,()=>{

    console.log('Server is up on port 3000')

})