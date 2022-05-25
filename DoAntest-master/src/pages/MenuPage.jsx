import React, { useEffect, useState } from "react";
import { bannerImg } from "../asset/index.js";
import Banner from "../components/Banner.jsx";
import MenuBox from "../components/MenuBox.jsx";
import Slider from "../components/Slider.jsx";
import { productImg } from "../asset";
import CommonLayout from "../layouts/commonLayout.jsx";
import Contact from "../components/Contact.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedEffect } from "../hook/index.js";
import {
  actionGetCater,
  actionGetItem,
  actionSearch,
  actionSetCurrentPage,
  actionSetFilterAll,
  getAllItem,
  getCategory,
  getCurrentFilter,
  getCurrentItem,
  getCurrentPage,
  getFilter,
  getTotal,
} from "../redux/slice/item.js";
import RPagination from "../components/Pagination.jsx";
import { Container, Row } from "reactstrap";
import EModal from "../components/EModal.jsx";

const category = [
  { id: 1, name: "Chicken" },
  { id: 2, name: "Fish" },
  { id: 3, name: "Beff" },
  { id: 4, name: "Pig" },
];
const dataProduct = [
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
  { img: productImg.product_one, name: "Special Lunch 1", price: "$15.79" },
];

export default function MenuPage() {
  const content = " Cái răng cái tóc là góc con người.. ";
  const author = "-Tục ngữ xưa";
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage);
  // const total = useSelector(getTotal);
  const category = useSelector(getCategory);
  const listItem = useSelector(getAllItem);
  const currentItem = useSelector(getCurrentItem);
  const currentFilter = useSelector(getCurrentFilter);
  const filter = useSelector(getFilter);
  const [sort, setSort] = useState(undefined);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0)
  const ref = React.useRef(null);

  const getTotalPage = (total, size) => {
    const total_page = Math.floor(total / size);
    return total_page * size < total ? total_page + 1 : total_page;
  };

  const totalPage = getTotalPage(total, 6);

  const handleClickPagination = (data) => {
    const page = (data < 1 && 1) || (data > totalPage && totalPage) || data;
    setPage(page);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useDebouncedEffect(
    () => {
      ref.current.requestApi({ search, sort, page });
    },
    1000,
    [search, sort, page]
  );

  const handleChange = ({ target }) => {
    setSort(target.value);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(actionGetItem(currentPage));
    // dispatch(actionGetCater());
  }, []);
  useEffect(() => {
    setSearch("");
  }, [currentFilter]);

  return (
    <CommonLayout>
      <div id="pt-6"></div>
      <Banner
        img={bannerImg.menu}
        content={"Thực đơn đặc biệt"}
        author={""}
        center={true}
      />
      <MenuBox
        filter={category.slice(0, 4)}
        items={listItem}
        handleOpenModal={handleOpenModal}
        ref={ref}
        setTotal={setTotal}
      >
        <div className="row py-3">
          <div className="col col-6 search">
            <input
              type="text"
              placeholder="Nhập để tìm kiếm"
              value={search}
              onChange={handleSearch}
            />
            {/* <i className='fa fa-search icon'></i> */}
          </div>
          <div className="col col-6 filter">
            <div className="d-inline-flex justify-content-end w-100">
              <select name="price" value={sort} onChange={handleChange}>
                <option value="">Giá tiền</option>
                <option value="Asc">Từ thấp - cao</option>
                <option value="Desc">Từ cao - thấp</option>
              </select>
            </div>
          </div>
        </div>
      </MenuBox>

      {totalPage > 1 && (
        <Container>
          <Row>
            <RPagination
              currentPage={currentPage}
              totalPage={totalPage}
              handleClick={handleClickPagination}
            />
          </Row>
        </Container>
      )}
      <Banner img={bannerImg.home} content={content} author={author} />
      <Contact />

      <EModal open={open} handleClose={handleCloseModal} item={currentItem} />
    </CommonLayout>
  );
}
