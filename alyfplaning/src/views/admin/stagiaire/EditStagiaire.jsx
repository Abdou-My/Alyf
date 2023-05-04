import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';
import Delete from '../../../components/UI/Delete';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

export default function ListStagiaire() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const nav = useNavigate();
    const [t, setT] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        getAll();
        console.log("id : ");
        console.log(id);
    }, [t]);

    function getAll() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/modifierStagiaire/${id}`).then(response => {
            console.log("in");
            console.log(response.data[0])
            //setStagiaire(response.data[0]);
            setNom(response.data[0].nom_stagiaire)
            setTel(response.data[0].telephone_stagiaire)
            setPrenom(response.data[0].prenom_stagiaire)
            setEmail(response.data[0].email_stagiaire)
            /*if (stagiaire.length === 0) {
                console.log('empty');
                if (t === 0) setT(1);
                if (t === 1) setT(0);
            } else {
                console.log('stagiaire : ')
                console.log(stagiaire)
            }*/
        })


    }



    const createStagiaire = (event) => {
        event.preventDefault();
        const stagiaire={
            iden: id,
            nom: nom,
            prenom: prenom,
            email: email,
            tel: tel
        }
        
        console.log(stagiaire);
        axios.post(`http://localhost/AlyfPlaningBack/admin/editStagiaireValidated`, stagiaire).then(response => {
            console.log(response.data);
            nav("/admin/stagiaire");
        })
    }
    const handleNomChange = (event) => {
        setNom(event.target.value);
        console.log("nom : "+nom);
    };
    const handlePrenomChange = (event) => {
        setPrenom(event.target.value);
        console.log("prenom : "+prenom);
    };
    const handleTelChange = (event) => {
        setTel(event.target.value);
        console.log("tel : "+tel);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log("email : "+email);
    };
    

    return (

        <div className="container">
            <div className="row my-4">
                <div className="col-md-20 mx-auto">
                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="col-md-10 mx-auto">


                                <div className="form-group">
                                    <label htmlFor="nom" className="form-label mt-4">Nom de stagiaire</label>
                                    <input type="text" className="form-control" id="nom" name="nom" onChange={handleNomChange} value={nom} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prenom" className="form-label mt-4">Preom de stagiaire</label>
                                    <input type="text" className="form-control" id="prenom" name="prenom" onChange={handlePrenomChange} value={prenom} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tel" className="form-label mt-4">Telephone de stagiaire</label>
                                    <input type="text" className="form-control" id="tel" name="tel" onChange={handleTelChange} value={tel} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label mt-4">Email de stagiaire</label>
                                    <input type="email" className="form-control" id="email" name="email" onChange={handleEmailChange} value={email} />
                                    <input type="hidden" className="form-control" id="email" name="id" value={id} />
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
