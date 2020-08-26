arrNews = ["Very first Maverick of the week Shivam Pandey" , "Prasheet Pathak posted on Linked In" , "SpaceX launches Falcon 9 ... !"] ;
updateWindowCount = 0 ;


function createNewsInsertPanel(){
    console.log(updateWindowCount) ;
    if (updateWindowCount == 0){
        updateWindowCount += 1 ;

    var parentAboutImg = document.getElementsByClassName("about")[0] ;
    var aboutImg = document.createElement("img") ;
    aboutImg.src = "about-us-img.png" ;
    aboutImg.id = "abtImg" ;
    parentAboutImg.appendChild(aboutImg) ;
    console.log("image appended") ;

    var head = document.createElement("h2") ;
    head.style.marginTop = "14px" ;
    head.textContent = "NEWS UPDATE IN PROGRESS ....." ;

    var areaNewNews = document.createElement("textarea") ; 
    areaNewNews.id = "areaNewNews" ;
    areaNewNews.rows = "5" ;
    areaNewNews.cols = "20" ;
    areaNewNews.placeholder = "Any new News ....." ;

    var buttons = document.createElement("div") ;
    buttons.style.display = "flex" ;
    buttons.style.width = "40%" ;
    buttons.className = "buttonsAddNews" ;
    buttons.style.justifyContent = "space-around" ;

    var submitNewNews = document.createElement("button") ;
    submitNewNews.innerHTML = "submit" ;
    submitNewNews.className = "submitBtn" ;
    submitNewNews.style.color = "green" ;

    var cancelNewNews = document.createElement("button") ;
    cancelNewNews.innerHTML = "Cancel" ;
    cancelNewNews.className = "submitBtn" ;
    cancelNewNews.style.color = "red" ;

    var parNode = document.getElementById("newNewBtn").parentNode ;
    var newNewsAddPanel = document.createElement("div") ;
    newNewsAddPanel.id = "new-news" ;
    parNode.appendChild(newNewsAddPanel) ;

    removeUpdate() ;

    submitNewNews.onclick = function(){
        if (areaNewNews.value == ""){
            alert("No news Feeded ... Please enter some news to update") ;
        }else{
            addNewNews(areaNewNews.value) ;
            areaNewNews.value = "" ;
        }
    }
    cancelNewNews.onclick = function(){
        newNewsAddPanel.parentNode.removeChild(newNewsAddPanel) ;
        console.log(updateWindowCount) ;
        insertUpdate() ;
        updateWindowCount = 0 ;

        var parentAboutImg = document.getElementsByClassName("about")[0] ;
    var abtImg = document.getElementById("abtImg") ;
    parentAboutImg.removeChild(abtImg) ;
    }

    buttons.append(submitNewNews) ;
    buttons.append(cancelNewNews) ;
    console.log(cancelNewNews)  ;

    
    newNewsAddPanel.style.margin = "20px 4%" ;
    newNewsAddPanel.style.backgroundImage = "url('addNewsBackground.jpg')" ;
    
    newNewsAddPanel.appendChild(head) ;
    newNewsAddPanel.appendChild(areaNewNews) ;
    newNewsAddPanel.appendChild(buttons) ;
    }
}

function removeUpdate(){
    var updateBtn = document.getElementById("newNewBtn") ;
    updateBtn.parentElement.removeChild(updateBtn) ;
}

function insertUpdate(){
    
    console.log("I am in insert update >>>>") ;
    var updateBtn = document.createElement("button") ;
    updateBtn.textContent = "Update news" ;
    updateBtn.id = "newNewBtn" ;
    document.getElementsByClassName("news-letter")[0].appendChild(updateBtn) ;
    updateBtn.onclick = function(){
        createNewsInsertPanel() ;
    } ;
}

