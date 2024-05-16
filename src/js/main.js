"use strict";

const loginBtnEl = document.getElementById("loginBtn"); //Knapp för login
const loginEmailEl = document.getElementById("username"); //Input användarnamn/email
const loginPassEl = document.getElementById("password"); //Input lösenord
const messageEl = document.getElementById("message"); //meddelande om inloggning

const memberBtnEl = document.getElementById("memberBtn");

memberBtnEl.addEventListener("click", accessMemberArea, false);

//Knapp: logga in registrerad användare
loginBtnEl.addEventListener("click", loginUser, false);  



//Registrering och inlogg mot API med try/catch och lagring i LS
//const url = "localhost:3500/api/";

//Registrerad användare försöker logga in 
async function loginUser(e){

    e.preventDefault();

try{
    let response = await fetch('http://localhost:3550/api/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: loginEmailEl.value,
            password: loginPassEl.value
        })
    })

   let data = await response.json();
    if(!response.ok){
        throw new Error('Inloggningen misslyckades');
    }
    console.log(data.response.token);

    if(response.status === 200){
        localStorage.setItem('token', data.response.token);      
        
        window.location.href = "http://localhost:1234/loggedin.html";
    } else {
        console.log("Fel e-postadress eller lösenord");
    }
} catch (error){
    console.error("Error: " + error);

}
}

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


