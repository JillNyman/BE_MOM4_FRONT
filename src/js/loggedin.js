"use strict";



const messageEl = document.getElementById("message");
const memberMessageEl = document.getElementById("memberMessage");
const memberBtnEl = document.getElementById("memberBtn");
const logOutBtnEl = document.getElementById("logOutBtn");

memberBtnEl.addEventListener("click", accessMemberArea, false);

logOutBtnEl.addEventListener("click", logOut, false);


/*function memberArea(){
    const headers = { 'Authorization': 'Bearer ' + token};

    fetch('http://localhost:3550/api/protected', {headers})
    .then(response => response.json())
    .then(data => console.log(data.message));
    window.location.href = "http://localhost:1234/memberzone.html";

}*/

//Åtkomst till skyddad route
async function accessMemberArea(e){

    e.preventDefault();
    try {
    if(!localStorage.getItem("token")) {
        window.location.href = "http://localhost:1234/login.html";
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
//console.log("Token skickad");
await response();
if(!response.ok){
    messageEl.innerHTML = "Du har inte tillgång till sidan";
    throw new Error('Du har inte tillgång till sidan!');
    

}

if(response.status === 200){
    
    window.location.href = "http://localhost:1234/memberzone.html";
    memberMessageEl.innerHTML = "Du blev insläppt!";
    console.log("Du lyckades ta dig in!");
}
} catch(error){
    console.error("Error: " + error);
    window.location.href = "http://localhost:1234/login.html";
}
}

function logOut(){
    localStorage.clear();
    window.location.href = "index.html";
}
