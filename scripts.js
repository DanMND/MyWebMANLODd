// Conversion
function convertCtoF() {
  let c = parseFloat(document.getElementById("celsius").value);
  if (isNaN(c)) return;
  document.getElementById("result1").innerText = ((c * 9/5) + 32).toFixed(2) + " °F";
}

function convertFtoC() {
  let f = parseFloat(document.getElementById("fahrenheit").value);
  if (isNaN(f)) return;
  document.getElementById("result2").innerText = ((f - 32) * 5/9).toFixed(2) + " °C";
}

function convertMtoFt() {
  let m = parseFloat(document.getElementById("meters").value);
  if (isNaN(m)) return;
  document.getElementById("result3").innerText = (m * 3.28084).toFixed(2) + " ft";
}

function convertFttoM() {
  let ft = parseFloat(document.getElementById("feet").value);
  if (isNaN(ft)) return;
  document.getElementById("result4").innerText = (ft / 3.28084).toFixed(2) + " m";
}

// Income Tax
function computeTax() {
  let income = parseFloat(document.getElementById("income").value);
  let tax = 0;
  if (income <= 250000) tax = 0;
  else if (income <= 400000) tax = (income - 250000) * 0.20;
  else if (income <= 800000) tax = 30000 + (income - 400000) * 0.25;
  else if (income <= 2000000) tax = 130000 + (income - 800000) * 0.30;
  else if (income <= 8000000) tax = 490000 + (income - 2000000) * 0.32;
  else tax = 2410000 + (income - 8000000) * 0.35;
  document.getElementById("taxResult").innerText = "Income Tax: ₱" + tax.toLocaleString();
}

function clearTax() {
  const incomeEl = document.getElementById('income');
  const resultEl = document.getElementById('taxResult');
  if (incomeEl) incomeEl.value = '';
  if (resultEl) resultEl.innerText = '';
  if (incomeEl) incomeEl.focus();
}

// Loops
function factorial() {
  let n = parseInt(document.getElementById("factN").value);
  let i = 1, f = 1;
  while (i <= n) { f *= i; i++; }
  document.getElementById("factResult").innerText = f;
}

function sumNumbers() {
  let n = parseInt(document.getElementById("sumN").value);
  let i = 1, s = 0;
  do { s += i; i++; } while (i <= n);
  document.getElementById("sumResult").innerText = s;
}

function averageNumbers() {
  let n = parseInt(document.getElementById("avgN").value);
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  document.getElementById("avgResult").innerText = (sum / n).toFixed(2);
}

// Payroll
let payroll = [];

function addEmployee() {
  const nameEl = document.getElementById("name");
  const daysEl = document.getElementById("days");
  const rateEl = document.getElementById("rate");
  const dedEl = document.getElementById("deduction");

  const name = nameEl.value.trim();
  const days = parseFloat(daysEl.value) || 0;
  const rate = parseFloat(rateEl.value) || 0;
  const ded = parseFloat(dedEl.value) || 0;

  if (!name) {
    nameEl.focus();
    return;
  }

  payroll.push({ name, days, rate, ded });
  showPayroll();

  nameEl.value = "";
  daysEl.value = "";
  rateEl.value = "";
  dedEl.value = "";
  nameEl.focus();
}

function deleteEmployee() {
  const deleteEl = document.getElementById("deleteIndex");
  const raw = deleteEl.value;
  const index = parseInt(raw, 10);

  if (isNaN(index)) {
    deleteEl.focus();
    return;
  }

  const arrIndex = index - 1;
  if (arrIndex >= 0 && arrIndex < payroll.length) {
    payroll.splice(arrIndex, 1);
    showPayroll();
    deleteEl.value = "";
    deleteEl.focus();
  } else {
 // invalid
    deleteEl.focus();
  }
}

function showPayroll() {
  let tbody = document.getElementById("payrollTable");
  tbody.innerHTML = "";
  if (payroll.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="7">No employees added yet</td></tr>`;
    return;
  }

  payroll.forEach((emp, i) => {
    let gross = emp.days * emp.rate;
    let net = gross - emp.ded;
    tbody.innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${emp.name}</td>
      <td>${emp.days}</td>
      <td>${emp.rate}</td>
      <td>${gross}</td>
      <td>${emp.ded}</td>
      <td>${net}</td>
    </tr>`;
  });
}


function _preventCopyBehaviorOn(el) {
  if (!el) return;
  el.addEventListener('copy', (e) => e.preventDefault());
  el.addEventListener('cut', (e) => e.preventDefault());
  el.addEventListener('contextmenu', (e) => e.preventDefault());
  el.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'C' || e.key === 'X')) {
      e.preventDefault();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="search"], textarea');
  els.forEach(_preventCopyBehaviorOn);
});