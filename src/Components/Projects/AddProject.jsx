/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { InsertProject } from "../../Redux/ProjectSlice";
import moment from "moment";
import Select from "react-select";
import { LabelOptions, Phase, } from "../Common/Common";
import { useSelector } from "react-redux";
import { getAllPerson } from "../../Redux/PersonSlice";
import { fetchApiData } from "../../Redux/organizationSlice";
import { getAllDeals } from "../../Redux/DealSlice";
import ReactSelect from "../Common/ReactSelect";
import { getAlltemplates } from "../../Redux/TemplateSlice";

export default function AddProject({
  toggleModal,
  setloadFrist,
  EditProjectData,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const Peoplestore = useSelector((state) => state.root.Person);
  const organizationstore = useSelector((state) => state.root.organization);
  const Dealstore = useSelector((state) => state.root.Deal);
  const TemplateStore = useSelector((store) => store.root.Templates)

  const [Label, setLabel] = useState([]);
  const [selectedLable, setselectedLable] = useState('');
  const [selectedDeal, setSelectedDeal] = useState({
    Deal: [],
    deals: ""
  });

  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [startDate, setstartDate] = useState(moment().format("YYYY-MM-DD"));

  const [Enddate, setEnddate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedPhase, setselectedPhase] = useState("Kickoff");
  const [selectedTemplate, setselectedTemplate] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');

  const handleMouseEnter = (name) => { setShowTooltip(true); setTooltipContent(name); };
  const handleMouseLeave = () => { setShowTooltip(false); setTooltipContent(''); };


  useEffect(() => {
    dispatch(fetchApiData({}));
    dispatch(getAllPerson({}));
    dispatch(getAllDeals({}));
    dispatch(getAlltemplates({}))
  }, []);

  useEffect(() => {
    if (EditProjectData) {
      setValue("Title", EditProjectData?.title);
      setValue("Description", EditProjectData?.description);
      if (EditProjectData?.endDateTime) { setEnddate(moment(EditProjectData?.endDateTime).format("YYYY-MM-DD")) }
      if (EditProjectData?.startDateTime) { setstartDate(moment(EditProjectData?.startDateTime).format("YYYY-MM-DD")) }
      if (EditProjectData?.labelName) { setselectedLable(EditProjectData?.labelName); }
      if (EditProjectData?.contactPersonID) { setSelectedPerson({ label: EditProjectData?.contactPerson, value: EditProjectData?.contactPersonID, }) }
      if (EditProjectData?.organizationID) { setSelectedOrganization({ label: EditProjectData?.organizationName, value: EditProjectData?.organizationID, }) }
      if (EditProjectData?.templateID) { setselectedTemplate({ label: EditProjectData?.projectTemplateName, value: EditProjectData?.templateID, }) }
      if (EditProjectData?.phase) setselectedPhase(EditProjectData.phase ? EditProjectData.phase : selectedPhase)

      if (EditProjectData?.deal) {
        const initialDeals = EditProjectData?.deal?.map(deal => ({
          value: deal?.dealID,
          label: deal?.title,
        }));
        setSelectedDeal(prevState => ({
          ...prevState,
          Deal: initialDeals
        }));
      }
    }
  }, [EditProjectData, setValue]);

  useEffect(() => {
    const selectedValues = Label?.map((option) => option?.value).join(', ');
    setselectedLable(selectedValues);
  }, [Label]);

  useEffect(() => {
    const selectedValues = selectedDeal?.Deal?.map((option) => option?.value).join(', ');
    setSelectedDeal({ ...selectedDeal, deals: selectedValues });
  }, [selectedDeal?.Deal]);

  useEffect(() => {
    if (EditProjectData?.labelName) {
      const initialSelectedLabels = LabelOptions?.filter((option) => selectedLable.split(', ').includes(option?.value));
      setLabel(initialSelectedLabels);
    }
  }, [selectedLable]);

  const handleLabelChange = (selectedOptions) => { setLabel(selectedOptions) };

  const onSubmit = async (data) => {
    const Params = {
      projectID: EditProjectData?.projectID ? EditProjectData?.projectID : 0,
      title: data.Title,
      startDateTime: startDate,
      endDateTime: Enddate,
      boardName: data.Board,
      phase: selectedPhase,
      ownerID: 0,
      dealID: selectedDeal?.deals,
      contactPersonID: selectedPerson?.value,
      organizationID: selectedOrganization?.value,
      userID: 0,
      ownerName: "",
      templateID: selectedTemplate?.value,
      description: data.Description,
      labelName: selectedLable,
      isArchived: true,
      canceled: EditProjectData?.canceled ? EditProjectData?.canceled : EditProjectData?.canceled === 0 ? 0 : 3
    };

    try {
      const res = await dispatch(InsertProject(Params));
      if (res.payload.status === true) {
        toggleModal();
        setloadFrist(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleButtonClick = (message) => { setselectedPhase(message); };
  const currentIndex = Phase.findIndex(stage => stage.name === selectedPhase);

  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
      >

        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {EditProjectData?.projectID ? "Update Project" : " Add Project"}
              </h3>
              <AiOutlineCloseCircle
                className="text-3xl text-primary cursor-pointer"
                onClick={() => {
                  toggleModal();
                }}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="h-96  vertical-scroll-inner relative">
                <div className="px-8 py-4 ">
                  <div className="grid gap-4 mb-2 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        {...register("Title", {
                          required: "Title is required",
                        })}
                        name="Title"
                        id="Title"
                        className="capitalize bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                      {errors.Title && (
                        <span className="error text-red-500 text-sm">
                          {errors.Title.message}
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="code"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select template
                      </label>
                      <ReactSelect
                        className="basic-single "
                        classNamePrefix="select"
                        selectedValue={selectedTemplate}
                        handleSelectChange={(option) => setselectedTemplate(option)}
                        options={
                          TemplateStore && TemplateStore?.getAllTemplates?.length > 0
                            ? TemplateStore?.getAllTemplates.map((item) => ({
                              value: item?.projectTemplateID,
                              label: item?.name,
                            }))
                            : [{ value: "", label: "Not Found" }]
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 mb-2 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Start date
                      </label>
                      <input
                        type="date"
                        // max={Enddate}
                        {...register("Startdate")}
                        value={startDate}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          setstartDate(selectedDate);
                          const MatchDates = selectedDate === Enddate
                          setEnddate(MatchDates ? Enddate : selectedDate > Enddate ? selectedDate : Enddate)
                        }}
                        name="Startdate"
                        id="Startdate"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        End date
                      </label>
                      <input
                        type="date"
                        value={Enddate}
                        min={startDate}
                        onChange={(e) => {
                          setEnddate(e.target.value);
                        }}
                        name="Enddate"
                        id="Enddate"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 mb-2 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phase
                      </label>
                      <div className="step-bar-list relative group ">
                        <ul id="pipelineList" className="flex items-center justify-between bg-white dark:bg-slate-400 rounded-full overflow-hidden">
                          {Phase.map((stage, index) => (
                            <>
                              <li
                                key={index}
                                className={`${index <= currentIndex ? 'active' : ''} cursor-pointer text-nowrap relative h-6`}
                                onClick={() => handleButtonClick(stage?.name)}
                                onMouseEnter={(e) => handleMouseEnter(stage?.name)}
                                onMouseLeave={handleMouseLeave}
                              >
                              </li>
                            </>
                          ))}
                          {showTooltip && tooltipContent && (
                            <div className={`absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex ${tooltipContent === 'Kickoff' ? 'left-5' : tooltipContent === 'Planning' ? 'left-32' : tooltipContent === 'Implementation' ? 'left-52' : tooltipContent === 'Review' ? 'right-32' : 'right-5'}`}>
                              <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                {tooltipContent}
                              </span>
                              <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                            </div>
                          )}

                        </ul>
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Board
                      </label>
                      <select
                        id="Board"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...register("Board")}
                        onChange={(e) => {
                          setValue("Board", e.target.value);
                        }}
                      >
                        <option>Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 mb-2 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="code"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Owner
                      </label>
                      <input
                        type="text"
                        {...register("Owner")}
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="code"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Deals
                      </label>
                      <Select
                        value={selectedDeal?.Deal}
                        isMulti
                        name="Participants"
                        options={
                          Dealstore && Dealstore?.getDeals?.length > 0
                            ? Dealstore.getDeals.map((item) => ({
                              value: item?.dealID,
                              label: item?.title,
                            }))
                            : [{ value: "", label: "Not Found" }]
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(option) => { setSelectedDeal({ ...selectedDeal, Deal: option }) }}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-2 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="code"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Contact person
                      </label>
                      <ReactSelect
                        className="basic-single "
                        classNamePrefix="select"
                        selectedValue={selectedPerson}
                        handleSelectChange={(option) => setSelectedPerson(option)}
                        options={
                          Peoplestore && Peoplestore?.getAllPerson?.length > 0
                            ? Peoplestore.getAllPerson.map((item) => ({
                              value: item?.personMasterID,
                              label: item?.name,
                            }))
                            : [{ value: "", label: "Not Found" }]
                        }
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Organization</label>
                      <ReactSelect
                        className="basic-single "
                        classNamePrefix="select"
                        handleSelectChange={(option) => setSelectedOrganization(option)}
                        name="Organization"
                        selectedValue={selectedOrganization}
                        options={
                          organizationstore &&
                            organizationstore?.organizationData?.data?.length > 0
                            ? organizationstore?.organizationData?.data.map(
                              (item) => ({
                                value: item?.organizationID ?? "",
                                label: item?.organizationName,
                              })
                            )
                            : [{ value: "", label: "Not Found" }]
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 mb-2 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="code"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Labels
                      </label>
                      <Select
                        value={Label}
                        isMulti
                        name="colors"
                        options={LabelOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleLabelChange}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="code"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        {...register("Description")}
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4  flex flex-wrap justify-between shrink-0 p-3 rounded-b border-t border-gray-300 bg-gray-100">
                <button
                  type="button"
                  className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded mr-1 close"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                >
                  {EditProjectData?.projectID ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div >
      </div >
    </div >
  );
}
