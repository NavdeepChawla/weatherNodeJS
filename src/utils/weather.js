const request=require('request')

const weather=(latitude,longitude,callback)=>{
    
    const weatherURL='https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=ad4e254aa82bf928eefc614df3181939'
    
    console.log(weatherURL)
    
    request({url:weatherURL,json:true},(error,response)=>{
        if(error)
        {
            callback('Error  Weather!',undefined)
        }
        else if(response.body.weather==undefined)
        {
            callback('Error  Weather!',undefined)
        }
        else
        {
            const weatherData=response.body.weather
            console.log(weatherData[0].main) 
            callback(undefined,weatherData[0].main)
        }
    })

}

module.exports=weather