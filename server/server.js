// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000; 

app.use(cors()); // Permettre les requêtes CORS
app.use(bodyParser.json()); // Parser le corps de la requête en JSON

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "", // Remplacez par votre adresse e-mail
        pass: "" // Utilisez un mot de passe d'application ici
    }
});

// Route pour envoyer l'email
app.post("/send-email", (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: "",//entrez votre email
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Erreur :", error);
            return res.status(500).send({ message: "Erreur lors de l'envoi de l'email", error });
        }
        console.log("Email envoyé :", info.response);
        res.send({ message: "Email envoyé", info });
    });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
