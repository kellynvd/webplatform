import React from 'react';
import styles from './AdoptionCard.sass'
import {Link} from "react-router-dom";
import TimeAgo from 'javascript-time-ago'
// Load pt-BR locale for time ago
import br from 'javascript-time-ago/locale/pt'
import AdoptionButton from "./AdoptionButton/AdoptionButton";

TimeAgo.addLocale(br);

const AdoptionCard = (props) => {
    var moment = require('moment');
    const postedAtDateTime = moment(props.postedAt).toDate();
    const timeAgo = new TimeAgo('pt-BR');

    function ageLabelText(age) {
        if (age == null) {
            return "0 anos";
        } else if (age === 1) {
            return `${age} ano`;
        } else {
            return `${age} anos`;
        }
    }

    function getNgoDescription(ngo) {
        const city = ngo.city ? ngo.city : '';
        const state = ngo.state ? ngo.state : '';

        if (city === '' && state === '') {
            // TODO: should be required on ngos form
            return ngo.fantasy_name;
        }

        return ngo.fantasy_name + ", " + city + "-" + state;
    }

    function getPetDetail(sex, age) {
        const sexDescription = sex === "f" ? "Fêmea" : "Macho";

        return sexDescription + ", " + ageLabelText(age)
    }

    return (
        <div className={styles.AdoptionCard}>
            <div className={styles.pictureBox}>
                <img className={styles.picture} src={props.petImage} alt='Imagem do pet' />
            </div>
            <div className={styles.cardContent}>
                <a className={styles.petName}>{props.name}</a>
                <div className={styles.postDetail}>
                    <a className={styles.smallText}>{getPetDetail(props.sex, props.age)}</a>
                </div>
                <a className={styles.petDescription}>{props.description}</a>
                <div className={styles.postDetail}>
                    <div className={styles.ngoDetail}>
                        <img className={styles.ngoPicture} src={props.ngo.logo_path} alt='Imagem da ONG' />
                        <Link className={styles.smallText} to={`/new/ong/${props.ngo.fantasy_name}`}>{getNgoDescription(props.ngo)}</Link>
                    </div>
                    <a className={styles.smallText}>{timeAgo.format(postedAtDateTime)}</a>
                </div>
            </div>
            <div className={styles.adoptionCardBottom}>
                {/*{ TODO: implement behaviour of button when user is not logged in }*/}
                <div className={styles.adoptionButton}>
                    <AdoptionButton clicked={props.modalOpen} name='Adote'/>
                </div>
            </div>
        </div>
    );
};

export default AdoptionCard;