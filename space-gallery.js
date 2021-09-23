window.onbeforeunload = function() { 
    window.setTimeout(function () { 
        window.location = 'index.html';
    }, 0); 
    window.onbeforeunload = null;
}

let f = document.getElementById("form")
let x = document.getElementById("search")
let s2 = document.getElementById("search-results")
let cards = document.getElementById("section2")
let s3= document.getElementById("allImages")
let tiles = document.getElementById("section3")
let nav = document.getElementById("navigation-links")

//search-results

var n = 1;

f.addEventListener("submit", (e)=> {
    e.preventDefault()
    n = 1;
    fetch_data(x.value, n)
})


function remove_contents() {
    var navrow = document.querySelectorAll("navigation-links");
    var titleRow = document.querySelectorAll("all-images");
    var row = document.querySelectorAll("#search-results-number");

    var con1 = document.querySelectorAll("text-center.row.col");
    var con2 = document.querySelectorAll(".container-fluid.text-center.row.col");

    if(navrow != null) {
        nav.innerHTML = "";
    }
    if(titleRow != null) {
        document.getElementById("all-images").innerHTML = "";
    }
    if(row != null) {
        document.getElementById("bottom-line").innerHTML = "";
    }  

    if(con1 != null) {
        cards.innerHTML = "";
    }
    
    if(con2 != null) {
        tiles.innerHTML = "";
    }  
}

function nextPage() { 
    n++;
    fetch_data(x.value, n); 
}

function prevPage() {
    n--;
    fetch_data(x.value, n); 
}

async function fetch_data (y, n) {
    remove_contents(); 
    const response = await fetch(`https://images-api.nasa.gov/search?q=${y}&media_type=image&page=${n}`)
    const data = await response.json()
    const item = data.collection.items

    document.getElementById("bottom-line").innerHTML = `
        <div class="row" id="search-results-number">
            <p style="color: white;">Search results for "${x.value}" (${item.length}): </p>
        </div>
    `

    let i = 0
    while (i < item.length){

        globalThis.title = item[i].data[0].title

        let update = `

        <div class="col" id="colCard">
        <div class="card mt-4 mb-4" style="width: 18rem;" style="color: black" onclick="return showDetails('${item[i].data[0].title}')">
        <img src="${item[i].links[0].href}" class="card-img-top" id="card-img">
        <div class="card-body text-center" style="color: black" id="card-body">
        <p class="card-title text-truncate" id="card-title">${item[i].data[0].title}</p>
        </div>
        </div>
        </div>
        
        `

        cards.insertAdjacentHTML("beforeend", update)
        i++;

   }

   if (item.length != 0) {

   nav.innerHTML = `
    <div class="col">
        <a href="#allImages" id="next" onclick="return nextPage()">Next</a>
    </div>
   `
   }
   else {
       cards.innerHTML = `
       <p id="text">No results found.</p>
       `
   }
   if (n > 1) {
    let update = `
    <div class="col">
        <a href="#allImages" id="prev" onclick="return prevPage()">Previous</a>
    </div>
   `
    if (document.getElementById('prev') == null) {
        nav.insertAdjacentHTML("afterbegin", update)
    }
    }


   location.href = "#search-results"

   return n;
    
}

//allImages

var o = 1;

function next_page() { 
    o++;
    allImages(o); 
}

function prev_page() {
    o--;
    allImages(o);
}

async function allImages (o) {
    remove_contents(); 
    const response = await fetch(`https://images-api.nasa.gov/search?media_type=image&page=${o}`)
    const data = await response.json()
    const item = data.collection.items

    document.getElementById("all-images").innerHTML = `<h3>All Images from NASA Archive</h3>`

    let i = 0
    while (i < item.length){

        let update = `

        <div class="col" id="colCard">
        <div class="card mt-2 mb-2 text-center" style="color: black; width: 9rem;" onclick="return showDetails('${item[i].data[0].title}')">
        <img src="${item[i].links[0].href}" class="card-img-top" id="card-img-2">
        <div class="card-body text-center" style="color: black" id="card-body-2">
        <p class="card-title text-truncate" id="card-title-2" >${item[i].data[0].title}</p>
        </div>
        </div>
        </div>
        
        `

        tiles.insertAdjacentHTML("beforeend", update)
        i++;

   }
 
   if(item.length != 0) {
   nav.innerHTML = `
    <div class="col">
        <a href="#allImages" id="next" onclick="return next_page()">Next</a>
    </div>
   `
    }

   if (o > 1) {
    let update = `
    <div class="col">
        <a href="#allImages" id="prev" onclick="return prev_page()">Previous</a>
    </div>
   `
    if (document.getElementById('prev') == null) {
        nav.insertAdjacentHTML("afterbegin", update)
    }
    }


   s3.scrollIntoView();

   return o;

}

async function showDetails (title) {
    
    const response = await fetch(`https://images-api.nasa.gov/search?title=${title}`)
    const data = await response.json()
    const item = data.collection.items

    document.getElementById("modal").innerHTML = `
    <div class="modal-dialog  modal-dialog-scrollable" id="showDetails">

            <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title w-100 text-center"  style="color: black">
              <i class="bi bi-moon-stars float-start ms-4">
              </i><i class="bi bi-moon-stars float-end me-4"></i>
              ${item[0].data[0].title}
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="popUp-modal">
                <div class="card mt-2" style="width: 18rem;" style="color: black">
            <img src="${item[0].links[0].href}" class="card-img-top" id="card-img">
            <div class="card-body text-center" style="color: black; height:auto">
            <p>${item[0].data[0].description}</p>   
            <ul class="list-group list-group-flush" >
                <li class="list-group-item">Center: ${item[0].data[0].center}</li>
                <li class="list-group-item">NASA ID: ${item[0].data[0].nasa_id}</li>
                <li class="list-group-item">${item[0].data[0].date_created}</li>
            </ul>
            </div>
            </div>
            </div>
            
          </div>
            
        </div>
    `

    var thisModal = new bootstrap.Modal(document.getElementById('modal'))
    thisModal.show();

}











