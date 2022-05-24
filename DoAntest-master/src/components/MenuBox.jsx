import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import homeApi from "../api/homeApi";
import {
  actionSetCurrentItem,
  actionSetFilter,
  getCurrentFilter,
} from "../redux/slice/item";
// import {
//   actioneSetHomeFilter,
//   getBestSell,
//   getHomeCurrentFilter,
//   getNew,
//   getPopular,
// } from "../redux/slice/home";

export function MenuBox(
  { filter, items, children, homeFil, handleOpenModal },
  ref
) {
  const currentFilter = useSelector(getCurrentFilter);
  const [currentSelected, setCurrentSelected] = useState("bestsell");
  const [bestSell, setBestSell] = useState([]);
  const [newest, setNewest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const dispatch = useDispatch();
  const handleClickFilter = (data) => {
    dispatch(actionSetFilter(data));
  };
  const handleClickHomeFilter = (type) => {
    setCurrentSelected(type);
  };
  const handleClickCart = (item) => {
    handleOpenModal();
    dispatch(actionSetCurrentItem(item));
  };

  const requestApi = async (params) => {
    let best = await homeApi.getTop({ ...params, type: "bestsell" });
    let news = await homeApi.getTop({ ...params, type: "newest" });
    let pop = await homeApi.getTop({ ...params, type: "popular" });
    setBestSell(best.data.data);
    setNewest(news.data.data);
    setPopular(pop.data.data);
    // setCurrentItems(best.data.data);
    if (currentSelected === "bestsell") {
      setCurrentItems(best.data.data);
    } else if (currentSelected === "newest") {
      setCurrentItems(news.data.data);
    } else {
      setCurrentItems(pop.data.data);
    }
  };

  React.useImperativeHandle(ref, () => ({
    requestApi,
  }));

  useEffect(() => {
    requestApi();
  }, []);

  useEffect(() => {
    if (currentSelected === "bestsell") {
      setCurrentItems(bestSell);
    } else if (currentSelected === "newest") {
      setCurrentItems(newest);
    } else {
      setCurrentItems(popular);
    }
  }, [currentSelected]);

  return (
    <div className="menu-box">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-title text-center">
              <h2>Quần áo thời trang </h2>
              <p>Hãy chọn loại sản phẩm mà bạn muốn</p>
            </div>
          </div>
        </div>
        {filter?.length > 0 && (
          <div className="row">
            <div className="col-lg-12">
              <div className="special-menu text-center">
                <div className="button-group filter-button-group">
                  {filter?.map((item, index) => (
                    <button
                      key={index}
                      className={
                        currentFilter === item.categoryName ? "active" : ""
                      }
                      onClick={() => handleClickFilter(item.categoryName)}
                    >
                      {item?.categoryName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-12">
            <div className="special-menu text-center">
              <div className="button-group filter-button-group">
                <button
                  className={currentSelected === "bestsell" ? "active" : ""}
                  onClick={() => handleClickHomeFilter("bestsell")}
                >
                  Đồ Nữ
                </button>
                <button
                  className={currentSelected === "newest" ? "active" : ""}
                  onClick={() => handleClickHomeFilter("newest")}
                >
                  Đồ Nam
                </button>
                <button
                  className={currentSelected === "popular" ? "active" : ""}
                  onClick={() => handleClickHomeFilter("popular")}
                >
                  Đồ Cho Trẻ
                </button>
              </div>
            </div>
          </div>
        </div>
        {children}

        <div className="row ">
          {currentItems?.length > 0 &&
            currentItems?.map((item, index) => (
              <div className="col-lg-4 col-md-6 special-grid lunch" key={index}>
                <div className="gallery-single fix">
                  <img
                    src={item.image_value}
                    className="img-fluid"
                    alt={item.name}
                    style={{
                      height: "251px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="why-text">
                    <h4 id="text__flow" style={{ marginTop: "1rem" }}>
                      {item.name}
                    </h4>
                    <h5 style={{ color: "#e48c19", fontSize: "25px" }}>
                      {new Intl.NumberFormat().format(item?.price || 0)} VND
                    </h5>
                  </div>
                </div>
                <div
                  className="icon__cart"
                  onClick={() => handleClickCart(item)}
                >
                  <i className="fa fa-shopping-cart"></i>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default React.forwardRef(MenuBox);
