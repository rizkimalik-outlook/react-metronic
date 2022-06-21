import React from 'react'
import chat from 'assets/icons/chat.png'
import messenger from 'assets/icons/messenger.png'
import twitter from 'assets/icons/twitter.png'
import facebook from 'assets/icons/facebook.png'
import whatsapp from 'assets/icons/whatsapp.png'
import instagram from 'assets/icons/instagram.png'

function IconSocmed({ name, height, width }) {
    if (name === 'chat') {
        return <div><img src={chat} height={height} width={width} alt="chat" /></div>;
    } else if (name === 'messenger') {
        return <div><img src={messenger} height={height} width={width} alt="messenger" /></div>;
    } else if (name === 'twitter') {
        return <div><img src={twitter} height={height} width={width} alt="twitter" /></div>;
    } else if (name === 'facebook') {
        return <div><img src={facebook} height={height} width={width} alt="facebook" /></div>;
    } else if (name === 'whatsapp') {
        return <div><img src={whatsapp} height={height} width={width} alt="whatsapp" /></div>;
    } else if (name === 'instagram') {
        return <div><img src={instagram} height={height} width={width} alt="instagram" /></div>;
    }

}

export default IconSocmed