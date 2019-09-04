"use strict"

const form = document.querySelector('form')
form.addEventListener('change', e => {
  let formData = {}
  formData.amount = parseInt(form.amount.value)
  formData.salary = parseInt(form.salary.value)
  formData.repayment = parseInt(form.repayment.value)
  console.log(validateAmount(formData.amount))
  console.log(validateSalary(formData.salary))
  console.log(validateRepayment(formData.repayment))
})

function validateAmount(value) {
  if (typeof value === 'number') {
    if (value >= 1 && value <= 8000) {
      return {valid: true, message: 'Amount is OK!'}
    } else {
      return {valid: false, message: 'Amount is not in range.'}
    }
  } else {
    return {valid: false, message: 'Amount entered is not a number.'}
  }
}

function validateSalary(value) {
  if (typeof value === 'number') {
    if (value > 0) {
      return {valid: true, message: 'Salary is OK!'}
    } else {
      return {valid: false, message: 'Salary must be above 0'}
    }
  }
  return {valid: false, message: 'Salary is not a number.'}
}

function validateRepayment(value) {
  if (typeof value === 'number') {
    if (value >= 10 && value <= 100) {
      return {valid: true, message: 'Repayment is OK!'}
    } else {
      return {valid: false, message: 'Repayment is not in range.'}
    }
  } else {
    return {valid: false, message: 'Repayment is not a number'}
  }
}
