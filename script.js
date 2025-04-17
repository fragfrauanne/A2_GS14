const tasks = [
    { question: "Meine Oma ist krank.", answer: "Meine Oma war krank." },
    { question: "Ich darf abends nicht allein weggehen.", answer: "Ich durfte abends nicht allein weggehen." },
    { question: "Er hilft seinem kleinen Bruder.", answer: "Er hat seinem kleinen Bruder geholfen." },
    { question: "Emily muss auf ihre kleine Schwester aufpassen.", answer: "Emily musste auf ihre kleine Schwester aufpassen." },
    { question: "Ich bleibe zwei Jahre in den USA.", answer: "Ich bin zwei Jahre in den USA geblieben." },
    { question: "Ich treffe sie jeden Tag im Kurs.", answer: "Ich habe sie jeden Tag im Kurs getroffen." },
    { question: "Meine Großeltern haben wenig Geld.", answer: "Meine Großeltern hatten wenig Geld." },
    { question: "Lukas fühlt sich bei seinen Großeltern wohl.", answer: "Lukas hat sich bei seinen Großeltern wohlgefühlt." },
    { question: "Tim lernt Lara im Deutschkurs kennen.", answer: "Tim hat Lara im Deutschkurs kennengelernt." },
    { question: "Ich kann kein Wort Deutsch.", answer: "Ich konnte kein Wort Deutsch." },
    { question: "Im Sommer bekommt sie ein Kind.", answer: "Im Sommer hat sie ein Kind bekommen." },
    { question: "Ich gehe neun Jahre zur Schule.", answer: "Ich bin neun Jahre zur Schule gegangen." },
    { question: "Die alte Dame stirbt.", answer: "Die alte Dame ist gestorben." },
    { question: "Dein Stift fällt auf den Boden.", answer: "Dein Stift ist auf den Boden gefallen." },
    { question: "Wir wollen ein großes Haus kaufen.", answer: "Wir wollten ein großes Haus kaufen." },
    { question: "Wir stehen um 7 Uhr auf.", answer: "Wir sind um 7 Uhr aufgestanden." },
    { question: "Es passiert nichts.", answer: "Es ist nichts passiert." },
    { question: "Hasan soll an der Universität studieren.", answer: "Hasan sollte an der Universität studieren." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);