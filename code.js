// ==UserScript==
// @name         SABIS Ortalama Hesaplama
// @namespace    http://tampermonkey.net/
// @version      2024-02-23
// @description  Sabis marks calculator to show average of a student in a specific lesson
// @author       KledEatsTacos
// @match        https://obs.sabis.sakarya.edu.tr/Ders*
// ==/UserScript==

(function () {
    'use strict';

    function calculateAverages() {
        const averageTexts = document.querySelectorAll(".average-text");
        if (averageTexts.length > 0) {
            averageTexts.forEach(averageText => averageText.remove());
        }

        const cards = document.querySelectorAll(".card-body");
        const lessonCards = Array.from(cards).filter(card => card.querySelector("[onclick*=dersDetay]"));

        const allRows = lessonCards.map(card => {
            const rows = Array.from(card.querySelectorAll("tr"));
            return rows.slice(1, rows.length);
        });

        const notesAndWeights = allRows.map(rows => {
            return rows.map(row => {
                const columns = Array.from(row.querySelectorAll("td"));

                const weight = parseFloat(columns[0].innerText);
                const noteInput = columns[2].querySelector("input");

                if (noteInput) {
                    return {
                        note: noteInput.value || 0,
                        weight
                    };
                }

                if (columns[2].innerText.match(/[a-zA-Z]+/)) {
                    if (weight) {
                        columns[2].appendChild(createInput(0));
                    }

                    return {
                        note: 0,
                        weight: 0
                    };
                }

                // Replace them with inputs
                const NOTE = parseFloat(columns[2].innerText.replace(',', '.'));
                columns[2].innerHTML = "";
                columns[2].appendChild(createInput(NOTE));

                return {
                    note: NOTE || 0,
                    weight
                };
            });
        });

        notesAndWeights.forEach((notesAndWeight, index) => {
            let average = notesAndWeight.reduce((acc, curr) => {
                return acc + (curr.note / 100 * curr.weight);
            }, 0);

            if (Number.isNaN(average)) average = 0;

            lessonCards[index].querySelector("table").insertAdjacentHTML("beforeend", `
            <tr class="average-text">
                <td></td>
                <td><b>Ortalama</b></td>
                <td class="text-right">${average.toFixed(2)}</td>
            </tr>
        `);
        });
    }

    function createInput(value) {
        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("form-control");
        input.classList.add("float-right");
        input.classList.add("text-right");
        input.classList.add("px-0");
        input.classList.add("borderless-input"); // Add class to remove border

        input.setAttribute("min", 0);
        input.setAttribute("max", 100);
        input.style.width = "6rem";

        input.value = value ?? 0;

        input.addEventListener("input", () => {
            calculateAverages();
        });

        return input;
    }

    calculateAverages();

    // Add CSS to remove input borders and make the background transparent
    const style = document.createElement('style');
    style.innerHTML = `
        .borderless-input {
            border: none;
            background: transparent;
        }
        .borderless-input:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);

})();
