"use strict";
const fs = require('fs');

const InputDir = "./in/";
const targetDir = "./out/";
const csvPath = "Import_a_reprendre.csv";

/**
 * READ CSV
 */
var startTime = new Date();
console.log("START READ CSV FILE");

var fluxObj = {};
var fluxname, xmlFile, pdfFile, flagFile;
var targetPath;
var listArr = [];
fs.readFile(csvPath, {encoding: "utf-8"}, (err, data)=>{
    if (err) {
        console.log(err);
    }
    var dataArray = data.split(/\r?\n/);
    var count = 0;

    for (var i in dataArray) {
        count++
        // console.log(dataArray[i]);
        // On ignore l'entête du csv
        if (count > 1) {
            fluxObj.nomFlux = dataArray[i].split(";")[0];
            fluxObj.xmlFile = dataArray[i].split(";")[1];
            fluxObj.pdfFile = dataArray[i].split(";")[2];
            fluxObj.flagFile = fluxObj.nomFlux + '.flag'

            // console.log(fluxObj.nomFlux);
            // console.log(fluxObj.xmlFile);
            // console.log(fluxObj.pdfFile);
            // console.log(fluxObj.flagFile);
        }
        targetPath = targetDir +  fluxObj.nomFlux;
        fluxname = fluxObj.nomFlux
        xmlFile = fluxObj.xmlFile;
        pdfFile = fluxObj.pdfFile;
        flagFile = fluxname + ".flag";

        /**
         * READ DIR
         */
        var pdfFilePath = "./pdf/" + pdfFile;
        fs.readdir("./pdf/", (err, list) => {
            if (err) {
                console.log(err);
            }
            list.forEach((item) => {
                // console.log(item);
                listArr.push(item);
            });
            
            // console.log(listArr);
            listArr = list;
        });
        console.log(listArr);
        for (var j in listArr) {
            console.log(pdfFile);
            
                fs.rename("/pdf/" + listArr[j], "/in/" + pdfFile, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            
        }
    }
    console.log(`Nombre de lignes du csv : ${count}`);
    var endTime = new Date();
    console.log(`Traité à ${endTime} en : ${(endTime - startTime)/100} sec`);
});

