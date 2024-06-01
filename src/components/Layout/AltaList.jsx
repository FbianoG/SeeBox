import { useEffect, useRef, useState } from 'react'
import './AltaList.css'

export default function AltaList({ data }) {

    const [showAltaList, setShowAltaList] = useState(false)
    const itemList = useRef()

    useEffect(() => {
        if (showAltaList) itemList.current.style.height = '375px'
        else itemList.current.style.height = '0px'
    }, [showAltaList])

    function convertTime(timeArchive) {
        const date = new Date(timeArchive)
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }

    return (
        <div className="altaList">
            <div className="altaList__head">
                <h3>Histórico de Altas</h3>
                {!showAltaList && <i className="fa-solid fa-chevron-up" onClick={() => setShowAltaList(true)}></i>}
                {showAltaList && <i className="fa-solid fa-xmark" onClick={() => setShowAltaList(false)}></i>}
            </div>
            <ul className='altaList__list' ref={itemList}>
                {data && data.map(element => (
                    <li key={element._id} className="altaList__item" >
                        <p className='altaList__item-name'>{element.name}</p>
                        <p className="altaList__item-alta">{element.alta}</p>
                        <p className="altaList__item-plan">{element.plan}</p>
                        {element.dataTime.timeArchive && <p className="altaList__item-time">{convertTime(element.dataTime.timeArchive)}h</p>}
                    </li>
                ))}
            </ul>
        </div>
    )
}