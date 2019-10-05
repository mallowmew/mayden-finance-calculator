"use strict"

const maximumLoan = 8000

const form = document.querySelector('form')
const adminFeeElement = document.querySelector('#admin-fee')
const totalToPayElement = document.querySelector('#total-to-pay')
const overPercentageContainerElement = document.querySelector('#over-percentage-container')
const overPercentageElement = document.querySelector('#over-percentage')
const overPercentageFeeAmountElement = document.querySelector('#over-percentage-fee-amount')
const repaymentTimeElement = document.querySelector('#repayment-time')

form.addEventListener('change', e => {
  if (!form.amount.value || !form.salary.value || !form.repayment.value) {
    return // There is nothing to do without input in all 3 fields, return immediately if any are empty
  }

  let formData = {}
  formData.amount = validateAmount(parseInt(form.amount.value))
  formData.salary = validateSalary(parseInt(form.salary.value))
  formData.repayment = validateRepayment(parseInt(form.repayment.value))

  document.querySelector('#amount-tip').innerText = ''
  document.querySelector('#salary-tip').innerText = ''
  document.querySelector('#repayment-tip').innerText = ''
  if (!formData.amount.valid) {
    document.querySelector('#amount-tip').innerText = formData.amount.message
  }
  if (!formData.salary.valid) {
    document.querySelector('#salary-tip').innerText = formData.salary.message
  }
  if (!formData.repayment.valid) {
    document.querySelector('#repayment-tip').innerText = formData.repayment.message
  } 
  if (!formData.amount.valid || !formData.salary.valid || !formData.repayment.valid) {
    return
  }
  // If nothing is wrong
  let amount = formData.amount.value 
  let adminFee = amount * 0.05 // Calculate 5% admin fee
  adminFeeElement.innerText = '£' + adminFee.toFixed(2)

  overPercentageContainerElement.style = 'display: none'
  overPercentageElement.innerText = ''
  overPercentageFeeAmountElement.innerText = ''
  if (amount > (maximumLoan * 0.9)) {
    overPercentageContainerElement.style = 'display: block'
    overPercentageElement.innerText = 'Over 90% of maximum loan amount: '
    overPercentageFeeAmountElement.innerText = '+£1000'
    amount += 1000 // Apply over 90% fee
  }
  else if (amount > (maximumLoan * 0.8)) {
    overPercentageContainerElement.style = 'display: block'
    overPercentageElement.innerText = 'Over 80% of maximum loan amount: '
    overPercentageFeeAmountElement.innerText = '+£500'
    amount += 500 // Apply over 80% fee
  }
  amount += adminFee // Apply admin fee *after* over% fees, so that it doesn't kick you over the thresholds

  totalToPayElement.innerText = '£' + amount.toFixed(2)

  repaymentTimeElement.parentElement.style = 'display: block'
  repaymentTimeElement.innerText = calculateRepaymentPeriod(amount, formData.salary.value, (formData.repayment.value / 100))
})

form.dispatchEvent(new Event('change'))

function validateAmount(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    if (value >= 1 && value <= 8000) {
      return {
        value: value, valid: true, message: 'Amount OK!'
      }
    } else {
      return {
        value: value, valid: false, message: `The loan amount must be between £1 and £${maximumLoan}.`
      }
    }
  } else {
    return {value: value, valid: false, message: 'The loan amount you have entered is not a number.'}
  }
}

function validateSalary(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    if (value > 0) {
      return {value: value, valid: true, message: 'Salary OK!'}
    } else {
      return {value: value, valid: false, message: 'Your annual salary must be above 0 for this calculator to work.'}
    }
  }
  return {value: value, valid: false, message: 'The salary you have entered is not a number.'}
}

function validateRepayment(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    if (value >= 10 && value <= 100) {
      return {value: value, valid: true, message: 'Repayment OK!'}
    } else {
      return {value: value, valid: false, message: 'The repayment amount must at least 10%, and not over 100%.'}
    }
  } else {
    return {value: value, valid: false, message: 'The repayment amount you have entered is not a number'}
  }
}

function calculateRepaymentPeriod(amount, annualSalary, repay) {
  let monthlyPayment = (annualSalary / 12) * repay
  return Math.ceil(amount / monthlyPayment)
}