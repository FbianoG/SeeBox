import axios from "axios";

// const UrlBack = 'http://localhost:0000'
const UrlBack = 'https://teste-livid-tau.vercel.app'
const token = localStorage.getItem('Token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

async function login(data) {
    try {
        const response = await axios.post(`${UrlBack}/login`, { data })
        localStorage.setItem('Token', response.data.token)
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message) // qualquer erro que volte com resposta do servidor
        else if (error.request) throw new Error("Error de rede. Tente novamente.") // error de rede ou link inativo
        else throw new Error(error.message) // erro que não bata uma condição ex: sem token
    }
}

async function createPatient(data) {
    try {
        const response = await axios.post(`${UrlBack}/createPatient`, { name: data.name, age: data.age, plan: data.plan, box: data.box })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message) // qualquer erro que volte com resposta do servidor
        else if (error.request) throw new Error("Error de rede. Tente novamente.") // error de rede ou link inativo
        else throw new Error(error.message) // erro que não bata uma condição ex: sem token
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


async function updatePatient(data, _id, active, alta) {
    if (active == undefined) active = true
    try {
        const response = await axios.post(`${UrlBack}/uptadePatient`, { data, _id, active, alta })
        return response.data
    } catch (error) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

async function updateStatus(_id, stats) {
    try {
        const response = await axios.post(`${UrlBack}/updateStatus`, { _id, stats })
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




export { login, createPatient, getPatients, getPatientsAlta, updatePatient, updateStatus, uptadeRoom }