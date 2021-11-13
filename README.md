# HAMSTERWARS frontend

+ Backend: REST API med Node.js, Express och Firestore
+ Frontend: web app med React och TypeScript

##### Startsida
Här visas den hamster som leder tävlingen för tillfället, det finns en enkel beskrivning på hur man tävlar/använder appen, samt en knapp med en genväg till tävlingen. Det finns även en navigationsmeny längst upp på sidan som följer med varje sida.

##### Tävla
Här visas två slumpade hamstrar, man klickar på den man tycker är sötast och då kommer tävlingsresultatet upp samt en knapp för att starta en ny omgång.
När man klickar på den sötaste hamstern så skapas en ett nytt matchobject i databasen och uppdaterar hamsterobjecten med tävlingsresultatet.

##### Galleri
Här visas alla hamstrar i ett css grid (mui), här finns en knapp där man kommer till ett formulär (formik) så att man kan lägga till en egen hamster, formuläret använder validering (yup). På galleriet kan man även klicka på en hamster och då får man upp all info om den (även vilka hamstrar den har besegrat), samt att man kan radera den.

##### Statistik
Här syns top-5 vinnande hamstrar och top-5 förlorande hamstrar.

##### Historik
Här visas resultatet (cards med vinnare och förlorare) från alla matcher.

#### Level ups
- Animationer (bouncing 404, shine on cutest and winner)
- Redux och Redux Toolkit.
- React Router
