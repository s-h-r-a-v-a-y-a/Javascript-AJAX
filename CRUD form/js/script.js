
let add = document.querySelector(".add");
let form = document.querySelector(".form")
let main = document.querySelector(".main")
let banbtn = document.querySelector(".ban-btn")
let banner = document.querySelector(".banner")
let bancont = document.querySelector(".banner-cont")
let table = document.querySelector("table")
let subm = document.querySelector(".sub")
let upd = document.querySelector(".update")
let load = document.querySelector(".loader")
let close = document.querySelector(".close")
let w1 = document.querySelector(".warn1")
let w2 = document.querySelector(".warn2")
let w3 = document.querySelector(".warn3")

close.addEventListener("click",function(){
    form.style.display = "none";
    let fields = form.querySelectorAll("input")
    for(let inpt of fields)
    {
        inpt.value=""
    }
    let w1 = document.querySelector(".warn1")
    let w2 = document.querySelector(".warn2")
    let w3 = document.querySelector(".warn3")
    w1.style.display = "none"
    w2.style.display = "none"
    w3.style.display = "none"

    main.style.display = "none";

})

add.addEventListener("click",function(){
    form.style.display = "block";
    main.style.display = "block";
})

banbtn.addEventListener("click", function(){
    banner.style.display = "none"
    main.style.display = "none"
})

upd.addEventListener("click", function(event){
    addUser(event)
})

async function deleteUser(id){
    try{
        let resp = await myFetch("DELETE","",`https://api.escuelajs.co/api/v1/users/${id}`)
        console.log("Delete response: ",resp)
        let row = document.querySelector(`.row-${id}`)
        row.remove()
        bancont.innerHTML = "<p> User deleted </p>"
        banner.style.display = "block"
        main.style.display = "block";
    }
    catch(error)
    {
        console.log("Error: ",error)
        form.style.display = "none"
        bancont.innerHTML = "<p> Form is not updated </p>"
        banner.style.display = "block"
    }
}

async function editUser(id){
    subm.style.display = "none"
    upd.style.display = "block"
    form.style.display = "block"

    let selector = document.getElementsByName("ids");
    selector[0].value = id;

    let row = document.querySelector(`.row-${id}`)
    form["firstNm"].value = row.cells[2].textContent
    form["mail"].value = row.cells[3].textContent
    form["pwd"].value = row.cells[4].textContent
    console.log("Im in editUSer")
}

async function addUser(event){
    try{
        console.log("Im in addUser")
        event.preventDefault();

        let selector = document.getElementsByName("ids");
        let fnm = form["firstNm"].value
        let em = form["mail"].value
        let pwd = form["pwd"].value


        if(!fnm.trim()){
            w1.style.display = "block"

        }

        if(!em.trim()){
            w2.style.display = "block"
        }

        if(!pwd.trim()){
            w3.style.display = "block"
        }

            
            load.style.display = "block"

        let postbody = {
            "name": fnm,
            "email": em,
            "password": pwd,
            "avatar": "https://picsum.photos/800"
        }
        let meth = "POST"

        if(selector && selector[0].value){
            postbody.id =selector[0].value;
            delete postbody.password
            delete postbody.avatar
        }

        const response = await callPostAPI(meth, postbody)
        console.log(response)
        
        let rows = table.rows
        let flag =1

        let str = htmlContent(response)

        for(let row of rows)
            {
                if (row.classList.contains(`row-${response.id}`))
                {
                    row.outerHTML = str
                    flag=0
                }
            }
        
        if(flag==1)
        {
            table.insertAdjacentHTML("beforeend",str)
        }
        let fields = form.querySelectorAll("input")
        for(let inpt of fields)
        {
            inpt.value=""
        }
            load.style.display = "none"
        bancont.innerHTML = "<p> Form submitted successfully </p>"
        banner.style.display = "block"
    }
    catch(err){
        console.log("Error: ",err)
        load.style.display = "none"
        let fields = form.querySelectorAll("input")
        for(let inpt of fields)
        {
            inpt.value=""
        }
        bancont.innerHTML = "<p> Form is not submitted </p>"
        banner.style.display = "block"
    }
}

function htmlContent(response){
    let str;
    str = `
    <tr class="row-${response.id}">
        <td><img src="${response.avatar}"></td>
        <td>${response.id}</td>
        <td> ${response.name}</td>
        <td> ${response.email}</td>
        <td> ${response.password}</td>
        <td> ${response.role}</td>
        <td> ${response.creationAt.split("T")[0]}</td>
        <td class="action"><img src="./Edit--Streamline-Tabler.svg" class="edit" onclick="editUser(${response.id})"><img src="./bin.png" class="delete" onclick="deleteUser(${response.id})"> </td>
    </tr>
    `
    return str
}

async function callPostAPI(meth,postbody) {
    try {
        let url = "https://api.escuelajs.co/api/v1/users/";
        if(postbody.id){
            meth = 'PUT'
            url = "https://api.escuelajs.co/api/v1/users/"+postbody.id;
        }
    
       delete postbody.id;
    
       let response = await myFetch(meth,postbody,url)
       console.log("callPA response: ",response)
       return response
    } catch (error) {
        console.log("Error: ",error)
    }
}

function myFetch(method, body,url){
    return new Promise(function(resolve, reject){
        let xhttp = new XMLHttpRequest()
        xhttp.onload = function(){
            let response;
            if (this.responseText) {
                response = JSON.parse(this.responseText);
            }
            console.log("Status:",this.status)
            console.log("Responsetext: ",response)
            if (this.status >= 200 && this.status < 300) {
                resolve(response);
            }
            else if (this.status === 400) {
                console.log(response.message)
                let ban = document.querySelector(".ban2")
                ban.style.display="block"
                reject(response)

            } else {
                console.log("500", response.message)
                reject(response)
            }
        }
        xhttp.open(method, url, true)
        if(method=="POST" || method=="PUT"){
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(body))
        }
        else{
            xhttp.send()
        }
    })
}
// function callPostAPI(meth, postbody) {
//     let url = "https://api.escuelajs.co/api/v1/users/";
//     if(postbody.id){
//         meth = 'PUT'
//         url = "https://api.escuelajs.co/api/v1/users/"+postbody.id;
//     }

//    delete postbody.id;

//    return fetch(url, {
//         method: meth,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(postbody),
//     })
//         .then(function (response) {
//             console.log("Status: ",response.status)
//             if (response.ok) {
//             return response.json();
//             }
//         })
//         .then(function (data) {
//             return(data);
//         })
//         .catch(function (err) {
//             return(err);
//         });
// }

// async function deleteUser(id){
//     try
//     {
//         console.log(id)
//         let resp = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`,{
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json", // Optional, depends on the API
//             },
//         })
//         if(resp.ok)
//         {
//             resp = await resp.json()
//             console.log("Delete response: ",resp)
//             let row = document.querySelector(`.row-${id}`)
//             row.remove()
//             bancont.innerHTML = "<p> User deleted </p>"
//             banner.style.display = "block"
//             main.style.display = "block";

//         }
//     }
//     catch(error)
//     {
//         console.log("Error: ",error)
//         form.style.display = "none"
//         bancont.innerHTML = "<p> Form is not updated </p>"
//         banner.style.display = "block"
//     }
// }


