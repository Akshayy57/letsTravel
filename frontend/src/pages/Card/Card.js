import React from "react";
import { Carousel } from "react-bootstrap";
import Hotel1 from "../../images/hotel1.jpg";
import Hotel2 from "../../images/hotel2.jpg";
import Hotel3 from "../../images/hotel3.jpg";
import ReactStars from "react-stars";
import { Button, Badge } from "react-bootstrap";

function Card() {
  const cards = [
    {
      img: "https://images.unsplash.com/photo-1633158829556-6ea20ad39b4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      title: "Budget Friendly",
      description:
        "We always keep the budget low and meet the desired choice of our clients.",
    },
    {
      img: "https://source.unsplash.com/600x400/?luxury room",
      title: "Luxury Rooms",
      description:
        "We provide client with luxurious room location having a decent reviews.",
    },
    {
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      title: "Support in 24Hr",
      description:
        "Don't worry we have a great support team ready to help you at any time in a very professional way.",
    },
    {
      // img: "https://source.unsplash.com/600x400/?computer",
      img: "https://media.istockphoto.com/photos/update-software-application-and-hardware-upgrade-concept-2022-picture-id1370094584?b=1&k=20&m=1370094584&s=170667a&w=0&h=ClAZcbiTXRZElQ5E7l63rMY31PhpWgWXT2rAUH31vdk=",
      title: "Always Updated",
      description:
        "We guarantee frequent updates to always add new features and new most requested compatibility.",
    },
    
  ];
  return (
    <>
      <section className="my-4">
        <div className="container">
          <div className="text-center">
            <h5 className="landing-page-title">Why to Choose Us</h5>
          </div>
          <div className="w-100 d-flex gap-4 flex-wrap">
            {cards.map((el, idx) => (
              <div className="card" key={idx}>
                <div className="card__header">
                  <img
                    src={el.img}
                    alt="card__image"
                    className="card__image"
                    width="400"
                  />
                </div>
                <div className="card__body">
                  <div className="card__gradient"></div>
                  <span className="tag">{el.title}</span>
                  <p>{el.description}</p>
                  <div className="d-flex align-items-center">
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right-left img/info Section */}
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-10 col-sm-offset-1 col-xs-12">
              <figure>
                <div className="media"></div>
                <figcaption>
                  <svg
                    viewBox="0 0 200 200"
                    version="1.1"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <mask id="mask" x="0" y="0" width="100%" height="100%">
                        <rect
                          id="alpha"
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                        ></rect>
                        <text className="title" dx="50%" dy="2.5em">
                          ROYAL
                        </text>
                        <text className="title" dx="50%" dy="3.5em">
                          ICONIC
                        </text>
                        <text className="title" dx="50%" dy="4.5em">
                          STAY
                        </text>
                      </mask>
                    </defs>
                    <rect
                      id="base"
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                    ></rect>
                  </svg>
                  <div className="body">
                    <p>
                      Enamel pin selvage health goth edison bulb, venmo glossier
                      tattooed hella butcher cred iPhone.
                    </p>
                  </div>
                </figcaption>
                <a href="#"></a>
              </figure>
            </div>
            <div className="col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-10 col-sm-offset-1 col-xs-12">
              <div className="business-item-info">
                <h3>Experience unmatched royalty at the Iconic stay.</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do <br className="d-none d-xl-block" /> tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim{" "}
                  <br className="d-none d-xl-block" /> veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea{" "}
                  <br className="d-none d-xl-block" /> commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate{" "}
                  <br className="d-none d-xl-block" /> velit esse cillum dolore
                  eu fugiat nulla pariatur.
                </p>
                {/* <Button variant="primary" size="lg">
                  Visit Now
                </Button> */}
              </div>
            </div>
            {/* <div className="col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-10 col-sm-offset-1 col-xs-12">
              <div className="business-item-info">
                <h3>Perched amidst breathtakingly beautiful natural scenery enjoy offers a tranquil ambience to enjoy a relaxing and rejuvenating vacation.</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do <br className="d-none d-xl-block" /> tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim{" "}
                  <br className="d-none d-xl-block" /> veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea{" "}
                  <br className="d-none d-xl-block" /> commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate{" "}
                  <br className="d-none d-xl-block" /> velit esse cillum dolore
                  eu fugiat nulla pariatur.
                </p>
                <Button variant="primary" size="lg">
                  Visit Now
                </Button>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 hidden-sm hidden-xs">
              <figure>
                <div className="media"></div>
                <figcaption>
                  <svg
                    viewBox="0 0 200 200"
                    version="1.1"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <mask id="mask" x="0" y="0" width="100%" height="100%">
                        <rect
                          id="alpha"
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                        ></rect>
                        <text className="title" dx="50%" dy="2.5em">
                          ENJOY
                        </text>
                        <text className="title" dx="50%" dy="3.5em">
                          EVERY
                        </text>
                        <text className="title" dx="50%" dy="4.5em">
                          MOMENT
                        </text>
                      </mask>
                    </defs>
                    <rect
                      id="base"
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                    ></rect>
                  </svg>
                  <div className="body">
                    <p>
                      Enamel pin selvage health goth edison bulb, venmo glossier
                      tattooed hella butcher cred iPhone. Plaid skateboard man
                      braid wayfarers.
                    </p>
                  </div>
                </figcaption>
                <a href="#"></a>
              </figure>
            </div> */}
          </div>
        </div>
      </section>

    </>
  );
}

export default Card;
