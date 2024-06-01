import { useEffect, useRef, useState } from 'react'
import './Recep.css'
import { getPatients, getPatientsAlta, updateStatus } from '../../assets/ApiBack'
import ToastAlert from '../../components/Common/ToastAlert'
import AltaList from '../../components/Layout/AltaList'
import Loader from '../../components/Common/Loader'
import ItenPatient from '../../components/Layout/ItenPatient'

export default function Recep() {
    // console.log(JSON.parse(localStorage.getItem('User')))
    const [patients, setPatients] = useState(null)
    const [altaPatients, setAltaPatients] = useState(null)
    const [alert, setAlert] = useState(false)
    const timeoutId = useRef(null)

    useEffect(() => { getData(), setInterval(() => { getData() }, [60000]) }, [])

    async function getData() {
        try {
            const [response, resAltaPatients] = await Promise.all([getPatients(), getPatientsAlta()])
            const ordered = response.patients.sort((a, b) => a.box.slice(2) - b.box.slice(2))
            setPatients(ordered)

            const altaPatientss = resAltaPatients.altaPatients.filter(element => !element.active)
            const altaPatientsOrdered = altaPatientss.sort((a, b) => new Date(b.timeArchive) - new Date(a.timeArchive))
            setAltaPatients(altaPatientsOrdered)

        } catch (error) {
            console.error(error);
            setAlert({ type: 'error', title: 'Erro', text: error.message })
        } finally {
            setTimeout(() => setAlert(null), 4000);
        }
    }

    async function changeStatus(_id, stats) {
        if (timeoutId.current) clearTimeout(timeoutId.current)
        setAlert(null)
        if (window.confirm('Você realmente alterar o status do paciente ?')) { }
        else return
        try {
            const response = await updateStatus(_id, stats)
            getData()
            setAlert({ type: 'success', title: 'Sucesso', text: 'Status atualizado com sucesso!' })
        } catch (error) {
            console.error(error)
            setAlert({ type: 'error', title: 'Erro', text: error.message })
        } finally {
            timeoutId.current = setTimeout(() => setAlert(null), 4000);
        }
    }

    return (
        <div className='recep'>
            <div className="legends">
                <span>Box</span>
                <span>Nome</span>
                <span>Plano</span>
                <span>Status</span>
                <span>Quarto</span>
            </div>
            {patients && patients.length === 0 && <h3 className='avisoTitle'>Ainda não há pacientes cadastrados!</h3>}
            {!patients && <Loader />}
            <ul className='list'>
                {patients && patients.map(element => <ItenPatient key={element._id} data={element} func={{ changeStatus }} />)}
            </ul>
            {alert && <ToastAlert data={alert} />}
            <AltaList data={altaPatients} />

        </div>
    )
}