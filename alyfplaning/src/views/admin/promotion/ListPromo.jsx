import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';
import {Link } from 'react-router-dom';
import Select from 'react-select';


import { useState, useEffect } from 'react';
import axios from 'axios';


export default function ListModule() {
    const [stagiaire, setStagiaire] = useState([]);
    const [t, setT] = useState(0);
    const [statusSelected, setStatusSelected] = useState([]);
    const [s, setS] = useState(0);
    const [e, setE] = useState(0);
    const [d, setD] = useState(0);
    useEffect(() => {
        getAll();
        let tmp =[
            {
                value : "4",
                label : "Promotion programmé"
            },
        ]
        setStatusSelected(tmp);
    }, [t]);
    useEffect(() => {
        if(s===1)
        getArchive();
    }, [s]);
    useEffect(() => {
        if(e===1)
        getEnCours();
    }, [e]);
    useEffect(() => {
        if(d===1)
        getTerminer();
    }, [d]);
    function getArchive() {
        axios.get('http://localhost/AlyfPlaningBack/admin/promosArchive').then(response => {
            console.log("in")
            console.log(response.data)
            setStagiaire(response.data);
            if (stagiaire.length === 0) {
                console.log('empty');
                if (s === 0) setS(1);
                if (s === 1) setS(0);
            } else {
                console.log('archive : ')
                console.log(stagiaire)
            }
        })


    }
    function getEnCours() {
        axios.get('http://localhost/AlyfPlaningBack/admin/promosEnCours').then(response => {
            console.log("in")
            console.log(response.data)
            setStagiaire(response.data);
            if (stagiaire.length === 0) {
                console.log('empty');
                if (e === 0) setE(1);
                if (e === 1) setE(0);
            } else {
                console.log('archive : ')
                console.log(stagiaire)
            }
        })


    }
    function getTerminer() {
        axios.get('http://localhost/AlyfPlaningBack/admin/promosTermine').then(response => {
            console.log("in")
            console.log(response.data)
            setStagiaire(response.data);
            if (stagiaire.length === 0) {
                console.log('empty');
                if (d === 0) setD(1);
                if (d === 1) setD(0);
            } else {
                console.log('archive : ')
                console.log(stagiaire)
            }
        })


    }
    function getAll() {
        axios.get('http://localhost/AlyfPlaningBack/admin/promotions').then(response => {
            console.log("in")
            console.log(response.data)
            setStagiaire(response.data);
            if (stagiaire.length === 0) {
                console.log('empty');
                if (t === 0) setT(1);
                if (t === 1) setT(0);
            } else {
                console.log('stagiaire : ')
                console.log(stagiaire)
            }
        })


    }

    const deleteFunction = (id) => {
        axios.post(`http://localhost/AlyfPlaningBack/admin/supprimerPromo/${id}`).then(response => {
            getAll();
        })
    }
    const archiveFunction = (id) => {
        axios.post(`http://localhost/AlyfPlaningBack/admin/archivePromo/${id}`).then(response => {
            getAll();
        })
    }
    let trieOptions =[
        {
            value : "1",
            label : "Promotion archivé"
        },
        {
            value : "2",
            label : "Promotion en cours"
        },
        {
            value : "3",
            label : "Promotion terminer"
        },
        {
            value : "4",
            label : "Promotion programmé"
        },
    ]
    const handleStatusChange = (options)=>{
        setStatusSelected(options)
        
        if(options.value==="1") getArchive()
        else if(options.value==="4") getAll()
        else if(options.value==="2") getEnCours()
        else if(options.value==="3") getTerminer()
    }

    return (

        <div class="container">
            <div class="row my-4">
                <div class="col-md-20 mx-auto">
                    <div class="card">
                        <div class="card-body bg-light">
                        <div className='row'>
                                <div style={{ width: "auto" }}>
                            <New btnName="Nouvelle promotion" btnLink={'/admin/promotion/create'} />
                            </div>
                            <div style={{ width: "50%" }}>
                                    
                                        <Select placeholder="Trier par :" options={trieOptions} onChange={handleStatusChange} value={statusSelected}/>
                                    
                                </div>
                                </div>
                            <p></p>
                            <table class="table table-striped-columns" >
                                <thead >
                                    <tr style={{ textAlign: 'center' }}>
                                        <th scope="col">Nom de Promotion</th>
                                        <th scope="col">Nom de formation</th>
                                        <th scope="col">Nom de l'agence</th>
                                        <th scope="col">Ville de l'agence</th>
                                        <th scope="col">L'organisme</th>

                                        <th scope="col" >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stagiaire.map(ele => {
                                            return (
                                                <tr>
                                                    <td>{ele.nom_promotion}</td>
                                                    <td>{ele.libelle}</td>
                                                    <td>{ele.nom_agence}</td>
                                                    <td>{ele.lieu}</td>
                                                    <td>{ele.nom_organisme}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Edit buttonURL={`/admin/promotion/modifier/${ele.id_promotion}`} />
                                                        {" "}
                                                        <button className="btn btn-danger" onClick={() => deleteFunction(ele.id_promotion)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                        </svg>
                                                        </button>
                                                       
                                                        {" "}
                                                        <button className="btn btn-secondary" onClick={() => archiveFunction(ele.id_promotion)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                                                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                                                            </svg>
                                                        </button>
                                                        {" "}
                                                        <Link className='btn btn-success' to={`/admin/promotion/visualiser/${ele.id_promotion}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                            </svg>
                                                        </Link>
                                                    </td>
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
