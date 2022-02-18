import Logo from "./Logo";
// import SearchSnippet from "../Home/SearchSnippet"; 
// import SearchSnippet from "./SearchSnippet";
import NavList from "./NavList";
function Header(){
    return (
        <header className="header">
            <div className="container display-flex justify-content-between">
                <Logo/>
                <NavList/>
            </div>
        </header>
    )
}
export default Header;