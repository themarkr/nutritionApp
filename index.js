const formContainer = document.getElementById('container');
const nameForm = document.getElementById('nameForm');
const firstNameBar = document.getElementById('firstName');
const lastNameBar = document.getElementById('lastName');
const nutritionDiv = document.getElementById('results');
const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results')
const addButton = document.getElementById('add-to-intake-btn');
const backButton = document.getElementById('back-btn');
const mealCategoryBtn = document.getElementById('meal-category-btn');
const dailyBtn = document.getElementById('daily-intake-btn');
const breakfastOption = document.getElementById('breakfast-option');
const lunchOption = document.getElementById('lunch-option');
const dinnerOption = document.getElementById('dinner-option');
const text = document.getElementById('webpageText');
const userOffCanvasLabel = document.getElementById('offcanvasRightLabel')
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
// daily intake breakdown cells
const dailyCalorieValueCell = document.getElementById('daily-calorie-value');
const dailyCholValueCell = document.getElementById('daily-cholesterol-value');
const dailyFiberValueCell = document.getElementById('daily-dietary-fibers-value');
const dailyPotassiumValueCell = document.getElementById('daily-potassium-value');
const dailyProteinValueCell = document.getElementById('daily-protein-value');
const dailySatFatValueCell = document.getElementById('daily-saturated-fat-value');
const dailySodiumValueCell = document.getElementById('daily-sodium-value');
const dailySugarValueCell = document.getElementById('daily-sugars-value');
const dailyTotalCarbsValueCell = document.getElementById('daily-total-carbohydrates-value');
const dailyFatsValueCell = document.getElementById('daily-fat-value');
const dailyNameCell = document.getElementById('item-name');
// USER FOOD LOGS
const dailyTotals = {
        calories: 0,
        cholesterol: 0,
        fiber: 0,
        potass: 0,
        protein: 0,
        sFat: 0,
        sodium: 0,
        sugars: 0,
        totCarbs: 0,
        totFat: 0
    }
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
    nutritionTable.style.display = "flex";
}

function onBackClick() {
    const results = document.getElementById('results');
    const nutritionTable = document.getElementById('nutrition-facts');
    results.style.display = "flex";
    nutritionTable.style.display = "none"
    text.innerHTML = `Results for: ${searchBar.value}`;
}

function onXclick() {
    clearList();
}

function onDailyClick() {
    const badge = document.getElementById('badge');
    badge.style.display = "none";
    badge.innerText = "0";
}

function updateBadge() {
    const badge = document.getElementById('badge');
    badge.style.display = "block";
    badge.innerText = "" ? badge.innerText = "1" : badge.innerText = +badge.innerText + 1;
}

function updateDailyTable(cal, chol, fiber, potass, protein, sFat, sodium, sugars, totCarbs, totFat) {

    dailyTotals["calories"] += cal * 1;
    dailyTotals["cholesterol"] += chol * 1
    dailyTotals["fiber"] += fiber * 1
    dailyTotals["potass"] += potass * 1
    dailyTotals["protein"] += protein * 1
    dailyTotals["sFat"] += sFat * 1
    dailyTotals["sodium"] += sodium * 1
    dailyTotals["sugars"] += sugars * 1
    dailyTotals["totCarbs"] += totCarbs * 1
    dailyTotals["totFat"] += totFat * 1
    console.log(dailyTotals);
    dailyCalorieValueCell.innerText = dailyTotals["calories"]
    dailyCholValueCell.innerText = dailyTotals["cholesterol"];
    dailyFiberValueCell.innerText = dailyTotals["fiber"];
    dailyPotassiumValueCell.innerText = dailyTotals["potass"];
    dailyProteinValueCell.innerText = dailyTotals["protein"];
    dailySatFatValueCell.innerText = dailyTotals["sFat"];
    dailySodiumValueCell.innerText = dailyTotals["sodium"];
    dailySugarValueCell.innerText = dailyTotals["sugars"];
    dailyTotalCarbsValueCell.innerText = dailyTotals["totCarbs"];
    dailyFatsValueCell.innerText = dailyTotals["totFat"];

}

function onAdd(event) {
    if (mealCategoryBtn.innerText !== "Meal Category") {
        let category = mealCategoryBtn.innerText;
        let categoryList = document.getElementById(`${category.toLowerCase()}-list`)

        let newLi = document.createElement('li')
        let newItem = document.createElement('a');
        newItem.class = "dropdown-item";
        newItem.innerText = nameCell.innerText;
        newLi.appendChild(newItem);
        categoryList.appendChild(newLi);
        updateBadge();
        let cal = calorieValueCell.innerText
        console.log(cal, typeof cal)
        let chol = cholValueCell.innerText;
        let fiber = fiberValueCell.innerText;
        let potass = potassiumValueCell.innerText
        let protein = proteinValueCell.innerText;
        let sFat = satFatValueCell.innerText;
        let sodium = sodiumValueCell.innerText;
        let sugars = sugarValueCell.innerText;
        let totCarbs = totalCarbsValueCell.innerText;
        let totFat = fatsValueCell.innerText;
        updateDailyTable(cal, chol, fiber, potass, protein, sFat, sodium, sugars, totCarbs, totFat);
    }
}

