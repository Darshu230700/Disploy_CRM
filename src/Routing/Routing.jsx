import React, { useCallback, useEffect, useState } from "react";
import bgBody from "../Images/bg-body.png";
import bgBodyDark from "../Images/bg-body-2.png";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Analytics from "../Components/Home/Analytics";
import AuthRoutes from "./AuthRoutes";
import CRM from "../Components/Home/CRM";
import Project from "../Components/Home/Project";
import Ecommerce from "../Components/Home/Ecommerce";
import Helpdesk from "../Components/Home/Helpdesk";
import Inbox from "../Components/Leads/Inbox";
import LiveChat from "../Components/Leads/LiveChat";
import WebForms from "../Components/Leads//WebForms/WebForms";
import Prospector from "../Components/Leads/Prospector";
import WebVisitors from "../Components/Leads/WebVisitors";
import Messenger from "../Components/Leads/Messenger";
import Deals from "../Components/Deals/Deals";
import Projects from "../Components/Projects/Projects";
import Campaigns from "../Components/Campaigns/Campaigns";
import EmailCampaigns from "../Components/Campaigns/EmailCampaigns";
import AutomatedCampaigns from "../Components/Campaigns/AutomatedCampaigns";
import AboutPrice from "../Components/Campaigns/AboutPrice";
import FindHelp from "../Components/Campaigns/FindHelp";
import AlertsTips from "../Components/Campaigns/AlertsTips";
import Settings from "../Components/Campaigns/Settings";
import EmailTemplates from "../Components/Campaigns/EmailTemplates";
import Profile from "../Components/Pages/Profile";
import Tour from "../Components/Pages/Tour";
import Timeline from "../Components/Pages/Timeline";
import Treeview from "../Components/Pages/Treeview";
import Starter from "../Components/Pages/Starter";
import Pricing from "../Components/Pages/Pricing";
import Gallery from "../Components/Pages/Gallery";
import FAQs from "../Components/Pages/FAQs";
import Blogs from "../Components/Pages/Blogs";
import Products from "../Components/Products/Products";
import Marketplace from "../Components/Marketplace/Marketplace";
import People from "../Components/Contacts/People";
import Organizations from "../Components/Contacts/Organizations";
import AddWebForm from "../Components/Leads/WebForms/AddWebForm";
import Activitys from "../Components/Activitys/Activitys";
import AllForms from "../Components/Leads/WebForms/AllForms";
import InfoDetailsLeads from "../Components/Leads/infoDetailsLeads";
import DetailsOrganization from "../Components/Contacts/detailsOrganization";
import DetailsPeople from "../Components/Contacts/detailsPeople";
import ProductDeatails from "../Components/Products/ProductDeatails";
import DealDetails from "../Components/Deals/DealDetails";
import ActivityDetails from "../Components/Activitys/ActivityDetails";
import ProjectDetails from "../Components/Projects/ProjectDetails";
import ProjectArchive from "../Components/Projects/ProjectArchive";
import ProjectTask from "../Components/Projects/ProjectTask";
import ProjectTemplates from "../Components/Projects/ProjectTemplates";
import AddTemplates from "../Components/Projects/AddTemplates";
import ChatbotComponent from "../Components/Chatbot/Chatbot";
import AddChatbotComponent from "../Components/Chatbot/Chatbot_Add";
import ChatBootDetails from "../Components/Chatbot/ChatBootDetails";
import OrganizationTimeline from "../Components/Contacts/OrganizationTimeline";
import PeopleTimeline from "../Components/Contacts/PeopleTimeline";
import Rules from "../Components/Seetings/AutoAssignment/Rules/Rules";
import Automations from "../Components/Seetings/Automations/Automations";
import ImportData from "../Components/Seetings/ImportData/ImportData ";
import ExportFile from "../Components/Seetings/ExportData/ExportFile";
import WebHooks from "../Components/Seetings/WebHooks/WebHooks";
import Email from "../Components/Email/Email";
import User from "../Components/Customber/User";
import UserRole from "../Components/Customber/UserRole/UserRole";
import Loading from "../Components/Common/Loading";
import WebFormRoutes from "../Components/Leads/WebForms/WebFormRoutes";
import ChatbotRoutes from "../Components/Chatbot/ChatbotRoutes";

