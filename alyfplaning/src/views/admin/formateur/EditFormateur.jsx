
import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

export default function ListStagiaire() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [login, setLogin] = useState('');
    const [mdp, setMdp] = useState('');
    const [t, setT] = useState(0);
    const [dbModule, setDbModule] = useState([]);
    const [module, setModule] = useState([]);
    const [selectedModules, setSelectedModules] = useState([]);
    
    const nav = useNavigate();
    //const [t, setT] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        getAll();
        getDbCompetances();
        getModule();
    }, [t]);
    const selectOnChange = (options) => {
        setSelectedModules(options);
      };
    function getAll() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/modifierFormateur/${id}`).then(response => {
            console.log("in");
            console.log(response.data[0])
            setNom(response.data[0].nom_formateur)
            setPrenom(response.data[0].prenom_formateur)
            setEmail(response.data[0].email_formateur)
            setTel(response.data[0].telephone_formateur)
            setLogin(response.data[0].login_formateur)
            setMdp(response.data[0].mdp_formateur)
        })


    }



    const createStagiaire = (event) => {
        event.preventDefault();
        const stagiaire={
            iden: id,
            nom: nom,
            prenom: prenom,
            email: email,
            tel: tel,
            logi: login,
            mdp: mdp,
            
        }
        
        console.log(stagiaire);
        axios.post(`http://localhost/AlyfPlaningBack/admin/editFormateurValidated`, stagiaire).then(response => {
            axios.post(`http://localhost/AlyfPlaningBack/admin/editCompetanceFormateurValidated/${id}`, selectedModules).then(response => {
                nav("/admin/formateur");
            })
            
        })
    }
    function getModule() {
        axios.get('http://localhost/AlyfPlaningBack/admin/modules').then(response => {
          console.log("in")
          //console.log(response.data)
          setModule(response.data);
          if (module.length === 0) {
            if (t === 0) setT(1);
            if (t === 1) setT(0);
          } 
        })
      }
    function getDbCompetances() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/competancesFormateur/${id}`).then(response => {
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
    const handleNomChange = (event) => {
        setNom(event.target.value);
        console.log("nom : "+nom);
    };
    const handlePrenomChange = (event) => {
        setPrenom(event.target.value);
        console.log("prenom : "+prenom);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log("email : "+email);
    };
    const handleTelChange = (event) => {
        setTel(event.target.value);
        console.log("telephone : "+tel);
    };
    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        console.log("login : "+login);
    };
    const handleMdpChange = (event) => {
        setMdp(event.target.value);
        console.log("mdp : "+mdp);
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
                                    <label htmlFor="nom" className="form-label mt-4">Nom de l'admin</label>
                                    <input type="hidden"  id="email" name="id" value={id} />
                                    <input type="text" className="form-control" id="nom" name="nom" onChange={handleNomChange} value={nom} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prenom" className="form-label mt-4">Prenom de l'admin</label>
                                    <input type="text" className="form-control" id="prenom" name="prenom" onChange={handlePrenomChange} value={prenom} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label mt-4">Email de l'admin</label>
                                    <input type="text" className="form-control" id="email" name="email" onChange={handleEmailChange} value={email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tel" className="form-label mt-4">Telephone de l'admin</label>
                                    <input type="text" className="form-control" id="tel" name="tel" onChange={handleTelChange} value={tel} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="logi" className="form-label mt-4">Login de l'admin</label>
                                    <input type="text" className="form-control" id="logi" name="logi" onChange={handleLoginChange} value={login} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mdp" className="form-label mt-4">Mot de passe de l'admin</label>
                                    <input type="text" className="form-control" id="mdp" name="mdp" onChange={handleMdpChange} value={mdp} />
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