function onCategoryClick(event) {
    let option = event.target.innerText
    document.getElementById('meal-category-btn').innerText = option;
}

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
            let foodName = data.foods[0]["food_name"]
            let photoURL = data.foods[0].photo.thumb
            console.log(calories, cholesterol, diataryFibers, potassium, protein, saturatedFat, sodium, sugars, totalCarbs, totalFat)
            toggleOptions();
            toggleTable();
            updateNutritionTable(foodName, calories, cholesterol, diataryFibers, potassium, protein, saturatedFat, sodium, sugars, totalCarbs, totalFat)
            displayFoodPicture(photoURL);
            text.innerText = `Nutrition Facts for: ${foodName}`
        })
}

function onCommonClick(event) {
    let itemName = event.target.innerText;
    fetch(`${commonURL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-app-id": "190591b5",
                "x-app-key": "73e7c09306612d387cae4354694b0291",
                'x-remote-user-id': '0'
            },
            body: JSON.stringify({
                "query": itemName
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
            let photoURL = data.foods[0].photo.thumb
            console.log(photoURL);
            console.log(calories, cholesterol, diataryFibers, potassium, protein, saturatedFat, sodium, sugars, totalCarbs, totalFat)
            toggleOptions();
            toggleTable();
            updateNutritionTable(foodName, calories, cholesterol, diataryFibers, potassium, protein, saturatedFat, sodium, sugars, totalCarbs, totalFat)
            displayFoodPicture(photoURL);
            text.innerText = `Nutrition Facts for: ${foodName}`
        })
}

function displayFoodPicture(url) {
    document.getElementById('food-img').src = url;
}

function createBrandedElement(name, itemID, brandName, servingVal, servingUnits) {
    let foodItemElement = document.createElement('li')
    foodItemElement.className = "list-group-item d-flex justify-content-between align-items-start";
    let nameDiv = document.createElement('div')
    nameDiv.className = "ms-2 me-auto"
    nameDiv.innerText = `Brand: ${brandName}   Serving Size: ${servingVal} ${servingUnits}`;
    let subheadingDiv = document.createElement('div')
    subheadingDiv.className = 'fw-bold';
    subheadingDiv.id = itemID;
    subheadingDiv.innerText = name;
    nameDiv.appendChild(subheadingDiv);
    foodItemElement.appendChild(nameDiv);
    subheadingDiv.addEventListener('click', onBrandedClick)
    searchResults.appendChild(foodItemElement);

}

function createCommonElement(name, servingVal, servingUnits) {
    let foodItemElement = document.createElement('li')
    foodItemElement.className = "list-group-item d-flex justify-content-between align-items-start";
    let nameDiv = document.createElement('div')
    nameDiv.className = "ms-2 me-auto"
    nameDiv.innerText = `Serving Size: ${servingVal} ${servingUnits}`;
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
                createBrandedElement(item["food_name"], item["nix_item_id"], item["brand_name"], item["serving_qty"], item["serving_unit"])
            }
            for (const item of data.common) {
                createCommonElement(item["food_name"], item["serving_qty"], item["serving_unit"])
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
    text.innerText = `Results for: ${searchBar.value}`;
}

function displaySearchForItem() {
    text.innerText = "Search for any food item"
}

function onNameSubmit(event) {
    event.preventDefault();
    formContainer.style.display = "none";
    nutritionDiv.style.display = "flex";
    text.innerText = `Welcome ${firstNameBar.value} ${lastNameBar.value}`;
    userOffCanvasLabel.innerText = `${firstNameBar.value}'s Daily Intake`
    landingImg.style.display = "none"
    dailyBtn.style.visibility = "visible";
}
nameForm.addEventListener('submit', onNameSubmit);
searchBar.addEventListener('click', displaySearchForItem)
searchBar.addEventListener('click', onXclick)
searchForm.addEventListener('submit', onQuerySubmit)

breakfastOption.addEventListener('click', onCategoryClick)
lunchOption.addEventListener('click', onCategoryClick)
dinnerOption.addEventListener('click', onCategoryClick)
backButton.addEventListener('click', onBackClick)
addButton.addEventListener('click', onAdd);
dailyBtn.addEventListener('click', onDailyClick);