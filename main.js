"use strict"

const form = document.querySelector('form')
form.addEventListener('change', e => {
  console.log(form.amount.value)
  console.log(form.salary.value)
  console.log(form.repayment.value)
})


