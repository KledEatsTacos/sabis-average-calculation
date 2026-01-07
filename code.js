// ==UserScript==
// @name         SABIS Ortalama Hesaplama
// @namespace    http://tampermonkey.net/
// @version      07/01/2026
// @description  Sabis marks calculator - Fixed for slow loading
// @author       KledEatsTacos
// @match        https://obs.sabis.sakarya.edu.tr/Ders*
// ==/UserScript==

(function () {
    'use strict';

    // there is an issue in some browsers where the script loads before the cards do, so it doesn't work.
    // this will make it check every half second until the cards are loaded
    function waitForGrades() {
        const cards = document.querySelectorAll(".card-body");
        if (cards.length > 0 && cards[0].innerText.length > 0) {
            calculateAverages();
        } else {
            setTimeout(waitForGrades, 500);
        }
    }

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

                if (columns.length < 3) return { note: 0, weight: 0 };

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

            const table = lessonCards[index].querySelector("table");
            if (table) {
                table.insertAdjacentHTML("beforeend", `
                <tr class="average-text">
                    <td></td>
                    <td><b>Ortalama</b></td>
                    <td class="text-right">${average.toFixed(2)}</td>
                </tr>
            `);
            }
        });
    }

    function createInput(value) {
        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("form-control", "float-right", "text-right", "px-0", "borderless-input");
        input.setAttribute("min", 0);
        input.setAttribute("max", 100);
        input.style.width = "6rem";
        input.value = value ?? 0;

        input.addEventListener("input", () => {
            calculateAverages();
        });

        return input;
    }

    // Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .borderless-input { border: none; background: transparent; }
        .borderless-input:focus { outline: none; }
    `;
    document.head.appendChild(style);

    //starts here
    waitForGrades();

})();
