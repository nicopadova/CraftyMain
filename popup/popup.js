// Inserisci l'HTML per il popup della chat e il bottone della chat nel documento
document.body.insertAdjacentHTML('beforeend', `
    <!-- Popup Chat -->
    <div id="chat-popup" class="chat-popup">
        <form class="chat-form">
            <h2>Contattaci</h2>
            <label for="chat-name">Nome</label>
            <input type="text" id="chat-name" name="chat-name" required />
    
            <label for="chat-email">Email</label>
            <input type="email" id="chat-email" name="chat-email" required />
    
            <label for="chat-message">Messaggio</label>
            <textarea id="chat-message" name="chat-message" rows="4" required></textarea>
    
            <button type="submit" class="btn btn-primary">Invia</button>
            <button type="button" class="btn btn-secondary" id="close-chat">Chiudi</button>
        </form>
    </div>
    
    <!-- Bottone della Chat -->
    <button id="open-chat" class="btn-popup">
        <i class="fas fa-comments"></i>
    </button>
    `);
    
    // Ottieni gli elementi
    const chatPopup = document.getElementById('chat-popup');
    const openChatButton = document.getElementById('open-chat');
    const closeChatButton = document.getElementById('close-chat');
    
    // Mostra il popup della chat
    openChatButton.addEventListener('click', () => {
        chatPopup.style.display = 'block';
        setTimeout(() => {
            chatPopup.classList.add('show');
        }, 10); // Leggero ritardo per assicurarsi che la transizione venga applicata
    });
    
    // Nascondi il popup della chat
    closeChatButton.addEventListener('click', () => {
        chatPopup.classList.remove('show');
        setTimeout(() => {
            chatPopup.style.display = 'none';
        }, 300); // Il timeout dovrebbe corrispondere alla durata della transizione CSS
    });
    
    // Opzionale: Chiudi il popup se l'utente clicca fuori di esso
    window.addEventListener('click', (event) => {
        if (event.target === chatPopup) {
            chatPopup.classList.remove('show');
            setTimeout(() => {
                chatPopup.style.display = 'none';
            }, 300); // Il timeout dovrebbe corrispondere alla durata della transizione CSS
        }
    });

    
    