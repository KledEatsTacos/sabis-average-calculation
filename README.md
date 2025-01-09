# SABIS Average Calculation

This is a simple script to allow Sakarya University students to calculate their average on the university's SABIS system.

## How to Use

1. **Install Tampermonkey**

   We will need a tool to inject this script into the webpage.
   Tampermonkey is a browser extension that allows you to inject scripts into web pages. You can install it from the [Tampermonkey website](https://www.tampermonkey.net/).
   Choose your preferred browser and install the extension.


3. **Add the Script to Tampermonkey**

   After installing Tampermonkey, create a new script and paste the contents of [code.js](https://github.com/KledEatsTacos/sabis-average-calculation/blob/main/code.js) into it. then save the file.

   ![image](https://github.com/user-attachments/assets/dd1eb53c-09ac-427e-945a-5dc1a248fd73)


4. **Navigate to the SABIS Grades Page**

   Go to the SABIS Grades Page, from there you will be able to change your grades and manipulate them, and see how many grades you need to get to pass your lessons!


## Features

- Automatically calculates and displays the average for each course.
- Adds a field where you can add the grades yourself, to try and calculate how many marks you need in an exam/project to pass the class.

## How It Works

The script finds all lesson cards on the page, extracts the grades and their weights, and calculates the average for each lesson. It then inserts the calculated average back into the page.

## Notes

- The script assumes that the grades are in a specific format and may not work if the format changes.
- The script cannot determine the letter grade.
