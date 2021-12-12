import { Card, CardBody, CardHeader, CardTitle } from 'components/card'
import { Container, MainContent, SubHeader } from 'layouts/partials'
import React from 'react'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
        
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
        
    },
]


function GridReact() {
    return (
        <MainContent>
            <SubHeader active_page="User Privillage" menu_name="Management User" modul_name="User Privillage" />
            <Container>
                <Card>
                    <CardHeader className="border-0">
                        <CardTitle title="User Privillage" subtitle="List account users member login." />
                    </CardHeader>
                    <CardBody>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination={true}
                            expandableRows={true}
                            fixedHeader={false}
                            fixedHeaderScrollHeight='300px'
                        />
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default GridReact
