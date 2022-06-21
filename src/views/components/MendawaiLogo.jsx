import React from 'react'
import logo from 'assets/image/logo-hitam-50.png'

function MendawaiLogo({ className }) {
    return (
        <>
            <img src={logo} alt="Keuraisdesk-Icon" className={className} />
            {/* <img src="/assets/media/logos/logo-hitam-50.png" alt="Mendawai-Icon" className={className} /> */}
        </>
    )
}

export default MendawaiLogo

