/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAllVisibleTo } from '../../../Redux/CommonSlice';
import { useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';
import PipelineStage from '../../Common/pipelineStage';

const SubmitOptions = ({ submitOptions, setSubmitOptions }) => {
  const dispatch = useDispatch()
  const [allVisiable, setAllVisiable] = useState([]);
  const [AllEmail, setAllEmail] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("Qualified");

  useEffect(() => {
    dispatch(getAllVisibleTo({})).then((res) => {
      setAllVisiable(res?.payload?.data)
    })
  }, [dispatch])


  useEffect(() => {
    if (submitOptions) {
      setAllEmail(submitOptions?.webFromSubmitEmails.map((x) => ({ Email: x?.email })))
      setSelectedMessage(submitOptions?.pipeLineStage ? submitOptions?.pipeLineStage : selectedMessage)
    }
  }, []);

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...AllEmail];
    updatedQuestions[index].Email = e.target.value;
    setAllEmail(updatedQuestions);
    setSubmitOptions({ ...submitOptions, webFromSubmitEmails: AllEmail });

  };
  const handleChange = (e) => {
    setSubmitOptions({ ...submitOptions, saveas: e.target.value });
  };
  const handleContentChange = (newContent) => {
    setSubmitOptions({ ...submitOptions, message: newContent });
  };

  const handleButtonClick = (message) => {
    setSelectedMessage(message);
    setSubmitOptions({ ...submitOptions, pipeLineStage: message });
  };


  return (
    <>
      <div className='p-8 dark:text-gray-400 border'>
        <div className='mb-6 max-w-[620px] mx-auto border border-gray-200 dark:border-gray-700 rounded-md'>
          <div className='p-4'>
            <div className='flex flex-col'>
              <h3 className='font-bold text-lg'>
                Success Page
              </h3>
              <div className='flex flex-col'>
                <p className='mb-4'>What should happen after a visitor submits this form?</p>
                <div className='flex items-center gap-2'>
                  <input
                    type="radio"
                    name="theme"
                    value="Show thank you message"
                    id='message'
                    checked={submitOptions?.submitType === "Show thank you message"}
                    onChange={() => setSubmitOptions({ ...submitOptions, submitType: "Show thank you message" })}
                  />
                  <label for='message' className='text-gray-500 dark:text-gray-400'>Show thank you message</label>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    type="radio"
                    name="theme"
                    value="Redirect to another website"
                    id='website'
                    checked={submitOptions?.submitType === "Redirect to another website"}
                    onChange={() => setSubmitOptions({ ...submitOptions, submitType: "Redirect to another website" })}
                  />
                  <label for='website' className='text-gray-500 dark:text-gray-400'>Redirect to another website</label>
                </div>
              </div>
              <div className='pt-4'>
                {submitOptions?.submitType === "Show thank you message" && (
                  <>
                    <div className='mb-2'>
                      <div className='mb-1'>
                        Title
                      </div>
                      <div>
                        <input type='text' placeholder='Your message is sent' className='sc-iMWBiJ bTicHx' value={submitOptions?.title} onChange={(e) => setSubmitOptions({ ...submitOptions, title: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <div className='mb-1'>
                        Message (optional)
                      </div>
                      <div>
                        <ReactQuill
                          theme="snow"
                          value={submitOptions?.message}
                          onChange={handleContentChange}
                        />
                      </div>
                    </div>
                  </>
                )}
                {submitOptions?.submitType === "Redirect to another website" && (
                  <div className='mb-2'>
                    <div className='mb-1'>
                      Website URL
                    </div>
                    <div>
                      <input type='text' placeholder='Enter website url' className='sc-iMWBiJ bTicHx'
                        value={submitOptions?.websiteURL}
                        onChange={(e) => setSubmitOptions({ ...submitOptions, websiteURL: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mb-6 max-w-[620px] mx-auto border border-gray-200 dark:border-gray-700 rounded-md'>
          <div className='p-4'>
            <div className='flex flex-col'>
              <h3 className='font-bold text-lg'>Saving preferences</h3>
              <div className='mb-3 flex flex-row gap-4'>
                <div className='flex flex-col gap-2 w-full'>
                  <label>Save as</label>
                  <div className='w-full'>
                    <select name="Saveas" id="Saveas" className="sc-iMWBiJ bTicHx w-full" value={submitOptions?.saveas} onChange={handleChange}>
                      <option value="Lead" className='p-5'>Lead</option>
                      <option value="Deal" className='p-5'>Deal</option>
                    </select>
                  </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label>{submitOptions?.saveas}  title prefix (optional)</label>
                  <div className='w-full'>
                    <input type='text' className='sc-iMWBiJ bTicHx ' placeholder={`e.g. Web Form  ${submitOptions?.saveas}`} value={submitOptions?.lead_title_prefix} onChange={(e) => setSubmitOptions({ ...submitOptions, lead_title_prefix: e.target.value })} />
                  </div>
                </div>
              </div>
              {submitOptions?.saveas === "Deal" && (
                <>
                  <div className='mb-3 flex flex-col gap-2'>
                    <div>
                      <div className='mb-1'>
                        <div>
                          Pipeline
                        </div>
                      </div>
                      <div>
                        <select name="pipeline" id="pipeline" className="sc-iMWBiJ bTicHx w-full">
                          <option value="Pipeline">Pipeline</option>
                        </select>
                      </div>
                    </div>
                    <div className='mx-auto my-2' style={{ width: '87%' }}>
                      <PipelineStage selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} handleButtonClick={handleButtonClick} />
                    </div>
                  </div>
                </>
              )}
              <div className='mb-3 flex flex-row gap-4'>
                <div className='flex flex-col gap-2 w-full'>
                  <label> Owner</label>
                  <div className=''>
                    <select name="Saveas" id="Saveas" className="sc-iMWBiJ bTicHx " >
                      <option value="Destiny" className='p-5'>Destiny</option>
                    </select>
                  </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label>Visible To</label>
                  <div className='w-full'>
                    <select name="Saveas" id="Saveas" className="sc-iMWBiJ bTicHx" value={submitOptions?.visibleToID} onChange={(e) => setSubmitOptions({ ...submitOptions, visibleToID: e.target.value })}>
                      {allVisiable?.map((item) => {
                        return (<option value={item?.value}>{item?.text}</option>)
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className='flex flex-row gap-2 items-center'>
                <input id='email' type='checkbox' checked={submitOptions?.isEmail} onChange={(e) => setSubmitOptions({ ...submitOptions, isEmail: e.target.checked })} />
                <label for='email'>Email notifications</label>
              </div>
              {submitOptions?.isEmail && (
                <div className='mb-2'>
                  {AllEmail && AllEmail.map((item, index) => (
                    <div key={index} className="flex items-center relative m-2">
                      <input
                        type="text"
                        placeholder="Enter Value"
                        className="border border-gray-300 shadow p-2 w-full rounded mr-3"
                        value={item.Email}
                        onChange={(e) => handleQuestionChange(e, index)}
                      />
                      {AllEmail.length > 0 && (
                        <RiDeleteBinLine
                          className='absolute top-2 right-5'
                          size={17}
                          onClick={() => {
                            const updatedQuestions = AllEmail.filter((_, i) => i !== index);
                            setAllEmail(updatedQuestions);
                            setSubmitOptions({ ...submitOptions, webFromSubmitEmails: updatedQuestions });
                          }}
                        />
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex items-center  inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm font-medium py-1 px-3  rounded"
                    onClick={() => setAllEmail([...AllEmail, { Email: "", WebFromSubmitOptionID: submitOptions?.webFromSubmitOptionID }])}
                  >
                    <FaPlus /><span className='text-black text-sm font-semibold  px-2.5 py-0.5 rounde'>Add Email</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default SubmitOptions
