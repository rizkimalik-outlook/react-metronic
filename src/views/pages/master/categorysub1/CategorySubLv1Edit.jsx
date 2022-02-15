import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { ButtonCancel, ButtonSubmit } from 'views/components/button';
import { apiCategoryList, apiSubCategoryLv1Show, apiSubCategoryLv1Update } from 'app/services/apiCategory'

const CategorySubLv1Edit = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { category_sublv1_id } = useParams();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { category } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(apiCategoryList())
        async function getSubCategoryLv1Show() {
            try {
                const { payload } = await dispatch(apiSubCategoryLv1Show({ category_sublv1_id }))
                if (payload.status === 200) {
                    const {
                        category_id,
                        category_sublv1_id,
                        sub_name,
                        description
                    } = payload.data[0];
                    reset({
                        category_id,
                        category_sublv1_id,
                        sub_name,
                        description
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getSubCategoryLv1Show();
    }, [category_sublv1_id, reset, dispatch]);


    const onSubmitEditCategoryProduct = async (data) => {
        try {
            const { payload } = await dispatch(apiSubCategoryLv1Update(data))
            if (payload.status === 200) {
                Swal.fire({
                    title: "Update Success.",
                    text: "Success update data customer!",
                    buttonsStyling: false,
                    icon: "success",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                    timer: 1500
                });
                history.push('/categorysublv1')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category Product" modul_name="Category Product Edit" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Form Update Category Product" subtitle="Form update category product." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitEditCategoryProduct)} className="form">
                        <CardBody>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category: </label>
                                    <select className="form-control" {...register("category_id", { required: true })}>
                                        <option value="">-- select category--</option>
                                        {
                                            category.map((item) => {
                                                return <option value={item.category_id} key={item.category_id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.category_id && <span className="form-text text-danger">Select enter gender</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category Product Name:</label>
                                    <input type="text" {...register("sub_name", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter category product name" />
                                    {errors.name && <span className="form-text text-danger">Please enter category product name</span>}
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
                            <ButtonCancel to="/categorysublv1" />
                            <ButtonSubmit />
                        </CardFooter>
                    </form>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CategorySubLv1Edit