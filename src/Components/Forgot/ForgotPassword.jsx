/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../../Images/logo-sm.png";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FORGOT_PASSWORD, UPDATE_PASSWORD } from "../Common/API";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const newPassword = watch("newPassword");

  const Email = watch("email");

  const [isShowPassword, setShowPassword] = useState(false);
  const [passwordEye, setPasswordEye] = useState({
    temparyPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [userId, setUserID] = useState("");

  const onSubmit = (data) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${FORGOT_PASSWORD}?Email=${data?.email}`,
      headers: {},
    };
    toast.loading("Verifying Your Email...");
    axios
      .request(config)
      .then((response) => {

        if (response?.data?.status) {
          toast.remove();
          setUserID(response?.data?.data);
          setShowPassword(true);
        } else {
          toast.remove();
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data?.message);
      });
  };

  const onForgotSubmit = (data) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${UPDATE_PASSWORD}?UserID=${userId}&Email=${Email}&Password=${data?.newPassword}&OTP=${data?.OTP}&SystemTimeZone=
      ${new Date().toLocaleDateString(undefined, { day: "2-digit", timeZoneName: "long", }).substring(4)}`,
      headers: {},
    };
    toast.loading("Updating....");
    axios
      .request(config)
      .then((response) => {

        if (response?.data?.status) {
          toast.remove();
          toast.success(response?.data?.message);
          navigate("/");
        } else {
          toast.remove();
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data?.message);
      });
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full  m-auto bg-white dark:bg-slate-800/60 rounded shadow-lg ring-2 ring-slate-300/50 dark:ring-slate-700/50 lg:max-w-md">
          <div className="text-center p-6 bg-slate-900 rounded-t">
            <a>
              <img src={logo} alt="" className="w-14 h-14 mx-auto mb-2" />
            </a>
            <h3 className="font-semibold text-white text-xl mb-1">
              Reset Password For Disploy CRM
            </h3>
            <p className="text-xs text-slate-400">
              Enter your Email and instructions will be sent to you!
            </p>
          </div>
          {!isShowPassword ? (
            <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-slate-600 dark:text-slate-400"
                >
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      className={`form-input w-full rounded-md mt-1 border ${errors.email ? 'border-red-500' : 'border-slate-300/60 dark:border-slate-700'}  bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500 dark:hover:border-slate-700`}
                      placeholder="Your Email"

                    />
                  )}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Reset
                </button>
              </div>
            </form>
          ) : (
            <form className="p-6" onSubmit={handleSubmit(onForgotSubmit)}>
              <div className="mb-5">
                <label
                  for="name"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Title
                </label>
                <input
                  type="number"
                  min='0'
                  id="name"
                  name="OTP"
                  placeholder="Enter OTP"
                  className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                  {...register("OTP", { required: "OTP is required", })}
                />
                {errors.OTP && (<p className="text-red-500">{errors.OTP.message}</p>)}
              </div>
              <div className="relative mb-4">
                <input
                  type={passwordEye?.temparyPassword ? "text" : "password"}
                  name="temparyPassword"
                  id="temparyPassword"
                  className="bg-gray-200 border input-bor-color text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Temporary password"
                  {...register("temparyPassword", {
                    required: "Temporary Password Is Required",
                  })}
                />
                <div className="icon forgoticon-password absolute right-3 top-4 z-10 ">
                  {passwordEye?.temparyPassword ? (
                    <BsFillEyeFill
                      onClick={() =>
                        setPasswordEye({
                          ...passwordEye,
                          temparyPassword: !passwordEye?.temparyPassword,
                        })
                      }
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={() =>
                        setPasswordEye({
                          ...passwordEye,
                          temparyPassword: !passwordEye?.temparyPassword,
                        })
                      }
                    />
                  )}
                </div>
                {errors.temparyPassword && (
                  <span className="error text-red-500 text-sm">
                    {errors.temparyPassword.message}
                  </span>
                )}
              </div>

              <div className="relative mb-4">
                <input
                  type={passwordEye?.newPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  className="bg-gray-200 border input-bor-color text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter New Password"
                  {...register("newPassword", {
                    required: "New Password Is Required",
                    minLength: 8,
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                    },
                  })}
                />
                <div className="icon forgoticon-password absolute right-3 top-4 z-10">
                  {passwordEye?.newPassword ? (
                    <BsFillEyeFill
                      onClick={() =>
                        setPasswordEye({
                          ...passwordEye,
                          newPassword: !passwordEye?.newPassword,
                        })
                      }
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={() =>
                        setPasswordEye({
                          ...passwordEye,
                          newPassword: !passwordEye?.newPassword,
                        })
                      }
                    />
                  )}
                </div>
                {errors.newPassword && (
                  <span className="error text-red-500 text-sm">
                    {errors.newPassword.message}
                  </span>
                )}
                {errors.newPassword &&
                  errors.newPassword.type === "minLength" && (
                    <span className="error text-red-500 text-sm">
                      Password must be at least 8 characters long
                    </span>
                  )}
              </div>
              <div className="relative ">
                <input
                  type={passwordEye?.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="bg-gray-200 border input-bor-color text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Confirm New Password"
                  {...register("confirmPassword", {
                    required: "Confirm New Password Is Required",
                    validate: (value) =>
                      value === newPassword || "Passwords Must Match",
                  })}
                />
                <div className="icon forgoticon-password absolute right-3 top-4 z-10">
                  {passwordEye?.confirmPassword ? (
                    <BsFillEyeFill
                      onClick={() =>
                        setPasswordEye({
                          ...passwordEye,
                          confirmPassword: !passwordEye?.confirmPassword,
                        })
                      }
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={() =>
                        setPasswordEye({
                          ...passwordEye,
                          confirmPassword: !passwordEye?.confirmPassword,
                        })
                      }
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <span className="error text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Reset
                </button>
              </div>
            </form>
          )}

          <p className="mb-5 text-sm font-medium text-center text-slate-500">
            Remember It ?
            <a
              onClick={() => navigate("/")}
              className="cursor-pointer font-medium text-blue-600 hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
