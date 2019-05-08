// * --------------------
// * FUNTIONS
// * --------------------

/**
 * to show an red border on <input>, if passed in boolean is not correct
 * @param {element} input is <input> element to be modify 
 * @param {boolean} isCorrect is boolean value to determine if false
 */
function showErrorBorder(input, isCorrect) {
    if (isCorrect) {
        input.removeClass("err-border")
    } else {
        input.addClass("err-border")
    }
}

/**
 * to show an error message on <input>, if passed in boolean is not correct
 * @param {element} input is <input> element to be modify 
 * @param {boolean} isCorrect is boolean value to determine if false
 * @param {string} message is optional conditional message
 */
function showErrorMessage(textElement, isCorrect, text) {
    const message = text || null;
    if (isCorrect) {
        textElement.removeClass("err-text").hide()
    } else {
        textElement.addClass("err-text").show()
    }

    // if a message is present, change the span text
    if (message) {
        textElement.text() = message;
}
}



//--------------------
// BASIC INFO

const $name = $("#name")
$name.focus();

/** Name validator */
const $nameErrSpan = $('<span class="err-text" style="display: none;">Name Cannot Be Empty</span>')
$name.after($nameErrSpan);
$name.keyup(function () {
    const val = $(this).val();
    const regex = new RegExp("^\\w+\\s?(\\w+)?$", "i");
    const isValid = regex.test(val);
    const $span = $nameErrSpan;
    
    showErrorMessage($span, isValid);
    showErrorBorder($(this), isValid);
})


/** Email validator */
const $email = $("#mail");
$email.prev().append('<span class="err-text" style="display: none;">This is not an Email</span>');
$email.keyup(function () {
    const val = $(this).val();
    const regex = /[^@]+@[^@]+\.(com|net|org)/;
    const isValid = regex.test(val) || val === "";
    const $span = $emailErrSpan;
    
    showErrorMessage($span, isValid);
    showErrorBorder($(this), isValid);
})


/** Job Role */

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
activities.firstElementChild.innerHTML+='<span class="err-text" style="display: none;">Select at least 1 activities</span>';
activities.innerHTML += "<p style='display: none;'><b>Total Price: </b><span class='activities-price'>0</span></p>"; 
const inputs = Array.from(activities.querySelectorAll("input"));
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
        inputs.forEach(input => {
            if ((input !== target) && (input.dataset.session === session)) {
                input.disabled = true;
                input.parentElement.style.textDecoration = "line-through";
            }
        })

    } else {
        inputs.forEach(input => {
            if (input.dataset.session === session) {
                input.disabled = false;
                input.parentElement.style.textDecoration = "none";
            } 
        })
    }
    
    const checkedInputs = inputs.filter(input => input.checked);
    const total = checkedInputs.reduce((total, input)=> total + parseInt(input.dataset.price), 0);

    /**
     * ! Deprecated
    let total = 0;
    inputs.forEach(input=> {
        if (input.checked) {
            total += parseInt(input.dataset.price);
        }
    })
     */

    if (total) {
        priceSpan.parentElement.style.display = "block";

        activities.querySelector(".err-text").style.display = "none"
        priceSpan.textContent = `$ ${total}`;
    } else {
        priceSpan.parentElement.style.display = "none";
        
        activities.querySelector(".err-text").style.display = "block"
        priceSpan.textContent = `$ ${total}`;
    }
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

// TODO: If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
$paymentSelect.change(function () {
    if ($paymentSelect.val() === "credit card") {
        const $errSpan = $('<p class="err-text" style="display: none; float: none; margin: 0">error message insert here</p>');
        $creditCard.prepend($errSpan);

        $cardNo = $("#cc-num");
        $cardNo.keyup(function () {
            const val = $(this).val();
            const regex = /\d{13,16}/g;
            const isValid = regex.test(val);
            
            if (isValid) {
                $(this).removeClass("err-border");
                $errSpan.removeClass("err-text").hide();
            } else if (!isValid && val === "") {
                $errSpan.text("Please enter a credit card number.")
                $errSpan.addClass("err-text").show();
            } else {
                $(this).addClass("err-border");
                $errSpan.text("Please enter a number that is between 13 and 16 digits long.")
                $errSpan.addClass("err-text").show();
            }
    showErrorBorder($(this), isValid)
        })

        $zipCode = $("#zip");
        $zipCode.keyup(function () {
            const val = $(this).val();
            const regex = /\d{5}/g;
            const isValid = regex.test(val);
    const span = $credErrP;
            
    showErrorBorder($(this), isValid);
    showErrorMessage(span, isValid, "Please enter a 5 digit zip code.")
        })

        $cvv = $("#cvv");
        $cvv.keyup(function () {
            const val = $(this).val();
            const regex = /\d{3}/g;
            const isValid = regex.test(val);
    const span = $credErrP;
            
    showErrorBorder($(this), isValid);
    showErrorMessage(span, isValid, "Please enter a 3 digit security code.")
})