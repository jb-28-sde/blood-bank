import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

// LOGIN
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });

      if (data?.success) {
        if (data?.token) {
          localStorage.setItem("token", data.token);
        }

        toast.success(data?.message || "Login successful");

        return {
          user: data?.user || null,
          token: data?.token || null,
        };
      } else {
        return rejectWithValue(data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login API Error:", error);
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Login error"
      );
    }
  }
);

// REGISTER
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      role,
      name,
      email,
      password,
      confirmPassword,
      address,
      phone,
      idProof,
      hospitalName,
      website,
      registrationNumber,
      orgName,
      contactPerson,
      adminCode,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        role,
        name,
        email,
        password,
        confirmPassword,
        address,
        phone,
        idProof,
        hospitalName,
        website,
        registrationNumber,
        orgName,
        contactPerson,
        adminCode,
      });

      if (data?.success) {
        if (data?.token) {
          localStorage.setItem("token", data.token);
        }

        toast.success(data?.message || "Registration successful");

        return {
          user: data?.user || null,
          token: data?.token || null,
        };
      } else {
        return rejectWithValue(data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register API Error:", error);
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Register error"
      );
    }
  }
);

//current-user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res?.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
