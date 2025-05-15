import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { AddGmailCred } from '../../Redux/EmailSlice';
import toast from 'react-hot-toast';

export default function EmailModal({ setShowModal, setloadFrist }) {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const onSubmit = (data) => {

        const payload = {
            "gmailCredentialID": 0,
            "email": data?.email,
            "appPassword": data?.password,
            "identityID": 0,
        }

        try {
            dispatch(AddGmailCred(payload)).then((res) => {
                if (res?.payload?.status) {
                    setShowModal(false);
                    setloadFrist(true)
                    toast.success(res?.payload?.message)
                } else {
                    toast.error(res?.payload?.message);
                }
            });
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative  w-full max-w-lg max-h-full ">
                    {/* Modal content */}
                    <div className="relative bg-white  shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Email Login
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-4xl text-primary cursor-pointer"
                                onClick={() => setShowModal(false)}

                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='border'>
                            <div className='p-4  md:p-5'>
                                <div className="grid gap-3 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Email" required=""
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
                                </div>
                                <div className="grid gap-3 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-2">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
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
                                </div>
                            </div>
                            <div className="flex items-center justify-end pb-2 border p-2 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
                                <button
                                    className="bg-white text-primary text-base px-6 py-3 border border-primary  shadow-md rounded-full  mr-2"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-white text-primary text-base px-6 py-3 border border-primary  shadow-md rounded-full  mr-2"
                                    type="sumbit"

                                >
                                    Save
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
