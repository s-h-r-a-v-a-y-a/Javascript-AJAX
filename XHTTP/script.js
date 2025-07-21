function xhttprequest(body, method, endpt){
    return new Promise(function (resolve, reject){

    console.log("In xhttpreq fn")

    const xhttp = new XMLHttpRequest();
    
    xhttp.onload = function() {
        let response = JSON.parse(this.responseText)
      if(this.status == 201)
      {
        resolve(response)
      }
      if(this.status == 400)
      {
        reject(response)
      }
      else{
        console.log()
      }
    }
    
    xhttp.open(method, endpt);
    
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send(body);
    })
}

function xhttp(event){

    event.preventDefault()
    console.log("In onsubmit fn")
    let form = document.querySelector("form")
    let nm = form["fname"].value
    let mail = form["mail"].value
    let pwd = form["pwd"].value
    let endpt = "https://api.escuelajs.co/api/v1/users"
    let body = {
        "name": nm,
        "email": mail,
        "password": pwd,
        "avatar": "https://picsum.photos/800"
      }
    
      let method = "POST"

      xhttprequest(JSON.stringify(body),method,endpt)


}