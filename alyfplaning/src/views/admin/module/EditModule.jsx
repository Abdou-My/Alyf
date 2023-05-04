import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';
import Delete from '../../../components/UI/Delete';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

export default function ListStagiaire() {
    const [nom, setNom] = useState('');
    const [inti, setInti] = useState('');
    const [des, setDes] = useState('');
    
    const nav = useNavigate();
    const [t, setT] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        getAll();
        console.log("id : ");
        console.log(id);
    }, [t]);

    function getAll() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/modifierModule/${id}`).then(response => {
            console.log("in");
            console.log(response.data[0])
            setNom(response.data[0].nom_module)
            setInti(response.data[0].intitule)
            setDes(response.data[0].description)
        })


    }



    const createStagiaire = (event) => {
        event.preventDefault();
        const stagiaire={
            iden: id,
            nom: nom,
            inti: inti,
            descr: des,
            
        }
        
        console.log(stagiaire);
        axios.post(`http://localhost/AlyfPlaningBack/admin/editModuleValidated`, stagiaire).then(response => {
            console.log(response.data);
            nav("/admin/module");
        })
    }
    const handleNomChange = (event) => {
        setNom(event.target.value);
        console.log("nom : "+nom);
    };
    const handleIntiChange = (event) => {
        setInti(event.target.value);
        console.log("inti : "+inti);
    };
    const handleDesChange = (event) => {
        setDes(event.target.value);
        console.log("desc : "+des);
    };
    
    

    return (

        <div className="container">
            <div className="row my-4">
                <div className="col-md-20 mx-auto">
                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="col-md-10 mx-auto">


                                <div className="form-group">
                                    <label htmlFor="nom" className="form-label mt-4">Nom de module</label>
                                    <input type="text" className="form-control" id="nom" name="nom" onChange={handleNomChange} value={nom} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prenom" className="form-label mt-4">Intitule de module</label>
                                    <input type="text" className="form-control" id="prenom" name="inti" onChange={handleIntiChange} value={inti} />
                                </div>
                                <div className="form-groupe">
                                    <label htmlFor="tel" className="form-label mt-4">Description de module</label>
                                    <textarea  className="form-control" id="tel" name="descr" onChange={handleDesChange} value={des}></textarea>
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
