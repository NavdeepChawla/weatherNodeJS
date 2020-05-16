console.log("Client Side Server!")

fetch('http://localhost:3000/weather?address=goa').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})