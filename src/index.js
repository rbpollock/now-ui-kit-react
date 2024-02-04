/*

=========================================================
* Now UI Kit React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2023 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/main/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Team from "views/dashboard/team/team.js";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

import { CosmosWalletConnectors } from "@dynamic-labs/cosmos";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { MagicWalletConnectors } from "@dynamic-labs/magic";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <DynamicContextProvider
  settings={{
    // Find your environment id at https://app.dynamic.xyz/dashboard/developer
    environmentId: "74bd1bf3-bdd5-43ba-8ea3-e744ebfaaaf2",
    walletConnectors: [
      CosmosWalletConnectors,
      EthereumWalletConnectors,
      MagicWalletConnectors,
      SolanaWalletConnectors
    ],
  }}
>
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route path="/dashboard" element={<Team/>} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/login-page" element={<LoginPage />} />

      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>
  </BrowserRouter>
  </DynamicContextProvider>
);
