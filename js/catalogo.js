const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category')
const search = urlParams.get('search')
const listaProd = document.getElementById('listaProd')
const listaCat = document.getElementById('listaCat')
const filterCategories = [];
let filterScore=0
let filterPrice1=0
let filterPrice2=99999

function loadCategories() {
    const url = `http://localhost:8080/category`
    fetch(url)
        .then(res => res.json())
        .then(categories => {
            categories.forEach(category => {
                const label = document.createElement('label')
                label.classList = "cr-wrapper"
                label.innerHTML = `
                 <input type="checkbox"/>
                            <div class="cr-input" onclick="selectCategory(${category.id})"></div>
                            <span onclick="selectCategory(${category.id})">${category.nome}</span>
                `
                listaCat.appendChild(label)
            })
        })
}

async function loadProd() {
    if (search) {
        const url = `http://localhost:8080/product/searchProducts?searchTerm=${search}`
        try {
            const res = await fetch(url)
            const prods = await res.json()

            for (const prod of prods) {
                const rating = await loadReviews(prod.id)
                const imgString = prod.img
                const imgArray = imgString.split(",")
                const div = document.createElement('div')
                div.classList.add("col-12", "col-sm-4", "col-md-3")
                div.innerHTML = `
                    <div class="card rounded">
                        <img src="assets/img/products/${imgArray[0]}" class="card-img-top rounded " alt="...">
                        <div class="card-body">
                            <a class="stretched-link text-decoration-none" href="Prodotto.html?id=${prod.id}">
                                <h5 class="card-title">${prod.nome}</h5>
                            </a>
                            <p class="card-text">${rating} <i class="fa-solid fa-star" aria-hidden="true"></i></p>
                            <h6 class="card-text">${parseFloat(prod.prezzo).toFixed(2)} €</h6>
                        </div>
                    </div>
                `
                listaProd.appendChild(div)
            }
        } catch (error) {
            console.error('Failed to load products:', error)
        }


    }

    else if (category) {
        const url = `http://localhost:8080/product`
        try {
            const res = await fetch(url)
            const prods = await res.json()

            for (const prod of prods) {
                if (prod.category.id == category) {
                    const rating = await loadReviews(prod.id)
                    const imgString = prod.img
                    const imgArray = imgString.split(",")
                    const div = document.createElement('div')
                    div.classList.add("col-12", "col-sm-4", "col-md-3")
                    div.innerHTML = `
                    <div class="card rounded">
                        <img src="assets/img/products/${imgArray[0]}" class="card-img-top rounded " alt="...">
                        <div class="card-body">
                            <a class="stretched-link text-decoration-none" href="Prodotto.html?id=${prod.id}">
                                <h5 class="card-title">${prod.nome}</h5>
                            </a>
                            <p class="card-text">${rating} <i class="fa-solid fa-star" aria-hidden="true"></i></p>
                            <h6 class="card-text">${parseFloat(prod.prezzo).toFixed(2)} €</h6>
                        </div>
                    </div>
                `
                    listaProd.appendChild(div)
                }
            }
        } catch (error) {
            console.error('Failed to load products:', error)
        }
    }

    else {
        const url = `http://localhost:8080/product`
        try {
            const res = await fetch(url)
            const prods = await res.json()

            for (const prod of prods) {
                const rating = await loadReviews(prod.id)
                const imgString = prod.img
                const imgArray = imgString.split(",")
                const div = document.createElement('div')
                div.classList.add("col-12", "col-sm-4", "col-md-3")
                div.innerHTML = `
                    <div class="card rounded">
                        <img src="assets/img/products/${imgArray[0]}" class="card-img-top rounded " alt="...">
                        <div class="card-body">
                            <a class="stretched-link text-decoration-none" href="Prodotto.html?id=${prod.id}">
                                <h5 class="card-title">${prod.nome}</h5>
                            </a>
                            <p class="card-text">${rating} <i class="fa-solid fa-star" aria-hidden="true"></i></p>
                            <h6 class="card-text">${parseFloat(prod.prezzo).toFixed(2)} €</h6>
                        </div>
                    </div>
                `
                listaProd.appendChild(div)
            }
        } catch (error) {
            console.error('Failed to load products:', error)
        }
    }

}

async function loadReviews(id) {
    let nReview = 0
    let punteggio = 0
    const url = `http://localhost:8080/review/searchByProductId?product_id=${id}`

    try {
        const res = await fetch(url)
        const reviews = await res.json()

        for (const review of reviews) {
            punteggio += review.punteggio
            nReview++
        }

        const rating = nReview === 0 ? 0 : Math.round(punteggio / nReview)

        return rating
    } catch (error) {
        console.error('Failed to load reviews:', error)
        return 0
    }
}

async function filterProd() {
    listaProd.innerHTML=''
    console.log(' filtro'+filterScore)
    console.log('prezzo1'+filterPrice1+ 'prezzo2'+filterPrice2)
    const url = `http://localhost:8080/product`
    try {
        const res = await fetch(url)
        const prods = await res.json()

        for (const prod of prods) {
            let booleanCategory = true
            let booleanScore = true
            let booleanPrice = true
            const rating = await loadReviews(prod.id)
            const imgString = prod.img
            const imgArray = imgString.split(",")
            const div = document.createElement('div')
            div.classList.add("col-12", "col-sm-4", "col-md-3")
            div.innerHTML = `
                <div class="card rounded">
                    <img src="assets/img/products/${imgArray[0]}" class="card-img-top rounded " alt="...">
                    <div class="card-body">
                        <a class="stretched-link text-decoration-none" href="Prodotto.html?id=${prod.id}">
                            <h5 class="card-title">${prod.nome}</h5>
                        </a>
                        <p class="card-text">${rating} <i class="fa-solid fa-star" aria-hidden="true"></i></p>
                        <h6 class="card-text">${parseFloat(prod.prezzo).toFixed(2)} €</h6>
                    </div>
                </div>
            `

            if (filterCategories.length > 0) {
                if (filterCategories.includes(prod.category.id)) {
                    console.log('Categoria OK')
                } else {
                    booleanCategory = false
                }
            }

            if(filterScore<=rating){
                console.log('Punteggio OK')
            }else{
                booleanScore = false
            }

            if(prod.prezzo >= filterPrice1 && prod.prezzo<filterPrice2){
                console.log('Prezzo OK')
            }else{
                booleanPrice = false
            }

            if (booleanCategory == true && booleanScore == true && booleanPrice == true){
                listaProd.appendChild(div)
            }

        }
    } catch (error) {
        console.error('Failed to load products:', error)
    }
}


function selectCategory(id) {
    if (filterCategories.includes(id)) {
        const index = filterCategories.indexOf(id);
        if (index > -1) {
            filterCategories.splice(index, 1); // Removes 1 element at the specified index
        }
    } else {
        filterCategories.push(id)
    }
}

function selectScore(n) {
    filterScore=n
}

function selectPrice(n1,n2) {
    filterPrice1=n1
    filterPrice2=n2
}

function hideSidebar(){
    document.getElementById('sidebar').classList.toggle('hide')
}