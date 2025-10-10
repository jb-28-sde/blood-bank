const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDonarListController, getHospitalListController, getOrganisationListController, deleteDonarController, deleteHospitalController, deleteOrganisationController } = require("../controllers/adminController");
const adminMiddleware = require('../middlewares/adminMiddleware')

const router = express.Router();
//routes

//GET || Donar List
router.get("/donar-list", authMiddleware,adminMiddleware,getDonarListController);

//GET || Hospital List
router.get("/hospital-list", authMiddleware,adminMiddleware,getHospitalListController);

//GET || organisation List
router.get("/organisation-list", authMiddleware,adminMiddleware,getOrganisationListController);

//delete Donar
router.delete('/delete-donar/:id',authMiddleware,adminMiddleware,deleteDonarController)

//delete Donar
router.delete('/delete-hospital/:id',authMiddleware,adminMiddleware,deleteHospitalController)

//delete Donar
router.delete('/delete-organisation/:id',authMiddleware,adminMiddleware,deleteOrganisationController)

module.exports = router;
