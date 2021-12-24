function addZero(x) {
    if (x < 10) {
        x = "0" + x;
    }
    return x;
}

const Datetime = () => {
    const date = new Date(),
        Y = addZero(date.getFullYear()),
        M = addZero(date.getMonth()),
        D = addZero(date.getDate()),
        h = addZero(date.getHours()),
        m = addZero(date.getMinutes()),
        s = addZero(date.getSeconds());

    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

export default Datetime
