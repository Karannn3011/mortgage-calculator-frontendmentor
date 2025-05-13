const amount = document.querySelector("#mortgage-amount");
const term = document.querySelector("#mortgage-term");
const interest = document.querySelector("#interest-rate"); 
const submit = document.querySelector(".submitbtn");
const clearbtn = document.querySelector(".clearbtn");
const repaymentbtn = document.querySelector("#repayment");
const interestbtn = document.querySelector("#interest-only");
const amounterror = document.querySelector(".amounterror");
const termerror = document.querySelector(".termerror");
const percentageerror = document.querySelector(".percentageerror");
const typeerror = document.querySelector(".typeerror");
const monthlyrepayment = document.querySelector(".monthly-repayment");
const totalrepayment = document.querySelector(".total-repayment");
const resultcomplete = document.querySelector(".result-complete");
const resultempty = document.querySelector(".result-empty");
const currency = document.querySelector(".currency");
const years = document.querySelector(".years");
const percentage = document.querySelector(".percentage");
const spanlabel = document.querySelector(".spanlabel");


clearbtn.addEventListener("click", () => {
    amount.value = "";
    term.value = "";
    interest.value = "";
    repaymentbtn.checked = false;
    interestbtn.checked = false;
    resultcomplete.style.display = "none";
    resultempty.style.display = "block";
})

function checkAmount() {
    if (amount.value === "") {
        amounterror.style.display = "block";
        currency.style.backgroundColor = "red";
        currency.style.color = "white";
        return false;
    } else {
        amounterror.style.display = "none";
        currency.style.backgroundColor = "var(--slate100)";
        currency.style.color = "var(--slate900)";
        return true;
    }
}
function checkTerm() {
    if (term.value === "") {
        termerror.style.display = "block";
        years.style.backgroundColor = "red";
        years.style.color = "white";
        return false;
    } else {
        termerror.style.display = "none";
        years.style.backgroundColor = "var(--slate100)";
        years.style.color = "var(--slate900)";
        return true;
    }
}
function checkInterest() {
    if (interest.value === "") {
        percentageerror.style.display = "block";
        percentage.style.backgroundColor = "red";
        percentage.style.color = "white";
        return false;
    } else {
        percentageerror.style.display = "none";
        percentage.style.backgroundColor = "var(--slate100)";
        percentage.style.color = "var(--slate900)";
        return true;
    }
}

function checkType() {
    console.log(repaymentbtn.checked);
    console.log(interestbtn.checked);
    if (repaymentbtn.checked == true || interestbtn.checked == true) {
        typeerror.style.display = "none";
        return true;
    } else {
        typeerror.style.display = "block";
        return false;
    }
}

function calculateRepayment() {
    const principal = parseFloat(amount.value);
    const years = parseFloat(term.value);
    const interestRate = parseFloat(interest.value) / 100 / 12;
    const payments = years * 12;
    monthlyrepayment.innerHTML = "";
    totalrepayment.innerHTML = "";

    if (repaymentbtn.checked) {
        const x = Math.pow(1 + interestRate, payments);
        const monthlyPayment = (principal * x * interestRate) / (x - 1);
        monthlyrepayment.innerHTML = `${monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
        totalrepayment.innerHTML = `${(monthlyPayment * payments).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
    } else if (interestbtn.checked) {
        const interestOnlyPayment = principal * interestRate;
        monthlyrepayment.innerHTML = `${interestOnlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
        totalrepayment.innerHTML = `${(interestOnlyPayment * payments).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }
}
submit.addEventListener("click", (e) => {
    e.preventDefault();
    checkAmount();
    checkTerm();
    checkInterest();
    checkType();
    amount.addEventListener("change", checkAmount);
    term.addEventListener("change", checkTerm);
    interest.addEventListener("change", checkInterest);
    repaymentbtn.addEventListener("change", checkType);
    interestbtn.addEventListener("change", checkType);
    // Check if all fields are valid before submitting
    if (checkAmount() && checkTerm() && checkInterest() && checkType()) {
        resultempty.style.display = "none";
        resultcomplete.style.display = "block";
        calculateRepayment();
    } else {
    }
})