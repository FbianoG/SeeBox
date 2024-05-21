import axios from "axios";
import TimeDate from "./TimeDate.";

const UrlBack = 'http://localhost:1981'
// const UrlBack = 'https://teste-livid-tau.vercel.app'
const token = localStorage.getItem('Token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`



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
    const timeCreate = TimeDate()
    try {
        const response = await axios.post(`${UrlBack}/createPatient`, { name: data.name, age: data.age, plan: data.plan, box: data.box, timeCreate })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getPatients() {
    try {
        const response = await axios.post(`${UrlBack}/getPatients`,)
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function getPatientsAlta() {
    try {
        const response = await axios.post(`${UrlBack}/getPatientsAlta`)
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function updatePatient(data, _id,) {
    try {
        const response = await axios.post(`${UrlBack}/uptadePatient`, { data, _id })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function archivePatient(_id, alta) {
    const timeArchive = TimeDate()
    const active = false
    try {
        const response = await axios.post(`${UrlBack}/archivePatient`, { _id, active, alta, timeArchive })
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
    if (stats === 'internado') timeInt = TimeDate()
    if (stats === 'alta') timeAlta = TimeDate()
    try {
        const response = await axios.post(`${UrlBack}/updateStatus`, { _id, stats, timeInt, timeAlta })
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
        const response = await axios.post(`${UrlBack}/updateRoom`, { _id, room })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}




export { login, createPatient, getPatients, getPatientsAlta, updatePatient, archivePatient, updateStatus, uptadeRoom }