import React from 'react';

function Header(props: any)
{
    return(
        <div className="header">
            <a className="header__link" href="/">Accueil</a>
            <a className="header__link" href="/analyse">Analyse</a>
        </div>
    )
}

export default Header;
