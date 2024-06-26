import axios from "axios";

// const UrlBack = 'http://localhost:1981'
const UrlBack = 'https://teste-livid-tau.vercel.app'
const token = localStorage.getItem('Token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


async function createUser(data) {
    data.username = data.username.toLowerCase()
    try {
        const response = await axios.post(`${UrlBack}/createUser`, data)
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function login(data) {
    data.username = data.username.toLowerCase()
    try {
        const response = await axios.post(`${UrlBack}/login`, { data })
        localStorage.setItem('Token', response.data.token)
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function createPatient(data) {
    try {
        const response = await axios.post(`${UrlBack}/createPatient`, { data })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getPatients(sendBy) {
    let route
    if (sendBy === 'Med') route = '/getPatientsMed'
    else if (sendBy === 'Rec') route = '/getPatientsRec'
    console.log()
    try {
        const response = await axios.get(`${UrlBack}${route}`)
        return response.data
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) setTimeout(() => { location.href = '/' }, 4000)
        }
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getPatientsAlta() {
    try {
        const response = await axios.get(`${UrlBack}/getPatientsAlta`)
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function uptadeDataMed(_id, data) {
    try {
        const response = await axios.put(`${UrlBack}/uptadeDataMed`, { _id, box: data.box, dataMed: data, })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function uptadeDataEnf(_id, data) {
    try {
        const response = await axios.put(`${UrlBack}/uptadeDataEnf`, { _id, box: data.box, dataEnf: data, })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function archivePatient(_id, alta, sendBy) {
    try {
        const response = await axios.put(`${UrlBack}/archivePatient`, { _id, alta, sendBy })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function updateStatus(_id, stats) {
    let timeInt
    let timeAlta
    let timeAna
    if (stats === 'internado') timeInt = true
    if (stats === 'alta') timeAlta = true
    if (stats === 'análise') timeAna = true
    try {
        const response = await axios.put(`${UrlBack}/updateStatus`, { _id, stats, timeInt, timeAlta, timeAna })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function uptadeRoom(_id, room) {
    try {
        if (!_id) throw new Error('Paciente não encontrado.')
        const response = await axios.put(`${UrlBack}/updateRoom`, { _id, room })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}


export { createUser, login, createPatient, getPatients, getPatientsAlta, uptadeDataMed, uptadeDataEnf, archivePatient, updateStatus, uptadeRoom }