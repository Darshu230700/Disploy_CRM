import axios from "axios";


// export const ImageUrl = "http://192.168.1.154";
// export const Url = "http://192.168.1.154/api/";

// stage URl:- https://disploycrmstage.disploy.com/

export const ImageUrl = "https://disploycrmstage.disploy.com/";
export const Url = "https://disploycrmstage.disploy.com/api/";

export const baseUrl = `${Url}UserMaster/`;
export const userRoleURL = `${Url}UsersRole/`

export const getUrl = axios.create({ baseURL: Url, method: "get" });

export const LOGIN_URL = `${baseUrl}Login`;
export const ADD_USER_REGISTER = `${baseUrl}RegistorUserMaster`;
export const FORGOT_PASSWORD = `${baseUrl}ForgotPassword`;
export const UPDATE_PASSWORD = `${baseUrl}UpdatePassword`;
export const RESET_PASSWORD = `${baseUrl}ResetPassword`;
export const GET_USERS = `${baseUrl}GetLoginUser`;
export const DELETE_USERS = `${baseUrl}DeleteUser`;

//UserRole

export const USERS_ROLE = `${userRoleURL}AddUpdateUsersRole`;
export const USER_ROLE_LIST = `${userRoleURL}ListOfModule`;
// export const USER_ROLE_LIST = `${userRoleURL}GetUserRolesCombine`;

// Leades inbox
export const ADD_OR_UPDATE_LEADMASTER = `${Url}LeadMaster/AddORUpdateLeadMaster`;
export const GET_LEADMASTER = `${Url}LeadMaster/GetAllLeadMaster`;
export const GET_EDIT_LEADMASTER = `${Url}LeadMaster/GetLeadMaster`;
export const LEADMASTER_REMOVE = `${Url}LeadMaster/DeleteLead`;
export const GET_ARCHIVE = `${Url}LeadMaster/GetUpdateArchiveModel`;

// Common 
export const GET_CURRENCY = `${Url}Common/GetAllCurrency`;
export const GET_ALL_VISIVLETO = `${Url}Common/GetAllVisibleTo`;
export const GET_ALL_LABEL = `${Url}Common/GetAllLabel`;
export const SAVE_NOTES = `${Url}Common/AddORUpdateNoteMaster`;
export const GET_ALL_HISTORY = `${Url}Common/GetHistory`;
export const DELETE_HISTORY = `${Url}Common/DeleteHistory`
export const INSERT_DOCUMENT = `${Url}Common/AddorUpdateDocument`
export const INSERT_FILES = `${Url}Common/AddorUpdateAttachment`
export const GET_FILES = `${Url}Common/GetFile`
export const GET_CATEGORY = `${Url}Common/GetAllCategoryMaster`
export const INSERT_CATEGORY = `${Url}Common/AddCategoryMaster`
export const GET_COUNTRY = `${Url}UserMaster/GetCountryMasters`
export const GET_CITY = `${Url}UserMaster/GetCityMasters`
export const INSERT_FILES_FOLDER = `${Url}Common/UploadMaster`



// label
export const SAVE_LABEL = `${Url}LabelMaster/AddorUpdateLabelMaster`;

// Organization
export const SAVE_UPDATE_ORGANIZATION = `${Url}OrganizationMaster/AddORUpdateOrganizationMaster`;
export const GET_ORGANIZATION = `${Url}OrganizationMaster/GetAllOrganizationMaster`;
export const EDIT_ORGANIZATION = `${Url}OrganizationMaster/GetOrganizationMaster`;
export const DELETED_ORGANIZATION = `${Url}OrganizationMaster/DeleteOrganization`;
export const LINK_THISORGANIZATION = `${Url}OrganizationMaster/UpdatePeopleID`;
export const INSERT_RELATED_ORGANIZATION = `${Url}OrganizationMaster/AddORUpdateRelatedOrganization`;
export const DELETE_RELATED_ORGANIZATION = `${Url}OrganizationMaster/DeleteRelatedOrganization`;


// SHRADDHA  KACHHDIYA
//Product 
export const INSERT_PRODUCT = `${Url}ProductMaster/AddorUpdateProductMaster`;
export const GET_PRODUCT = `${Url}ProductMaster/GetAllProductMaster`;
export const GET_PRODUCTBYID = `${Url}ProductMaster/GetProductMaster`;
export const DELETE_PRODUCT = `${Url}ProductMaster/DeleteProduct`;
export const DUPLICATE_PRODUCT = `${Url}ProductMaster/DuplicateProduct`;
export const UPDATE_ACTIVE_PRODUCT = `${Url}ProductMaster/ProductUpdateActiveModel`;
export const DELETE_PRODUCT_FILE = `${Url}ProductMaster/DeleteFileByProductID`;

