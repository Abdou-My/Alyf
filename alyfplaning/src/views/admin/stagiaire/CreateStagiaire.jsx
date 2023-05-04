import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';
import Delete from '../../../components/UI/Delete';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ListStagiaire (){
    const [stagiaire, setStagiaire] = useState([]);
    const nav = useNavigate();
   
    const createStagiaire = (event) =>{
    event.preventDefault();
    console.log(stagiaire);
    axios.post('http://localhost/AlyfPlaningBack/admin/createStagiaire', stagiaire).then(response=>{
        console.log(response.data);
        nav("/admin/stagiaire");
    })
   }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStagiaire((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
        console.log(stagiaire);
      };
   
        return(
            
        <div className="container">
        <div className="row my-4">
            <div className="col-md-20 mx-auto">
                <div className="card">
                    <div className="card-body bg-light">
                    <div className="col-md-10 mx-auto">


  <div className="form-group">
    <label htmlFor="nom" className="form-label mt-4">Nom de stagiaire</label>
    <input type="text" className="form-control" id="nom" name="nom" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="prenom" className="form-label mt-4">Preom de stagiaire</label>
    <input type="text" className="form-control" id="prenom" name="prenom"onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="tel" className="form-label mt-4">Telephone de stagiaire</label>
    <input type="text" className="form-control" id="tel" name="tel"  onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="email" className="form-label mt-4">Email de stagiaire</label>
    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
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
