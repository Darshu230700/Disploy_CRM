import {  useNavigate } from "react-router-dom";

const SetupChatbot = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative p-5">
                <div className="text-center py-3 px-4 dark:text-slate-300/70 relative">
                    <h4 className="font-medium text-3xl">Chatbot</h4>
                    <p className="mb-4">
                        Create your own chatbot who never misses an opportunity to turn visitors into deals
                    </p>
                    <button
                        data-modal-toggle="modal"
                        className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                        onClick={() => navigate("/ChatBot/create")}
                    >
                        Set up Chatbot
                    </button>
                </div>
                <div className="flex-auto p-4">
                    <div className="bg-white dark:bg-slate-800 w-full relative p-3 h-full text-center sm:mx-auto lg:max-w-4xl"></div>
                </div>
            </div>
        </>
    );
};

export default SetupChatbot;
