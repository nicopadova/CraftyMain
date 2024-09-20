const token = localStorage.getItem('authToken');  
const categoriesForEdit =[];
// Carica le categorie dal database
function loadCategories() {
    fetch("http://localhost:8080/category")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableCategories');
            tableBody.innerHTML = '';
            data.forEach(category => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${category.id}</td>
                    <td>${category.nome}</td>
                    <td class="d-flex justify-content-end">
                        <div class="botton me-2 flex-nowrap" role="group">
                            <button type="button" class="btn btn-sm me-2 mb-1" onclick="deleteCategory(${category.id})">Elimina</button>
                            <button type="button" class="btn btn-sm mb-1" onclick="editCategory(${category.id}, '${category.nome}')">Modifica</button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);

            });
        })
        .catch(error => {
            console.error('Errore nel caricamento delle categorie:', error);
            document.getElementById('admin-categories-message').textContent = 'Errore nel caricamento delle categorie.';
        });
}


// Aggiunge una nuova categoria
function addCategory() {
    const newCategory = document.getElementById('nuovaCategoria').value;
    if (newCategory) {
        fetch("http://localhost:8080/category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ nome: newCategory })
        })
        .then(response => response.json())
        .then(data => {
            loadCategories();  // Ricarica la lista delle categorie
            document.getElementById('nuovaCategoria').value = '';  // Pulisce il campo
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalAggiungiCategoria'));
            modal.hide();  // Chiude il modal
        })
        .catch(error => {
            console.error('Errore nell\'aggiunta della categoria:', error);
        });
    } else {
        // alert('Il nome della categoria non può essere vuoto.');
    }
}
function validateAndAddCategory() {
    var nuovaCategoria = document.getElementById('nuovaCategoria');
    var categoryError = document.getElementById('categoryError');
    
    if (nuovaCategoria.value.trim() === "") {
        nuovaCategoria.classList.add("is-invalid");
        categoryError.classList.remove("d-none");
    } else {
        nuovaCategoria.classList.remove("is-invalid");
        categoryError.classList.add("d-none");
        addCategory(); // Chiama la funzione per aggiungere la categoria
    }
}
// Modifica una categoria esistente
function editCategory(id, categoryName) {
    document.getElementById('idCategoria').value = id;
    document.getElementById('nomeCategoria').value = categoryName;
    const modal = new bootstrap.Modal(document.getElementById('modalModificaCategoria'));
    modal.show();
}

function saveCategory() {
    const id = document.getElementById('idCategoria').value;
    const updatedName = document.getElementById('nomeCategoria').value;

    if (updatedName) {
        fetch(`http://localhost:8080/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ nome: updatedName })
        })
        .then(response => response.json())
        .then(data => {
            loadCategories();  // Ricarica la lista delle categorie
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalModificaCategoria'));
            modal.hide();  // Chiude il modal
        })
        .catch(error => {
            console.error('Errore nella modifica della categoria:', error);
        });
    } else {
        alert('Il nome della categoria non può essere vuoto.');
    }
}

// Elimina una categoria
function deleteCategory(id) {
    if (confirm('Sei sicuro di voler eliminare questa categoria?')) {
        fetch(`http://localhost:8080/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then(response => {
            if (response.ok) {
                loadCategories();  // Ricarica la lista delle categorie
            } else {
                console.error('Errore durante l\'eliminazione della categoria');
            }
        })
        .catch(error => {
            console.error('Errore durante l\'eliminazione della categoria:', error);
        });
    }
}
//////////////////prodotti///////////////////////





