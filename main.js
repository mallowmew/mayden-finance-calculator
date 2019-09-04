"use strict"

const form = document.querySelector('form')
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
  console.log('Great! We can do maths now!')
  
})

function validateAmount(value) {
  if (typeof value === 'number' && !isNaN(value)) {
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
  if (typeof value === 'number' && !isNaN(value)) {
    if (value > 0) {
      return {valid: true, message: 'Salary is OK!'}
    } else {
      return {valid: false, message: 'Salary must be above 0'}
    }
  }
  return {valid: false, message: 'Salary is not a number.'}
}

function validateRepayment(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    if (value >= 10 && value <= 100) {
      return {valid: true, message: 'Repayment is OK!'}
    } else {
      return {valid: false, message: 'Repayment is not in range.'}
    }
  } else {
    return {valid: false, message: 'Repayment is not a number'}
  }
}
