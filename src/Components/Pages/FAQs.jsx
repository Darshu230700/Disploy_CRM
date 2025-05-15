/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import faqs from "../../Images/widgets/faqs.png";
const FAQs = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen,isDark, setIsDark}) => {
  const [activeAccordion, setActiveAccordion] = useState("");

  const toggleAccordion = (accordionId) => {
    setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
  };
  return (
    <>
        <Sidebar
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark}/>
        <div className="flex flex-1 ">
          <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
            <div className="xl:w-full">
              <div className="flex flex-wrap">
                <div className="flex items-center py-4 w-full">
                  <div className="w-full">
                    <div className="">
                      <div className="flex flex-wrap justify-between">
                        <div className="items-center ">
                          <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                            FAQs
                          </h1>
                          <ol className="list-reset flex text-sm">
                            <li>
                              <a href="#" className="text-gray-500">
                                Disploy
                              </a>
                            </li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-gray-500">Pages</li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-blue-600 hover:text-blue-700">
                              FAQs
                            </li>
                          </ol>
                        </div>
                        <div className="flex items-center">
                          <button className="px-3 py-2 lg:px-4 bg-blue-500 collapse:bg-green-100 text-white text-sm font-semibold rounded hover:bg-blue-600">
                            Create New
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">
                        Most Commonly Asked Questions
                      </h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                          <ul className="list-unstyled">
                            <li className="mb-8">
                              <h6 className="font-medium text-base dark:text-slate-300">
                                1. What is Disploy?
                              </h6>
                              <p className="text-sm text-slate-400 ml-3">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid.
                              </p>
                            </li>
                            <li className="mb-8">
                              <h6 className="font-medium text-base dark:text-slate-300">
                                2. What cryptocurrency can i use to buy Disploy?
                              </h6>
                              <p className="text-sm text-slate-400 ml-3">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid.
                              </p>
                            </li>
                            <li className="mb-8">
                              <h6 className="font-medium text-base dark:text-slate-300">
                                3. Can i trade Disploy?
                              </h6>
                              <p className="text-sm text-slate-400 ml-3">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid.
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                          <ul className="list-unstyled">
                            <li className="mb-8">
                              <h6 className="font-medium text-base dark:text-slate-300">
                                4. What is Disploy?
                              </h6>
                              <p className="text-sm text-slate-400 ml-3">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid.
                              </p>
                            </li>
                            <li className="mb-8">
                              <h6 className="font-medium text-base dark:text-slate-300">
                                5. What cryptocurrency can i use to buy Disploy?
                              </h6>
                              <p className="text-sm text-slate-400 ml-3">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid.
                              </p>
                            </li>
                            <li className="mb-8">
                              <h6 className="font-medium text-base dark:text-slate-300">
                                6. Can i trade Disploy?
                              </h6>
                              <p className="text-sm text-slate-400 ml-3">
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid.
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Accordion Type Questions</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div id="accordion-collapse" data-accordion="collapse">
                        <div>
                          <h2 id="accordion-collapse-heading-1">
                            <button
                              type="button"
                              className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 rounded-t-xl border border-b-0 border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${
                                activeAccordion === "accordion-collapse-body-1"
                                  ? "active"
                                  : ""
                              }`}
                              data-accordion-target="#accordion-collapse-body-1"
                              aria-expanded={
                                activeAccordion === "accordion-collapse-body-1"
                              }
                              aria-controls="accordion-collapse-body-1"
                              onClick={() =>
                                toggleAccordion("accordion-collapse-body-1")
                              }
                            >
                              <span>What is Disploy?</span>
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
                            className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${
                              activeAccordion === "accordion-collapse-body-1"
                                ? "block"
                                : "hidden"
                            }`}
                            aria-labelledby="accordion-collapse-heading-1"
                          >
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout.
                            </p>
                          </div>
                        </div>
                        <div>
                          <h2 id="accordion-collapse-heading-2">
                            <button
                              type="button"
                              className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-b-0 border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${
                                activeAccordion === "accordion-collapse-body-2"
                                  ? "active"
                                  : ""
                              }`}
                              data-accordion-target="#accordion-collapse-body-2"
                              aria-expanded={
                                activeAccordion === "accordion-collapse-body-2"
                              }
                              aria-controls="accordion-collapse-body-2"
                              onClick={() =>
                                toggleAccordion("accordion-collapse-body-2")
                              }
                            >
                              <span>Is there a Figma file available?</span>
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
                            className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${
                              activeAccordion === "accordion-collapse-body-2"
                                ? "block"
                                : "hidden"
                            }`}
                            aria-labelledby="accordion-collapse-heading-2"
                          >
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                              Contrary to popular belief, Lorem Ipsum is not
                              simply random text. It has roots in a piece of
                              classical Latin literature from.
                            </p>
                          </div>
                        </div>
                        <div>
                          <h2 id="accordion-collapse-heading-3">
                            <button
                              type="button"
                              className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${
                                activeAccordion === "accordion-collapse-body-3"
                                  ? "active"
                                  : ""
                              }`}
                              data-accordion-target="#accordion-collapse-body-3"
                              aria-expanded={
                                activeAccordion === "accordion-collapse-body-3"
                              }
                              aria-controls="accordion-collapse-body-3"
                              onClick={() =>
                                toggleAccordion("accordion-collapse-body-3")
                              }
                            >
                              <span>
                                What are the differences between Disploy and
                                Tailwind UI?
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
                            className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${
                              activeAccordion === "accordion-collapse-body-3"
                                ? "block"
                                : "hidden"
                            }`}
                            aria-labelledby="accordion-collapse-heading-3"
                          >
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have suffered
                              alteration in some form.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Have More Questions</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4 self-center">
                          <img
                            src={faqs}
                            alt=""
                            className="h-60 block mx-auto"
                          />
                        </div>
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2">
                              <div className="mb-2">
                                <label
                                  for="Name"
                                  className="font-medium text-sm text-slate-600"
                                >
                                  Name
                                </label>
                                <input
                                  className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                  placeholder="Name"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2">
                              <div className="mb-2">
                                <label
                                  for="Email"
                                  className="font-medium text-sm text-slate-600"
                                >
                                  Email
                                </label>
                                <input
                                  className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                  placeholder="Email"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-2">
                            <label
                              for="Subject"
                              className="font-medium text-sm text-slate-600"
                            >
                              Subject :
                            </label>
                            <input
                              className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                              placeholder="Subject"
                              type="text"
                            />
                          </div>
                          <label
                            for="message"
                            className="font-medium text-sm text-slate-600"
                          >
                            Massage{" "}
                          </label>
                          <textarea
                            id="message"
                            rows="4"
                            className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                            placeholder="Leave a comment..."
                          ></textarea>
                          <div className="mt-2">
                            <button
                              type="submit"
                              className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </div>
    </>
  );
};

export default FAQs;
