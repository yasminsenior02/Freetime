import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
import { useAuthContext } from "../../../AuthContext/auth";
import "./Commform.css";
import apiClient from "../../../services/apiClient";

export default function CommForm() {
  // need to use this when backend is finsihed
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
  });

  // useEffect(() => {
  //   // console.log("user changed: ", user);
  // }, [user]);

  // useEffect(() => {
  //   // if user is not logged in,
  //   // redirect them to the login page
  //   console.log("user in commForm" , user)
  //   if (!user) {
  //     navigate("/login")
  //   }
  // }, [user, navigate])

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const res = await apiClient.request("community", "post", form);

      console.log(res);
      if (res?.data?.community) {
        // const { comm, setComm } = useAuthContext();
        //To do save community data somewhere
        // apiClient.setToken(res.data.token);
        setIsLoading(false);
        navigate("/communities");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with adding your community",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  return (
    <div className="Community">
      <div className="card">
        <h2>Add a Community!</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="name">Community Name </label>
            <input
              type="name"
              name="name"
              value={form.name}
              placeholder="Enter name here"
              onChange={handleOnInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="image">Add An Image </label>
              <input
                type="text"
                name="image"
                value={form.image}
                placeholder="Type URL"
                onChange={handleOnInputChange}
              />
              {errors.image && <span className="error">{errors.image}</span>}
            </div>
            <div className="input-field">
              <label htmlFor="description">Description </label>
              <input
                type="description"
                name="description"
                value={form.description}
                placeholder="Add your description"
                onChange={handleOnInputChange}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>
          </div>
        </div>
        <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Add Community"}
        </button>
      </div>
    </div>
  );
}
