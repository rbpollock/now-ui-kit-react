import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";

// sections for this page
import Images from "./index-sections/Images.js";
import BasicElements from "./index-sections/BasicElements.js";
import Navbars from "./index-sections/Navbars.js";
import Tabs from "./index-sections/Tabs.js";
import Pagination from "./index-sections/Pagination.js";
import Notifications from "./index-sections/Notifications.js";
import Typography from "./index-sections/Typography.js";
import Javascript from "./index-sections/Javascript.js";
import Carousel from "./index-sections/Carousel.js";
import NucleoIcons from "./index-sections/NucleoIcons.js";
import CompleteExamples from "./index-sections/CompleteExamples.js";
import SignUp from "./index-sections/SignUp.js";
import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";
import useSWR from 'swr'
 
const fetcher = (url, token) => fetch(url, {
  headers: { Authorization: `Bearer ${token}` }
}).then((res) => res.json());

function Index() {
  const { data, error, isLoading } = useSWR([process.env.STRAPI_URL+"/api/page/1",process.env.STRAPI_API_KEY], fetcher);

  React.useEffect((data) => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    console.log(data);
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar data={data} />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          <Images />
          <Carousel data={{isLoading, error}}/>
          <NucleoIcons />
          <SignUp />
          <BasicElements />
          <Navbars />
          <Tabs />
          <Pagination />
          <Notifications />
          <Typography />
          <Javascript />
          <CompleteExamples />
          <Examples />
          <Download />
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
