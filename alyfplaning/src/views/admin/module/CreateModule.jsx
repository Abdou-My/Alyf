import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';
import Delete from '../../../components/UI/Delete';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateModule (){
    const [drata, setDrata] = useState([]);
    const nav = useNavigate();
   
    const createStagiaire = (event) =>{
    event.preventDefault();
    console.log("inin");
    console.log(drata);
    axios.post('http://localhost/AlyfPlaningBack/admin/createModule', drata).then(response=>{
        
        nav("/admin/module");
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
   
        return(
            
        <div className="container">
        <div className="row my-4">
            <div className="col-md-20 mx-auto">
                <div className="card">
                    <div className="card-body bg-light">
                    <div className="col-md-10 mx-auto">


  <div className="form-group">
    <label htmlFor="nom" className="form-label mt-4">Nom de module</label>
    <input type="text" className="form-control" id="nom" name="nom" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="prenom" className="form-label mt-4">Intitule de module</label>
    <input type="text" className="form-control" id="prenom" name="inti" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="tel" className="form-label mt-4">Description de module</label>
    <textarea type="text" className="form-control" id="tel" name="descr" onChange={handleChange}></textarea>
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
