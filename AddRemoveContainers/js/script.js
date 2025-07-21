


function addMore(num){
    let p = document.querySelector("#parent")
    let html = `
            <div class="container container-${num+1}">
            <div class="main">
                <input type="text" placeholder="Enter your first name" id="fname">
                <input type="text" placeholder="Enter your middle name" id="mname">
                <input type="text" placeholder="Enter your last name" id="lname">
            </div>
            <div class="sub">
                <button class="add-btn" onclick="min(${num+1}); addMore(${num+1});"> + </button>
                <button class="sub-${num+1}" onclick="remove(${num+1})"> - </button>
            </div>
        </div>
    `
    p.innerHTML += html

}

function remove(num){
    let rq = document.querySelectorAll("#parent .container")

    if(num>=0 && num+1!=rq.length){
    let s = document.querySelector("#parent")
    let t = document.querySelector(`.container-${num}`)
    s.removeChild(t)
    for(let i=num+1; i<rq.length;i++){
        rq[i].classList.replace(`container-${i}`,`container-${i-1}`)
        let v = document.querySelector(`.sub-${i}`)
        v.classList.replace(`sub-${i}`,`sub-${i-1}`)
        let x = document.querySelector(`.sub-${i-1}`)
        x.setAttribute("onclick", `remove(${i-1})`);
    }
    }

    if(num==1 && rq.length==2)
    {
        let s = document.querySelector("#parent")
        let t = document.querySelector(`.container-${num}`)
        s.removeChild(t)
        let html= `<button class="add-btn" onclick="min(0); addMore(0);"> + </button>`
        let p = document.querySelector(".container-0 .sub")
        p.innerHTML = html
    }

    if(rq.length==num+1){
        let s = document.querySelector("#parent")
        let t = document.querySelector(`.container-${num}`)
        s.removeChild(t)
        let html= `<button class="add-btn" onclick="min(${num-1}); addMore(${num-1});"> + </button>`
        let p = document.querySelector(`.container-${num-1} .sub`)
        p.innerHTML += html
    }
 
}



function min(val){
    if(val==0){
        let s = document.createElement("button")
        let r = document.querySelector(".add-btn")
        let q = document.querySelector(".sub")
        s.innerHTML = "-"
        s.setAttribute("class",`sub-${val}`)
        s.onclick = `remove(${val})`
        q.replaceChild(s, r)
        }
    else{
        let s = document.querySelector(".add-btn")
        let r = document.querySelector(`.sub-${val}`)
        let q = document.querySelector(`.container-${val} .sub`)
        q.replaceChild(r,s)
    }
}



/* event binding issue
document.querySelector(".add-btn").onclick = function(){
    let num = document.querySelectorAll("#parent .container")
    if(num.length==1){
        let s = document.createElement("button")
        let r = document.querySelector(".add-btn")
        let q = document.querySelector(".sub")
        s.innerHTML = "-"
        s.setAttribute("class","sub-0")
        q.replaceChild(s, r)
    }
} */
