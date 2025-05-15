import React from 'react'
import ThankYouPreview from './ThankYouPreview';

const WebFormPreview = ({ preview, setFormData, handleSubmitForm, responseRef, submitForm, setSubmitForm, isEmbedded, setErrors, errors, setIsEmbedded, PrimaryhexaCode, LabelhexaCode, BackgroundhexaCode, styleObj, theme, submitOptions, formRef }) => {
  const handleChange = (e, fieldName, isRequired) => {
    const value = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
    // Validate if field is required and value is empty
    if (isRequired && !value.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: 'This field is required'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: ''
      }));
    }
  };

  const handleEmbeddedChange = () => {
    setIsEmbedded(!isEmbedded);
  };

  return (
    <>
      {submitForm === false && (
        <div className='flex flex-col border-l border-gray-200 dark:border-gray-700 h-full dark:text-gray-400'>
          <div className='py-2 px-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
            <div className='font-bold'>
              PREVIEW
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <label> Standalone
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  id='ViewShow'
                  value={isEmbedded}
                  onChange={handleEmbeddedChange}
                />
                <div className="w-11 h-6 bg-gray-400 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
              <label> Embedded
              </label>
            </div>
          </div>
          <div
            className='h-full w-full'
            ref={formRef}
          >
            <div className='py-7 px-2 h-full'
              style={{
                background: theme === "dark" && isEmbedded
                  ? "black"
                  : theme === "Light" && isEmbedded
                    ? "white"
                    : theme === "Light" && !isEmbedded
                      ? BackgroundhexaCode === "#255255255FF"
                        ? "none"
                        : BackgroundhexaCode
                      : theme === "dark" && !isEmbedded
                        ? BackgroundhexaCode === "#255255255FF"
                          ? "black"
                          : BackgroundhexaCode
                        : undefined
              }}
            >
              <div className='flex flex-col justify-center items-center'>
                <div className={`max-w-[480px] ${isEmbedded ? "" : "p-8 shadow-lg"} mx-6 rounded-md`}
                  style={{
                    backgroundColor: theme === "dark" && isEmbedded
                      ? "black"
                      : theme === "Light"
                        ? "white"
                        : "rgb(31, 31, 31)"
                  }}
                >
                  <form>
                    {preview?.webFromFieldMaster?.map((item) => {
                      return (
                        <>
                          {item?.fieldType === "Label" && (
                            <>
                              <div className='mb-4 font-bold text-3xl'
                                style={{
                                  color: theme === "Light" ? "black" : "white"
                                }}
                              >
                                {item?.label}
                              </div>
                              <div className='mb-4 mt-2 break-words'>
                                <div className='editor-list' dangerouslySetInnerHTML={{ __html: item?.helptext }} />
                              </div>
                            </>
                          )}
                          {item?.fieldType === "Input" && (
                            <div className='flex'
                              style={{
                                flexDirection: styleObj?.labelPosition === "Above fields"
                                  ? "column"
                                  : styleObj?.labelPosition === "Side by side"
                                    ? "row"
                                    : null,
                                marginBottom: styleObj?.fieldSize === "Small"
                                  ? "12px"
                                  : styleObj?.fieldSize === "Standard"
                                    ? "16px"
                                    : styleObj?.fieldSize === "Large"
                                      ? "20px"
                                      : null,
                              }}
                            >
                              <label className='mb-1 text-base font-normal break-words'
                                style={{
                                  color: (LabelhexaCode === "#000000FF" || LabelhexaCode === "#0000NANFF")
                                    ? theme === "Light"
                                      ? "black"
                                      : "white"
                                    : LabelhexaCode,
                                  width: styleObj?.labelPosition === "Above fields"
                                    ? "100%"
                                    : styleObj?.labelPosition === "Side by side"
                                      ? "135px"
                                      : null,
                                }}>

                                <span className='mb-1'
                                  style={{
                                    fontSize: styleObj?.fieldSize === "Small"
                                      ? "12px"
                                      : styleObj?.fieldSize === "Standard"
                                        ? "14px"
                                        : styleObj?.fieldSize === "Large"
                                          ? "16px"
                                          : null,

                                  }}
                                >
                                  <div dangerouslySetInnerHTML={{ __html: item?.label }} />

                                  {/* {item?.label?.replace(/<\/?p>/g, '')} */}
                                  {item?.isRequired ? "" : "(optional)"}
                                </span>

                              </label>
                              <div className='w-full'>
                                <input className='h-8 p-2 border border-gray-200 dark:border-gray-700 max-w-full w-full shadow-sm'
                                  type={item?.input_type === "Email" ? 'email' : item?.input_type === "Phone" ? "number" : item?.input_type === "Expected close date" ? 'date' : "text"}
                                  min={0}
                                  name={item?.label?.replace(/<\/?p>/g, '')}
                                  style={{
                                    borderRadius:
                                      styleObj?.fieldStyle === "Standard"
                                        ? "4px"
                                        : styleObj?.fieldStyle === "Boxy"
                                          ? "0px"
                                          : styleObj?.fieldStyle === "Rounded"
                                            ? "20px"
                                            : null,
                                    padding: styleObj?.fieldSize === "Small"
                                      ? "4px 8px"
                                      : styleObj?.fieldSize === "Standard"
                                        ? "8px 10px"
                                        : styleObj?.fieldSize === "Large"
                                          ? "10px 12px"
                                          : null,
                                    backgroundColor: theme === "Light"
                                      ? "white"
                                      : "rgb(46, 46, 46)",
                                    color: theme === "Light"
                                      ? "rgb(31, 31, 31)"
                                      : "white"
                                  }}
                                  onChange={(e) => handleChange(e, item?.label?.replace(/<\/?p>/g, ''), item?.isRequired)}
                                >
                                </input>
                                {errors[item?.label?.replace(/<\/?p>/g, '')] && (
                                  <div className='text-xs mt-1 flex flex-row gap-1 items-center' style={{ color: "rgb(249, 72, 57)" }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="warning-icon" d="M9.06997 2.80002L14.75 12.92C15.35 13.98 14.85 14.83 13.65 14.83H2.34997C1.14997 14.83 0.649968 13.98 1.24997 12.93L6.92997 2.78002C7.52997 1.73002 8.47997 1.72002 9.06997 2.78002V2.80002ZM8.99997 11H6.99997V13H8.99997V11ZM8.99997 6.00002H6.99997V10H8.99997V6.00002Z" fill="#F94839"></path></svg>
                                    <div
                                      style={{
                                        fontSize: styleObj?.fieldSize === "Small"
                                          ? "12px"
                                          : styleObj?.fieldSize === "Standard"
                                            ? "14px"
                                            : styleObj?.fieldSize === "Large"
                                              ? "16px"
                                              : null,

                                      }}
                                    >
                                      {errors[item?.label?.replace(/<\/?p>/g, '')]}
                                    </div>
                                  </div>
                                )}

                                {item?.isAddhelptext && (
                                  <div className='text-xs mt-1'>
                                    <div dangerouslySetInnerHTML={{ __html: item?.helptext }} />
                                    {/* {item?.helptext?.replace(/<\/?p>/g, '')} */}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          {item?.fieldType === "Message" && (
                            <div className='flex'
                              style={{
                                flexDirection: styleObj?.labelPosition === "Above fields"
                                  ? "column"
                                  : styleObj?.labelPosition === "Side by side"
                                    ? "row"
                                    : null,
                                marginBottom: styleObj?.fieldSize === "Small"
                                  ? "12px"
                                  : styleObj?.fieldSize === "Standard"
                                    ? "16px"
                                    : styleObj?.fieldSize === "Large"
                                      ? "20px"
                                      : null,
                              }}
                            >
                              <label className='mb-1 text-base font-normal break-words'
                                style={{
                                  color: (LabelhexaCode === "#000000FF" || LabelhexaCode === "#0000NANFF")
                                    ? theme === "Light"
                                      ? "black"
                                      : "white"
                                    : LabelhexaCode,
                                  width: styleObj?.labelPosition === "Above fields"
                                    ? "100%"
                                    : styleObj?.labelPosition === "Side by side"
                                      ? "135px"
                                      : null,
                                }}>
                                <span className='mb-1'
                                  style={{
                                    fontSize: styleObj?.fieldSize === "Small"
                                      ? "12px"
                                      : styleObj?.fieldSize === "Standard"
                                        ? "14px"
                                        : styleObj?.fieldSize === "Large"
                                          ? "16px"
                                          : null,
                                  }}
                                >
                                  <div dangerouslySetInnerHTML={{ __html: item?.label }} />
                                  {/* {item?.label?.replace(/<\/?p>/g, '')}  */}
                                  {item?.isRequired ? "" : "(optional)"}</span>
                              </label>
                              <div className='w-full'>
                                <textarea className='h-8 p-2 border border-gray-200 min-h-28 dark:border-gray-700 max-w-full w-full shadow-sm'
                                  name={item?.label?.replace(/<\/?p>/g, '')}
                                  style={{
                                    borderRadius:
                                      styleObj?.fieldStyle === "Standard"
                                        ? "4px"
                                        : styleObj?.fieldStyle === "Boxy"
                                          ? "0px"
                                          : styleObj?.fieldStyle === "Rounded"
                                            ? "20px"
                                            : null,
                                    padding: styleObj?.fieldSize === "Small"
                                      ? "4px 8px"
                                      : styleObj?.fieldSize === "Standard"
                                        ? "8px 10px"
                                        : styleObj?.fieldSize === "Large"
                                          ? "10px 12px"
                                          : null,
                                    backgroundColor: theme === "Light"
                                      ? "white"
                                      : "rgb(46, 46, 46)",
                                    color: theme === "Light"
                                      ? "rgb(31, 31, 31)"
                                      : "white"
                                  }}
                                  onChange={(e) => handleChange(e, item?.label?.replace(/<\/?p>/g, ''), item?.isRequired)}
                                >
                                </textarea>
                                {errors[item?.label?.replace(/<\/?p>/g, '')] && (
                                  <div className='text-xs mt-1 flex flex-row gap-1 items-center' style={{ color: "rgb(249, 72, 57)" }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="warning-icon" d="M9.06997 2.80002L14.75 12.92C15.35 13.98 14.85 14.83 13.65 14.83H2.34997C1.14997 14.83 0.649968 13.98 1.24997 12.93L6.92997 2.78002C7.52997 1.73002 8.47997 1.72002 9.06997 2.78002V2.80002ZM8.99997 11H6.99997V13H8.99997V11ZM8.99997 6.00002H6.99997V10H8.99997V6.00002Z" fill="#F94839"></path></svg>
                                    <div
                                      style={{
                                        fontSize: styleObj?.fieldSize === "Small"
                                          ? "12px"
                                          : styleObj?.fieldSize === "Standard"
                                            ? "14px"
                                            : styleObj?.fieldSize === "Large"
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
                            <button className={`shadow-sm p-2 text-lg font-bold w-full  min-h-12 mt-6 text-white`}
                              style={{
                                background: (PrimaryhexaCode === "#0013760FF" || PrimaryhexaCode === "#001376FF") ? "green" : PrimaryhexaCode,
                                borderRadius:
                                  styleObj?.fieldStyle === "Standard"
                                    ? "4px"
                                    : styleObj?.fieldStyle === "Boxy"
                                      ? "0px"
                                      : styleObj?.fieldStyle === "Rounded"
                                        ? "20px"
                                        : null,
                              }}
                              type='button'
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
                        theme === "Light"
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
        </div >

      )}
      <div className={`${submitForm === true ? "" : "hidden"}`}>
        <ThankYouPreview preview={preview} setIsEmbedded={setIsEmbedded} isEmbedded={isEmbedded} BackgroundhexaCode={BackgroundhexaCode} theme={theme} submitOptions={submitOptions} submitForm={submitForm} setSubmitForm={setSubmitForm} responseRef={responseRef} />
      </div>
    </>
  )
}

export default WebFormPreview
