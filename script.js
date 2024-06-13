document.addEventListener("DOMContentLoaded", () => {
    updateLoanAmount();
});

function updateLoanAmount() {
    const loanType = document.getElementById('loan-type').value;
    let loanAmount;
    switch (loanType) {
        case 'car':
            loanAmount = 1000000;
            break;
        case 'home':
            loanAmount = 2000000;
            break;
        case 'bike':
            loanAmount = 150000;
            break;
        case 'personal':
            loanAmount = 0; // Assuming user will input custom amount for personal loans
            break;
        default:
            loanAmount = 0;
    }
    document.getElementById('loan-amount').value = loanAmount;
}

function calculateEMI() {
    const principal = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 12 / 100;
    const tenure = parseInt(document.getElementById('loan-tenure').value) * 12;

    if (isNaN(principal) || isNaN(interestRate) || isNaN(tenure)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const emi = (principal * interestRate * Math.pow(1 + interestRate, tenure)) / (Math.pow(1 + interestRate, tenure) - 1);
    
    const emiTableBody = document.getElementById('emi-table-body');
    emiTableBody.innerHTML = '';
    
    for (let i = 1; i <= tenure; i++) {
        const row = document.createElement('tr');
        const monthCell = document.createElement('td');
        const emiCell = document.createElement('td');
        
        monthCell.innerText = i;
        emiCell.innerText = emi.toFixed(2);
        
        row.appendChild(monthCell);
        row.appendChild(emiCell);
        emiTableBody.appendChild(row);
    }

    document.getElementById('result').style.display = 'block';
}
