let f = document.getElementById("form")
let x = document.getElementById("search")
let s2 = document.getElementById("section-two")
let cards = document.getElementById("section2")

f.addEventListener("submit", (e)=> {
    e.preventDefault()
    fetch_data(x.value)
})

async function fetch_data (y) {
    const response = await fetch(`https://images-api.nasa.gov/search?q=${y}&media_type=image`)
    const data = await response.json()
    remove_data()
    show_data(data.collection.items)
}

function remove_data() {
    var col = document.querySelectorAll("text-center.row.col");
    if(col != null) {
        cards.innerHTML = "";
    }   
}


function show_data(item) { 
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
        <div class="card mt-2" style="width: 18rem;" style="color: black" onclick="return showDetails('${item[i].data[0].title}')">
        <img src="${item[i].links[0].href}" class="card-img-top" id="card-img">
        <div class="card-body text-center" style="color: black" id="card-body">
        <p class="card-title" id="card-title">${item[i].data[0].title}</p>
        </div>
        </div>
        </div>
        
        `

        cards.insertAdjacentHTML("beforeend", update)
        console.log(i + ": " + item[i].data[0].title)
        i++;

   }
    location.href = "#section-two"; 
    
}



async function showDetails (title) {
    console.log(title)
    
    const response = await fetch(`https://images-api.nasa.gov/search?title=${title}`)
    const data = await response.json()
    const item = data.collection.items

    document.getElementById("modal").innerHTML = `
    <div class="modal-dialog  modal-dialog-scrollable" id="showDetails">

            <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title w-100 text-center"  style="color: black">
              <i class="bi bi-moon-stars"></i>
              &emsp;
              ${item[0].data[0].title}
              &emsp;
              <i class="bi bi-moon-stars"></i>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="popUp-modal">
                <div class="card mt-2" style="width: 25rem;" style="color: black">
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

window.onbeforeunload = function() { 
    window.setTimeout(function () { 
        window.location = 'index.html';
    }, 0); 
    window.onbeforeunload = null;
}
