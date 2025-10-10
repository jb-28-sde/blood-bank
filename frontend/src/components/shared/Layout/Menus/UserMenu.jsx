// UserMenu.jsx
import { MdWarehouse } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospital } from "react-icons/fa";
import { FaBuildingNgo } from "react-icons/fa6";


export const UserMenu = [
  {
    name: "Inventory",
    path: "/",
    icon: <MdWarehouse style={{ fontSize: "40px"}} />
  },
  {
    name: "Donor",
    path: "/donar",
    icon: <BiSolidDonateBlood  style={{ fontSize: "40px"}}  />
  },
  {
    name: "Hospital",
    path: "/hospital",
    icon: <FaHospital  style={{ fontSize: "40px"}} />
  },
  {
    name: "Organisation",
    path: "/organisation",
    icon: <FaBuildingNgo  style={{ fontSize: "40px",marginTop:"10px"}} />
  }
];
