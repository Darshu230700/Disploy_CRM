/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';

const ThankYouPreview = ({ setIsEmbedded, isEmbedded, BackgroundhexaCode, theme, submitOptions, submitForm, setSubmitForm, responseRef }) => {
    const handleEmbeddedChange = () => {
        setIsEmbedded(!isEmbedded);
    };
    return (
        <>

            <div className='flex flex-col border-l border-gray-200 dark:border-gray-700 h-full'>
                <div className='py-2 px-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
                    <div className='font-bold'>
                        PREVIEW
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <label> Standalone
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                id='ViewShow'
                                value={isEmbedded}
                                onChange={handleEmbeddedChange}
                            />
                            <div className="w-11 h-6 bg-gray-400 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                        <label> Embedded
                        </label>
                    </div>
                </div>
                <div
                    className='h-full w-full'
                    ref={responseRef}
                >
                    <div className='py-8 px-2 h-full'
                        style={{
                            background: theme === "dark" && isEmbedded
                                ? "black"
                                : theme === "Light" && isEmbedded
                                    ? "white"
                                    : theme === "Light" && !isEmbedded
                                        ? BackgroundhexaCode === "#255255255FF"
                                            ? "none"
                                            : BackgroundhexaCode
                                        : theme === "dark" && !isEmbedded
                                            ? BackgroundhexaCode === "#255255255FF"
                                                ? "black"
                                                : BackgroundhexaCode
                                            : undefined
                        }}>


                        {submitOptions?.submitType === "Show thank you message" && (
                            <div className={`max-w-[480px] ${isEmbedded ? "" : "p-8 shadow-lg"} mx-6 rounded-md`}
                                style={{
                                    backgroundColor: theme === "dark" && isEmbedded
                                        ? "black"
                                        : theme === "Light"
                                            ? "white"
                                            : "rgb(31, 31, 31)"
                                }}>
                                <div>
                                    <div className='text-3xl mb-4 font-medium'
                                        style={{
                                            color:
                                                theme === "Light"
                                                    ? "black"
                                                    : "white"
                                        }}>
                                        {submitOptions?.title}
                                    </div>
                                    <div className='text-base'
                                        style={{
                                            color:
                                                theme === "Light"
                                                    ? "black"
                                                    : "white"
                                        }}
                                        dangerouslySetInnerHTML={{ __html: submitOptions?.message }}
                                    />
                                </div>
                            </div>
                        )}
                        {submitOptions?.submitType === "Redirect to another website" && (
                            <div className={`max-w-[480px] mx-6`}>
                                <div className={`max-w-[400px] py-6 px-2`}>
                                    <div>
                                        <h3 className='text-2xl font-medium'
                                            style={{
                                                color:
                                                    theme === "Light"
                                                        ? "black"
                                                        : "white"
                                            }}>Form submitted</h3>
                                        <p className='py-4'
                                            style={{
                                                color:
                                                    theme === "Light"
                                                        ? "black"
                                                        : "white"
                                            }}>
                                            Your visitor will not see this message and be redirected to the URL below instead:
                                        </p>
                                        <a target='_blank'>
                                            {submitOptions?.websiteURL}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                        {submitForm && (
                            <div className='w-full m-auto py-5'>
                                <div className='max-w-[480px] m-auto bg-transparent '>
                                    <button className='gap-2 py-2 px-6 flex items-center flex-row cursor-pointer bg-transparent rounded-md text-blue-600 text-xl' onClick={() => setSubmitForm(false)}>
                                        <IoArrowBackSharp />
                                        Back
                                    </button>
                                </div>
                            </div>

                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ThankYouPreview
