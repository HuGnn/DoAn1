import React from "react";
import { aboutImg } from "../asset";

export default function About() {
  return (
    <div className='about-section-box'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <img src={aboutImg.home} alt='' className='img-fluid' />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 text-center'>
            <div className='inner-column'>
              <h1>
                Xin chào đến với hệ thống <span>HN Shop</span>
              </h1>
              <h4>Câu chuyện về cửa hàng</h4>
              <p>
                Bỏ ngoài tai những lời đường mật<tr>

                </tr>
                Chỉ quần áo đang sale mới là sức hút thật với em.
              </p>
              <p>
                Chuỗi cửa hàng của chúng tôi ra đời nhằm chứng minh những gì nước ngoài làm được thì người Việt cũng
                hoàn toàn có thể.Chúng tôi luôn đặt chất lượng và thái độ của khách hàng lên hàng đầu. Vì vậy bạn có thể
                hoàn toàn tin tưởng vào chất lượng quần áo của chúng tôi.
              </p>
              <a className='btn btn-lg btn-circle btn-outline-new-white' href='/menu' t>
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
