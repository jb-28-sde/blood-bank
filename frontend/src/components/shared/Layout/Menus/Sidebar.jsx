import { MdWarehouse } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospital, FaBuilding } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Default menu
  const menuItems = [
    {
      name: "Inventory",
      path: "/",
      icon: MdWarehouse,
      roles: ["organisation",], 
    },
    {
      name: "Donar",
      path: "/donar",
      icon: BiSolidDonateBlood,
      roles: [],
    },
    {
      name: "Hospital",
      path: "/hospital",
      icon: FaHospital,
      roles: [],
    },
    {
      name: "Organisation",
      path: "/organisation",
      icon: FaBuilding,
      roles: [],
    },
    {
      name: "Consumer",
      path: "/consumer",
      icon: FaBuilding,
      roles: ["organisation"],
    },
    {
      name: "Donation",
      path: "/donation",
      icon: FaHospital,
      roles: ["donar"],
    },
  ];

  // Admin-only menu
  const adminMenu = [
    {
      name: "Donar List",
      path: "/donar-list",
      icon: BiSolidDonateBlood,
    },
    {
      name: "Hospital List",
      path: "/hospital-list",
      icon: BiSolidDonateBlood,
    },
    {
      name: "Organisation List",
      path: "/organisation-list",
      icon: BiSolidDonateBlood,
    },
  ];

  // Decide which menu to render
  const filteredItems =
    user?.role === "admin"
      ? adminMenu
      : menuItems.filter((item) => item.roles.includes(user?.role));

  return (
    <div className="sidebar">
      {filteredItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <div key={index} className={`menu-item ${isActive ? "active" : ""}`}>
            <Icon style={{ fontSize: "24px", marginRight: "10px" }} />
            <Link
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
