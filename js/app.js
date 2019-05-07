//--------------------
// initiation 
$("#name").focus();

//--------------------
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
activities.innerHTML += "<p><b>Total Price: $</b><span class='activities-price'>0</span></p>";
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
    
    let totalPrice = 0;
    inputs.forEach(input=> { // TODO: can use .reduce()
        if (input.checked) {
            totalPrice += input.dataset.price;
        }
    })
    priceSpan.textContent = totalPrice;
})
// const total = Array.from(inputs).reduce((total, input)=> {
//     if (input.checked) {
//         const price = input.dataset.price;
//         total + price;
//     }
// });

// console.log(total);


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