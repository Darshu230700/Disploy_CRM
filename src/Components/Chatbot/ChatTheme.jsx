import React from 'react'


export default function ChatTheme({ HeaderColor, MainColor, setMainColor, setHeaderColor, colorselecte, setcolorselecte }) {

    const handleHeaderColorChange = (e) => {
        setcolorselecte('')
        setHeaderColor(e.target.value);
    };

    const handleMainColorChange = (e) => {
        setcolorselecte('')
        setMainColor(e.target.value);
    };

    const handleColorChange = (color) => {
        setHeaderColor('')
        setMainColor('')
        setcolorselecte(color);
    };

    return (
        <div >
            <div
                className="bg-gray-50 rounded-lg dark:bg-gray-800 pt-5"
                id="Themes-chooused"
                role="tabpanel"
                aria-labelledby="Themes-chooused-tab"
            >
                <div className="w-full mb-4">
                    <h5 className="font-medium text-xl mb-4">
                        Start by picking your bot’s colors
                    </h5>
                    <p className="mb-2">
                        Choose from existing themes or create your own
                    </p>
                </div>
                <div className="w-full flex items-center mb-4 gap-x-5">
                    <div className="w-20 mr-3">
                        <div className="relative rounded-md overflow-hidden">
                            <div className="border-b border-white h-10 bg-blue-500"></div>
                            <div className="border-t border-white h-10 bg-blue-500"></div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <input type="radio" name="radio" className="w-5 h-5 cursor-pointer" onClick={() => handleColorChange('#3B82F6')} checked={colorselecte === "#3B82F6"} />
                        </div>
                    </div>
                    <div className="w-20 mr-3">
                        <div className="relative rounded-md overflow-hidden">
                            <div className="border-b border-white h-10 bg-green-500"></div>
                            <div className="border-t border-white h-10 bg-green-500"></div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <input id="green" type="radio" name="radio" className="w-5 h-5 cursor-pointer" onClick={() => handleColorChange('#08A742')} checked={colorselecte === "#08A742"} />
                        </div>
                    </div>
                    <div className="w-20 mr-3">
                        <div className="relative rounded-md overflow-hidden">
                            <div className="border-b border-white h-10 bg-gray-800"></div>
                            <div className="border-t border-white h-10 bg-gray-800"></div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <input id="custom2" type="radio" name="radio" className="w-5 h-5 cursor-pointer" onClick={() => handleColorChange('#2d3748')} checked={colorselecte === '#2d3748'} />
                        </div>
                    </div>
                </div>

                <div className="w-full mb-4">
                    <h5 className="font-medium text-xl mb-4">
                        Custom theme
                    </h5>
                </div>
                <div className="w-full  items-center gap-5 flex mb-4">
                    <div className="relative rounded-md overflow-hidden w-20  items-center">
                        <div className={`border-b border-white h-10 rounded-t-lg `} style={{ background: HeaderColor ? HeaderColor : '#DE2159' }}></div>
                        <div className="border-t border-white h-10 rounded-b-lg" style={{ background: MainColor ? MainColor : '#148CD3' }}></div>
                        <input
                            id="custom"
                            type="radio"
                            name="radio"
                            className="w-5 h-5 mt-3 ms-7 cursor-pointer"
                            checked={colorselecte === '' || colorselecte === false}
                            onClick={() => {
                                setHeaderColor('#DE2159')
                                setMainColor('#148CD3')
                                setcolorselecte('');
                            }}
                        />
                    </div>
                    {(colorselecte === '' || colorselecte === false) && (
                        <div className="flex flex-col gap-2 mb-7">
                            <div className=" ">
                                <div className=" inline-block relative">
                                    <button className="color-picker-button border border-gray text-black font-bold text-base px-4 py-1 rounded-md inline-flex items-center transition duration-300 ease-in-out hover:bg-gray-200 w-40" >Header color</button>
                                    <input type="color" className=" absolute bottom-1.5 right-3 w-6 h-6 rounded-lg  focus:outline-0" value={HeaderColor ? HeaderColor : '#DE2159'} onChange={handleHeaderColorChange} />
                                </div>
                            </div>
                            <div className=" ">
                                <div className=" inline-block relative">
                                    <button className="color-picker-button border border-gray text-black font-bold text-base px-4 py-1 rounded-md inline-flex items-center transition duration-300 ease-in-out hover:bg-gray-200 w-40" >Main color</button>
                                    <input type="color" className=" absolute bottom-1.5 right-3 w-6 h-6 rounded-lg  focus:outline-0" value={MainColor ? MainColor : '#148CD3'} onChange={handleMainColorChange} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}
