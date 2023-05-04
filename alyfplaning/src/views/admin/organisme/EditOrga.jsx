

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

export default function ListStagiaire() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [ville, setVille] = useState('');
    const [login, setLogin] = useState('');
    const [mdp, setMdp] = useState('');
    
    const nav = useNavigate();
    //const [t, setT] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        getAll();
        
    }, []);

    function getAll() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/modifierOrganisme/${id}`).then(response => {
            console.log("in");
            console.log(response.data[0])
            setNom(response.data[0].nom_organisme)
            setPrenom(response.data[0].nom_agence)
            setVille(response.data[0].ville_agence)
            setLogin(response.data[0].login_organisme)
            setMdp(response.data[0].mdp_organisme)
        })


    }



    const createStagiaire = (event) => {
        event.preventDefault();
        const stagiaire={
            iden: id,
            nom: nom,
            prenom: prenom,
            ville : ville,
            logi: login,
            mdp: mdp,
            
        }
        
        console.log(stagiaire);
        axios.post(`http://localhost/AlyfPlaningBack/admin/editOrganismeValidated`, stagiaire).then(response => {
            console.log(response.data);
            nav("/admin/organisme");
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
    const handleVilleChange = (event) => {
        setVille(event.target.value);
        console.log("email : "+ville);
    };
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        console.log("login : "+login);
    };
    const handleMdpChange = (event) => {
        setMdp(event.target.value);
        console.log("mdp : "+mdp);
    };
    

    return (

        <div className="container">
            <div className="row my-4">
                <div className="col-md-20 mx-auto">
                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="col-md-10 mx-auto">


                            <div className="form-group">
                  <label htmlFor="nom" className="form-label mt-4">Nom de l'organisme</label>
                  <input type="text" className="form-control" id="nom" name="nom" onChange={handleNomChange} value={nom}/>
                </div>
                <div className="form-group">
                  <label htmlFor="prenom" className="form-label mt-4">Nom de l'agence</label>
                  <input type="text" className="form-control" id="prenom" name="prenom" onChange={handlePrenomChange} value={prenom}/>
                </div>
                <div className="form-group">
                  <label htmlFor="tel" className="form-label mt-4">Ville de l'organisme</label>
                  <input type="text" className="form-control" id="tel" name="ville" onChange={handleVilleChange} value={ville}/>
                </div>

                <div className="form-group">
                  <label htmlFor="logi" className="form-label mt-4">Login de l'organisme</label>
                  <input type="text" className="form-control" id="logi" name="logi" onChange={handleLoginChange} value={login}/>
                </div>
                <div className="form-group">
                  <label htmlFor="mdp" className="form-label mt-4">Mot de passe de l'organisme</label>
                  <input type="text" className="form-control" id="mdp" name="mdp" onChange={handleMdpChange} value={mdp}/>
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
