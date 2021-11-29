import { Form, Item } from 'devextreme-react/form';
import React from 'react'

function UserDetail(props) {
    const data = props.data;
    const items = ['max_concurrent', 'aux', 'organization', 'role','department','created_at'];

    return (
        <Form
            formData={data.data}
            colCount={2}
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
    )

    function renderFormItem(item) {
        return <span>{item.editorOptions.value}</span>;
    }
}

export default UserDetail
