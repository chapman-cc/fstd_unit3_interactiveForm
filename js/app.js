//--------------------
// BASIC INFO

const $name = $("#name")
$name.focus();

// TODO: Name field can't be blank.
$name.keyup(function () {
    const val = $(this).val();
    const regex = new RegExp("^\w+\s?(\w+)?$", "i")
    const isValid = regex.test(val);
    console.log(`String: ${val}   is ${isValid}`)
})
// TODO: add red border and text

// TODO: Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
// TODO: add red border and text
// TODO: use keyup listener 


// JOB ROLE

const $titleInput = $("#title");
const $otherTitleInput = $("#other-title");
$otherTitleInput.hide();

$titleInput.change(function (e) {
    if ($(this).val() === "other") {
        $otherTitleInput.slideDown();
    } else {
        $otherTitleInput.slideUp();
    }
})

//--------------------
// T-shirt color

const $deisgn = $("#design");
const $colorDiv = $("#colors-js-puns");
const $colorsArr = $("#color").children();

// hide color selection section intially 
$colorDiv.hide();

$deisgn.change(function () {
    const tshirtCat = $(this).val();
    const mid = $colorsArr.length/2
    
    $colorsArr.each( function() { //reset all options 
        $(this).show();
    })

    if (tshirtCat === "js puns") {
        $colorDiv.slideDown();
        $colorsArr.each( function(i) {
            if (i >= mid) {
                $(this).hide();
            }
        })
    } else if (tshirtCat === "heart js") {
        $colorDiv.slideDown();
        $colorsArr.each( function(i) {
            if (i < mid) {
                $(this).hide();
            }
        })
    } else {
        $colorDiv.slideUp();
        
    }
})

//--------------------
// Registry

// const $activitiesArray = $(".activities label");

const activities = document.querySelector(".activities");
activities.innerHTML += "<p style='display: none;'><b>Total Price: </b><span class='activities-price'>0</span></p>"; 
const inputs = activities.querySelectorAll("input");
const priceSpan = activities.querySelector(".activities-price");

inputs.forEach(input=> { 
    /** add dataset value: session and price, to <input> for conditioning */
    const labelText = input.parentElement.textContent;
    const sessionRegex = /\d{1,2}(am|pm)-\d{1,2}(am|pm)/;
    const priceRegex = /\d+\.?\d{2}/;

    if (sessionRegex.test(labelText)) 
        input.dataset.session = sessionRegex.exec(labelText)[0];

    if (priceRegex.test(labelText))
        input.dataset.price = priceRegex.exec(labelText)[0];
})


activities.addEventListener("change", e => {
    const target = e.target;
    const session = target.dataset.session;
    
    /**
     * This checks 
     *  1) if user checked an input
     *  2) if true, loop through inputs
     *  3) if an input is not same as target, and session is same as target
     *  4) the input other than target is disabled and strike through
     * 
     *  5) if user unchecked an input 
     *  6) it re-enabled all inputs with same session;
     */
    
     if (target.checked){ 
        for (let input of inputs) { 
            if ((input !== target) && (input.dataset.session === session)) {
                input.disabled = true;
                input.parentElement.style.textDecoration = "line-through";
            }
        }
    } else {
        for (let input of inputs) { 
            if (input.dataset.session === session) {
                input.disabled = false;
                input.parentElement.style.textDecoration = "none";
            } 
        }
    }
    
    let total = 0;
    inputs.forEach(input=> {
        if (input.checked) {
            total += parseInt(input.dataset.price);
        }
    })

    if (total) {
        priceSpan.parentElement.style.display = "block";
    priceSpan.textContent = `$ ${total}`;
    } else {
        priceSpan.parentElement.style.display = "none"
    }
})

// TODO: User must select at least one checkbox under the "Register for Activities" section of the form.
// TODO: add red border and text

//--------------------
// Payment

const $paymentSelect = $("#payment");
// payment default selected option is "Credit Card"
$paymentSelect.find("[value='credit card']").attr("selected", true);

const $creditCard = $("#credit-card");
const $paypal = $creditCard.next()
const $bitcoin = $creditCard.next().next();

$paypal.hide();
$bitcoin.hide();

$paymentSelect.change(function () {
    const method = $(this).val();
    if (method === "credit card") {
        $creditCard.slideDown();
        $paypal.slideUp();
        $bitcoin.slideUp();
    } else if (method === "paypal") {
        $creditCard.slideUp();
        $paypal.slideDown();
        $bitcoin.slideUp();
    } else if (method === "bitcoin") {
        $creditCard.slideUp();
        $paypal.slideUp();
        $bitcoin.slideDown();
    } 
})

// TODO: If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
// TODO: Credit Card field should only accept a number between 13 and 16 digits.
// TODO: add red border and text if CREDIT CARD IS SELECTED
// TODO: add conditional error message 
// ? “Please enter a credit card number.”  || “Please enter a number that is between 13 and 16 digits long.”

// TODO: The Zip Code field should accept a 5-digit number.
// TODO: add red border and text if CREDIT CARD IS SELECTED

// TODO: The CVV should only accept a number that is exactly 3 digits long.
// TODO: add red border and text if CREDIT CARD IS SELECTED