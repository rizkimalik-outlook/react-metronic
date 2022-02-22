import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonRefresh } from 'views/components/button';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid';
import { apiSubCategoryLv3, apiSubCategoryLv3Delete } from 'app/services/apiCategory';

const CategorySubLv3 = () => {
    const dispatch = useDispatch();
    const { category_sublv3 } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(apiSubCategoryLv3({ category_sublv2_id: 'all' }))
    }, [dispatch]);

    async function deleteHandler(category_sublv3_id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async function (res) {
            if (res.value) {
                const { payload } = await dispatch(apiSubCategoryLv3Delete({ category_sublv3_id }));
                if (payload.status === 200) {
                    Swal.fire({
                        title: "Success Delete.",
                        text: `${category_sublv3_id} deleted from database!`,
                        buttonsStyling: false,
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                    dispatch(apiSubCategoryLv3({ category_sublv2_id: 'all' }))
                }
            }
        });
    }

    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category Detail" modul_name="">
                <ButtonCreate to="/categorysublv3/create" />
            </SubHeader>
            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardTitle title="Category Detail" subtitle="Type category detail." />
                        <CardToolbar>
                            <ButtonRefresh onClick={(e) => dispatch(apiSubCategoryLv3({ category_sublv2_id: 'all' }))} />
                        </CardToolbar>
                    </CardHeader>
                    <CardBody>
                        <DataGrid
                            dataSource={category_sublv3}
                            keyExpr="category_sublv3_id"
                            allowColumnReordering={true}
                            allowColumnResizing={true}
                            columnAutoWidth={true}
                            showBorders={true}
                            showColumnLines={true}
                            showRowLines={true}
                        >
                            <HeaderFilter visible={true} />
                            <FilterRow visible={true} />
                            <Paging defaultPageSize={10} />
                            <Pager
                                visible={true}
                                allowedPageSizes={[10, 20, 50, 'all']}
                                displayMode='full'
                                showPageSizeSelector={true}
                                showInfo={true}
                                showNavigationButtons={true} />
                            <Column caption="Actions" dataField="category_sublv3_id" width={100} cellRender={(data) => {
                                return (
                                    <div className="d-flex align-items-end justify-content-center">
                                        <ButtonEdit to={`categorysublv3/${data.value}/edit`} />
                                        <ButtonDelete onClick={(e) => deleteHandler(data.value)} />
                                    </div>
                                )
                            }} />
                            <Column caption="Category" dataField="category_name" />
                            <Column caption="Category Product" dataField="category_sublv1_name" />
                            <Column caption="Category Case" dataField="category_sublv2_name" />
                            <Column caption="Category Detail" dataField="sub_name" />
                            <Column caption="SLA (Days)" dataField="sla" />
                            <Column caption="Department" dataField="department_name" />
                            <Column caption="Description" dataField="description" />
                        </DataGrid>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CategorySubLv3