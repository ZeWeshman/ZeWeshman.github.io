
        function shorten() {
            const input = document.getElementById("input").value;
            const result = document.getElementById("result");
            try {
                let url;
                if (!input.startsWith("http://") && !input.startsWith("https://")) {
                    url = new URL("https://" + input);
                } else {
                    url = new URL(input);
                }
                const id = url.searchParams.get("v");
                const t = url.searchParams.get("t");
                if (id) {
                    let shortUrl = "https://youtu.be/" + id;
                    if (t) {
                        shortUrl += "?t=" + encodeURIComponent(t);
                    }
                    result.innerHTML = shortUrl;
                    alert("Lien racourci : " + shortUrl);
                } else if (input.startsWith("youtu.be/") || input.startsWith("https://youtu.be/")) {
                    const baseUrl = input.split("?")[0];
                    let cleanUrl = baseUrl;
                    if (t) {
                        cleanUrl += "?t=" + encodeURIComponent(t);
                    }
                    result.innerHTML = cleanUrl;
                    alert("Lien nettoyé : " + cleanUrl);
                } else if (url.hostname.includes("music.youtube.com")) {
                    if (id) {
                        let cleanMusicUrl = "https://music.youtube.com/watch?v=" + id;
                        if (t) {
                            cleanMusicUrl += "&t=" + encodeURIComponent(t);
                        }
                        result.innerHTML = cleanMusicUrl;
                        alert("Lien nettoyé : " + cleanMusicUrl);
                    } else {
                        alert("Veuillez entrer un lien YouTube Music valide.");
                    }
                } else {
                    alert("Veuillez entrer un lien YouTube valide.");
                }
            } catch (e) {
                alert("Veuillez entrer un lien YouTube valide.");
            }
        }

        function validateInput() {
            const input = document.getElementById("input").value;
            const error = document.getElementById("error");
            try {
                const url = new URL(input.startsWith("http") ? input : "https://" + input);
                if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
                    error.textContent = "";
                    return true;
                } else {
                    error.textContent = "Veuillez entrer un lien YouTube valide.";
                    return false;
                }
            } catch {
                error.textContent = "Veuillez entrer un lien YouTube valide.";
                return false;
            }
        }

        function copyToClipboard() {
            const result = document.getElementById("result").textContent;
            if (result) {
                navigator.clipboard.writeText(result).then(() => {
                    alert("Lien copié dans le presse-papier !");
                });
            } else {
                alert("Aucun lien à copier.");
            }
        }

        document.addEventListener("DOMContentLoaded", function () {
            const inputField = document.getElementById("input");
            const submitButton = document.getElementById("submit");
            const copyButton = document.getElementById("copy");

            inputField.addEventListener("input", validateInput);
            submitButton.addEventListener("click", function (event) {
                if (validateInput()) {
                    shorten();
                }
            });

            inputField.addEventListener("keypress", function (event) {
                if (event.key === "Enter" && validateInput()) {
                    shorten();
                }
            });

            copyButton.addEventListener("click", copyToClipboard);
        });
