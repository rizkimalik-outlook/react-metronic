import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import Swal from 'sweetalert2';

import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonRefresh } from 'views/components/button';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid';
import { apiSubCategoryLv1 } from 'app/services/apiCategory';

function CategorySubLv1() {
    const dispatch = useDispatch();
    const { category_sublv1 } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(apiSubCategoryLv1({ category_id: 'all' }))
    }, [dispatch]);

    // async function deleteUserHandler(id) {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You wont be able to delete this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, delete it!"
    //     }).then(async function (res) {
    //         if (res.value) {
    //             const res = await deleteUser(id)
    //             const data = res.data.data;
    //             refetch();

    //             Swal.fire(
    //                 data.message,
    //                 "Your data has been deleted.",
    //                 "success"
    //             )
    //         }
    //     });
    // }


    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category Product" modul_name="">
                <ButtonCreate to="/user/create" />
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
                                        <ButtonEdit to={`user/${data.value}/edit`} />
                                        <ButtonDelete onClick={(e) => alert(data.value)} />
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
