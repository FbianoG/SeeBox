import './CardPatient.css'
import { useRef, useState } from 'react';
import { archivePatient } from '../../assets/ApiBack';


export default function CardPatient({ data, func }) {

    const [alta, setAlta] = useState(null)
    const [options, setOptions] = useState()
    const timeoutId = useRef(null)

    async function archive() {
        event.preventDefault()
        if (timeoutId.current) clearTimeout(timeoutId.current)
        try {
            const response = await archivePatient(data._id, alta)
            func.getData()
            func.setAlert({ title: 'Sucesso!', type: 'success', text: response.message })
        } catch (error) {
            console.error(error)
        } finally {
            setAlta(null)
            timeoutId.current = setTimeout(() => func.setAlert(false), 4000)
        }
    }

    return (
        <li className='card' >
            <form onSubmit={archive}>
                <div className="head">
                    <div className="head__data">
                        <h3 className='head__data-name'>{data.name}</h3>
                        <p className="head__data-info">{data.plan}</p>
                        <p className="head__data-info">{data.room}</p>
                        <p className="head__data-info">{data.age} anos</p>
                    </div>
                    <span className="card__head-box">{data.box.slice(0, 1) == 'm' ? 'md' : data.box.slice(2)}</span>
                </div>
                <span className="divider"></span>
                <div className="content">
                    <div className="content__check">
                        <input type="checkbox" id={data._id + '1'} checked={data.data.nota} disabled />
                        <label htmlFor={data._id + '1'} id={data.data.nota == false && 'notChecked'}>Nota</label>
                        <input type="checkbox" id={data._id + '2'} checked={data.data.conc} disabled />
                        <label htmlFor={data._id + '2'} id={data.data.conc == false && 'notChecked'}>Conciliação</label>
                        <input type="checkbox" id={data._id + '3'} checked={data.data.pres} disabled />
                        <label htmlFor={data._id + '3'} id={data.data.pres == false && 'notChecked'}>Prescrição</label>
                        <input type="checkbox" id={data._id + '4'} checked={data.data.exa} disabled />
                        <label htmlFor={data._id + '4'} id={data.data.exa == false && 'notChecked'}>Exames</label>
                        <input type="checkbox" id={data._id + '5'} checked={data.data.tev} disabled />
                        <label htmlFor={data._id + '5'} id={data.data.tev == false && 'notChecked'}>TEV</label>
                        <input type="checkbox" id={data._id + '6'} checked={data.data.int} disabled />
                        <label htmlFor={data._id + '6'} id={data.data.int == false && 'notChecked'}>Internação</label>
                    </div>
                    <textarea spellCheck="false" value={data.data.obs} disabled></textarea>
                </div>
                <div className="footer">
                    <button type='button' onClick={() => { func.setModel(true), func.setEdit(true), func.setPatient(data) }}><i className="fa-solid fa-user-pen"></i></button>
                    <span className='footer__falseBtn' onClick={() => setOptions(true)} onMouseLeave={() => setOptions(false)} ><i className="fa-solid fa-cloud-arrow-up"></i>
                        {options && <div className="footer__options">
                            <button type='submit' onClick={() => setAlta('internado')}>Internado</button>
                            <button type='submit' onClick={() => setAlta('melhorado')}>Melhorado</button>
                            <button type='submit' onClick={() => setAlta('à revelia')}>À Revelia</button>
                            <button type='submit' onClick={() => setAlta('transferência')}>Transferência</button>
                        </div>}
                    </span>
                    <span className={`footer__status ${data.stats}`}>
                        {data.stats === 'alta' && <p>Aguardando-</p>}
                        {data.stats}
                    </span>
                </div>
            </form>
        </li >
    )
}

