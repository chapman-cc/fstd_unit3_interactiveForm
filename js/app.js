$("#name").focus();

// JOB ROLE

const $titleInput = $("#title");
const $otherTitleInput = $("#other-title");
$otherTitleInput.css("display", "none");

$titleInput.change(function (e) {
    if ($(this).val() === "other") {
        $otherTitleInput.css("display", "inline")
    } else {
        $otherTitleInput.css("display", "none");
    }
})
if ($titleInput.val() === "other") {
    $otherTitleInput.css("display", "inline")
}