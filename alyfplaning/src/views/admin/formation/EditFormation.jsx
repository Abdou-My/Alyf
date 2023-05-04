import Select from 'react-select'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

export default function ListStagiaire() {
    const [nom, setNom] = useState('');
    const [selectedModules, setSelectedModules] =useState([]);
    const [dbModule, setDbModule] =useState([]);
    const [module, setModule] = useState([]);
  const [t, setT] = useState(0);
    
    const nav = useNavigate();
    
    const { id } = useParams();
    useEffect(() => {
        getAll();
        getModules();
        getDbModules();
    }, [t]);
    function getModules() {
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
      function getDbModules() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/modulesInFormation/${id}`).then(response => {
          console.log("in")
          //console.log(response.data)
          setDbModule(response.data);
          if (dbModule.length === 0) {
            console.log('empty');
            if (t === 0) setT(1);
            if (t === 1) setT(0);
          } else {
            console.log('mdbmodules : ')
            console.log(dbModule)
            let hula = dbModule.map(function(ele){
                return {value: ele.id_module, label: ele.nom_module}
              })
              console.log(hula)
            setSelectedModules(hula);
           
          }
        })
      }
      const selectOnChange = (options) => {
        setSelectedModules(options);
       };
    function getAll() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/modifierFormation/${id}`).then(response => {
            console.log("in");
            console.log(response.data[0])
            setNom(response.data[0].libelle)
            
        })


    }



    const createStagiaire = (event) => {
        event.preventDefault();
        const stagiaire={
            iden: id,
            nom: nom,
        }
        console.log(stagiaire);
        axios.post(`http://localhost/AlyfPlaningBack/admin/editFormationValidated`, stagiaire).then(response => {
            axios.post(`http://localhost/AlyfPlaningBack/admin/editModuleFormationValidated/${id}`, selectedModules).then(response => {
                nav("/admin/formation");
            })
            
        })
    }
    const handleNomChange = (event) => {
        setNom(event.target.value);
        console.log("nom : "+nom);
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
                                    <label htmlFor="nom" className="form-label mt-4">Nom de module</label>
                                    <input type="text" className="form-control" id="nom" name="nom" onChange={handleNomChange} value={nom} />
                                </div>
                                <input type="hidden" className="form-control" id="email" name="id" value={id} />
                                <Select id="select" isMulti options={options} onChange={selectOnChange} value={selectedModules}/>
                                

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
