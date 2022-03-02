const apiURL = "https://trackapi.nutritionix.com/v2/search/instant?query="
const formContainer = document.getElementById('container');
const nameForm = document.getElementById('nameForm');
const content = document.getElementById('menus');
const searchForm = document.getElementById('search-form')
const searchBar = document.getElementById('search-bar')
const searchResults = document.getElementById('search-results')
const commonURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"
const brandedURL = " https://trackapi.nutritionix.com/v2/search/item?nix_item_id="

function onBrandedClick(event) {
    it
    let itemID = event.target.id;
    console.log(itemID);
    fetch(`${brandedURL}${itemID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-app-id": "190591b5",
                "x-app-key": "73e7c09306612d387cae4354694b0291"
            }
        }).then(res => res.json())
        .then(data => console.log(data))
}

function onCommonClick(event) {
    let itemID = event.target.innerText;
    console.log(itemID);
    fetch(`${commonURL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-app-id": "190591b5",
                "x-app-key": "73e7c09306612d387cae4354694b0291",
                'x-remote-user-id': '0'
            },
            body: JSON.stringify({
                "query": itemID
            })
        }).then(res => res.json())
        .then(data => console.log(data))
}

function createBrandedElement(name, itemID) {
    let foodItemElement = document.createElement('li')
    foodItemElement.className = "list-group-item d-flex justify-content-between align-items-start";
    let nameDiv = document.createElement('div')
    nameDiv.className = "ms-2 me-auto"
    let subheadingDiv = document.createElement('div')
    subheadingDiv.className = 'fw-bold';
    subheadingDiv.id = itemID;
    subheadingDiv.innerText = name;
    nameDiv.appendChild(subheadingDiv);
    foodItemElement.appendChild(nameDiv);
    subheadingDiv.addEventListener('click', onBrandedClick)
    searchResults.appendChild(foodItemElement);

}

function createCommonElement(name) {
    let foodItemElement = document.createElement('li')
    foodItemElement.className = "list-group-item d-flex justify-content-between align-items-start";
    let nameDiv = document.createElement('div')
    nameDiv.className = "ms-2 me-auto"
    let subheadingDiv = document.createElement('div')
    subheadingDiv.className = 'fw-bold';
    subheadingDiv.innerText = name;
    nameDiv.appendChild(subheadingDiv);
    foodItemElement.appendChild(nameDiv);
    subheadingDiv.addEventListener('click', onCommonClick)
    searchResults.appendChild(foodItemElement);

}

function onQuerySubmit(event) {
    event.preventDefault();
    let query = searchBar.value
    console.log(query)
    fetch(`${apiURL}${query}&detailed=true`, {
            method: "GET",
            headers: {
                "x-app-id": "190591b5",
                "x-app-key": "73e7c09306612d387cae4354694b0291"
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data.common, data.branded)
            for (const item of data.branded) {
                createBrandedElement(item["food_name"], item["nix_item_id"])
            }
            for (const item of data.common) {
                createCommonElement(item["food_name"])
            }
        })
}
searchForm.addEventListener('submit', onQuerySubmit)

function onNameSubmit(event) {
    event.preventDefault();
    formContainer.style.display = "none";
    content.style.display = "inline-block";

}
nameForm.addEventListener('submit', onNameSubmit);

const postURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"