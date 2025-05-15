import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Common/Loading'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from "styled-components";
import CompanyLogo from "./Assets/favicon.ico";
import axios from 'axios'

const ChatbotRoutes = () => {
    const { route } = useParams()

    const [theme, setTheme] = useState();

    const [title, setTitle] = useState("")

    const [steps, setSteps] = useState([]);

    const [loading, setLoading] = useState(true);

    const stepifyScript = script =>
        script.map(step => {
            if (step.options) {
                return {
                    ...step,
                    options: step.options.map((option, idx) => ({
                        ...option,
                        value: idx
                    }))
                };
            } else {
                return step;
            }
        });

    const fetchAPI = async () => {
        try {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `https://disploycrmstage.disploy.com/api/Conversation/GetConversationDetailsByID?ChatbotID=${route}`,
                headers: {
                },
            };

            const res = await axios.request(config);
            if (res) {
                setTheme({
                    headerBgColor: res?.data?.data?.conversationStyleMaster?.headerColor !== '#08A742' &&
                        res?.data?.data?.conversationStyleMaster?.headerColor !== "#2d3748" &&
                        res?.data?.data?.conversationStyleMaster?.headerColor !== "#3B82F6"
                        ? res?.data?.data?.conversationStyleMaster?.headerColor
                        : '',
                    headerFontColor: '#fff',
                    headerFontSize: '15px',
                    background: '#f5f8fb',
                    headerFontFamily: 'Montseratt',
                    botBubbleColor: res?.data?.data?.conversationStyleMaster?.mainColor !== '#08A742' && res?.data?.data?.conversationStyleMaster?.mainColor !== '#2d3748' && res?.data?.data?.conversationStyleMaster?.mainColor !== '#3B82F6' ? res?.data?.data?.conversationStyleMaster?.mainColor : "",
                    botFontColor: '#fff',
                    userBubbleColor: '#fff',
                    userFontColor: '#4a4a4a',
                })
                setTitle(res?.data?.data?.conversationStyleMaster?.botName)
                if (Array.isArray(res?.data?.data?.conversationFieldMaster)) {
                    const stepsArr = [];
                    const idMap = {};
                    let currentId = 1;


                    const createStep = (item, id, trigger) => {

                        const step = {
                            id: id.toString(),
                            message: getTextFromHTML(item?.message) || getTextFromHTML(item?.closingMessage),
                        };
                        if (trigger) step.trigger = trigger;
                        if (item.fieldType === 'Lead Status') step.end = true;
                        return step;
                    };


                    const getTextFromHTML = (htmlString) => {
                        const div = document.createElement('div');
                        div.innerHTML = htmlString;
                        return div.textContent || div.innerText || '';
                    };


                    res?.data?.data.conversationFieldMaster.forEach(item => {
                        if (!item?.conversationFieldID) return;

                        const stepId = currentId.toString();
                        idMap[item.conversationFieldID] = stepId;
                        currentId++;

                        if (item.fieldType === 'Question') {
                            stepsArr.push(createStep(item, stepId));
                            const optionsStepId = currentId.toString();
                            stepsArr.push({ id: optionsStepId, options: [] });
                            idMap[item.conversationFieldID] = optionsStepId;
                            currentId++;

                            item.questionMaster.forEach(subQuestion => {
                                subQuestion.conversationFieldMasters.forEach(subItem => {
                                    const subStepId = currentId.toString();
                                    stepsArr.push(createStep(subItem, subStepId));
                                    idMap[subItem.conversationFieldID] = subStepId;
                                    currentId++;
                                });
                            });
                        } else {
                            stepsArr.push(createStep(item, stepId));
                        }
                    });


                    stepsArr.forEach((step) => {
                        if (step.options) {

                            const questionItem = res?.data?.data.conversationFieldMaster.find(item => idMap[item.conversationFieldID] === step.id);
                            if (questionItem && questionItem.fieldType === 'Question') {
                                step.options = questionItem.questionMaster.map(opt => {
                                    const trigger = idMap[opt.conversationFieldMasters[0]?.conversationFieldID.toString()];
                                    return {
                                        value: opt.conversationQuestionID,
                                        label: getTextFromHTML(opt.question),
                                        trigger: trigger
                                    };
                                });
                            }
                        }
                    });


                    stepsArr.forEach((step, index) => {
                        if (step.message && !step.user && !step.end) {
                            if (step.message.includes('?')) {
                                const nextStep = stepsArr[index + 1];
                                if (nextStep && nextStep.message && nextStep.trigger !== 'end') {
                                    const userStepId = currentId.toString();
                                    stepsArr.splice(index + 1, 0, { id: userStepId, user: true, trigger: nextStep.trigger });
                                    currentId++;
                                }
                            }
                        }
                    });


                    stepsArr.forEach((step, index) => {
                        if (!step.end) {
                            const nextStep = stepsArr[index + 1];
                            step.trigger = nextStep ? nextStep.id : 'end';
                        }
                    });

                    setSteps(stepsArr);
                    setLoading(false)
                } else {
                    console.warn('conversationFieldMaster is not an array or is undefined');
                    setLoading(false)
                }

            }

        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAPI()
    }, [])


    return (
        <div>
            {!loading && (
                <div style={{ background: "transparent" }}>
                    <ThemeProvider theme={theme}>
                        <ChatBot
                            bubbleOptionStyle={{ backgroundColor: 'white', color: 'black' }}
                            headerTitle={title}
                            speechSynthesis={false}
                            steps={stepifyScript(steps)}
                            // botAvatar={CompanyLogo}
                            floating={true}
                            width="400px"
                            height="500px"
                            recognitionEnable={true}
                            botDelay={500}
                            enableMobileAutoFocus={true}
                        />
                    </ThemeProvider>
                </div>
            )}

        </div>
    )
}

export default ChatbotRoutes
