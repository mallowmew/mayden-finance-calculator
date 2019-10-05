# Mayden Academy Finance Calculator Challenge
Module 6 Challenge: Use frontend technologies to develop a finance calculator for Mayden Academy.

I quite like the pattern I adopted for frontend validation (`main.js`) and want to use it again somewhere.

I decided to use Sass just for practice.

## Challenge
Build a finance calculator that accepts:

+ The amount you would like to borrow (£)
+ Your expected salary (£): default £25,000
+ Monthly repayment percentage: default/minimum 10%

The calculator should tell you the admin fee required to borrow the money, how long it will take you to pay off and the total amount that you will have borrowed.

### Requirements:

+ Borrow amount between £1 and £8000
+ If borrowing above 80% (£6400) then add £500 to repayment amount
+ If borrowing above 90% (£7200) then add a further £500 to repayment amount
+ Display 5% of total borrowed amount as upfront admin fee
