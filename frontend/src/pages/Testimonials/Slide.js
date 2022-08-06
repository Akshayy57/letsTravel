import React from "react"
import TestimonialApi from "./TestimonialApi"
import QuoteRight from '../../images/icons/quote-right.svg'


const Slide = ({ id, image, place, name, user, keyword, date, desc, valueIndex, index }) => {
  let position = "nextSlide"
  if (valueIndex === index) {
    position = "activeSlide"
  }
  if (valueIndex === index - 1 || (index === 0 && valueIndex === TestimonialApi.length - 1)) {
    position = "lastSlide"
  }

  return (
    <>
      <article className={`d_flex ${position}`} key={id}>
        {/*<div className='box d_flex' className={position} key={id}>*/}
        <div className='s-left box_shodow'>
          <div className='img'>
            <img src={image} alt='' />
          </div>
          <div className='details mtop'>
            <span className='primary_color'>{place}</span>
            <h2>{name}</h2>
            <label>{user}</label>
          </div>
        </div>

        <div className='s-right'>
          <div className='icon'>
            <div className='quote'>
              {/* <i class='fal fa-quote-right'></i> */}
              <img src={QuoteRight} data-toggle="tooltip" data-placement="top" title="QuoteRight" alt="QuoteRight" />
            </div>
          </div>

          <div className='content box_shodow mtop'>
            <h2>{keyword}</h2>
            <h3>{date}</h3>
            <p>{desc}</p>
          </div>
        </div>
      </article>

      {/*
	    <img src='https://rainbowit.net/html/inbio/assets/images/testimonial/final-home--4th.png' alt='' />
        <span className='primary_color'>NCD - place</span>
        <h2>Mevine Thoda</h2>
        <label>Marketing Officer</label>
        
        <i class='fal fa-quote-right'></i>
        <i class='fas fa-arrow-left'></i>
        <i class='fas fa-arrow-right'></i>
        <h2>CEO - Marketing</h2>
        <h3>Thoda Department - Mar 4, 2018 - Aug 30, 2021</h3>
        <p>Marcent Of Vanice and treatment. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante. Ut tincidunt est ac dolor aliquam sodales phasellus smauris</p>
     */}
    </>
  )
}

export default Slide
