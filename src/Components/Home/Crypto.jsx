import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
// import logo from "../../Images/logos/btc.png"
// import IMG from "../../Images/logos/eth.png"
// import IMG1 from "../../Images/logos/dash.png"
// import IMG2 from "../../Images/logos/lite.png"
// import IMG3 from "../../Images/logos/mon.png"
// import IMG4 from "../../Images/logos/gas.png"
const Crypto = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
  const [activeTab, setActiveTab] = useState("Sell"); // Default active tab is 'Sell'

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: 550,
        symbol: "BITSTAMP:BTCUSD",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "Light",
        style: "1",
        locale: "en",
        toolbar_bg: "#000",
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
        container_id: "tradingview_123",
      });
    };
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://widgets.cryptocompare.com/serve/v1/coin/histo_week?fsym=BTC&tsym=USD&app=www.cryptocompare.com";
    script.async = true;

    // Get the container element where you want to render the widget
    const container = document.getElementById("cryptoCompareWidgetContainer");

    // Append the script to the container
    container.appendChild(script);

    // Clean up function to remove the script when the component unmounts
    return () => {
      container.removeChild(script);
    };
  }, []);
  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark}/>
        <div className="flex flex-1">
          <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
            <div className="xl:w-full">
              <div className="flex flex-wrap">
                <div className="flex items-center py-4 w-full">
                  <div className="w-full">
                    <div className="">
                      <div className="flex flex-wrap justify-between">
                        <div className="items-center ">
                          <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                            Crypto
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
                            <li className="text-gray-500">Dashboard</li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-blue-600 hover:text-blue-700">
                              Crypto
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
            <div className="xl:w-full">
              <div className="flex flex-wrap">
                <div className="flex items-center pb-4 w-full">
                  <div className="w-full">
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="items-center ">
                        <a
                          href="#SendModal"
                          data-modal-toggle="modal"
                          className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded"
                        >
                          Send
                        </a>
                        <a
                          href="#RequestModal"
                          data-modal-toggle="modal"
                          className="inline-block focus:outline-none text-green-500 hover:bg-green-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-green-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-green-500  text-sm font-medium py-1 px-3 rounded"
                        >
                          Request
                        </a>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {/* <img
                            className="w-9 h-9 overflow-hidden object-cover rounded object-center"
                            src={logo}
                            alt="logo"
                          /> */}
                          <div className="ml-2">
                            <p
                              tabindex="0"
                              className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                            >
                              Total Balance
                            </p>
                            <a
                              tabindex="0"
                              className="cursor-pointer hover:text-gray-500 focus:text-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none focus:underline"
                            >
                              <h5 className=" font-medium text-base">
                                122.00125503 BTC
                              </h5>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8 ">
                  <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative mb-4">
                    <div className="flex-auto p-4">
                      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
                        <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4">
                          <div className="align-center pb-4 border-b xl:border-b-0 xl:pb-0 pr-0 xl:pr-4 border-r-0 xl:border-r dark:border-r-slate-700">
                            <h6 className="text-sm text-slate-400 mb-2 font-medium">
                              Bitcoin Price (BTC)
                            </h6>
                            <div className="flex items-center">
                              <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-200">
                                $19,106.74
                              </h2>
                              <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-0.5 rounded h-5 ml-2">
                                1.25%
                              </span>
                            </div>
                            <h6 className="text-sm text-slate-400 my-2">
                              14.88 (ETH)
                            </h6>
                            <div className="w-full">
                              <div className="flex justify-between">
                                <p className="text-sm font-semibold text-slate-400 leading-none text-left pb-1">
                                  Low:$18,768.00
                                </p>
                                <p className="text-sm font-semibold text-slate-400 leading-none text-right pb-1">
                                  High:$19,054.00
                                </p>
                              </div>
                              <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                <div
                                  className="h-1 bg-slate-400 rounded-full"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-12  md:col-span-6 lg:col-span-6 xl:col-span-4 grid items-center">
                          <div className="py-4 border-b md:border-b-0 pr-0 md:pr-4 border-r-0 md:border-r dark:border-r-slate-700 pl-0 xl:pl-4 md:pb-0 xl:pt-0">
                            <h6 className="text-sm text-slate-400 mb-2 font-medium inline-block">
                              Market Cap
                            </h6>
                            <div className="group inline-block">
                              <p className="">
                                <i className="ti ti-alert-circle text-slate-400 cursor-pointer"></i>
                                <span className="tooltip-text bg-white p-3 xl:w-[30%] -ml-20 rounded hidden group-hover:block absolute text-slate-500 font-medium text-sm shadow-sm py-2 px-6 z-10;">
                                  The total market value of a cryptocurrency's
                                  circulating supply. It is analogous to the
                                  free-float capitalization in the stock market.{" "}
                                  <a
                                    href="#"
                                    className="text-blue-500 font-semibold block mt-2"
                                  >
                                    Read More
                                  </a>
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center">
                              <h6 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                $367,883,865,103
                              </h6>
                              <span className="text-green-500 text-[12px] font-bold  ml-1">
                                1.25%
                              </span>
                            </div>
                            <hr className="my-2 border-dashed dark:border-slate-700" />
                            <h6 className="text-sm text-slate-400 mb-2 font-medium inline-block">
                              Circulating Supply
                            </h6>
                            <div className="group inline-block">
                              <p className="">
                                <i className="ti ti-alert-circle text-slate-400 cursor-pointer"></i>
                                <span className="tooltip-text bg-white p-3 xl:w-[30%] -ml-20 rounded hidden group-hover:block absolute text-slate-500 font-medium text-sm shadow-sm py-2 px-6 z-10;">
                                  The total market value of a cryptocurrency's
                                  circulating supply. It is analogous to the
                                  free-float capitalization in the stock market.{" "}
                                  <a
                                    href="#"
                                    className="text-blue-500 font-semibold block mt-2"
                                  >
                                    Read More
                                  </a>
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center">
                              <h6 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                $367,883,865,103
                              </h6>
                              <span className="text-red-500 text-[12px] font-bold  ml-1">
                                0.25%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-12  md:col-span-6 lg:col-span-6 xl:col-span-4">
                          <div className="align-center pt-4 pl-0 md:pl-4 xl:pt-0">
                            <h6 className="text-sm text-slate-400 mb-2 font-medium inline-block">
                              Volume{" "}
                              <span className="bg-slate-200 text-slate-600 dark:bg-slate-600/40 dark:text-slate-400 text-[12px] font-bold px-2 py-0 rounded h-5 ml-1">
                                24h
                              </span>
                            </h6>
                            <div className="group inline-block">
                              <p className="">
                                <i className="ti ti-alert-circle text-slate-400 cursor-pointer"></i>
                                <span className="tooltip-text bg-white p-3 xl:w-[30%] -ml-20 rounded hidden group-hover:block absolute text-slate-500 font-medium text-sm shadow-sm py-2 px-6 z-10;">
                                  The total market value of a cryptocurrency's
                                  circulating supply. It is analogous to the
                                  free-float capitalization in the stock market.{" "}
                                  <a
                                    href="#"
                                    className="text-blue-500 font-semibold block mt-2"
                                  >
                                    Read More
                                  </a>
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center">
                              <h6 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                $367,883,865,103
                              </h6>
                              <span className="text-red-500 text-[12px] font-bold  ml-1">
                                0.25%
                              </span>
                            </div>
                            <hr className="my-2 border-dashed dark:border-slate-700" />
                            <h6 className="text-sm text-slate-400 mb-2 font-medium inline-block">
                              Max Supply
                            </h6>
                            <div className="group inline-block">
                              <p className="">
                                <i className="ti ti-alert-circle text-slate-400 cursor-pointer"></i>
                                <span className="tooltip-text bg-white p-3 xl:w-[30%] -ml-20 rounded hidden group-hover:block absolute text-slate-500 font-medium text-sm shadow-sm py-2 px-6 z-10;">
                                  The total market value of a cryptocurrency's
                                  circulating supply. It is analogous to the
                                  free-float capitalization in the stock market.{" "}
                                  <a
                                    href="#"
                                    className="text-blue-500 font-semibold block mt-2"
                                  >
                                    Read More
                                  </a>
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center">
                              <h6 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                $367,883,865,103
                              </h6>
                              <span className="text-green-500 text-[12px] font-bold  ml-1">
                                1.25%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                    <div className="flex-auto p-4">
                      <div className="tradingview-widget-container">
                        <div id="tradingview_123"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 shadow overflow-hidden  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">
                        Historical Bitcoin Price And Volume
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 p-4">
                      <div className="sm:-mx-6 lg:-mx-8">
                        <div className="relative scroll-inner block w-full sm:px-6 lg:px-8">
                          <div className="">
                            <table className="w-full">
                              <thead className="bg-gray-50 dark:bg-gray-700/20">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Name/Price
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Change
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Chart
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Market Cap
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Volume (24h)
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Supply
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-right text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Operation
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      {/* <img
                                        src={logo}
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      /> */}
                                      <div className="self-center">
                                        <span className="block  font-medium text-slate-500">
                                          Bitcoin{" "}
                                          <small className="text-slate-500">
                                            (BTC)
                                          </small>
                                        </span>
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          $20,865.8
                                        </h5>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="text-green-500 text-[13px] font-bold">
                                      1.25%
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div
                                      id="line-1"
                                      className="apex-charts"
                                    ></div>
                                  </td>
                                  <td className="p-3 text-sm font-semibold text-slate-700 whitespace-nowrap dark:text-gray-400">
                                    $380,245,829,329
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                      $67,245,829,329
                                    </h5>
                                    <span className="block font-medium text-slate-500">
                                      3,387,499{" "}
                                      <small className="text-slate-500">
                                        BTC
                                      </small>
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          19,054.00{" "}
                                          <small className="">BTC</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div
                                          className="h-1 bg-slate-400 rounded-full"
                                          style={{ width: "90%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 border-r dark:border-r-slate-700 px-2"
                                    >
                                      Details
                                    </a>
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 px-2"
                                    >
                                      Trade
                                    </a>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      {/* <img
                                        src={IMG}
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      /> */}
                                      <div className="self-center">
                                        <span className="block  font-medium text-slate-500">
                                          Ethereum{" "}
                                          <small className="text-slate-500">
                                            (ETH)
                                          </small>
                                        </span>
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          $1,487.8
                                        </h5>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="text-red-500 text-[13px] font-bold">
                                      0.25%
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div
                                      id="line-1"
                                      className="apex-charts"
                                    ></div>
                                  </td>
                                  <td className="p-3 text-sm font-semibold text-slate-700 whitespace-nowrap dark:text-gray-400">
                                    $181,868,196,709
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                      $20,570,308,640
                                    </h5>
                                    <span className="block font-medium text-slate-500">
                                      30,620,723{" "}
                                      <small className="text-slate-500">
                                        ETH
                                      </small>
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          122,373,863.50{" "}
                                          <small className="">ETH</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div
                                          className="h-1 bg-slate-400 rounded-full"
                                          style={{ width: "80%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 border-r dark:border-r-slate-700 px-2"
                                    >
                                      Details
                                    </a>
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 px-2"
                                    >
                                      Trade
                                    </a>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      {/* <img
                                        src={IMG1}
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      /> */}
                                      <div className="self-center">
                                        <span className="block  font-medium text-slate-500">
                                          Dash{" "}
                                          <small className="text-slate-500">
                                            (DASH)
                                          </small>
                                        </span>
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          $43,80
                                        </h5>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="text-green-500 text-[13px] font-bold">
                                      1.55%
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div
                                      id="line-1"
                                      className="apex-charts"
                                    ></div>
                                  </td>
                                  <td className="p-3 text-sm font-semibold text-slate-700 whitespace-nowrap dark:text-gray-400">
                                    $471,692,224
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                      $27,046,896
                                    </h5>
                                    <span className="block font-medium text-slate-500">
                                      1,243,127{" "}
                                      <small className="text-slate-500">
                                        DASH
                                      </small>
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          10,994,761.68{" "}
                                          <small className="">BTC</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div
                                          className="h-1 bg-slate-400 rounded-full"
                                          style={{ width: "70%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 border-r dark:border-r-slate-700 px-2"
                                    >
                                      Details
                                    </a>
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 px-2"
                                    >
                                      Trade
                                    </a>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      {/* <img
                                        src={IMG2}
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      /> */}
                                      <div className="self-center">
                                        <span className="block  font-medium text-slate-500">
                                          Litecoin{" "}
                                          <small className="text-slate-500">
                                            (LTC)
                                          </small>
                                        </span>
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          $64.68
                                        </h5>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="text-green-500 text-[13px] font-bold">
                                      0.95%
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div
                                      id="line-1"
                                      className="apex-charts"
                                    ></div>
                                  </td>
                                  <td className="p-3 text-sm font-semibold text-slate-700 whitespace-nowrap dark:text-gray-400">
                                    $4,627,444,066
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                      $1,180,337,832
                                    </h5>
                                    <span className="block font-medium text-slate-500">
                                      1,532,112{" "}
                                      <small className="text-slate-500">
                                        LTC
                                      </small>
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          71,564,906.23{" "}
                                          <small className="">LTC</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div
                                          className="h-1 bg-slate-400 rounded-full"
                                          style={{ width: "56%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 border-r dark:border-r-slate-700 px-2"
                                    >
                                      Details
                                    </a>
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 px-2"
                                    >
                                      Trade
                                    </a>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      {/* <img
                                        src={IMG3}
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      /> */}
                                      <div className="self-center">
                                        <span className="block  font-medium text-slate-500">
                                          Monero{" "}
                                          <small className="text-slate-500">
                                            (XMR)
                                          </small>
                                        </span>
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          $147.54
                                        </h5>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="text-red-500 text-[13px] font-bold">
                                      0.60%
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div
                                      id="line-1"
                                      className="apex-charts"
                                    ></div>
                                  </td>
                                  <td className="p-3 text-sm font-semibold text-slate-700 whitespace-nowrap dark:text-gray-400">
                                    $2,686,757,094
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                      $105,236,181
                                    </h5>
                                    <span className="block font-medium text-slate-500">
                                      236,181{" "}
                                      <small className="text-slate-500">
                                        XMR
                                      </small>
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          18,197,866.18{" "}
                                          <small className="">XMR</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div
                                          className="h-1 bg-slate-400 rounded-full"
                                          style={{ width: "37%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 border-r dark:border-r-slate-700 px-2"
                                    >
                                      Details
                                    </a>
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 px-2"
                                    >
                                      Trade
                                    </a>
                                  </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      {/* <img
                                        src={IMG4}
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      /> */}
                                      <div className="self-center">
                                        <span className="block  font-medium text-slate-500">
                                          Gas{" "}
                                          <small className="text-slate-500">
                                            (GAS)
                                          </small>
                                        </span>
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          $2.38
                                        </h5>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="text-red-500 text-[13px] font-bold">
                                      4.25%
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div
                                      id="line-1"
                                      className="apex-charts"
                                    ></div>
                                  </td>
                                  <td className="p-3 text-sm font-semibold text-slate-700 whitespace-nowrap dark:text-gray-400">
                                    $23,876,052
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                      $7,540,139
                                    </h5>
                                    <span className="block font-medium text-slate-500">
                                      87,499{" "}
                                      <small className="text-slate-500">
                                        GAS
                                      </small>
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          10,128,375.11{" "}
                                          <small className="">GAS</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div
                                          className="h-1 bg-slate-400 rounded-full"
                                          style={{ width: "30%" }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 border-r dark:border-r-slate-700 px-2"
                                    >
                                      Details
                                    </a>
                                    <a
                                      href="#"
                                      className="font-medium text-primary-500 px-2"
                                    >
                                      Trade
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Live Visits Our New Site</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700/20 dark:text-gray-300">
                          <tr className="flex justify-between">
                            <th scope="col" className="px-3 py-1">
                              Time
                            </th>
                            <th scope="col" className="px-3 py-1">
                              Price (USDT)
                            </th>
                            <th scope="col" className="px-3 py-1">
                              Amount (BTC)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="h-[440px]" data-simplebar>
                          <tr className="flex justify-between sell-trade">
                            <td className="px-3 pb-0 pt-2 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 pb-0 pt-2 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 pb-0 pt-2 text-right">
                              0.000137
                            </td>
                          </tr>
                          <tr className="flex justify-between buy-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-2">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-3">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade-4">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                          <tr className="flex justify-between sell-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:27:21
                            </td>
                            <td className="px-3 py-0 text-red-500 text-center">
                              19163.19
                            </td>
                            <td className="px-3 py-0 text-right">0.000137</td>
                          </tr>
                          <tr className="flex justify-between buy-trade">
                            <td className="px-3 py-0 text-left text-red-500">
                              16:26:05
                            </td>
                            <td className="px-3 py-0 text-green-500 text-center">
                              19153.21
                            </td>
                            <td className="px-3 py-0 text-right">0.000181</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative mb-4">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 dark:text-slate-300/70">
                      <ul
                        className="flex flex-wrap lg:-mb-px"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="mr-2" role="presentation">
                          <button
                            className={`inline-block py-4 px-4 text-sm font-medium text-center ${
                              activeTab === "Buy"
                                ? "text-gray-500 border-b-2 border-transparent"
                                : "text-gray-400 dark:text-gray-400"
                            } rounded-t-lg ${
                              activeTab === "Buy" ? "border-b-gray-300" : ""
                            } hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
                            id="Buy-tab"
                            onClick={() => handleTabClick("Buy")}
                            aria-controls="Buy"
                            aria-selected={activeTab === "Buy"}
                            role="tab"
                          >
                            Buy
                          </button>
                        </li>
                        <li className="mr-2" role="presentation">
                          <button
                            className={`inline-block py-4 px-4 text-sm font-medium text-center ${
                              activeTab === "Sell"
                                ? "text-gray-500 border-b-2 border-transparent"
                                : "text-gray-400 dark:text-gray-400"
                            } rounded-t-lg ${
                              activeTab === "Sell" ? "border-b-gray-300" : ""
                            } hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
                            id="Sell-tab"
                            onClick={() => handleTabClick("Sell")}
                            aria-controls="Sell"
                            aria-selected={activeTab === "Sell"}
                            role="tab"
                          >
                            Sell
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-auto p-4">
                      <div id="myTabContent">
                        <div
                          className={activeTab === "Buy" ? "" : "hidden"}
                          id="Buy"
                          role="tabpanel"
                          aria-labelledby="Buy-tab"
                        >
                          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded mb-3">
                            <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium p-1.5 border-r dark:border-slate-700 border-slate-200">
                              Amount
                            </span>
                            <input
                              type="text"
                              id="Amount"
                              className="border border-transparent dark:border-transparent text-gray-900 text-sm focus:outline-none  dark:focus-visible:outline-none focus:border-primary-500 block w-full p-1.5 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white "
                              placeholder=""
                              required
                            />
                            <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium border-l dark:border-slate-700 border-slate-200 p-1.5">
                              BTC
                            </span>
                          </div>
                          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded h-9 mb-3">
                            <select
                              id="TredePrice"
                              className="w-full h-9 border border-transparent dark:border-transparent rounded text-gray-900 text-sm focus:outline-none bg-transparent dark:bg-transparent  dark:focus-visible:outline-none focus:border-primary-500 block p-1.5 dark:border-slate-600 dark:placeholder-gray-400 dark:text-slate-200"
                            >
                              <option className="dark:bg-slate-700/20">
                                Last Trede Price
                              </option>
                              <option>Last Buy Price</option>
                              <option>Last Sell Price</option>
                            </select>
                            <input
                              type="text"
                              id="Amount_2"
                              className="w-full border border-transparent dark:border-transparent border-l border-l-slate-200 dark:border-l-slate-700 text-gray-900 text-sm focus:outline-none  dark:focus-visible:outline-none focus:border-primary-500 block p-1.5 dark:bg-transparent dark:border-slate-600 dark:placeholder-gray-400 dark:text-white "
                              placeholder=""
                              required
                            />
                            <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium border-l border-slate-200 dark:border-slate-700 p-1.5">
                              USDT
                            </span>
                          </div>
                          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded mb-3">
                            <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium p-1.5 border-r dark:border-slate-700 border-slate-200">
                              Total
                            </span>
                            <input
                              type="text"
                              id="Amount_3"
                              className="border border-transparent dark:border-transparent text-gray-900 text-sm focus:outline-none  dark:focus-visible:outline-none focus:border-primary-500 block w-full p-1.5 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white "
                              placeholder=""
                              required
                            />
                            <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium border-l dark:border-slate-700 border-slate-200 p-1.5">
                              USDT
                            </span>
                          </div>
                          <button className="inline-block focus:outline-none text-green-500 hover:bg-green-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-green-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-green-500  text-sm font-medium py-1 px-3 rounded">
                            Buy
                          </button>
                        </div>
                        <div
                          className={activeTab === "Sell" ? "" : "hidden"}
                          id="Sell"
                          role="tabpanel"
                          aria-labelledby="Sell-tab"
                        >
                          <div className="">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded mb-3">
                              <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium p-1.5 border-r dark:border-slate-700 border-slate-200">
                                Amount
                              </span>
                              <input
                                type="text"
                                id="Amount_4"
                                className="border border-transparent dark:border-transparent text-gray-900 text-sm focus:outline-none  dark:focus-visible:outline-none focus:border-primary-500 block w-full p-1.5 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white "
                                placeholder=""
                                required
                              />
                              <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium border-l dark:border-slate-700 border-slate-200 p-1.5">
                                BTC
                              </span>
                            </div>
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded h-9 mb-3">
                              <select
                                id="TredePrice"
                                className="w-full h-9 border border-transparent dark:border-transparent  rounded text-gray-900 text-sm focus:outline-none bg-transparent dark:bg-transparent  dark:focus-visible:outline-none focus:border-primary-500 block p-1.5 dark:border-slate-600 dark:placeholder-gray-400 dark:text-slate-200"
                              >
                                <option className="dark:bg-slate-700/20">
                                  Last Trede Price
                                </option>
                                <option>Last Buy Price</option>
                                <option>Last Sell Price</option>
                              </select>
                              <input
                                type="text"
                                id="Amount_5"
                                className="w-full border border-transparent dark:border-transparent border-l border-l-slate-200 dark:border-l-slate-700 text-gray-900 text-sm focus:outline-none  dark:focus-visible:outline-none focus:border-primary-500 block p-1.5 dark:bg-transparent dark:border-slate-600 dark:placeholder-gray-400 dark:text-white "
                                placeholder=""
                                required
                              />
                              <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium border-l border-slate-200 dark:border-slate-700 p-1.5">
                                USDT
                              </span>
                            </div>
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded mb-3">
                              <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium p-1.5 border-r dark:border-slate-700 border-slate-200">
                                Total
                              </span>
                              <input
                                type="text"
                                id="Amount_6"
                                className="border border-transparent dark:border-transparent text-gray-900 text-sm focus:outline-none  dark:focus-visible:outline-none focus:border-primary-500 block w-full p-1.5 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white "
                                placeholder=""
                                required
                              />
                              <span className="inline-block bg-slate-50 dark:bg-slate-600/20 text-sm text-slate-500 dark:text-slate-400  font-medium border-l dark:border-slate-700 border-slate-200 p-1.5">
                                USDT
                              </span>
                            </div>
                            <button className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded">
                              Sell
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">
                        Historical Bitcoin Price And Volume
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 p-4">
                      <div className="sm:-mx-6 lg:-mx-8">
                        <div className="relative scroll-inner block w-full sm:px-6 lg:px-8">
                          <div
                            className="w-full"
                            id="cryptoCompareWidgetContainer"
                          ></div>
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

export default Crypto;
