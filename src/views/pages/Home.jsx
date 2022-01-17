import React from 'react'
import { Card, CardBody } from 'views/components/card'
import { Container, MainContent, SubHeader } from 'views/layouts/partials'

const Home = () => {
    return (
        <MainContent>
            <SubHeader active_page="Mendawai" menu_name="Welcome" modul_name="App Mendawai" />
            <Container>
                <div className="row">
                    <div className="col-lg-12">
                        <Card>
                            <CardBody className="d-flex align-items-center">
                                <div className="text-center">
                                    <p className="display-4 text-info">Mendawai Helpdesk</p>
                                    <p>Contact center solutions allow your contact center to connect with customers on any communication channel like voice call, video call, live chat, SMS, social media, and more. Provide customer service on any channel and seamlessly switch among any digital channels during an interaction, while maintaining context and relevant information across all channels as if it were a single conversation.</p>
                                    <img src="/assets/media/ticketing.png" height={400} alt="Mendawai-Ticketing" />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Container>
        </MainContent>
    )
}

export default Home
