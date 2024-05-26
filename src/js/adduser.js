"use strict";


const loginEmailEl = document.getElementById("username"); //Input användarnamn/email
const loginPassEl = document.getElementById("password"); //Input lösenord
const messageEl = document.getElementById("message"); //meddelande om inloggning
const addBtnEl = document.getElementById("addBtn"); //Knapp formulär lägg till användare

//Knapp: logga in ny användare
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
        messageEl.innerHTML = "Lyckades inte skapa ny användare";
        throw new Error('Ingen ny användare skapades');
    }

    if(response.status === 201){
        messageEl.innerHTML = "Användare skapad!";
        console.log("Användare skapad: ", data);
    } else {
        messageEl.innerHTML = "Något gick fel, försök igen!";
    }
} catch (error){
    messageEl.innerHTML = "Något gick fel. Gör ett nytt försök.";
    console.error("Error: " + error);
}
}