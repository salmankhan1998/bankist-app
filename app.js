'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// <------- Creating movements element in html page ----->
const displayMovements = function(movement){

  movement.forEach(function(value, index){

    const type = value > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${value}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  })
};
// displayMovemnet(account1.movements);

// <----- Calculating Summary Movements ---->
const calcDisplaySummary = function(movements){

  const income = movements.filter( incomeMove => incomeMove > 0).reduce( (acc, curVal, arr) => acc + curVal, 0);
  
  labelSumIn.textContent = `${income}€`;

  const out = movements.filter(outMove => outMove < 0 ).reduce( (acc, curOut, arr) => acc + curOut, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interestRate = 1.2/100;

  const interest = movements.filter( incomeMove => incomeMove > 0).map( (val, index) => val * interestRate).filter((int, i,arr) => int >= 1).reduce( (acc, sum) => acc + sum, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

//<----- Creating userNames ------>
const creatingUserNames = function(acc){
  acc.forEach(function(acc){
    acc.userName = acc.owner.toLowerCase().split(' ').map(acc => acc[0]).join(''); 
  })
};
creatingUserNames(accounts);

// <----------- Calculating Balance -------->
const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};
// calculateMovements(account1.movements);

document.querySelector('.logo').addEventListener('click',function(){
  containerApp.style.opacity = '1';
});

console.log(accounts);
//<---- Login code ---->

let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts.find( acc => acc.userName === inputLoginUsername.value);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;

    containerApp.style.opacity = '1';

    inputLoginUsername.value = inputLoginPin.value = '';

    UpdateUI(currentAccount);
  }
});

const UpdateUI = function(acc){
  //Display movements 
  displayMovements(acc.movements);

  //Display Balnace
  calcDisplayBalance(acc);

  //Display Summary
  calcDisplaySummary(acc.movements)
};

// Transfer Amount
btnTransfer.addEventListener('click', function(e){

  e.preventDefault();

  const receiverAcc = accounts.find( acc => acc.userName === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  console.log(amount,receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  if( amount > 0 &&
      receiverAcc && 
      currentAccount.balance >= amount &&
      receiverAcc?.userName !== currentAccount.userName)
    {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    UpdateUI(currentAccount);
  }

});

// Close Account
btnClose.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log("Close Account");

  if(inputCloseUsername.value === currentAccount.userName){

  }
});

/////////////////////////////////////////////////
// -------------- LECTURES ------------------

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Challenge # 2
const calDogAge = function(dogAge){
  const humanAge = dogAge.map( a => a <= 2 ? 2 * a : 16 + a * 4);
  const adults = humanAge.filter( b => b >= 18 );
  const avgAge = adults.reduce( (age, cur) => (age + cur), 0)/adults.length;
  // console.log(humanAge);
  // console.log(adults);
  //  console.log(avgAge);
}

// const calDogAge1 = dogAge => dogAge.map( a => a <= 2 ? 2 * a : 16 + a * 4).filter( b => b >= 18 ).reduce( (age, cur, i, arr) => age + cur / arr.length, 0);
calDogAge([5, 2, 4, 1, 15, 8, 3]);
calDogAge([16, 6, 10, 5, 6, 1, 4]);