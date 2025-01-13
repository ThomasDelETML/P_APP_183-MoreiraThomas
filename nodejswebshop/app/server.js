const express = require("express");


const app = express();

const userRoute = require('./routes/User');
const accueilRouute = require('./routes/accueil');

app.use('/User', userRoute);
app.use('/accueil', accueilRouute);



// Démarrage du serveur
app.listen(8080, () => {
    console.log('Server running on port 8080');
});