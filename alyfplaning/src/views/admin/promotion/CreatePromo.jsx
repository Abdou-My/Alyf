import Select from 'react-select'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



export default function ListModule() {

    const [dateDebut, setDateDebut] = useState('');
    const [iniDateDebut, setIniDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [nomP, setNomP] = useState('');
    const [orga, setOrga] = useState([]);
    const [forma, setForma] = useState([]);
    const [formateurs, setFormateurs] = useState([]);
    const [dbModule, setDbModule] = useState([]);
    const [formaSelected, setFormaSelected] = useState([]);
    const [orgaSelected, setOrgaSelected] = useState([]);
    const [moduleSelected, setModuleSelected] = useState([]);
    const [formateurSelected, setFormateurSelected] = useState([]);
    const [planing, setPlaning] = useState([]);
    const [moduleHasChanged, setModuleHasChanged] = useState(false);
    const [t, setT] = useState(0);
    const nav = useNavigate();
    const [s, setS] = useState(0);
    const [f, setF] = useState(0);
    const [id, setId] = useState();
    const [dbModuleIsFilled, setDbModuleIsFilled] = useState(false);


    useEffect(() => {
        getOrganisme();
        getFormation();
        getDbModules();
        getFormateurByModule();
    }, [t, s, f]);
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

    function getFormateurByModule() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/formateurByModule/${moduleSelected.value}`).then(response => {
            setFormateurs(response.data)
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
        return { value: ele.id_visiteur, label: "Nom de l'agence : " + ele.nom_agence + " - Ville de l'agence : " + ele.ville_agence, city:ele.ville_agence }
    })
    let moduleOptions = dbModule.map(function (ele) {
        return { value: ele.id_module, label: ele.nom_module }
    })
    let formateurOptions;
    if (formateurs.length !== 0) {
        formateurOptions = formateurs.map(function (ele) {
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
            if(firstDate >= tmp){
                firstDate = tmp;
            }
        });
        planing.forEach(element => {
            let tmp = element.dateFiin;
            if(lastDate <= tmp){
                lastDate = tmp;
            }
        });
        const promo = {
            idf: formaSelected.value,
            dateD: firstDate,
            dateF: lastDate,
            ville: orgaSelected.city,
            nomPromo : nomP, 
            idv: orgaSelected.value
        }
        axios.post(`http://localhost/AlyfPlaningBack/admin/createPromo`, promo).then(response => {
            axios.post(`http://localhost/AlyfPlaningBack/admin/createPlaning`, planing).then(response => {

            })
        })
        nav("/admin/promotions");
    }
    const nomChange = (event) =>{
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
                                <input type="text" className='form-control' onChange={nomChange}/>
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