//Price
export const INSERT_PRODUCT_PRICE = `${Url}ProductMaster/AddorUpdateProductPrice`;
export const GET_PRODUCT_PRICE = `${Url}ProductMaster/GetProductPrice`;
export const GET_PRODUCT_PRICEBYID = `${Url}ProductMaster/GetProductPricebyID`;
export const DELETE_PRODUCT_PRICE = `${Url}ProductMaster/DeleteProductPrice`;

// VARIATIONS
export const INSERT_PRODUCT_VARIATIONS = `${Url}ProductMaster/AddorUpdateProductVariations`;
export const GET_PRODUCT_VARIATIONS = `${Url}ProductMaster/GetProductVariations`;
export const GET_PRODUCT_VARIATIONSBYID = `${Url}ProductMaster/GetProductVariationsbyID`;
export const DELETE_PRODUCT_VARIATIONS = `${Url}ProductMaster/DeleteProductVariations`;

// VARIATIONS Price
export const INSERT_PRODUCT_VARIATIONS_PRICE = `${Url}ProductMaster/AddorUpdateAddVariationsPrice`;
export const DELETE_PRODUCT_VARIATIONS_PRICE = `${Url}ProductMaster/DeleteVariationsPrice`;
export const GET_PRODUCT_VARIATIONS_PRICEBYID = `${Url}ProductMaster/GetVariationsPrice`;

// FILES 
export const INSERT_PRODUCT_FILES = `${Url}ProductMaster/AddorUpdateProductAttachment`
export const GET_PRODUCT_FILES = `${Url}ProductMaster/GetFile`
export const DELETE_PRODUCT_FILES = `${Url}ProductMaster/DeleteFile`

// Person
export const ADD_EDIT_PERSON = `${Url}PersonMaster/AddORUpdatePersonMaster`
export const GET_All_PERSON = `${Url}PersonMaster/GetAllPersonMaster`
export const DELETE_PERSON = `${Url}PersonMaster/DeletePerson`
export const GET_PERSONBYID = `${Url}PersonMaster/GetPersonMaster`;

// Deal
export const INSERT_DEAL = `${Url}DealMaster/AddORUpdateDealMaster`;
export const GET_DEAL = `${Url}DealMaster/GetAllDealMaster`;
export const GET_DEALBYID = `${Url}DealMaster/GetDealMaster`;
export const DELETE_DEAL = `${Url}DealMaster/DeleteDeal`;
export const DUPLICATE_DEAL = `${Url}DealMaster/DuplicateDeal`;

// WebForm

export const GET_WEBFORM_TYPE = `${Url}Common/GetWebFromType`
export const GET_FIELD_TYPE_MASTER = `${Url}Common/GetFieldTypeMaster`
export const GET_STYLE_CATEGORY_MASTER = `${Url}Common/GetStyleCategoryMaster`
export const GET_All_WEB_FORMS = `${Url}WebFrom/GetAllWebForms`
export const GET_WEB_FORM_BY_ID = `${Url}WebFrom/GetWebFormsByID`
export const ADD_EDIT_WEBFORMS = `${Url}WebFrom/AddORUpdateWebFromMaster`
export const GET_ALL_GRID_WEBFORMS = `${Url}WebFrom/GetAllGridWebForms`
export const DELETE_WEBFORM = `${Url}WebFrom/DeleteWebFormDetails`
export const DUPLICATE_WEBFORM = `${Url}WebFrom/DuplicateWebForm`
export const ACTIVE_DEACTIVE_WEBFORM = `${Url}WebFrom/ActiveDeactiveWebform`
export const GET_USER_WEB_FORM_BY_ID = `${Url}WebFrom/GetUserWebFormsByID`

export const IMAGE_PRODUCT = `${Url}ProductMaster/AddorUpdateProductFile`;
export const GET_PRODUCT_FILESBYID = `${Url}ProductMaster/GetProductAttachmentByID`

// Embed WebForm
export const EMBEDHTML = `${Url}WebFrom/GetFormDetailsByID`;
export const FORMVIEWED = `${Url}WebFrom/FormViewed`;
export const SAVEWEBFORMDATA = `${Url}WebFrom/SaveWebFormData`;

//ActivityMaster
export const GET_ACTIVITY = `${Url}ActivityMaster/GetAllActivityMaster`
export const DELETE_ACTIVITY = `${Url}ActivityMaster/DeleteActivity`
export const EDIT_ACTIVITY = `${Url}ActivityMaster/GetActivityMaster`;
export const SAVE_ACTIVITY = `${Url}ActivityMaster/AddorUpdateActivityMaster`;
export const UPDATE_MARKAS_ACTIVITY = `${Url}ActivityMaster/UpdateMarkAsDone`;

