import Select from 'react-select'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function ListModule() {
    const { idp } = useParams();
    const [dbForma, setDbForma] = useState([]);
    const [nomPromo, setNomPromo] = useState([]);
    const [formatSelected, setFormatSelected] = useState([]);
    const [dbOrga, setDbOrga] = useState([]);
    const [format, setFormat] = useState([]);
    const [dateDebut, setDateDebut] = useState('');
    const [dateD, setDateD] = useState('');
    const [dateF, setDateF] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [nomP, setNomP] = useState('');
    const [orga, setOrga] = useState([]);
    const [forma, setForma] = useState([]);
    const [formateurs, setFormateurs] = useState([]);
    const [dbModule, setDbModule] = useState([]);
    const [module, setModule] = useState([]);
    const [formaSelected, setFormaSelected] = useState([]);
    const [orgaSelected, setOrgaSelected] = useState([]);
    const [moduleSelected, setModuleSelected] = useState([]);
    const [modulSelected, setModulSelected] = useState([]);
    const [formateurSelected, setFormateurSelected] = useState([]);
    const [planing, setPlaning] = useState([]);
    const [moduleHasChanged, setModuleHasChanged] = useState(false);
    const [t, setT] = useState(0);
    const [s, setS] = useState(0);
    const [n, setN] = useState(0);
    const [m, setM] = useState(0);
    const [f, setF] = useState(0);
    const [r, setR] = useState(0);
    const [id, setId] = useState();
    const [dbModuleIsFilled, setDbModuleIsFilled] = useState(false);


    useEffect(() => {
        getOrganisme();
        getFormation();
        getDbModules();
        getFormateurByModule();
        getDbFormation();
        getDbOrga();
        getPromo();

    }, [r]);
    useEffect(() => {
        if (f === 1) {
            formateurByModule();
            getFormateurByModule();
        }
    }, [f])
    //load info
    function getDbFormation() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/getDbFormation/${idp}`).then(function (response) {
            setDbForma(response.data)
            if (dbForma.length === 0) {
                setR(1);
                if (t === 0) setT(1);
                if (t === 1) setT(0);
            } else {
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

        })
    }
    const newModules = () => {
        setN(1);
    }
    const closeModules = () => {
        setN(0);
    }
    function getDbOrga() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/getDbOrga/${idp}`).then(function (response) {
            setDbOrga(response.data)
            if (dbOrga.length === 0) {
                if (t === 0) setT(1);
                if (t === 1) setT(0);
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
    const DateDChange = (event) => {
        setDateD(event.target.value);
    };
    const DateFChange = (event) => {
        setDateF(event.target.value);
    };
    const DateFinOnChange = (event) => {
        setDateFin(event.target.value);
    };
    useEffect(() => {
        console.log('useeffect module')
        getModules();
    }, [m])
    function getModules() {

        axios.get(`http://localhost/AlyfPlaningBack/admin/modulesInFormation/${id}`).then(response => {
            setModule(response.data);

            if (module.length === 0) {
                if (m === 0) setM(1);
                if (m === 1) setM(0);
                console.log('hhhhh')
            } else {
                console.log('gagagag')
            }
        })
    }
    const moduleOnChange = (options) => {
        setModuleSelected(options);
        getFormateurByModule();
        const hula = {
            value: options.idf,
            label: options.formateur
        }

        setFormateurSelected(hula)
        setDateDebut(options.dd)
        setDateFin(options.df)
        setModuleHasChanged(true);
    };
    const modulOnChange = (options) => {
        setModulSelected(options);
        formateurByModule();

        setModuleHasChanged(true);
    };
    const formateurOnChange = (options) => {
        setFormateurSelected(options);

    };
    const formatOnChange = (options) => {
        setFormatSelected(options);

    };

    function getFormateurByModule() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/formateurByModule/${moduleSelected.idm}`).then(response => {
            setFormateurs(response.data)
            if (formateurs.length === 0 || moduleHasChanged === true) {

                if (f === 1) setF(0)
                if (f === 0) setF(1)
            }

        })
    }
    //hna
    function formateurByModule() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/formateurByModule/${modulSelected.value}`).then(response => {
            setFormat(response.data)
            if (format.length === 0 || moduleHasChanged === true) {

                if (f === 1) setF(0)
                if (f === 0) setF(1)
            }
            console.log("ffffff");
            console.log(format);

        })
    }
    function getDbModules() {
        //hna
        axios.get(`http://localhost/AlyfPlaningBack/admin/modulesInPromo/${idp}`).then(response => {
            setDbModule(response.data);

            if (dbModule.length === 0) {
                if (r === 1) setR(0);
                if (r === 0) setR(1);
                setS(0);
            } else {
                setDbModuleIsFilled(true);
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
    let moduleOptions = dbModule.map(function (ele) {
        return { value: ele.iden, label: ele.module + "-" + ele.date_debut, idm: ele.id_module, dd: ele.date_debut, df: ele.date_fin, idf: ele.id_formateur, formateur: ele.formateur }
    })
    let modulesOptions = module.map(function (ele) {
        return { value: ele.id_module, label: ele.nom_module }
    })
    let formateurOptions;
    if (formateurs.length !== 0) {
        formateurOptions = formateurs.map(function (ele) {
            return { value: ele.id_formateur, label: ele.nom_formateur + " " + ele.prenom_formateur }
        })
    }
    let formatOptions;
    if (format.length !== 0) {
        formatOptions = format.map(function (ele) {
            return { value: ele.id_formateur, label: ele.nom_formateur + " " + ele.prenom_formateur }
        })
    }
    const customStyles = {
        control: base => ({
            ...base,
            height: 46,
            minHeight: 35
        })
    };
    const addNew = () => {
        //setN(0);

        let tmp = dbModule[0].iden;
        dbModule.forEach(element => {
            if (element.iden >= tmp) {
                tmp = element.iden;
            }
        });
        tmp = tmp + 1;

        const first = {
            id_module: modulSelected.value,
            date_debut: dateD,
            date_fin: dateF,
            module: modulSelected.label,
            id_formateur: formatSelected.value,
            formateur: formatSelected.label,
            iden: tmp,
        }
        setDbModule(dbModule => [...dbModule, first]);

        setDateD("");
        setDateF("");
        setModulSelected([]);
        setFormatSelected([]);

    }
    const fillPlaning = () => {
        /* const first = {
             module: moduleSelected.value,
             dateDebbut: dateDebut,
             dateFiin: dateFin,
 
             formateur: formateurSelected.value,
         }
         /*setPlaning(planing => [...planing, first]);
         /*setDateDebut("");
         setDateFin("");
         setModuleSelected([]);
         setFormateurSelected([]);*/

        dbModule.forEach(ele => {
            if (ele.iden === moduleSelected.value) {
                ele.date_debut = dateDebut;
                ele.date_fin = dateFin;
                ele.id_formateur = formateurSelected.value;
                ele.formateur = formateurSelected.label;
            }

        });
        console.log("dbModule :")
        console.log(dbModule)
        setDateDebut("");
        setDateFin("");
        setModuleSelected([]);
        setFormateurSelected([]);
    }
    function bubu() {
        console.log("bubu")
        console.log(dbModule)
        
        let lastDate = dbModule[0].date_fin;
        let firstDate = dbModule[0].date_debut;
        dbModule.forEach(element => {
            let tmp = element.date_debut;
            if (firstDate >= tmp) {
                firstDate = tmp;
            }
        });
        dbModule.forEach(element => {
            let tmp = element.date_fin;
            if (lastDate <= tmp) {
                lastDate = tmp;
            }
        });
        
        
        const promo = {
            idf: formaSelected[0].value,
            dateD: firstDate,
            dateF: lastDate,
            ville: orgaSelected[0].city,
            nomPromo: nomP,
            idv: orgaSelected[0].value,
        }
        console.log("promo")
        console.log(promo)
        axios.post(`http://localhost/AlyfPlaningBack/admin/updatePromo/${idp}`, promo).then(response => {
            
           axios.post(`http://localhost/AlyfPlaningBack/admin/updatePlaning/${idp}`, dbModule).then(response => {
            console.log(response.data)
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
                            {dbModuleIsFilled === true && dbModule.length !== 0 ? (
                                <div className="form-group" >

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

                                    {n === 0 ? (<button className='btn btn-primary' onClick={newModules} style={{ borderRadius: "0px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                                        </svg>{" "}Ajouter des modules
                                    </button>) : (
                                        <button className='btn' onClick={closeModules} style={{ borderRadius: "0px", backgroundColor: "#bee0ec" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                                            </svg>{" "}Ajouter des modules
                                        </button>
                                    )}
                                    {n === 1 ? (
                                        //<div className='form-group'>
                                        <div className='container'>
                                            <div className='row' style={{ backgroundColor: "#bee0ec" }}>

                                                <div style={{ width: "24%" }}>
                                                    <div className='form-group'>
                                                        <label htmlFor="nom" className="form-label mt-2">Module</label>
                                                        <Select styles={customStyles} placeholder='choisir module :' options={modulesOptions} value={modulSelected} onChange={modulOnChange} />
                                                    </div>
                                                </div>
                                                <div style={{ width: "17%" }}>
                                                    <div className='form-group'>
                                                        <label htmlFor="dateD" className="form-label mt-2">Date debut</label>
                                                        <input type="date" value={dateD} onChange={DateDChange} className="form-control" id="dateD" name="dateD" />
                                                    </div>
                                                </div>
                                                <div style={{ width: "17%" }}>
                                                    <div className='form-group'>
                                                        <label htmlFor="dateF" className="form-label mt-2">Date fin</label>
                                                        <input type="date" value={dateF} onChange={DateFChange} className="form-control" id="dateF" name="dateF" />
                                                    </div>
                                                </div>
                                                <div style={{ width: "25%" }}>
                                                    <div className='form-group'>
                                                        <label htmlFor="dateDebut" className="form-label mt-2">Formateur</label>
                                                        <Select styles={customStyles} options={formatOptions} vallue={formatSelected} onChange={formatOnChange} />
                                                    </div>
                                                </div>
                                                <div style={{ width: "17%" }}>
                                                    <div className="form-group">
                                                        <label htmlFor="nom" className="form-label mt-4"></label>
                                                        <center><input type="submit" onClick={addNew} className="btn btn-outline-success btn-lg" style={{ height: '46px' }} value="Valider" /></center>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        //</div>
                                    ) : (
                                        <p></p>
                                    )

                                    }
                                </div>

                            ) : dbModuleIsFilled === false ? (
                                /*<p>Selectionné une formation qui contient des modules</p>*/
                                <p>Selectionné une formation</p>
                            ) : dbModuleIsFilled === true && dbModule.length === 0 ? (
                                <p>Selectionné une formation qui contient des modules</p>
                            ) : (
                                <p></p>
                            )

                            }



                            <div className="form-group form-check">

                            </div>
                            <center><button type="submit" onClick={bubu} className="btn btn-outline-success btn-lg" >Terminer</button></center>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}