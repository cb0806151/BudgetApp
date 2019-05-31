var budget = {};
var totalEntries = {}
var theTotal = 0;
var entriesNegative = false;  

$('#add_new_category').click(()=> {
    addNewCategory();             
});

var hello = "there"

$('#new_category_name').keyup((e)=>{
    if (e.which === 13) {
        addNewCategory();      
    }       
});

var whats = "up"

function setEventListenersForEntryFields(category) {
        $("#" + category + "_name").keyup(function(e){
            if (e.which === 13) {
                addNewEntry(category);     
            }  
        });
}

function addNewCategory() {
    let category = $('#new_category_name').val();
    if ($('#empty_message').hasClass("d-block")){
        $('#empty_message').removeClass("d-block").addClass("d-none");

    }
    budget[category] = [];
    totalEntries[category + "Size"] = 0;    
    $('#budget_categories').append(`<div id="${category + "_category"}">
                                    <div class="row mb-1">
                                    <input type="text" placeholder="${category}" id="${category + "_name"}" class="col-7 float-left d-inline btn border-primary text-left entry-fields">
                                    <h3 class="col-2 btn btn-outline-primary m-0" id="${category}" onclick="addNewEntry(id)"><b>+</b></h3>
                                    <h3 class="col-3 btn btn-outline-danger m-0" onclick="deleteCategory('${category}')"><b>Delete</b></h3>
                                    </div>
                                    <ul class="list-group w-100 mb-3" id="${category + "_entries"}">
                                    <li class="list-group-item text-right" id="${category + "_total"}"><b class="btn btn-outline-primary float-left" onclick="toggleHideEntries('${category}')">Toggle Display</b><b class="float-left btn">Total:</b><span class="btn">0.00</span></li>
                                    </ul>
                                    </div>`)
    $('#new_category_name').val("");  
    setEventListenersForEntryFields(category);
}

function addNewEntry(category) {
    let categoryInput = $("#" + category + "_name");
    let entry = parseFloat(categoryInput.val());
    if (!isNaN(entry)) {
        let entryIndex = budget[category].length;
        let entryColor = "text-danger"
        let visibility = 'd-block';

        if ($("." + category + "-class").eq(0) != undefined) {
            if ($("." + category + "-class").eq(0).hasClass("d-none")) {
                visibility = "d-none";
            }
        }

        if (entriesNegative && (String(categoryInput.val()).indexOf("+") < 0) && (String(categoryInput.val()).indexOf("-") < 0)) {
            entry = entry * -1;
        }

        if (entry > 0) {
            entryColor = "text-success"
        }

        budget[category].push(entry);
        totalEntries[category + "Size"] += 1;
        entry = formatAmounts(entry);
        $("#" + category + "_entries").append(`<li class="list-group-item text-right ${category}-class ${visibility}" id="${category}${entryIndex}"><b class="float-left d-inline btn btn-outline-danger" onclick="deleteEntry(${entryIndex}, '${category}')">X</b><b class="btn ${entryColor}">${entry}</b></li>`);
        categoryInput.val("")
        calculateTotal();
    } else {
        categoryInput.val("")
        alert("Please enter a valid number");
    }
}

function deleteEntry(entry, category) {
    budget[category][entry] = 0;

    stringer = "#" + category + entry
    $("#" + category + entry).remove(stringer);
    
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
        $("#" + value + "_total").html(`<b class="btn btn-outline-primary float-left" onclick="toggleHideEntries('${value}')">Toggle Display</b><b class="float-left btn">Total:</b><span class="btn">${localTotal}</span>`);
        localTotal = 0;  
    }

    if (theTotal >= 0) {
        $('#total_label').addClass("text-success").removeClass("text-danger");
    } else {
        $('#total_label').addClass("text-danger").removeClass("text-success");
    }
    theTotal = formatAmounts(theTotal);   

    $('#total_label').html(theTotal);
}

$('#entries_default').click(()=>{
    if (entriesNegative) {
        entriesNegative = false;
    } else {
        entriesNegative = true;
    }
});

function deleteCategory(category) {
    if (confirm("Are you sure you want to delete this category")) {
        thisCategory = "#" + category + "_category";
        $(thisCategory).remove(thisCategory);   
        delete budget[category]; 

        if (Object.keys(budget).length < 1){
            $("#empty_message").addClass("d-block").removeClass("d-none");
        }
        calculateTotal();
    }
}

function toggleHideEntries(category) {
    let entries = $("." + category + "-class");
    if (entries.eq(0).hasClass("d-none")) {
        for (i=0; i<entries.length; i++) {
            entries.eq(i).addClass("d-block").removeClass("d-none");
        }
    } else {
        for (i=0; i<entries.length; i++) {
            entries.eq(i).addClass("d-none").removeClass("d-block");
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