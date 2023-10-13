import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../slices/modal";

const Admin = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	return (
		<>
			<Container>
				<Row>
					<Col md="6">
						<Row className="m-2">
							<Button className="border" onClick={() => dispatch(openModal({typeOfModal: 'addCategory'}))} variant="">{t('admin.addCategory')}</Button>
						</Row>
						<Row className="m-2">
							<Button className="border" onClick={() => dispatch(openModal({typeOfModal: 'addCoat'}))} variant="">{t('admin.addCoat')}</Button>
						</Row>
						<Row className="m-2">
							<Button className="border" onClick={() => dispatch(openModal({typeOfModal: 'addJewellery'}))}  variant="">{t('admin.addJewellery')}</Button>
						</Row>
					</Col>
					<Col md="6">
						<Row className="m-2">
							<Button className="border" onClick={() => dispatch(openModal({typeOfModal: 'deleteCategory'}))} variant="">{t('admin.deleteCategory')}</Button>
						</Row>
						<Row className="m-2">
							<Button className="border" onClick={() => dispatch(openModal({typeOfModal: 'deleteCoat'}))} variant="">{t('admin.deleteCoat')}</Button>
						</Row>
						<Row className="m-2">
							<Button className="border" onClick={() => dispatch(openModal({typeOfModal: 'deleteJewellery'}))}  variant="">{t('admin.deleteJewellery')}</Button>
						</Row>
					</Col>
				</Row>
			</Container>
		</>

	)
};

export default Admin;
