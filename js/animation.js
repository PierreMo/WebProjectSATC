window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
});

window.addEventListener("beforeunload", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
});
