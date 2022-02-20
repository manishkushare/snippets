import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function NavList() {
  const userInfo = useContext(UserContext);
  
  return (
    <nav className="nav-list">
      <ul className="display-flex justify-content-end">
        {userInfo.state.isLoggedIn ? (
          <PrivateNav signout={userInfo.signout} user={userInfo.state.user} />
        ) : (
          <PublicNav />
        )}
      </ul>
    </nav>
  );

}

export default NavList;


function PrivateNav(props) {
  const {user} = props;
  return (
    <>
      <NavLink
        className="link"
        className="link"
        activeClassName="activeNav"
        to="/"
        exact={true}
      >
        <li>Home</li>
      </NavLink>
      <NavLink className="link" activeClassName="activeNav" to="/bookmarks">
        <li>My BookMarks</li>
      </NavLink>
      <NavLink className="link" activeClassName="" to="#" exact={true}>
        <li>{user.username}</li>
      </NavLink>
      <NavLink className="link" activeClassName="" to="#" exact={true}>
        <li onClick={()=>handleSingOut(props.signout)}>Log Out</li>
      </NavLink>
    </>
  );
}

function PublicNav() {
  return (
    <>
      <NavLink className="link" activeClassName="activeNav" to="/" exact={true}>
        <li>Home</li>
      </NavLink>
      <NavLink className="link" activeClassName="activeNav" to="/login">
        <li>Log In</li>
      </NavLink>
    </>
  );
}

const handleSingOut = (signout) => {
  signout();
};