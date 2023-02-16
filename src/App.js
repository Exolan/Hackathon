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

        for (const el in ws.Financials) {
          const element = ws.Financials[el]
          console.log(ws.Financials[el]);
          if (el.includes("!ref")) {
            continue;
          }

          if (el.includes("1") && el.length == 2) {
            columnName.push(element.w);
          }
          else{
            arrayStrings.push(element.w)
          }

        }
        // console.log(columnName);
        // console.log(arrayStrings);

        const parser = (columns, strings) => {
          const array = []
          let counter = 0;
          let object = {}
          for (let i = 0; i < strings.length; i++) {
            object[columns[counter]] = strings[i]
            counter++
            if (counter == columns.length) {
              counter = 0
              array.push(object)
              object = {}
            }
          }
          return array
        }

        const mainArray = parser(columnName, arrayStrings)

        console.log(mainArray);


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
