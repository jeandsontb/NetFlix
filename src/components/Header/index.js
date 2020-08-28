import React from 'react';
import './styles.css';

export default ({ black }) => {
    return (
        <header className={black ? 'black' : ''} >
            <div className="header--logo" >
                <a href="/#">
                    <img 
                        src="http://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
                        alt="Logo Netflix"
                    />
                </a>
            </div>
            <div className="header--user">
                <a href="/#">
                    <img src="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png" alt="Usuário" />
                </a>
            </div>
        </header>
    );
}