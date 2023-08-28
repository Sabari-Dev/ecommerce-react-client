import React, { useState } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!user.name) {
      validationErrors.name = `Name required *`;
    } else if (user.name.length <= 3) {
      validationErrors.name = `Name should have more than 3 characters`;
    }
    if (!user.dateOfBirth) {
      validationErrors.dateOfBirth = "Date of birth required *";
    }
    if (!user.email) {
      validationErrors.email = `email required *`;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
      validationErrors.email = `Email is invalid *`;
    }
    if (!user.password) {
      validationErrors.password = `Enter password`;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(user.password)) {
      validationErrors.password = `At least 8 characters long,
Contains at least one uppercase letter,
Contains at least one lowercase letter,
Contains at least one digit,
Allows special characters`;
    }
    if (!user.gender) {
      validationErrors.gender = `Select gender`;
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
      };
      await axios
        .post("http://localhost:5000/api/s1/users/create", newUser)
        .then((res) => {
          toast.success(res.data.message);
          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("error to signUp");
        });
      // console.log(user);
      setErrors({});
      setUser({
        name: "",
        email: "",
        password: "",
        gender: "",
        dateOfBirth: "",
      });
      window.location.reload();
    } else {
      setErrors(validationErrors);
      setTimeout(() => {
        setErrors({});
      }, 3000);
    }
  };
  return (
    <form action="#" onSubmit={handleSubmit}>
      <Toaster />
      <h3>Create Account</h3>
      <FloatingLabel
        controlId="floatingInput"
        label="Name"
        className="mb-3 w-75"
      >
        <Form.Control
          type="text"
          placeholder="Sam"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </FloatingLabel>
      {errors.name && <p className="message">{errors.name}</p>}
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3 w-75"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </FloatingLabel>
      {errors.email && <p className="message">{errors.email}</p>}
      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-3 w-75"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </FloatingLabel>
      {errors.password && <p className="message">{errors.password}</p>}
      <Form.Select
        aria-label="Default select example"
        className="w-75 mb-3"
        name="gender"
        value={user.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </Form.Select>
      {errors.gender && <p className="message">{errors.gender}</p>}
      <FloatingLabel
        controlId="floatingInput"
        label="Date of birth"
        className="mb-3 w-75"
      >
        <Form.Control
          type="date"
          placeholder="02-02-2000"
          name="dateOfBirth"
          value={user.dateOfBirth}
          onChange={handleChange}
        />
      </FloatingLabel>
      {errors.dateOfBirth && <p className="message">{errors.dateOfBirth}</p>}
      <button>
        {user.loading ? <Spinner animation="border" /> : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUp;
