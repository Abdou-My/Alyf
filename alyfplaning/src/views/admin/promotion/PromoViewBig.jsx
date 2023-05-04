import React from "react";
import { Calendar, Day, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const localizer = momentLocalizer(moment);

export default function App() {
    const [promo, setPromo] = useState([]);
    const [t, setT] = useState(0);
    const { idp } = useParams();

    useEffect(() => {
        getAll();
    }, [t]);

    function getAll() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/planing/${idp}`).then(response => {
            console.log("in")
            console.log(response.data)
            setPromo(response.data);
            if (promo.length === 0) {
                console.log('empty');
                if (t === 0) setT(1);
                if (t === 1) setT(0);
            } else {
                console.log('stagiaire : ')
                console.log(promo)
            }
        })


    }
    let myEventsList = promo.map(function(ele){
        return{start: ele.date_debut, end: ele.date_fin, title: ele.nom_module, color: "red"}
    })
    return (
        <div class="container">
            <div class="row my-4">
                <div class="col-md-20 mx-auto">
                    <div class="card">
                        <div class="card-body bg-light">
        <div class="container">
                        <div className="App">
                            <Calendar
                                localizer={localizer}
                                events={myEventsList}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                                
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}