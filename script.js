var budget = {};
var totalEntries = {}
var theTotal = 0;
var newCategoryName = document.getElementById("new_category_name");
var addNewCategoryField = document.getElementById("add_new_category");
var budgetCategories = document.getElementById("budget_categories");
var totalLabel = document.getElementById("total_label");
var emptyMessage = document.getElementById("empty_message");

addNewCategoryField.addEventListener("click", function(){
    addNewCategory();             
});

addNewCategoryField.addEventListener("keyup", function(e){
    console.log(e);
    if (e.key === "Enter") {
        addNewCategory();      
    }       
});

function addNewCategory() {
    if (emptyMessage.style.display != "none"){
        emptyMessage.style.display = "none";
    }
    budget[newCategoryName.value] = [];
    totalEntries[newCategoryName.value + "Size"] = 0;    
    budgetCategories.innerHTML += `<div id="${newCategoryName.value + "_category"}">
                                    <div class="row mb-1">
                                    <input type="text" placeholder="${newCategoryName.value}" id="${newCategoryName.value + "_name"}" class="col-7 float-left d-inline btn border-primary text-left">
                                    <h3 class="col-2 btn btn-outline-primary m-0" id="${newCategoryName.value}" onclick="addNewEntry(id)"><b>+</b></h3>
                                    <h3 class="col-3 btn btn-outline-danger m-0" onclick="deleteCategory('${newCategoryName.value}')"><b>Delete</b></h3>
                                    </div>
                                    <ul class="list-group w-100 mb-3" id="${newCategoryName.value + "_entries"}">
                                    </ul>
                                    </div>`
    newCategoryName.value = "";  
}

function addNewEntry(category) {
    let categoryInput = document.getElementById(category + "_name")
    let entry = parseFloat(categoryInput.value);
    if (!isNaN(entry)) {
        let entryIndex = budget[category].length;
        let entryColor = "text-danger"
        if (entry > 0) {
            entryColor = "text-success"
        }

        budget[category].push(parseFloat(entry));
        totalEntries[category + "Size"] += 1;
        document.getElementById(category + "_entries").innerHTML += `<li class="list-group-item text-right" onclick="deleteEntry(${entryIndex}, '${category}')" id="${category}${entryIndex}"><b class="float-left d-inline btn btn-outline-danger">X</b><b class="btn ${entryColor}">${entry.toFixed(2)}</b></li>`;
        categoryInput.value = ""
        calculateTotal();
    } else {
        categoryInput.value = ""
        alert("Please enter a valid number");
    }
}

function deleteEntry(entry, category) {
    budget[category][entry] = 0;

    thisEntry = document.getElementById(category + entry);
    thisEntry.parentNode.removeChild(thisEntry);
    
    totalEntries[category + "Size"] -= 1;
    calculateTotal();
}

function calculateTotal() {
    theTotal = 0;
    for (var value in budget) {
        budget[value].forEach(function(entry) {
            theTotal += entry
        });        
    }
    totalLabel.innerHTML = "$" + theTotal.toFixed(2);
}

function deleteCategory(category) {
    thisCategory = document.getElementById(category + "_category");
    thisCategory.parentNode.removeChild(thisCategory);   
    delete budget[category]; 
    if (budgetCategories.children.length < 2) {
        emptyMessage.style.display = "block";
    }


    calculateTotal();
}