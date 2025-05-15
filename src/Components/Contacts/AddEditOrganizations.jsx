import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import AddLabel from "../Common/AddLabel";
import { useDispatch } from "react-redux";
import { saveApiData, } from "../../Redux/organizationSlice";
import ReactSelect from "../Common/ReactSelect";
import { useSelector } from "react-redux";
import { getAllLabel, getAllVisibleTo } from "../../Redux/CommonSlice";

const AddEditOrganizations = ({ toggleModalOrganization, organization, setLoadFist }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const store = useSelector((state) => state.root.common);
  const dispatch = useDispatch();

  const [loadFirst, setLoadFirst] = useState(true);
  const [openLabelModel, setOpenLabelModel] = useState(false);
  const [selectedLable, setselectedLable] = useState(0);
  const [selectedVisible, setselectedVisible] = useState(1);

  useEffect(() => {
    if (loadFirst) {
      dispatch(getAllLabel({}))
      dispatch(getAllVisibleTo({}))
      setLoadFirst(false)
    }
  }, [dispatch, loadFirst]);

  useEffect(() => {
    if (organization && organization?.organizationID) {
      setValue("organizationName", organization.organizationName);
      setValue("ownerId", organization.ownerId);
      setValue("address", organization.address);
      if (organization && organization.labelId)
        setselectedLable({
          label: organization.labelName,
          value: organization.labelId,
        });
      if (organization && organization.visibleToId)
        setselectedVisible({
          label: organization.visibleToName,
          value: organization.visibleToId,
        });
    }
  }, [organization, setValue]);

  const handleLableChange = (selectedOption) => { setselectedLable(selectedOption); };

  const handleVisibleChange = (selectedOption) => { setselectedVisible(selectedOption); };

  const handleFormSubmit = (data) => {
    const payload = {
      organizationID: organization && organization.organizationID ? organization.organizationID : 0,
      organizationName: data?.organizationName,
      userID: 0,
      labelId: selectedLable.value,
      ownerId: 0,
      address: data.address,
      visibleToId: selectedVisible.value,
    };
    dispatch(saveApiData(payload)).then((res) => {
      if (res.payload.status === true) {
        setLoadFist(true)
        toggleModalOrganization();
      }
    })
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-lg max-h-full ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {organization?.organizationID && organization?.organizationID ? 'Update' : 'Add'}  organization
              </h3>
              <AiOutlineCloseCircle
                className="text-3xl text-primary cursor-pointer"
                onClick={() => toggleModalOrganization()}
              />
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="xl:w-full h-96 vertical-scroll-inner relative p-4">
                <div className="grid md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-4">
                  <div className="sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8">
                    <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
                      <div className="mb-5">
                        <label for="name" className="block mb-2 font-bold text-gray-600">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          id="organizationName"
                          name="organizationName"
                          className="border border-gray-300 shadow p-3 w-full rounded capitalize"
                          {...register("organizationName", { required: "Name is Required", })}
                        />
                        {errors.organizationName && (<p className="error text-red-600 text-base font-bold">{errors.organizationName.message}</p>)}
                      </div>
                      <div className="mb-5">
                        <label for="name" className="block mb-2 font-bold text-gray-600"> Label </label>
                        <div className="flex flex-row gap-2 items-center">
                          <ReactSelect
                            selectedValue={selectedLable}
                            options={
                              store && store?.getAllLabel?.length > 0
                                ? store?.getAllLabel.map((item) => ({
                                  value: item?.value,
                                  label: item?.text,
                                }))
                                : [{ value: "", label: "Not Found" }]
                            }
                            handleSelectChange={handleLableChange}
                          />
                          <FiPlusCircle
                            size={30}
                            onClick={() => {
                              setOpenLabelModel(true);
                            }}
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <label
                          for="ownerId"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Owner
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="border border-gray-300 shadow p-3 w-full rounded"
                          {...register("ownerId",)}
                        />
                      </div>
                      <div className="mb-5">
                        <label for="name" className="block mb-2 font-bold text-gray-600">Address</label>
                        <textarea
                          type="text"
                          name="address"
                          className="border border-gray-300 shadow p-3 w-full rounded"
                          {...register("address", {
                            required: "Address is Required",
                            maxLength: {
                              value: 250,
                              message: "Address must be less than or equal to 250 characters"
                            }
                          })}
                        />
                        {errors.address && (<p className="error text-red-600 text-base font-bold">{errors?.address?.message}</p>)}
                      </div>
                      <div className="mb-5">
                        <label
                          for="Labels"
                          className="block mb-2 font-bold text-gray-600"
                        >
                          Visible to
                        </label>
                        <ReactSelect
                          selectedValue={selectedVisible}
                          options={
                            store && store?.getAllVisibleTo.length > 0
                              ? store?.getAllVisibleTo.map((item) => ({
                                value: item?.value,
                                label: item?.text,
                              }))
                              : [{ value: "", label: "Not Found" }]
                          }
                          handleSelectChange={handleVisibleChange}
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
                  onClick={() => toggleModalOrganization()}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-gray-300 border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                >
                  Save
                </button>
              </div>
            </form>




          </div>
        </div>
      </div>
      {openLabelModel && (
        <AddLabel
          setOpenLabelModel={setOpenLabelModel}
          openLabelModel={openLabelModel}
        />
      )}
    </>
  );
};

export default AddEditOrganizations;
