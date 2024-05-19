import { useEffect, useRef, useState } from 'react'
import './Recep.css'
import { getPatients, updateStatus } from '../../assets/ApiBack'
import ToastAlert from '../../components/Common/ToastAlert'
import AltaList from '../../components/Layout/AltaList'
import Loader from '../../components/Common/Loader'

export default function Recep() {

    const [patients, setPatients] = useState(null)
    const [alert, setAlert] = useState(false)
    const timeoutId = useRef(null)

    useEffect(() => { getData() }, [])

    async function getData() {
        try {
            const response = await getPatients()
            const ordered = response.patients.sort((a, b) => a.box.slice(2) - b.box.slice(2))
            setPatients(ordered)
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
            <ul className='list'>
                {!patients && <Loader />}
                {patients && patients.length === 0 && <h3>Ainda não há pacientes cadastrados!</h3>}
                {patients && patients.map(element => (
                    <li key={element._id} className='item'>
                        <span className='item__box'>{element.box.slice(0, 1) == 'm' ? 'md' : element.box.slice(2)}</span>
                        <div className="item__data">
                            <p className='item__data-name'>{element.name}</p>
                            <p className='item__data-age'>{element.age} Anos</p>
                        </div>
                        <p className='item__plan'>{element.plan}</p>
                        <div className="item__status">
                            <span className={element.stats}></span>
                            <p>{element.stats}</p>
                        </div>
                        <p className='item__room'>{element.room}</p>
                        <div className="item__config">
                            <i className="fa-solid fa-sliders"></i>
                            <div className="item__config-options">
                                <span onClick={() => changeStatus(element._id, 'indefinido')}>Indefinido</span>
                                <span onClick={() => changeStatus(element._id, 'análise')}>Análise</span>
                                <span onClick={() => changeStatus(element._id, 'alta')}>Sol. Alta</span>
                                <span onClick={() => changeStatus(element._id, 'internado')}>Internado</span>
                                <span onClick={() => changeStatus(element._id, 'relatório')}>Relatório</span>
                                <span onClick={() => changeStatus(element._id, 'carência')}>Carência</span>
                                <span onClick={() => changeStatus(element._id, 'transferência')}>Transferência</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {alert && <ToastAlert data={alert} />}
            <AltaList />

        </div>
    )
}