var globalCalculations = [
    {
      id: 1,
      description: "Soma (a + b):",
      calculate: function soma(a, b) {
        return Number(a) + Number(b)
      }
    },
  
    {
      id: 2,
      description: "Subtração 1 (a - b):",
      calculate: function subtracao(a, b) {
        return Number(a) - Number(b)
      }
    },

    {
      id: 3,
      description: "Subtração 2 (b - a):",
      calculate: function subtracao2(a, b) {
        return Number(b) - Number(a)
      }
    },

    {
      id: 4,
      description: "Multipicação (a x b):",
      calculate: function multiplicar(a, b) {
        return Number(a) * Number(b)
      }
    },

    {
      id: 5,
      description: "Divisão 1 (a ÷ b):",
      calculate: function dividir1(a, b) {
        if(b != 0){
          return (Number(a) / Number(b)).toFixed(2)
        }else{
          return b === 0
        }
        
      }
    },

    {
      id: 6,
      description: "Divisão 2 (b ÷ a):",
      calculate: function dividir2(a, b) {
        if(b != 0){
          return (Number(b) / Number(a)).toFixed(2)
        }else{
          return a === 0
        }
        
      }
    },

    {
      id: 7,
      description: "Quadarado de a (a²):",
      calculate: function quadrado(a, b) {
       return a * a 
     }

    },

    {
      id: 8,
      description: "Quadarado de b (b²):",
      calculate: function quadrado2(a, b) {
       return b * b 
     }

    },

    {
      id: 9,
      description: "Divisores inteiros de a:",
      calculate: function divisorA(a) {
        
        let aux = [];
        for (let i=1; i<=a; i++) {
          if (a % i==0) {
            aux.push(i);
          } 
        }
        return aux + "(" + aux.length + ")"
     }

    },

    {
      id: 10,
      description: "Divisores inteiros de b:",
      calculate: function divisorB(a, b) {
        
        let aux = [];
        for (let i=1; i<=b; i++) {
          if (b % i==0) {
            aux.push(i);
          } 
        }
        return aux + "(" + aux.length + ")"
     }

    },

    {
      id: 11,
      description: "Fatorial de a(a!):",
      calculate: function fatorialA(a, b) {
        let fat = 1;
        
        for(let i = 1;i <= a;i++){
          fat *=i;
          if(a > 21){
            return 'Número muito grande'
          }

          if(i == a) {
            return `${fat}`
          }
        }
     }

    },

    {
      id: 12,
      description: "Fatorial de b(b!):",
      calculate: function fatorialB(a, b) {
        let fat = 1;
        
        for(let i = 1;i <= b;i++){
          fat *=i;
          if(b > 21){
            return 'Número muito grande'
          }

          if(i == b) {
            return `${fat}`
          }
        }
     }

    },
  
  ];
  

  var globalInputA = document.getElementById("a");
  var globalInputB = document.getElementById("b");
  

  function start() {

    globalInputA.addEventListener("input", handleChangeInputA);
    globalInputB.addEventListener("input", handleChangeInputB);
  

    calculate();
  }
  
  
  function handleChangeInputA() {
    calculate();
  }
  
  function handleChangeInputB() {
    calculate();
  }
  

  function calculate() {

    var a = globalInputA.value;
    var b = globalInputB.value;
  
 
    var divCalculations = document.querySelector("#calculations");

    var innerCalculations = document.createElement("div");
  

    innerCalculations.classList.add("row");
  

    for (var i = 0; i < globalCalculations.length; i++) {

      var currentCalculation = globalCalculations[i];
  

      var id = "input_" + currentCalculation.id;
  

      var value = getCalculationFrom(
        currentCalculation.calculate,
        a,
        b
      );
  

      var div = getMaterializeDiv();
      var input = getMaterializeInput(id, value);
      var label = getMaterializeLabel(id, currentCalculation.description);
  
      div.appendChild(input);
      div.appendChild(label);
      innerCalculations.appendChild(div);
    }
  
    divCalculations.innerHTML = "";
    divCalculations.appendChild(innerCalculations);
  }

  function getMaterializeDiv() {
    var div = document.createElement("div");
    div.classList.add("input-field", "col", "s12", "m6", "l4");
  
    return div;
  }

  function getMaterializeInput(id, value) {
    var input = document.createElement("input");
    input.readOnly = true;
    input.type = "text";
    input.id = id;
    input.value = value;
  
    return input;
  }

  function getMaterializeLabel(id, description) {
    var label = document.createElement("label");
    label.for = id;
    label.textContent = description;
    label.classList.add("active");
  
    return label;
  }
  
  function getCalculationFrom(calculationFunction, a, b) {
   let value = calculationFunction(a, b);
  
    return value;
  }
  
  start();
  




