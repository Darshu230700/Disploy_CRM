import { AiFillFlag } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { IoCall, IoRestaurant } from "react-icons/io5";
import { MdEmail, MdOutlineWatchLater } from "react-icons/md";

export const colors = [
    { id: 1, code: "#4164d4" },
    { id: 2, code: "#d63033" },
    { id: 3, code: "#fae021" },
    { id: 4, code: "#604242" },
    { id: 5, code: "#51e3f3" },
    { id: 6, code: "#d4dedf" },
    { id: 7, code: "#dbb763" },
    { id: 8, code: "#c55da9" },
    { id: 9, code: "#c3623b" },
    { id: 10, code: "#61df66" },
];


export const Phase = [
    { id: '1', name: 'Kickoff', },
    { id: '2', name: 'Planning' },
    { id: '3', name: 'Implementation', },
    { id: '4', name: 'Review' },
    { id: '5', name: 'Closing' },
];

export const Boards = [
    { id: '1', name: 'Delivery' },
];

export const Month = [
    { id: 1, name: 'January', },
    { id: 2, name: 'February', },
    { id: 3, name: 'March', },
    { id: 4, name: 'April', },
    { id: 5, name: 'May', },
    { id: 6, name: 'June', },
    { id: 7, name: 'July', },
    { id: 8, name: 'August', },
    { id: 9, name: 'September', },
    { id: 10, name: 'October', },
    { id: 11, name: 'November', },
    { id: 12, name: 'December', },
]

export const FieldType = [
    { id: 1, name: 'Text', },
    { id: 2, name: 'Large text', },
    { id: 3, name: 'Single option', },
    { id: 4, name: 'Multiple options', },
    { id: 5, name: 'Autocomplete', },
    { id: 6, name: 'Numerical', },
    { id: 7, name: 'Monetary', },
    { id: 8, name: 'User', },
    { id: 9, name: 'Organization', },
    { id: 10, name: 'Person', },
    { id: 11, name: 'Phone', },
    { id: 12, name: 'Time', },
    { id: 13, name: 'Time range', },
    { id: 14, name: 'Date', },
    { id: 15, name: 'Date range', },
    { id: 16, name: 'Autocomplete', },
]

export const sourceChannel = [
    { id: 1, name: 'Messaging Inbox', },
    { id: 2, name: 'Marketplace', },
    { id: 3, name: 'Campaigns', },
    { id: 4, name: 'Web visitors', },
    { id: 5, name: 'Live chat', },
    { id: 6, name: 'Chatbot', },
    { id: 7, name: 'Web forms', },
    { id: 8, name: 'Lead Suggestions', },
    { id: 9, name: 'Prospector', },
]

export const OperatorType = [
    { id: 1, type: 'is', },
    { id: 2, type: 'is not', },
    { id: 3, type: 'contains', },
    { id: 4, type: 'does not contain', },
    { id: 5, type: 'starts with', },
    { id: 6, type: 'does not start with', },
    { id: 7, type: 'ends with', },
    { id: 8, type: 'does not end with', },
    { id: 9, type: 'is empty', },
    { id: 10, type: 'is not empty', }
]

export const Pipelinestage = [
    "Qualified",
    "Contact Made",
    "Demo Scheduled",
    "Proposal Made",
    "Negotiation started",
];

export const pipelineMapping = {
    div1: 'Qualified',
    div2: 'Contact Made',
    div3: 'Demo Scheduled',
    div5: 'Proposal Made',
    div4: 'Negotiation started',
};

export const LabelOptions = [
    { value: 'todo', label: 'To-do' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'onHold', label: 'On hold' }
];

export function rgbaToHex(rgba) {
    const { r, g, b, a } = rgba;
    const alpha = Math.round(a * 255).toString(16).padStart(2, '0'); // Convert alpha channel from 0-1 to 0-255 and ensure it's two digits
    const red = r.toString(16).padStart(2, '0'); // Convert red channel to hexadecimal and ensure it's two digits
    const green = g.toString(16).padStart(2, '0'); // Convert green channel to hexadecimal and ensure it's two digits
    const blue = b.toString(16).padStart(2, '0'); // Convert blue channel to hexadecimal and ensure it's two digits
    return `#${red}${green}${blue}${alpha}`.toUpperCase(); // Concatenate all channels and convert to uppercase
}

