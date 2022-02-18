import React from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { ButtonCancel, ButtonSubmit } from 'views/components/button';
import { apiCategoryStore } from 'app/services/apiCategory'

const CategoryCreate = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmitCreateCategory = async (data) => {
        try {
            const { payload } = await dispatch(apiCategoryStore(data))
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
                history.push('/category')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category" modul_name="Category Create" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Form Add Category" subtitle="Form add new category." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitCreateCategory)} className="form">
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

export default CategoryCreate