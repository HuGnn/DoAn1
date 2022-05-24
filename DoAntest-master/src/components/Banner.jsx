import React from "react";

export default function Banner({ img, content, author, center }) {
  return (
    <div className='qt-box qt-background' style={{ backgroundImage: `url("${img}")` }}>
      <div className={center ? "container text-center" : "container"}>
        <div className='row'>
          <div className='col-md-8 ms-auto me-auto text-left'>
            <p className='lead '>Quần áo thời trang</p>
            <span className='lead'>{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
