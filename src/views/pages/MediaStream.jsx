import React, { useEffect, useRef } from 'react'

function MediaStream() {
    const refMyVideo = useRef();

    

    useEffect(() => {
        function getMedia(){
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                // setStream(stream)
                myVideo.current.srcObject = stream
            })
        }
        getMedia();
    }, [])

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="d-flex flex-column-fluid">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-custom card-stretch gutter-b">
                                <div className="card-body pt-2 pb-0 mt-n3">
                                    <video name="video" autoPlay playsInline ref={refMyVideo}></video>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MediaStream
