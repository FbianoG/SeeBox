import './CardPatient.css'
import { useState } from 'react';
import { archivePatient } from '../../assets/ApiBack';


export default function CardPatient({ data, func }) {

    const [alta, setAlta] = useState(null)
    const [options, setOptions] = useState()
    let timeoutId

    async function archive() {
        event.preventDefault()
        if (window.confirm('Você realmente deseja arquivar este paciente ?')) {}
        else return
        clearTimeout(timeoutId)
        func.setAlert(false)
        try {
            const response = await archivePatient(data._id, alta)
            func.getData()
            func.setAlert({ title: 'Sucesso!', type: 'success', text: response.message })
        } catch (error) {
            console.error(error)
            func.setAlert({ title: 'Erro!', type: 'error', text: error.message })
        } finally {
            setAlta(null)
            timeoutId = setTimeout(() => func.setAlert(false), 4000)
        }
    }

    return (
        <li className='card' >
            <div className={`ticket ${data.spec}`}></div>
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
                        <input type="checkbox" checked={data.data.nota} disabled />
                        <label id={data.data.nota == false && 'notChecked'}>Nota</label>
                        <input type="checkbox" checked={data.data.conc} disabled />
                        <label id={data.data.conc == false && 'notChecked'}>Conciliação</label>
                        <input type="checkbox" checked={data.data.pres} disabled />
                        <label id={data.data.pres == false && 'notChecked'}>Prescrição</label>
                        <input type="checkbox" checked={data.data.exa} disabled />
                        <label id={data.data.exa == false && 'notChecked'}>Exames</label>
                        <input type="checkbox" checked={data.data.tev} disabled />
                        <label id={data.data.tev == false && 'notChecked'}>TEV</label>
                        <input type="checkbox" checked={data.data.int} disabled />
                        <label id={data.data.int == false && 'notChecked'}>Internação</label>
                    </div>
                    <textarea spellCheck="false" value={data.data.obs} disabled></textarea>
                </div>
                <div className="footer">
                    <button type='button' title='Editar Paciente' onClick={() => { func.setModel(true), func.setEdit(true), func.setPatient(data) }}><i className="fa-solid fa-user-pen"></i></button>
                    <span className='footer__falseBtn' onClick={() => setOptions(true)} onMouseLeave={() => setOptions(false)} ><i className="fa-solid fa-cloud-arrow-up"></i>
                        {options && <div className="footer__options">
                            <button type='submit' onClick={() => setAlta('internado')}>Internado</button>
                            <button type='submit' onClick={() => setAlta('melhorado')}>Melhorado</button>
                            <button type='submit' onClick={() => setAlta('à revelia')}>À Revelia</button>
                            <button type='submit' onClick={() => setAlta('transferência')}>Transferência</button>
                            <button type='submit' onClick={() => setAlta('outros')}>Outros</button>
                        </div>}
                    </span>
                    <span className={`footer__status ${data.stats}`}>
                        {data.stats === 'alta' ? 'Aguard. Alta' : data.stats}
                    </span>
                </div>
            </form>
        </li >
    )
}

