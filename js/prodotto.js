const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const price = document.getElementById('price')
const title = document.getElementById('title')
const nome = document.getElementById('name')
const recensioni = document.getElementById('reviews')
const description = document.getElementById('description')
const reviewList = document.getElementById('reviewList')
const rating = document.getElementById('rating')
const shipping = document.getElementById('shipping')
const seller = document.getElementById('seller')
const img1 = document.getElementById('img1')
const img2 = document.getElementById('img2')
const img3 = document.getElementById('img3')
const img4 = document.getElementById('img4')
const imgc1 = document.getElementById('imgc1')
const imgc2 = document.getElementById('imgc2')
const imgc3 = document.getElementById('imgc3')
const imgc4 = document.getElementById('imgc4')
const tags = document.getElementById('tags')
const date = new Date();
let day = date.getDate()
const months = ["gen", "feb", "mar", "apri", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
let month = months[date.getMonth()]
let nReview = 0;
let punteggio = 0;
let nomeUtente;
let cognomeUtente;
let telefonoUtente;
let emailUtente;
let indirizzoUtente;
let passwordUtente;
let roleUtente;
let idUtente;
let booleanCarrello = false
let carrelloArray
let newCarrello
let idTrovato
let indexTrovato
let newQnt = 0
let score

async function getCarrello() {
    const token = localStorage.getItem('authToken');

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
                let carrellostring = data.carrello
                nomeUtente = data.nome
                cognomeUtente = data.cognome
                telefonoUtente = data.telefono
                emailUtente = data.email
                indirizzoUtente = data.indirizzo
                passwordUtente = data.password
                roleUtente = data.role
                idUtente = data.id
                console.log('idutente' + idUtente)

                carrelloArray = carrellostring.split(',')
                console.log(carrelloArray)
                for (let i = 0; i < carrelloArray.length; i++) {
                    let prodottoarray = carrelloArray[i].split(':')
                    console.log(prodottoarray)
                    let carrelloId = prodottoarray[0]
                    console.log(carrelloId)
                    let carrelloQnt = prodottoarray[1]
                    console.log(carrelloQnt)
                    console.log('booleana' + booleanCarrello)
                    if (carrelloId == id) {
                        booleanCarrello = true
                        idTrovato = carrelloId
                        indexTrovato = i
                        newQnt = +carrelloQnt + 1
                    }
                }

            }
        } catch (error) {
            console.error('Error during fetching user data:', error);

        }

    } else {
        const div = document.createElement('div')
        div.classList = 'text-danger'
        div.innerHTML = `<h3>Accedi per visualizzare il carrello</h3>`
        listaCarrello.appendChild(div)
    }

}


function loadProd(id) {
    const url = `http://localhost:8080/product/${id}`
    fetch(url)
        .then(res => res.json())
        .then(prod => {
            console.log(prod)
            console.log(date)
            title.innerHTML = prod.nome
            nome.innerHTML = prod.nome
            price.innerHTML = `${parseFloat(prod.prezzo).toFixed(2)} €`
            description.innerHTML = prod.descrizione + `<br><br><strong> Categoria : </strong>` + prod.category.nome
            shipping.innerHTML = `Ordina oggi per riceverlo entro il giorno <strong>${day + 2}-${day + 7}  ${month} </strong>`
            const imgString = prod.img
            imgArray = imgString.split(",")
            console.log(imgArray)
            img1.src = `assets\\img\\products\\${imgArray[0]}`
            imgc1.src = `assets\\img\\products\\${imgArray[0]}`
            img2.src = `assets\\img\\products\\${imgArray[1].trim()}`
            imgc2.src = `assets\\img\\products\\${imgArray[1].trim()}`
            img3.src = `assets\\img\\products\\${imgArray[2].trim()}`
            imgc3.src = `assets\\img\\products\\${imgArray[2].trim()}`
            img4.src = `assets\\img\\products\\${imgArray[3].trim()}`
            imgc4.src = `assets\\img\\products\\${imgArray[3].trim()}`

            const sellerString = prod.venditore
            sellerArray = sellerString.split('£')
            seller.innerHTML = `<h5>${sellerArray[0]}</h5><br>${sellerArray[1]}`

            const tagString = prod.tag
            tagArray = tagString.split(',')
            console.log(tagArray)
            for (let i = 0; i < tagArray.length; i++) {
                const link = document.createElement('a')
                link.classList = "fw-semibold"
                if (i < tagArray.length - 1) {
                    link.innerHTML = tagArray[i] + ','
                } else {
                    link.innerHTML = tagArray[i]
                }
                link.href = `Catalogo.html?search=${tagArray[i].trim()}`
                tags.appendChild(link)
            }
        })
}

