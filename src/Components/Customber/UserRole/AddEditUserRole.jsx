import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserRoleList, handleUserRole } from '../../../Redux/UserSlice';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { AddUserAccess, EditUserRole } from '../../Common/Common';

export default function AddEditUserRole({ toggleModal, userRoleData, fetchUserData }) {
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm();
    const [roleList, setRoleList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userRoleData) {

            setValue('name', userRoleData?.userRole);
            // const transformedAccess = userRoleData?.useraccess?.map(item => ({ ...item, pageName: item.moduleName, }));
            const userAccess = EditUserRole(userRoleData);

            userAccess.forEach(item => {
                setValue(`${item?.pageName}_View`, item[`${item?.pageName}_View`] || false);
                setValue(`${item?.pageName}_Edit`, item[`${item?.pageName}_Edit`] || false);
                setValue(`${item?.pageName}_Delete`, item[`${item?.pageName}_Delete`] || false);
            });
            setRoleList(userAccess);
        }
    }, [userRoleData, setValue,]);

    useEffect(() => {
        setLoading(true);
        dispatch(getUserRoleList({}))
            .then((res) => {
                setRoleList(res?.payload?.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [dispatch]);

    const onSubmit = (data) => {
        const userAccess = AddUserAccess(roleList, watch);

        const params = {
            UsersRoleID: userRoleData?.usersRoleID || 0,
            UserRole: data?.name,
            isActive: 1,
            userID: 0,
            mode: "Save",
            userCount: 0,
            useraccess: userAccess,
        };

        dispatch(handleUserRole(params))
            .then(() => {
                toggleModal();
                fetchUserData();
            });
    };

    const renderRoleItems = (items, parentId = 0) => {

        const filteredItems = items?.length > 0 ? items?.filter(item => item?.parentID === parentId) : [];

        return filteredItems.map(item => (
            <React.Fragment key={item?.moduleID}>
                <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item?.pageName}
                        {/* &nbsp; {item?.moduleID} &nbsp; {item?.parentID} */}
                    </td>
                    {item?.parentID !== 0 && (
                        <>
                            <td className="px-6 py-4 text-center">
                                <input
                                    id={`${item?.pageName}_View`}
                                    {...register(`${item?.pageName}_View`)}
                                    className="border border-primary text-center rounded h-4 w-4 cursor-pointer"
                                    type="checkbox"
                                    onChange={() => {
                                        if (watch(`${item?.pageName}_View`) === true) {
                                            setValue(`${item?.pageName}_Delete`, false);
                                            setValue(`${item?.pageName}_Edit`, false);
                                        }
                                    }}
                                />
                            </td>

                            <td className="px-6 py-4 text-center">
                                <input
                                    id={`${item?.pageName}_Edit`}
                                    {...register(`${item?.pageName}_Edit`)}
                                    className="border border-primary text-center rounded h-4 w-4 cursor-pointer"
                                    type="checkbox"
                                    onChange={() => {
                                        if (watch(`${item?.pageName}_Edit`)) {
                                            setValue(`${item?.pageName}_Delete`, false);
                                        } else {
                                            setValue(`${item?.pageName}_View`, true);
                                        }
                                    }}
                                />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <input
                                    id={`${item?.pageName}_Delete`}
                                    {...register(`${item?.pageName}_Delete`)}
                                    className="border border-primary text-center rounded h-4 w-4 cursor-pointer"
                                    type="checkbox"
                                    onChange={() => {
                                        setValue(`${item?.pageName}_View`, true);
                                        setValue(`${item?.pageName}_Edit`, true);
                                    }}
                                />
                            </td>
                        </>
                    )}
                </tr>
                {renderRoleItems(items, item?.moduleID)}
            </React.Fragment>
        ));
    };



    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-lg max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {userRoleData?.usersRoleID ? "Update" : "Add"} User Role
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => toggleModal()}
                            />
                        </div>
                        {loading ? (
                            <div className="flex justify-center p-5 w-full items-center h-96">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="xl:w-full relative p-4">
                                    <div className="mb-5">
                                        <label htmlFor="name" className="block mb-2 font-bold text-gray-600">Role Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter Role Name"
                                            className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                                            {...register("name", { required: "Role Name is Required" })}
                                        />
                                        {errors.name && (
                                            <p className="text-red-600 font-bold">{errors?.name?.message}</p>
                                        )}
                                    </div>

                                    <div className="relative max-h-96 vertical-scroll-inner sm:rounded-lg col-span-2 sm:col-span-2 max-h-325">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 table-head-bg">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3"></th>
                                                    <th scope="col" className="px-6 py-3 text-center">View</th>
                                                    <th scope="col" className="px-6 py-3 text-center">Create & Edit</th>
                                                    <th scope="col" className="px-6 py-3 text-center">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {renderRoleItems(roleList)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                    <button
                                        type="button"
                                        className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500 text-sm font-medium py-1 px-3 rounded mr-1 close"
                                        onClick={() => toggleModal()}
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="submit"
                                        className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3 rounded"
                                    >
                                        {userRoleData?.usersRoleID ? "Update" : "Save"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
