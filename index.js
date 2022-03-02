const formContainer = document.getElementById('container');
const nameForm = document.getElementById('nameForm');
const content = document.getElementById('menus');
const searchForm = document.getElementById('search-form')
const searchBar = document.getElementById('search-bar')
const searchResults = document.getElementById('search-results')
const addButton = document.getElementById('add-to-intake-btn');
const backButton = document.getElementById('back-btn');
// nutrition table cells
const calorieValueCell = document.getElementById('calorie-value');
const cholValueCell = document.getElementById('cholesterol-value');
const fiberValueCell = document.getElementById('dietary-fibers-value');
const potassiumValueCell = document.getElementById('potassium-value');
const proteinValueCell = document.getElementById('protein-value');
const satFatValueCell = document.getElementById('saturated-fat-value');
const sodiumValueCell = document.getElementById('sodium-value');
const sugarValueCell = document.getElementById('sugars-value');
const totalCarbsValueCell = document.getElementById('total-carbohydrates-value');
const fatsValueCell = document.getElementById('total-fat-value');
const nameCell = document.getElementById('item-name');
// API URLs
const commonURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"
const brandedURL = " https://trackapi.nutritionix.com/v2/search/item?nix_item_id="
const apiURL = "https://trackapi.nutritionix.com/v2/search/instant?query="

function toggleOptions() {
    const results = document.getElementById('results');
    results.style.display = "none";
}

function toggleTable() {
    const nutritionTable = document.getElementById('nutrition-facts');
    nutritionTable.style.display = "inline-block";
}

function onBackClick() {
    const results = document.getElementById('results');
    const nutritionTable = document.getElementById('nutrition-facts');
    results.style.display = "inline-block";
    nutritionTable.style.display = "none"

}

backButton.addEventListener('click', onBackClick)

function updateNutritionTable(name, calValue, cholValue, fiberValue, potassiumValue, proteinValue, saturatedFatValue, sodiumValue, sugarsValue, totalCarbsValue, totalFatValue) {

    calorieValueCell.innerText = calValue;
    cholValueCell.innerText = cholValue;
    fiberValueCell.innerText = fiberValue;
    potassiumValueCell.innerText = potassiumValue;
    proteinValueCell.innerText = proteinValue;
    satFatValueCell.innerText = saturatedFatValue;
    sodiumValueCell.innerText = sodiumValue;
    sugarValueCell.innerText = sugarsValue;
    totalCarbsValueCell.innerText = totalCarbsValue;
    fatsValueCell.innerText = totalFatValue;
    nameCell.innerText = name
}

function onBrandedClick(event) {
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
        .then(data => {
            console.log(data.foods[0])
            let calories = data.foods[0]["nf_calories"];
            let cholesterol = data.foods[0]["nf_cholesterol"];
            let diataryFibers = data.foods[0]["nf_dietary_fiber"];
            let potassium = data.foods[0]["nf_potassium"];
            let protein = data.foods[0]["nf_protein"];
            let saturatedFat = data.foods[0]["nf_saturated_fat"];
            let sodium = data.foods[0]["nf_sodium"];
            let sugars = data.foods[0]["nf_sugars"];
            let totalCarbs = data.foods[0]["nf_total_carbohydrate"];
            let totalFat = data.foods[0]["nf_total_fat"];
            console.log(calories, cholesterol, diataryFibers, potassium, protein, saturatedFat, sodium, sugars, totalCarbs, totalFat)
            toggleOptions();
            toggleTable();
            updateNutritionTable(calories, cholesterol, diataryFibers, potassium, protein, saturatedFat, sodium, sugars, totalCarbs, totalFat)
        })
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
        .then(data => {
            let calories = data.foods[0]["nf_calories"];
            let cholesterol = data.foods[0]["nf_cholesterol"];
            let diataryFibers = data.foods[0]["nf_dietary_fiber"];
            let potassium = data.foods[0]["nf_potassium"];
            let protein = data.foods[0]["nf_protein"];
            let saturatedFat = data.foods[0]["nf_saturated_fat"];
            let sodium = data.foods[0]["nf_sodium"];
            let sugars = data.foods[0]["nf_sugars"];
            let totalCarbs = data.foods[0]["nf_total_carbohydrate"];
            let totalFat = data.foods[0]["nf_total_fat"];
            let foodName = data.foods[0]["food_name"]
            console.log(calories, cholesterol, diataryFibers, potassium, protein, saturatedFat, sodium, sugars, totalCarbs, totalFat)
            toggleOptions();
            toggleTable();
            updateNutritionTable(foodName, calories, cholesterol, diataryFibers, potassium, protein, saturatedFat, sodium, sugars, totalCarbs, totalFat)
        })
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

function populateList() {
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

function clearList() {
    while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
    }
}

function onQuerySubmit(event) {
    event.preventDefault();
    clearList();
    populateList();
}
searchForm.addEventListener('submit', onQuerySubmit)

function onNameSubmit(event) {
    event.preventDefault();
    formContainer.style.display = "none";
    content.style.display = "inline-block";

}
nameForm.addEventListener('submit', onNameSubmit);

const postURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"