import React from 'react';
import styles from './Navigation.sass';
import {NavLink} from "react-router-dom";

const Navigation = (props) => {
    function loginButton() {
        return <a href="/users/sign_in" className={styles.loginButton}>Entrar</a>;
    }

    function userButtons() {
        // TODO: User pic
        // TODO: Link to admin panel

        return <p>{props.userEmail}</p>;
    }

    return <nav className={styles.Navigation}>
        <h1 className={styles.title}>Boa Causa</h1>
        <div className={styles.links}>
            <NavLink exact className={styles.link} activeClassName={styles.linkActive} to="/">Home</NavLink>
            <NavLink className={styles.link} activeClassName={styles.linkActive} to="/ongs">ONGs</NavLink>
            <NavLink className={styles.link} activeClassName={styles.linkActive} to="/adocao">Adoção</NavLink>
        </div>
        {props.userEmail ? userButtons() : loginButton()}
    </nav>;
};

export default Navigation;
