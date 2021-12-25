import React from 'react';
import { useParams } from 'react-router-dom';
import { SubHeader, MainContent, Container } from 'views/layouts/partials';
import { Card, CardBody, CardHeader, CardTitle } from 'views/components/card';
import { TreeList, Selection, Column } from 'devextreme-react/tree-list';

export const employees = [{
    ID: 1,
    Head_ID: 0,
    Full_Name: 'John Heart',
    Prefix: 'Mr.',
    Title: 'CEO',
    City: 'Los Angeles',
    State: 'California',
    Email: 'jheart@dx-email.com',
    Skype: 'jheart_DX_skype',
    Mobile_Phone: '(213) 555-9392',
    Birth_Date: '1964-03-16',
    Hire_Date: '1995-01-15',
}, {
    ID: 2,
    Head_ID: 1,
    Full_Name: 'Samantha Bright',
    Prefix: 'Dr.',
    Title: 'COO',
    City: 'Los Angeles',
    State: 'California',
    Email: 'samanthab@dx-email.com',
    Skype: 'samanthab_DX_skype',
    Mobile_Phone: '(213) 555-2858',
    Birth_Date: '1966-05-02',
    Hire_Date: '2004-05-24',
}, {
    ID: 3,
    Head_ID: 1,
    Full_Name: 'Arthur Miller',
    Prefix: 'Mr.',
    Title: 'CTO',
    City: 'Denver',
    State: 'Colorado',
    Email: 'arthurm@dx-email.com',
    Skype: 'arthurm_DX_skype',
    Mobile_Phone: '(310) 555-8583',
    Birth_Date: '1972-07-11',
    Hire_Date: '2007-12-18',
}, {
    ID: 4,
    Head_ID: 1,
    Full_Name: 'Robert Reagan',
    Prefix: 'Mr.',
    Title: 'CMO',
    City: 'Bentonville',
    State: 'Arkansas',
    Email: 'robertr@dx-email.com',
    Skype: 'robertr_DX_skype',
    Mobile_Phone: '(818) 555-2387',
    Birth_Date: '1974-09-07',
    Hire_Date: '2002-11-08',
}, {
    ID: 5,
    Head_ID: 1,
    Full_Name: 'Greta Sims',
    Prefix: 'Ms.',
    Title: 'HR Manager',
    City: 'Atlanta',
    State: 'Georgia',
    Email: 'gretas@dx-email.com',
    Skype: 'gretas_DX_skype',
    Mobile_Phone: '(818) 555-6546',
    Birth_Date: '1977-11-22',
    Hire_Date: '1998-04-23',
}
];

function UserPrivillage() {
    let { id } = useParams();
    // console.log(username);

    function onSelectionChanged(e) {
        const selectedData = e.component.getSelectedRowsData('all');
        console.log(selectedData)
    }

    return (
        <MainContent>
            <SubHeader active_page="User Privillage" menu_name="Management User" modul_name="User Privillage" />
            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="User Privillage" />
                    </CardHeader>
                    <CardBody>
                        <button type="button" className="btn btn-primary" >get {id}</button>
                        <TreeList
                            id="employees"
                            dataSource={employees}
                            showRowLines={true}
                            showBorders={true}
                            columnAutoWidth={true}
                            // defaultExpandedRowKeys={expandedRowKeys}
                            // selectedRowKeys={selectedRowKeys}
                            keyExpr="ID"
                            parentIdExpr="Head_ID"
                            onSelectionChanged={onSelectionChanged}
                        >
                            <Selection recursive={true} mode="multiple" />
                            <Column dataField="Full_Name" />
                            <Column dataField="Title" caption="Position" />
                            <Column dataField="City" />
                            <Column dataField="State" />
                            <Column width={120} dataField="Hire_Date" dataType="date" />
                        </TreeList>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default UserPrivillage;
