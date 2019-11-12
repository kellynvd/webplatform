import React from "react"
import SimpleHeaderText from "../../components/SimpleHeaderText/SimpleHeaderText";
import styles from './AdoptionList.sass'
import AdoptionCard from "../AdoptionCard/AdoptionCard";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import AdoptionFilterBox from "./FilterBox/AdoptionFilterBox";
import SimpleModal from "../../components/SimpleModal/SimpleModal";

const GET_ADOPTION_REQUEST = 'GET_ADOPTION_REQUEST';
const GET_ADOPTION_SUCCESS = 'GET_ADOPTION_SUCCESS';

function fetchPetsForAdoption() {
    return dispatch => {
        dispatch({type: GET_ADOPTION_REQUEST});
        return fetch(`../v1/pets_for_adoption.json`)
            .then(response => response.json())
            .then(json => dispatch(fetchPetsForAdoptionSuccess(json)))
            .catch(error => console.log(error));
    }
}

export function fetchPetsForAdoptionSuccess(json) {
    return {
        type: GET_ADOPTION_SUCCESS,
        json
    };
}

class AdoptionList extends React.Component {
    state = {
        showAdoptingModal: false,
    };

    componentWillMount() {
        const {fetchPetsForAdoption} = this.props;
        fetchPetsForAdoption();
    }

    addAdoptionInterestHandler = (userEmail, petId) => {
        if (userEmail) {
            let body = JSON.stringify({register_interest: {user_email: userEmail, pet_id: petId}});

            fetch(`../v1/pets_for_adoption/register_interest`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            })
                .then(response => console.log(response.json()))
                .catch(function (error) {
                    // TODO: handle error
                    console.log(error);
                });
        }

        this.setState({showAdoptingModal: true});
    };

    adoptingCancelHandler = () => {
        this.setState({showAdoptingModal: false});
    };

    petList = (pets) => {
        return pets.map(pet => {
            return <AdoptionCard
                key={pet.id}
                name={pet.name}
                description={pet.description_truncated}
                postedAt={pet.created_at}
                petImage={pet.logo_path}
                age={pet.age}
                sex={pet.sex}
                ngo={pet.ngo}
                user={this.props.userEmail}
                modalOpen={() => this.addAdoptionInterestHandler(this.props.userEmail, pet.id)}
            />;
        })
    };

    render() {
        const {pets, userEmail} = this.props;

        return (
            <div className={styles.AdoptionList}>
                <SimpleModal
                    show={this.state.showAdoptingModal}
                    modalClosed={this.adoptingCancelHandler}
                >
                    {userEmail ?
                        <div>
                            <p>Você está a uma pata mais próxima de adotar o seu animalzinho. A ONG está sabendo do seu interesse e entrará em contato quando tiver mais informações.</p>
                        </div>
                    :
                        <div>
                            <p>Você precisa estar logado para adotar.</p>
                            <a href="/users/sign_in">Ir para tela de login</a>
                        </div>
                    }
                </SimpleModal>
                {/*<SimpleHeaderText*/}
                {/*    title='Encontre seu animalzinho'*/}
                {/*    subtitle='Encontre aqui os animais disponíveis para adoção. Clique em "Adote" para saber mais.'*/}
                {/*/>*/}
                {/*<AdoptionFilterBox/>*/}
                <div className={styles.adoptionCards}>
                    {pets && this.petList(pets)}
                    {/* Trick to align last row of cards with flexbox */}
                    <i className={styles.fakeAdoptionCard} aria-hidden="true" />
                    <i className={styles.fakeAdoptionCard} aria-hidden="true" />
                    <i className={styles.fakeAdoptionCard} aria-hidden="true" />
                    <i className={styles.fakeAdoptionCard} aria-hidden="true" />
                </div>
            </div>
        );
    }
}

const structuredSelector = createStructuredSelector({
    pets: state => state.pets,
});

const mapDispatchToProps = {fetchPetsForAdoption};

export default connect(structuredSelector, mapDispatchToProps)(AdoptionList);