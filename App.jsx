import React, { useState, useEffect } from "react";
import "./App.css";
// funkce float pouzivana u prompt
import validateFloat from "./functions/validateFloat";
// RbGROUP radio btn
import RbGroup from "./components/RbGroup";
// ChbGroup checkbox
import ChbGroup from "./components/ChbGroup";
// input pocet kopecku
import NumImp from "./components/NumImp";
// select vyber druhu
import Select from "./components/Select";
// range zaplneni disku
import Range from "./components/Range";
// vypis casu
import Clock from "./components/Clock";
// progress bar
import ProgressBar from "./components/ProgressBar";
// scitance
import TextBox from "./components/TextBox";
// tlacitka
import Button from "./components/Button";
// textarea
import TextArea from "./components/TextArea"
// File
import File from "./components/File"
// Download
import saveText from "./functions/saveText"

function App() {
   //  prichut
   const [radioPrichut, setRadioPrichut] = useState("vanilková");
   //  navic
   const [checkboxNavic, setCheckboxNavic] = useState([]);
   // pocet
   const [pocetKopecku, setPocetKopecku] = useState(1);
   //  druh
   const druhy = ["smetanová", "jogurtová", "nízkotučná"];
   const [druhZmrzliny, setDruhZmrzliny] = useState("smetanová");
   //  misto
   const [mistoDisk, setMistoDisk] = useState(50);
   //  odpocet
   const odpocet = 7;
   const [zbyvaOdpocet, setZbyvaOdpocet] = useState(odpocet);
   // scitanec 1
   const [scitanec1, setscitanec1] = useState(0);
   // scitanec 1
   const [scitanec2, setscitanec2] = useState(0);
   //  soucet
   const [soucetCisel, setSoucetCisel] = useState(
      "Zadejte validní sčítance a zmáčkněte tlačítko výpočtu"
   );
    //  text area
    const [textArea, setTextArea] = useState("");

   // odpocet
   useEffect(() => {
      if (odpocet > 0) {
         const timer = setInterval(() => {
            setZbyvaOdpocet(zbyvaOdpocet - 1);
         }, 1000);
         return () => clearInterval(timer);
      }
   }, [zbyvaOdpocet]);
   //  progress bar
   const progress =
      zbyvaOdpocet > 0 ? ((odpocet - zbyvaOdpocet) / odpocet) * 100 : 100;
   // prompt scitanec 1
   useEffect(() => {
      let temp = prompt("Zadejte 1. sčítanec - číslo, může být i desetinné");
      while (!validateFloat(temp)) {
         temp = prompt("Zadejte 1. sčítanec - číslo, může být i desetinné");
      }
      setscitanec1(parseFloat(temp));
   }, []);
   //  handleData
   const handleData = (data, idecko) => {
      switch (idecko) {
         case "prichut": {
            setRadioPrichut(data);
            break;
         }
         case "navic": {
            setCheckboxNavic(data);
            break;
         }
         case "pocet": {
            if (data < 1) {
               alert("minimální počet kopečků je 1");
               data = 1;
            } else if (data > 4) {
               alert("Maximální počet kopečků jsou 4");
               data = 4;
            }
            setPocetKopecku(data);
            break;
         }
         case "druh": {
            setDruhZmrzliny(data);
            break;
         }
         case "misto": {
            setMistoDisk(data);
            break;
         }
         case "scitanec1": {
            setscitanec1(data);
            break;
         }
         case "scitanec2": {
            setscitanec2(data);
            break;
         }
         case "textArea": {
          setTextArea(data);
          break;
       }
       case "chooseFile": {
        setTextArea(data);
        break;
     }
         default:
            break;
      }
   };
   // handleEvent button
   const handleEvent = (idecko) => {
      switch (idecko) {
         case "soucet": {
            if (!validateFloat(scitanec1)) {
               setSoucetCisel("nelze provést součet, sčítanec 1 není číslo");
            } else if (!validateFloat(scitanec2)) {
               setSoucetCisel("nelze provést součet, sčítanec 2 není číslo");
            } else {
               setSoucetCisel(parseFloat(scitanec1) + parseFloat(scitanec2));
            }
            break;
         }
         case "download": {
          saveText(textArea);
          break;
       }
         default:
            break;
      }
   };

   return (
      <div className="bg-info-subtle vw-100 vh-100">
         <div className="container bg-warning-subtle py-3">
            <div className="row">
               {/* sloupec1 */}
               <div className="col-6">
                  {/* vypis */}
                  <p>
                     {radioPrichut} s {checkboxNavic} {pocetKopecku}{" "}
                     kopeček/kopečky, {druhZmrzliny}
                  </p>{" "}
                  {/* prichut zmrzliny */}
                  <RbGroup
                     label="příchuť zmrzliny"
                     id="prichut"
                     dataIn={[
                        { label: "vanilková", value: "vanilková" },
                        { label: "čokoládová", value: "čokoládová" },
                        { label: "míchaná", value: "míchaná" },
                     ]}
                     handleData={handleData}
                     selectedValue={radioPrichut}
                  />
                  <br />
                  {/* neco navic */}
                  <ChbGroup
                     label="Něco navrch?"
                     id="navic"
                     dataIn={[
                        { label: "kousky oříšků", value: "kousky oříšků" },
                        { label: "čoko hoblinky", value: "čoko hoblinky" },
                        {
                           label: "karamelové křupinky",
                           value: "karamelové křupinky",
                        },
                     ]}
                     handleData={handleData}
                     selectedValue={checkboxNavic}
                  />
                  <br />
                  {/* pocet kopecku */}
                  <NumImp
                     label="Počet kopečků (max 4)"
                     id="pocet"
                     dataIn={pocetKopecku}
                     handleData={handleData}
                  />
                  <br />
                  {/* vyber z moznosti */}
                  <Select
                     label="Vyberte druh zmrzliny"
                     id="druh"
                     dataIn={druhy}
                     selectedValue={druhZmrzliny}
                     handleData={handleData}
                  />
                  <br />
                  {/* zaplneni disku */}
                  <Range
                     label="místo na disku"
                     id="misto"
                     dataIn={mistoDisk}
                     handleData={handleData}
                     min="0"
                     max="100"
                  />
                  {/* vypis casu */}
                  <Clock />
               </div>
               {/* sloupec2 */}
               <div className="col-6">
                  {/* PROGRESS BAR */}
                  <ProgressBar id="odpocitavani" dataIn={progress} />
                  <p>
                     {zbyvaOdpocet > 0
                        ? `Instalace probíhá, čekejte ${zbyvaOdpocet} vteřin`
                        : "Instalace dokončena"}
                  </p>
                  <div className="row">
                     {/* scitanec 1 */}
                     <div className="col">
                        <TextBox
                           label="sčítanec 1"
                           id="scitanec1"
                           dataIn={scitanec1}
                           handleData={handleData}
                        />
                     </div>
                     {/* scitanec 2 */}
                     <div className="col">
                        <TextBox
                           label="sčítanec 2"
                           id="scitanec2"
                           dataIn={scitanec2}
                           handleData={handleData}
                        />
                     </div>
                  </div>
                  <div className="row">
                     <div className="col">
                        <Button
                           label="Vypočítej součet"
                           id="soucet"
                           handleEvent={handleEvent}
                        />
                     </div>
                     <div className="col">{soucetCisel}</div>
                  </div>
                  <br />
                  {/* operace s textem */}
                  <TextArea label="Operace s textem" id="textArea" dataIn={textArea} handleData={handleData} height="150px" />
                  <div className="row">
                     <div className="col">
                      {/* nahrani souboru */}
                     <File
                           label="Načti text ze souboru"
                           id="chooseFile"
                           handleData={handleData}
                        />
                     </div>
                     <div className="col">
                      {/* stahnuti souboru */}
                     <Button
                           label="Stáhnout text"
                           id="download"
                           handleEvent={handleEvent}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
