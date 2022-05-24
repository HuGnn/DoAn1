import React, { useEffect, useState } from "react";
import CommonLayout from "../layouts/commonLayout.jsx";
import { bannerImg } from "../asset";
import Banner from "../components/Banner.jsx";
import Contact from "../components/Contact.jsx";
import Slider from "../components/Slider.jsx";
import About from "../components/About.jsx";
import { sliderImg } from "../asset";
import { productImg } from "../asset";
import MenuBox from "../components/MenuBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import { actionGetTop, getItemShow } from "../redux/slice/home.js";
import { actionSetNumberCart, getCurrentItem } from "../redux/slice/item.js";
import EModal from "../components/EModal.jsx";

const arrImage = [sliderImg.one, sliderImg.two, sliderImg.three];
const filter = [
  { id: 1, categoryName: "Đồ Nam", label: "bestseller" },
  { id: 2, categoryName: "Đồ Nữ", label: "new" },
  { id: 3, categoryName: "Đồ Cho Trẻ", label: "popular" },
];


export default function HomePage() {
  const content = " Rẻ như bèo, nghèo cũng có tiền mua. ";
  const author = "-Việt Hùng";
  const currentItem = useSelector(getCurrentItem);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const listItem = useSelector(getItemShow);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(actionGetTop());
  }, []);

  return (
    <CommonLayout>
      <Slider arrImage={arrImage} />
      <About />
      <Banner img={bannerImg.home} content={content} author={author} />
      <MenuBox homeFil={filter} items={listItem} handleOpenModal={handleOpenModal} />
      <Contact />

      <EModal open={open} handleClose={handleCloseModal} item={currentItem} />
    </CommonLayout>
  );
}
