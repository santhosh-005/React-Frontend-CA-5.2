import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useLocation} from "react-router-dom";
import {useDispatch} from 'react-redux';
import { addUser } from "../Redux/action";

function Register(props) {
  const [submit, setSubmit] = useState(false);
  const dispatch=useDispatch()
 

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm();

  const password = watch("password");

  if (submit && isValid) {
    dispatch(addUser(watch("name")));
  }
  const onSubmit = (data) => {
    setSubmit(true);
  };

  return (
    <div className="flex justify-center items-center h-96">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-black flex flex-col justify-between items-center h-5/6 w-2/6 shadow-lg bg-gray-200"
      >
        <h1 className="text-red-500 mt-2 text-lg">REGISTRATION FORM</h1>
        <div className="h-8 w-full mb-2">
          {submit && isValid ? <h1 className="text-white font-bold bg-blue-600 w-full rounded text-center py-2 px-6">Registered Successfully!</h1> : null}
        </div>

        <input
          type="text"
          placeholder="your name"
          {...register("name", {
            required: "name is required",
            minLength: {
              value: 3,
              message: "name must be greater than 3 characters",
            },
            maxLength: {
              value: 30,
              message: "name must be less than 30 characters",
            },
          })}
        className="border-2 border-gray-400 py-2 px-5 rounded-md"
        />
        <p>{errors.name?.message}</p>
        <input
          type="email"
          placeholder="your email"
          {...register("email", { required: "email is required" })}
          className="border-2 border-gray-400 py-2 px-5 rounded-md"
        />
        <p>{errors.email?.message}</p>
        <input
          type="text"
          placeholder="password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 10,
              message: "password must be greater than 10 characters",
            },
            pattern: {
              value: /.*[!@#$%^&*(),.?":{}|<>\[\]\\\/].*/,
              message: "Password must contain at least one special character",
            },
          })}
          className="border-2 border-gray-400 py-2 px-5 rounded-md"
        />
        <p>{errors.password?.message}</p>
        <input
          type="text"
          placeholder="repeat password"
          {...register("repeatPassword", {
            required: "Please repeat the password",
            validate: (value) =>
              value === password || "Password does not match",
          })}
          className="border-2 border-gray-400 py-2 px-5 rounded-md"
        />
        <p>{errors.repeatPassword?.message}</p>
        <button type="submit" className="text-white font-bold bg-green-600 rounded text-center py-2 px-6 mb-2">
          {submit && isValid ? (
            <Link to={"/"}>Back to home</Link>
          ) : (
            "Register Now"
          )}
        </button>
      </form>
    </div>
  );
}

export default Register;
