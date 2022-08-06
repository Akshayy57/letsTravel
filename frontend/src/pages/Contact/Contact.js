import React, { useState } from "react"
import contact1 from "./contact1.png"
import "./Contact.scss"
import Facebook from '../../images/icons/facebook.svg'
import Instagram from '../../images/icons/instagram.svg'
import Twitter from '../../images/icons/twitter.svg'

const Contact = () => {
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    email: "",
    subject: "",
    message: "",})

  const InputEvent = (event) => {
    const { name, value } = event.target

    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      }
    })
  }

  const formSubmit = (event) => {
    event.preventDefault()
    alert(
      `My name is ${data.fullname}. 
	My phone number is ${data.phone}. 
	My email address is ${data.email}. 
	My Subject on  ${data.subject}. 
	Here is my message I want to say : ${data.message}. 
	`
    )
  }
  return (
    <>
      <section className='Contact' id='contact'>
        <div className='container top'>
          <div className='heading text-center'>
            <h2>Contact With Us</h2>
          </div>

          <div className='content d_flex'>
            <div className='c-left'>
              <div className='box box_shodow'>
                <div className='img'>
                  <img src={contact1} alt='' />
                </div>
                <div className='details'>
                  <h2>Akshay Yadav</h2>
                  <p>Chief Operating Officer</p>
                  <p>We are available for any Query. Connect us via and call into our account.</p> <br />
                  <p>Phone: +01234567890</p>
                  <p>Email: admin@letstravel.com</p> <br />
                  <span>FIND US AT</span>
                  <div className='button f_flex'>
                    <button className='btn_shadow'>
                      {/* <i className='fab fa-facebook-f'></i> */}
                      <img src={Facebook} data-toggle="tooltip" data-placement="top" title="Facebook" alt="Facebook" />
                    </button>
                    <button className='btn_shadow'>
                      {/* <i className='fab fa-instagram'></i> */}
                      <img src={Instagram} data-toggle="tooltip" data-placement="top" title="Instagram" alt="Instagram" />
                    </button>
                    <button className='btn_shadow'>
                      {/* <i className='fab fa-twitter'></i> */}
                      <img src={Twitter} data-toggle="tooltip" data-placement="top" title="Twitter" alt="Twitter" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='c-right box_shodow'>
              <form onSubmit={formSubmit}>
                <div className='f_flex'>
                  <div className='input c-row'>
                    <span>YOUR NAME</span>
                    <input type='text' name='fullname' value={data.fullname} onChange={InputEvent} />
                  </div>
                  <div className='input c-row'>
                    <span>PHONE NUMBER </span>
                    <input type='number' name='phone' value={data.phone} onChange={InputEvent} />
                  </div>
                </div>
                <div className='input'>
                  <span>EMAIL </span>
                  <input type='email' name='email' value={data.email} onChange={InputEvent} />
                </div>
                <div className='input'>
                  <span>SUBJECT </span>
                  <input type='text' name='subject' value={data.subject} onChange={InputEvent} />
                </div>
                <div className='input'>
                  <span>YOUR MESSAGE </span>
                  <textarea cols='30' rows='10' name='message' value={data.message} onChange={InputEvent}></textarea>
                </div>
                <button className='btn_shadow'>
                  SEND MESSAGE <i className='fa fa-long-arrow-right'></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
