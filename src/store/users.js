
import { userIndex } from "api/user";
import { atom, selector } from "recoil";

export const loadDataUsers = atom({
    key: "loadDataUsers",
    default: 0,
});

export const UserStore = selector({
    key: 'UserStore',
    get: async ({ get }) => {
        get(loadDataUsers)
        let users = []

        try {
            const { data } = await userIndex()
            if (data && data.status === 200) {
                users = data.data
            }
        } catch (error) {
            console.log(error.message);
        }
        return users
    }
}) 