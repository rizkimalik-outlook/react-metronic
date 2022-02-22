import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { ButtonCancel, ButtonSubmit } from 'views/components/button';
import { apiCategoryList, apiSubCategoryLv1, apiSubCategoryLv2, apiSubCategoryLv3Store } from 'app/services/apiCategory'
import { apiDepartment } from 'app/services/apiMasterData';

const CategorySubLv3Create = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { category, category_sublv1, category_sublv2 } = useSelector(state => state.category);
    const { departments } = useSelector(state => state.master)


    useEffect(() => {
        dispatch(apiCategoryList())
        dispatch(apiDepartment())
    }, [dispatch])


    const onSubmitCreateCategoryLv3 = async (data) => {
        try {
            const { payload } = await dispatch(apiSubCategoryLv3Store(data))
            if (payload.status === 200) {
                Swal.fire({
                    title: "Insert Success.",
                    text: "Success into application!",
                    buttonsStyling: false,
                    icon: "success",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                    timer: 1500
                });
                history.push('/categorysublv3')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category Detail" modul_name="Category Detail Create" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Form Add Category Detail" subtitle="Form add new category detail." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitCreateCategoryLv3)} className="form">
                        <CardBody>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category:</label>
                                    <select className="form-control" {...register("category_id", { required: true })} onChange={(e) => dispatch(apiSubCategoryLv1({ category_id: e.target.value }))}>
                                        <option value="">-- select category--</option>
                                        {
                                            category.map((item) => {
                                                return <option value={item.category_id} key={item.category_id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.category_id && <span className="form-text text-danger">Select enter category</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category Product:</label>
                                    <select className="form-control" {...register("category_sublv1_id", { required: true })} onChange={(e) => dispatch(apiSubCategoryLv2({ category_sublv1_id: e.target.value }))}>
                                        <option value="">-- select category product--</option>
                                        {
                                            category_sublv1.map((item) => {
                                                return <option value={item.category_sublv1_id} key={item.category_sublv1_id}>{item.sub_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.category_sublv1_id && <span className="form-text text-danger">Select enter category product</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category Case:</label>
                                    <select className="form-control" {...register("category_sublv2_id", { required: true })}>
                                        <option value="">-- select category case--</option>
                                        {
                                            category_sublv2.map((item) => {
                                                return <option value={item.category_sublv2_id} key={item.category_sublv2_id}>{item.sub_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.category_sublv2_id && <span className="form-text text-danger">Select enter category case</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category Detail Name:</label>
                                    <input type="text" {...register("sub_name", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter category detail name" />
                                    {errors.sub_name && <span className="form-text text-danger">Please enter category detail name</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>SLA (Days):</label>
                                    <input type="number" {...register("sla", { required: true, pattern: /^[0-9]+$/i })} className="form-control" placeholder="Enter sla days" />
                                    {errors.sla && <span className="form-text text-danger">Please enter sla.</span>}
                                </div>
                                <div className="col-lg-6">
                                    <label>Department:</label>
                                    <select className="form-control" {...register("department_id", { required: true })}>
                                        <option value="">-- Select Department --</option>
                                        {
                                            departments.map((item) => {
                                                return <option value={item.id} key={item.id}>{item.department_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.department_id && <span className="form-text text-danger">Please select Department</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Description:</label>
                                    <textarea {...register("description")} className="form-control" cols="30" rows="3"></textarea>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <ButtonCancel to="/categorysublv3" />
                            <ButtonSubmit />
                        </CardFooter>
                    </form>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CategorySubLv3Create