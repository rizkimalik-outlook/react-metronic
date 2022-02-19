import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'views/components/card';
import { ButtonCancel, ButtonSubmit } from 'views/components/button';
import { apiCategoryList, apiSubCategoryLv1, apiSubCategoryLv2, apiSubCategoryLv3Show, apiSubCategoryLv3Update } from 'app/services/apiCategory'
import { apiOrganizationList } from 'app/services/apiOrganization';

const CategorySubLv3Edit = () => {
    const history = useHistory();
    const { category_sublv3_id } = useParams();
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { category, category_sublv1, category_sublv2 } = useSelector(state => state.category);
    const { organizations } = useSelector(state => state.master)

    useEffect(() => {
        dispatch(apiCategoryList())
        dispatch(apiOrganizationList())
        async function getSubCategoryLv3Show() {
            try {
                const { payload } = await dispatch(apiSubCategoryLv3Show({ category_sublv3_id }))
                if (payload.status === 200) {
                    const {
                        category_id,
                        category_sublv1_id,
                        category_sublv2_id,
                        category_sublv3_id,
                        sub_name,
                        sla,
                        org_id,
                        description
                    } = payload.data[0];
                    reset({
                        category_id,
                        category_sublv1_id,
                        category_sublv2_id,
                        category_sublv3_id,
                        sub_name,
                        sla,
                        org_id,
                        description
                    });
                    dispatch(apiSubCategoryLv1({ category_id }))
                    dispatch(apiSubCategoryLv2({ category_sublv1_id }))
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getSubCategoryLv3Show();
    }, [dispatch, reset, category_sublv3_id])


    const onSubmitUpdateCategoryLv3 = async (data) => {
        try {
            const { payload } = await dispatch(apiSubCategoryLv3Update(data))
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
            <SubHeader active_page="Master Data" menu_name="Category Detail" modul_name="Category Detail Edit" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="Form Update Category Detail" subtitle="Form update data category detail." />
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmitUpdateCategoryLv3)} className="form">
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
                                    <select className="form-control" {...register("category_sublv1_id", { required: true })} onChange={(e) => dispatch(apiSubCategoryLv2({ category_sublv1_id: e.target.value }))}>
                                        {/* <option value="">-- select category product--</option> */}
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
                                        {/* <option value="">-- select category case--</option> */}
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
                                    <label>Organization:</label>
                                    <select className="form-control" {...register("org_id", { required: true })}>
                                        {/* <option value="">-- User Organization --</option> */}
                                        {
                                            organizations.map((item) => {
                                                return <option value={item.id} key={item.id}>{item.organization_name}</option>
                                            })
                                        }
                                    </select>
                                    {errors.org_id && <span className="form-text text-danger">Please select Organization</span>}
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

export default CategorySubLv3Edit