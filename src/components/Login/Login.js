import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userLogin } from "../Api/api";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

const Login = () => {
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);
  //   const [progress, setProgress] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // setProgress(true);

    if (formData.Username.length === 0 || formData.Password.length === 0) {
      setOpen(true);
      setSeverity("error");
      setMessage("Please fill all fields!");
      //   setProgress(false);
      return;
    }

    userLogin(formData).then((res) => {
      if (res?.status === "success") {
        localStorage.setItem("token", res?.token);
        setMessage(res?.message);
        setOpen(true);
        setSeverity("success");
        // setProgress(false);
        navigate("/products");
      } else if (res?.status === "fail") {
        setMessage(res?.message);
        setOpen(true);
        setSeverity("error");
        // setProgress(false);
      }
    });
  };
  return (
    <>
      <div
        style={{
          width: "18rem",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid black",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5rem",
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          name="Username"
          value={formData.Username}
          onChange={handleChange}
        />
        <br />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
        />
        <br />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </div>
      <Alert
        message={message}
        open={open}
        setOpen={setOpen}
        severity={severity}
      ></Alert>
    </>
  );
};

export default Login;
