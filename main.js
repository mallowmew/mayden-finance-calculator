"use strict"

const maximumLoan = 8000

const form = document.querySelector('form')
const adminFeeElement = document.querySelector('#admin-fee')
const totalToPayElement = document.querySelector('#total-to-pay')
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

  if (!formData.amount.valid) {
    console.log(formData.amount.message)
    document.querySelector('#amount-tip').innerText = formData.amount.message
    return
  }
  if (!formData.salary.valid) {
    console.log(formData.salary.message)
    document.querySelector('#salary-tip').innerText = formData.salary.message
    return
  }
  if (!formData.repayment.valid) {
    console.log(formData.repayment.message)
    document.querySelector('#repayment-tip').innerText = formData.repayment.message
    return
  } 
  // If nothing is wrong
  let amount = formData.amount.value 

  overPercentageElement.innerText = ''
  overPercentageFeeAmountElement.innerText = ''
  if (amount > (maximumLoan * 0.9)) {
    overPercentageElement.innerText = 'Over 90% of maximum loan amount: '
    overPercentageFeeAmountElement.innerText = '+£1000'
    amount += 1000
  }
  else if (amount > (maximumLoan * 0.8)) {
    overPercentageElement.innerText = 'Over 80% of maximum loan amount: '
    overPercentageFeeAmountElement.innerText = '+£500'
    amount += 500
  }

  let adminFee = amount * 0.05 // Calculate 5% admin fee
  adminFeeElement.innerText = '£' + adminFee.toFixed(2)
  amount += adminFee

  totalToPayElement.innerText = '£' + amount.toFixed(2)

  repaymentTimeElement.innerText = calculateRepaymentPeriod(amount, formData.salary.value, (formData.repayment.value / 100)) + ' months'
})

function validateAmount(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    if (value >= 1 && value <= 8000) {
      return {value: value, valid: true, message: 'Amount is OK!'}
    } else {
      return {value: value, valid: false, message: 'Amount is not in range.'}
    }
  } else {
    return {value: value, valid: false, message: 'Amount entered is not a number.'}
  }
}

function validateSalary(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    if (value > 0) {
      return {value: value, valid: true, message: 'Salary is OK!'}
    } else {
      return {value: value, valid: false, message: 'Salary must be above 0'}
    }
  }
  return {value: value, valid: false, message: 'Salary is not a number.'}
}

function validateRepayment(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    if (value >= 10 && value <= 100) {
      return {value: value, valid: true, message: 'Repayment is OK!'}
    } else {
      return {value: value, valid: false, message: 'Repayment is not in range.'}
    }
  } else {
    return {value: value, valid: false, message: 'Repayment is not a number'}
  }
}

function calculateRepaymentPeriod(amount, annualSalary, repay) {
  let monthlyPayment = (annualSalary / 12) * repay
  return Math.ceil(amount / monthlyPayment)
}