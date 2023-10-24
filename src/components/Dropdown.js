import "./Dropdown.css";

const Dropdown = ({ dropdown }) => {
    return (
        <ul className={`dropdown ${dropdown ? "show" : ""}`}>
            <li className="menu-items">
                <a href='#'>Settings</a>
            </li>
            <li className="menu-items">
                <a href='#' onClick="{() => }">Logout</a>
            </li>
        </ul>
    );
};

export default Dropdown;