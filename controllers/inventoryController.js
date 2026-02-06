const mongoose = require("mongoose");
const inventoryModels = require("../models/inventoryModels");
const userModel = require("../models/userModel");

//create inventory
const createinventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("not a donar account");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("not a hospital");
    }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityofBlood = req.body.quantity;
      const { ObjectId } = mongoose.Types;
      const organisation = new ObjectId(req.body.organisation);

      //calculate blood quantity
      const totalInofRequestedBlood = await inventoryModels.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      console.log("Total In", totalInofRequestedBlood);
      const totalIn = totalInofRequestedBlood[0]?.total || 0;
      //calculate total out blood quantity
      const totalOutofRequestedBloodGroup = await inventoryModels.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutofRequestedBloodGroup[0]?.total || 0;
      //in &out  calculation
      const availableQuantityofBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuantityofBloodGroup < requestedQuantityofBlood) {
        return res.status(500).send({
          success: false,
          message: `only ${availableQuantityofBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user._id;
    }
    //save record
    const inventory = new inventoryModels(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "new blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in inventory API",
      error,
    });
  }
};

//get all blood records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModels
      .find({})
      .populate("organisation")
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in get all inventory", error });
  }
};
// get donar records
const getDonarsController = async (req, res) => {
  try {
    
    const organisation = req.userId; 
    if (!organisation) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const donarId = await inventoryModels.distinct("donar", {
      organisation,
    });

    // console.log(donarId);
    const donars = await userModel.find({_id:{$in:donarId}})

    return res.status(200).json({
      success: true,
      message:'Donar record fetch succesfully',
      donars,
      data: donarId,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar Records",
      error,
    });
  }
};
const getHospitalController = async(req,res) => {
  try {
     const  organisation = req.userId
     //get hospital id
     const hospitalId = await inventoryModels.distinct('hospital',{organisation})
     //find hospital
     const hospitals = await userModel.find({
      _id:{$in:hospitalId}
     }) 
     return res.status(200).send({
      success:true,
      message:'Hospital data fetched successfully',
      hospitals,
     })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Hospital Api',
      error
    })
  }
}
//get blood records of 5
const getRecentInventoryController = async (req,res) => {
  try {
    const inventory = await inventoryModels.find({
      organisation:req.userId,
    }).limit(5).sort({createdAt: -1})
    return res.status(200).send({
      success:true,
      message: 'recent inventory data',
      inventory,
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message: 'Error In Recent Inventory API',
      error
    })
  }
}
const getOrganisationController = async(req,res) => {
  try {
       const  donar = req.userId
     //get hospital id
     const orgId = await inventoryModels.distinct('organisation',{donar})
     //find hospital
     const organisations = await userModel.find({
      _id:{$in:orgId}
     }) 
     return res.status(200).send({
      success:true,
      message:'Organisation data fetched successfully',
      organisations,
     })
    
  } catch (error) {
    console.log(error)
     return res.status(500).send({
      success:false,
      message:'Error in Hospital Api',
      error
    })
    
  }
}
// Hospital se associated organisations
const getOrganisationforHospitalController = async(req,res) => {
  try {
       const  hospital= req.userId
     //get hospital id
     const orgIds = await inventoryModels.distinct('organisation', {
  $or: [{ hospital: req.userId }, { inventoryType: "in" }]
});

     //find hospital
   const organisations = await userModel.find({
  _id: { $in: orgIds }
});

     return res.status(200).send({
      success:true,
      message:'Hospital Organisation data fetched successfully',
      organisations,
     })
    
  } catch (error) {
    console.log(error)
     return res.status(500).send({
      success:false,
      message:'Error in Hospital Organisation Api',
      error
    })
    
  }
}

//get hospital blood records
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModels
      .find(req.body.filters)
      .populate("organisation")
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in get all inventory", error });
  }
};


module.exports = {
  createinventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationforHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController
};
