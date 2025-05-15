import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoMdAttach } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { handleSendMails } from '../../Redux/EmailSlice';

export default function AddEmail({ setSendMail, setloadFrist }) {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const hiddenFileInput = useRef(null);
    const dispatch = useDispatch()

    const [BccMail, setBCCMail] = useState(false)
    const [ccMail, setCCMail] = useState(false)
    const [file, setfile] = useState(null);

    const onSubmit = (data) => {

        let formdata = new FormData();
        formdata.append("SendMailID", 0)
        formdata.append("SendTo", data?.email)
        formdata.append("SendCC", data?.cc ? data?.cc : '')
        formdata.append("SendBCC", data?.Bcc ? data?.Bcc : '')
        formdata.append("Subject", data?.Subject)
        formdata.append("Body", data?.Message)
        formdata.append("Files", file)

        try {
            dispatch(handleSendMails(formdata)).then((res) => {
                if (res.payload.status === true) {
                    setSendMail(false);
                    setloadFrist(true)
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
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-lg max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">New Message</h3>
                            <AiOutlineCloseCircle
                                className="text-4xl text-primary cursor-pointer"
                                onClick={() => {
                                    setSendMail(false);
                                }}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className='p-4 w-full'>
                                <div className={`w-full flex flex-row gap-2 items-center border-b pb-2 `}>
                                    <span>To</span>
                                    <input type='email' className='w-full p-2' placeholder='Recipients'
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "E-mail must be a valid e-mail address",
                                            },
                                        })}
                                    />
                                    {(!ccMail || !BccMail) && (
                                        <div className='gap-2 flex'>
                                            {!ccMail && (
                                                <span className='hover:underline cursor-pointer' onClick={() => setCCMail(true)}>Cc</span>
                                            )}
                                            {!BccMail && (
                                                <span className='hover:underline cursor-pointer' onClick={() => setBCCMail(true)} >Bcc</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {errors.email && <p className="text-red-500 text-sm my-2">{errors?.email?.message}</p>}
                                {ccMail && (
                                    <div className='w-full flex flex-row gap-2 items-center border-b pb-2 my-2'>
                                        <span>Cc</span>
                                        <input type='email' className='w-full p-2'
                                            {...register("cc")}
                                        />
                                    </div>
                                )}
                                {BccMail && (
                                    <div className='w-full flex flex-row gap-2 items-center border-b pb-2 mb-2'>
                                        <span>Bcc</span>
                                        <input type='email' className='w-full p-2'
                                            {...register("Bcc")}
                                        />
                                    </div>
                                )}

                                <div className='w-full flex flex-row gap-2 items-center border-b pb-2 mb-2'>
                                    <input type='text' className='w-full p-2' placeholder='Subject'
                                        {...register("Subject")}
                                    />
                                </div>

                                <div className='w-full '>
                                    <textarea type='text' className='w-full h-[250px] p-2' placeholder='Your Message'
                                        {...register("Message")}
                                    />
                                </div>

                                <div className="flex items-center justify-start p-3 pb-0 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
                                    <button
                                        className="bg-black text-black text-base px-8 py-3 border border-primary shadow-md rounded-full "
                                        type="submit"
                                    >
                                        Send
                                    </button>
                                    <div className="layout-detaills">
                                        <div className="flex">
                                            <button
                                                type='button'
                                                className="rounded-lg p-2 hover:bg-slate-200"
                                                onClick={() => hiddenFileInput.current.click()}
                                                title="Attachment"
                                            >
                                                <IoMdAttach size={20} />
                                                <input
                                                    type="file"
                                                    id="upload-button"
                                                    className='opacity-0 border'
                                                    style={{ display: "none" }}
                                                    ref={hiddenFileInput}
                                                    onChange={(e) => {
                                                        const files = e.target.files[0];
                                                        setfile(files)
                                                    }}
                                                    multiple
                                                // accept="image/*"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
