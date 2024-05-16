Applikation för registrering och inloggning. Parcel används.

Det här är klientdelen av applikationen som tillhör uppgift 2 i moment 4, Backendkursen. Det finns tre sidor; den första (/index.html) som är en inloggningssida med formulär för användarnamn och lösenord. Om inloggning lyckas, tas användaren vidare till /loggedin.html samtidigt som JWT lagras i localStorage.

På sidan /loggedin.html finns knapp för att komma till skyddad route ("Member zone"). Om anropet lyckas, tas användare till /memberzone.html.


För att starta applikationen: npm run start
