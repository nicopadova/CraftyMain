// Inizializzazione dei tab di Bootstrap
var tabEl = document.querySelectorAll('button[data-bs-toggle="tab"]');
tabEl.forEach(function (tab) {
    tab.addEventListener('shown.bs.tab', function (event) {
        // Logica da eseguire quando il tab viene attivato
        event.target; // nuovo tab attivato
        event.relatedTarget; // tab precedente
    });
});

let userId;
let nomeForEditing;
let cognomeForEditing;
let emailForEditing;
let telefonoForEditing;
let indirizzoForEditing;
let passwordForEdit;
let roleUser;
let carrelloForEditing;
const passwordForm = document.getElementById('passwordForm');
async function getUserDataForEdit() {
    const token = localStorage.getItem('authToken');
    const messageElementProfileMod = document.getElementById('message-profile-modifica');
    const nomeMod = document.getElementById('firstName-edit');
    const cognomeMod = document.getElementById('lastName-edit');
    const emailMod = document.getElementById('email-edit');
    const reEmailMod = document.getElementById('re-email-edit');


    const telefonoMod = document.getElementById('phone-edit');
    const indirizzoMod = document.getElementById('address-edit');

    console.log("MY TOKEN:", token);
    if (token) {
        try {
            const response = await fetch('http://localhost:8080/user/me', {
                method: 'GET',
                headers: {
                    'Authorization': token // Usa "Bearer" se il server lo richiede
                },
                // mode: 'cors' // Cambiato da 'no-cors' a 'cors'
            });

            if (response.status === 200) {
                const data = await response.json();
                userId = data.id;
                nomeForEditing = data.nome;
                cognomeForEditing = data.cognome;
                emailForEditing = data.email;
                telefonoForEditing = data.telefono;
                indirizzoForEditing = data.indirizzo
                passwordForEdit = data.password;
                roleUser = data.role;
                carrelloForEditing = data.carrello;
                nomeMod.value = data.nome;
                cognomeMod.value = data.cognome;
                emailMod.value = data.email;
                reEmailMod.value = data.email;
                telefonoMod.value = data.telefono;
                indirizzoMod.value = data.indirizzo;



            } else {
                messageElementProfileMod.textContent = 'Failed to get user data';
                messageElementProfileMod.style.color = 'red';
            }
        } catch (error) {
            console.error('Error during fetching user data:', error);
            messageElementProfileMod.innerHTML = 'Error during fetching user data';
            messageElementProfileMod.style.color = 'red';
        }
    }
}
console.log(userId)
async function profileEditing(event) {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    const messageElementProfileMod = document.getElementById('message-profile-modifica');
    const nomeMod = document.getElementById('firstName-edit').value;
    const cognomeMod = document.getElementById('lastName-edit').value;
    const emailMod = document.getElementById('email-edit').value;
    const reEmailMod = document.getElementById('re-email-edit').value;
    const telefonoMod = document.getElementById('phone-edit').value;
    const indirizzoMod = document.getElementById('address-edit').value;

    if (emailMod !== reEmailMod) {
        messageElementProfileMod.textContent = 'Le email non corrispondono';
        messageElementProfileMod.style.color = 'red';
        return;
    }

    if (token && userId) { // Verifica che l'ID utente sia disponibile
        try {
            const response = await fetch(`http://localhost:8080/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nomeMod,
                    cognome: cognomeMod,
                    telefono: telefonoMod,
                    email: emailMod,
                    indirizzo: indirizzoMod,
                    password: passwordForEdit,
                    role: roleUser,
                    carrello: carrelloForEditing
                }),
            });
            console.log(response.nome);
            console.log(response.cognome);
            console.log(response.telefono);
            console.log(response.email);
            console.log(response.indirizzo);
            console.log(response.password);
            console.log(response.role);
            console.log(response.carrello);
            console.log(response.status);
            console.log(response.status);
            if (response.status === 200) {
                alert('Profilo aggiornato con successo!');
                window.location.reload();
            } else {
                messageElementProfileMod.textContent = 'Dati non validi';
                messageElementProfileMod.style.color = 'red';
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del profilo:', error);
            messageElementProfileMod.textContent = 'Errore durante l\'aggiornamento del profilo';
            messageElementProfileMod.style.color = 'red';
        }
    }
}
passwordForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const passwordError = document.getElementById('passwordError');

    // Resetta il messaggio di errore
    passwordError.textContent = '';
    passwordError.style.color = '';

    // Controllo se la nuova password e la conferma coincidono
    if (newPassword !== confirmPassword) {
        passwordError.textContent = 'Le nuove password non coincidono';
        passwordError.style.color = 'red';
        return;
    }

    // Controllo la lunghezza della nuova password
    if (newPassword.length < 6) {
        passwordError.textContent = 'La nuova password è troppo corta';
        passwordError.style.color = 'red';
        return;
    }

    // Controllo se la password corrente è corretta (confronta con quella salvata)
    if (currentPassword !== passwordForEdit) {
        passwordError.textContent = 'La password attuale non è corretta';
        passwordError.style.color = 'red';
        return;
    }

    if (token && userId) {
        try {
            const response = await fetch(`http://localhost:8080/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nomeForEditing,
                    cognome: cognomeForEditing,
                    telefono: telefonoForEditing,
                    email: emailForEditing,
                    indirizzo: indirizzoForEditing,
                    password: newPassword,
                    role: roleUser,
                    carrello: carrelloForEditing
                }),
            });

            if (response.status === 200) {
                alert('Password cambiata con successo!');
                document.getElementById('passwordForm').reset();
            } else {
                passwordError.textContent = 'Dati non validi';
                passwordError.style.color = 'red';
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento della password:', error);
            passwordError.textContent = 'Errore durante l\'aggiornamento della password';
            passwordError.style.color = 'red';
        }
    }
});
// Funzione per ottenere gli ordini dell'utente e popolare la tabella
let ordersLoaded = false; // Variabile di controllo per verificare se gli ordini sono stati già caricati

