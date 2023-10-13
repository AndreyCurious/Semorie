import React, { useEffect, useState } from "react";
import { Col, Row, Image, Card, Container, ListGroup, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import routes from "../routes";
import { $host } from "../http";
import { openModal } from "../slices/modal";

const Device = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [info, setInfo] = useState([]);
	const device = useSelector((state) => state.jewelleryData.currentDevice);
	useEffect(() => {
		const getInfo = async () => {
			try {
				const res = await $host.get(routes.axiosGetDevice(device.id));
				setInfo(res.data.info);
			} catch(e) {
				alert(e);
			}
		}
		getInfo();
	}, [device])
	return (
		<>
			<Row className="d-flex mt-3">
				<NavLink to={routes.shop()}>
        	<Image
          	alt="logo"
          	src='/images/icons/back.png'
          	width="20"
          	height="20"
          	className="ms-3"
					/>
					{' '}
        	<span>{t('device.shop')}</span>
      	</NavLink>
			</Row>
		<Container>
			<Row>
				<Col className="m-4 h-100">
				<Card className="d-flex flex-row h-100" style={{cursor: "default"}}>
					<Image
						src={routes.server() + device.img}
						width={'30%'}
					/>
					<div className="d-flex flex-column w-100">
					<Card.Body>
						<Card.Title
							className="ms-3 mt-2"
						>
							{`${t("device.model")}: ${device.name}`}
						</Card.Title>
					
						<ListGroup className="ps-2 mt-4" >
							{info.map((item) => (
								<ListGroup.Item
									key={item.id}
									variant={item.id % 2 === 0 ? "secondary" : null}
								>
							<span>{`${item.title}: ${item.description}`}</span>
						</ListGroup.Item>
							))}
						</ListGroup>
					</Card.Body>	
					<Card.Footer className="d-flex justify-content-between m-0 align-items-center">
						<span className="me-3">{t('device.rating')}</span>
						<div className="d-flex align-items-center">
							<span className="me-2">{device.rating}</span>
							<Card.Img
								className="deviceStar"
								width='25px'
								src='/images/icons/rating.png'
							/>
						</div>
						<Button className="border" onClick={() => dispatch(openModal({typeOfModal: "evaluate"}))} variant="btn-sm">{t('device.evaluate')}</Button>
					</Card.Footer>
					</div>
				</Card>
				</Col>
			</Row>
		</Container>	
		</>

	)
}

export default Device;
