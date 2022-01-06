import React from 'react';
import SplashScreen from 'views/components/SplashScreen';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle } from 'views/components/card';
import DataGrid, { Column, MasterDetail } from 'devextreme-react/data-grid';
import { useGetUserLevelQuery } from 'app/services/apiUserLevel';
import Menu from './Menu';

function UserPrivillage() {
    const { data, isFetching } = useGetUserLevelQuery();
   
    return (
        <MainContent>
            <SubHeader active_page="User Privillage" menu_name="Management User" modul_name="User Privillage" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="User Privillage" subtitle="Menu access user." />
                    </CardHeader>
                    <CardBody>
                        {isFetching && <SplashScreen />}
                        <DataGrid
                            dataSource={data?.data}
                            keyExpr="id"
                            allowColumnReordering={true}
                            allowColumnResizing={true}
                            columnAutoWidth={true}
                            showBorders={true}
                            showColumnLines={true}
                            showRowLines={true}
                        >
                            <MasterDetail
                                enabled={true}
                                component={Menu}
                            />
                            <Column dataField="level_name" caption="Level User" />
                            <Column dataField="description" />
                        </DataGrid>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default UserPrivillage;
