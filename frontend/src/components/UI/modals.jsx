import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { FieldArray, Formik, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Button, Row } from "react-bootstrap";
import { closeModal } from "../../slices/modal";
import { $authHost, $host } from "../../http";
import routes from "../../routes";
import { addType, removeType } from "../../slices/types";
import { addGroup, removeGroup } from "../../slices/groups";
import { addItem, removeItem } from "../../slices/jewellery";

const getValidationSchema = (items, t) => (
  yup.object({
    name: yup
      .string()
      .trim()
      .notOneOf(items, t('admin.err.twiceItems'))
  })
);

const ModalAddCategory = ({ closeModal }) => {
	const inputRef = useRef(null);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.typesData.types);
	const categoriesName = categories.map((category) => category.name);
	const formik = useFormik({
		initialValues: {
			nameCategory: '',
		},
		validationSchema: getValidationSchema(categoriesName, t),
		onSubmit: async (values) => {
			const response = await $authHost.post(routes.axiosTypes(), { name: values.nameCategory });
			dispatch(addType(response.data));
			closeModal();
		} 
	})

	useEffect(() => {
		inputRef.current.focus();
	})
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{t('admin.addCategory')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Group>
						<Form.Control
							ref={inputRef}
							type="text"
							disabled={formik.isSubmitting}
							required
							onChange={formik.handleChange}
							name="nameCategory"
							id="nameCategory"
							value={formik.nameCategory}
							isInvalid={!!formik.errors.nameCategory}
						/>
						<label className="visually-hidden" htmlFor="nameCategory">{t('admin.nameCategory')}</label>
						<Form.Control.Feedback type="invalid">
              {formik.errors.nameCategory}
            </Form.Control.Feedback>
						<div className="d-flex justify-content-end mt-3">
              <Button
                variant=""
                type="button"
                onClick={closeModal}
                className="border"
              >
                {t('modal.close')}
              </Button>
              <Button
                variant=""
                type="submit"
                disabled={formik.isSubmitting}
								className="border ms-2"
              >
                {t('modal.add')}
              </Button>
            </div>
					</Form.Group>
				</Form>
			</Modal.Body>
		</>
	)
};

const ModalDeleteCategory = ({ closeModal }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const categories = useSelector((state) => state.typesData.types).filter((category) => typeof category.id === "number");
	const formik = useFormik({
		initialValues: {
			categoryId: ''
		},
		onSubmit: async (values) => {
			try {
				await $authHost.delete(routes.axiosTypes(), { data: { id: values.categoryId}});
				dispatch(removeType({typeId: Number(values.categoryId)}));
				closeModal();
			} catch (e) {
				alert(e)
			}
		}
	})
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{t('admin.deleteCategory')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formik.handleSubmit}> 
					<Form.Select id="categoryId" name="categoryId" value={formik.categoryId} onChange={formik.handleChange}>
						<option>{t("admin.slectCategory")}</option>
						{categories.map((category) => (
							<option value={category.id} key={category.id}>{category.name}</option>
						))}
					</Form.Select>
					<div className="d-flex justify-content-end mt-3">
            <Button
              variant=""
              type="button"
              onClick={closeModal}
              className="border"
            >
              {t('modal.close')}
            </Button>
            <Button
              variant=""
              type="submit"
              disabled={formik.isSubmitting}
							className="border ms-2"
            >
              {t('modal.delete')}
            </Button>
					</div>
				</Form>
			</Modal.Body>
		</>
	)
}

const ModalAddCoat = ({ closeModal }) => {
	const inputRef = useRef(null);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const coats = useSelector((state) => state.groupsData.groups);
	const coatsName = coats.map((coat) => coat.name);
	const formik = useFormik({
		initialValues: {
			nameCoat: '',
		},
		validationSchema: getValidationSchema(coatsName, t),
		onSubmit: async (values) => {
			const response = await $authHost.post(routes.axiosGroups(), { name: values.nameCoat });
			dispatch(addGroup(response.data));
			closeModal();
		} 
	})

	useEffect(() => {
		inputRef.current.focus();
	})
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{t('admin.addCoat')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Group>
						<Form.Control
							ref={inputRef}
							type="text"
							disabled={formik.isSubmitting}
							required
							onChange={formik.handleChange}
							name="nameCoat"
							id="nameCoat"
							value={formik.nameCategory}
							isInvalid={!!formik.errors.nameCategory}
						/>
						<label className="visually-hidden" htmlFor="nameCoat">{t('admin.nameCoat')}</label>
						<Form.Control.Feedback type="invalid">
              {formik.errors.nameCoat}
            </Form.Control.Feedback>
						<div className="d-flex justify-content-end mt-3">
              <Button
                variant=""
                type="button"
                onClick={closeModal}
                className="border"
              >
                {t('modal.close')}
              </Button>
              <Button
                variant=""
                type="submit"
                disabled={formik.isSubmitting}
								className="border ms-2"
              >
                {t('modal.add')}
              </Button>
            </div>
					</Form.Group>
				</Form>
			</Modal.Body>
		</>
	)
};

