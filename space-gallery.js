let f = document.getElementById("form")
let x = document.getElementById("search")
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
        <div class="row mt-8 bg-primary" style="height:auto; font-style:itallic;">
            <p style="color: white;">Search results for "${x.value} (${item.length}): </p>
        </div>
    `

    let i = 0
    while (i < item.length){
        
        let update = `

        <div class="col" id="col-cards">
        <div class="card mt-2" style="width: 18rem;" style="color: black">
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
        /** 
    
            let item = y[i].data
            let image = y[i].links[0].href
            let nasaID = item[i].nasa_id
            let title = item[i].title
            let center = item[i].center
            let date_created = item[i].date_created
            let desc = item[i].description
        
 
    
        */
    
    
}

cards.addEventListener("click", (e)=> {
    e.preventDefault()
    showDetails()
})

let title = document.getElementById("card-title")

function showDetails (title) {

    console.log(title)
    /**
     * 
    const response = await fetch(`https://images-api.nasa.gov/search?title=${title.value}`)
    const data = await response.json()
    console.log(data)
     * <div class="modal-dialog modal-dialog-centered  modal-dialog-scrollable" id="showDetails">

            <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-center">${item[i].data[0].title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card mt-2" style="width: 18rem;" style="color: black">
            <img src="${item[i].links[0].href}" class="card-img-top" id="card-img">
            <div class="card-body text-center" style="color: black" id="card-body">
            <p>${item[i].description}</p>   
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Center: ${item[i].center}</li>
                <li class="list-group-item">NASA ID: ${item[i].nasa_id}</li>
                <li class="list-group-item">${item[i].date_created}</li>
            </ul>
            </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>

            
            </div>
     */
}




