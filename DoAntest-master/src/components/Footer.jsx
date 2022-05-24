import React from "react";
import { footerImg } from "../asset";

export default function Footer() {
  return (
    <footer className='footer-area bg-f' style={{ backgroundImage: `url("${footerImg.footer}")` }}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 col-md-6'>
            <h3>Về Hn Shop</h3>
            <p>
              Với kinh nghiệm hơn 10 năm trên thị trường thì chúng tôi hiểu khách hàng cần gì và muốn gì. Vì vậy chúng
              tôi luôn đặt chất lượng lên hàng đầu và lợi nhuận chỉ là một phần
            </p>
          </div>
          <div className='col-lg-3 col-md-6'>
            <h3>Giờ mở cửa</h3>
            <p>
              <span className='text-color'>Monday: </span>Closed
            </p>
            <p>
              <span className='text-color'>Tue-Wed :</span> 9:Am - 10PM
            </p>
            <p>
              <span className='text-color'>Thu-Fri :</span> 9:Am - 10PM
            </p>
            <p>
              <span className='text-color'>Sat-Sun :</span> 5:PM - 10PM
            </p>
          </div>
          <div className='col-lg-3 col-md-6'>
            <h3>Thông tin liên hệ</h3>
            <p className='lead'>3 Cau Giay Street, HongKong Tower, HaNoi City, VietNam</p>
            <p className='lead'>
              <a href='#'>+84 985 789 577</a>
            </p>
            <p>
              <a href='#'> hungbgls220@gmail.com</a>
            </p>
          </div>
          <div className='col-lg-3 col-md-6'>
            <h3>Liên hệ</h3>
            <div className='subscribe_form'>
              <form className='subscribe_form'>
                <input
                  name='EMAIL'
                  id='subs-email'
                  className='form_input'
                  placeholder='Địa chỉ email...'
                  type='email'
                />
                <button type='submit' className='submit'>
                  Đăng ký
                </button>
                <div className='clearfix'></div>
              </form>
            </div>
            <ul className='list-inline f-social'>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fa fa-facebook' aria-hidden='true'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fa fa-twitter' aria-hidden='true'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fa fa-linkedin' aria-hidden='true'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fa fa-google-plus' aria-hidden='true'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fa fa-instagram' aria-hidden='true'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='copyright'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <p className='company-name'>
                All Rights Reserved. © 2021 <a href='#'>HN Shop</a> Design By :
                <a href='https://html.design/'>&nbsp;Hn Shop</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
