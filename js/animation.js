window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        const delay = Math.random() * 2000 + 1000;

        setTimeout(() => {
            loader.style.display = "none";
        }, delay);
    }
});


window.addEventListener("beforeunload", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
});
