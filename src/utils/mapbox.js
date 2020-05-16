const request=require('request')

const location=(city,callback)=>{
    
    const locationURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(city)+'.json?access_token=pk.eyJ1IjoibmF2ZGVlcGNoYXdsYSIsImEiOiJja2EyeGx0MG4wOW5pM2V0YnR4endnb3E4In0.u-ehtQUO9rrhOIDAwyNg6A'
    console.log(locationURL)
    request({url:locationURL,json: true},(error,response)=>{

        if(error)
        {
            callback('Error MapBox!',undefined)
        }
        else if(response.body.features===0)
        {
            callback('Error LocationMapBox!',undefined)
        }
        else if(response.body.features[0]==undefined)
        {
            callback('Error LocationMapBox!',undefined)
        }
        else if(response.body.features[0].center==undefined)
        {
            callback('Error LocationMapBox!',undefined)
        }
        else
        {
            const latitude=response.body.features[0].center[0]
            const longitude=response.body.features[0].center[1]
            callback(undefined,
                {
                    latitude: latitude,
                    longitude: longitude
            })
        }

    })

}

module.exports=location