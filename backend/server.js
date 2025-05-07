// const express = require("express");
// const { SerialPort } = require("serialport");
// const { ReadlineParser } = require("@serialport/parser-readline"); // ✅ Corrected
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const port = new SerialPort({
//   path: "COM7",
//   baudRate: 9600,
// });

// const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" })); // ✅ Works now



// let latestData = {
//   nitrogen: 0,
//   phosphorus: 0,
//   potassium: 0,
//   humidity: 0,
// };

// parser.on("data", (data) => {
//   console.log("Raw Serial Data:", data);
//   if (data.includes("Nitrogen")) {
//     const lines = data.split("\n");
//     lines.forEach((line) => {
//       if (line.includes("Nitrogen")) latestData.nitrogen = parseInt(line.split(":")[1]);
//       else if (line.includes("Phosphorous")) latestData.phosphorus = parseInt(line.split(":")[1]);
//       else if (line.includes("Potassium")) latestData.potassium = parseInt(line.split(":")[1]);
//       else if (line.includes("Soil Moisture")) latestData.humidity = parseInt(line.split(":")[1]);
//     });
//   }
// });

// app.get("/getSensorData", (req, res) => {
//   res.json(latestData);
// });

// app.listen(4000, () => {
//   console.log("Server listening on http://localhost:4000");
// });
















const express = require("express");
const cors = require("cors"); // ✅ Add this line
const { SerialPort } = require("serialport");
const { ReadlineParser } = require('@serialport/parser-readline'); // Correct import for the Readline parser
const app = express();
const port = 4000;
app.use(cors());
// Replace with the correct serial port for your device
const serialPortPath = "COM7"; // Modify this according to your system

const portOptions = { baudRate: 9600 };
const serialPort = new SerialPort({ path: serialPortPath, ...portOptions });

// Set up the parser
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// Store sensor data
let sensorData = {
  nitrogen: null,
  phosphorus: null,
  potassium: null,
  soil_moisture: null,
};

// Read serial data
parser.on("data", (data) => {
  const rawData = data.toString();

  const validData = rawData.split("\n").filter((line) => {
    return !line.includes("FFFFFFFFFFFF") && line.trim() !== "";
  });

  validData.forEach((line) => {
    if (line.includes("Nitrogen")) {
      sensorData.nitrogen = line.split(":")[1].trim().split(" ")[0];
    }
    if (line.includes("Phosphorous")) {
      sensorData.phosphorus = line.split(":")[1].trim().split(" ")[0];
    }
    if (line.includes("Potassium")) {
      sensorData.potassium = line.split(":")[1].trim().split(" ")[0];
    }
    if (line.includes("Soil Moisture")) {
      sensorData.soil_moisture = line.split(":")[1].trim();
    }
  });

  console.log("Processed Sensor Data: ", sensorData);
});

// Endpoint to get sensor data
app.get("/getSensorData", (req, res) => {
  res.json(sensorData);
});

// Set up Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
