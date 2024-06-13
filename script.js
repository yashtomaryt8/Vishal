document.addEventListener("DOMContentLoaded", () => {
    updateLoanAmount();
});

function updateLoanAmount() {
    const loanType = document.getElementById('loan-type').value;
    let maxAmount;
    switch (loanType) {
        case 'car':
            maxAmount = 1000000;
            break;
        case 'home':
            maxAmount = 20000000;
            break;
        case 'bike':
            maxAmount = 150000;
            break;
        case 'personal':
            maxAmount = 10000000;
            break;
        default:
            maxAmount = 0;
    }
    document.getElementById('loan-amount').max = maxAmount;
    document.getElementById('max-amount-info').innerText = `Maximum amount for ${loanType} loan is ${maxAmount}.`;
}

function checkMaxAmount() {
    const loanType = document.getElementById('loan-type').value;
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    let maxAmount;
    switch (loanType) {
        case 'car':
            maxAmount = 1000000;
            break;
        case 'home':
            maxAmount = 20000000;
            break;
        case 'bike':
            maxAmount = 150000;
            break;
        case 'personal':
            maxAmount = 10000000;
            break;
        default:
            maxAmount = 0;
    }
    if (loanAmount > maxAmount) {
        alert(`You entered more than the max amount for ${loanType}. The maximum amount is ${maxAmount}.`);
        document.getElementById('loan-amount').value = maxAmount;
    }
}

function calculateEMI() {
    const principal = parseFloat(document.getElementById('loan-amount').value);
    const annualInterestRate = parseFloat(document.getElementById('interest-rate').value);
    const tenureYears = parseInt(document.getElementById('loan-tenure').value);

    if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(tenureYears)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const interestRate = annualInterestRate / 12 / 100;
    const tenureMonths = tenureYears * 12;
    const emi = (principal * interestRate * Math.pow(1 + interestRate, tenureMonths)) / (Math.pow(1 + interestRate, tenureMonths) - 1);
    
    const emiTableBody = document.getElementById('emi-table-body');
    emiTableBody.innerHTML = '';

    let remainingPrincipal = principal;
    let totalInterest = 0;
    let totalPrincipalPaid = 0;

    for (let i = 1; i <= tenureMonths; i++) {
        const interestPaid = remainingPrincipal * interestRate;
        const principalPaid = emi - interestPaid;
        remainingPrincipal -= principalPaid;

        totalInterest += interestPaid;
        totalPrincipalPaid += principalPaid;

        const row = document.createElement('tr');
        const monthCell = document.createElement('td');
        const emiCell = document.createElement('td');
        const interestCell = document.createElement('td');
        const principalCell = document.createElement('td');
        
        monthCell.innerText = i;
        emiCell.innerText = emi.toFixed(2);
        interestCell.innerText = interestPaid.toFixed(2);
        principalCell.innerText = principalPaid.toFixed(2);
        
        row.appendChild(monthCell);
        row.appendChild(emiCell);
        row.appendChild(interestCell);
        row.appendChild(principalCell);
        emiTableBody.appendChild(row);
    }

    const totalPayable = totalPrincipalPaid + totalInterest;
    const extraInterest = totalInterest;

    const summaryTableBody = document.getElementById('summary-table-body');
    summaryTableBody.innerHTML = `
        <tr>
            <td>Total Loan Amount</td>
            <td>${principal.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Total Interest Paid</td>
            <td>${totalInterest.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Total Payable Amount</td>
            <td>${totalPayable.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Extra Interest Paid</td>
            <td>${extraInterest.toFixed(2)}</td>
        </tr>
    `;

    document.getElementById('result').style.display = 'block';
}
