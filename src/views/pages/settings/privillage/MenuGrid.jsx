import React, { useEffect } from 'react';
import { useGetMenuAccessQuery, useCreateMenuAccessMutation, useDeleteMenuAccessMutation } from 'app/services/apiMenu';
import DataGrid, { Column, Paging, MasterDetail } from 'devextreme-react/data-grid';
import Icons from 'views/components/Icons';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { getMenu } from 'app/services/apiMenu';
import { useDispatch, useSelector } from 'react-redux';

const MenuGrid = (props) => {
    const { level_name } = props.data.data;
    const { data, isFetching, refetch } = useGetMenuAccessQuery(level_name);
    const [deleteMenuAccess] = useDeleteMenuAccessMutation();

    async function deleteHandler(id) {
        const res = await deleteMenuAccess(id)
        const data = res.data.data;
        refetch();
        Swal.fire(
            data.message,
            "Your data has been deleted.",
            "success"
        )
    }

    function componentButtonActions(data) {
        const { id } = data.row.data;

        return <div className="d-flex align-items-end justify-content-center">
            <button type="button" onClick={(e) => deleteHandler(id)} className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1" data-toggle="tooltip" title="User Delete">
                <Icons iconName="trash" className="svg-icon svg-icon-sm svg-icon-danger" />
            </button>
        </div>
    }

    return (
        <div>
            <FormCreate user_level={level_name} />
            {isFetching && <div>loading..</div>}
            <DataGrid
                dataSource={data?.data}
                keyExpr="id"
                columnAutoWidth={true}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
            >
                <MasterDetail
                    enabled={true}
                    component=""
                />
                <Paging enabled={false} />
                <Column dataField="menu_id" caption="ID" width={100} />
                <Column dataField="menu_name" caption="Menu" />
                <Column caption="Actions" dataField="id" width={150} cellRender={componentButtonActions} />
            </DataGrid>
        </div>
    )
}

function FormCreate({user_level}) {
    const { register, handleSubmit } = useForm();
    const [createMenuAccess] = useCreateMenuAccessMutation();
    const { refetch } = useGetMenuAccessQuery(user_level);
    const dispatch = useDispatch();
    const { menu } = useSelector(state => state.mainmenu);

    useEffect(() => {
        dispatch(getMenu())
    }, [dispatch]);
    

    const onSubmitCreate = async (data) => {
        try {
            const res = await createMenuAccess(data);
            if (res.data.status === 200) {
                refetch();
                Swal.fire({
                    title: "Success.",
                    text: res.data.data,
                    buttonsStyling: false,
                    icon: "success",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                    timer: 1500
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmitCreate)}>
            <div className="form-group row">
                <input type="hidden" {...register("user_level")} className="form-control" value={user_level} />
                <input type="hidden" {...register("user_create")} className="form-control" value="admin" />
                <div className="col-lg-3">
                    <label>Menu:</label>
                    <select className="form-control" {...register("menu_id", { required: true })}>
                        <option>-- Select Menu --</option>
                        {
                            menu?.map((item) => {
                                return <option value={item.menu_id} key={item.menu_id}>{item.menu_name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="col-lg-9">
                    <button type="submit" className="btn btn-primary btn-sm mt-8">Add Menu</button>
                </div>
            </div>
        </form>
    )
}

export default MenuGrid
