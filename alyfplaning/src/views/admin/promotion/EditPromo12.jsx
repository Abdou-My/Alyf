import Select from 'react-select'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



export default function ListModule() {
    const { idp } = useParams();
    const [r, setR] = useState(0);
    const [dateDebut, setDateDebut] = useState('');
    const [dbOrga, setDbOrga] = useState([]);
    const [dbForma, setDbForma] = useState([]);
    const [formateurOptions, setFormateurOptions] = useState([]);
    const [promoDbModule, setPromoDbModule] = useState([]);
    const [dbModulePromoIsFilled, setDbModulePromoIsFilled] = useState(false);
    const [dateFin, setDateFin] = useState('');
    const [nomP, setNomP] = useState('');
    const [orga, setOrga] = useState([]);
    const [forma, setForma] = useState([]);
    const [formateurs, setFormateurs] = useState([]);
    const [formateur, setFormateur] = useState([]);
    const [dbModule, setDbModule] = useState([]);
    const [formaSelected, setFormaSelected] = useState([]);
    const [orgaSelected, setOrgaSelected] = useState([]);
    const [moduleSelected, setModuleSelected] = useState([]);
    const [formateurSelected, setFormateurSelected] = useState([]);
    const [planing, setPlaning] = useState([]);
    const [moduleHasChanged, setModuleHasChanged] = useState(false);
    const [t, setT] = useState(0);
    const [s, setS] = useState(0);
    const [f, setF] = useState(0);
    const [pm, setPm] = useState(0);
    const [m, setM] = useState(0);
    const [o, setO] = useState(0);
    const [id, setId] = useState();
    const [dbModuleIsFilled, setDbModuleIsFilled] = useState(false);
    // load data



    useEffect(() => {
        getOrganisme();
        getFormation();
        getDbModules();
        //getFormateurByModule();
    }, [t, s, f]);
    useEffect(() => {
        getPromo();
    }, []);
    useEffect(() => {
        getDbFormation();
    }, [r])
    useEffect(() => {
        getDbOrga();
    }, [o])
    useEffect(() => {
        getDbModulesInPromo();
    }, [pm])
    useEffect(() => {
        getFormateurByModule();
    }, [m])

    function getDbFormation() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/getDbFormation/${idp}`).then(function (response) {
            setDbForma(response.data)
            if (dbForma.length === 0) {
                if (r === 0) setR(1);
                if (r === 1) setR(0);
            } else {
                if (pm === 1) setPm(0)
                if (pm === 0) setPm(1)
                let hula = dbForma.map(function (ele) {
                    return { value: ele.id_formation, label: ele.libelle }
                })
                setFormaSelected(hula);
                setId(hula[0].value);
            }
        })
    }
    function getPromo() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/getNomPromo/${idp}`).then(function (response) {
            setNomP(response.data[0].nom_promotion)
            console.log(nomP);
        })
    }
    function getDbOrga() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/getDbOrga/${idp}`).then(function (response) {
            setDbOrga(response.data)
            if (dbOrga.length === 0) {
                if (o === 0) setO(1);
                if (o === 1) setO(0);
            } else {
                let hula = dbOrga.map(function (ele) {
                    return { value: ele.id_visiteur, label: "Nom de l'agence : " + ele.nom_agence + " - Ville de l'agence : " + ele.ville_agence, city: ele.ville_agence }
                })
                setOrgaSelected(hula);
            }
        })
    }
    const fromaOnChange = (options) => {
        setFormaSelected(options);
        setId(options.value);
        if (s === 1) setS(0)
        if (s === 0) setS(1)
    };
    const orgaOnChange = (options) => {
        setOrgaSelected(options);
    };
    const DateDebutChange = (event) => {
        setDateDebut(event.target.value);
    };
    const DateFinOnChange = (event) => {
        setDateFin(event.target.value);
    };
    const moduleOnChange = (options) => {
        setModuleSelected(options);
        getFormateurByModule();
        setModuleHasChanged(true);
    };
    const formateurOnChange = (options) => {
        setFormateurSelected(options);

    };
    /*formateurOptions = formateurs.map(function (ele) {
        return { value: ele.id_formateur, label: ele.nom_formateur + " " + ele.prenom_formateur }
    })*/
    const getFormateurModule = (di, event) => {

        axios.get(`http://localhost/AlyfPlaningBack/admin/formateurByModule/${di}`).then(response => {
            setFormateur(response.data)
            let hula = formateur.map(function (ele) {
                return { value: ele.id_formateur, label: ele.nom_formateur + " " + ele.prenom_formateur }
            })
            setFormateurOptions(hula)
            console.log(formateurOptions)
            console.log(di)
        })
        if (formateur.length === 0) {
            getFormateurByModule(di);
        }

    }
    function getFormateurByModule() {
        
        axios.get(`http://localhost/AlyfPlaningBack/admin/formateurByModule/${moduleSelected.idm}`).then(response => {
            setFormateurs(response.data)
            console.log('formateur options :')
            console.log(response.data)
            if (formateurs.length === 0 || moduleHasChanged === true) {
                if (f === 1) setF(0)
                 if (f === 0) setF(1)
            }
        })
    }
    function getDbModules() {

        axios.get(`http://localhost/AlyfPlaningBack/admin/modulesInFormation/${id}`).then(response => {
            setDbModule(response.data);

            if (dbModule.length === 0) {
                setS(0);
            } else {

                setDbModuleIsFilled(true);
            }
        })
    }
    function getDbModulesInPromo() {

        axios.get(`http://localhost/AlyfPlaningBack/admin/modulesInPromo/${idp}`).then(response => {
            setPromoDbModule(response.data);
            console.log('promoDbModule :')
            console.log(promoDbModule)
            if (dbModule.length === 0) {
                if (pm === 0) setPm(1)
                if (pm === 1) setPm(0)
            } else {

                setDbModulePromoIsFilled(true);
            }
        })
    }
    function getOrganisme() {
        axios.get('http://localhost/AlyfPlaningBack/admin/organismes').then(response => {

            setOrga(response.data);
            if (orga.length === 0) {
                if (t === 0) setT(1);
                if (t === 1) setT(0);
            }
        })
    }
    function getFormation() {
        axios.get('http://localhost/AlyfPlaningBack/admin/formations').then(response => {

            setForma(response.data);
            if (forma.length === 0) {
                if (t === 0) setT(1);
                if (t === 1) setT(0);
            }
        })
    }

    let formaOptions = forma.map(function (ele) {
        return { value: ele.id_formation, label: ele.libelle }
    })
    let orgaOptions = orga.map(function (ele) {
        return { value: ele.id_visiteur, label: "Nom de l'agence : " + ele.nom_agence + " - Ville de l'agence : " + ele.ville_agence, city: ele.ville_agence }
    })
    let moduleOptions;
    if(dbModulePromoIsFilled===false){
    moduleOptions = dbModule.map(function (ele) {
        return { value: ele.id_module, label: ele.moduel }
    })
  }else{
    moduleOptions = promoDbModule.map(function (ele) {
      return { value: ele.iden, label: ele.module, idm:ele.id_module }
  })
  }
    /*let formateurOptions;
    if (formateurs.length !== 0) {
        formateurOptions = formateurs.map(function (ele) {
            return { value: ele.id_formateur, label: ele.nom_formateur + " " + ele.prenom_formateur }
        })
    }*/
    const customStyles = {
        control: base => ({
            ...base,
            height: 46,
            minHeight: 35
        })
    };
    const fillPlaning = () => {
        const first = {
            module: moduleSelected.value,
            dateDebbut: dateDebut,
            dateFiin: dateFin,

            formateur: formateurSelected.value,
        }
        setPlaning(planing => [...planing, first]);
        setDateDebut("");
        setDateFin("");
        setModuleSelected([]);
        setFormateurSelected([]);
    }
    function bubu() {
        console.log("planing : ")
        console.log(planing)
        let lastDate = planing[0].dateFiin;
        let firstDate = planing[0].dateDebbut;
        planing.forEach(element => {
            let tmp = element.dateDebbut;
            if (firstDate >= tmp) {
                firstDate = tmp;
            }
        });
        planing.forEach(element => {
            let tmp = element.dateFiin;
            if (lastDate <= tmp) {
                lastDate = tmp;
            }
        });
        const promo = {
            idf: formaSelected.value,
            dateD: firstDate,
            dateF: lastDate,
            ville: orgaSelected.city,
            nomPromo: nomP,
            idv: orgaSelected.value
        }
        axios.post(`http://localhost/AlyfPlaningBack/admin/createPromo`, promo).then(response => {
            axios.post(`http://localhost/AlyfPlaningBack/admin/createPlaning`, planing).then(response => {

            })
        })

    }
    const nomChange = (event) => {
        setNomP(event.target.value);
    }
    return (

        <div class="container">
            <div class="row my-4">
                <div class="col-md-20 mx-auto">
                    <div class="card">
                        <div class="card-body bg-light">
                            <div className="form-group">
                                <label htmlFor="nom" className="form-label mt-4">Choisire la formation</label>
                                <Select styles={customStyles} options={formaOptions} onChange={fromaOnChange} value={formaSelected} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nom" className="form-label mt-4">Choisire l'organimse</label>
                                <Select styles={customStyles} options={orgaOptions} onChange={orgaOnChange} value={orgaSelected} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nom" className="form-label mt-4">Nom de la promotion</label>
                                <input type="text" className='form-control' onChange={nomChange} value={nomP} />
                            </div>
                            {dbModuleIsFilled === true && promoDbModule.length !== 0 ? (
                                /*<table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Module</th>
                                            <th>Date debut</th>
                                            <th>Date fin</th>
                                            <th>Formateur</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>*/
                                /*promoDbModule.map(ele => {

                                            return (
                                                <tr>
                                                    <td>
                                                        <input type="text" className='form-control' value={ele.module} disabled />
                                                    </td>
                                                    <td>
                                                        <input type="date" className='form-control' value={ele.date_debut} />
                                                    </td>
                                                    <td>
                                                        <input type="date" className='form-control' value={ele.date_debut} />

                                                    </td>
                                                    <td>

                                                        <div class="input-group mb-3">
                                                            <Select options={formateurOptions} class="input-group-text" />
                                                            <input type="button" className='btn btn-secondary' value="Charger" onClick={() => getFormateurModule(ele.id_module)} />
                                                        </div>

                                                    </td>
                                                    <td></td>
                                                </tr>
                                            )

                                        })*/

                                < div className="form-group" >

                            <div class="container">
                                <div class="row">
                                    <div style={{ width: "25%" }} >
                                        <div className="form-group">
                                            <label className="form-label mt-2">Les modules</label>
                                            <Select name="module" styles={customStyles} options={moduleOptions} onChange={moduleOnChange} value={moduleSelected} />
                                        </div>
                                    </div>


                                    <div style={{ width: "17%" }}>
                                        <div className="form-group">
                                            <label htmlFor="dateDebut" className="form-label mt-2">Date debut</label>
                                            <input type="date" value={dateDebut} onChange={DateDebutChange} className="form-control" id="dateDebut" name="dateDebut" />
                                        </div>
                                    </div>
                                    <div style={{ width: "17%" }}>
                                        <div className="form-group">
                                            <label htmlFor="dateFin" className="form-label mt-2">Date fin</label>
                                            <input type="date" value={dateFin} onChange={DateFinOnChange} className="form-control" id="dateFin" name="dateFin" />
                                        </div>
                                    </div>
                                    <div style={{ width: "24%" }}>
                                        <div className="form-group">
                                            <label htmlFor="nom" className="form-label mt-2">Formateur</label>
                                            <Select styles={customStyles} options={formateurOptions} onChange={formateurOnChange} value={formateurSelected} name="formateur" />
                                        </div>
                                    </div>
                                    <div style={{ width: "17%" }}>
                                        <div className="form-group">
                                            <label htmlFor="nom" className="form-label mt-4"></label>
                                            <center><input type="submit" onClick={fillPlaning} className="btn btn-outline-success btn-lg" style={{ height: '46px' }} value="Valider" /></center>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                 

                ) : dbModuleIsFilled === false ? (
                <p>Selectionné une formation</p>
                ) : dbModuleIsFilled === true && dbModule.length === 0 ? (
                <p>Selectionné une formation qui contient des modules</p>
                ) : (
                <p>rgrrrgr</p>
                )

                            }



                <div className="form-group form-check">

                </div>
                <center><button type="submit" onClick={bubu} className="btn btn-outline-success btn-lg" >Terminer</button></center>



            </div>
        </div>
                </div >
            </div >
        </div >
    )
}