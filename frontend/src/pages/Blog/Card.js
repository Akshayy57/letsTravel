import React, { useState } from "react"
import ArrowRight from '../../images/icons/arrow-right.svg'
import Times from '../../images/icons/times.svg'

const Card = (props) => {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  if (modal) {
    document.body.classList.add("active-modal")
  } else {
    document.body.classList.remove("active-modal")
  }
  return (
    <>
      <div className='box btn_shadow '>
        <div className='img'>
          <img src={props.image} alt='' onClick={toggleModal} />
        </div>
        <div className='category d_flex'>
          <span onClick={toggleModal}>{props.date}</span>
          {/*<label>
            <i className='far fa-heart'></i> {props.date}
          </label>*/}
        </div>
        <div className='title'>
          <h2 onClick={toggleModal}>{props.title_one}</h2>
          <a href='#popup' className='arrow' onClick={toggleModal}>
            {/* <i class='fas fa-arrow-right'></i> */}
            <img src={ArrowRight} data-toggle="tooltip" data-placement="top" title="ArrowRight" alt="ArrowRight" />
          </a>
        </div>
      </div>

      {/* Popup box */}
      {modal && (
        <div className='modal modal-blog'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <div className='modal-img c-left'>
              <img src={props.image} alt='' />
            </div>
            <div className='modal-text c-right'>
              <span>{props.date}</span>
              <h1>{props.title_one}</h1>
              <p>{props.desc_one}</p>

              <h1>{props.title_two}</h1>
              <p>{props.desc_two}</p>

              <h1>{props.title_three}</h1>
              <p>{props.desc_three}</p>

              <button className='close-modal btn_shadow' onClick={toggleModal}>
                {/* <i class='fas fa-times'></i> */}
                <img src={Times} data-toggle="tooltip" data-placement="top" title="Times" alt="Times" />
              </button>

              {/*---------Leave Message----------  */}
              <div className='contact mtop'>
                <h1>Leave a Reply</h1>

                <form className='blog_contact d_flex'>
                  <div className='c-left'>
                    <input type='text' placeholder='Name' />
                    <input type='email' placeholder='Email' />
                    <input type='text' placeholder='Website' />
                    <button className='btn_shadow'>SUBMIT NOW</button>
                  </div>
                  <div className='c-right'>
                    <textarea cols='30' rows='12' placeholder='Comment'></textarea>
                  </div>
                </form>
              </div>
              {/*---------Leave Message----------  */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
