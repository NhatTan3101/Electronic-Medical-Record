import React, { useState } from "react";
import classes from "./About.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Hospital1,
  Hospital2,
  Hospital3,
  Hospital4,
  Hospital5,
  VisitDoctor1,
  VisitDoctor2,
} from "../../components/images";
import { Grid, Stack } from "@mui/material";
import data from "../../data";
import Card from "../../common/card/CardImage";
import CardImage from "../../common/card/CardImage";

const About = () => {
  const [isExpand, setIsExpand] = useState(false);

  var settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: true,
  };

  return (
    <div className={classes.container}>
      <div>
        <div className="container">
          <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-between">
              <a className="p-2 text-muted" href="#">
                Medical Record
              </a>
              <a className="p-2 text-muted" href="#">
                Diagnosis
              </a>
              <a className="p-2 text-muted" href="#">
                Medicine
              </a>
              <a className="p-2 text-muted" href="#">
                Corrective
              </a>
              <a className="p-2 text-muted" href="#">
                Consensual
              </a>
              <a className="p-2 text-muted" href="#">
                Symptom
              </a>
              <a className="p-2 text-muted" href="#">
                Politics
              </a>
              <a className="p-2 text-muted" href="#">
                Surgery
              </a>
              <a className="p-2 text-muted" href="#">
                Science
              </a>
              <a className="p-2 text-muted" href="#">
                Health
              </a>
              <a className="p-2 text-muted" href="#">
                Clinic
              </a>
            </nav>
          </div>
          <Slider {...settings}>
            <div className={classes.banner}>
              <Hospital1 />
            </div>
            <div className={classes.banner}>
              <Hospital2 />
            </div>
            <div className={classes.banner}>
              <Hospital3 />
            </div>
            <div className={classes.banner}>
              <Hospital4 />
            </div>
            <div className={classes.banner}>
              <Hospital5 />
            </div>
          </Slider>
          <div className={classes.title}>
            <h3 className="display-5 ">Electronic Medical Record Systems</h3>
            <h5>{`What is an EMR System?`}</h5>
            <p className="my-3">
              {`EMR, or electronic medical records, are
              digitized paper charts that include diagnoses, allergies, medical
              histories, immunization dates, lab results, medications and
              physicians' notes.`}
            </p>
            <p className="mb-0">
              {`EMR systems can handle everything from documenting patient data
              and scheduling appointments to filling prescriptions and verifying
              insurances. You may have concerns regarding the implementation of
              an electronic medical records system. But with it, your facility’s
              productivity and efficiency can reach new heights. You can also
              gain monetary incentives by adopting these platforms.`}
            </p>
            {!isExpand ? (
              <button
                onClick={() => setIsExpand(!isExpand)}
                className={classes.btn}
              >
                Continue reading...
              </button>
            ) : (
              <div className={classes.expand}>
                <button
                  onClick={() => setIsExpand(!isExpand)}
                  className={classes.btn}
                >
                  Hidden
                </button>
                <p>
                  {`Cars cannot move without wheels. We cannot survive without
                  oxygen. The world could end if it stops spinning. Similarly,
                  EMR programs cannot function properly without their essential
                  elements. And before you invest in an EMR, you should have a
                  fair idea of what you are getting into. Below we have outlined
                  some components of EMR systems that are worth keeping in mind.`}
                </p>
                <h5>{`Technical Staff`}</h5>
                <p className="my-3">
                  {`We know that your primary focus is delivering high-quality
                  patient care. You won’t achieve it if you spend most of your
                  time maintaining an EMR system. We advise you to delegate such
                  technical tasks to someone who understands the interface
                  thoroughly. As Steve Jobs rightly said, “Great things in
                  business are never done by one person. They’re done by a team
                  of people.” That’s why you need to build a team that enables
                  you to provide patients the care they deserve.`}
                </p>
                <h5>{`Infrastructure`}</h5>
                <p className="my-3">
                  {`Are your devices compatible with EMR systems? Before you spend
                  on a product, check if it’s compatible with the hardware you
                  own, like laptops, printers, tablets, smartphones, PCs and
                  workstations. You don’t want to end up spending on an app that
                  will cause additional hardware costs (unless you wish to
                  upgrade your devices).`}
                </p>
                <h5>{`Business Processes`}</h5>
                <p className="my-3">
                  {`You should set guidelinesto ensure the smooth running of
                  medical practices. Compile a document highlighting steps and
                  instructions involved in maintaining EMR systems. It can
                  include appointment scheduling, billing and data inputting
                  procedures. This way, you make it easier for your staff to
                  resolve issues in no time. They can also refer to files to
                  gain an in-depth understanding of the app.`}
                </p>
                <h5>{`Patient Portals`}</h5>
                <p className="my-3">
                  {`EMR programs are not only designed for medical professionals
                  but also for patients to enhance their experiences. Allow
                  patients to schedule appointments, contact physicians, request
                  refills and access test results digitally. With the rise in
                  Covid-19 cases, patients are opting for virtual instead of
                  physical visits. According to a survey conducted by HIMSS, 58%
                  of medical professionals connect with their patients using
                  mobile-optimized patient portals.`}
                </p>
              </div>
            )}
          </div>
          <div className="row mb-2">
            <Grid container spacing={2}>
              <Grid item sm={12} md={6} xl={6}>
                <div className={classes.poster}>
                  <VisitDoctor1 />
                  <div className={classes.letter}>
                    <Stack direction="row" spacing={30}>
                      <h5 className="mb-0"> Easy to use</h5>
                      <span>Nov 12</span>
                    </Stack>
                    <p>
                      Fewer errors compared to paper records. Better and quicker
                      care. Track results and data over time.
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} md={6} xl={6}>
                <div className={classes.poster}>
                  <VisitDoctor2 />
                  <div className={classes.letter}>
                    <Stack direction="row" spacing={30}>
                      <h5 className="mb-0"> User-friendly</h5>
                      <span>April 30</span>
                    </Stack>
                    <p>
                      The system helping providers more effectively diagnose
                      patients, reduce medical errors, and provide safer care.
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.element}>
            <h2>Fully Open-Source. Free Software, Always and Forever.</h2>
            <p>
              {`EMRS is the most popular open source electronic health records
              and medical practice management solution. OpenEMR's goal is a
              superior alternative to its proprietary counterparts with
              passionate volunteers and contributors dedicated to guarding
              OpenEMR's status as a free, open source software solution for
              medical practices with a commitment to openness, kindness and
              cooperation.`}
            </p>
          </div>
          <div className={classes.element}>
            <h2>ONC 2015 Cures Update Certified!</h2>
            <p>
              {`EMRS is ONC 2015 Cures Update Certified! More details on how
              the EMRS community completed this feat can be found on our blog
              article. The ONC 2015 Certification Transparency and Disclosure
              Requirements for EMRS can be viewed here. Additional costs may
              apply and the additional costs disclosure can be viewed here.`}
            </p>
          </div>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6} xl={6}>
              <img
                style={{ maxHeight: "300px", maxWidth: "100%" }}
                src="https://www.open-emr.org/img/ONC_Certification_HIT_2015Edition_CU_Stacked_RGB.jpg"
              />
            </Grid>
            <Grid item sm={12} md={6} xl={6}>
              <img
                style={{ maxHeight: "300px", maxWidth: "100%" }}
                src="https://www.open-emr.org/img/SLI_Certification_Mark_2017-01.png"
              />
            </Grid>
          </Grid>
          <img
            style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
            src="https://www.open-emr.org/img/stethoscope.jpg"
          />
          <div className={classes.element}>
            <h2>A feature-rich solution</h2>
            <p>
              {`Our vibrant community of volunteers and contributors have
              maintained critical OpenEMR features for over a decade. With over
              30 supported languages, many customizations, and full data
              ownership, OpenEMR's features shine. On top of this, users in need
              of support can take advantage of our volunteer support network as
              well as over 30 vendors in over 10 countries.`}
            </p>
          </div>
        </div>
        {/* <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item sm={12} md={3} xl={3}>
              <CardImage
                key={index}
                img={item.img}
                title={item.title}
                content={item.content}
              />
            </Grid>
          ))}
        </Grid> */}
      </div>
    </div>
  );
};

export default About;
