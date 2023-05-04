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
    const [today, setToday] = useState('');
    let mois;
    useEffect(() => {
        getCurrentDate();
        getAll();
    }, [t]);

    function getAll() {
        axios.get(`http://localhost/AlyfPlaningBack/admin/planing/${idp}`).then(response => {
            //console.log("in")
            //console.log(response.data)
            setPromo(response.data);
            if (promo.length === 0) {
                console.log('empty');
                if (t === 0) setT(1);
                if (t === 1) setT(0);
            } else {
                //console.log('stagiaire : ')
                //console.log(promo)
            }
        })


    }
    let myEventsList = promo.map(function (ele) {
        return { start: ele.date_debut, end: ele.date_fin, title: ele.nom_module, color: "red" }
    })
    let months = [
        {
            value: "1",
            label: "Janvier",
            days : 31
        },
        {
            value: "2",
            label: "Février",
            days : 28
        },
        {
            value: "3",
            label: "Mars",
            days : 31
        },
        {
            value: "4",
            label: "Avril",
            days : 30
        },
        {
            value: "5",
            label: "Mai",
            days : 31
        },
        {
            value: "6",
            label: "Juin",
            days : 30
        },
        {
            value: "7",
            label: "Juillet",
            days : 31
        },
        {
            value: "8",
            label: "Août",
            days : 31
        },
        {
            value: "9",
            label: "Septembre",
            days : 30
        },
        {
            value: "10",
            label: "Octobre",
            days : 31
        },
        {
            value: "11",
            label: "Novembre",
            days : 30
        },
        {
            value: "12",
            label: "Décembre",
            days : 31
        },
    ]

    function getCurrentDate(separator = ' / ') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        months.forEach(ele => {
            if (month == ele.value) {
                mois = ele
            }
        });
        return `${date}${separator}${mois.label}${separator}${year}`
    }
    return (
        <div class="container">
            <div class="row my-4">
                <div class="col-md-20 mx-auto">
                    <div class="card">
                        <div class="card-body bg-light">
                            <div class="container">
                                <div className="App">

                                    <table id="calendar">
                                        <caption>{getCurrentDate()}</caption>
                                        <tr class="weekdays">
                                            <th scope="col">Lundi</th>
                                            <th scope="col">Mardi</th>
                                            <th scope="col">Mercredi</th>
                                            <th scope="col">Jeudi</th>
                                            <th scope="col">Vendredi</th>
                                            <th scope="col">Samedi</th>
                                            <th scope="col">Dimanche</th>
                                        </tr>

                                        <tr class="days">
                                            <td class="day other-month">
                                                <div class="date">27</div>
                                            </td>
                                            <td class="day other-month">
                                                <div class="date">28</div>
                                                <div class="event">
                                                    <div class="event-desc">
                                                        HTML 5 lecture with Brad Traversy from Eduonix
                                                    </div>
                                                    <div class="event-time">
                                                        1:00pm to 3:00pm
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="day other-month">
                                                <div class="date">29</div>
                                            </td>
                                            <td class="day other-month">
                                                <div class="date">30</div>
                                            </td>
                                            <td class="day other-month">
                                                <div class="date">31</div>
                                            </td>


                                            <td class="weekend">
                                                <div class="date">1</div>
                                            </td>
                                            <td class="weekend">
                                                <div class="date">2</div>
                                            </td>
                                        </tr>

                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}