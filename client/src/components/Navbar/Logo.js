import React from "react";
import LogoTunflix from "../../assets/images/logo.png";
import {Link} from 'react-router-dom'

const Logo = (props) => (
    <Link to='/browse'>
        <img alt="Logo" src={LogoTunflix} {...props} />
    </Link>
);

export default Logo;
