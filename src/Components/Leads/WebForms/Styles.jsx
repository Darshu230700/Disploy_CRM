import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import SketchColor from '../../Common/SketchColor';


const Styles = ({ theme, styleObj, color, backgroundcolor, labelcolor, setStyleObj, setLabelColor, setColor, setBackgroundColor, setTheme, PrimaryhexaCode, LabelhexaCode, BackgroundhexaCode }) => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Function to handle radio button change
  const handleChange = (e) => {
    setTheme(e.target.value); // Update theme state with the selected value
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };
  return (
    <>
      <div className="flex-auto p-4">
        <div id="accordion-collapse" data-accordion="collapse">
          <div>
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 rounded-t-xl border border-b-0 border-gray-200 dark:border-slate-700 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion === "1"
                  ? "active"
                  : ""
                  }`}
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded={
                  activeAccordion === "1"
                }
                aria-controls="accordion-collapse-body-1"
                onClick={() =>
                  toggleAccordion("1")
                }
              >
                <span>Colors and background</span>
                {activeAccordion !==
                  "1" ? (
                  <FaAngleDown />
                ) : (
                  <FaAngleUp />
                )}
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === "1"
                ? "block"
                : "hidden"
                }`}
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div className='border-b border-gray-500'>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Theme
                </p>
                <div className='mb-2 flex gap-3 items-center'>
                  <div className='flex gap-2 items-center'>
                    <input
                      type="radio"
                      name="theme"
                      value="Light"
                      id='light'
                      checked={theme === "Light"} // Check if theme is 'light'
                      onChange={handleChange} // Call handleChange function on change
                    />
                    <label for='light' className='text-gray-500 dark:text-gray-400'>
                      Light
                    </label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input
                      id='dark'
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={theme === 'dark'} // Check if theme is 'dark'
                      onChange={handleChange} // Call handleChange function on change
                    />
                    <label for='dark' className='text-gray-500 dark:text-gray-400'>
                      Dark
                    </label>
                  </div>
                </div>
              </div>
              <div className='border-b border-gray-500'>
                <div>
                  <p className="my-2 text-gray-500 dark:text-gray-400">
                    Primary color
                  </p>
                  <div className='mb-2 flex gap-3 items-center'>
                    <SketchColor setColor={setColor} color={color} hexaCode={PrimaryhexaCode} />
                  </div>
                </div>
                <div>
                  <p className="my-2 text-gray-500 dark:text-gray-400">
                    Label color
                  </p>
                  <div className='mb-2 flex gap-3 items-center'>
                    <SketchColor setColor={setLabelColor} color={labelcolor} hexaCode={LabelhexaCode} />
                  </div>
                </div>
                <div>
                  <p className="my-2 text-gray-500 dark:text-gray-400">
                    Background
                  </p>
                  <div className='mb-2 flex gap-3 items-center'>
                    <SketchColor setColor={setBackgroundColor} color={backgroundcolor} hexaCode={BackgroundhexaCode} />
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div>
            <h2 id="accordion-collapse-heading-2">
              <button
                type="button"
                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-b-0 border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion === 2
                  ? "active"
                  : ""
                  }`}
                data-accordion-target="#accordion-collapse-body-2"
                aria-expanded={
                  activeAccordion === 2
                }
                aria-controls="accordion-collapse-body-2"
                onClick={() =>
                  toggleAccordion(2)
                }
              >
                <span>Fonts</span>
                {activeAccordion !==
                  2 ? (
                  <FaAngleDown />
                ) : (
                  <FaAngleUp />
                )}
              </button>
            </h2>
            <div
              id="accordion-collapse-body-2"
              className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === 2
                ? "block"
                : "hidden"
                }`}
              aria-labelledby="accordion-collapse-heading-2"
            >
              <div className='mb-2'>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Inroduction
                </p>
                <select name="introduction" className="sc-iMWBiJ bTicHx w-48" id="introductions" value={styleObj?.introductions} onChange={(e) => setStyleObj({ ...styleObj, introductions: e.target.value })}>
                  <option value="standard">Standard</option>

                </select>
              </div>
              <div className='mb-2'>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Labels and field text
                </p>
                <select name="labels" id="labels" className="sc-iMWBiJ bTicHx w-48" value={styleObj?.labels} onChange={(e) => setStyleObj({ ...styleObj, labels: e.target.value })}>
                  <option value="Standard">Standard</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion === 3
                  ? "active"
                  : ""
                  }`}
                data-accordion-target="#accordion-collapse-body-3"
                aria-expanded={
                  activeAccordion === 3
                }
                aria-controls="accordion-collapse-body-3"
                onClick={() =>
                  toggleAccordion(3)
                }
              >
                <span>
                  Form style
                </span>
                {activeAccordion !==
                  3 ? (
                  <FaAngleDown />
                ) : (
                  <FaAngleUp />
                )}
              </button>
            </h2>
            <div
              id="accordion-collapse-body-3"
              className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === 3
                ? "block"
                : "hidden"
                }`}
              aria-labelledby="accordion-collapse-heading-3"
            >
              <div className='mb-2'>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Field label position
                </p>
                <select name="labelPosition" className="sc-iMWBiJ bTicHx w-48" id="labelPosition" value={styleObj?.labelPosition} onChange={(e) => setStyleObj({ ...styleObj, labelPosition: e.target.value })}>
                  <option value="Above fields">Above fields</option>
                  <option value="Side by side">Side by side</option>
                </select>
              </div>
              <div className='mb-2'>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Text and field size
                </p>
                <select name="fieldSize" className="sc-iMWBiJ bTicHx w-48" id="fieldSize" value={styleObj?.fieldSize} onChange={(e) => setStyleObj({ ...styleObj, fieldSize: e.target.value })}>
                  <option value="Small">Small</option>
                  <option value="Standard">Standard</option>
                  <option value="Large">Large</option>
                </select>
              </div>
              <div className='mb-2'>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Field style
                </p>
                <select name="fieldStyle" className="sc-iMWBiJ bTicHx w-48" id="fieldStyle" value={styleObj?.fieldStyle} onChange={(e) => setStyleObj({ ...styleObj, fieldStyle: e.target.value })}>
                  <option value="Standard">Standard</option>
                  <option value="Boxy">Boxy</option>
                  <option value="Rounded">Rounded</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                className={`flex justify-between items-center p-4 w-full font-medium text-left text-gray-500 border border-gray-200  dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/20 ${activeAccordion === 4
                  ? "active"
                  : ""
                  }`}
                data-accordion-target="#accordion-collapse-body-3"
                aria-expanded={
                  activeAccordion === 4
                }
                aria-controls="accordion-collapse-body-4"
                onClick={() =>
                  toggleAccordion(4)
                }
              >
                <span>
                  Indentity and brand
                </span>
                {activeAccordion !==
                  4 ? (
                  <FaAngleDown />
                ) : (
                  <FaAngleUp />
                )}
              </button>
            </h2>
            <div
              id="accordion-collapse-body-4"
              className={`p-4 border border-b-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 ${activeAccordion === 4
                ? "block"
                : "hidden"
                }`}
              aria-labelledby="accordion-collapse-heading-4"
            >
              <div className='border-b border-gray-500 mb-2'>
                <div className='mb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Logo
                    (only in standalone)
                  </p>
                  <input type='file' disabled className='cursor-not-allowed' />
                </div>
              </div>
              <div className='border-b border-gray-500 mb-2'>
                <div className='mb-2 '>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Header image
                    (only in standalone)
                  </p>
                  <input type='file' disabled className='cursor-not-allowed' />

                </div>
              </div>
              <div className='border-b border-gray-500 mb-2'>
                <div className='mb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Favicon
                    (only in standalone)
                  </p>
                  <input type='file' disabled className='cursor-not-allowed' />
                </div>
              </div>
              <div className='mb-2'>
                <div className='mb-2'>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Footer appearance
                  </p>
                  <select name="footer" id="footer" disabled className="sc-iMWBiJ bTicHx w-48 cursor-not-allowed">
                    <option value="Show Disploy branding">Show Disploy branding</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Styles
