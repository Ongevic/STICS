document.addEventListener("DOMContentLoaded", () => {
    const relabel = [
        ["mdbook-theme-light", "Amber"],
        ["mdbook-theme-rust", "Forest"],
        ["mdbook-theme-navy", "Night"],
    ];

    for (const [id, label] of relabel) {
        const button = document.getElementById(id);
        if (button) button.textContent = label;
    }

    for (const id of ["mdbook-theme-default_theme", "mdbook-theme-coal", "mdbook-theme-ayu"]) {
        const button = document.getElementById(id);
        if (button && button.parentElement) {
            button.parentElement.style.display = "none";
        }
    }
});
