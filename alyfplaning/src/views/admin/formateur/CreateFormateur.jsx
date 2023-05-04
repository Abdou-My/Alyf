import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';
import Delete from '../../../components/UI/Delete';
import Select from 'react-select';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function CreateModule() {
  const [drata, setDrata] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [module, setModule] = useState([]);
  const [t, setT] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    getModule();
  }, [t]);
  function getModule() {
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
  const createStagiaire = (event) => {
    event.preventDefault();
    axios.post('http://localhost/AlyfPlaningBack/admin/createFormateur', drata).then(response => {

      axios.post('http://localhost/AlyfPlaningBack/admin/createCompetances', selectedModules).then(response=>{
        nav("/admin/formateur");
      })

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
  const selectOnChange = (options) => {
    setSelectedModules(options);
  };
  let moduleOptions = module.map(function (ele) {
    return { value: ele.id_module, label: ele.nom_module }
  })
  return (

    <div className="container">
      <div className="row my-4">
        <div className="col-md-20 mx-auto">
          <div className="card">
            <div className="card-body bg-light">
              <div className="col-md-10 mx-auto">


                <div className="form-group">
                  <label htmlFor="nom" className="form-label mt-4">Nom de formateur</label>
                  <input type="text" className="form-control" id="nom" name="nom" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="prenom" className="form-label mt-4">Prenom de formateur</label>
                  <input type="text" className="form-control" id="prenom" name="prenom" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="tel" className="form-label mt-4">Telephone de formateur</label>
                  <input type="text" className="form-control" id="tel" name="tel" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label mt-4">Email de formateur</label>
                  <input type="text" className="form-control" id="email" name="email" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="logi" className="form-label mt-4">Login de formateur</label>
                  <input type="text" className="form-control" id="logi" name="logi" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="mdp" className="form-label mt-4">Mot de passe de formateur</label>
                  <input type="text" className="form-control" id="mdp" name="mdp" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="mdp" className="form-label mt-4">Competances de formateur</label>
                  <Select options={moduleOptions} isMulti onChange={selectOnChange} value={selectedModules} />
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
