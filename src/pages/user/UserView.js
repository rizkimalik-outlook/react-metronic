import React from 'react';
import { useParams } from 'react-router-dom';
import { SubHeader, MainContent, Container } from 'layouts/partials';
import { Card, CardBody, CardHeader, CardTitle } from 'components/card';

function UserView() {
    let { username } = useParams();
    // console.log(username);

    return (
        <MainContent>
            <SubHeader active_page="User View" menu_name="Management User" modul_name="User View" />

            <Container>
                <Card>
                    <CardHeader>
                        <CardTitle title="User View" />
                    </CardHeader>

                    <CardBody>
                        <div className="tab-content mt-5" id="myTabTables11">
                            <div className="tab-pane fade active show" id="kt_tab_pane_11_3" role="tabpanel" aria-labelledby="kt_tab_pane_11_3">
                                Profile : {username}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </MainContent>
    )
}

export default UserView;
