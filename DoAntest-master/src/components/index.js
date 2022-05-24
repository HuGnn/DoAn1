import React from "react";
import { logoImg } from "../asset";

export default function Index() {
  return (
    <div className='row'>
      <img className='col sm-4' src={logoImg.logo} />
      <img className='col sm-4' src={logoImg.logo} />
    </div>
  );
}
