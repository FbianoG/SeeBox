import { useEffect, useRef, useState } from 'react'
import './Dashboard.css'

export default function Dashboard({ data }) {
    const [dash, setDash] = useState(false)
    const dashBoard = useRef()


    function showDash() {
        if (!dash) dashBoard.current.style.top = '0px', dashBoard.current.style.margin = '0 0 0px', setDash(true)
        else dashBoard.current.style.top = '', dashBoard.current.style.margin = '', setDash(false)
    }


    function timeInt() {
        let count = 0
        let allTime = 0
        data.forEach(element => {
            if (element.active && element.dataTime.timeInt) {
                const create = new Date(element.dataTime.timeCreate)
                const int = new Date(element.dataTime.timeInt)
                count += 1
                allTime += ((int - create) / 1000 / 60)
            }
        })
        if (allTime === 0) return 0
        return allTime / count
    }

    function timePerm() {
        console.log(data)
        const date = new Date()
        let count = 0
        let allTime = 0
        data.forEach(element => {
            const time = new Date(element.dataTime.timeCreate)
            if (element.active) {
                count += 1
                allTime += ((date - time) / 1000 / 60)
            }
            
        })
        if (allTime === 0) return 0
        return allTime / count
    }

    function timeAlt() {
        let count = 0
        let allTime = 0
        data.forEach(element => {
            if (!element.active && element.dataTime.timeInt && element.dataTime.timeArchive) {
                const int = new Date(element.dataTime.timeInt)
                const archive = new Date(element.dataTime.timeArchive)
                count += 1
                allTime += ((archive - int) / 1000 / 60)
            }
        })
        if (allTime === 0) return 0
        return allTime / count
    }


    return (
        <div className='dash' ref={dashBoard}>
            <div className="dash__card">
                <div className="dash__card-bar yellow"></div>
                <div className="dash__card-data">
                    <p className="dash__card-title yellow">Tempo Médio de Permanência</p>
                    <p className="dash__card-text">{timePerm().toFixed(0)} min</p>
                </div>
            </div>
            <div className="dash__card">
                <div className="dash__card-bar"></div>
                <div className="dash__card-data">
                    <p className="dash__card-title">Chegada {'->'} Internação</p>
                    <p className="dash__card-text">{timeInt().toFixed(0)} min</p>
                </div>
            </div>
            <div className="dash__card">
                <div className="dash__card-bar red"></div>
                <div className="dash__card-data">
                    <p className="dash__card-title red">Internação {'->'} Alta PS</p>
                    <p className="dash__card-text">{timeAlt().toFixed(0)} min</p>
                </div>
            </div>


            {
                dash ? <button onClick={showDash}><i className="fa-solid fa-chevron-up"></i></button>
                    : <button onClick={showDash}><i className="fa-solid fa-chevron-down"></i></button>
            }

        </div >
    )
}