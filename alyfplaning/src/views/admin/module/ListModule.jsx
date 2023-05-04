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
    axios.get('http://localhost/AlyfPlaningBack/admin/modules').then(response=>{
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
    axios.post(`http://localhost/AlyfPlaningBack/admin/supprimerModule/${id}`).then(response=>{
        getAll();
    })
}
   
        return(
            
        <div class="container">
        <div class="row my-4">
            <div class="col-md-20 mx-auto">
                <div class="card">
                    <div class="card-body bg-light">
                    
                        <New btnName="Nouveau module" btnLink={'/admin/module/create'}/>
                        <p></p>
                        <table class="table table-striped-columns" >
                            <thead >
                                <tr style={{textAlign:'center'}}>
                                    <th scope="col">Nom de module</th>
                                    <th scope="col">Intitule</th>
                                    
                        
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                stagiaire.map(ele =>{
                                    return(
                                        <tr>
                                            <td>{ele.nom_module}</td>
                                            <td>{ele.intitule}</td>
                                            
                                            <td style={{textAlign:'center'}}>
                                                <Edit buttonURL={`/admin/module/modifier/${ele.id_module}`} />
                                            
                                            {" "}
                                                        <button className="btn btn-danger" onClick={()=>deleteFunction(ele.id_module)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                            </svg>
                                                        </button></td>
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
