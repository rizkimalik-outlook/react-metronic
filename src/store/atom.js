import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

const SocketIO = atom({
    key: 'SocketIO',
    default: {},
    effects_UNSTABLE: [persistAtom],
});

const AuthUser = atom({
    key: 'AuthUser',
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export { SocketIO, AuthUser }