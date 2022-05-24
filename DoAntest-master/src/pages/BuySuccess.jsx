import React from "react";
import { useHistory } from "react-router";
import { Button, Card, CardBody, Container } from "reactstrap";
import CommonLayout from "../layouts/commonLayout.jsx";

export default function BuySuccess() {
  const history = useHistory();
  return (
    <CommonLayout>
      <Container style={{ padding: "7rem 0 2rem 0" }}>
        <Card>
          <CardBody className='text-center' style={{ padding: "5rem 0" }}>
            <h3>Đặt hàng thành công</h3>
            <Button color='primary' onClick={() => history.replace("/menu")}>
              Tiếp tục mua hàng
            </Button>
          </CardBody>
        </Card>
      </Container>
    </CommonLayout>
  );
}
