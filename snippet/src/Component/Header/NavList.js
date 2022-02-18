import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function NavList() {
  const userInfo = useContext(UserContext);
  console.log(userInfo,"nnav");

  const handleSingOut = ()=> {
      userInfo.signout();
  }
  return (
    <nav className="nav-list">
      <ul className="display-flex justify-content-end">
        {userInfo.state.isLoggedIn ? (
          <>
            <NavLink className="link" className="link" activeClassName="activeNav" to="/" exact>
              <li>Home</li>
            </NavLink>
            <NavLink className="link" activeClassName="activeNav" to="/bookmarks" exact>
              <li>My BookMarks</li>
            </NavLink>
            <NavLink className="link" activeClassName="activeNav" to="#" exact>
              <li onClick={ handleSingOut} >Log Out</li>
            </NavLink>

          </>
        ) : (
          <>
            <NavLink className="link" activeClassName="activeNav" to="/" exact>
              <li>Home</li>
            </NavLink>
            <NavLink className="link" activeClassName="activeNav" to="/login" exact>
              <li>Log In</li>
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavList;
