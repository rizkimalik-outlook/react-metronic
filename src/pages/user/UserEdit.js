import React from 'react';
import { useParams } from 'react-router-dom';
import { SubHeader, MainContent, Container } from 'layouts/partials';

function UserEdit() {
    let { username } = useParams();
    // console.log(username);

    return (
        <MainContent>
            <SubHeader active_page="User Edit" menu_name="Management User" modul_name="User Edit" />

            <Container>
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0 pt-5">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label font-weight-bolder text-dark">New Arrivals</span>
                            <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span>
                        </h3>
                    </div>

                    <div className="card-body pt-2 pb-0 mt-n3">
                        <div className="tab-content mt-5" id="myTabTables11">
                            <div className="tab-pane fade active show" id="kt_tab_pane_11_3" role="tabpanel" aria-labelledby="kt_tab_pane_11_3">
                                Profile : {username}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </MainContent>
    )
}

export default UserEdit
