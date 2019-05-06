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
const $colorsArr = $("#color").children();

$deisgn.change(function () {
    const tshirtCat = $(this).val();
    const mid = $colorsArr.length/2
    
    $colorsArr.each( function() { //reset all options 
        $(this).show();
    })

    if (tshirtCat === "js puns") {
        $colorsArr.each( function(i) {
            if (i >= mid) {
                $(this).hide();
            }
        })
    } else if (tshirtCat === "heart js") {
        $colorsArr.each( function(i) {
            if (i < mid) {
                $(this).hide();
            }
        })
    }
})

//--------------------
// Registry

const $activitiesArray = $(".activities label");

const activities = document.querySelector(".activities");
activities.innerHTML += "<p><b>Total Price: </b><span class='activities-price'>0</span></p>"; //TODO: make dollar sign
const inputs = activities.querySelectorAll("input");
const priceSpan = activities.querySelector(".activities-price");

inputs.forEach(input=> { 
    /** add dataset value (session and price) to input for conditioning */
    const label = input.parentElement;
    const textArr = label.textContent.split(" ");
    const session = textArr[textArr.length - 2]; //TODO: use Regex to delete ","
    const price = textArr[textArr.length - 1]; //TODO: use Regex to make number 
    input.dataset.session = session;
    input.dataset.price = price;    
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