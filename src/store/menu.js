
import { getMenu } from "api/menu";
import { atom, selector } from "recoil";

export const loadMenu = atom({
    key: "loadMenu",
    default: 0,
});

export const MenuStore = selector({
    key: 'MenuStore',
    get: async ({ get }) => {
        get(loadMenu)
        let menu = []

        try {
            const { data } = await getMenu()
            if (data && data.status === 200) {
                menu = data.data
            }
        } catch (error) {
            console.log(error.message);
        }
        return menu
    }
}) 