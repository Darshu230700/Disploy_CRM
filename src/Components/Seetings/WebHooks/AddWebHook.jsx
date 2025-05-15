import React from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { InsertWebHook } from '../../../Redux/SettingSlice';

export default function AddWebHook({ setwebhookModal, setloadFirst }) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const Payload = [{
            webhooksID: 0,
            eventAction: data?.eventAction,
            eventObject: data?.eventObject,
            permissionLevel: 0,
            webhookName: data?.name,
            endPointURL: data?.Url,
            httpAuthusername: data?.userName,
            httpAuthpassword: data?.password,
            createdDate: "2024-06-21T05:07:35.627Z",
            updatedDate: "2024-06-26T05:07:35.627Z"
        }]
        try {
            dispatch(InsertWebHook(Payload)).then((res) => {
                if (res?.payload?.status === true) {
                    setwebhookModal(false)
                    setloadFirst(true)
                }
            })
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
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create new webhook</h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => setwebhookModal(false)}
                            />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="xl:w-full h-96 overflow-auto relative p-4">
                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                    <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                                        <h2 className='mb-3 text-lg'>Events in Pipedrive</h2>
                                        <div className="mb-5 flex gap-3">
                                            <div className='w-full'>
                                                <label
                                                    for="name"
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    Event action (required)
                                                </label>
                                                <select className="sc-iMWBiJ bTicHx " {...register('eventAction', { required: "Event action is required." })} name='eventAction'>
                                                    <option value='*'>*</option>
                                                    <option value='added'>added</option>
                                                    <option value='updated'>updated</option>
                                                    <option value='merged'>merged</option>
                                                    <option value='deleted'>deleted</option>
                                                </select>
                                                {errors.eventAction && (<p className="text-red-500">{errors.eventAction.message}</p>)}
                                            </div>
                                            <div className='w-full'>
                                                <label for="Value" className="block mb-2 font-bold text-gray-600">
                                                    Event object (required)
                                                </label>
                                                <select className="sc-iMWBiJ bTicHx " {...register('eventObject')}>
                                                    <option value='*'>*</option>
                                                    <option value='activity'>activity</option>
                                                    <option value='activityType'>activityType</option>
                                                    <option value='deal'>deal</option>
                                                    <option value='note'>note</option>
                                                    <option value='organization'>organization</option>
                                                    <option value='person'>person</option>
                                                    <option value='pipeline'>pipeline</option>
                                                    <option value='product'>product</option>
                                                    <option value='stage'>stage</option>
                                                    <option value='user'>user</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                for="Value"
                                                className="block mb-2 font-bold text-gray-600"
                                            >
                                                Permission level
                                            </label>
                                            <input
                                                type="text"
                                                className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                {...register("PermissionLevel", { valueAsNumber: true, })}
                                            />
                                        </div>
                                        <small className=' text-gray-500 '>Note that this does not filter only certain user's events — rather, this specifies the permissions under which the Webhooks are being sent out. Webhooks about objects the selected user is not entitled to access are not sent. If you want to receive notifications for all events, a top-level admin user can be used.</small>

                                        <h2 className='mt-5 mb-3 text-lg'>Endpoint outside Pipedrive</h2>
                                        <div className="mb-5">
                                            <label for="Value" className="block mb-2 font-bold text-gray-600">
                                                Webhook name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                {...register("name")}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label for="Value" className="block mb-2 font-bold text-gray-600">
                                                Endpoint URL
                                            </label>
                                            <input
                                                type="url"
                                                placeholder='https://api.mywebsite.com/notification'
                                                id="Url"
                                                name="Url"
                                                className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                {...register("Url", { required: "URL can't be blank." })}
                                            />
                                            {errors.Url && (<p className="text-red-500">{errors.Url.message}</p>)}
                                            <small className='text-gray-500 '>Must be a full, valid, publicly accessible URL which doesn’t redirect.</small>
                                        </div>
                                        <div className="mb-5 flex gap-3">
                                            <div className='w-full'>
                                                <label
                                                    for="name"
                                                    className="block mb-2 font-bold text-gray-600"
                                                >
                                                    HTTP Auth username
                                                </label>
                                                <input
                                                    type="text"
                                                    id="userName"
                                                    name="userName"
                                                    className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                    {...register("userName")}
                                                />
                                            </div>
                                            <div className='w-full'>
                                                <label for="Value" className="block mb-2 font-bold text-gray-600">
                                                    HTTP Auth password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                    {...register("password")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                                <button
                                    type="button"
                                    className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                                    onClick={() => setwebhookModal(false)}
                                >
                                    Close
                                </button>

                                <button
                                    type="submit"
                                    className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}
