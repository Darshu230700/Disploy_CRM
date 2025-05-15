/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import "./Styles/datepicker.min.css"
import "./Styles/huebee.min.css"
import "./Styles/icons.css"
import "./Styles/jsvectormap.min.css"
import "./Styles/line.css"
import "./Styles/listree.min.css"
import "./Styles/nouislider.min.css"
import "./Styles/selectr.min.css"
import "./Styles/swiper-bundle.min.css"
import "./Styles/tailwind.css"
import "./Styles/tailwind.min.css"
import toast, { Toaster } from "react-hot-toast";
import Routing from './Routing/Routing';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { handleGetUserDetails, handleLogout } from './Redux/AuthSlice';
import { useIdleTimer } from 'react-idle-timer';
import { isValidToken } from './Components/Common/Util';



function App() {

  const { user, token, userDetails } = useSelector((state) => state.root.auth);
  const dispatch = useDispatch();
  // console.log('user :>> ', user);
  const [timer, setTimer] = useState(0);

  let interval;
  const onIdle = () => {
    clearInterval(interval);
    dispatch(handleLogout());
  };

  var { start, getRemainingTime, isIdle } = useIdleTimer({
    onIdle,
    startManually: true,
    startOnMount: false,
    timeout: 3 * 60 * 60 * 1000, //18_00_000
    throttle: 500,
    stopOnIdle: true,
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
      "focus",
      "unload",
      "load",
    ],
  });

  // for timer
  useEffect(() => {
    if (!isIdle()) {
      if (user !== null && timer) {
        interval = setInterval(() => {
          window.localStorage.setItem(
            "timer",
            JSON.stringify(Math.ceil(getRemainingTime() / 1000))
          );
        }, 1000);
      }
      if (user !== null && timer < 1800) {
        start();
        interval = setInterval(() => {
          window.localStorage.setItem(
            "timer",
            JSON.stringify(Math.ceil(getRemainingTime() / 1000))
          );
        }, 1000);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [user, timer]);

  useEffect(() => {
    if (user !== null && timer === 1800) {
      start();
    }
  }, [user, timer]);

  useEffect(() => {
    if (user !== null && isValidToken(token)) {

      // && isValidToken(token)
      dispatch(handleGetUserDetails({ id: user?.userID, token }));
    } else {
      window.localStorage.clear('')
      // toast.error('Token is  expired');
    }
    const TIMER = JSON.parse(window.localStorage.getItem("timer"));
    setTimer(TIMER);
  }, [user, token, dispatch]);

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <Routing />
    </>
  );
}

export default App;
