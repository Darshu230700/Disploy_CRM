/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EMBEDCHATHTML, EMBEDHTML, FORMVIEWED, SAVEWEBFORMDATA } from '../../Common/API'
import { useDispatch } from 'react-redux'
import { SaveWebFormData, geEmbedWebForm, getFormViewed } from '../../../Redux/WebFormSlice'

const WebFormRoutes = () => {
  const { route } = useParams()
  const dispatch = useDispatch()
  const [webForm, setWebForm] = useState([])
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);


  const fetchAPI = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${EMBEDHTML}?WebFromMasterIDs=${route}`,
      headers: {
      },
    };

    dispatch(geEmbedWebForm({ config })).then((res) => {
      setWebForm(res?.payload?.data)
      FormView(res?.payload?.data)
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const FormView = (data) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${EMBEDCHATHTML}?WebFromMasterID=${data?.webFromMasterID}`,
      headers: {
      },
    };

    dispatch(getFormViewed({ config })).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log('error', error)
    })
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  const handleChange = (e, fieldName, isRequired, data) => {
    const value = e.target.value;
    console.log('data', data)
    setFormData(prevData => ({
      ...prevData,
      [`${data?.field_name}${data?.input_type}`]: value
    }));

    if (isRequired && !value.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: 'This field is required'
      }));
    } else {
      // Clear error if field is not empty
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: ''
      }));
    }
  };

  const handleSubmitForm = () => {
    const formErrors = {};
    if (Object.keys(formData).length === 0) {
      webForm?.webFromFieldMaster?.map((item) => {
        if (item?.isRequired) {
          if (item?.input_type === "Email") {
            formErrors[item?.label?.replace(/<\/?p>/g, '')] = 'Enter a valid email address'
          }
          else {
            formErrors[item?.label?.replace(/<\/?p>/g, '')] = 'This field is required'
          }
        }
      })
    }
    Object.keys(formData).forEach(fieldName => {
      const isRequired = webForm?.webFromFieldMaster?.find(item => item.label === fieldName)?.isRequired;
      if (isRequired && !formData[fieldName].trim()) {
        formErrors[fieldName] = 'This field is required';
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const Params = {
      "postedWebFormDataID": 0,
      "personName": formData?.PersonName ? formData?.PersonName : "",
      "personPhone": formData?.PersonPhone ? formData?.PersonPhone : "",
      "personEmail": formData?.PersonEmail ? formData?.PersonEmail : "",
      "organizationName": formData?.OrganizationName ? formData?.OrganizationName : "",
      "organizationAddress": formData?.OrganizationAddress ? formData?.OrganizationAddress : "",
      "organizationLinkedwebvisitor": formData?.OrganizationLinkedwebvisitor ? formData?.OrganizationLinkedwebvisitor : "",
      "organizationLatestwebvisit": formData?.OrganizationLatestwebvisit ? formData?.OrganizationLatestwebvisit : "",
      "leadValue": formData?.LeadValue ? formData?.LeadValue : "",
      "leadExpectedclosedate": "2024-03-27T10:07:16.282Z",
      "leadTitle": formData?.LeadTitle ? formData?.LeadTitle : "",
      "leadNote": formData?.LeadNote ? formData?.LeadNote : "",
      "leadLinkedwebvisitor": formData?.LeadLinkedwebvisitor ? formData?.LeadLinkedwebvisitor : "",
      "leadLatestwebvisit": formData?.LeadLatestwebvisit ? formData?.LeadLatestwebvisit : "",
      "webFormMasterID": webForm?.webFromMasterID,
      "createdDate": "2024-03-27T10:07:16.282Z",
      "createdBy": 0,
      "updatedBy": 0,
      "updatedDate": "2024-03-27T10:07:16.282Z"
    }
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${SAVEWEBFORMDATA}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(Params)
    };

    dispatch(SaveWebFormData({ config })).then((res) => {
      if (res?.payload?.status) {
        setSubmitForm(true)
        console.log(res)
      }
    }).catch((error) => {
      console.log('error', error)
    })
  }

  return (
    <>
      {submitForm === false && (
        <div className={`relative flex flex-col justify-center min-h-screen overflow-hidden`}
          style={{
            background: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "dark" && webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[3]?.value === "#255255255FF"
              ? "black"
              : webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light" && webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[3]?.value === "#255255255FF"
                ? "white"
                :
                webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[3]?.value
          }}
        >
          <div className="w-full m-auto bg-white dark:bg-slate-800/60 rounded lg:max-w-md">
            <div
              className='h-full w-full'
            >
              <div className={`h-full`}
                style={{
                  backgroundColor: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "dark"
                    ? "rgb(31, 31, 31)"
                    : webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                      ? "white"
                      : "rgb(31, 31, 31)"
                }}
              >
                <div className='flex flex-col justify-center items-center'>
                  <div className={`max-w-full p-8 shadow-lg rounded-md `}
                    style={{
                      backgroundColor: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "dark"
                        ? "rgb(31, 31, 31)"
                        : webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                          ? "white"
                          : "rgb(31, 31, 31)"
                    }}
                  >
                    <form>
                      {webForm?.webFromFieldMaster?.map((item) => {
                        return (
                          <>
                            {item?.fieldType === "Label" && (
                              <>
                                <div className={`mb-4 font-bold text-3xl`}
                                  style={{
                                    color: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light" ? "black" : "white"
                                  }}
                                >
                                  {item?.label}
                                </div>
                                <div className='mb-4 mt-2 break-words'>
                                  {item?.helptext?.replace(/<\/?p>/g, '')}
                                </div>
                              </>
                            )}
                            {item?.fieldType === "Input" && (
                              <div className='flex'
                                style={{
                                  flexDirection: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value === "Above fields"
                                    ? "column"
                                    : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value === "Side by side"
                                      ? "row"
                                      : null,
                                  marginBottom: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Small"
                                    ? "12px"
                                    : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Standard"
                                      ? "16px"
                                      : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Large"
                                        ? "20px"
                                        : null,
                                }}
                              >
                                <label className={`mb-1 text-base font-normal break-words`}
                                  style={{
                                    color: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value === "#000"
                                      ? webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                                        ? "black"
                                        : "white"
                                      : webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value,
                                    width: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value === "Above fields"
                                      ? "100%"
                                      : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value === "Side by side"
                                        ? "135px"
                                        : null,
                                  }}
                                >
                                  <span className='mb-1'
                                    style={{
                                      fontSize: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Small"
                                        ? "12px"
                                        : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Standard"
                                          ? "14px"
                                          : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Large"
                                            ? "16px"
                                            : null,

                                    }}
                                  >{item?.label?.replace(/<\/?p>/g, '')}  {item?.isRequired ? "" : "(optional)"}</span>
                                </label>
                                <div className='w-full'>
                                  <input className='h-8 p-2 border border-gray-200 dark:border-gray-700 max-w-full w-full shadow-sm'
                                    type={item?.input_type === "Email" ? 'email' : item?.input_type === "Phone" ? "number" : "text"}
                                    name={item?.label?.replace(/<\/?p>/g, '')}
                                    style={{
                                      borderRadius:
                                        webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Standard"
                                          ? "4px"
                                          : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Boxy"
                                            ? "0px"
                                            : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Rounded"
                                              ? "20px"
                                              : null,
                                      padding: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Small"
                                        ? "4px 8px"
                                        : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Standard"
                                          ? "8px 10px"
                                          : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Large"
                                            ? "10px 12px"
                                            : null,
                                      backgroundColor: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                                        ? "white"
                                        : "rgb(46, 46, 46)",
                                      color: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                                        ? "rgb(31, 31, 31)"
                                        : "white"
                                    }}
                                    onChange={(e) => handleChange(e, item?.label?.replace(/<\/?p>/g, ''), item?.isRequired, item)}
                                  >
                                  </input>
                                  {errors[item?.label?.replace(/<\/?p>/g, '')] && (
                                    <div className='text-xs mt-1 flex flex-row gap-1 items-center' style={{ color: "rgb(249, 72, 57)" }}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="warning-icon" d="M9.06997 2.80002L14.75 12.92C15.35 13.98 14.85 14.83 13.65 14.83H2.34997C1.14997 14.83 0.649968 13.98 1.24997 12.93L6.92997 2.78002C7.52997 1.73002 8.47997 1.72002 9.06997 2.78002V2.80002ZM8.99997 11H6.99997V13H8.99997V11ZM8.99997 6.00002H6.99997V10H8.99997V6.00002Z" fill="#F94839"></path></svg>
                                      <div
                                        style={{
                                          fontSize: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Small"
                                            ? "12px"
                                            : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Standard"
                                              ? "14px"
                                              : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Large"
                                                ? "16px"
                                                : null,

                                        }}
                                      >
                                        {errors[item?.label?.replace(/<\/?p>/g, '')]}
                                      </div>
                                    </div>
                                  )}
                                  <div className='text-xs mt-1'>
                                    {item?.helptext?.replace(/<\/?p>/g, '')}
                                  </div>
                                </div>
                              </div>
                            )}
                            {item?.fieldType === "Message" && (
                              <div className='flex'
                                style={{
                                  flexDirection: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value === "Above fields"
                                    ? "column"
                                    : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value === "Side by side"
                                      ? "row"
                                      : null,
                                  marginBottom: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Small"
                                    ? "12px"
                                    : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Standard"
                                      ? "16px"
                                      : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Large"
                                        ? "20px"
                                        : null,
                                }}
                              >
                                <label className='mb-1 text-base font-normal break-words'
                                  style={{
                                    color: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value === "#000"
                                      ? webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                                        ? "black"
                                        : "white"
                                      : webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.value,
                                    width: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value === "Above fields"
                                      ? "100%"
                                      : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.value === "Side by side"
                                        ? "135px"
                                        : null,
                                  }}
                                >
                                  <span className='mb-1'
                                    style={{
                                      fontSize: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Small"
                                        ? "12px"
                                        : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Standard"
                                          ? "14px"
                                          : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Large"
                                            ? "16px"
                                            : null,
                                    }}
                                  >{item?.label?.replace(/<\/?p>/g, '')}  {item?.isRequired ? "" : "(optional)"}</span>
                                </label>
                                <div className='w-full'>
                                  <textarea className='h-8 p-2 border border-gray-200 min-h-28 dark:border-gray-700 max-w-full w-full shadow-sm'
                                    name={item?.label?.replace(/<\/?p>/g, '')}
                                    style={{
                                      borderRadius:
                                        webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Standard"
                                          ? "4px"
                                          : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Boxy"
                                            ? "0px"
                                            : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Rounded"
                                              ? "20px"
                                              : null,
                                      padding: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Small"
                                        ? "4px 8px"
                                        : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Standard"
                                          ? "8px 10px"
                                          : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Large"
                                            ? "10px 12px"
                                            : null,
                                      backgroundColor: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                                        ? "white"
                                        : "rgb(46, 46, 46)",
                                      color: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                                        ? "rgb(31, 31, 31)"
                                        : "white"
                                    }}
                                    onChange={(e) => handleChange(e, item?.label?.replace(/<\/?p>/g, ''), item?.isRequired, item)}
                                  >
                                  </textarea>
                                  {errors[item?.label?.replace(/<\/?p>/g, '')] && (
                                    <div className='text-xs mt-1 flex flex-row gap-1 items-center' style={{ color: "rgb(249, 72, 57)" }}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="warning-icon" d="M9.06997 2.80002L14.75 12.92C15.35 13.98 14.85 14.83 13.65 14.83H2.34997C1.14997 14.83 0.649968 13.98 1.24997 12.93L6.92997 2.78002C7.52997 1.73002 8.47997 1.72002 9.06997 2.78002V2.80002ZM8.99997 11H6.99997V13H8.99997V11ZM8.99997 6.00002H6.99997V10H8.99997V6.00002Z" fill="#F94839"></path></svg>
                                      <div
                                        style={{
                                          fontSize: webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Small"
                                            ? "12px"
                                            : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Standard"
                                              ? "14px"
                                              : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.value === "Large"
                                                ? "16px"
                                                : null,

                                        }}
                                      >
                                        {errors[item?.label?.replace(/<\/?p>/g, '')]}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div >
                            )}
                            {item?.fieldType === "Button" && (
                              <button className={`shadow-sm p-2 text-lg font-bold w-full  min-h-12 mt-6 text-white `}
                                type='button'
                                style={{
                                  background: (webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[1]?.value === "#0013760FF" || webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[1]?.value === "#001376FF") ? "green" : webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[1]?.value,
                                  borderRadius:
                                    webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Standard"
                                      ? "4px"
                                      : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Boxy"
                                        ? "0px"
                                        : webForm?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.value === "Rounded"
                                          ? "20px"
                                          : null,
                                }}
                                onClick={handleSubmitForm}>
                                {item?.label?.replace(/<\/?p>/g, '')}
                              </button>
                            )}
                          </>
                        )
                      })}

                    </form>
                    <div className='my-4 font-normal'
                      style={{
                        color:
                          webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                            ? "black"
                            : "white"

                      }}
                    >
                      Never share sensitive information (credit card numbers, social security numbers, passwords) through this form.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
      {submitForm === true && (
        <div className={`relative flex flex-col min-h-screen overflow-hidden`}
          style={{
            background: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[3]?.value
          }}
        >
          <div
            className='h-full w-full'
          >
            <div className={`py-8 px-2 h-full`}
              style={{
                background: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[3]?.value
              }}
            >
              <div className='flex flex-col items-center justify-center'>
                {webForm?.webFromSubmitOption?.submitType === "Show thank you message" && (
                  <div className={`max-w-[550px] p-8 shadow-lg rounded-md`}
                    style={{
                      backgroundColor: webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "dark"
                        ? "black"
                        : webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                          ? "white"
                          : "rgb(31, 31, 31)",
                      width: "100%"
                    }}>
                    <div>
                      <div className='text-3xl mb-4 font-medium'
                        style={{
                          color:
                            webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                              ? "black"
                              : "white"
                        }}>
                        Your message is sent
                      </div>
                      <div className='text-base'
                        style={{
                          color:
                            webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                              ? "black"
                              : "white"
                        }}>
                        Thank you for talking to us!
                      </div>
                    </div>

                  </div>
                )}
                {webForm?.webFromSubmitOption?.submitType === "Redirect to another website" && (
                  <div className={`max-w-full mx-6`}>
                    <div className={`max-w-[400px] py-6 px-2`}>
                      <div>
                        <h3 className='text-2xl font-medium'
                          style={{
                            color:
                              webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                                ? "black"
                                : "white"
                          }}>Form submitted</h3>
                        <p className='py-4'
                          style={{
                            color:
                              webForm?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.value === "Light"
                                ? "black"
                                : "white"
                          }}>
                          Your visitor will not see this message and be redirected to the URL below instead:
                        </p>
                        <a target='_blank'>
                          {webForm?.webFromSubmitOption?.WebsiteUrl}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WebFormRoutes
