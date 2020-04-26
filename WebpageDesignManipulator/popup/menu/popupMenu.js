function changePage() {
    window.location.replace("popup/popup.html");
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("ChangeMenu").addEventListener("click", changePage);
});
  