import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <ul>
                <li><Link to='/'>MAIN</Link></li>
                <li><Link to='/follows'>FOLLOW</Link></li>
            </ul>
        </header>
    )
}

export {Header};