function printList(){
    var ulList = document.getElementById("newNewsList") ;
    ulList.innerHTML = "" ;
    var i = 0 ;
    for (var news of arrNews){
        if ((news != undefined)) {
            var newNews = document.createElement("li") ;
        var icon = document.createElement("i") ;
        icon.className = "fas fa-exclamation-triangle" ;
    icon.style.margin = "4px" ;

    var count = document.createElement("input") ;
    count.type = "hidden" ;
    count.id = "count" ;
    count.value = i ;

    var divUpdRmvBtn = document.createElement("div") ;
    divUpdRmvBtn.className = "divUpdRmvBtn" ;

    var content = document.createElement("p") ;
    content.className = "content" ;
    content.style.boxSizing = "border-box" ;
    content.style.paddingBottom = "5px" ;
    content.innerHTML = news ;

    var updateIcon = document.createElement("i") ;
    updateIcon.className = "far fa-edit fa-lg" ;
    updateIcon.style.color = "green" ;
    updateIcon.setAttribute("onclick" , "updIcon(this)") ;
    
    var iconRemove = document.createElement("i") ;
    iconRemove.className = "far fa-trash-alt fa-lg" ;
    iconRemove.style.color = "red" ;
    iconRemove.setAttribute('onclick' , "remIcon(this)") ;

    divUpdRmvBtn.append(updateIcon) ;
    divUpdRmvBtn.append(iconRemove) ;

    newNews.style.borderBottom = "1px solid black " ;

    console.log(i) ;
    newNews.append(icon) ;
    newNews.append(count) ;
    newNews.append(content) ;
    newNews.append(divUpdRmvBtn) ;
    ulList.append(newNews) ;

    i = i + 1 ;
        }
        
    }
}

const addNewNews=news =>{
    arrNews.unshift(news) ;
    printMarquee() ;
    printList() ;
}

function updIcon(id){

    var index = id.parentNode.parentNode.querySelector("#count") ;
    console.log(index.value) ;

    var doneBtn = document.createElement("button") ;
    doneBtn.id = "doneBtn" ;
    doneBtn.innerHTML = "Done" ;

    var tempId = id ;
    
    var updatedNews = document.createElement("input") ;
    updatedNews.type = "text" ;
    updatedNews.className = "updatedNews" ;
    updatedNews.placeholder = document.querySelector(".content").innerHTML ;

    console.log(id.parentNode.parentNode) ;
    id.parentNode.parentNode.replaceChild(updatedNews , id.parentNode.parentNode.querySelector(".content")) ;
    id.parentNode.parentNode.replaceChild(doneBtn , id.parentNode) ;
    
    id = updatedNews ;
    
    
    doneBtn.onclick = () => {
        if (updatedNews.value.trim() != ""){
            arrNews.splice(index.value , 1 , updatedNews.value) ;        
            id.parentNode.replaceChild(tempId.parentNode , doneBtn) ;
            id.parentNode.replaceChild(document.querySelector(".content") , updatedNews) ;
            printList() ;
            printMarquee() ;
        }
    }
}

const remIcon = id => {
    console.log(id.parentNode.parentNode)
    console.log("I am in ") ;
    var ul = document.querySelector("#newNewsList") ;
    ul.removeChild(id.parentNode.parentNode) ;
    var index = id.parentNode.parentNode.querySelector("#count") ;
    console.log(index.value) ;
    var toBeRemoved = id.parentNode.parentNode.querySelector("#count") ;
    console.log(toBeRemoved.value) ;
    delete arrNews[toBeRemoved.value] ;
    console.log(arrNews)
    printMarquee() ;

}

const printMarquee = () => {
    var doc = document.getElementById("marquee") ;
    doc.innerHTML = "" ;
    for(var allNews of arrNews){
        if (allNews != undefined){
            doc.append(allNews + " | ") ;
        }
    }
}

const newsAdd =() => {
    createNewsInsertPanel() ;   
    }
    
//student section

