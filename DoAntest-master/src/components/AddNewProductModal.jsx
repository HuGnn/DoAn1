import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as yup from "yup";

const TYPE_OPTION = [
  {
    label: "Đồ Nữ",
    value: "newest",
  },
  {
    label: "Đồ Nam",
    value: "bestseller",
  },
  {
    label: "Đồ Trẻ Nhỏ ",
    value: "popular",
  },
];

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  description: yup.string().required("Vui lòng nhập miêu tả sản phẩm"),
  type: yup.string().required("Vui lòng chọn loại sản phẩm"),
  price: yup.number("Giá là số").required("Vui lòng nhập giá sản phẩm"),
  amount: yup
    .number("Số lượng là số")
    .required("Vui lòng nhập số lượng sản phẩm"),
});

function AddNewProductModal({
  open,
  handleClose,
  action,
  item,
  handleCreate,
  handleUpdate,
}) {
  const [fileInfo, setFileInfo] = React.useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: undefined,
      description: undefined,
      type: TYPE_OPTION[0]?.value,
      price: undefined,
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (item) {
      setValue("name", item?.name);
      setValue("description", item?.description);
      setValue("type", item?.type || TYPE_OPTION[0]?.value);
      setValue("price", item?.price);
      setValue("amount", item?.amount);
      setFileInfo([{ name: item.name, data: item.image_value }]);
    }
  }, [item]);

  const onFileChanged = (event) => {
    if (event.target.files.length === 0) return;
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onloadend = () => {
        setFileInfo((fileInfo) => {
          return [
            ...fileInfo,
            {
              name: event.target.files[i]?.name,
              data: reader.result,
            },
          ];
        });
      };
    }
  };

  const resetForm = () => {
    setValue("name", undefined);
    setValue("description", undefined);
    setValue("type", TYPE_OPTION[0]?.value);
    setValue("price", undefined);
    setValue("amount", undefined);
    setFileInfo([]);
  };

  const handleClickClose = () => {
    resetForm();
    handleClose();
  };

  const onSubmit = async (data) => {
    const params = {
      ...data,
      images: fileInfo ? fileInfo.map((itm) => itm.data) : [],
    };
    if (item?.id) {
      await handleUpdate(item.id, params);
      resetForm();
    } else {
      await handleCreate(params);
      resetForm();
    }
  };

  return (
    <Modal toggle={handleClickClose} isOpen={open}>
      <ModalHeader toggle={handleClickClose}>
        {action === "add" ? "Thêm mới" : "Cập nhật"} sản phẩm
      </ModalHeader>
      <ModalBody>
        <div>
          <form>
            <div className="form-outline mb-4">
              <h4>Tên:</h4>
              <input
                type="text"
                {...register("name")}
                placeholder="Nhập tên sản phẩm"
                className={
                  errors.name
                    ? "form-control form-control-lg form__error"
                    : "form-control form-control-lg"
                }
              />
              <p className="text__error">{errors.name?.message}</p>
            </div>

            <div className="form-outline mb-4">
              <h4>Miêu tả:</h4>
              <input
                type="text"
                {...register("description")}
                placeholder="Nhập miêu tả sản phẩm"
                className={
                  errors.description
                    ? "form-control form-control-lg form__error"
                    : "form-control form-control-lg"
                }
              />
              <p className="text__error">{errors.description?.message}</p>
            </div>

            <div className="form-outline mb-4">
              <h4>Loại:</h4>
              <select
                {...register("type")}
                className={
                  errors.type
                    ? "form-control form-control-lg form__error"
                    : "form-control form-control-lg"
                }
              >
                {TYPE_OPTION?.map((itm, index) => (
                  <option key={index} value={itm.value}>
                    {itm.label}
                  </option>
                ))}
              </select>
              <p className="text__error">{errors.type?.message}</p>
            </div>

            <div className="form-outline mb-4">
              <h4>Giá:</h4>
              <input
                {...register("price")}
                type="number"
                placeholder="Nhập giá sản phẩm"
                className={
                  errors.price
                    ? "form-control form-control-lg form__error"
                    : "form-control form-control-lg"
                }
              />
              <p className="text__error">{errors.price?.message}</p>
            </div>

            <div className="form-outline mb-4">
              <h4>Số lượng:</h4>
              <input
                {...register("amount")}
                type="number"
                placeholder="Nhập SL sản phẩm"
                className={
                  errors.amount
                    ? "form-control form-control-lg form__error"
                    : "form-control form-control-lg"
                }
              />
              <p className="text__error">{errors.amount?.message}</p>
            </div>

            <div className="form-outline mb-4">
              <h4>Hình ảnh:</h4>
              <input
                id="contained-button-file"
                name={"image"}
                type="file"
                accept="image/*"
                multiple
                onChange={onFileChanged}
              />
              <p className="text__error">{errors.image?.message}</p>
              <div className="d-flex align-items-start flex-wrap">
                {fileInfo?.map((itm, idx) => (
                  <img
                    key={idx}
                    className="m-1"
                    src={itm.data}
                    alt={itm.name}
                    width={100}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit(onSubmit)}>
          {action === "add" ? "Thêm mới" : "Cập nhật"}
        </Button>{" "}
        <Button onClick={handleClose}>Hủy bỏ</Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddNewProductModal;