const ModalDeleteCoat = ({ closeModal }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const groups = useSelector((state) => state.groupsData.groups).filter((group)=> typeof group.id === "number");
	const formik = useFormik({
		initialValues: {
			groupId: ''
		},
		onSubmit: async (values) => {
			try {
				await $authHost.delete(routes.axiosGroups(), { data: { id: values.groupId}});
				dispatch(removeGroup({groupId: Number(values.groupId)}));
				closeModal();
			} catch (e) {
				alert(e);
			}
		}
	})
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{t('admin.deleteCoat')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formik.handleSubmit}> 
				<Form.Group>
					<Form.Select id="groupId" name="groupId" value={formik.groupId} onChange={formik.handleChange}>
						<option>{t('admin.selectCoat')}</option>
						{groups.map((group) => (
							<option value={group.id} key={group.id}>{group.name}</option>
						))}
					</Form.Select>
				</Form.Group>
					<div className="d-flex justify-content-end mt-3">
            <Button
              variant=""
              type="button"
              onClick={closeModal}
              className="border"
            >
              {t('modal.close')}
            </Button>
            <Button
              variant=""
              type="submit"
              disabled={formik.isSubmitting}
							className="border ms-2"
            >
              {t('modal.delete')}
            </Button>
					</div>
				</Form>
			</Modal.Body>
		</>
	)
};

