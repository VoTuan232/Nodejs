const configDatabase = require("../../../api/config/database");

const seeder = require("mongoose-seed");
const faker = require("faker");
const fs = require("fs");
const _ = require("lodash");

const loadJson = jsonPath => {
  return JSON.parse(fs.readFileSync(jsonPath));
};

const addTableData = (key, jsonPath, model, documents) => {
  data[key] = {
    path: jsonPath,
    seed: [{
      model: model,
      documents: documents
    }]
  };
};

let data = {};

// addTableData(
//   "carAccidentHistoryCodes",
//   "../../../api/models/carAccidentHistoryCodes.js",
//   "CarAccidentHistoryCode",
//   loadJson("../../database/carAccidentHistoryCodes.json")
// );
// addTableData(
//   "carCategoryColors",
//   "../../../api/models/carCategoryColors.js",
//   "CarCategoryColor",
//   loadJson("../../database/carCategoryColors.json")
// );
// addTableData(
//   "carDriveCodes",
//   "../../../api/models/carDriveCodes.js",
//   "CarDriveCode",
//   loadJson("../../database/carDriveCodes.json")
// );
// addTableData(
//   "carLeatherSeatCodes",
//   "../../../api/models/carLeatherSeatCodes.js",
//   "CarLeatherSeatCode",
//   loadJson("../../database/carLeatherSeatCodes.json")
// );
// addTableData(
//   "carMakers",
//   "../../../api/models/carMakers.js",
//   "CarMaker",
//   loadJson("../../database/carMakers.json")
// );
// addTableData(
//   "carMileageUnitCodes",
//   "../../../api/models/carMileageUnitCodes.js",
//   "CarMileageUnitCode",
//   loadJson("../../database/carMileageUnitCodes.json")
// );
// addTableData(
//   "carNavigationCodes",
//   "../../../api/models/carNavigationCodes.js",
//   "CarNavigationCode",
//   loadJson("../../database/carNavigationCodes.json")
// );
// addTableData(
//   "carSunroofCodes",
//   "../../../api/models/carSunroofCodes.js",
//   "CarSunroofCode",
//   loadJson("../../database/carSunroofCodes.json")
// );
// addTableData(
//   "carTransmissionCodes",
//   "../../../api/models/carTransmissionCodes.js",
//   "CarTransmissionCode",
//   loadJson("../../database/carTransmissionCodes.json")
// );
addTableData(
  "carMakerCarNames",
  "../../../api/models/carMakerCarNames.js",
  "CarMakerCarName",
  loadJson("../../database/carMakerCarNames.json")
);
// addTableData(
//   "carGradeStyles",
//   "../../../api/models/carGradeStyles.js",
//   "CarGradeStyle",
//   loadJson("../../database/carGradeStyles.json")
// );

seeder.connect(configDatabase.database, function () {
  for (let key in data) {
    // console.log(key);
    // console.log(data[key].path);
    // console.log(data[key].seed[0].model);
    // console.log(data[key].seed[0].documents);
    saveData(data[key].path, data[key].seed[0].model, data[key].seed);
  }
});

const saveData = (modelPath, model, data) => {
  seeder.loadModels([
    modelPath // load mongoose model
    // "../../../api/models/carAccidentHistoryCodes.js" // load mongoose model
  ]);
  seeder.clearModels([model], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
};