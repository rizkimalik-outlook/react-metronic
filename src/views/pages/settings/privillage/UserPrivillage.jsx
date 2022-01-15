import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle } from 'views/components/card';
import DataGrid, { Column, MasterDetail } from 'devextreme-react/data-grid';
import { apiMasterUserLevel } from 'app/services/apiMasterData';
import Menu from './Menu';

function UserPrivillage() {
    const dispatch = useDispatch();
    const { user_level } = useSelector(state => state.master)

    useEffect(() => {
        dispatch(apiMasterUserLevel())
    }, [dispatch]);

    return (
        <MainContent>
            <SubHeader active_page="User Privillage" menu_name="Management User" modul_name="User Privillage" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="User Privillage" subtitle="Menu access user." />
                    </CardHeader>
                    <CardBody>
                        <DataGrid
                            dataSource={user_level}
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