// Folder
export const CREATE_FOLDER = `${Url}Common/FolderMaster`;
export const MOVE_TO_FOLDER = `${Url}Common/MoveFolder`;
export const GET_FOLDERS = `${Url}Common/GetFolder`
export const GET_FOLDERS_PREVIEW = `${Url}Common/GetAllDetailsByFolderID`

// Project
export const INSERT_PROJECT = `${Url}ProjectMaster/AddorUpdateProjectMaster`
export const GET_PROJECT = `${Url}ProjectMaster/GetAllProjectMaster`
export const DELETE_PROJECT = `${Url}ProjectMaster/DeleteProject`
export const GET_PROJECTBYID = `${Url}ProjectMaster/GetProjectMaster`
export const GET_PROJECT_ARCHIVE = `${Url}ProjectMaster/GetUpdateArchiveModel`
export const UPDATE_CANCELD = `${Url}ProjectMaster/CanceledProject`

// Tasks
export const INSERT_TASKS = `${Url}TaskDetails/AddorUpdateTaskDetails`
export const GET_TASKS = `${Url}TaskDetails/GetAllTaskDetails`
export const GET_TASKSBYID = `${Url}TaskDetails/GetTaskDetails`
export const DELETE_TASKS = `${Url}TaskDetails/DeleteTaskDetails`
export const GET_TASKSMARK = `${Url}TaskDetails/GetUpdateMarkAsDoneModel`
export const GET_SUBTASKS_MARK = `${Url}TaskDetails/UpdateMarkAsDoneSubTask`
export const GET_LOGIN_USER = `${Url}TaskDetails/GetAllLoginUser`

// Templates
export const INSERT_TEMPLATES = `${Url}ProjectTemplate/AddORUpdateProjectTemplate`
export const GET_TEMPLATES = `${Url}ProjectTemplate/GetAllProjectTemplate`
export const GET_TEMPLATESBYID = `${Url}ProjectTemplate/GetProjectTemplate`
export const DELETE_TEMPLATE = `${Url}ProjectTemplate/DeleteProjectTemplate`
export const DUPLICATE_TEMPLATE = `${Url}ProjectTemplate/DuplicateProjectTemplate`
export const DELETE_TEMPLATE_PHASE = `${Url}ProjectTemplate/DeleteTasks`
export const MOVE_TEMPLATE_PHASE = `${Url}ProjectTemplate/MovePhase`
export const ACTIVE_DEACTIVE_PHASE = `${Url}ProjectTemplate/UpdateMarkAsDone`

// Chatboot
export const GETALL_CHATBOT = `${Url}Conversation/GetChatBotAll`
export const GET_CHATBOT = `${Url}Conversation/GetChatbotById`
export const GET_CONVERSATION = `${Url}Conversation/GetConversation`
export const DELETE_CHATBOT = `${Url}Conversation/DeleteChatbot`
export const ACTIVE_CHATBOT = `${Url}Conversation/UpdateActiveModel`
export const INSERT_CHATBOT = `${Url}Conversation/AddORUpdateChatbotMaster`
export const GETBYID_CHATBOTUSER = `${Url}Conversation/GetUserChatbotByID`
export const GET_CHATBOTUSER = `${Url}Conversation/GetUserChatBotAll`
export const DELETE_CONVERSATIONFIELD = `${Url}Conversation/DeleteConversationField`
export const GET_ACTIVEDEACTIVE_MEETINGS = `${Url}Conversation/GetUserConversationMeetingAll`
export const GETALL_MEETINGS = `${Url}Conversation/GetAllConversationMeetingData`
export const GET_MEETINGBYID = `${Url}Conversation/GetUserConversationMeetingByID`
export const INSERT_MEETING = `${Url}Conversation/InsertConversationMeetingMaster`
export const ACTIVE_MEETING = `${Url}Conversation/CoversationMeetingUpdateActiveModel`
export const DELETE_MEETING = `${Url}Conversation/DeleteConversationMeeting`


// RuleMaster
export const ADDOREDIT_RULE = `${Url}RuleMaster/AddORUpdateRuleMaster`
export const GETBYID_RULE = `${Url}RuleMaster/GetRuleByID`
export const GET_RULES = `${Url}RuleMaster/GetAllRule`
export const DELETE_RULES = `${Url}RuleMaster/DeleteRule`
export const ACTIVE_DEACTIVE_RULES = `${Url}RuleMaster/UpdateRuleActiveModel`
export const GET_RULES_FILEDS = `${Url}RuleMaster/GetAllRuleField`

