var budget = {};
var totalEntries = {}
var theTotal = 0;
var newCategoryName = document.getElementById("new_category_name");
var addNewCategoryField = document.getElementById("add_new_category");
var budgetCategories = document.getElementById("budget_categories");
var totalLabel = document.getElementById("total_label");
var emptyBudgetMessage = document.getElementById("empty_message");
var entryFields = document.getElementsByClassName("entry-fields");

addNewCategoryField.addEventListener("click", function(){
    addNewCategory();             
});

newCategoryName.addEventListener("keyup", function(e){
    if (e.key === "Enter") {
        addNewCategory();      
    }       
});

function setEventListenersForEntryFields() {
    for (i=0; i<entryFields.length; i++) {
        entryFields[i].addEventListener("keyup", function(e){
            if (e.key === "Enter") {
                addNewEntry(this.placeholder);     
            }  
        });
    }
}

function addNewCategory() {
    if (emptyBudgetMessage.classList.contains = "d-block"){
        emptyBudgetMessage.classList.replace("d-block", "d-none");

    }
    budget[newCategoryName.value] = [];
    totalEntries[newCategoryName.value + "Size"] = 0;    
    budgetCategories.innerHTML += `<div id="${newCategoryName.value + "_category"}">
                                    <div class="row mb-1">
                                    <input type="text" placeholder="${newCategoryName.value}" id="${newCategoryName.value + "_name"}" class="col-7 float-left d-inline btn border-primary text-left entry-fields">
                                    <h3 class="col-2 btn btn-outline-primary m-0" id="${newCategoryName.value}" onclick="addNewEntry(id)"><b>+</b></h3>
                                    <h3 class="col-3 btn btn-outline-danger m-0" onclick="deleteCategory('${newCategoryName.value}')"><b>Delete</b></h3>
                                    </div>
                                    <ul class="list-group w-100 mb-3" id="${newCategoryName.value + "_entries"}">
                                    <li class="list-group-item text-right" id="${newCategoryName.value + "_total"}" onclick="toggleHideEntries('${newCategoryName.value}')"><b class="float-left">Total:</b>0.00</li>
                                    </ul>
                                    </div>`
    newCategoryName.value = "";  

    setEventListenersForEntryFields();
}

function addNewEntry(category) {
    let categoryInput = document.getElementById(category + "_name")
    let entry = parseFloat(categoryInput.value);
    if (!isNaN(entry)) {
        let entryIndex = budget[category].length;
        let entryColor = "text-danger"
        let visibility = 'd-block';
        if (entry > 0) {
            entryColor = "text-success"
        }

        if (document.getElementsByClassName(category + "-class")[0] != undefined) {
            if (document.getElementsByClassName(category + "-class")[0].classList.contains("d-none")) {
                visibility = "d-none";
            }
        }

        budget[category].push(parseFloat(entry));
        totalEntries[category + "Size"] += 1;
        entry = formatAmounts(entry);
        document.getElementById(category + "_entries").innerHTML += `<li class="list-group-item text-right ${category}-class ${visibility}" id="${category}${entryIndex}"><b class="float-left d-inline btn btn-outline-danger" onclick="deleteEntry(${entryIndex}, '${category}')">X</b><b class="btn ${entryColor}">${entry}</b></li>`;
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
    let localTotal = 0;
    theTotal = 0;
    for (var value in budget) {
        budget[value].forEach(function(entry) {
            theTotal += entry
            localTotal += entry;
        });   
        localTotal = formatAmounts(localTotal);
        document.getElementById(value + "_total").innerHTML = `<b class="float-left">Total:</b>${localTotal}`
        localTotal = 0;  
    }
    console.log(theTotal >=0);
    if (theTotal >= 0) {
        totalLabel.classList.replace("text-danger", "text-success");
    } else {
        totalLabel.classList.replace("text-success", "text-danger");
    }
    theTotal = formatAmounts(theTotal);   

    totalLabel.innerHTML = theTotal;
}

function deleteCategory(category) {
    if (confirm("Are you sure you want to delete this category")) {
        thisCategory = document.getElementById(category + "_category");
        thisCategory.parentNode.removeChild(thisCategory);   
        delete budget[category]; 

        calculateTotal();
    }
}

function toggleHideEntries(category) {
    let entries = document.getElementsByClassName(category + "-class");
    if (entries[0].classList.contains("d-none")) {
        for (i=0; i<entries.length; i++) {
            entries[i].classList.replace("d-none", "d-block");
        }
    } else {
        for (i=0; i<entries.length; i++) {
            entries[i].classList.replace("d-block", "d-none");
        }       
    }
}

function formatAmounts(amount) {
    amount = amount.toFixed(2);
    if (amount < 0) {
        amount = amount.slice(0,1) + "$" + amount.slice(1, amount.length);
    } else {
        amount = "$" + amount;
    }     
    return amount; 
}