import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ConfirmDeleteProduct({
  open,
  handleClose,
  item,
  handleDeleteProduct,
}) {
  const handleClickClose = () => {
    handleClose();
  };

  const handleDelete = () => {
    handleDeleteProduct(item.id);
  };

  return (
    <div>
      <Modal toggle={handleClickClose} isOpen={open}>
        <ModalHeader toggle={handleClickClose}>Xác nhận</ModalHeader>
        <ModalBody>
          <div className="modal__container">
            <h5>Bạn có muốn xóa sản phẩm {item?.name}?</h5>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDelete}>
            Xác nhận
          </Button>{" "}
          <Button onClick={handleClose}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmDeleteProduct;
