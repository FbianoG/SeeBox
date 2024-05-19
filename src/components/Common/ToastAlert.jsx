import './ToastAlert.css'

export default function ToastAlert({ data }) {
    //  recebe title e type
    let toastBg
    let title
    if (data.type === 'success') {
        toastBg = { background: 'mediumseagreen' }
        title = 'Sucesso na requisição.'
    }
    else if (data.type === 'error') {
        toastBg = { background: '#c53030' }
        title = 'Ocorreu algum erro.'
    }
    else if (data.type === 'alert') {
        toastBg = { background: '#416bc9' }
        title = 'Alerta de informação!'
    }

    return (
        <div className='toastAlert' style={toastBg}>
            <i className='fa-solid fa-circle-exclamation toastAlert-icon'></i>
            <div className='toastAlert-data'>
                <h3 className='toastAlert-title'>{data.title}</h3>
                <span className='toastAlert-text'>{data.text}</span>
            </div>
        </div >
    )

}