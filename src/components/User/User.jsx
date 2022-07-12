import React from 'react';
import EditUser from './EditUser/EditUser';
import EditPass from './EditUser/EditPass/EditPass';


const User = (() => {
    return (
        <div className='container-fluid'>
            <EditUser />
            <EditPass />
        </div>
    );
});


export default User;