// Carica i prodotti dal server e li mostra nella tabella
function loadProducts() {
    fetch('http://localhost:8080/product', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('tableProducts');
        tableBody.innerHTML = ''; // Svuota la tabella

        data.forEach(product => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.descrizione}</td>
                <td>${product.nome}</td>
                <td>${product.prezzo}</td>
                <td>${product.qnt}</td>
                <td>${product.category.nome}</td>
                <td>${product.img}</td>
                <td>${product.tag}</td>
                <td>${product.venditore}</td>
                <td> <button type="button" id="btnElimina" class="btn btn-sm me-2 mb-2" onclick="deleteProduct(${product.id})">Elimina</button> </td>
                <td> <button type="button" id="btnModifica" class="btn btn-sm mb-2" data-bs-toggle="modal" data-bs-target="#modalEditProduct"
                        onclick="editProduct(${product.id})">Modifica</button></td>
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Errore durante il caricamento dei prodotti:', error);
    });
    
}
function loadCategoriesForProduct(id){
    fetch("http://localhost:8080/category")
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('editProductCategory');
        tableBody.innerHTML = '';
        data.forEach(category => {
            const categorieForEditProduct= document.createElement("option");
            categorieForEditProduct.innerHTML=category.nome;
            categorieForEditProduct.value=category.id;
            
            tableBody.appendChild(categorieForEditProduct);
            tableBody.value=id;
        });
    })
    .catch(error => {
        console.error('Errore nel caricamento delle categorie:', error);
        document.getElementById('admin-categories-message').textContent = 'Errore nel caricamento delle categorie.';
    });
}
function loadCategoriesForNewProduct(){
    fetch("http://localhost:8080/category")
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('Categoria_id');
        tableBody.innerHTML = '';
        data.forEach(category => {
            const categorieForEditProduct= document.createElement("option");
            categorieForEditProduct.innerHTML=category.nome;
            categorieForEditProduct.value=category.id;
            
            tableBody.appendChild(categorieForEditProduct);
           
        });
    })
    .catch(error => {
        console.error('Errore nel caricamento delle categorie:', error);
        document.getElementById('admin-categories-message').textContent = 'Errore nel caricamento delle categorie.';
    });
}
// Aggiungi un nuovo prodotto
function addProduct() {
    
    const product = {
        nome: document.getElementById('Nome').value,
        descrizione: document.getElementById('Descrizione').value,
        prezzo: document.getElementById('Prezzo').value,
        qnt: document.getElementById('Quantità').value,
        category:{id: document.getElementById('Categoria_id').value},
        img: document.getElementById('photo-url').value,
        tag: document.getElementById('Tag').value,
        venditore: document.getElementById('Venditore').value
    };

    fetch('http://localhost:8080/product', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        loadProducts(); // Ricarica i prodotti dopo l'aggiunta
        clearProductForm(); // Pulisce il modulo di aggiunta
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalAddProduct'));
            modal.hide();
    })
    .catch(error => {
        console.error('Errore durante l\'aggiunta del prodotto:', error);
    });
}

// Modifica un prodotto esistente
function editProduct(id) {
    console.log(id)
    fetch(`http://localhost:8080/product/${id}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(product => {
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductName').value = product.nome;
        document.getElementById('editProductDescr').value = product.descrizione;
        document.getElementById('editProductPrice').value = product.prezzo;
        document.getElementById('editProductQuantity').value = product.qnt;
        loadCategoriesForProduct(product.category.id);
        document.getElementById('editProductImage').value = product.img;
        document.getElementById('editProductTag').value = product.tag;
        document.getElementById('editProductVendor').value = product.venditore;
    })
    .catch(error => {
        console.error('Errore durante il caricamento del prodotto da modificare:', error);
    });
}

// Salva le modifiche al prodotto
function saveProduct() {
    const id = document.getElementById('editProductId').value;

    const product = {
        nome: document.getElementById('editProductName').value,
        descrizione: document.getElementById('editProductDescr').value,
        prezzo: document.getElementById('editProductPrice').value,
        qnt: document.getElementById('editProductQuantity').value,
        category: {id: document.getElementById('editProductCategory').value},
        img: document.getElementById('editProductImage').value,
        tag: document.getElementById('editProductTag').value,
        venditore: document.getElementById('editProductVendor').value
    };

    fetch(`http://localhost:8080/product/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        loadProducts(); // Ricarica i prodotti dopo la modifica
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditProduct'));
            modal.hide();
    })
    .catch(error => {
        console.error('Errore durante il salvataggio delle modifiche:', error);
    });
}

