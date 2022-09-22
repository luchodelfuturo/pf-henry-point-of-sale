import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {showSuccessMsg, showErrMsg} from '../Utils/Notifications/Notifications'
import {dispatchGetAllUsers, fetchAllUsers} from '../../redux/slices/usersSlice'

const initialState = {
    role: '',
    err: '',
    success: ''
}


function EditUser() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {role, err, success} = data
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res.data))
            })
        }
    },[token, isAdmin, dispatch, callback])


    const updateRole = () => {
        try {
            axios.patch(`/users/update_role/${user.id}`, {
                role: role ? role : user.role,
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(role) updateRole()
    }


    return (
        <div className="profile_page edit_user">
            <div className="row">
                <button onClick={() => history.goBack()} className="go_back">
                    <i className="fas fa-long-arrow-alt-left"></i> Go Back
                </button>
            </div>

            <div className="col-left">
                <h2>Edit user</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={user.name} disabled  />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" defaultValue={user.email} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="isAdmin">Role:</label>
                    <select name="role" id="role" onChange={handleChange}>

                        <option value="admin">Admin</option>

                        <option value="kitchen">Kitchen</option>

                        <option value="cashier">Cashier</option>
                    </select>
                    <button onClick={handleUpdate}>Update</button>
                </div>
                
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            </div>
        </div>
    )
}

export default EditUser