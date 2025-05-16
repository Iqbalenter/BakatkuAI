import BackIcon from "../../../assets/back.png";
import { NavLink } from "react-router";

const BackButton = (props) => {
    const { children, to, titleStyle = {}, } = props;
    return (
        <div className="back-button d-flex">
            <NavLink to={to} className="back"><img src={BackIcon}/></NavLink>
            <h3 style={titleStyle}>{children}</h3>
        </div>
    )
}

export default BackButton;