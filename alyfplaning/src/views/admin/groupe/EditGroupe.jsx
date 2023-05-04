import Edit from '../../../components/UI/Edit';
import New from '../../../components/UI/New';
import Delete from '../../../components/UI/Delete';
import Select from 'react-select';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateModule() {
    const { idg } = useParams();
    const [drata, setDrata] = useState([]);
    const [changed, setChanged] = useState(0);
    const nav = useNavigate();
    const [promoSelected, setPromoSelected] = useState({});
    const [stagSelected, setStagSelected] = useState([]);
    const [promo, setPromo] = useState([]);
    const [dbPromo, setDbPromo] = useState([]);
    const [stag, setStag] = useState([]);
    const [dbStag, setDbStag] = useState([]);
    const [t, setT] = useState(0);
    const [s, setS] = useState(0);
    const [gt, setGt] = useState();
    let prom;
    
    useEffect(() => {
        getPromotions();
    }, [t]);
 

    useEffect(() => {
        getStagiaires();
    }, [s]);

    const customStyles = {
        control: base => ({
            ...base,
            height: 46,
            minHeight: 35
        })
    };


    function getPromotions() {
        axios.get('http://localhost/AlyfPlaningBack/admin/promotions').then(response => {

            setPromo(response.data);


            axios.get(`http://localhost/AlyfPlaningBack/admin/promoByIdg/${idg}`).then(response => {
                setDbPromo(response.data);
            })
        })
        if (dbPromo.length === 0 || promo.length === 0) {
            if (t === 0) setT(1)
            if (t === 1) setT(0)
        }
        let hula = dbPromo.map(function (ele) {
       
        setGt(ele.id_promotion) 

            return { value: ele.id_promotion, label: ele.nom_promotion }
        })
        
        setPromoSelected(hula)
        console.log("gt")
        console.log(gt)
        
        
    }
    function getStagiaires() {
        
        axios.get('http://localhost/AlyfPlaningBack/admin/stagiaires').then(response => {
            setStag(response.data);
            axios.get(`http://localhost/AlyfPlaningBack/admin/stagiairesInGroupe/${idg}`).then(response => {
                setDbStag(response.data)
            })
            let hula = dbStag.map(function (ele) {
                return { value: ele.id_stagiaire, label: ele.nom_stagiaire + " " + ele.prenom_stagiaire }
            })
            setStagSelected(hula)
           
            if (dbPromo.length === 0 || promo.length === 0) {
                if (s === 0) setS(1)
                if (s === 1) setS(0)
            }
        })

    }
    const fromaOnChange = (options) => {
        setPromoSelected(options);
       setGt(options.value)
        

    };
    const stagOnChange = (options) => {
        setStagSelected(options);
      

    };



    const createStagiaire = (event) => {
        event.preventDefault();
       
        
      /*if(changed === 0){
            prom = gt
      }else{
        prom = promoSelected.value
      }*/
      console.log("gt")
      console.log(gt)
      console.log("idg")
      console.log(idg)
      console.log('prom')
      console.log(prom)
        axios.post(`http://localhost/AlyfPlaningBack/admin/editGroupe/${idg}`, gt).then(response => {
            console.log(response.data)
            axios.post(`http://localhost/AlyfPlaningBack/admin/editSinGroupe/${idg}`, stagSelected).then(response => {
                console.log(response.data)
            })
           
            nav("/admin/groupe");
        })

    }

    
    let promoOptions = promo.map(function (ele) {
        return { value: ele.id_promotion, label: ele.nom_promotion }
    })
    let stagiaireOptions = stag.map(function (ele) {
        return { value: ele.id_stagiaire, label: ele.nom_stagiaire + " " + ele.prenom_stagiaire }
    })
    return (

        <div className="container">
            <div className="row my-4">
                <div className="col-md-20 mx-auto">
                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="col-md-10 mx-auto">


                                <div className="form-group">
                                    <label htmlFor="nom" className="form-label mt-4">Choisire la promotion</label>
                                    <Select styles={customStyles} options={promoOptions} onChange={fromaOnChange} value={promoSelected} />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="prenom" className="form-label mt-4">Ajouter les stagiaires</label>
                                    <Select styles={customStyles} options={stagiaireOptions} onChange={stagOnChange} value={stagSelected} isMulti />
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
