import React from 'react';


const Navibar = () => {

    return (
        <div className="">
            <h2>Phoenix</h2>
                <nav className="nav__links">
                    <ul>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Projects</a></li>
                    </ul>
                </nav>
                <a className="cta" href="#"><button>Contact</button></a>
        </div>
    )
}

export default Navibar;