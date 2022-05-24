import React from "react";

export default function Contact() {
  return (
    <div className='contact-imfo-box'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <i className='fa fa-volume-control-phone'></i>
            <div className='overflow-hidden'>
              <h4>Điện thoại</h4>
              <p className='lead'>+84 326 766 643</p>
            </div>
          </div>
          <div className='col-md-4'>
            <i className='fa fa-envelope'></i>
            <div className='overflow-hidden'>
              <h4>Email</h4>
              <p className='lead'>hungbgls220@gmail.com</p>
            </div>
          </div>
          <div className='col-md-4'>
            <i className='fa fa-map-marker'></i>
            <div className='overflow-hidden'>
              <h4>Địa chỉ</h4>
              <p className='lead'>3 Cau Giay, HongKong Tower, HaNoi , VietNam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
