"use strict";

const loginBtnEl = document.getElementById("loginBtn"); //Knapp för login
const loginEmailEl = document.getElementById("email"); //Input användarnamn/email
const loginPassEl = document.getElementById("password"); //Input lösenord
const messageEl = document.getElementById("message"); //meddelande om inloggning

//Knapp: logga in registrerad användare
loginBtnEl.addEventListener("click", loginUser, false);  



//Registrering och inlogg mot API med try/catch och lagring i LS
//const url = "localhost:3500/api/";

//Registrerad användare försöker logga in 
async function loginUser(){

    //e.preventDefault();

    /*let username = loginEmailEl.value;
    let password = loginPassEl.value;*/


try{
    let response = await fetch('localhost:3550/api/login', {
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
    console.log(data);

    if(response.status === 200){
        console.log("Tagit emot token:" + data.token);
        localStorage.setItem("token", data.token);
        messageEl.innerHTML = "Tagit emot token";
        //window.location.href = "loggedin.html";
    } else {
        console.log("Fel e-postadress eller lösenord");
    }
} catch (error){
    console.error("Error: " + error);
}
}

//Åtkomst till skyddad route
/*window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {
        window.location.href = "login.html";
    }

    //metod för att ladda den skyddade sidan
}

//Skicka token vid varje anrop
let response = await fetch(url + "cats", {
    headers: {
        'Authorization': 'Bearer ' + token
    }
});*/