export function createFormParams(webForms, id, webFromID, routeToken, edit, isActive, styleObj, formName, subformName, theme, PrimaryhexaCode, LabelhexaCode, BackgroundhexaCode, submitOptions, formRef, responseRef) {
    const {
        // webFromMasterID,
        webFromTypeID,
        fromTypeName,
        description,
        webFromTypeMasterID
    } = webForms || {};

    const {
        introductions,
        labels,
        labelPosition,
        fieldSize,
        fieldStyle
    } = styleObj || {};

    return {
        webFromMasterID: edit ? id : webFromID,
        name: formName,
        webFromTypeID,
        flagdeleted: false,
        isActive,
        subtitle: subformName,
        webFromTypeMasterID,
        fromTypeName,
        description,
        icon: 0,
        userID: 0,
        createdBy: 0,
        updatedBy: 0,
        createdDate: "2024-03-18T12:51:20.987Z",
        updatedDate: "2024-03-18T12:51:20.987Z",
        webFromFieldMaster: webForms?.webFromFieldMaster,
        route: webForms?.route ? webForms?.route : routeToken,
        webFormStyleCategoryMaster: [
            {
                styleCategoryMasterID: 1,
                name: "Colors and background",
                description: "Colors and background",
                flagdeleted: false,
                webFromStyleMaster: [{
                    webFromStyleMasterID: 1,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[0]?.styleMasterID,
                    value: theme,
                    flagdeleted: false,
                    styleCategoryMasterID: 1,
                    name: "Theme"
                },
                {
                    webFromStyleMasterID: 2,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[1]?.styleMasterID,
                    value: PrimaryhexaCode === "#001376FF" ? "#00893c" : PrimaryhexaCode,
                    flagdeleted: false,
                    styleCategoryMasterID: 1,
                    name: "Primary color"
                },
                {
                    webFromStyleMasterID: 3,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[2]?.styleMasterID,
                    value: LabelhexaCode === "#000000FF" ? "#000" : LabelhexaCode,
                    flagdeleted: false,
                    styleCategoryMasterID: 1,
                    name: "Label color"
                },
                {
                    webFromStyleMasterID: 4,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[0]?.webFromStyleMaster?.[3]?.styleMasterID,
                    value: BackgroundhexaCode === "#255255255FF" ? "#fff" : BackgroundhexaCode,
                    flagdeleted: false,
                    styleCategoryMasterID: 1,
                    name: "Background"
                }
                ]
            },
            {
                styleCategoryMasterID: 2,
                name: "Fonts",
                description: "Fonts",
                flagdeleted: false,
                webFromStyleMaster: [{
                    webFromStyleMasterID: 5,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[1]?.webFromStyleMaster?.[0]?.styleMasterID,
                    value: introductions,
                    flagdeleted: false,
                    styleCategoryMasterID: 2,
                    name: "Introduction"
                },
                {
                    webFromStyleMasterID: 6,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[1]?.webFromStyleMaster?.[1]?.styleMasterID,
                    value: labels,
                    flagdeleted: false,
                    styleCategoryMasterID: 2,
                    name: "Labels and field text"
                }
                ]
            },
            {
                styleCategoryMasterID: 3,
                name: "Form style",
                description: "Form style",
                flagdeleted: false,
                webFromStyleMaster: [{
                    webFromStyleMasterID: 7,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[0]?.styleMasterID,
                    value: labelPosition,
                    flagdeleted: false,
                    styleCategoryMasterID: 3,
                    name: "Field label position"
                },
                {
                    webFromStyleMasterID: 8,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[1]?.styleMasterID,
                    value: fieldSize,
                    flagdeleted: false,
                    styleCategoryMasterID: 3,
                    name: "Text and field size"
                },
                {
                    webFromStyleMasterID: 9,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[2]?.webFromStyleMaster?.[2]?.styleMasterID,
                    value: fieldStyle,
                    flagdeleted: false,
                    styleCategoryMasterID: 3,
                    name: "Field style"
                }
                ]
            },
            {
                styleCategoryMasterID: 4,
                name: "Identity and brand",
                description: "Identity and brand",
                flagdeleted: false,
                webFromStyleMaster: [{
                    webFromStyleMasterID: 10,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[3]?.webFromStyleMaster?.[0]?.styleMasterID,
                    value: "",
                    flagdeleted: false,
                    styleCategoryMasterID: 4,
                    name: "Logo (only in standalone) "
                },
                {
                    webFromStyleMasterID: 11,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[3]?.webFromStyleMaster?.[1]?.styleMasterID,
                    value: "",
                    flagdeleted: false,
                    styleCategoryMasterID: 4,
                    name: "Header image (only in standalone)"
                },
                {
                    webFromStyleMasterID: 12,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[3]?.webFromStyleMaster?.[2]?.styleMasterID,
                    value: "",
                    flagdeleted: false,
                    styleCategoryMasterID: 4,
                    name: "Favicon (only in standalone)"
                },
                {
                    webFromStyleMasterID: 13,
                    webFromMasterID: edit ? id : 0,
                    styleMasterID: webForms?.webFormStyleCategoryMaster?.[3]?.webFromStyleMaster?.[3]?.styleMasterID,
                    value: "",
                    flagdeleted: false,
                    styleCategoryMasterID: 4,
                    name: "Footer appearance"
                }
                ]
            }
        ],
        webFromSubmitOption: submitOptions,
        webFromHtmlMaster: {
            webFromHtmlMasterID: 0,
            webFromMasterID: edit ? id : 0,
            html: formRef?.current?.innerHTML,
            response: responseRef?.current?.innerHTML
        }
    };
}

export function hexToRGBA(hex) {
    // Remove '#' if it's included
    hex = hex?.replace('#', '');
    let arr = [];


    // Convert to RGB
    let r = parseInt(hex?.substring(0, 2), 16);
    let g = parseInt(hex?.substring(2, 4), 16);
    let b = parseInt(hex?.substring(4, 6), 16);
    arr.push(r)
    arr.push(g)
    arr.push(b)
    arr.push(1)

    // Convert to RGBA and return
    return arr;
}

