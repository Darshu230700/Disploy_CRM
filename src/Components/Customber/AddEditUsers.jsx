import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactSelect from '../Common/ReactSelect';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useRef } from 'react';
import { ADD_USER_REGISTER, ImageUrl } from '../Common/API';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllCountry, getCity } from '../../Redux/CommonSlice';
import axios from 'axios';
import { handleUserRole } from '../../Redux/UserSlice';
import toast from 'react-hot-toast';

export default function AddEditUsers({ setUserModal, fetchUserData, UserData, toggleModal }) {

    const hiddenFileInput = useRef(null)
    const store = useSelector((state) => state.root.common);
    const UserRole = useSelector((state) => state.root.UserRole);

    const { token, user } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;

    const dispatch = useDispatch()
    const { control, handleSubmit, register, setValue, formState: { errors }, reset, clearErrors } = useForm({
        defaultValues: {
            username: UserData?.userName || '',
            email: UserData?.email || '',
            mobileNumber: UserData?.phoneNumber || '',
            Password: '',
            Street: UserData?.street || '',
            ZipCode: UserData?.zipCode || '',
            status: UserData?.status || false,
            city: UserData?.cityName
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const [file, setfile] = useState(null);
    const [selectedValue, setSelectedValue] = useState({ Country: null, City: null, Role: null });

    useEffect(() => {
        const payload = { mode: "SelectList" }
        dispatch(handleUserRole(payload)).then((res) => {
            toast.remove()
        })
    }, [dispatch]);

    useEffect(() => {
        const id = selectedValue?.Country?.value || null
        dispatch(getAllCountry({}))
        if (id) dispatch(getCity(id))
    }, [dispatch, selectedValue,]);

    useEffect(() => {
        toast.loading('loading ...')
        if (UserData) {
            toast.remove()
            reset({
                username: UserData?.userName || '',
                email: UserData?.email || '',
                mobileNumber: UserData?.phoneNumber || '',
                Password: '',
                Street: UserData?.street || '',
                ZipCode: UserData?.zipCode || '',
                status: UserData?.status,
                city: UserData?.cityName,
                country: UserData?.countryName,
                role: UserData?.userRoleName,

            });
            if (UserData?.countryID || UserData?.cityID || UserData?.userRoleID) {
                setSelectedValue({
                    Country: { label: UserData?.countryName, value: UserData?.countryID } || null,
                    City: { label: UserData?.cityName, value: UserData?.cityID } || null,
                    Role: { label: UserData?.userRoleName, value: UserData?.userRoleID } || null,
                });
            }
        }
    }, [UserData, reset]);

    const onSubmit = async (data) => {

        const systemTimeZone = new Date().toLocaleDateString(undefined, { day: "2-digit", timeZoneName: "long", }).substring(4)
        let formdata = new FormData();
        formdata.append("UserID", UserData?.userID ? UserData?.userID : 0)
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
        formdata.append("status", data?.status)
        formdata.append("File", file)
        formdata.append("ParentID", user?.userID)
        formdata.append("profilePic", UserData?.profilePic ? UserData?.profilePic : '')
        try {
            const { data } = await axios.post(ADD_USER_REGISTER, formdata, { headers: { Authorization: `Bearer ${token}` }, });
            if (data?.status) {
                fetchUserData()
                toast.success(data?.message)
                setUserModal(false)
            } else {
                toast.error(data?.message)
            }

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
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {UserData?.userID ? "Update User" : " Add User"}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => {
                                    toggleModal()
                                    setSelectedValue({})
                                }}
                            />
                        </div>

                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-6 ">
                                {/* <div className=" h-96 vertical-scroll-inner"> */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-full">
                                        <label
                                            htmlFor="User_Name"
                                            className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                            Username
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
                                                    id="username"
                                                    name="username"
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
                                        <label htmlFor="userRole" className="font-medium text-sm text-slate-600 dark:text-slate-400">
                                            User Role
                                        </label>
                                        <Controller
                                            name="role"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'User Role is Required' }}
                                            render={({ field }) => (
                                                <ReactSelect
                                                    {...field}
                                                    options={UserRole?.UserRole?.data?.length > 0 ?
                                                        UserRole?.UserRole?.data?.map(item => ({
                                                            value: item?.usersRoleID,
                                                            label: item?.userRole,
                                                        })) : [{ value: "", label: "Not Found" }]}
                                                    handleSelectChange={(option) => {
                                                        setSelectedValue(prev => ({ ...prev, Role: option }));
                                                        setValue('role', option); // Update form value
                                                        clearErrors('role')
                                                    }}
                                                    selectedValue={selectedValue?.Role}
                                                />

                                            )}
                                        />
                                        {!(selectedValue?.Role?.label?.length > 0) && errors.role && (
                                            <span className="text-red-500">{errors.role.message}</span>
                                        )}
                                    </div>
                                </div>
                                {!UserData?.userID && (
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-full">
                                            <label
                                                htmlFor="email"
                                                className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                            >
                                                Email
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
                                )}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-full">
                                        <label htmlFor="country" className="font-medium text-sm text-slate-600 dark:text-slate-400">
                                            Country
                                        </label>
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
                                                        clearErrors('country')
                                                    }}
                                                    selectedValue={selectedValue?.Country}
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
                                        <Controller
                                            name="city"
                                            control={control}
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
                                                        clearErrors('city')
                                                    }}
                                                    selectedValue={selectedValue?.City}
                                                />
                                            )}
                                        />
                                        {errors.city && (<span className="text-red-500">{errors.city.message}</span>)}
                                    </div>
                                </div>


                                <div className="flex items-center gap-3 mb-3">
                                    <div className=" w-full">
                                        <label
                                            htmlFor="User_Name"
                                            className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                            Street
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
                                                    placeholder="Enter Zip Code"
                                                    className="border border-gray-300 shadow p-2 w-full rounded capitalize"
                                                />
                                            )}
                                        />
                                        {errors?.ZipCode && (
                                            <span className="text-red-500">{errors?.ZipCode?.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className='flex items-center justify-between px-5'>
                                    <div className="flex items-center gap-3">
                                        {file ? <img className=" w-10 h-10  rounded-full mr-3 " src={URL.createObjectURL(file)} alt="" /> : null}
                                        {UserData?.profilePic ? <img className={` w-10 h-10  rounded-full mr-3 ${file && 'opacity-0 hidden'}`} src={`${ImageUrl}${UserData?.profilePic}`} alt="" /> : null}
                                        <button
                                            type='button'
                                            className="rounded-full border bg-primary-500 text-white p-3 "
                                            onClick={() => hiddenFileInput.current.click()}
                                            title="Attachment"
                                        >
                                            Profile photo
                                            <input
                                                type="file"
                                                id="upload-button"
                                                className='opacity-0 '
                                                style={{ display: "none" }}
                                                ref={hiddenFileInput}
                                                onChange={(e) => {
                                                    const files = e.target.files[0];
                                                    setfile(files)
                                                }}
                                                accept="image/*"
                                            />
                                        </button>

                                    </div>
                                    <div className="block flex items-center">
                                        <label className="formLabel text-lg" for='status'>Is Active :</label>
                                        <input
                                            className='border border-primary ml-8 rounded h-6 w-6'
                                            id='status'
                                            type="checkbox"
                                            {...register('status')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                    onClick={() => toggleModal()}
                                >
                                    Close
                                </button>

                                <button
                                    type="submit"
                                    className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                >
                                    {UserData?.userID ? "Update " : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </div>
    )
}
