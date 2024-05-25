import './Emerg.css'
import { useEffect, useState } from 'react'
import { getPatients, getPatientsAlta } from '../../assets/ApiBack'
import CardPatient from '../../components/Layout/CardPatient'
import ToastAlert from '../../components/Common/ToastAlert'
import Model from '../../components/Common/Model'
import AltaList from '../../components/Layout/AltaList'
import Loader from '../../components/Common/Loader'
import Dashboard from '../../components/Layout/Dashboard'

export default function Emerg() {

    const [model, setModel] = useState(false)
    const [patients, setPatients] = useState(null)
    const [altaPatients, setAltaPatients] = useState(null)
    const [todayPatients, setTodayPatients] = useState(null)
    const [alert, setAlert] = useState(false)
    const [edit, setEdit] = useState(false)
    const [patient, setPatient] = useState(null)

    useEffect(() => { getData(), getAltaPatients(), setInterval(() => { getData(), getAltaPatients() }, [60000]) }, [])

    async function getData() {
        try {
            const response = await getPatients()
            const ordered = response.patients.sort((a, b) => a.box.slice(2) - b.box.slice(2))
            setPatients(ordered)
        } catch (error) {
            console.log(error)
            setAlert({ type: 'error', title: 'Erro', text: error.message })
            setTimeout(() => { setAlert(null) }, 4000);
        }
    }
    async function getAltaPatients() {
        try {
            const response = await getPatientsAlta()
            const todayPatients = response.altaPatients.filter(element => new Date(element.timeCreate).getDate() === new Date().getDate())
            const altaPatients = response.altaPatients.filter(element => !element.active)
            setAltaPatients(altaPatients)
            setTodayPatients(todayPatients)


        } catch (error) {
            console.error(error)
            setAlert({ type: 'error', title: 'Altas e Tempo Médio', text: error.message })
            setTimeout(() => { setAlert(null) }, 4000);
        }
    }

    return (
        <div className='emerg'>
            {todayPatients && <Dashboard data={todayPatients} />}
            <ul className='list'>
                {patients && patients.map(element => <CardPatient key={element._id} data={element} func={{ getData, setAlert, setEdit, setModel, setPatient }} />)}
            </ul>
            {!patients && <Loader />}
            {patients && patients.length === 0 && <h3 className='emerg__notPatients'>Ainda não há pacientes cadastrados!</h3>}
            <button className='btn__include' title='Incluir Paciente' onClick={() => setModel(true)}><i className="fa-solid fa-circle-plus"></i></button>
            {model && <Model data={patient} edit={edit} func={{ getData, setAlert, setModel, setEdit }} />}
            {alert && <ToastAlert data={alert} />}
            {altaPatients && <AltaList data={altaPatients} />}
        </div>
    )
}