function createCardWithDetails(name , designation , linkedin , facebook , github) {
    var mainStudentAdd = document.getElementsByClassName("team")[0] ;
    console.log(mainStudentAdd) ;

    var memCard = document.createElement("div") ;
    memCard.className = "member" ;
    var memImage = document.createElement("img") ;
    memImage.src = "https://www.w3schools.com/html/pic_trulli.jpg" ;

    memImage.alt = "Image not found" ;
    var pName = document.createElement("p") ;
    pName.innerHTML = name ;
    var dName = document.createElement("p") ;
    dName.innerHTML = designation ;
    var memConn = document.createElement("div") ;
    memConn.className = "flex-conection" ;
    var a1 = document.createElement("a") ;
    a1.href = linkedin ;
    a1.target = "_blank" ;
    var a2 = document.createElement("a") ;
    a2.href = facebook ;
    a2.target = "_blank" ;
    var a3 = document.createElement("a") ;
    a3.href = github ;
    a3.target = "_blank" ;
    var li = document.createElement("i") ;
    li.className = "fab fa-linkedin-in fa-lg" ;
    var fb = document.createElement("i") ;
    fb.className = "fab fa-facebook fa-lg" ;
    var gh = document.createElement("i") ;
    gh.className = "fab fa-github fa-lg" ;
    a1.appendChild(li) ;
    a2.appendChild(fb) ;
    a3.appendChild(gh) ;
    memConn.appendChild(a1) ;
    memConn.appendChild(a2) ;
    memConn.appendChild(a3) ;

    memCard.appendChild(memImage) ;
    memCard.appendChild(pName) ;
    memCard.appendChild(dName) ;
    memCard.appendChild(memConn) ;
    console.log(mainStudentAdd) ;

    mainStudentAdd.appendChild(memCard) ;
}

function addStudentForm(){

    var imageDiv = document.createElement("div") ;
    imageDiv.className = "imgDivStud" ;

    var btnDiv = document.createElement("div") ;
    btnDiv.className = "btnDivStud" ;

    var headNewStud = document.createElement("h2") ;
    headNewStud.innerHTML = "Adding New Fellow" ;
    headNewStud.style.color = "white" ;

    var parentForm = document.getElementById("addStudent") ;
    var studAddBtn = document.getElementById("studentaddbtn") ;
    // var lbl = document.createElement("label") ;
    // lbl.innerHTML = "Upload your image : " ;

    var form = document.createElement("div") ;
    form.className = "newStudentForm" ;
    var name = document.createElement("input") ;
    name.placeholder = "Enter your name" ;
    var desig = document.createElement("input") ;
    desig.placeholder = "Your Designation (You are working as)" ;
    // var image = document.createElement("input") ;
    // image.type = "file" ;
    var linkedInLink = document.createElement("input") ;
    linkedInLink.placeholder = "Your Linked Profile" ;
    var facebookLink = document.createElement("input") ;
    facebookLink.placeholder = "Your Facebook Profile" ;
    var githubLink = document.createElement("input") ;
    githubLink.placeholder = "Your Github Profile" ;
    var submit = document.createElement("input") ;
    submit.type = "submit" ;
    submit.value = "Submit"
    var cancel = document.createElement("input") ;
    cancel.type = "submit" ;
    cancel.value = "Cancel" ;


    btnDiv.appendChild(submit) ;
    btnDiv.appendChild(cancel) ;

    // imageDiv.appendChild(lbl) ;
    // imageDiv.appendChild(image) ;

    form.appendChild(headNewStud) ;
    form.appendChild(name) ;
    form.appendChild(desig) ;
    
    // form.appendChild(imageDiv) ;
    form.appendChild(linkedInLink) ;
    form.appendChild(facebookLink) ;
    form.appendChild(githubLink) ;
    form.appendChild(btnDiv) ;

    parentForm.appendChild(form) ;
    parentForm.removeChild(studAddBtn) ;

    cancel.onclick = function(){
        var studAddBtn = document.createElement("button") ;
        studAddBtn.onclick = function(){
            addstudent() ;
        }
        studAddBtn.id = "studentaddbtn" ;
        studAddBtn.innerHTML = "Add Student" ;
        parentForm.appendChild(studAddBtn) ;
        parentForm.removeChild(form) ;
        
    }
    submit.onclick = function(){
        createCardWithDetails(name.value , desig.value , linkedInLink.value , facebookLink.value , githubLink.value) ;
        var studAddBtn = document.createElement("button") ;
        studAddBtn.onclick = function(){
            addstudent() ;
        }
        studAddBtn.id = "studentaddbtn" ;
        studAddBtn.innerHTML = "Add Student" ;
        parentForm.appendChild(studAddBtn) ;
        parentForm.removeChild(form) ;
    }

}

function addstudent(){
    addStudentForm() ;
}

// IIFE functions

(function(){
    printList() ;
})() ;