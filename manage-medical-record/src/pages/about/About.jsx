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
            <h3 className="display-5 font-weight-bold">
              Electronic Medical Record Systems
            </h3>
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
        </div>
        <main role="main" className="container">
          <div className="row">
            <div className="col-md-8 blog-main">
              <h3 className="pb-3 mb-4 font-italic border-bottom">
                From the Firehose
              </h3>
              <div className="blog-post">
                <h2 className="blog-post-title">Sample blog post</h2>
                <p className="blog-post-meta">
                  January 1, 2014 by <a href="#">Mark</a>
                </p>
                <p>
                  This blog post shows a few different types of content
                  that&apos;s supported and styled with Bootstrap. Basic
                  typography, images, and code are all supported.
                </p>
                <hr />
                <p>
                  Cum sociis natoque penatibus et magnis{" "}
                  <a href="#">dis parturient montes</a>, nascetur ridiculus mus.
                  Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                  venenatis vestibulum. Sed posuere consectetur est at lobortis.
                  Cras mattis consectetur purus sit amet fermentum.
                </p>
                <blockquote>
                  <p>
                    Curabitur blandit tempus porttitor.{" "}
                    <strong>Nullam quis risus eget urna mollis</strong> ornare
                    vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id
                    elit.
                  </p>
                </blockquote>
                <p>
                  Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </p>
                <h2>Heading</h2>
                <p>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <h3>Sub-heading</h3>
                <p>
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
                <pre>
                  <code>Example code block</code>
                </pre>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem
                  malesuada magna mollis euismod. Fusce dapibus, tellus ac
                  cursus commodo, tortor mauris condimentum nibh, ut fermentum
                  massa.
                </p>
                <h3>Sub-heading</h3>
                <p>
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                  consectetur. Etiam porta sem malesuada magna mollis euismod.
                  Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
                <ul>
                  <li>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et.
                  </li>
                  <li>Donec id elit non mi porta gravida at eget metus.</li>
                  <li>Nulla vitae elit libero, a pharetra augue.</li>
                </ul>
                <p>
                  Donec ullamcorper nulla non metus auctor fringilla. Nulla
                  vitae elit libero, a pharetra augue.
                </p>
                <ol>
                  <li>Vestibulum id ligula porta felis euismod semper.</li>
                  <li>
                    Cum sociis natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus.
                  </li>
                  <li>
                    Maecenas sed diam eget risus varius blandit sit amet non
                    magna.
                  </li>
                </ol>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Sed posuere
                  consectetur est at lobortis.
                </p>
              </div>
              {/* /.blog-post */}
              <div className="blog-post">
                <h2 className="blog-post-title">Another blog post</h2>
                <p className="blog-post-meta">
                  December 23, 2013 by <a href="#">Jacob</a>
                </p>
                <p>
                  Cum sociis natoque penatibus et magnis{" "}
                  <a href="#">dis parturient montes</a>, nascetur ridiculus mus.
                  Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                  venenatis vestibulum. Sed posuere consectetur est at lobortis.
                  Cras mattis consectetur purus sit amet fermentum.
                </p>
                <blockquote>
                  <p>
                    Curabitur blandit tempus porttitor.{" "}
                    <strong>Nullam quis risus eget urna mollis</strong> ornare
                    vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id
                    elit.
                  </p>
                </blockquote>
                <p>
                  Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </p>
                <p>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros.
                </p>
              </div>
              {/* /.blog-post */}
              <div className="blog-post">
                <h2 className="blog-post-title">New feature</h2>
                <p className="blog-post-meta">
                  December 14, 2013 by <a href="#">Chris</a>
                </p>
                <p>
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                  consectetur. Etiam porta sem malesuada magna mollis euismod.
                  Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
                <ul>
                  <li>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et.
                  </li>
                  <li>Donec id elit non mi porta gravida at eget metus.</li>
                  <li>Nulla vitae elit libero, a pharetra augue.</li>
                </ul>
                <p>
                  Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </p>
                <p>
                  Donec ullamcorper nulla non metus auctor fringilla. Nulla
                  vitae elit libero, a pharetra augue.
                </p>
              </div>
              {/* /.blog-post */}
              <nav className="blog-pagination">
                <a className="btn btn-outline-primary" href="#">
                  Older
                </a>
                <a className="btn btn-outline-secondary disabled" href="#">
                  Newer
                </a>
              </nav>
            </div>
            {/* /.blog-main */}
            <aside className="col-md-4 blog-sidebar">
              <div className="p-3 mb-3 bg-light rounded">
                <h4 className="font-italic">About</h4>
                <p className="mb-0">
                  Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </p>
              </div>
              <div className="p-3">
                <h4 className="font-italic">Archives</h4>
                <ol className="list-unstyled mb-0">
                  <li>
                    <a href="#">March 2014</a>
                  </li>
                  <li>
                    <a href="#">February 2014</a>
                  </li>
                  <li>
                    <a href="#">January 2014</a>
                  </li>
                  <li>
                    <a href="#">December 2013</a>
                  </li>
                  <li>
                    <a href="#">November 2013</a>
                  </li>
                  <li>
                    <a href="#">October 2013</a>
                  </li>
                  <li>
                    <a href="#">September 2013</a>
                  </li>
                  <li>
                    <a href="#">August 2013</a>
                  </li>
                  <li>
                    <a href="#">July 2013</a>
                  </li>
                  <li>
                    <a href="#">June 2013</a>
                  </li>
                  <li>
                    <a href="#">May 2013</a>
                  </li>
                  <li>
                    <a href="#">April 2013</a>
                  </li>
                </ol>
              </div>
              <div className="p-3">
                <h4 className="font-italic">Elsewhere</h4>
                <ol className="list-unstyled">
                  <li>
                    <a href="#">GitHub</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                </ol>
              </div>
            </aside>
            {/* /.blog-sidebar */}
          </div>
          {/* /.row */}
        </main>
        {/* /.container */}
      </div>
    </div>
  );
};

export default About;
