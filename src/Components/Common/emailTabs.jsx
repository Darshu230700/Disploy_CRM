import React from "react";
import {  useNavigate } from "react-router-dom";


const EmailTabs = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="flex justify-between items-center mt-5">
                <div className="min-w-44 mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="179"
                        height="175"
                        fill="none"
                        className=""
                    >
                        <g clip-path="url(#composer-promo-icon_svg__a)">
                            <path
                                fill="#EFF5FD"
                                d="M152.431 37.73c21.929 20.436 23.654 64.115 13.892 104.54-9.763 40.381-30.957 77.463-60.479 88.238-29.51 10.731-67.335-4.858-92.727-25.182-25.436-20.38-38.326-45.462-42.011-70.254-3.674-24.736 1.848-49.15 15.907-67.802 14.06-18.709 36.601-31.6 68.961-39.423 32.349-7.822 74.538-10.607 96.457 9.884Z"
                            ></path>
                        </g>
                        <g clip-path="url(#composer-promo-icon_svg__b)">
                            <circle cx="91" cy="93" r="32" fill="#CEDFF8"></circle>
                            <path
                                fill="#EEE"
                                fill-rule="evenodd"
                                d="m49.951 128.305 6.119 15.013 6.838-6.735 30.232-41.03-43.189 32.752Z"
                                clip-rule="evenodd"
                            ></path>
                            <path
                                fill="#fff"
                                fill-rule="evenodd"
                                d="m93.14 95.554-53.503 25.511a.507.507 0 0 0-.047.89l10.36 6.35 43.19-32.751-37.07 36.71 6.944 4.111 10.187 6.028a.507.507 0 0 0 .727-.243L93.14 95.554Z"
                                clip-rule="evenodd"
                            ></path>
                            <path
                                stroke="#26292C"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m93.14 95.554-53.503 25.511a.507.507 0 0 0-.047.89l10.36 6.35m43.19-32.751-43.19 32.751m43.19-32.751-37.07 36.71m37.07-36.71L73.928 142.16a.507.507 0 0 1-.727.243l-10.186-6.028m-13.064-8.07 6.118 15.015m0-11.056v11.056m0-11.056 6.945 4.111m-6.945 6.945 6.945-6.945"
                            ></path>
                            <rect
                                width="29"
                                height="29"
                                x="114"
                                y="116"
                                fill="#26292C"
                                rx="1.475"
                            ></rect>
                            <path
                                fill="#fff"
                                fill-rule="evenodd"
                                d="M126.803 128.415c0-2.491 1.35-3.378 2.613-3.378 1.549 0 2.591 1.347 2.591 3.355 0 2.29-1.325 3.312-2.635 3.312-1.766 0-2.569-1.706-2.569-3.289Zm3.235-6.31c-1.843 0-2.909.836-3.424 1.413-.062-.497-.386-1.143-1.654-1.143h-2.753v2.908h1.128c.192 0 .253.062.253.255v13.279h3.282v-4.984c0-.134-.003-.26-.006-.373.512.474 1.491 1.129 3.02 1.129 3.208 0 5.451-2.566 5.451-6.241 0-3.734-2.13-6.243-5.297-6.243Z"
                                clip-rule="evenodd"
                            ></path>
                            <path
                                fill="#EEE"
                                fill-rule="evenodd"
                                d="M133.918 91.696 130.212 101l-3.857-4.516L107.761 71.4l26.157 20.296Z"
                                clip-rule="evenodd"
                            ></path>
                            <path
                                fill="#fff"
                                fill-rule="evenodd"
                                d="m107.76 71.4 32.403 15.81a.318.318 0 0 1 .028.551l-6.275 3.935L107.76 71.4l22.451 22.75-3.858 2.336-6.518 3.947a.302.302 0 0 1-.44-.151L107.76 71.4Z"
                                clip-rule="evenodd"
                            ></path>
                            <path
                                stroke="#26292C"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m107.76 71.4 32.403 15.81a.318.318 0 0 1 .028.551l-6.275 3.935M107.76 71.4l26.156 20.296M107.76 71.4l22.451 22.75M107.76 71.4l11.635 28.882a.302.302 0 0 0 .44.151l6.518-3.947m7.563-4.79-3.705 9.254m0-6.8v6.8m0-6.8-3.858 2.336m3.858 4.464-3.858-4.464"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="composer-promo-icon_svg__a">
                                <path fill="#fff" d="M0 0h179v289H0z"></path>
                            </clipPath>
                            <clipPath id="composer-promo-icon_svg__b">
                                <path fill="#fff" d="M31 33h120v120H31z"></path>
                            </clipPath>
                        </defs>
                    </svg>
                </div>



                <div className="text-md ">
                    <h2 className="text-start text-2xl font-bold">
                        Unlock Sales Inbox
                    </h2>
                    <p className="mb-2">Connect your email account to Pipedrive. Synchronise messages
                        and link them to relevant leads, deals and contacts for ease
                        of use.</p>
                    <ul className="text-left list-disc text-md pl-4">
                        <li>Sync emails from any major provider.</li>
                        <li>Track messages views and clicks</li>
                        <li>Use templates to save time.</li>
                        <li>Set up automated workflows for email</li>
                    </ul>
                    <div className="flex items-center">
                        <button className="bg-green-500 text-white rounded-md p-2 mr-3 mt-2"
                            onClick={() => {
                                navigate('/email')
                            }}
                        >
                            Add New account
                        </button>
                        <h3 className="underline text-blue-500">
                            Learn more about Email integration
                        </h3>
                    </div>
                </div>
            </div>

        </>
    )
}


export default EmailTabs