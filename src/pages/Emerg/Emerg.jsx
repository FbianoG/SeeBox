import './Emerg.css'
import { useEffect, useState } from 'react'
import { getPatients } from '../../assets/ApiBack'
import CardPatient from '../../components/Layout/CardPatient'
import ToastAlert from '../../components/Common/ToastAlert'
import Model from '../../components/Common/Model'
import AltaList from '../../components/Layout/AltaList'
import Loader from '../../components/Common/Loader'

export default function Emerg() {

    const [model, setModel] = useState(false)
    const [patients, setPatients] = useState(null)
    const [alert, setAlert] = useState(false)
    const [edit, setEdit] = useState(false)
    const [patient, setPatient] = useState(null)

    useEffect(() => { getData(), setInterval(() => { getData() }, [60000]) }, [])

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

    return (
        <div className='emerg'>
            <ul className='list'>
                {!patients && <Loader />}
                {patients && patients.length === 0 && <h3>Ainda não há pacientes cadastrados!</h3>}
                {patients && patients.map(element => <CardPatient key={element._id} data={element} func={{ getData, setAlert, setEdit, setModel, setPatient }} />)}
            </ul>
            <button className='btn__include' onClick={() => setModel(true)}><i className="fa-solid fa-circle-plus"></i></button>
            {model && <Model data={patient} edit={edit} func={{ getData, setAlert, setModel, setEdit }} />}
            {alert && <ToastAlert data={alert} />}
            <AltaList />

        </div>
    )
}