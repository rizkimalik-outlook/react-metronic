
import { usersIndex } from "api/users";
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
            const { data } = await usersIndex()
            if (data && data.status === 200) {
                users = data.data
            }
        } catch (error) {
            console.log(error.message);
        }
        return users
    }
}) 