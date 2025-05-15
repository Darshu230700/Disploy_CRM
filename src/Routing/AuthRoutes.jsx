import React from "react";
import Login from "../Components/Login/Login"
import Register from "../Components/Register/Register"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "../Components/Forgot/ForgotPassword";
import WebFormRoutes from "../Components/Leads/WebForms/WebFormRoutes";
import ChatbotRoutes from "../Components/Chatbot/ChatbotRoutes";
const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/Analytics" element={<Navigate to="/" />} />
          <Route path="/Crypto" element={<Navigate to="/" />} />
          <Route path="/CRM" element={<Navigate to="/" />} />
          <Route path="/Project" element={<Navigate to="/" />} />
          <Route path="/Ecommerce" element={<Navigate to="/" />} />
          <Route path="/Helpdesk" element={<Navigate to="/" />} />
          <Route path="/LeadInbox" element={<Navigate to="/" />} />
          <Route path="/LiveChat" element={<Navigate to="/" />} />
          <Route path="/ChatBot" element={<Navigate to="/" />} />
          <Route path="/WebForms" element={<Navigate to="/" />} />
          <Route path="/Prospector" element={<Navigate to="/" />} />
          <Route path="/WebVisitor" element={<Navigate to="/" />} />
          <Route path="/Messenger" element={<Navigate to="/" />} />
          <Route path="/Deals" element={<Navigate to="/" />} />
          <Route path="/Projects" element={<Navigate to="/" />} />
          <Route path="/Campaigns" element={<Navigate to="/" />} />
          <Route path="/Email-Campaigns" element={<Navigate to="/" />} />
          <Route path="/Automated-Campaigns" element={<Navigate to="/" />} />
          <Route path="/Email-Templates" element={<Navigate to="/" />} />
          <Route path="/Campaigns-Settings" element={<Navigate to="/" />} />
          <Route path="/Alerts-Tips" element={<Navigate to="/" />} />
          <Route path="/FindHelp" element={<Navigate to="/" />} />
          <Route path="/About-Price" element={<Navigate to="/" />} />
          <Route path="/Profile" element={<Navigate to="/" />} />
          <Route path="/Tour" element={<Navigate to="/" />} />
          <Route path="/Timeline" element={<Navigate to="/" />} />
          <Route path="/Treeview" element={<Navigate to="/" />} />
          <Route path="/Starter" element={<Navigate to="/" />} />
          <Route path="/Pricing" element={<Navigate to="/" />} />
          <Route path="/Blogs" element={<Navigate to="/" />} />
          <Route path="/FAQs" element={<Navigate to="/" />} />
          <Route path="/Gallery" element={<Navigate to="/" />} />

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Forgot-password" element={<ForgotPassword />} />
          <Route
            path="/WebForms/:route"
            element={
              <WebFormRoutes
              />
            }
          />
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
  );
};

export default AuthRoutes;
