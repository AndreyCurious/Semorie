import React, { useEffect } from "react";
import { Row, Col, Container, ListGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentType, setStateType, addType } from "../slices/types";
import { setStateGroup, setCurrentGroup, addGroup } from "../slices/groups";
import { setCurrentItem, setStateItems } from "../slices/jewellery";
import routes from "../routes.js";
import { $host } from "../http";

const Shop = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allItems = { name: t("shop.all"), id: t("shop.all") };
  const allCoating = { name: t("shop.any"), id: t("shop.any") };
  const types = useSelector((state) => state.typesData.types);
  const currentType = useSelector((state) => state.typesData.currentType);
  const groups = useSelector((state) => state.groupsData.groups);
  const currentGroup = useSelector((state) => state.groupsData.currentGroup);
  const devices = useSelector((state) =>
    state.jewelleryData.items.filter((item) => {
      if (currentGroup === t("shop.any") && currentType === t("shop.all")) {
        return true;
      }
      if (currentGroup === t("shop.any")) {
        return item.typeId === currentType;
      }
      if (currentType === t("shop.all")) {
        return item.brandId === currentGroup;
      }
      return item.brandId === currentGroup && item.typeId === currentType;
    })
  );
/* eslint-disable */
  useEffect(() => {    
    const getData = async () => {
      try {
        const groupsData = await $host.get(routes.axiosGroups());
        const typesData = await $host.get(routes.axiosTypes());
        const jewelleryData = await $host.get(routes.axiosJewellery());

        dispatch(setStateItems(jewelleryData.data));
        dispatch(setStateGroup(groupsData.data));
        dispatch(setStateType(typesData.data));
        dispatch(addType(allItems));
        dispatch(addGroup(allCoating));
        dispatch(setCurrentType({ currentType: allItems.id }));
        dispatch(setCurrentGroup({ currentGroup: allCoating.id }));
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [dispatch]);
  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <h2 className="m-2">{t("shop.categories")}</h2>
          <div
            className="d-flex justify-content-between"
            style={{ height: "100vh" }}
          >
            <ListGroup className="w-75" id="types">
              {types.map((type) => (
                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  active={type.id === currentType}
                  key={type.id}
                  className="mt-2"
                  onClick={() =>
                    dispatch(setCurrentType({ currentType: type.id }))
                  }
                >
                  <span id="typeName">{type.name}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="vr"></div>
          </div>
        </Col>
        <Col md={8}>
          <h2 className="m-2">{t("shop.coating")}</h2>
          <Col className="mt-3 d-flex flex-wrap">
            {groups.map((group) => (
              <Card
                className="p-3 me-2 mt-1"
                key={group.id}
                border={group.id === currentGroup ? "warning" : "light"}
                onClick={() =>
                  dispatch(setCurrentGroup({ currentGroup: group.id }))
                }
              >
                {group.name}
              </Card>
            ))}
          </Col>
          <Col className="d-flex flex-wrap mt-4">
            {devices.map((device) => (
              <Card
                style={{ width: "12rem" }}
                className="m-2 me-5 mb-4"
                key={device.id}
                onClick={() => {
                  dispatch(setCurrentItem(device));
                  navigate(routes.device(device.id));
                }}
              >
                <Card.Img src={routes.server() + device.img} />
                <Card.Body>
                  <Card.Title>{device.name}</Card.Title>
                  <Card.Text>
                    {device.price} {t("shop.rub")}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Card.Img
                    className="star"
                    width={"25px"}
                    src="images/icons/rating.png"
                  />
                  {device.rating}
                </Card.Footer>
              </Card>
            ))}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
