import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonRefresh } from 'views/components/button';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid';
import { apiSubCategoryLv1, apiSubCategoryLv1Delete } from 'app/services/apiCategory';

function CategorySubLv1() {
    const dispatch = useDispatch();
    const { category_sublv1 } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(apiSubCategoryLv1({ category_id: 'all' }))
    }, [dispatch]);

    async function deleteHandler(category_sublv1_id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async function (res) {
            if (res.value) {
                const { payload } = await dispatch(apiSubCategoryLv1Delete({ category_sublv1_id }));
                if (payload.status === 200) {
                    Swal.fire({
                        title: "Success Delete.",
                        text: `${category_sublv1_id} deleted from database!`,
                        buttonsStyling: false,
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                    dispatch(apiSubCategoryLv1({ category_id: 'all' }))
                }
            }
        });
    }


    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category Product" modul_name="">
                <ButtonCreate to="/categorysublv1/create" />
            </SubHeader>
            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardTitle title="Category Product" subtitle="Type category product." />
                        <CardToolbar>
                            <ButtonRefresh onClick={(e) => dispatch(apiSubCategoryLv1({ category_id: 'all' }))} />
                        </CardToolbar>
                    </CardHeader>
                    <CardBody>
                        <DataGrid
                            dataSource={category_sublv1}
                            keyExpr="category_sublv1_id"
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
                            <Column caption="Actions" dataField="category_sublv1_id" width={100} cellRender={(data) => {
                                return (
                                    <div className="d-flex align-items-end justify-content-center">
                                        <ButtonEdit to={`categorysublv1/${data.value}/edit`} />
                                        <ButtonDelete onClick={(e) => deleteHandler(data.value)} />
                                    </div>
                                )
                            }} />
                            <Column caption="Category" dataField="category_name" />
                            <Column caption="Category Product" dataField="sub_name" />
                        </DataGrid>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CategorySubLv1
