import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';
import Delete from '../../../components/UI/Delete';
import Select from 'react-select';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateModule() {
    const [drata, setDrata] = useState([]);
    const nav = useNavigate();
    const [promoSelected, setPromoSelected] = useState([]);
    const [stagSelected, setStagSelected] = useState([]);
    const [promo, setPromo] = useState([]);
    const [stag, setStag] = useState([]);
    const [t, setT] = useState(0);
    const [s, setS] = useState(0);
    const [p, setP] = useState(0);

    useEffect(() => {
        getPromotions();
    }, [t]);
    useEffect(() => {
        getStagiaires();
    }, [s]);
    useEffect(() => {
        addParticipent();
    }, [p]);
    const customStyles = {
        control: base => ({
            ...base,
            height: 46,
            minHeight: 35
        })
    };


    function getPromotions() {
        axios.get('http://localhost/AlyfPlaningBack/admin/promotions').then(response => {

            setPromo(response.data);
            if (promo.length === 0) {
                if (t === 0) setT(1);
                if (t === 1) setT(0);
            }
        })
    }
    function getStagiaires() {
        axios.get('http://localhost/AlyfPlaningBack/admin/stagiaires').then(response => {

            setStag(response.data);
            if (stag.length === 0) {
                if (s === 0) setS(1);
                if (s === 1) setS(0);
            }
        })
    }
    const fromaOnChange = (options) => {
        setPromoSelected(options);
        console.log(options)

    };
    const stagOnChange = (options) => {
        setStagSelected(options);
        console.log(options)

    };
    function addParticipent() {
        console.log("clicked")
        console.log(stagSelected)
    }


    const createStagiaire = (event) => {
        event.preventDefault();
        axios.post('http://localhost/AlyfPlaningBack/admin/createGroupe', promoSelected.value).then(response => {
            axios.post('http://localhost/AlyfPlaningBack/admin/createStagiaireInGroupeGroupe', stagSelected).then(response => {
            })
            nav("/admin/groupe");
        })

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDrata((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        console.log(drata);
    };
    let promoOptions = promo.map(function (ele) {
        return { value: ele.id_promotion, label: ele.nom_promotion }
    })
    let stagiaireOptions = stag.map(function (ele) {
        return { value: ele.id_stagiaire, label: ele.nom_stagiaire + " " + ele.prenom_stagiaire }
    })
    return (

        <div className="container">
            <div className="row my-4">
                <div className="col-md-20 mx-auto">
                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="col-md-10 mx-auto">


                                <div className="form-group">
                                    <label htmlFor="nom" className="form-label mt-4">Choisire la promotion</label>
                                    <Select styles={customStyles} options={promoOptions} onChange={fromaOnChange} value={promoSelected} />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="prenom" className="form-label mt-4">Ajouter les stagiaires</label>
                                    <Select styles={customStyles} options={stagiaireOptions} onChange={stagOnChange} value={stagSelected} isMulti />
                                </div>







                                <div className="form-group form-check">

                                </div>
                                <center><button type="submit" className="btn btn-outline-success btn-lg" onClick={createStagiaire}>Terminer</button></center>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}
