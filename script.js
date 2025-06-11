//references
let horizontalButton = document.querySelector("#horizontal-button");
let verticalButton = document.querySelector("#vertical-button");
let paintingsContainer = document.querySelector("#paintings-container");

//divs for horizontal paintings
let horizontalSet = 
[
    '<div class="column is-one-third"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/horizontal/birds.jpeg" alt="hummingbirds with a birdhouse" data-title="Home Is Where the Heart Is" data-dimensions="14in x 11in" data-price="$35"></figure></div></div></div>',
    '<div class="column is-one-third"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/horizontal/dancing_girl.jpeg" alt="girl dancing in front of waterfall" data-title="Sounds of Nature" data-dimensions="14in x 11in" data-price="$35"></figure></div></div></div>',
    '<div class="column is-one-third"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/horizontal/glaciers.jpeg" alt="glaciers and water" data-title="By the Ocean" data-dimensions="20in x 16in" data-price="$50"></figure></div></div></div>',
    '<div class="column is-one-third"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/horizontal/houses.jpg" alt="houses with winding road and a boat on a lake nearby" data-title="Once Upon a Time" data-dimensions="14in x 11in" data-price="$35"></figure></div></div></div>',
    '<div class="column is-one-third"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/horizontal/log_house.jpeg" alt="log house in the forest" data-title="Cozy Cottage" data-dimensions="20in x 16in" data-price="$50"></figure></div></div></div>',
    '<div class="column is-one-third"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/horizontal/flowers.jpeg" alt="a bundle of flowers" data-title="Yellow Beauties" data-dimensions="14in x 11in" data-price="$35"></figure></div></div></div>',
    '<div class="column is-one-third"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/horizontal/lake.jpeg" alt="prple-themed mountains with water in front of them" data-title="Lakeside" data-dimensions="20in x 16in" data-price="$50"></figure></div></div></div>'
];

//divs for vertical paintings
let verticalSet =
[
    '<div class="column is-one-quarter"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/vertical/lights_butterflies.jpg" alt="streetlight on brick wall with monarch butterflies" data-title="Street Light" data-dimensions="11in x 14in" data-price="$35"></figure></div></div></div>',
    '<div class="column is-one-quarter"><div class="card"><div class="card-image"><figure class="image"><img src="paintings/vertical/water_deck.jpeg" alt="deck on water leading to a distant gazebo" data-title="Serenity" data-dimensions="16in x 20in" data-price="$50"></figure></div></div></div>'
];

//function to update paintings container based on which button is clicked
function showPaintings(contentArray) {
  const wrapped = `<div class="columns is-multiline">${contentArray.join('')}</div>`;
  paintingsContainer.innerHTML = wrapped;
}

//show popup when image in gallery is clicked
function showPopup(imageSrc, alt, title = "Untitled", dimensions = "Unknown dimensions", price="Price not available") {
    //check if an existing modal is already open and remove it
    const existingModal = document.querySelector(".modal.is-active");
    if (existingModal) existingModal.remove();

    //create modal container
    const modal = document.createElement("div");
    modal.className = "modal is-active";

    //modal background (clicking this closes modal)
    const modalBackground = document.createElement("div");
    modalBackground.className = "modal-background";
    modalBackground.addEventListener("click", () => modal.remove());

    //modal content
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    //"box" class in bulma for popup
    const box = document.createElement("div");
    box.className = "box has-text-centered";
    const siteBackground = window.getComputedStyle(document.body).backgroundColor;
    box.style.backgroundColor = siteBackground;
    box.style.maxWidth = "90vw";
    box.style.margin = "0 auto";
    box.style.boxSizing = "border-box";

    //image
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = alt;
    img.className = "mb-4";
    img.style.maxHeight = "70vh";
    img.style.height = "auto";
    img.style.width = "auto";


    //title
    const titleEl = document.createElement("h2");
    titleEl.className = "title is-4";
    titleEl.textContent = title;

    //dimensions
    const dimEl = document.createElement("p");
    dimEl.className = "subtitle is-6";
    dimEl.style.marginBottom = "0.25rem";
    dimEl.textContent = dimensions;

    //prices
    const priceEl = document.createElement("p");
    priceEl.className = "subtitle is-6";
    priceEl.style.marginTop = "0rem";
    priceEl.textContent = `${price}`;

    //put everything together
    box.appendChild(img);
    box.appendChild(titleEl);
    box.appendChild(dimEl);
    box.appendChild(priceEl);
    modalContent.appendChild(box);

    //close button (top-right "X")
    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close is-large";
    closeBtn.setAttribute("aria-label", "close");
    closeBtn.addEventListener("click", () => modal.remove());

    //append to modal
    modal.appendChild(modalBackground);
    modal.appendChild(modalContent);
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
}

//event listeners
horizontalButton.addEventListener('click', () => 
{
    //console.log("horizontal button clicked");
    showPaintings(horizontalSet);
    addClickEventToImages();
});
verticalButton.addEventListener('click', () => 
{
    //console.log("vertical button clicked");
    showPaintings(verticalSet);
    addClickEventToImages();
});

function addClickEventToImages() 
{
    let images = paintingsContainer.querySelectorAll("img");

    images.forEach((img) => 
    {
        img.addEventListener("click", () => 
        {
            console.log("image clicked");
            //extract custom attributes
            let imageSrc = img.src;
            let altText = img.alt || "No description available";
            let title = img.dataset.title || "Untitled";
            let dimensions = img.dataset.dimensions || "Unknown dimensions";
            let price = img.dataset.price || "Price not available";

            //show the popup with extracted details
            showPopup(imageSrc, altText, title, dimensions, price);
        });
    });
}