// Elimina un prodotto
function deleteProduct(id) {
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
        fetch(`http://localhost:8080/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then(response => {
            if (response.ok) {
                loadProducts(); // Ricarica i prodotti dopo l'eliminazione
            } else {
                console.error('Errore durante l\'eliminazione del prodotto');
            }
        })
        .catch(error => {
            console.error('Errore durante l\'eliminazione del prodotto:', error);
        });
    }
}

// Funzione per pulire il modulo di aggiunta
function clearProductForm() {
    document.getElementById('Descrizione').value = '';
    document.getElementById('Nome').value = '';
    document.getElementById('Prezzo').value = '';
    document.getElementById('Quantità').value = '';
    document.getElementById('Categoria_id').value = '';
    document.getElementById('photo-url').value = '';
    document.getElementById('Tag').value = '';
    document.getElementById('Venditore').value = '';
}
function validateAndSaveProduct() {
    // Seleziona tutti i campi input e select che devono essere controllati
    var fields = [
        document.getElementById('editProductDescr'),
        document.getElementById('editProductName'),
        document.getElementById('editProductPrice'),
        document.getElementById('editProductQuantity'),
        document.getElementById('editProductCategory'),
        document.getElementById('editProductImage'),
        document.getElementById('editProductTag'),
        document.getElementById('editProductVendor')
    ];

    var formError = document.getElementById('formError');
    var isValid = true;

    // Controlla se tutti i campi sono compilati
    fields.forEach(function(field) {
        if (field.value.trim() === "") {
            isValid = false;
            field.classList.add("is-invalid"); // Aggiungi classe per evidenziare il campo
        } else {
            field.classList.remove("is-invalid"); // Rimuovi classe se il campo è compilato
        }
    });

    if (isValid) {
        formError.classList.add("d-none");
        saveProduct();
    } else {
        formError.classList.remove("d-none");
    }
}
function validateAndAddProduct() {
    // Seleziona tutti i campi input e select che devono essere controllati
    var fields = [
        document.getElementById('Descrizione'),
        document.getElementById('Nome'),
        document.getElementById('Prezzo'),
        document.getElementById('Quantità'),
        document.getElementById('Categoria_id'),
        document.getElementById('photo-url'),
        document.getElementById('Tag'),
        document.getElementById('Venditore')
    ];

    var formAddError = document.getElementById('formAddError');
    var isValid = true;

    // Controlla se tutti i campi sono compilati
    fields.forEach(function(field) {
        if (field.value.trim() === "") {
            isValid = false;
            field.classList.add("is-invalid"); // Aggiungi classe per evidenziare il campo
        } else {
            field.classList.remove("is-invalid"); // Rimuovi classe se il campo è compilato
        }
    });

    if (isValid) {
        formAddError.classList.add("d-none");
        addProduct();
    } else {
        formAddError.classList.remove("d-none");
    }
}


function validateAndAddCategory() {
    var nuovaCategoria = document.getElementById('nuovaCategoria');
    var categoryError = document.getElementById('categoryError');
    
    if (nuovaCategoria.value.trim() === "") {
        nuovaCategoria.classList.add("is-invalid");
        categoryError.classList.remove("d-none");
    } else {
        nuovaCategoria.classList.remove("is-invalid");
        categoryError.classList.add("d-none");
        addCategory(); // Chiama la funzione per aggiungere la categoria
    }
}

//////////////////Ordini///////////////////////

async function loadOrdersForAdmin() {
    const ordersTableBody = document.getElementById('tableOrders');
    const ordersMessage = document.getElementById('orders-message');

    // Array di stati possibili
    const orderStates = ['In lavorazione', 'Spedito', 'Consegnato', 'Annullato'];

    // Controlla che il token esista
    if (typeof token !== 'undefined') {
        try {
            // Attendi la risposta della chiamata fetch
            const response = await fetch('http://localhost:8080/ordine', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });

            if (response.status === 200) {
                // Attendi il parsing della risposta in JSON
                const orders = await response.json();
                if (orders.length > 0) {
                    orders.forEach((order, index) => {
                        const date = new Date(order.data); 
                        console.log(date);

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
                        console.log(formattedDate);
                        console.log(formattedTime);

                        // Creazione dell'elemento select per gli stati
                        const selectState = document.createElement('select');
                        selectState.classList.add('form-select', 'form-select-sm'); // Aggiunta di classi per lo stile

                        // Aggiungi opzioni al select
                        orderStates.forEach(state => {
                            const option = document.createElement('option');
                            option.value = state;
                            option.textContent = state;

                            // Pre-seleziona l'opzione corrispondente allo stato attuale
                            if (state === order.stato) {
                                option.selected = true;
                            }

                            selectState.appendChild(option);
                        });

                        // Aggiungi un event listener per l'aggiornamento dello stato
                        selectState.addEventListener('change', async (event) => {
                            const newState = event.target.value;

                            try {
                                // Invia la richiesta PUT per aggiornare lo stato e mantenere la data dell'ordine
                                const updateResponse = await fetch(`http://localhost:8080/ordine/${order.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Authorization': token,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ 
                                        stato: newState,
                                        data: order.data // Include la stessa data dell'ordine
                                    })
                                });

                                if (updateResponse.ok) {
                                    console.log(`Stato dell'ordine ${order.id} aggiornato a: ${newState}`);
                                } else {
                                    console.error(`Errore nell'aggiornamento dell'ordine ${order.id}`);
                                    alert('Errore durante l\'aggiornamento dello stato dell\'ordine.');
                                }
                            } catch (error) {
                                console.error(`Errore durante l'aggiornamento dello stato dell'ordine ${order.id}:`, error);
                                alert('Errore durante l\'aggiornamento dello stato dell\'ordine.');
                            }
                        });

                        // Creazione della riga della tabella
                        const row = document.createElement('tr');
                        row.innerHTML = `
                          <th scope="row">${order.id}</th>
                          <td>${formattedDate} ${formattedTime}</td>
                          <td>${order.user.id}</td>
                          <td>${order.user.nome} ${order.user.cognome}</td>
                          <td></td>
                          <td>
                              <a class="btn py-1 px-2" id="btnVisualizza-${order.id}" href="PagAmmDettOrdine.html?id=${order.id}" role="button">Visualizza</a>
                          </td>
                        `;

                        // Aggiungi il select per lo stato nella cella corrispondente
                        row.cells[4].appendChild(selectState);

                        // Aggiungi la riga alla tabella
                        ordersTableBody.appendChild(row);
                    });
                } else {
                    ordersMessage.textContent = "Ancora nessun ordine";
                }
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
async function loadOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    
    // Ottieni l'elemento per mostrare il numero dell'ordine
    const orderNumberAdmin = document.getElementById('order-number-admin');
    
    if (!orderId) {
        document.getElementById('tableOrders').innerHTML = 'ID dell\'ordine mancante.';
        return;
    }

    try {
        // Recupera i dettagli dell'ordine
        const response = await fetch(`http://localhost:8080/orderDetails/searchByOrderId?ordine_id=${orderId}`, {
            method: 'GET',
        });
        
        console.log(response.status);

        if (response.status === 200) {
            const orderDetails = await response.json();
            
            // Mostra il numero dell'ordine
            orderNumberAdmin.innerHTML = `Dettagli ordine numero: ${orderId}`;
            
            const tableBody = document.getElementById('tableOrders');
            tableBody.innerHTML = ''; // Pulisce il contenuto esistente della tabella
            
            let totalPrice = 0; // Variabile per accumulare il totale del prezzo
            
            orderDetails.forEach((item) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${item.id}</th>
                    <td>${item.prezzo.toFixed(2)}</td>
                    <td>${item.qnt}</td>
                    <td>${item.product.nome}</td>
                    <td class="d-flex align-items-center">
                        <a class="btn py-1 px-2" id="btnElimina-${item.id}" href="#!" onclick="removeItem(${item.id})" role="button">Elimina</a>
                    </td>
                `;
                tableBody.appendChild(row);
                
                // Aggiungi il prezzo dell'articolo al totale
                totalPrice += item.prezzo * item.qnt;
            });
            
            // Aggiungi il totale al DOM
            document.getElementById('orderTotal').textContent = `Totale: ${totalPrice.toFixed(2)} €`;
        } else {
            document.getElementById('tableOrders').innerHTML = 'Errore nel recupero dei dettagli dell\'ordine.';
        }
    } catch (error) {
        console.error('Errore durante il recupero dei dettagli dell\'ordine:', error);
        document.getElementById('tableOrders').innerHTML = 'Errore durante il recupero dei dettagli dell\'ordine.';
    }
}

// Funzione per eliminare un elemento dal database
function removeItem(id) {
   
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
        fetch(`http://localhost:8080/orderDetails/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then(response => {
            if (response.ok) {
                loadOrderDetails(); // Ricarica gli ordini dopo l'eliminazione
            } else {
                console.error('Errore durante l\'eliminazione del ordine');
            }
        })
        .catch(error => {
            console.error('Errore durante l\'eliminazione del ordine:', error);
        });
    }
    
}

///////////////////recensioni//////////////
function loadReviews() {
    fetch('http://localhost:8080/review', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('tableReview');
        tableBody.innerHTML = ''; // Svuota la tabella

        data.forEach(review => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${review.id}</td>
                <td>${review.punteggio}</td>
                <td>${review.product.nome}</td>
                <td>${review.descrizione}</td>
                <td>${review.user.nome} ${review.user.cognome}</td>
                
                <td> <button type="button" id="btnElimina" class="btn btn-sm me-2 mb-2" onclick="deleteReview(${review.id})">Elimina</button> </td>

            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Errore durante il caricamento delle recensioni:', error);
    });
    
}
function deleteReview(id) {
    if (confirm('Sei sicuro di voler eliminare questa recensione?')) {
        fetch(`http://localhost:8080/review/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then(response => {
            if (response.ok) {
                loadReviews();  // Ricarica la lista delle categorie
            } else {
                console.error('Errore durante l\'eliminazione della recensione');
            }
        })
        .catch(error => {
            console.error('Errore durante l\'eliminazione della recensione:', error);
        });
    }
}