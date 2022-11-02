import { useState, useRef } from 'react';
import Operations from './components/Operations';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  function handelClick(operator, value) {
    const val = { operator: operator, value: value };
    const copyListItems = [...list];
    copyListItems.push(val);
    setList(copyListItems);
  }
  async function handelSummit() {
    console.log(list)
    const res = await fetch('http://localhost:3001/api/test', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        list
      )
    })

    const data = await res.json();
    if (data.success === "false") {
      alert('False');
    }
    else if (data.success === "true") {
      alert('True');
    }
    else {
      alert(data.success);
    }
  }
  function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
  }
  function handelInput() {
    let person = prompt("Please enter your the value", "");
    if (person != "" && isInt(person)) {
      const val = { operator: "operand", value: person };
      const copyListItems = [...list];
      copyListItems.push(val);
      setList(copyListItems);
    }
  }

  function handelClear() {
    setList([]);
  }
  return (
    <div className="App">
      <div class="operands">
        <div class="operand" onClick={() => handelClick("operand", "A")} data-value="1">A</div>
        <div class="operand" onClick={() => handelClick("operand", "B")} draggable="true" data-value="2">B</div>
        <div class="operand" onClick={() => handelClick("operand", "C")} draggable="true" data-value="3">C</div>
        <div class="operand" onClick={() => handelClick("operand", "D")} draggable="true" data-value="4">D</div>
        <div class="operand" onClick={() => handelClick("operand", "E")} draggable="true" data-value="5">E</div>
      </div>

      <div class="operators">
        <div class="operator" onClick={() => handelClick("operator", "+")} draggable="true" data-value="+">+</div>
        <div class="operator" onClick={() => handelClick("operator", "-")} draggable="true" data-value="-">-</div>
        <div class="operator" onClick={() => handelClick("operator", "*")} draggable="true" data-value="*">*</div>
        <div class="operator" onClick={() => handelClick("operator", "/")} draggable="true" data-value="/">/</div>
        <span class="space"></span>
        <div class="comparator" onClick={() => handelClick("operator", "<")} data-value="<">&lt;</div>
        <div class="comparator" onClick={() => handelClick("operator", ">")} data-value=">">&gt;</div>
        <span class="space"></span>
        <div class="rhs" onClick={() => handelInput()}>RHS Integer</div>
      </div>

      <div class="canvas">
        {
          list.map((item, index) => (
            <Operations item={item} />
          ))
        }

      </div>

      <div>
        <button onClick={() => handelSummit()} type="button" class="buttonContainer btn btn-primary">Evalute</button>
      </div>
      <div>
        <button onClick={() => handelClear()}type="button" class="buttonContainer btn btn-primary">Clear</button>
      </div>
    </div>
  );
}

export default App;
