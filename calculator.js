
const calculator={
  displayVal:"0",
  firstOperand: null,
  waitingForSecondOperand:false,
  operator:null,
};

console.log(calculator.displayVal);

function updateScreen(){
  document.getElementById("calculation").innerHTML=calculator.displayVal;
}
updateScreen();

const keys=document.querySelectorAll(".tg td");
if(keys){

  keys.forEach(e=>e.addEventListener("click",function (event){
    const{target}=event;
    if(target.classList.contains("operator")){
      //console.log("operator",target.innerHTML);
      handleOperator(target.innerHTML);
      
    }
    if(target.classList.contains("numpad")){
      //console.log("numpad",target.innerHTML);
      inputVal(target.innerHTML);
     
    }
    if(target.classList.contains("decimal")){
      inputDec(target.innerHTML);
      
    }
    if(target.classList.contains("all-clear")){
     // console.log("all-clear",target.innerHTML);
      ClearScreen();
     
    }
    updateScreen();
    return;
  }));

  
}

function inputVal(digit){
  const {displayVal, waitingForSecondOperand}=calculator;

  if(waitingForSecondOperand===true){
    calculator.displayVal=digit;
    calculator.waitingForSecondOperand=false;
  }else{
    const { displayVal } = calculator;
    if(displayVal==="0"){
      calculator.displayVal=digit;
      return;
    }else{
      calculator.displayVal= displayVal + digit;
      return;
    }
  }
}

function inputDec(decimal){
  
  if(calculator.waitingForSecondOperand===true) return;

  if(calculator.displayVal.includes(decimal)){
    calculator.displayVal+=decimal;
  }
}

function handleOperator(nOperator){
  const {firstOperand, displayVal, operator}=calculator;
  const inputVal=parseFloat(displayVal);

  if(operator && calculator.waitingForSecondOperand){
    calculator.operator=nOperator;
    console.log(calculator);
    return;
  }

  if(firstOperand==null){
    calculator.firstOperand=inputVal;
  }else if(operator){
    const currentVal=firstOperand||0;
    
    const result=performCal[operator](currentVal,inputVal);
    calculator.displayVal=String(result);
    calculator.firstOperand=result;
  }

  calculator.waitingForSecondOperand=true;
  calculator.operator=nOperator;
  console.log(calculator);
}


const performCal={
  "+": (firstOperand, secondOperand)=> firstOperand + secondOperand,

  "*": (firstOperand, secondOperand)=> firstOperand * secondOperand,
  
  "/": (firstOperand, secondOperand)=> firstOperand / secondOperand,
  
  "-": (firstOperand, secondOperand)=> firstOperand - secondOperand,
  
  "=": (firstOperand, secondOperand)=> secondOperand

};

function ClearScreen(){
  calculator.displayVal="0";
  calculator.firstOperand=null;
  calculator.waitingForSecondOperand=false;
  calculator.operator=null;
  console.log(calculator);
}



