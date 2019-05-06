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