const Routing = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const currentUrl = window.location.href;
  const storedTab = localStorage.getItem("STabs");
  const initialTab = storedTab ? parseInt(storedTab) : 1;
  const [sidebarOpen, setSidebarOpen] = useState(initialTab);
  const accessDetails = localStorage.getItem("role_access");

  const handleResize = useCallback(() => {
    if (window.innerWidth < 1442) {
      setIsVisible(false);
    } else if (!isVisible) {
      setIsVisible(true);
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, isVisible]);

  if (currentUrl.includes("WebForms")) {
    return (
      <BrowserRouter>
        <Routes>
          <Route>
            <Route
              path="/WebForms/:route"
              element={
                <WebFormRoutes
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  } else if (currentUrl.includes("Chatbot")) {
    return (
      <BrowserRouter>
        <Routes>
          <Route>
            <Route
              path="/Chatbot/:route"
              element={
                <ChatbotRoutes
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  } else {
    if (!accessDetails) {
      return (
        <AuthRoutes isVisible={isVisible} setIsVisible={setIsVisible} />
      )
    }
    if (accessDetails === "USER") {
      return (
        <div
          className={`${isDark ? "darkbackgroud" : "bg-gray-100"}`}
          style={{
            backgroundImage: `url(${isDark ? bgBodyDark : bgBody})`,
          }}
        >
          <body
            data-sidebar-size={`${isVisible ? "default" : "collapsed"
              }`}
            data-layout-mode={`${isDark ? "dark" : "light"}`}
            className={`light scroll-smooth ${isDark ? "dark" : " "}`}
          >

            <BrowserRouter>
              <ErrorBoundary>
                <Routes>
                  <Route path="*" element={<Navigate to="/Analytics" />} />
                  <Route path="/" element={<Navigate to="/Analytics" />} />
                  <Route
                    path="/register"
                    element={<Navigate to="/Analytics" />}
                  />
                  <Route
                    path="/Forgot-password"
                    element={<Navigate to="/Analytics" />}
                  />
                  <Route
                    path="/Analytics"
                    element={
                      <Analytics
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  {/* <Route
            path="/Crypto"
            element={
              <Crypto
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            }
          />*/}
                  <Route
                    path="/CRM"
                    element={
                      <CRM
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Project"
                    element={
                      <Project
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Ecommerce"
                    element={
                      <Ecommerce
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Helpdesk"
                    element={
                      <Helpdesk
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/LeadInbox"
                    element={
                      <Inbox
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/LiveChat"
                    element={
                      <LiveChat
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/ChatBot"
                    element={
                      <ChatbotComponent
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/ChatBot/create"
                    element={
                      <AddChatbotComponent
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/ChatBot/create/:id"
                    element={
                      <ChatBootDetails
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/WebForms"
                    element={
                      <WebForms
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/WebForms/Addwebform"
                    element={
                      <AddWebForm
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/WebForms/createForm"
                    element={
                      <AllForms
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/WebForms/createForm/:id"
                    element={
                      <AllForms
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />

                  <Route
                    path="/Prospector"
                    element={
                      <Prospector
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/WebVisitor"
                    element={
                      <WebVisitors
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Messenger"
                    element={
                      <Messenger
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Deals"
                    element={
                      <Deals
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Projects"
                    element={
                      <Projects
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Projects/:id"
                    element={
                      <ProjectDetails
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Projects/archive"
                    element={
                      <ProjectArchive
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Projects/tasks"
                    element={
                      <ProjectTask
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Projects/Templates"
                    element={
                      <ProjectTemplates
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Projects/Templates/:id"
                    element={
                      <AddTemplates
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Campaigns"
                    element={
                      <Campaigns
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Email-Campaigns"
                    element={
                      <EmailCampaigns
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Automated-Campaigns"
                    element={
                      <AutomatedCampaigns
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Email-Templates"
                    element={
                      <EmailTemplates
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Campaigns-Settings"
                    element={
                      <Settings
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Alerts-Tips"
                    element={
                      <AlertsTips
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/FindHelp"
                    element={
                      <FindHelp
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/About-Price"
                    element={
                      <AboutPrice
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Profile"
                    element={
                      <Profile
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Tour"
                    element={
                      <Tour
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Timeline"
                    element={
                      <Timeline
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Treeview"
                    element={
                      <Treeview
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Starter"
                    element={
                      <Starter
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Pricing"
                    element={
                      <Pricing
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Blogs"
                    element={
                      <Blogs
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/FAQs"
                    element={
                      <FAQs
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Gallery"
                    element={
                      <Gallery
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Products"
                    element={
                      <Products
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Marketplace"
                    element={
                      <Marketplace
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Contact-People"
                    element={
                      <People
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/People-Timeline"
                    element={
                      <PeopleTimeline
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Contact-Organizations"
                    element={
                      <Organizations
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/Organization-Timeline"
                    element={
                      <OrganizationTimeline
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/activity"
                    element={
                      <Activitys
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />

                  <Route
                    path="/detailsLead/:id"
                    element={
                      <InfoDetailsLeads
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />

                  <Route
                    path="/detailsOrganization/:id"
                    element={
                      <DetailsOrganization
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />

                  <Route
                    path="/detailsPeople/:id"
                    element={
                      <DetailsPeople
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />

                  <Route
                    path="/products/:id"
                    element={
                      <ProductDeatails
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/deal/:id"
                    element={
                      <DealDetails
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/activitys/:id"
                    element={
                      <ActivityDetails
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />

                  <Route
                    path="/settings/auto_assignment"
                    element={
                      <Rules
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/settings/automation"
                    element={
                      <Automations
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/settings/import-Data"
                    element={
                      <ImportData
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/settings/export"
                    element={
                      <ExportFile
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/settings/webhooks"
                    element={
                      <WebHooks
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/email"
                    element={
                      <Email
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />
                  <Route
                    path="/user"
                    element={
                      <User
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />

                  <Route
                    path="/userRole"
                    element={
                      <UserRole
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        setIsDark={setIsDark}
                        isDark={isDark}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    }
                  />

                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </body>
        </div>
      )
    }
  }

  return (
    <>
      <Loading />
    </>
  );
};

export default Routing;
