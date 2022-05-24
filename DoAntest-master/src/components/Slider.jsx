import React, { useEffect, useState } from "react";

export default function Slider({ arrImage }) {
  const [currentImage, setCurrentImage] = useState(arrImage[1]);
  useEffect(() => {
    let index = arrImage.indexOf(currentImage) + 1;
    let _index = index < 0 || index > arrImage.length - 1 ? 0 : index;
    const time = setTimeout(() => {
      setCurrentImage(arrImage[_index]);
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  }, [currentImage]);
  const handleChangeSlide = (index) => {
    let _index = index < 0 || index > arrImage.length - 1 ? 0 : index;
    setCurrentImage(arrImage[_index]);
  };
  return (
    <div id='slides' className='cover-slides app-slider__container'>
      <div className='slides-control app-slider__container-control'>
        <ul className='slides-container'>
          <li className='text-center'>
            <img src={currentImage} alt='' className='img_one' />
            <div className='container d-flex justify-content-center align-items-center' style={{ height: "100%" }}>
              <div className='row'>
                <div className='col-md-12'>
                  <h1 className='m-b-20'>
                    <strong>
                      Xin chào đến với
                      <br /> HN Shop
                    </strong>
                  </h1>
                  <p className='m-b-40'>
                    Chúng tôi luôn mang lại những sản phẩm giá trị cao vì
                    <br />
                    áo quần chính là biểu tượng của tình yêu khi ta không tìm ra từ ngữ nào để diễn tả.
                  </p>
                  <p>
                    <a className='btn btn-lg btn-circle btn-outline-new-white' href='/menu'>
                      Xem thêm
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className='overlay-background'></div>
          </li>
        </ul>
      </div>
      <div className='slides-navigation'>
        <span
          className='next'
          onClick={() => {
            handleChangeSlide(arrImage.indexOf(currentImage) + 1);
          }}
        >
          <i className='fa fa-angle-right' aria-hidden='true'></i>
        </span>
        <span
          className='prev'
          onClick={() => {
            handleChangeSlide(arrImage.indexOf(currentImage) - 1);
          }}
        >
          <i className='fa fa-angle-left' aria-hidden='true'></i>
        </span>
      </div>
      <nav className='slides-pagination'>
        {arrImage.map((e, index) => (
          <span
            key={index}
            className={index === arrImage.indexOf(currentImage) ? "current" : ""}
            onClick={() => handleChangeSlide(index)}
          >
            {index + 1}
          </span>
        ))}
      </nav>
    </div>
  );
}
