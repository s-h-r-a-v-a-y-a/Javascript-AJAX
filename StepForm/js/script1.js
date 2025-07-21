onload()
let pg1 = document.querySelector(".nxt")
let pg2 = document.querySelector(".nxt1")
let pg2prev = document.querySelector(".prev")
let pg3prev = document.querySelector(".prev1")
let subm = document.querySelector(".submit")
let done = document.querySelector(".done")
let step =1;

pg1.onclick = pgcheck
pg2.onclick = pgcheck
pg2prev.onclick = backpg
pg3prev.onclick = backpg
subm.onclick = function(){
    nextPg() 
    final()
}
done.onclick = function clear(){
    localStorage.removeItem("formdata")
    console.log("storage cleared and page about to reload")
    location.reload()
}

function onload(){
    let fields = document.querySelectorAll(".field")
    /*     if(fields && fields.length > 0){
        fields = fields.filter(f=> typeof f.value !=="undefined")
    }
   */
    display(fields)
    console.log("previous info is logged")
}

function final(){
    let fields = document.querySelector(".main-4").getElementsByTagName("input")
    display(fields)
    console.log("form is displayed")
}

function display(fields){
    let values = localStorage.getItem("formdata")
    if(values){
        values = JSON.parse(values)
        for(let input of fields)
        {
            {
                let attrNm = input.getAttribute("name")
                if(values[[attrNm]])
                {
                    let val = values[[attrNm]]
                    input.value = val
                }
            }
        }
    }
}

function save(step){
    let pg = document.querySelector(`.step${step}`)
    let selectors = pg.getElementsByTagName('input')
    let formd = localStorage.getItem("formdata")
    let  obj
    if(formd){
        obj = JSON.parse(formd)
    }
    else{
         obj = {}
    }
    for(input of selectors){
        let val = input.value
        let attr = input.getAttribute("name")
        obj[attr] = val
    }
    localStorage.setItem("formdata", JSON.stringify(obj))
}

function backpg(){
    step--
    
    let page1 = document.querySelector(`.main-${step} `)
    let page2 = document.querySelector(`.main-${step+1}`)
    page1.style.display = "block"
    page2.style.display = "none"
    console.log("Moved to previous page")

}

function pgcheck(){
        let fn = document.querySelector(`.step${step}`).getElementsByTagName("input")
        console.log(fn)
        let flag=0
        for( let i=0; i<fn.length; i++){
            let field = fn[i].parentElement
            let sq = field.querySelector(".red")
            console.log("I am here",fn[i].value)
            if(!fn[i].value){
               
                if(!sq){
                    let warn = document.createElement("p")
                    warn.innerHTML = "*Please fill this field"
                    warn.classList.add("red")
                    field.appendChild(warn)
                    console.log("some fields dont' have values and warning added")
                }
                flag=1
            }
    
            else{
                if(sq){
                    field.removeChild(sq)
                    console.log("all fields have vals and some have warnings, so removed them")
                }
                console.log("all fields have vals")
            }
        }
        console.log("flag value",flag)
        if(flag==0){
            console.log("moving to next page")
            save(step)
            console.log("saved details")
            nextPg()
            step++;
        }
}

function nextPg(){
    let mn = document.querySelector(`.main-${step}`)
    let mn2 = document.querySelector(`.main-${step+1}`)
    console.log(mn)
    console.log(mn2)
    mn.style.display = "none"
    mn2.style.display = "block"
    console.log("step: ",step)
    console.log("moved to next page")
}

let fn = document.querySelectorAll(".field")
for(let i of fn){
    i.onchange = function(){
        let parent = i.parentElement
        let warning = parent.querySelector(".red")
        if(warning){
            parent.removeChild(warning)
        }
    }   
}