function loadReviews(id) {
    const url = `http://localhost:8080/review`
    fetch(url)
        .then(res => res.json())
        .then(reviews => {
            reviews.forEach(review => {

                if (review.product.id == id) {
                    console.log(`AAA`)
                    nReview++
                    console.log(nReview)
                    punteggio = (punteggio + review.punteggio)
                    const li = document.createElement('li')
                    li.classList = "list-group-item recensione"
                    for (let i = 0; i < review.punteggio; i++) {
                        const star2 = document.createElement('i')
                        star2.classList = "fa-solid fa-star"
                        li.appendChild(star2)
                    }
                    const descrizione = document.createElement('p')
                    descrizione.classList = "h6"
                    descrizione.innerHTML = review.descrizione
                    li.appendChild(descrizione)


                    const utente = document.createElement('p')
                    utente.innerHTML = review.user.nome + ` ` + review.user.cognome
                    utente.classList = "text-end"
                    li.appendChild(utente)
                    reviewList.appendChild(li)
                }

            })
            recensioni.innerHTML = `<strong> ${nReview} Recensioni`
            punteggio = punteggio / nReview
            punteggio = Math.round(punteggio)
            for (let i = 0; i < punteggio; i++) {
                const star = document.createElement('i')
                star.classList = "fa-solid fa-star"
                rating.appendChild(star)
            }

        })
}

document.addEventListener('DOMContentLoaded', function () {
    var myCarousel = document.querySelector('#carouselExampleSlidesOnly');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: false, // Stops the autoplay
        ride: false // Ensures the carousel does not automatically cycle
    });

    // Function to change the carousel slidehttps://placehold.co/1600x1600/orange/white
    function changeSlide(index) {
        var bootstrapCarousel = bootstrap.Carousel.getInstance(myCarousel);
        bootstrapCarousel.to(index);
    }

    // Add event listeners to the images
    document.querySelector('#img1').addEventListener('click', function () {
        changeSlide(0);
    });

    document.querySelector('#img2').addEventListener('click', function () {
        changeSlide(1);
    });

    document.querySelector('#img3').addEventListener('click', function () {
        changeSlide(2);
    });

    document.querySelector('#img4').addEventListener('click', function () {
        changeSlide(3);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var carouselInner = document.querySelector('.carousel-inner');
    var isDragging = false;
    var startX;
    var scrollLeft; https://placehold.co/1600x1600/orange/white

    function startDragging(e) {
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX - carouselInner.offsetLeft; // For touch devices
        scrollLeft = carouselInner.scrollLeft;
    }

    function stopDragging() {
        isDragging = false;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX - carouselInner.offsetLeft; // For touch devices
        const walk = (x - startX) * 3; // scroll-fast
        carouselInner.scrollLeft = scrollLeft - walk;
    }

    carouselInner.addEventListener('mousedown', startDragging);
    carouselInner.addEventListener('mouseleave', stopDragging);
    carouselInner.addEventListener('mouseup', stopDragging);
    carouselInner.addEventListener('mousemove', drag);

    // Touch events
    carouselInner.addEventListener('touchstart', startDragging);
    carouselInner.addEventListener('touchend', stopDragging);
    carouselInner.addEventListener('touchmove', drag);
});

function addProduct() {
    console.log('booleana ' + booleanCarrello)
    console.log('idTrovato ' + idTrovato)
    console.log('index ' + indexTrovato)
    console.log('newQNt ' + newQnt)

    if (booleanCarrello == true) {
        carrelloArray[indexTrovato] = `${idTrovato}:${newQnt}`
    }else if(carrelloArray==null){
        carrelloArray=[`${id}:1`]
    }
     else {
        carrelloArray.push(`${id}:1`)
    }
    newCarrello = carrelloArray.toString()
    console.log(newCarrello)

    const token = localStorage.getItem('authToken');
    console.log("MY TOKEN:", token);
    if (token && idUtente) { // Verifica che l'ID utente sia disponibile
        try {
            const response = fetch(`http://localhost:8080/user/${idUtente}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nomeUtente,
                    cognome: cognomeUtente,
                    telefono: telefonoUtente,
                    email: emailUtente,
                    indirizzo: indirizzoUtente,
                    password: passwordUtente,
                    role: roleUtente,
                    carrello: newCarrello
                }),
            });
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del profilo:', error);
        }

    }
    location.assign("Carrello.html");
}

function punteggioReview(n) {
    score = n
}

function addReview() {
    const descrizione = document.getElementById('panelsStayOpen-collapseRev').value
    console.log(descrizione)
    console.log(score)

    if (score && descrizione) {
        const token = localStorage.getItem('authToken');
        console.log("MY TOKEN:", token);
        if (token && idUtente) { // Verifica che l'ID utente sia disponibile
            try {
                const response = fetch(`http://localhost:8080/review/${idUtente}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        descrizione: descrizione,
                        punteggio: score,
                        product: {id: id},
                        user: {id :idUtente},
                    }),
                });
            } catch (error) {
                console.error('Errore durante l\'inserimento recensione', error);
            }

        }
        location.assign(`Prodotto.html?id=${id}`)
    } else {
        alert("Inserire un punteggio e una descrizione validi");
    }
}

