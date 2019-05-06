$("#name").focus();

// JOB ROLE

const $titleInput = $("#title");
const $otherTitleInput = $("#other-title");
$otherTitleInput.attr("type", "hidden")

$titleInput.change(function (e) {
    if ($(this).val() === "other") {
        $otherTitleInput.attr("type", "text")
    } else {
        $otherTitleInput.attr("type", "hidden")
    }
})

// T-shirt color

const $tshirtDesign = $("#design");
const $tshirtColor = $("#color");
const $colorsArray = $tshirtColor.children();

$tshirtDesign.change(function (e) {
    const tshirtcat = $(this).val();
    const mid = $colorsArray.length/2
    
    $colorsArray.each( function(i, ele) { //reset all options 
        ele.hidden = false;
    })

    if (tshirtcat === "js puns") {
        $colorsArray.each( function(i, ele) {
            ele.hidden = false
            if (i >= mid) {
                ele.hidden = true
            }
        })
    } else if (tshirtcat === "heart js") {
        $colorsArray.each( function(i, ele) {
            ele.hidden = false
            if (i < mid) {
                ele.hidden = true
            }
        })
    }
})