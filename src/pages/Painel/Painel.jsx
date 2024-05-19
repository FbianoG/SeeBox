import { useEffect } from 'react'
import './Painel.css'

export default function Painel() {

    useEffect(() => { if (!localStorage.getItem('Token')) location.href = '/' }, [])

    return (
        <>
            <main>
                <div className="painel">
                    <a href="/emerg">
                        <i className="fa-solid fa-user-doctor"></i>
                        <h3>Painel Médico</h3>
                        <p>Painel de gestão clínica sobre os pacientes na emergência e seus processos.</p>
                    </a>
                    <a href="/recep">
                        <i className="fa-solid fa-bell-concierge"></i>
                        <h3>Painel Internação</h3>
                        <p>Painel de gestão dos processos de internção dos pacientes em emergência.</p></a>
                    <a href="/leitos">
                        <i className="fa-solid fa-bed-pulse"></i>
                        <h3>Painel Leitos</h3>
                        <p>Painel de gestão dos leitos liberados aos pacientes em emergência.</p>
                    </a>
                    <a href=''>
                        <i className="fa-solid fa-gears"></i>
                        <h3>Configurações</h3>
                        <p></p>
                    </a>
                </div>
            </main>
        </>
    )
}