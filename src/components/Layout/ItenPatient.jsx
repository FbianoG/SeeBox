import { useState } from 'react'
import './ItenPatient.css'

export default function ItenPatient({ data, func }) {

    const [itenConfig, setItenConfig] = useState(false)

    return (
        <li key={data._id} className='item'>
            <span className='item__box'>{data.box.slice(0, 1) == 'm' ? 'md' : data.box.slice(2)}</span>
            <div className="item__data">
                <p className='item__data-name'>{data.name}</p>
                <p className='item__data-age'>{data.age} Anos</p>
            </div>
            <p className='item__plan'>{data.plan}</p>
            <div className="item__status">
                <p className={data.stats}>{data.stats === 'alta' ? 'Aguard. Alta' : data.stats}</p>
            </div>
            <p className='item__room'>{data.room}</p>
            <div className="item__config" onMouseLeave={() => setItenConfig(false)}>
                <button title='Mudar Status do Paciente' onClick={() => setItenConfig(true)}><i className="fa-solid fa-sliders" ></i></button>
                {itenConfig &&
                    <div className="item__config-options">
                        <span onClick={() => func.changeStatus(data._id, 'indefinido')}>Indefinido</span>
                        <span onClick={() => func.changeStatus(data._id, 'análise')}>Análise</span>
                        <span onClick={() => func.changeStatus(data._id, 'alta')}>Sol. Alta</span>
                        <span onClick={() => func.changeStatus(data._id, 'internado')}>Internado</span>
                        <span onClick={() => func.changeStatus(data._id, 'relatório')}>Relatório</span>
                        <span onClick={() => func.changeStatus(data._id, 'carência')}>Carência</span>
                        <span onClick={() => func.changeStatus(data._id, 'transferência')}>Transferência</span>
                    </div>
                }
            </div>
        </li>
    )
}