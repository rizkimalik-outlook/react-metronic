import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { ButtonCancel, ButtonSubmit } from 'views/components/button';
import { apiCategoryList, apiSubCategoryLv1, apiSubCategoryLv2Show, apiSubCategoryLv2Update } from 'app/services/apiCategory'

const CategorySubLv2Edit = () => {
    const history = useHistory();
    const { category_sublv2_id } = useParams();
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { category, category_sublv1 } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(apiCategoryList())
        async function getSubCategoryLv2Show() {
            try {
                const { payload } = await dispatch(apiSubCategoryLv2Show({ category_sublv2_id }))
                if (payload.status === 200) {
                    const {
                        category_id,
                        category_sublv1_id,
                        category_sublv2_id,
                        sub_name,
                        description
                    } = payload.data[0];
                    reset({
                        category_id,
                        category_sublv1_id,
                        category_sublv2_id,
                        sub_name,
                        description
                    });
                    dispatch(apiSubCategoryLv1({ category_id }))
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getSubCategoryLv2Show();
    }, [dispatch, reset, category_sublv2_id])


    const onSubmitUpdateCategoryLv2 = async (data) => {
        try {
            const { payload } = await dispatch(apiSubCategoryLv2Update(data))
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
                history.push('/categorysublv2')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category Case" modul_name="Category Case Create" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Form Add Category Case" subtitle="Form add new category case." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitUpdateCategoryLv2)} className="form">
                        <CardBody>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category:</label>
                                    <select className="form-control" {...register("category_id", { required: true })} onChange={(e) => dispatch(apiSubCategoryLv1({ category_id: e.target.value }))}>
                                        {/* <option value="">-- select category--</option> */}
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
                                    <select className="form-control" {...register("category_sublv1_id", { required: true })}>
                                        {/* <option value="">-- select category product--</option> */}
                                        {
                                            category_sublv1.map((item) => {
                                                return <option value={item.category_sublv1_id} key={item.category_sublv1_id}>{item.sub_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.category_sublv1_id && <span className="form-text text-danger">Select enter category</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category Case Name:</label>
                                    <input type="text" {...register("sub_name", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter category case name" />
                                    {errors.sub_name && <span className="form-text text-danger">Please enter category case name</span>}
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
                            <ButtonCancel to="/categorysublv2" />
                            <ButtonSubmit />
                        </CardFooter>
                    </form>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CategorySubLv2Edit