export function formatDate(dateStr) {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const suffix = getDaySuffix(day);

    return `${day}${suffix} ${month} ${year}`;
}

function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export const MettingTypes = [
    { value: 1, label: "Zoom Meeting" },
    { value: 2, label: "Microsoft Teams Meeting" },
    { value: 3, label: "Google Meet Meeting" },
];

export const monthList = {
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
}

export function conversationFieldUpdate(conversationFieldMaster, fieldID, conversationField) {
    return conversationFieldMaster.map((field) => {
        if (field.conversationFieldID === fieldID) {
            return { ...field, ...conversationField };
        }
        if (field.questionMaster) {
            return {
                ...field,
                questionMaster: field.questionMaster.map((question) => {
                    return {
                        ...question,
                        conversationFieldMasters: conversationFieldUpdate(question.conversationFieldMasters, fieldID, conversationField)
                    };
                })
            };
        }
        return field;
    });
}

export function ConversationField(selectData, descriptionText, data, Allquestion, blockType2) {

    const conversationField = {
        ...selectData,
        fieldType: selectData?.fieldType === "Question" || selectData?.fieldType === "Greeting" || selectData?.fieldType === "Message" || selectData?.fieldType === "Lead Status" ? selectData?.fieldType : `${blockType2}/${data?.blockType3}`,
        message: descriptionText,
        proactiveMessage: data?.proactive,
        captureField: selectData?.fieldType === "Question" || selectData?.fieldType === "Greeting" || selectData?.fieldType === "Message" || selectData?.fieldType === "Lead Status" ? null : blockType2,
        captureSubField: data?.blockType3,
        questionMaster: Allquestion,
    }
    return conversationField
}

export const getActivityIcon = (activityType) => {
    switch (activityType) {
        case 'Call':
            return <IoCall size={16} />;
        case 'Meeting':
            return <FaUserGroup size={16} />;
        case 'Task':
            return <MdOutlineWatchLater size={16} />;
        case 'Deadline':
            return <AiFillFlag size={16} />;
        case 'Email':
            return <MdEmail size={16} />;
        case 'Lunch':
            return <IoRestaurant size={16} />;
        default:
            return null;
    }
};

export function capitalizeFirstLetter(str) {
    if (!str) return str; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function createMarkup(svgString) {
    return { __html: svgString };
}

export const PageNumber = [10, 15, 25]

// export const ActivityTypes = ['All', 'Call', 'Metting', 'Deadline', 'Email', 'Lunch']

export function AddUserAccess(moduleTitle, watch) {
    const UserAccess = [];

    moduleTitle?.map((item) => {

        let View = watch(`${item?.pageName}_View`) ? watch(`${item?.pageName}_View`) : item?.isView || false;
        let Save = watch(`${item?.pageName}_Edit`) ? watch(`${item?.pageName}_Edit`) : item?.isSave || false;
        let Delete = watch(`${item?.pageName}_Delete`) ? watch(`${item?.pageName}_Delete`) : item?.isDelete || false;
        let Approve = watch(`${item?.pageName}_Approve`);
        let LevelApprove = watch(`${item?.pageName}_LevelApprove`);
        let Total_Approve = LevelApprove ? Number(LevelApprove) : 0;

        let obj = {
            moduleID: item?.moduleID,
            isView: View,
            isSave: Save,
            isDelete: Delete,
            isApprove: Approve ? Approve : false,
            noofApproval: Total_Approve,
            pageName: item?.pageName
        };
        UserAccess?.push(obj);
    });

    return UserAccess;
}

export function EditUserRole(selectedRole) {
    let arr = [];

    selectedRole?.useraccess?.forEach((item) => {
        let obj1 = {
            [`moduleID`]: item?.moduleID,
            [`parentID`]: item?.parentID,
            [`pageName`]: item?.moduleName,
            [`${item?.moduleName}_View`]: item?.isView,
            [`${item?.moduleName}_Edit`]: item?.isSave,
            [`${item?.moduleName}_Delete`]: item?.isDelete,
            [`${item?.moduleName}_Approve`]: item?.isApprove,
            [`${item?.moduleName}_LevelApprove`]: item?.noofApproval,
        };
        arr.push(obj1);
    });

    return arr;
}

// export const formatNumber = (num) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };

export const formatPhoneNumber = (number) => {
    if (!number) return '';
    // Extract the first two digits and the rest of the number
    const firstTwo = number.slice(0, 2);
    const restOfNumber = number.slice(2);
    // Combine them with a space
    return `${firstTwo} ${restOfNumber}`;
};


export function generateUniqueId(length = 9) {
    let uniqueId = '';
    for (let i = 0; i < length; i++) {
        uniqueId += Math.floor(Math.random() * 10); // Append a random digit
    }
    return uniqueId;
}

export const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
};

export const formatNumber = (number) => {
    if (isNaN(number)) return 0;
    return Number(number).toLocaleString('en-IN');
};

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

export { stepifyScript };
