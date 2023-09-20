import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
const SignIn = () => {
  const [users, setUsers] = useState([]);
  const [checkUser, setCheckUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://hilarious-skirt-moth.cyclic.cloud/api/s1/users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(users);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    try {
      if (Object.keys(validationErrors).length === 0) {
        let getUserEmail = users.find(
          (user) =>
            user.email === checkUser.email &&
            user.password === checkUser.password
        );
        // console.log(getUserEmail);
        const { _id } = getUserEmail;
        navigate(`/home/${_id}`);

        toast.success("login successfully!!");
      } else {
        toast.error("invalid email/password");
        setErrors(validationErrors);
        setTimeout(() => {
          setErrors({});
        }, 3000);
      }
    } catch (error) {
      toast.error("invalid email/password");
      // console.log(error);
    }
  };
  const validateForm = () => {
    let validationErrors = {};
    if (!checkUser.email) {
      validationErrors.email = `email required *`;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(checkUser.email)
    ) {
      validationErrors.email = `Email is invalid *`;
    }
    if (!checkUser.password) {
      validationErrors.password = `Password required*`;
    }
    return validationErrors;
  };
  return (
    <form action="#" onSubmit={handleSubmit}>
      <h3>Sign in</h3>

      <FloatingLabel
        controlId="floatingInputSignIn"
        label="Email address"
        className="mb-3 w-75"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
          value={checkUser.email}
          onChange={handleChange}
        />
      </FloatingLabel>
      {errors.email && <p className="message">{errors.email}</p>}
      <FloatingLabel
        controlId="floatingPasswordSignIn"
        label="Password"
        className="mb-3 w-75"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={checkUser.password}
          onChange={handleChange}
        />
      </FloatingLabel>
      {errors.password && <p className="message">{errors.password}</p>}

      <button>Sign In</button>
    </form>
  );
};

export default SignIn;
