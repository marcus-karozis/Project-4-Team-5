import "./Dropdown.css";

const Dropdown = ({ dropdown }) => {
    return (
        <ul className={`dropdown ${dropdown ? "show" : ""}`}>
             <li className="menu-items">
                <a href='#'>Personal details</a>
            </li>
            <li className="menu-items">
                <a href='#'>Settings</a>
            </li>
            <hr/>
            <li className="menu-items">
                <a href='#' onClick="{() => }">Log out</a>
            </li>
        </ul>
    );
};

export default Dropdown;