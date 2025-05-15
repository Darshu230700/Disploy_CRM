import React, { useState } from 'react';
import { Pipelinestage } from './Common';

const PipelineStage = ({ setSelectedMessage, selectedMessage, handleButtonClick }) => {

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');

    const currentIndex = Pipelinestage.findIndex(stage => stage === selectedMessage);

    // const handleButtonClick = (message) => { setSelectedMessage(message); };
    const handleMouseEnter = (name) => { setShowTooltip(true); setTooltipContent(name); };
    const handleMouseLeave = () => { setShowTooltip(false); setTooltipContent(''); };

    return (
        <>
            <div className="step-bar-list relative group">
                <ul id="pipelineList" className="flex items-center justify-between bg-white dark:bg-slate-400 rounded-full overflow-hidden">
                    {Pipelinestage.map((stage, index) => (
                        <li
                            key={index}
                            className={`${index <= currentIndex ? 'active' : ''} cursor-pointer text-nowrap relative h-6`}
                            // onClick={handleButtonClick}
                            onClick={() => handleButtonClick(stage)}
                            onMouseEnter={(e) => handleMouseEnter(stage)}
                            onMouseLeave={handleMouseLeave}
                        >
                        </li>
                    ))}
                    {showTooltip && tooltipContent && (
                        <div className={`absolute bottom-4 flex-col items-center hidden mb-6 group-hover:flex ${tooltipContent === 'Qualified' ? 'left-5' : tooltipContent === 'Contact Made' ? 'left-24' : tooltipContent === 'Demo Scheduled' ? 'left-48' : tooltipContent === 'Proposal Made' ? 'right-24' : 'right-0'}`}>
                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-md">
                                {tooltipContent}
                            </span>
                            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default PipelineStage;
