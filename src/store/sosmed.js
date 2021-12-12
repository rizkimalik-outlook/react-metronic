import { listCustomers } from "api/sosmed";
import { atom, selector } from "recoil";

export const loadListCustomers = atom({
    key: "loadListCustomers",
    default: 0,
});

export const ListCustomerStore = selector({
    key: 'ListCustomerStore',
    get: async ({ get }) => {
        get(loadListCustomers)
        let list_customers = []

        try {
            const { data } = await listCustomers()
            if (data && data.status === 200) {
                list_customers = data.data
            }
        } catch (error) {
            console.log(error.message);
        }
        return list_customers
    }
}) 