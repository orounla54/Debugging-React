// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/send-email', {
                to,
                subject,
                text
            });
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage("Erreur lors de l'envoi de l'email");
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>Envoyer un Email</h1>
            <input
                type="email"
                placeholder="Destinataire"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Objet"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
            />
            <textarea
                placeholder="Message"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            ></textarea>
            <button onClick={handleSendEmail}>Envoyer l'Email</button>
            <p>{responseMessage}</p>
        </div>
    );
}

export default App;
