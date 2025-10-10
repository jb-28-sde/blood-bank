const userModel = require("../models/userModel")


//get Donar list
const getDonarListController = async(req,res) => {
  try {
    const donarData = await userModel.find({role:'donar'}).sort({createdAt: -1})
    return res.status(200).send({
      success:true,
      TotalCount:donarData.length,
      message:'donar list fetch successfully',
      donarData
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Donar Api',
      error
    })
  }
}
//get Hospital List
const getHospitalListController = async(req,res) => {
  try {
    const hospitalData = await userModel.find({role:'hospital'}).sort({createdAt: -1})
    return res.status(200).send({
      success:true,
      TotalCount:hospitalData.length,
      message:'hospital list fetch successfully',
      hospitalData,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in hospital Api',
      error
    })
  }
}
//get organisation List
const getOrganisationListController = async(req,res) => {
  try {
    const organisationData = await userModel.find({role:'organisation'}).sort({createdAt: -1})
    return res.status(200).send({
      success:true,
      TotalCount:organisationData.length,
      message:'organisation list fetch successfully',
      organisationData,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in organisation Api',
      error
    })
  }
}
///========================================================////////////////
//delete donar
const deleteDonarController = async(req,res) => {
  try {
     await userModel.findByIdAndDelete(req.params.id)
     return res.status(200).send({
      success:true,
      message:'donar deleted successfully'
     })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error while deleting donar',
      error
    })
  }
}
//delete hospital
const deleteHospitalController = async(req,res) => {
  try {
     await userModel.findByIdAndDelete(req.params.id)
     return res.status(200).send({
      success:true,
      message:'hospital deleted successfully'
     })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error while deleting hospital',
      error
    })
  }
}
//delete organisation
const deleteOrganisationController = async(req,res) => {
  try {
     await userModel.findByIdAndDelete(req.params.id)
     return res.status(200).send({
      success:true,
      message:'organisation deleted successfully'
     })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error while deleting organisation',
      error
    })
  }
}



module.exports = {getDonarListController,getHospitalListController,getOrganisationListController,deleteDonarController,deleteHospitalController,deleteOrganisationController}