import { Outlet , Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    // will set up later: need to talk to team 
    let auth = {'token': true };

    return (
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes