/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { colors } from "./Common";
import { useDispatch, useSelector } from "react-redux";
import { getAllLabel, resetStatus, saveLabel } from "../../Redux/CommonSlice";
import toast from "react-hot-toast";

const AddLabel = ({ setOpenLabelModel }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.root.common);
  const [formData, setFormData] = useState({ labelName: "" });
  const [activeColor, setActiveColor] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (store && store.status === "successLabel") {
      toast.success(store.message);
      setOpenLabelModel(false);
      dispatch(resetStatus());
    }
  }, [store]);

  const handleColorClick = (colorCode) => {
    setActiveColor(colorCode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.labelName) {
      newErrors.labelName = "Label Name is required";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = {
        labelID: 0,
        labelName: formData.labelName,
        isActive: true,
        color: activeColor,
      };
      dispatch(saveLabel(data)).then((res) => {
        if (res.payload.status === true) {
          dispatch(getAllLabel({}));
        }
      });
    }
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
      > 
        <div className="relative p-4 w-full max-w-xl max-h-full ">
       
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">          
            <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                New label
              </h3>
              <AiOutlineCloseCircle
                className="text-3xl text-primary cursor-pointer"
                onClick={() => setOpenLabelModel(false)}
              />
            </div>
            <form onSubmit={handleSubmit}>
            <div className="xl:w-full h-full vertical-scroll-inner relative p-4">
                <div className="grid md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-4">
                  <div className="sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8">
                    <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                      <div className="mb-5">
                        <label
                          for="name"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Label name
                        </label>
                        <input
                          type="text"
                          name="labelName"
                          placeholder="Label name"
                          onChange={handleChange}
                          className={`border border-gray-300 shadow p-3 w-full rounded-lg ${
                            errors.labelName ? "border-r-emerald-900" : ""
                          }`}
                        />
                        {errors.labelName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.labelName}
                          </p>
                        )}
                      </div>
                      <div className="mb-5">
                        <label
                          for="name"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Label color
                        </label>
                        <div className="flex gap-4">
                          {colors &&
                            colors?.length &&
                            colors.map((item) => (
                              <span
                                key={item.code}
                                className={`w-8 h-8 border-2 border-white dark:border-gray-800 rounded-full cursor-pointer ${
                                  activeColor === item.code
                                    ? "ring-4 ring-gray-300 dark:ring-gray-500"
                                    : ""
                                }`}
                                style={{ backgroundColor: item.code }}
                                onClick={() => handleColorClick(item.code)}
                              ></span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                <button
                  type="button"
                  className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                  onClick={() => setOpenLabelModel(false)}
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
      </div>
    </>
  );
};

export default AddLabel;
