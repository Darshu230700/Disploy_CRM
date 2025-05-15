import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from "styled-components";
import CompanyLogo from "./Assets/favicon.ico";
import { stepifyScript } from "../Common/Common";

const OpenChatPopup = ({
    toggleModel,
    MainColor,
    HeaderColor,
    colorselecte,
    title,
    chatBots, steps
}) => {
    const theme = {
        headerBgColor: HeaderColor ? HeaderColor : colorselecte,
        headerFontColor: '#fff',
        headerFontSize: '15px',
        background: '#f5f8fb',
        headerFontFamily: 'Montseratt',
        botBubbleColor: MainColor ? MainColor : colorselecte,
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
    };

    return (
        // <div id="default-modal" tabIndex="-1" aria-hidden="true"
        //     className="fixed top-0 right-0 left-0 z-[9999] flex justify-center items-center">
        //     <div className="relative p-4 w-full max-w-[500px]">
        //         <div className="relative rounded-lg dark:bg-gray-700">
        //             <div className="p-6 h-full flex items-center">
        //                 <div className="h-screen w-full">
        //                     <div className="flex justify-end items-center h-screen ">
        //                         <div className="bg-white rounded shadow-2xl ">
        //                             {/*<IoCloseOutline
        //                                 className="text-3xl text-primary cursor-pointer"
        //                                 onClick={() => toggleModel()}
        //                             />*/}
        //                             <ThemeProvider theme={theme}>
        //                                 <ChatBot
        //                                     bubbleOptionStyle={{ backgroundColor: 'white', color: 'black' }}
        //                                     headerTitle={title}
        //                                     speechSynthesis={false}
        //                                     steps={stepifyScript(steps)}
        //                                     botAvatar={CompanyLogo}
        //                                     floating={true}
        //                                     width="430px"
        //                                     recognitionEnable={true}
        //                                     botDelay={500}
        //                                     enableMobileAutoFocus={true}
        //                                 />
        //                             </ThemeProvider>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <ThemeProvider theme={theme}>
            <ChatBot
                bubbleOptionStyle={{ backgroundColor: 'white', color: 'black' }}
                headerTitle={title}
                speechSynthesis={false}
                steps={stepifyScript(steps)}
                botAvatar={CompanyLogo}
                floating={true}
                width="400px"
                recognitionEnable={true}
                botDelay={500}
                enableMobileAutoFocus={true}
            />
        </ThemeProvider>
    );
}

export default OpenChatPopup;
