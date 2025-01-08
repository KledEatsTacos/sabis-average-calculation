# SABIS Average Calculation

This is a simple script to allow Sakarya University students to calculate their average on the university's SABIS system.

## How to Use

1. **Install Tampermonkey**

   Tampermonkey is a browser extension that allows you to inject scripts into web pages. You can install it from the [Tampermonkey website](https://www.tampermonkey.net/).

   ![Install Tampermonkey](screenshots/install_tampermonkey.png)

2. **Add the Script to Tampermonkey**

   After installing Tampermonkey, create a new script and paste the contents of [code.js](https://github.com/KledEatsTacos/sabis-average-calculation/blob/main/code.js) into it.

   ![Add script to Tampermonkey](screenshots/add_script.png)

3. **Navigate to the SABIS Grades Page**

   Go to the [SABIS Grades Page](https://obs.sabis.sakarya.edu.tr/Ders*) where your grades are listed.

4. **See Your Averages**

   The script will automatically calculate and display your average for each lesson.

   ![Script in action](screenshots/script_in_action.gif)

## Features

- Automatically calculates and displays the average for each lesson.
- Adds a field where you can add the grades yourself, to try and calculate how many marks you need in an exam/project to pass the class.

## How It Works

The script finds all lesson cards on the page, extracts the grades and their weights, and calculates the average for each lesson. It then inserts the calculated average back into the page.

## Notes

- The script assumes that the grades are in a specific format and may not work if the format changes, if bütünleme is included it will ruin the calculation.
- The script cannot determine the letter mark, since it varies from class to class.
