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
    const [allActivePatients, setAllActivePatients] = useState()
    const [patients, setPatients] = useState(null)
    const [altaPatients, setAltaPatients] = useState(null)
    const [todayPatients, setTodayPatients] = useState(null)
    const [alert, setAlert] = useState(false)
    const [edit, setEdit] = useState(false)
    const [patient, setPatient] = useState(null)
    const [active, setActive] = useState('todos')

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

            // Tratamento para DashBoard
            const todayPatients = resAltaPatients.altaPatients.filter(element => new Date(element.dataTime.timeCreate).getDate() === new Date().getDate())
            setTodayPatients(todayPatients)

            // Tratamento para histórico de altas
            const altaPatients = resAltaPatients.altaPatients.filter(element => !element.dataActive.activeMed)
            const altaPatientsOrdered = altaPatients.sort((a, b) => new Date(b.dataTime.timeArchive) - new Date(a.dataTime.timeArchive))
            setAltaPatients(altaPatientsOrdered) // paciente de alte alta para histórico de alta
        } catch (error) {
            console.log(error)
            setAlert({ type: 'error', title: 'Erro', text: error.message })
            setTimeout(() => { setAlert(null) }, 4000);
        }
    }

    return (
        <div className='emerg'>
            <header className='emerg__header'>
                {JSON.parse(localStorage.getItem('User'))?.roles === 'adm' ? <a href='/painel'>SeeBox</a> : <a>SeeBox</a>}

                <button id={active === 'todos' && 'active'} onClick={() => setActive('todos')}>Todos</button>
                <button id={active === 'análise' && 'active'} onClick={() => setActive('análise')}>Análise</button>
                <button id={active === 'alta' && 'active'} onClick={() => setActive('alta')}>Aguard. Alta</button>
                <button id={active === 'internado' && 'active'} onClick={() => setActive('internado')}>Internados</button>
                <button onClick={() => setModel(true)}><i className="fa-solid fa-circle-plus"></i> Incluir Paciente</button>
            </header>
            {todayPatients && <Dashboard data={todayPatients} />}
            {!patients && <Loader />}
            {patients && patients.length === 0 && <h3 className='avisoTitle'>Ainda não há pacientes cadastrados!</h3>}
            <ul className='list'>
                {patients && patients.map(element => <CardPatient key={element._id} data={element} func={{ getData, setAlert, setEdit, setModel, setPatient }} />)}
            </ul>


            {model && <Model data={patient} edit={edit} func={{ getData, setAlert, setModel, setEdit }} />}
            {alert && <ToastAlert data={alert} />}
            {altaPatients && <AltaList data={altaPatients} />}
            <button className='btn__include' onClick={() => setModel(true)}><i className="fa-solid fa-circle-plus"></i></button>
        </div>
    )
}