const ModalAddJewellery = ({ closeModal }) => {
	const { t } = useTranslation();
	const [isFullForm, setIsFullForm] = useState(true);
	const dispatch = useDispatch();
	const groups = useSelector((state) => state.groupsData.groups).filter((group)=> typeof group.id === "number");
	const names = useSelector((state) => state.jewelleryData.items.map((item) => item.name));
	const categories = useSelector((state) => state.typesData.types).filter((category) => typeof category.id === "number");
	const inputRef = useRef(null);
	const validationSchema = yup.object({
		name: yup.string().trim().max(10, t('admin.err.max')).notOneOf(names, t('admin.err.twiceItems')),
		price: yup.number().typeError(t('admin.err.number')),
	})
	const submit = async (values) => {
		try {
			const res = await $authHost.post(routes.axiosJewellery(), {name: values.name, price: values.price, brandId: values.groupId, typeId: values.categoryId, info: JSON.stringify(values.info), img: values.img}, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			setIsFullForm(true);
			dispatch(addItem(res.data));
			closeModal();
			console.log(res)
		} catch(e) {
			setIsFullForm(false);
			console.log(e);
		}
	}
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{t('admin.addJewellery')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik initialValues = {{
					name: '',
					price: '',
					groupId: '',
					categoryId: '',
					info: [],
					img: null,
					}}
					onSubmit={(values) => submit(values)} validationSchema={validationSchema}
				>
				{(formik) => (
					<Form onSubmit={formik.handleSubmit}>
					<Form.Group className="mb-4 position-relative form-floating">
						<Form.Control
							ref={inputRef}
							type="text"
							id="name"
							name="name"
							required
							disabled={formik.isSubmitting}
							onChange={formik.handleChange}
							value={formik.name}
							placeholder={t("modal.name")}
							autoComplete="name"
							isInvalid={!!formik.errors.name}
						/>
					<label className="form-label" htmlFor="name">{t('modal.name')}</label>
					<Form.Control.Feedback tooltip type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-4 position-relative form-floating">
						<Form.Control
							type="text"
							id="price"
							name="price"
							required
							disabled={formik.isSubmitting}
							onChange={formik.handleChange}
							value={formik.price}
							placeholder={t("modal.price")}
							autoComplete="price"
							isInvalid={!!formik.errors.price}
						/>
					<label className="form-label" htmlFor="price">{t('modal.price')}</label>
					<Form.Control.Feedback tooltip type="invalid">
          {formik.errors.price}
        </Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-4">
						<Form.Select disabled={formik.isSubmitting} id="groupId" name="groupId" value={formik.groupId} onChange={formik.handleChange}>
							<option>{t('admin.selectCoat')}</option>
							{groups.map((group) => (
								<option value={group.id} key={group.id}>{group.name}</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-4">
						<Form.Select
							disabled={formik.isSubmitting}
							name="categoryId"
							value={formik.categoryId}
							onChange={formik.handleChange}
						>
							<option>{t("admin.slectCategory")}</option>
							{categories.map((category) => (
								<option value={category.id} key={category.id}>{category.name}</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Control
						disabled={formik.isSubmitting}
						id="img"
						name="img"
						type="file"
						onChange={(event) => {formik.setFieldValue("img", event.target.files[0])}}
						/>
					</Form.Group>
					<Form.Group>
							<FieldArray
								name="info"
								id="info"
							>
								{(fieldArrayProps) => (
									<>
										<Button variant="" className="border my-3" onClick={() => fieldArrayProps.push({title: '', description: '', id: Date.now()})}>{t('modal.addInfo')}</Button>
										{formik.values.info.length > 0 ?
										formik.values.info.map((value, index) => (
											<Row className="px-3 justify-content-around flex-nowrap" key={index}>
												<Form.Control
													id="info"
													type="text"
													name={`info[${index}].title`}
													value={formik.info}
													onChange={formik.handleChange}
													className="m-2"
													placeholder={t('modal.title')}
												/>
												<Form.Control
													id="info"
													type="text"
													name={`info[${index}].description`}
													value={formik.info}
													onChange={formik.handleChange}
													className="m-2"
													placeholder={t('modal.description')}
												/>
												<Button
													variant=""
													id="info"
													className="m-2 border"
													onClick={() => fieldArrayProps.remove()}
												>
													{t('modal.delete')}
												</Button>
											</Row>
										))
										:
										<></>
										}
									</>
								)}
							</FieldArray>
					</Form.Group>
					{!isFullForm ?
						<h6 className="text-danger text-center">{t('admin.err.fullForm')}</h6>
					:
						<></>
					}
					<div className="d-flex justify-content-end mt-3">
            <Button
              variant=""
              type="button"
              onClick={closeModal}
              className="border"
            >
              {t('modal.close')}
            </Button>
            <Button
              variant=""
              type="submit"
              disabled={formik.isSubmitting}
							className="border ms-2"
            >
              {t('modal.add')}
            </Button>
					</div>
				</Form>
				)}
				</Formik>
			</Modal.Body>
		</>

	)
};

const ModalDeleteJewellery = ({ closeModal }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const items = useSelector((state) => state.jewelleryData.items);
	console.log(items);
	const formik = useFormik({
		initialValues: {
			id: ''
		},
		onSubmit: async (values) => {
			try {
				await $authHost.delete(routes.axiosJewellery(), {headers: {
					id: values.id
				}});
				dispatch(removeItem({itemId: Number(values.id)}));
				closeModal();
			} catch(e) {
				alert(e);
			}
		}
	})

	return (
		<>
		<Modal.Header closeButton>
			<Modal.Title>{t('admin.deleteJewellery')}</Modal.Title>
		</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Group className="mb-4">
						<Form.Select
							disabled={formik.isSubmitting}
							name="id" value={formik.id}
							onChange={formik.handleChange}
						>
							<option>{t('admin.selectName')}</option>
							{items.map((item) => (
								<option value={item.id} key={item.id}>{item.name}</option>
							))}
						</Form.Select>
					</Form.Group>
					<div className="d-flex justify-content-end mt-3">
            <Button
              variant=""
              type="button"
              onClick={closeModal}
              className="border"
            >
              {t('modal.close')}
            </Button>
            <Button
              variant=""
              type="submit"
              disabled={formik.isSubmitting}
							className="border ms-2"
            >
              {t('modal.delete')}
            </Button>
					</div>
				</Form>
			</Modal.Body>
			</>
	)
};


const ModalEvaluate = ({ closeModal }) => {
	const evaluateArray = [1, 2, 3, 4, 5];
	const currentDevice = useSelector((state) => state.jewelleryData.currentDevice)
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: {
			evaluate: '',
		},
		onSubmit: async (value) => {
			try {
				const res = await $host.put(routes.axiosJewellery(), { rating: value.evaluate, id: currentDevice.id});
				console.log(res)
			} catch (e) {
				alert(e);
			}
		}
	})
	return (
		<>
			<Modal.Header>
				<Modal.Title>{t('device.evaluate')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Group className="mb-4">
						<Form.Select
							disabled={formik.isSubmitting}
							name="evaluate"
							value={formik.evaluate}
							onChange={formik.handleChange}
						>
							<option>{t("device.selectEvaluate")}</option>
							{evaluateArray.map((evaluate) => (
								<option value={evaluate} key={evaluate}>{evaluate}</option>
							))}
						</Form.Select>
					</Form.Group>
					<div className="d-flex justify-content-end mt-3">
            <Button
              variant=""
              type="button"
              onClick={closeModal}
              className="border"
            >
              {t('modal.close')}
            </Button>
            <Button
              variant=""
              type="submit"
              disabled={formik.isSubmitting}
							className="border ms-2"
            >
              {t('device.evaluate')}
            </Button>
					</div>
				</Form>
			</Modal.Body>
		</>
	)
}


const MyModal = () => {
	const mapping = {
		addCategory: ModalAddCategory,
		addCoat: ModalAddCoat,
		addJewellery: ModalAddJewellery,
		deleteCategory: ModalDeleteCategory,
		deleteCoat: ModalDeleteCoat,
		deleteJewellery: ModalDeleteJewellery,
		evaluate: ModalEvaluate,
	}

	const dispatch = useDispatch();

	const closeWindow = () => {
		dispatch(closeModal());
	};
	
	const isOpened = useSelector((state) => state.modalData.isOpen);
  const type = useSelector((state) => state.modalData.typeOfModal);

	const SelectModal = mapping[type];

	return (
		<Modal show={isOpened} onHide={closeWindow} centered>
		{ SelectModal ? <SelectModal closeModal={closeWindow} /> : null }
		</Modal>
	)
}

export default MyModal;