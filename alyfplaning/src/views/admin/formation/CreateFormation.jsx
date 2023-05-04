import Select from 'react-select'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateModule() {
  const [selectedModules, setSelectedModules] =useState([]);
  const [drata, setDrata] = useState([]);
  const [t, setT] = useState(0);
  const [module, setModule] = useState([]);
  
  const nav = useNavigate();
  useEffect(() => {
    getAll();
},[t]);
 
const selectOnChange = (options) => {
 setSelectedModules(options);
};
  const createStagiaire = (event) => {
    event.preventDefault();
    console.log("inin");
    console.log(drata);
    axios.post('http://localhost/AlyfPlaningBack/admin/createFormation', drata).then(response => {
      axios.post('http://localhost/AlyfPlaningBack/admin/createModulesDansFormation', selectedModules).then(response=>{
        nav("/admin/formation");
      })
    })
  }
  function getAll() {
    axios.get('http://localhost/AlyfPlaningBack/admin/modules').then(response => {
      console.log("in")
      //console.log(response.data)
      setModule(response.data);
      if (module.length === 0) {
        console.log('empty');
        if (t === 0) setT(1);
        if (t === 1) setT(0);
      } else {
        console.log('modules : ')
        console.log(module)
       
      }
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
let options = module.map(function(ele){
  return {value: ele.id_module, label: ele.nom_module}
})
  return (

    <div className="container">
      <div className="row my-4">
        <div className="col-md-20 mx-auto">
          <div className="card">
            <div className="card-body bg-light">
              <div className="col-md-10 mx-auto">


                <div className="form-group">
                  <label htmlFor="nom" className="form-label mt-4">Nom de formation</label>
                  <input type="text" className="form-control" id="nom" name="nom" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="select" className="form-label mt-4">List des modules</label>
                  <Select id="select" isMulti options={options} onChange={selectOnChange} value={selectedModules}/>

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
