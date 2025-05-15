/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import logo from "../../Images/logo-sm.png"
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { handleRegisterUser } from "../../Redux/AuthSlice";
import { ADD_USER_REGISTER } from "../Common/API";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReactSelect from "../Common/ReactSelect";
import { getAllCountry, getCity } from "../../Redux/CommonSlice";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register, setValue,
    formState: { errors },
  } = useForm();

  const store = useSelector((state) => state.root.common);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ Country: null, City: null, Role: null });

  useEffect(() => {
    const id = selectedValue?.Country?.value || null
    dispatch(getAllCountry({}))
    if (id) dispatch(getCity(id))
  }, [dispatch, selectedValue,]);

  const onSubmits = (data) => {
    let Params = JSON.stringify({
      "userID": 0,
      "userName": data?.username,
      "password": data?.password,
      "email": data?.email,
      "phoneNumber": data?.mobileNumber,
      "systemTimeZone": new Date()
        .toLocaleDateString(undefined, {
          day: "2-digit",
          timeZoneName: "long",
        })
        .substring(4),
      "isSuperAdmin": true
    });

    setLoading(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: ADD_USER_REGISTER,
      headers: {
        'Content-Type': 'application/json',
      },
      data: Params,
    };
    const response = dispatch(handleRegisterUser({ config }));
    if (response) {
      response
        .then((res) => {
          const response = res?.payload;
          if (response?.status) {
            window.localStorage.setItem("timer", JSON.stringify(18_00));
            toast.success("Registration successfully.");
            navigate("/");
            setLoading(false);
          } else {
            toast.error(response?.message);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.remove()
          setLoading(false);
        });
    }
  };

  const onSubmit = async (data) => {

    const systemTimeZone = new Date().toLocaleDateString(undefined, { day: "2-digit", timeZoneName: "long", }).substring(4)

    let formdata = new FormData();
    formdata.append("UserID", 0)
    formdata.append("UserName", data?.username)
    formdata.append("Password", data?.Password)
    formdata.append("Email", data?.email)
    formdata.append("PhoneNumber", data?.mobileNumber)
    formdata.append("SystemTimeZone", systemTimeZone)
    formdata.append("UserRoleID", selectedValue?.Role?.value || 0)
    formdata.append("CityID", selectedValue?.City?.value || 0)
    formdata.append("CountryID", selectedValue?.Country?.value || 0)
    formdata.append("Street", data?.Street)
    formdata.append("ZipCode", data?.ZipCode)
    formdata.append("Operation", 'Save')
    formdata.append("ParentID", 0)
    // formdata.append("status", data?.status)
    // formdata.append("File", null)

    try {
      const response = dispatch(handleRegisterUser(formdata));
      if (response) {
        
        response
          .then((res) => {
            const response = res?.payload;
            if (response?.status) {
              window.localStorage.setItem("timer", JSON.stringify(18_00));
              toast.success("Registration successfully.");
              navigate("/");
              setLoading(false);
            } else {
              toast.error(response?.message);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.remove()
            setLoading(false);
          });
      }

    } catch (error) {
      console.log('error :>> ', error);
    }
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full max-w-md m-auto bg-white dark:bg-slate-800/60 rounded shadow-lg ring-2 ring-slate-300/50 dark:ring-slate-700/50 ">
        <div className="text-center p-6 bg-slate-900 rounded-t">
          <a>
            <img
              src={logo}
              alt="logo"
              className="w-14 h-14 mx-auto mb-2"
            />
          </a>
          <h3 className="font-semibold text-white text-xl mb-1">
            Let's Get Started Disploy CRM
          </h3>
          <p className="text-xs text-slate-400">
            Sign in to continue to  Disploy CRM.
          </p>
        </div>

        <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className=" ">
            {/* <div className=" h-96 vertical-scroll-inner"> */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-full">
                <label
                  htmlFor="User_Name"
                  className="font-medium text-sm text-slate-600 dark:text-slate-400"
                >
                  Username
                  <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
                </label>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Username is Required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Username"
                      className="border border-gray-300 shadow p-2 w-full rounded capitalize"
                    />
                  )}
                />
                {errors.username && (
                  <span className="text-red-500">{errors.username.message}</span>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="Mobile_Number"
                  className="font-medium text-sm text-slate-600 dark:text-slate-400"
                >
                  Mobile Number
                  <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
                </label>
                <Controller
                  name="mobileNumber"
                  control={control}
                  rules={{ required: 'Mobile Number is Required' }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      value={value}
                      onChange={onChange}
                      id="mobileNumber"
                      country={'in'}
                      error={true}
                      inputProps={{
                        name: 'phone',
                        country: 'in',
                        required: true,
                        autoFocus: true,
                        style: { width: '100%', border: "1px solid #e4e4e7" },
                      }}
                    />
                  )}
                />
                {errors?.mobileNumber && <p className="text-red-500 text-xs ">{errors?.mobileNumber?.message}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-slate-600 dark:text-slate-400"
                >
                  Email
                  <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Email is Required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email is invalid',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Email"
                      className="border border-gray-300 shadow p-2 w-full rounded "
                    />
                  )}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="font-medium text-sm text-slate-600 dark:text-slate-400"
                >
                  Password
                  <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="Password"
                    name="Password"
                    placeholder="Enter Password"
                    className="border border-gray-300 shadow p-2 w-full rounded  "
                    {...register("Password", {
                      required: "Password is Required",
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message:
                          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character ",
                      },
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
                {errors.Password && <p className="text-red-500  ">{errors.Password.message}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-full">
                <label htmlFor="country" className="font-medium text-sm text-slate-600 dark:text-slate-400">
                  Country
                </label>
                <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Country is Required' }}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={store?.Country?.map(item => ({
                        value: item.countryID,
                        label: item.countryName,
                      })) || [{ value: "", label: "Not Found" }]}
                      handleSelectChange={(option) => {
                        setSelectedValue(prev => ({ ...prev, Country: option }));
                        setValue('country', option); // Update form value
                      }}
                      value={field.value}
                    />
                  )}
                />
                {!(selectedValue?.Country?.label?.length > 0) && errors.country && (
                  <span className="text-red-500">{errors.country.message}</span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="city" className="font-medium text-sm text-slate-600 dark:text-slate-400">
                  City
                </label>
                <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'City is Required' }}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={store?.City?.map(item => ({
                        value: item.cityID,
                        label: item.cityName,
                      })) || [{ value: "", label: "Not Found" }]}
                      handleSelectChange={(option) => {
                        setSelectedValue(prev => ({ ...prev, City: option }));
                        setValue('city', option); // Update form value
                      }}
                      value={field.value}
                    />
                  )}
                />
                {!(selectedValue?.City?.label?.length > 0) && errors.city && (
                  <span className="text-red-500">{errors.city.message}</span>
                )}
              </div>
            </div>


            <div className="flex items-center gap-3">
              <div className=" w-full">
                <label
                  htmlFor="User_Name"
                  className="font-medium text-sm text-slate-600 dark:text-slate-400"
                >
                  Street
                  <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
                </label>
                <Controller
                  name="Street"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Street is Required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Street"
                      className="border border-gray-300 shadow p-2 w-full rounded capitalize"
                    />
                  )}
                />
                {errors?.Street && (
                  <span className="text-red-500">{errors?.Street?.message}</span>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="User_Name"
                  className="font-medium text-sm text-slate-600 dark:text-slate-400"
                >
                  Zip Code
                  <span className="text-red-600 ms-1 font-extrabold text-base">*</span>
                </label>
                <Controller
                  name="ZipCode"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'ZipCode is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min='0'
                      id="name"
                      name="name"
                      placeholder="Enter ZipCode"
                      className="border border-gray-300 shadow p-2 w-full rounded capitalize"
                    />
                  )}
                />
                {errors?.ZipCode && (
                  <span className="text-red-500">{errors?.ZipCode?.message}</span>
                )}
              </div>
            </div>

            <div className="block mt-4">
              <label className="custom-label flex items-center">
                <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded w-4 h-4 flex items-center justify-center mr-2">
                  <input type="checkbox" name="terms"
                    {...register('terms', { required: "Terms is required" })}
                  />
                </div>
                <span className="text-sm">By registering you agree to the Disploy to CRM Terms of Use</span>
              </label>
              {errors.terms && (<span className="text-red-500">{errors.terms.message}</span>)}

            </div>
            <div className="mt-5 flex justify-center">
              <button className=" px-7 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Create Your Account"}
              </button>
            </div>

          </div>
        </form>


        <p className="mb-5 text-sm font-medium text-center text-slate-500">
          {" "}
          Already have an account ?{" "}
          <a
            className="cursor-pointer font-medium text-blue-600 hover:underline"
            onClick={() => navigate("/")}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
