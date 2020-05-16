console.log("Client Side Server!")

fetch('/weather?address=goa').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})