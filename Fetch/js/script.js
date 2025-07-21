let step=1

function callAPI(info){
    return new Promise(function (resolve, reject){

        fetch(`https://api.spacexdata.com/v3/rockets${info}`).then(async function (response) {
 
            let data = null;
            if (response.status === 200) {
 
                data =  await response.json();
                resolve(data)
 
            }
        }).catch(err => {
            reject(err);
        })
 
    }
)}

async function displayData() {
    try {
        const data = await callAPI("")
        console.log("Data[0] entry: ",data[0])
        console.log("Data length: ",data.length)
        let str = ""
        for(entry of data){
            str += makeHTML(entry)
        }
        console.log("HTML str: ",str)
        let main = document.querySelector(".list")
        console.log("Main ele created")
        main.innerHTML = str
        console.log("Rocket cards are added")
    } catch (error) {
        console.log("Error: ",error)
    }
}


function makeHTML(entry){
    if(step==1){
        entry.flickr_images[0] = entry.flickr_images[0].replace("https://imgur.com/DaCfMsj.jpg","https://i.imgur.com/DaCfMsj.jpeg")
        console.log("Edited image entry: ",entry.flickr_images[0])

    }
    let str = `
        <div class="card" onclick="content('${entry.rocket_id}')">
            <div class="img-cont">
                <img src="${entry.flickr_images[0]}" alt="${entry.rocket_name}">
            </div>
            <div class="title">
                <p> Title : ${entry.rocket_name} </p>
            </div>
        </div>
    `
    console.log("Step: ",step)
    console.log("Rocket ID: ",entry.rocket_id)
    step++
    return str
}

function contentHTML(entry){
    if(entry.rocket_id=="falcon1"){
        entry.flickr_images[0] = entry.flickr_images[0].replace("https://imgur.com/DaCfMsj.jpg","https://i.imgur.com/DaCfMsj.jpeg")
        console.log("Edited image entry: ",entry.flickr_images[0])
    }

    let str = `
        <div class="frame1">
            <div class="back-img" onclick="moveBack()">
                <img src="back2.png">
            </div>
            <div class="frame2">
                <div class="rock-img">
                    <img src="${entry.flickr_images[0]}">
                </div>
                <div class="frame3">
                    <p><b>Rocket Name</b>: ${entry.rocket_name}</p>
                    <p><b>Cost per launch</b>: ${entry.cost_per_launch}</p>
                    <p><b>Description</b>: ${entry.description}</p>
                    <p><b>First Flight</b>: ${entry.first_flight}</p>
                    <p><b>Landing Legs</b>: ${entry.landing_legs}</p>
                    <p><b>Wikipedia</b>: <a href="${entry.wikipedia}" targer="_blank">${entry.wikipedia}</a></p>
                </div>
            </div>
        </div>
    `
    return str
}

function moveBack(){
    let info = document.querySelector(".info")
    let list = document.querySelector(".list")
    info.style.display = "none"
    list.style.display = "flex"
}

async function content(rocket_id){
    try {

        let load = document.querySelector(".loader")
        let list = document.querySelector(".list")
        load.style.display = "block"
        list.style.display = "none"
        console.log(rocket_id)
        const data = await callAPI(`/${rocket_id}`)
        console.log(data)
        let str = contentHTML(data)
        console.log("HTML Rocket Content str: ",str)
        let info = document.querySelector(".info")
        console.log("Content ele created")
        info.innerHTML = str
        console.log("Content added")
        load.style.display = "none"
        info.style.display = "block"
        
    } catch(error) {
        console.log("Error getting rocket content: ",error)
    }
}
displayData()

