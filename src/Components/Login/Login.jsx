/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import logo from "../../Images/logo-sm.png"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginUser } from '../../Redux/AuthSlice';
import { LOGIN_URL } from '../Common/API';
import toast from 'react-hot-toast';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const Login = () => {
  const navigate = useNavigate()
  const [remember, setRemember] = useState(false)
  const { loading } = useSelector((state) => state.root.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${LOGIN_URL}?Email=${data?.email}&Password=${data?.password}&SystemTimeZone=${new Date()
        .toLocaleDateString(undefined, {
          day: "2-digit",
          timeZoneName: "long",
        })
        .substring(4)}`,
      headers: {
      },
    };
    const response = dispatch(handleLoginUser({ config }));
    if (response) {
      response
        .then((res) => {
          const response = res?.payload;
          if (response.status === 200) {
            window.localStorage.setItem("timer", JSON.stringify(18_00));
            if (response?.isSuperAdmin) {
              localStorage.setItem("role_access", "SUPER_ADMIN");
            } else {
              localStorage.setItem("role_access", "USER")
            }
            // window.location.href = "/Analytics";
          } else {
            toast.remove();
            toast.error(response?.message || response?.title);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white dark:bg-slate-800/60 rounded shadow-lg ring-2 ring-slate-300/50 dark:ring-slate-700/50 lg:max-w-md">
        <div className="text-center p-6 bg-slate-900 rounded-t">
          <a><img src={logo} alt="logo" className="w-14 h-14 mx-auto mb-2" /></a>
          <h3 className="font-semibold text-white text-xl mb-1">Let's Get Started Disploy CRM</h3>
          <p className="text-xs text-slate-400">Sign in to continue to Disploy CRM.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div>
            <label htmlFor="email" className="font-medium text-sm text-slate-600 dark:text-slate-400">
              Email
              <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input w-full rounded-md mt-1 border ${errors.email ? 'border-red-500' : 'border-slate-300/60 dark:border-slate-700'}  bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500 dark:hover:border-slate-700`}
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "E-mail must be a valid e-mail address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors?.email?.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="font-medium text-sm text-slate-600 dark:text-slate-400">
              Your password
              <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`form-input w-full rounded-md mt-1 border ${errors.password ? 'border-red-500' : 'border-slate-300/60 dark:border-slate-700'}  bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500 dark:hover:border-slate-700`}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <div className="icon flex items-center absolute top-0 bottom-0  right-4">
                {showPassword ? (
                  <BsFillEyeFill size={15}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <BsFillEyeSlashFill size={15}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
          </div>
          <a onClick={() => navigate('/Forgot-password')} className="cursor-pointer text-xs font-medium text-primary-500 underline">Forget Password?</a>
          <div className="block mt-3">
            <label className="custom-label flex items-center">
              <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded w-4 h-4 flex items-center justify-center mr-2">
                <input type="checkbox" onChange={(e) => setRemember(e.target.checked)} value={remember} />

              </div>
              <span>Remember me</span>
            </label>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <p className="mb-5 text-sm font-medium text-center text-slate-500"> Don't have an account? <a className="font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => navigate("/register")}>Sign up</a></p>
      </div>
    </div>
  )
}

export default Login