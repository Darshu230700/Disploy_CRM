/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import IMG from "../../Images/logo-sm.png";
import { FaAnglesLeft, } from "react-icons/fa6";
import IMG2 from "../../Images/users/avatar-3.jpg";
import IMG3 from "../../Images/logo-2.png";
import IMG4 from "../../Images/logo.png";
import { useNavigate } from "react-router-dom";
import { getMenuAll } from "../../Redux/SideBarSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { handleLogout } from "../../Redux/AuthSlice";

const Sidebar = ({ isVisible, setSidebarOpen, sidebarOpen, setIsVisible }) => {

  const dispatch = useDispatch()

  const [activeAccordion, setActiveAccordion] = useState(null);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const store = useSelector((state) => state.root.Sidebar);
  const [MenuData, setMenuData] = useState([]);
  const [subMenu, setSubMenu] = useState([]);

  useEffect(() => {
    dispatch(getMenuAll({}))
  }, [dispatch,]);

  useEffect(() => {
    if (store?.data?.menu) {
      const currentPath = window.location.pathname;

      const formattedMenuData = store?.data?.menu
        .map((item) => ({
          title: item.pageName,
          path: item.path,
          isView: item.isView,
          icon: <img src={item.icon} alt={item.alt} className="w-5 h-5" />,
          sortBy: item.sortBy || 0, // Assuming sortBy is a numeric property
          isActive: item.path === currentPath, // Set isActive based on current path
          submenu: item?.submenu
        }))
        .sort((a, b) => a?.sortBy - b?.sortBy || a?.title?.localeCompare(b?.title)); // Sort by sortBy, then by title

      setMenuData(formattedMenuData);
    }
  }, [store?.data?.menu]);

  useEffect(() => {
    if (sidebarOpen) {
      const matchingMenuItem = MenuData?.length > 0 ? MenuData?.find(item => item?.sortBy === sidebarOpen) : [];
      if (matchingMenuItem) {
        setSubMenu(matchingMenuItem);
      } else {
        setSubMenu([])
      }
    }
  }, [MenuData, sidebarOpen]);

  const toggleVisibility = () => { setIsVisible(!isVisible); };

  const TabChange = (id) => {
    setSidebarOpen(id);
    localStorage.setItem("STabs", id.toString());
  };

  const handleChangeRoute = (item, path) => {
    if (item?.title === "Log Out") {
      toast.loading("Logout...");
      setTimeout(() => {
        dispatch(handleLogout());
        toast.remove();
        navigate("/");
      }, 1000);
    } else {
      // navigate(path);
    }
  };

  return (
    <div className="leftbar-tab min-w-[260px] z-[99] duration-300 print:hidden">
      <div
        className="flex w-[60px] bg-iconbar dark:bg-slate-800 py-4 items-center fixed top-0 z-[99]
            rounded-[100px] m-4 flex-col h-[calc(100%-30px)]"
      >
        <a className="block text-center logo" title="Disploy">
          <span>
            <img src={IMG} alt="logo-small" className="logo-sm h-8" />
          </span>
        </a>

        <div className="icon-body h-screen w-full">
          <div className="relative h-75vh " data-simplebar>
            <ul
              className="flex-col w-[60px] items-center mt-4 flex-1 border-b-0 tab-menu "
              id="tab-menu"
              data-tabs-toggle="#Icon-menu"
            >
              {MenuData?.length > 0 &&
                MenuData
                  ?.filter((item) => item?.submenu?.some((x) => x?.isView))
                  ?.map((item, index) => {
                    const isActive = window.location.pathname === item.path; // Check if the item is active
                    return (
                      <li
                        className="my-0 flex justify-center menu-items"
                        role="presentation"
                      >
                        <button
                          className="inline-block py-3 px-3 text-base font-medium relative text-center text-gray-700 rounded-t-lg border-0 border-transparent hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 menu-link"
                          id={item?.moduleID}
                          data-tabs-target="#Marketplace"
                          type="button"
                          role="tab"
                          aria-controls="Apps"
                          hover-tooltip={item?.title}
                          aria-selected={sidebarOpen === item?.sortBy ? "true" : "false"}
                          onClick={() => { TabChange(item?.sortBy); handleChangeRoute(item, item?.path); }}
                        >
                          {item?.icon}
                        </button>
                      </li>
                    );
                  })}

            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center mt-auto bg-iconbar dark:bg-slate-800 shrink-0">
          <a href="#">
            <img src={IMG2} alt="" className="rounded-full w-8 h-8" />
          </a>
        </div>
      </div>
      <div
        className={`${isVisible ? "block" : "hidden"}
            main-menu-inner h-full w-[250px] my-4 fixed top-0 z-[9] left-[calc(60px+16px)] right-[calc(60px+16px)] rounded-lg transition delay-150 duration-300 ease-in-out`}
      >
        <div className="main-menu-inner-logo">
          <div className="flex items-center">
            <a className="leading-[60px]" title="Disploy">
              <img
                src={IMG3}
                alt=""
                className={`${isVisible ? "inline-block" : "hidden"
                  } dark:hidden h-8 ml-4 mr-4`}
              />
              <img
                src={IMG4}
                alt=""
                className={`${isVisible ? "hidden" : "block"
                  } dark:inline-block h-8 ml-4 mr-4`}
              />
            </a>
            <div className="mr-2 lg:mr-4 lg:ml-4 ml-auto block xl:hidden">
              <button
                id="toggle-menu-hide-2"
                className="button-menu-mobile-2 flex rounded-full md:mr-0 relative"
                onClick={toggleVisibility}
              >
                {/* <i className="ti ti-chevrons-left top-icon text-3xl"></i> */}
                {isVisible && <FaAnglesLeft className="text-3xl top-icon" />}
              </button>
            </div>
          </div>

          <div className={`${isVisible ? "block" : "hidden"} menu-body h-[calc(100vh-60px)] p-4`} data-simplebar>
            <div id="Icon-menu">
              <div
                className={`${sidebarOpen === subMenu?.sortBy ? "block" : "hidden"}`}
                id="Dashboards"
                role="tabpanel"
                aria-labelledby="Dashboards-tab"
              >
                {/* <div className="title-box mb-3">
                  <h6 className="text-sm font-medium uppercase text-slate-400">
                    Dashboards
                  </h6>
                </div> */}
                <ul className="nav flex-col flex flex-wrap pl-0 mb-0">
                  {subMenu?.submenu?.length > 0 ?
                    subMenu?.submenu
                      ?.filter((item) => item?.isView)
                      ?.map((item, index) => {
                        return (
                          <li key={index} class="nav-item relative block">
                            <a
                              onClick={() => navigate(item?.path)}
                              className={` ${path === item?.path
                                ? "text-primary-500 bg-gray-50 dark:bg-gray-800/20 dark:text-primary-500"
                                : ""
                                }nav-link cursor-pointer rounded-md hover:bg-gray-50 hover:text-primary-500 dark:hover:bg-gray-800/20  dark:hover:text-primary-500 relative font-medium text-sm flex items-center h-[38px] decoration-0 px-2 py-4`}
                            >
                              <span class="flex items-center gap-3">
                                {item?.icon && <img src={item?.icon} alt={item?.alt} className="w-5 h-5" />}
                                {item?.pageName}</span>
                            </a>
                          </li>
                        )
                      })
                    : ''}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
