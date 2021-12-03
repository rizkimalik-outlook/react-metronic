
function AskPermission() {
    try {
        Notification.requestPermission().then((permission) => {
            console.log(`Notification permission : ${permission}`);
        });
    }
    catch (e) {
        return false;
    }
    return true;
}

function ShowNotification(Title, Tag) {
    function PushNotification() {
        let options = {
            body: `Ticket Escalation to ${Title}, Ticket Number - ${Tag}`,
            // icon: 'img/' + Icon,
            tag: Tag
        }
        const notif = new Notification('Ticket Number - ' + Title, options);
        notif.onclick = function (event) {
            event.preventDefault();
            // location.href = `${DomainUrl}/inhealth/HTML/TrxShowTicket.aspx?ticketid=${Title}`;
        }
    }


    if (Notification.permission === 'granted') {
        PushNotification();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                PushNotification();
            }
        });
    }
}

export { AskPermission, ShowNotification }