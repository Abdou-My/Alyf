import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';


import { useState, useEffect } from 'react';
import axios from 'axios';


export default function ListStagiaire (){
    const [stagiaire, setStagiaire] = useState([]);
    const [t, setT] = useState(0);

    useEffect(() => {
        getAll();
    },[t]);
    
   function getAll(){
    axios.get('http://localhost/AlyfPlaningBack/admin/stagiaires').then(response=>{
        console.log("in")
        console.log(response.data)
       setStagiaire(response.data);
        if(stagiaire.length === 0){
            console.log('empty');
            if(t === 0) setT(1);
            if(t === 1) setT(0);
        }else{
            console.log('stagiaire : ')
            console.log(stagiaire)
        }
    })
   
        
   }
   
   const deleteStagiaire = (id) =>{
    axios.post(`http://localhost/AlyfPlaningBack/admin/supprimerStagiaire/${id}`).then(response=>{
        getAll();
    })
}
   
        return(
            
        <div class="container">
        <div class="row my-4">
            <div class="col-md-20 mx-auto">
                <div class="card">
                    <div class="card-body bg-light">
                    
                        <New btnName="Nouveau stagiaire" btnLink={'/admin/stagiaire/create'}/>
                        <p></p>
                        <table class="table table-striped-columns" >
                            <thead >
                                <tr style={{textAlign:'center'}}>
                                    <th scope="col">Nom de stagiaire</th>
                                    <th scope="col">Prenom de stagiaire</th>
                                    <th scope="col">Telephone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                stagiaire.map(ele =>{
                                    return(
                                        <tr>
                                            <td>{ele.nom_stagiaire}</td>
                                            <td>{ele.prenom_stagiaire}</td>
                                            <td>{ele.telephone_stagiaire}</td>
                                            <td>{ele.email_stagiaire}</td>
                                            <td style={{textAlign:'center'}}><Edit buttonURL={`/admin/stagiaire/modifier/${ele.id_stagiaire}`} /></td>
                                            <td style={{textAlign:'center'}}>
                                            <button className="btn btn-danger" onClick={()=>deleteStagiaire(ele.id_stagiaire)}>Supprimer</button></td>
                                        </tr>
                                    )
                                })
                            }
                                
                            </tbody>
                        </table>
    
                    </div>
                </div>
            </div>
        </div>
    </div>
 
    )

}