async function getOrders() {
    const token = localStorage.getItem('authToken');
    const ordersTableBody = document.getElementById('orders-tbody');
    const ordersMessage = document.getElementById('orders-message');

    if (ordersLoaded) {
        return; // Se gli ordini sono già stati caricati, esce dalla funzione
    }

    if (token) {
        try {
            const response = await fetch(`http://localhost:8080/ordine/searchByUserId?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });

            if (response.status === 200) {
                const orders = await response.json();
                if (orders.length > 0) {
                    orders.forEach((order, index) => {
                        const date = new Date(order.data);

                        // Formattazione della data e dell'ora
                        const formattedDate = date.toLocaleDateString('it-IT', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        const formattedTime = date.toLocaleTimeString('it-IT', {
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        let statoOrdine;
                        if(order.stato==="In lavorazione"){
                            statoOrdine=`<span class="badge text-bg-primary">${order.stato}</span>`
                        }else if(order.stato==="Spedito"){
                            statoOrdine=`<span class="badge text-bg-info">${order.stato}</span>`
                        }else if(order.stato==="Consegnato"){
                            statoOrdine=`<span class="badge text-bg-success">${order.stato}</span>`
                        }else if(order.stato==="Annullato"){
                            statoOrdine=`<span class="badge text-bg-danger">${order.stato}</span>`
                        }
                        
                        // Creazione della riga della tabella
                        const row = document.createElement('tr');
                        row.innerHTML = `
                      <th scope="row">${index + 1}</th>
                      <td>${formattedDate} ${formattedTime}</td>
                      <td>${statoOrdine}</span></td>
                      <td>
                          <a class="btn profile-btn-primary btn-sm" href="Ordine.html?id=${order.id}">Visualizza</a>
                      </td>
                  `;
                        ordersTableBody.appendChild(row);
                    });
                } else {
                    ordersMessage.textContent = "Ancora nessun ordine";
                }
                ordersLoaded = true; // Imposta a true per evitare di ricaricare gli ordini
            } else {
                ordersMessage.textContent = 'Errore durante il recupero degli ordini';
                ordersMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Errore durante il recupero degli ordini:', error);
            ordersMessage.textContent = 'Errore durante il recupero degli ordini';
            ordersMessage.style.color = 'red';
        }
    }
}


async function viewOrderDetails(orderId) {
    const token = localStorage.getItem('authToken');
    const orderDetailsBody = document.getElementById('order-details-body');
    let totalPrice = 0
    if (token) {
        try {
            const response = await fetch(`http://localhost:8080/orderDetails/searchByOrderId?ordine_id=${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });

            if (response.status === 200) {
                const orderDetails = await response.json();
                orderDetailsBody.innerHTML = ''; // Svuota il contenuto precedente

                if (orderDetails.length > 0) {
                    orderDetails.forEach(detail => {
                        totalPrice += (detail.prezzo * detail.qnt);
                        console.log(totalPrice)
                        const detailElement = document.createElement('div');
                        detailElement.innerHTML = `
                      <p>Prodotto: ${detail.product.nome}</p>
                      <p>Quantità: ${detail.qnt}</p>
                      <p>Prezzo unità: €${detail.prezzo.toFixed(2)}</p>
                      <hr>
                  `;
                        orderDetailsBody.appendChild(detailElement);
                    });
                    const totalElement = document.createElement('div');
                    totalElement.innerHTML = `<p><strong>Totale: €${totalPrice.toFixed(2)}</strong></p>`;
                    orderDetailsBody.appendChild(totalElement);
                    console.log(totalPrice)
                } else {
                    orderDetailsBody.innerHTML = 'Nessun dettaglio trovato per questo ordine';
                }

                // Mostra il modal
                const orderDetailsModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
                orderDetailsModal.show();
            } else {
                orderDetailsBody.innerHTML = 'Errore durante il recupero dei dettagli dell\'ordine';
                orderDetailsBody.style.color = 'red';
            }
        } catch (error) {
            console.error('Errore durante il recupero dei dettagli dell\'ordine:', error);
            orderDetailsBody.innerHTML = 'Errore durante il recupero dei dettagli dell\'ordine';
            orderDetailsBody.style.color = 'red';
        }
    }
}