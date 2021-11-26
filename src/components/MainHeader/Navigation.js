import React, {useContext} from "react";
import AuthContext from "../../store/auth-context";
import classes from './Navigation.module.css';

const Navigation = () => {
    const ctxData = useContext(AuthContext)
    return(
        <nav className={classes.nav}>
            <ul>
                {ctxData.isLoggedIn && (
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {ctxData.isLoggedIn && (
                    <li>
                        <a href="/">Admin</a>
                    </li>
                )}
                {ctxData.isLoggedIn && (
                    <li>
                        <button onClick={ctxData.onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}
export default Navigation;