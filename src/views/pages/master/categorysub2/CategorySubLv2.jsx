import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonRefresh } from 'views/components/button';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid';
import { apiSubCategoryLv2, apiSubCategoryLv2Delete } from 'app/services/apiCategory';

const CategorySubLv2 = () => {
    const dispatch = useDispatch();
    const { category_sublv2 } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(apiSubCategoryLv2({ category_sublv1_id: 'all' }))
    }, [dispatch]);

    async function deleteHandler(category_sublv2_id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async function (res) {
            if (res.value) {
                const { payload } = await dispatch(apiSubCategoryLv2Delete({ category_sublv2_id }));
                if (payload.status === 200) {
                    Swal.fire({
                        title: "Success Delete.",
                        text: `${category_sublv2_id} deleted from database!`,
                        buttonsStyling: false,
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                    dispatch(apiSubCategoryLv2({ category_sublv1_id: 'all' }))
                }
            }
        });
    }

    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category Case" modul_name="">
                <ButtonCreate to="/categorysublv2/create" />
            </SubHeader>
            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardTitle title="Category Case" subtitle="Type category case." />
                        <CardToolbar>
                            <ButtonRefresh onClick={(e) => dispatch(apiSubCategoryLv2({ category_sublv1_id: 'all' }))} />
                        </CardToolbar>
                    </CardHeader>
                    <CardBody>
                        <DataGrid
                            dataSource={category_sublv2}
                            keyExpr="category_sublv2_id"
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
                            <Column caption="Actions" dataField="category_sublv2_id" width={100} cellRender={(data) => {
                                return (
                                    <div className="d-flex align-items-end justify-content-center">
                                        <ButtonEdit to={`categorysublv2/${data.value}/edit`} />
                                        <ButtonDelete onClick={(e) => deleteHandler(data.value)} />
                                    </div>
                                )
                            }} />
                            <Column caption="Category" dataField="category_name" />
                            <Column caption="Category Product" dataField="category_sublv1_name" />
                            <Column caption="Category Case" dataField="sub_name" />
                            <Column caption="Description" dataField="description" />
                        </DataGrid>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CategorySubLv2