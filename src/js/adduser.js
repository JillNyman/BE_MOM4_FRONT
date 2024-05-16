"use strict";

const addBtnEl = document.getElementById("addBtn"); //Knapp för skapa användare
const loginEmailEl = document.getElementById("username"); //Input användarnamn/email
const loginPassEl = document.getElementById("password"); //Input lösenord
const messageEl = document.getElementById("message"); //meddelande om inloggning

//Knapp: logga in registrerad användare
addBtnEl.addEventListener("click", createUser, false);  

//Skapa ny användare
async function createUser(e){

    e.preventDefault();

try{
    let response = await fetch('http://localhost:3550/api/register', {
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
        throw new Error('Ingen ny användare skapades');
    }

    if(response.status === 201){
        messageEl.innerHTML = "Användare skapad!";
        console.log(data);
    } else {
        messageEl.innerHTML = "Något gick fel, försök igen!";
    }
} catch (error){
    console.error("Error: " + error);
}
}