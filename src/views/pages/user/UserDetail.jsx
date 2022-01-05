import React from 'react'
import { Form, Item } from 'devextreme-react/form';
// import { useGetUserShowQuery } from 'app/services/apiUser';

function UserDetail(props) {
    const user = props.data.data;
    // const { data, isFetching } = useGetUserShowQuery(user.id);
    const items = [
        'max_concurrent', 
        'aux', 
        'organization', 
        'max_queue', 
        'facebook', 
        'twitter', 
        'instagram', 
        'whatsapp', 
        'chat', 
    ];

    return (
        <div>
            {/* {isFetching && <div>loading..</div>} */}
            <h5>{user.name}</h5>
            <Form
                formData={user}
                colCount={3}
                className="bg-white border p-4"
            >
                {
                    items.map((item, index) => <Item
                        dataField={item}
                        key={index}
                        render={renderFormItem}
                    />)
                }
            </Form>
        </div>
    )

    function renderFormItem(item) {
        return <span className="p-3">{item.editorOptions.value === true ? 'True' : item.editorOptions.value}</span>;
    }
}

export default UserDetail
