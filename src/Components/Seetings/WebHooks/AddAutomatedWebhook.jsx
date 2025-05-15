import React from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { InsertAutoWebHook } from '../../../Redux/SettingSlice';

export default function AddAutomatedWebhook({ setAutoWebhookModal, setloadFirst }) {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        const Payload = [{
            automatedWebhookID: 0,
            webhookName: data?.name,
            endPointURL: data?.Url,
            httpAuthusername: data?.userName,
            httpAuthpassword: data?.password
        }]
        try {
            dispatch(InsertAutoWebHook(Payload)).then((res) => {
                if (res?.payload?.status === true) {
                    setloadFirst(true)
                    setAutoWebhookModal(false)
                }
            })
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add automated webhook</h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() => setAutoWebhookModal(false)}
                            />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="xl:w-full h-96 overflow-auto relative p-4">
                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6">
                                    <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">

                                        <h2 className='mb-3 text-lg'>Endpoint outside Pipedrive</h2>
                                        <div className="mb-5">
                                            <label for="Value" className="block mb-2 font-bold text-gray-600">
                                                Webhook name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="border border-gray-300 shadow p-3 w-full rounded mr-3"
                                                {...register("name", { required: "Webhook name is required." })}
                                            />
                                            {errors.name && (<p className="text-red-500">{errors?.name?.message}</p>)}
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
                                    onClick={() => setAutoWebhookModal(false)}
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
        </>
    )
}
