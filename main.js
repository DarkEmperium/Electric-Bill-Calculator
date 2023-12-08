var defaultRate = 0.334;
var currentRate = defaultRate;

function changerate() {
    var latestRateInput = document.getElementById('rate');
    var latestRate = parseFloat(latestRateInput.value);

    if (!isNaN(latestRate)) {
        currentRate = latestRate;
        recalculateAllRates();
        calculateTotalCost();

        // Trigger calculateWaterBill() after 1 seconds
        setTimeout(calculateWaterBill, 1000);
    } else {
        // Handle invalid input or no input
        alert('Invalid rate entered. Please enter a valid number.');
    }
}

function recalculateAllRates() {
    var sections = document.getElementsByClassName('rate-section');

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i].getAttribute('data-section');
        calculateCost(section);
    }
}

function calculateCost(section) {
    var thisMonthKWh = parseFloat(document.getElementById('thisMonthKWh' + section).value);
    var lastMonthKWh = parseFloat(document.getElementById('lastMonthKWh' + section).value);
    var electricUsed = thisMonthKWh - lastMonthKWh;
    var cost = electricUsed * currentRate;

    document.getElementById('result' + section).innerHTML = cost.toFixed(2);
}

function calculateTotalCost() {
    var totalCost = 0;
    var sectionCount = 15; // Number of sections

    for (var i = 1; i <= sectionCount; i++) {
        calculateCost(i);
        var resultElement = document.getElementById('result' + i);
        var result = parseFloat(resultElement.innerHTML);

        if (!isNaN(result) && resultElement.innerHTML !== "") {
            totalCost += result;
        } else {
            resultElement.innerHTML = ""; // Clear the output for sections without values
        }
    }

    document.getElementById('totalCost').innerHTML = totalCost.toFixed(2);
}

function toggleRateSection() {
    var rateSection = document.getElementById('rateSection');
    if (rateSection.style.display === 'none') {
        rateSection.style.display = 'block';
    } else {
        rateSection.style.display = 'none';
    }
}

function calculateTotal() {
    // Get the values from the input fields
    var electricBill = parseFloat(document.getElementById('electricBill').value);
    var waterBill = parseFloat(document.getElementById('waterBill').value);
    var individualBill = parseFloat(document.getElementById('individualBill').value);
    var divideBy = parseFloat(document.getElementById('divideBy').value);

    // Calculate the total bill
    var totalBill = (electricBill + waterBill) - individualBill;
    var dividedTotal = totalBill / divideBy;

    // Update the table with the results
    document.getElementById('dividedTotal').textContent = dividedTotal.toFixed(2);
}

// Function to copy totalCost value to individualBill
function copyTotalCostToIndividualBill() {
    // Get the value of totalCost
    var totalCost = parseFloat(document.getElementById('totalCost').innerHTML);

    // Update the value of individualBill with totalCost
    document.getElementById('individualBill').value = totalCost.toFixed(2);
}

// Function to check totalCost value periodically
function checkTotalCostValue() {
    // Get the value of totalCost
    var totalCost = document.getElementById('totalCost').innerHTML;

    // Check if totalCost has a value
    if (totalCost !== '') {
        copyTotalCostToIndividualBill();
    }
}

// Check totalCost value every 1 second (adjust the interval as needed)
setInterval(checkTotalCostValue, 1000);


function printFunction() {
    window.print();
}

function calculateWaterBill() {
    var dividedTotal = parseFloat(document.getElementById('dividedTotal').textContent);
    var sectionCount = 1; // Assuming there is at least one section
    var hasValue = false; // Flag to track if any value is detected
    var totalWaterCost = 0; // Variable to store the total water cost

    while (true) {
        var resultElement = document.getElementById('result' + sectionCount);
        var waterResultElement = document.getElementById('waterresult' + sectionCount);

        if (!resultElement) {
            break; // No more sections found, exit the loop
        }

        var resultValue = parseFloat(resultElement.textContent);

        if (!isNaN(resultValue)) {
            hasValue = true;
            var waterResult = dividedTotal + resultValue;
            waterResultElement.textContent = waterResult.toFixed(2);

            totalWaterCost += waterResult; // Accumulate the water result value
        }

        sectionCount++;
    }

    var totalWaterCostElement = document.getElementById('totalWaterCost');
    totalWaterCostElement.textContent = totalWaterCost.toFixed(2); // Display the total water cost

    if (!hasValue) {
        alert('No values were detected in the table.');
    }
}



