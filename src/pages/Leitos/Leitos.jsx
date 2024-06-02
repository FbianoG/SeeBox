import { useEffect, useState } from 'react'
import './Leitos.css'
import { getPatients, uptadeRoom } from '../../assets/ApiBack'
import ToastAlert from '../../components/Common/ToastAlert'
import AltaList from '../../components/Layout/AltaList'
import Loader from '../../components/Common/Loader'

export default function Leitos() {

    const [patients, setPatients] = useState(null)
    const [alert, setAlert] = useState(false)
    const [room, setRoom] = useState(null)

    useEffect(() => { getData() }, [])

    async function getData() {
        try {
            const response = await getPatients('Med')
            const ordered = response.patients.sort((a, b) => a.box.slice(2) - b.box.slice(2))
            setPatients(ordered)
        } catch (error) {
            console.error(error);
            setAlert({ type: 'error', title: 'Erro', text: error.message })
        } finally {
            setTimeout(() => setAlert(null), 4000);
        }
    }

    async function changeRoom(_id) {
        try {
            const response = await uptadeRoom(_id, room)
            getData()
            setRoom(null)
            setAlert({ type: 'success', title: 'Sucesso', text: response.message })
        } catch (error) {
            setAlert({ type: 'error', title: 'Erro', text: error.message })
        } finally {
            setTimeout(() => { setAlert(false) }, 4000);
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
                {patients && patients.map(element => (
                    <li key={element._id} className='item'>
                        <span className='item__box'>{element.box.slice(0, 1) == 'm' ? 'md' : element.box.slice(2)}</span>
                        <div className="item__data">
                            <p className='item__data-name'>{element.name}</p>
                            <p className='item__data-age'>{element.age} Anos</p>
                        </div>
                        <p className='item__plan'>{element.plan}</p>
                        <div className="item__status">
                            <p className={element.stats}>{element.stats === 'alta' ? 'Aguard. Alta' : element.stats}</p>
                        </div>
                        <input type='text' className='item__room input' defaultValue={element.room} onChange={(e) => setRoom(e.target.value)} />
                        <div className="item__config">
                            <button onClick={() => changeRoom(element._id, room)} title='Enviar Leito'><i className="fa-solid fa-angles-right"></i></button>
                        </div>
                    </li>
                ))}
            </ul>
            {alert && <ToastAlert data={alert} />}
            <AltaList />
        </div>
    )
}