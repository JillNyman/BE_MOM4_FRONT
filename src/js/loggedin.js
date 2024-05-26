"use strict";

const messageEl = document.getElementById("message");
const memberMessageEl = document.getElementById("memberMessage");
const memberBtn2El = document.getElementById("memberBtn2");
const logOutBtnEl = document.getElementById("logOutBtn");

//Nå skyddad route
memberBtn2El.addEventListener("click", accessMemberArea, false);
//Logga ut
logOutBtnEl.addEventListener("click", logOut, false);


//Åtkomst till skyddad route
async function accessMemberArea(e){

    e.preventDefault();
    try {
    if(!localStorage.getItem("token")) {
        window.location.href = "index.html";
    }
    //Skicka token vid varje anrop
    let token = localStorage.getItem('token');
    console.log("Lagrad token: " + token);
let response = await fetch('http://localhost:3550/api/protected', {
    //method: "GET",
    headers: {
        'Authorization': 'Bearer ' + token
    }
    
})
await response();
if(!response.ok){
    messageEl.innerHTML = "Du har inte tillgång till sidan";
    throw new Error('Du har inte tillgång till sidan!');
    

}

if(response.status === 200){
    
    window.location.href = "memberzone.html";
    memberMessageEl.innerHTML = "Du blev insläppt!";
    console.log("Du lyckades ta dig in!");
}
} catch(error){
    console.error("Error: " + error);
    window.location.href = "index.html";
}
}

function logOut(){
    localStorage.clear()
    .then(window.location.href = "index.html");
    console.log("Utloggad!");
}