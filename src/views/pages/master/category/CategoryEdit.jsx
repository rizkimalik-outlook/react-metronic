import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { ButtonCancel, ButtonSubmit } from 'views/components/button';
import { apiCategoryShow, apiCategoryUpdate } from 'app/services/apiCategory'

const CategoryEdit = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { category_id } = useParams();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        async function getSubCategoryLv1Show() {
            try {
                const { payload } = await dispatch(apiCategoryShow({ category_id }))
                if (payload.status === 200) {
                    const {
                        category_id,
                        name,
                        description
                    } = payload.data[0];
                    reset({
                        category_id,
                        name,
                        description
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getSubCategoryLv1Show();
    }, [category_id, dispatch, reset]);


    const onSubmitEditCategory = async (data) => {
        try {
            const { payload } = await dispatch(apiCategoryUpdate(data))
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
                history.push('/category')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category" modul_name="Category Edit" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Form Update Category" subtitle="Form update category." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitEditCategory)} className="form">
                        <CardBody>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>Category Name:</label>
                                    <input type="text" {...register("name", { required: true, maxLength: 100 })} className="form-control" placeholder="Enter category name" />
                                    {errors.name && <span className="form-text text-danger">Please enter category name</span>}
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
                            <ButtonCancel to="/category" />
                            <ButtonSubmit />
                        </CardFooter>
                    </form>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CategoryEdit