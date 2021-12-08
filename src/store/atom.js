import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

const SocketStore = atom({
    key: 'SocketStore',
    default: {},
    effects_UNSTABLE: [persistAtom],
});

const AuthUser = atom({
    key: 'AuthUser',
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export { SocketStore, AuthUser }