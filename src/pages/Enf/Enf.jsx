import './Enf.css'
import { useEffect, useState } from 'react'
import { getPatients, getPatientsAlta } from '../../assets/ApiBack'
import CardPatientEnf from '../../components/Layout/CardPatientEnf'

import ToastAlert from '../../components/Common/ToastAlert'
import Model from '../../components/Common/Model'
import AltaList from '../../components/Layout/AltaList'
import Loader from '../../components/Common/Loader'
import Dashboard from '../../components/Layout/Dashboard'

export default function Emerg() {

    const [model, setModel] = useState(false) // Modal para editar paciente
    const [edit, setEdit] = useState(false) // Diferenciar se Modal é de editar ou incluir paciente
    const [patient, setPatient] = useState(null) // Paciente selecionado para editar
    const [allActivePatients, setAllActivePatients] = useState() // Pacientes (DataBase) todos os ativos
    const [altaPatients, setAltaPatients] = useState(null) // Pacientes (DataBase) com alta médica
    const [patients, setPatients] = useState(null)  // Pacientes ativos de acordo com filtro do menu
    const [alert, setAlert] = useState(false) // Toast alerta
    const [active, setActive] = useState('todos') // Filtro selecionado no menu

    useEffect(() => { getData(), setInterval(() => { getData() }, [60000]) }, [])

    useEffect(() => {
        if (active === 'todos') setPatients(allActivePatients)
        else if (active === 'análise') setPatients(allActivePatients.filter(element => element.stats === active))
        else if (active === 'internado') setPatients(allActivePatients.filter(element => element.stats === active))
        else if (active === 'alta') setPatients(allActivePatients.filter(element => element.stats === active))
    }, [active, allActivePatients])

    async function getData() {
        try {
            const [activePatients, resAltaPatients] = await Promise.all([getPatients('Med'), getPatientsAlta()])

            // Pacientes ativos médico
            const ordered = activePatients.patients.sort((a, b) => a.box.slice(2) - b.box.slice(2))
            setAllActivePatients(ordered)

            // Tratamento para histórico de altas
            const altaPatients = resAltaPatients.altaPatients.filter(element => !element.dataActive.activeMed)
            const altaPatientsOrdered = altaPatients.sort((a, b) => new Date(b.dataTime.timeArchive) - new Date(a.dataTime.timeArchive))
            setAltaPatients(altaPatientsOrdered)
        } catch (error) {
            console.log(error)
            setAlert({ type: 'error', title: 'Erro', text: error.message })
            setTimeout(() => { setAlert(null) }, 4000);
        }
    }

    const displayNone = {
        display: "none"
    }

    return (
        <div className='emerg'>
            <header className='emerg__header'>
                {JSON.parse(localStorage.getItem('User')).roles === 'adm' ? <a href='/painel'>SeeBox</a> : <a>SeeBox</a>} 
                <button id={active === 'todos' && 'active'} onClick={() => setActive('todos')}>Todos</button>
                <button id={active === 'análise' && 'active'} onClick={() => setActive('análise')}>Análise</button>
                <button id={active === 'alta' && 'active'} onClick={() => setActive('alta')}>Aguard. Alta</button>
                <button id={active === 'internado' && 'active'} onClick={() => setActive('internado')}>Internados</button>
                <button style={displayNone} onClick={() => setModel(true)}><i className="fa-solid fa-circle-plus"></i> Incluir Paciente</button>
            </header>
            {/* {todayPatients && <Dashboard data={todayPatients} />} */}
            {!patients && <Loader />}
            {patients && patients.length === 0 && <h3 className='avisoTitle'>Ainda não há pacientes cadastrados!</h3>}
            <ul className='list'>
                {patients && patients.map(element => <CardPatientEnf key={element._id} data={element} func={{ getData, setAlert, setEdit, setModel, setPatient }} />)}
            </ul>


            {model && <Model data={patient} edit={edit} func={{ getData, setAlert, setModel, setEdit }} />}
            {alert && <ToastAlert data={alert} />}
            {altaPatients && <AltaList data={altaPatients} />}
            <button style={displayNone} className='btn__include' onClick={() => setModel(true)}><i className="fa-solid fa-circle-plus"></i></button>
        </div >
    )




}