import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonRefresh } from 'views/components/button';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle, CardToolbar } from 'views/components/card';
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging } from 'devextreme-react/data-grid';
import { apiCategoryList } from 'app/services/apiCategory';

function CategoryList() {
    const dispatch = useDispatch();
    const { category } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(apiCategoryList())
    }, [dispatch]);

    return (
        <MainContent>
            <SubHeader active_page="Master Data" menu_name="Category" modul_name="">
                <ButtonCreate to="/user/create" />
            </SubHeader>
            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardTitle title="Category" subtitle="main category." />
                        <CardToolbar>
                            <ButtonRefresh onClick={(e) => dispatch(apiCategoryList())} />
                        </CardToolbar>
                    </CardHeader>
                    <CardBody>
                        <DataGrid
                            dataSource={category}
                            keyExpr="category_id"
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
                            <Column caption="Actions" dataField="category_id" width={100} cellRender={(data) => {
                                return (
                                    <div className="d-flex align-items-end justify-content-center">
                                        <ButtonEdit to={`user/${data.value}/edit`} />
                                        <ButtonDelete onClick={(e) => alert(data.value)} />
                                    </div>
                                )
                            }} />
                            {/* <Column caption="CategoryID" dataField="category_id" /> */}
                            <Column caption="Category Name" dataField="name" />
                        </DataGrid>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default CategoryList
