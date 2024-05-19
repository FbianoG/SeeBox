import { useRef, useState } from 'react';
import { updatePatient } from '../../assets/ApiBack';
import './CardPatient.css'
import { useForm } from "react-hook-form";

export default function CardPatient({ data, func }) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [active, setActive] = useState(true)
    const [alta, setAlta] = useState(false)
    const [options, setOptions] = useState()
    const timeoutId = useRef(null)

    async function update(dataForm) {
        if (timeoutId.current) clearTimeout(timeoutId.current)
        console.log(data._id)
        try {
            const response = await updatePatient(dataForm, data._id, active, alta)
            func.getData()
            func.setAlert({ title: 'Sucesso!', type: 'success', text: response.message })
        } catch (error) {
            console.error(error);
        } finally {
            setActive(true)
            setAlta(false)
            timeoutId.current = setTimeout(() => func.setAlert(false), 4000)
        }
    }

    return (
        <li className='card' >
            <form onSubmit={handleSubmit(update)}>
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
                        <input type="checkbox" id={data._id + '1'} checked={data.data.nota}  />
                        <label htmlFor={data._id + '1'}>Nota</label>
                        <input type="checkbox" id={data._id + '2'} checked={data.data.conc}  />
                        <label htmlFor={data._id + '2'}>Conciliação</label>
                        <input type="checkbox" id={data._id + '3'} checked={data.data.pres}  />
                        <label htmlFor={data._id + '3'}>Prescrição</label>
                        <input type="checkbox" id={data._id + '4'} checked={data.data.exa}  />
                        <label htmlFor={data._id + '4'}>Exames</label>
                        <input type="checkbox" id={data._id + '5'} checked={data.data.tev}  />
                        <label htmlFor={data._id + '5'}>TEV</label>
                        <input type="checkbox" id={data._id + '6'} checked={data.data.int}  />
                        <label htmlFor={data._id + '6'}>Internação</label>
                    </div>
                    <textarea spellCheck="false" value={data.data.obs} disabled></textarea>
                </div>
                <div className="footer">
                    {/* <button type='submit'><i className="fa-solid fa-floppy-disk"></i></button> */}
                    <button type='button' onClick={() => { func.setModel(true), func.setEdit(true), func.setPatient(data), update }}><i className="fa-solid fa-user-pen"></i></button>

                    <span className='footer__falseBtn' onClick={() => setOptions(true)} onMouseLeave={() => setOptions(false)} ><i className="fa-solid fa-cloud-arrow-up"></i>
                        {options && <div className="footer__options">
                            <button type='submit' onClick={() => { setAlta('internado'), setActive(false) }}>Internado</button>
                            <button type='submit' onClick={() => { setAlta('melhorado'), setActive(false) }}>Melhorado</button>
                            <button type='submit' onClick={() => { setAlta('à revelia'), setActive(false) }}>À Revelia</button>
                            <button type='submit' onClick={() => { setAlta('transferência'), setActive(false) }}>Transferência</button>
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

