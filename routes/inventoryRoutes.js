const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createinventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationforHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//add inventory
router.post("/create-inventory", authMiddleware, createinventoryController);

//get all blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

//get recent blood records
router.get("/get-recent-inventory", authMiddleware, getRecentInventoryController);

//get hospital consumer blood records
router.post("/get-inventory-hospital", authMiddleware, getInventoryHospitalController);

//get donar records
router.get("/get-donar", authMiddleware, getDonarsController);

//get hospital records
router.get("/get-hospital", authMiddleware, getHospitalController);

//get organisation records
router.get("/get-organisation", authMiddleware, getOrganisationController);

//get organisation for hospital records
router.get("/get-organisation-for-hospital", authMiddleware, getOrganisationforHospitalController);

module.exports = router;
