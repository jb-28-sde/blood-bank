import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <h1 style={{ textAlign: "center" }}>Blood Bank App</h1>
      <nav
        style={{
          margin: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">home page</Link>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
