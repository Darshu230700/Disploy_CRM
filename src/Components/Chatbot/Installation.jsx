/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { BiLogoWordpress } from 'react-icons/bi'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import { GoArrowUpRight } from 'react-icons/go'
import { HiLink, HiOutlineCode } from 'react-icons/hi'
import { HiCheck } from 'react-icons/hi2'
import { IoMdSend } from "react-icons/io";
export default function Installation() {
    const [activeAccordion, setActiveAccordion] = useState("");

    const toggleAccordion = (accordionId) => {
        setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
    };

    return (
        <div>
            <div
                className="w-full border border-gray-200 "
                id="Installation"
                role="tabpanel"
                aria-labelledby="Installation-tab"
            >
                <div className=" relative mb-4 rounded-md p-4">
                    <div className=" w-full relative mb-4">
                        <h3 className="font-medium text-3xl">Add playbook to your website</h3>
                        <p className="font-normal flex gap-1 text-gray-500 text-sm dark:text-gray-400">
                            Choose how to install the bot on your website or
                            <a href="" className="text-blue-600 flex gap-2">
                                {" "}
                                send the instructions to your colleague{" "}
                                <IoMdSend className="ti ti-send text-xl" />{" "}
                            </a>
                        </p>
                        <div id="accordion-collapse" data-accordion="collapse" className="mt-4">
                            <div className="border border-gray-200 dark:border-slate-700 mb-3">
                                <h2 id="accordion-collapse-heading-1">
                                    <button
                                        type="button"
                                        className={`flex justify-between items-center px-4 py-3 w-full font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20${activeAccordion === "accordion-collapse-body-1" ? "active bg-slate-100" : ""} `}
                                        data-accordion-target="#accordion-collapse-body-1"
                                        aria-expanded="true"
                                        aria-controls="accordion-collapse-body-1"
                                        onClick={() => toggleAccordion("accordion-collapse-body-1")}
                                    >
                                        <span className="flex items-center">
                                            <HiOutlineCode className="ti ti-code text-xl mr-2" />
                                            <span>Manual installation</span>
                                        </span>
                                        {activeAccordion !==
                                            "accordion-collapse-body-1" ? (
                                            <FaAngleDown />
                                        ) : (
                                            <FaAngleUp />
                                        )}
                                    </button>
                                </h2>
                                <div
                                    id="accordion-collapse-body-1"
                                    className={`px-4 py-2 ${activeAccordion === "accordion-collapse-body-1" ? "block" : "hidden"}`}
                                    aria-labelledby="accordion-collapse-heading-1 "
                                >
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        It is a long established fact that a reader will be distracted by
                                        the readable content of a page when looking at its layout.
                                    </p>
                                </div>
                            </div>
                            <div className="border border-gray-200 dark:border-slate-700 mb-3">
                                <h2 id="accordion-collapse-heading-2">
                                    <button
                                        type="button"
                                        className={`flex justify-between items-center px-4 py-3 w-full font-medium text-left text-gray-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20${activeAccordion === "accordion-collapse-body-2" ? "active bg-slate-100" : ""}`}
                                        data-accordion-target="#accordion-collapse-body-2"
                                        aria-expanded="false"
                                        aria-controls="accordion-collapse-body-2"
                                        onClick={() =>
                                            toggleAccordion(
                                                "accordion-collapse-body-2"
                                            )
                                        }
                                    >
                                        <span className="flex items-center">
                                            <BiLogoWordpress className="ti ti-brand-wordpress text-xl mr-2" />
                                            <span>WordPress</span>
                                        </span>
                                        {activeAccordion !==
                                            "accordion-collapse-body-2" ? (
                                            <FaAngleDown />
                                        ) : (
                                            <FaAngleUp />
                                        )}
                                    </button>
                                </h2>
                                <div
                                    id="accordion-collapse-body-2"
                                    className={`px-4 py-2 ${activeAccordion === "accordion-collapse-body-2" ? "block" : "hidden"}`}
                                    aria-labelledby="accordion-collapse-heading-2"
                                >
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                                        It has roots in a piece of classical Latin literature from.
                                    </p>
                                </div>
                            </div>
                            <div className="border border-gray-200 dark:border-slate-700 mb-3">
                                <h2 id="accordion-collapse-heading-3">
                                    <button
                                        type="button"
                                        className={`flex justify-between items-center px-4 py-3 w-full font-medium text-left text-gray-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion === "accordion-collapse-body-3" ? "active bg-slate-100" : ""}`}
                                        data-accordion-target="#accordion-collapse-body-3"
                                        aria-expanded="false"
                                        aria-controls="accordion-collapse-body-3"
                                        onClick={() =>
                                            toggleAccordion(
                                                "accordion-collapse-body-3"
                                            )
                                        }
                                    >
                                        <span className="flex items-center">
                                            <HiLink className="ti ti-link text-xl mr-2" />
                                            <span>Squarespace</span>
                                        </span>
                                        {activeAccordion !==
                                            "accordion-collapse-body-3" ? (
                                            <FaAngleDown />
                                        ) : (
                                            <FaAngleUp />
                                        )}
                                    </button>
                                </h2>
                                <div
                                    id="accordion-collapse-body-3"
                                    className={`px-4 py-2 ${activeAccordion === "accordion-collapse-body-3" ? "block" : "hidden"}`}
                                    aria-labelledby="accordion-collapse-heading-3"
                                >
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        There are many variations of passages of Lorem Ipsum available,
                                        but the majority have suffered alteration in some form.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="font-normal text-gray-500 text-sm dark:text-gray-400 flex">
                            For usage of LeadBooster Browser API follow this  &nbsp;
                            <a href="" className="text-blue-600 flex items-center">
                                document <GoArrowUpRight />{" "}
                            </a>
                        </p>
                    </div>
                    <div className=" w-full relative my-4">
                        <h3 className="font-medium text-3xl">Verify installation</h3>
                        <p className="font-normal text-gray-500 text-sm dark:text-gray-400">
                            To check that your chatbot is working, insert the URL of the website
                            where you installed it{" "}
                            <button
                                type="button"
                                className="tippy-btn inline-block focus:outline-none text-slate-500  text-sm font-medium py-1 px-2 rounded mb-1"
                                data-tippy-content="Verification might not work for installations using Google Tag Manager and other similar services."
                                data-tippy-arrow="true"
                                data-tippy-placement="right"
                            >
                                <AiFillQuestionCircle className="ti ti-question-mark" />
                            </button>
                        </p>
                        <div className="flex items-center py-3">
                            <input
                                type="email"
                                className="form-input w-96 rounded-md border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-2 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700 mr-3"
                                placeholder="codinet@disployemail.com"
                            />
                            <a className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 flex items-center"
                            ><HiCheck className='text-xl mr-2' />
                                Verify{" "}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
