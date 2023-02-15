import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [text, changeText] = useState("");

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const ws = wb.Sheets;

        const array = Object.entries(ws.Financials);

        const columnName = [];
        const arrayStrings = [];
        let counter = '';

        for (const el in array) {
          console.log(array[el]);
          if (array[el][0].includes("!ref")) {
            continue;
          }

          if (array[el][0].includes("1") && array[el][0].length == 2) {
            columnName.push(array[el][1].v);
          }
          // else{
            
          // }
        }

        console.log(columnName);

        // changeText(JSON.stringify(ws.Financials));
      };
    });
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      ></input>
      <h1>{text}</h1>
    </div>
  );
}

export default App;
