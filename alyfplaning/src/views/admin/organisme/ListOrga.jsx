import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';


import { useState, useEffect } from 'react';
import axios from 'axios';


export default function ListModule (){
    const [stagiaire, setStagiaire] = useState([]);
    const [t, setT] = useState(0);

    useEffect(() => {
        getAll();
    },[t]);
    
   function getAll(){
    axios.get('http://localhost/AlyfPlaningBack/admin/organismes').then(response=>{
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
   
   const deleteFunction = (id) =>{
    axios.post(`http://localhost/AlyfPlaningBack/admin/supprimerOrganisme/${id}`).then(response=>{
        getAll();
    })
}
   
        return(
            
        <div class="container">
        <div class="row my-4">
            <div class="col-md-20 mx-auto">
                <div class="card">
                    <div class="card-body bg-light">
                    
                        <New btnName="Nouveau organisme" btnLink={'/admin/organisme/create'}/>
                        <p></p>
                        <table class="table table-striped-columns" >
                            <thead >
                                <tr style={{textAlign:'center'}}>
                                    <th scope="col">Nom de l'organisme</th>
                                    <th scope="col">Nom de l'agence</th>
                                    <th scope="col">Ville de l'agence</th>
                                    
                                    <th scope="col" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                stagiaire.map(ele =>{
                                    return(
                                        <tr>
                                            <td>{ele.nom_organisme}</td>
                                            <td>{ele.nom_agence}</td>
                                            <td>{ele.ville_agence}</td>
                                            <td style={{textAlign:'center'}}><Edit buttonURL={`/admin/organisme/modifier/${ele.id_visiteur}`} /></td>
                                            <td style={{textAlign:'center'}}>
                                            <button className="btn btn-danger" onClick={()=>deleteFunction(ele.id_visiteur)}>Supprimer</button></td>
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