// Deal subscription 
export const INSERT_SUBSCRIPTION = `${Url}DealMaster/AddORUpdateDealsubscriptionMaster`;
export const GETBYID_SUBSCRIPTION = `${Url}DealMaster/GetDealSubscription`;
export const DELETE_SUBSCRIPTION = `${Url}DealMaster/DeleteDealsubscription`;
export const CANCEL_SUBSCRIPTION = `${Url}DealMaster/CancelSubscription`;
export const UPDATE_WONLOST = `${Url}DealMaster/UpdateIsWon`;

// Deal Payment 
export const INSERT_PAYMENT = `${Url}DealMaster/AddORUpdateDealPaymentScheduleMaster`;
export const GETBYID_PAYMENT = `${Url}DealMaster/GetDealPaymentScheduleByID`;
export const DELETE_PAYMENT = `${Url}DealMaster/DeleteDealPaymentSchedule`;


//Deal Product
export const INSERT_DEAL_PRODUCT = `${Url}DealMaster/AddORUpdateDealProductMaster`;
export const GETBYID_DEAL_PRODUCT = `${Url}DealMaster/GetDealProductByID`;
export const DELETE_DEAL_PRODUCT = `${Url}DealMaster/UpdateActiveModel`;

// CustomizeFieldMaster
export const GET_FIELD_GROUP = `${Url}CustomizeFieldMaster/GetAllGroupMaster`;
export const GETBYID_FIELD_GROUP = `${Url}CustomizeFieldMaster/GetGroupMasterByID`;
export const INSERT_FIELD_GROUP = `${Url}CustomizeFieldMaster/AddorUpdateGroupMaster`;
export const DELETE_FIELD_GROUP = `${Url}CustomizeFieldMaster/DeleteGroup`;

export const GET_FIELDS = `${Url}CustomizeFieldMaster/GetAllCustomizeField`;
export const GETBYID_FIELDS = `${Url}CustomizeFieldMaster/GetCustomizeFieldByID`;
export const INSERT_FIELDS = `${Url}CustomizeFieldMaster/AddorUpdateCustomizeFieldMaster`;
export const DELETE_FIELDS = `${Url}CustomizeFieldMaster/DeleteCustomizeField`;

export const INSERT_LOSTREASON = `${Url}DealMaster/AddorUpdateDealLostReason`;

// Excel file
export const IMPORT_DEAL = `${Url}DealMaster/ImportExcelData`
export const IMPORT_ACTIVITY = `${Url}ActivityMaster/ImportExcelData`
export const IMPORT_LEAD = `${Url}LeadMaster/ImportExcelData`
export const IMPORT_ORGANIZATION = `${Url}OrganizationMaster/ImportExcelData`
export const IMPORT_PRODUCT = `${Url}ProductMaster/ImportExcelData`
export const IMPORT_PERSON = `${Url}PersonMaster/ImportExcelData`

// WebhooksMaster
export const INSERT_WEBHOOKS = `${Url}WebhooksMaster/AddorUpdateWebhooksMaster`
export const GET_WEBHOOKS = `${Url}WebhooksMaster/GetAllWebhooksMaster`
export const DELETE_WEBHOOKS = `${Url}WebhooksMaster/DeleteWebhooks`

// Automated WebhooksMaster
export const INSERT_AUTOMATED_WEBHOOK = `${Url}WebhooksMaster/AddorUpdateAutomatedWebhook`
export const GET_AUTOMATED_WEBHOOK = `${Url}WebhooksMaster/GetAllAutomatedWebhook`
export const DELETE_AUTOMATED_WEBHOOK = `${Url}WebhooksMaster/DeleteAutomatedWebhook`

// Email
export const CREATE_GMAIL_CRED = `${Url}Gmail/CreateGmailCred`
export const CHECK_CRED_EXIST = `${Url}Gmail/CheckCredExists`
export const GET_ALL_CATEGORY = `${Url}Gmail/GetAllCategory`
export const ALL_GMAIL_DETAILS = `${Url}Gmail/GetAllMailDetails`
export const ALL_GMAIL_DETAILS_BY_ID = `${Url}Gmail/GetAllMailDetailsByID`
export const SEND_MAIL = `${Url}Gmail/SendMail`


// sidebar
export const GET_SIDEBAR_MENU = `${baseUrl}SideBarMenu`;
export const MENU_ACCESS = `${baseUrl}GetAllLevelData`;


// Embed Chatbot

export const EMBEDCHATHTML = `${Url}Conversation/GetConversationDetailsByID`;