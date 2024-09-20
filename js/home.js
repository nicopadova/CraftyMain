document.addEventListener('DOMContentLoaded', () => {
    const idSales = [22, 4, 17];
    const idNew = [27, 28, 29];
    const idTop = [10, 4, 15];
    const topSellers = document.getElementById('topSellersTab');
    let cardTopSellers = ``;
    fetch('http://localhost:8080/product')
        .then(res => res.json())
        .then(json => {
            const articoli = json;
            console.log(articoli)
            for (let i = 0; i < json.length; i++) {
                let product = json[i];
                const img = product.img.split(', ');
                if (idSales.includes(product.id)) {
                    cardTopSellers += ` <div class="col-6 col-md-4 col-lg-3 mb-3">
                        <!-- Card -->
                        <div class="card mb-7">
                            <!-- Badge -->
                            <div class="badge card-badge card-badge-start text-uppercase saldi">
                                Sale
                            </div>
                            <!-- Image -->
                            <div class="card-img">
                                <!-- Image -->
                                <a class="card-img-hover"
                                    href=""><!-- Mettere Link alla pagina della categoria-->
                                    <img class="card-img-top card-img-back"
                                        src="assets/img/products/${img[0]}"
                                        alt="...">
                                </a>
                            </div>
                            <!-- Body -->
                            <div class="card-body px-1 carteProdotto">
                                <!-- Category -->
                                <div class="fs-xs">
                                    <a class="text-muted linkTesto"
                                        href="">${product.category.nome}</a><!-- Mettere Link alla pagina della categoria-->
                                </div>
                                <!-- Title -->
                                <div class="fw-bold">
                                    <a class="text-body linkTesto stretched-link"
                                        href="Prodotto.html?id=${product.id}"><!-- Mettere Link alla pagina della categoria-->
                                        ${product.nome}
                                    </a>
                                </div>
                                <!-- Price -->
                                <div class="fw-bold linkTesto">
                                    <span class="fs-xs text-gray-350 text-decoration-line-through">€${(product.prezzo * (1 + 0.20)).toFixed(2)}</span>
                                    <span class="prezzoScontato">€${(product.prezzo).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
                } else if (idNew.includes(product.id)) {
                    cardTopSellers += ` <div class="col-6 col-md-4 col-lg-3 mb-3">
                        <!-- Card -->
                        <div class="card mb-7">
                            <!-- Badge -->
                            <div class="badge text-body card-badge card-badge-start text-uppercase prodNuovo">
                                New
                            </div>
                            <!-- Image -->
                            <div class="card-img">
                                <!-- Image -->
                                <a class="card-img-hover"
                                    href=""><!-- Mettere Link alla pagina della categoria-->
                                    <img class="card-img-top card-img-back"
                                        src="assets/img/products/${img[0]}"
                                        alt="..."><!-- Mettere Link alla pagina della categoria-->
                                </a>
                            </div>
                            <!-- Body -->
                            <div class="card-body px-1 carteProdotto">
                                <!-- Category -->
                                <div class="fs-xs">
                                    <a class="text-muted linkTesto "
                                        href="">${product.category.nome}</a><!-- Mettere Link alla pagina della categoria-->
                                </div>
                                <!-- Title -->
                                <div class="fw-bold">
                                    <a class="text-body linkTesto stretched-link"
                                        href="Prodotto.html?id=${product.id}"><!-- Mettere Link alla pagina della categoria-->
                                        ${product.nome}
                                    </a>
                                </div>
                                <!-- Price -->
                                <div class="fw-bold text-muted linkTesto">
                                   € ${product.prezzo}
                                </div>
                            </div>
                        </div>
                    </div>`;
                } else if (idTop.includes(product.id)) {
                    cardTopSellers += `<div class="col-6 col-md-4 col-lg-3 py-3 mb-3">
                        <!-- Card -->
                        <div class="card mb-7">
                            <!-- Image -->
                            <div class="card-img">
                                <!-- Image -->
                                <a href="#!">
                                    <img class="card-img-top card-img-front"
                                        src="assets/img/products/${img[0]}"
                                        alt="...">
                                </a>
                            </div>
                            <!-- Body -->
                            <div class="card-body px-1 carteProdotto">
                                <!-- Category -->
                                <div class="fs-xs">
                                    <a class="text-muted linkTesto"
                                        href="">${product.category.nome}</a><!-- Mettere Link alla pagina della categoria-->
                                </div>
                                <!-- Title -->
                                <div class="fw-bold ">
                                    <a class="text-body linkTesto stretched-link"
                                        href="Prodotto.html?id=${product.id}"><!-- Mettere Link alla pagina della categoria-->
                                        ${product.nome}
                                    </a>
                                </div>
                                <!-- Price -->
                                <div class="fw-bold text-muted linkTesto">
                                    €${(product.prezzo).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>`;
                };
            }
            topSellers.innerHTML = cardTopSellers;
        })
        .catch(err => {
            console.error('Errore durante il fetch delle categorie:', err);
        });

    const cardT = document.getElementById('last-reviews');
    let cardReview = ``;
    const reviewsPerPage = 2;

    fetch('http://localhost:8080/review')
        .then(res => res.json())
        .then(json => {
            // Assicurati che gestiamo il caso in cui ci sono meno di 6 recensioni
            const start = Math.max(0, json.length - 15);
            const reviews = json.slice(start); // Prendi le ultime 6 recensioni

            let pageIndex = 0;
            while (pageIndex < reviews.length) {
                const reviewsPage = reviews.slice(pageIndex, pageIndex + reviewsPerPage);
                cardReview += `<div class="carousel-item${pageIndex === 0 ? ' active' : ''}">
            <div class="row row-cols-1 row-cols-sm-2 justify-content-center p-5">
                ${reviewsPage.map(review => {
                    const reviewRate = review.punteggio;
                    let starsRate = ``;

                    // Genera l'HTML per la valutazione con stelle
                    for (let j = 1; j <= 5; j++) {
                        if (j <= reviewRate) {
                            starsRate += `
                                <i class="fa-solid fa-star fa-xs" style="color: #5E7C50;"></i>`;
                        } else {
                            starsRate += `
                             <i class="fa-regular fa-star fa-xs" style="color: #5E7C50;"></i>`;
                        }
                    }

                    return `<div class="col-8">
                    <div class="card mb-3" style="max-width: 580px;  min-width: 210px;">
                        <div class="row rigaInside">
                            <div class="row">
                                <div class="col-6 col-md-4 col-lg-4">
                                    <img src="assets/img/products/${review.product.img.split(', ')[0]}" class=" rounded m-3 img-recensioni">
                                </div>
                                <div class="col-10 col-md-9 m-4">
                                    <div class="col  text-start testo-nome-ogg">
                                        <h5 class="">${review.product.nome}</h5>
                                    </div>
                                    <div class="col-12 stars"> 
                                    ${starsRate}
                                    </div>
                                </div>
                            </div>
                            <div class="col-11 col-md-11 col-lg-11 ms-3 text-start mb-3">
                                <p class="card-text"> ${review.descrizione}</p>
                            </div>
                            <div class="col-11 col-md-11 col-lg-11 ms-3 text-start mb-3 testo-nome">
                                <p class="card-text-name"> ${review.user.nome}  ${review.user.cognome}</p>
                            </div>
                        </div>
                    </div>
                </div>`

                }).join('')}
            </div>
        </div>`;
                pageIndex += reviewsPerPage;
            }
            cardT.innerHTML = cardReview;
        })
        .catch(err => {
            console.error('Errore durante il fetch delle recensioni:', err);
        });
});


//funzione timer

// Set the date we're counting down to
var countDownDate = new Date("Sep 21, 2024 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById('days').innerHTML = days
    document.getElementById('hours').innerHTML = hours
    document.getElementById('minutes').innerHTML = minutes
    document.getElementById('seconds').innerHTML = seconds

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);