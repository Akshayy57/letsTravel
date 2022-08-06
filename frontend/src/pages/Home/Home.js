import React from "react";
import Banner from ".././Banner/Banner";
import Card from ".././Card/Card";
import Testimonials from "../Testimonials/Testimonial"
import Blog from "../Blog/Blog"
import Portfolio from "../Portfolio/Portfolio";
import Contact from "../Contact/Contact";

// ES7 snippets to do 'rfce'

function Home() {
  return (
    <div className="home">
      <Banner />
      <div className="home__section">
        <Card />
        <Testimonials />
        {/* <Blog/> */}
        {/* <Portfolio/> */}
        <Contact/>
      </div>
    </div>
  );
}

export default Home;
