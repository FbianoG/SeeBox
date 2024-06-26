import { useRef } from 'react';
import { createPatient, uptadeDataEnf, uptadeDataMed } from '../../assets/ApiBack';
import './Model.css'
import { useForm } from "react-hook-form";

export default function Model({ func, edit, data }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let timeoutId

    async function create(data) {
        clearTimeout(timeoutId)
        func.setAlert(false)
        try {
            if (!data.name || !data.age || !data.plan || !data.box) throw new Error('Preencha todos os campos.')
            const response = await createPatient(data)
            func.getData()
            func.setModel(false)
            func.setAlert({ type: 'success', title: 'Sucesso', text: response.message })
        } catch (error) {
            console.log(error)
            func.setAlert({ type: 'error', title: 'Erro ao incluir', text: error.message })
        } finally {
            timeoutId = setTimeout(() => func.setAlert(false), 4000)
        }
    }

    async function update(dataForm) {
        clearTimeout(timeoutId)
        func.setAlert(false)
        try {
            const response = await uptadeDataMed(data._id, dataForm)
            func.getData()
            func.setModel(false)
            func.setEdit(false)
            func.setAlert({ title: 'Sucesso!', type: 'success', text: response.message })
        } catch (error) {
            console.error(error);
            func.setAlert({ title: 'Erro!', type: 'error', text: error.message })
        } finally {
            timeoutId = setTimeout(() => func.setAlert(false), 4000)
        }
    }

    async function updateEnf(dataForm) {
        clearTimeout(timeoutId)
        func.setAlert(false)
        console.log(dataForm)
        try {
            const response = await uptadeDataEnf(data._id, dataForm)
            func.getData()
            func.setModel(false)
            func.setEdit(false)
            func.setAlert({ title: 'Sucesso!', type: 'success', text: response.message })
        } catch (error) {
            console.error(error);
            func.setAlert({ title: 'Erro!', type: 'error', text: error.message })
        } finally {
            timeoutId = setTimeout(() => func.setAlert(false), 4000)
        }
    }

    const urlQuery = window.location.pathname

    const selectBox = () => {
        return (
            <select id="9" defaultValue={data?.box} {...register('box', { required: true })}>
                <optgroup label='Box'>
                    <option value="bx1">Box 1</option>
                    <option value="bx2">Box 2</option>
                    <option value="bx3">Box 3</option>
                    <option value="bx4">Box 4</option>
                    <option value="bx5">Box 5</option>
                    <option value="bx6">Box 6</option>
                    <option value="bx7">Box 7</option>
                    <option value="bx8">Box 8</option>
                    <option value="bx9">Box 9</option>
                </optgroup>
                <optgroup label='Medicação'>
                    <option value="md11">Med 1</option>
                    <option value="md22">Med 2</option>
                    <option value="md33">Med 3</option>
                    <option value="md44">Med 4</option>
                    <option value="md55">Med 5</option>
                    <option value="md66">Med 6</option>
                    <option value="md77">Med 7</option>
                </optgroup>
            </select>
        )
    }

    return (
        <div className="model">
            {!edit &&
                <form className="model__content" onSubmit={handleSubmit(create)}>
                    <h3>Incluir Paciente</h3>
                    <label htmlFor='1'>Nome Completo</label>
                    <input type='text' id='1' {...register('name', { required: true })} required />
                    <label htmlFor='2'>Idade</label>
                    <input type='number' id='2' {...register('age', { required: true })} required />
                    <label htmlFor='3' >Plano de Saúde</label>
                    <input type='text' id='3'  {...register('plan', { required: true })} required />
                    <label htmlFor='5'>Especialidade</label>
                    <select id="5" {...register('spec', { required: true })} required>
                        <option value="" disabled selected></option>
                        <option value="clinica">Clinica</option>
                        <option value="cardiologia">Cardiologia</option>
                        <option value="ortopedia">Ortopedia</option>
                        <option value="cirgeral">Cirurgia Geral</option>
                    </select>

                    <label htmlFor='4'>Box</label>
                    {selectBox()}
                    <button type='submit'>Incluir</button>
                    <button type='button' onClick={() => func.setModel(false)}>Fechar</button>
                </form>
            }
            {edit && urlQuery != '/enf' &&
                <form className="model__content" onSubmit={handleSubmit(update)}>
                    <h3>Editar Paciente</h3>
                    <div className="model__content-data">
                        <p>{data.name}</p>
                        <p>{data.age} anos</p>
                        <p>{data.plan}</p>
                    </div>
                    <p className='model__time'><b>Entrada:</b> {new Date(data.dataTime.timeCreate).getHours().toString().padStart(2, '0') + ":" + new Date(data.dataTime.timeCreate).getMinutes().toString().padStart(2, '0') + 'h'} </p>
                    <div className="model__content-checkbox">
                        <input type="checkbox" id="1" defaultChecked={data.dataMed?.nota} {...register('nota')} />
                        <label htmlFor='1'>Nota</label>
                        <input type="checkbox" id="2" defaultChecked={data.dataMed?.conc} {...register('conc')} />
                        <label htmlFor='2'>Conciliação</label>
                        <input type="checkbox" id="3" defaultChecked={data.dataMed?.pres} {...register('pres')} />
                        <label htmlFor='3'>Prescrição</label>
                        <input type="checkbox" id="4" defaultChecked={data.dataMed?.exa} {...register('exa')} />
                        <label htmlFor='4'>Exames</label>
                        <input type="checkbox" id="5" defaultChecked={data.dataMed?.tev} {...register('tev')} />
                        <label htmlFor='5'>Tev</label>
                        <input type="checkbox" id="6" defaultChecked={data.dataMed?.int} {...register('int')} />
                        <label htmlFor='6'>Internação</label>
                    </div>
                    <label htmlFor='7'>Observação</label>
                    <textarea id="7" spellCheck='false' defaultValue={data.dataMed?.obs} {...register('obs')}></textarea>
                    <label htmlFor='8'>Especialidade</label>
                    <select id="8" defaultValue={data.dataMed.spec} {...register('spec', { required: true })} required>
                        <option value="" disabled selected></option>
                        <option value="clinica">Clinica</option>
                        <option value="cardiologia">Cardiologia</option>
                        <option value="ortopedia">Ortopedia</option>
                        <option value="cirgeral">Cirurgia Geral</option>
                    </select>
                    <label htmlFor='9'>Box</label>
                    {selectBox()}
                    <button type='submit'>Atualizar Dados</button>
                    <button type='button' onClick={() => { func.setModel(false), func.setEdit(false) }}>Fechar</button>
                </form>
            }


            {/* Edição Enfermágem */}
            {edit && urlQuery === '/enf' &&
                <form className="model__content" onSubmit={handleSubmit(updateEnf)}>
                    <h3>Editar Paciente</h3>
                    <div className="model__content-data">
                        <p>{data.name}</p>
                        <p>{data.age} anos</p>
                        <p>{data.plan}</p>
                    </div>
                    <p className='model__time'><b>Entrada:</b> {new Date(data.dataTime.timeCreate).getHours().toString().padStart(2, '0') + ":" + new Date(data.dataTime.timeCreate).getMinutes().toString().padStart(2, '0') + 'h'} </p>

                    <div className="model__content-checkbox-enf">
                        <label htmlFor='1'>Diag:</label>
                        <input type="text" id="1" defaultValue={data.dataEnf?.diag} {...register('diag')} />
                        <label htmlFor='2'>AVP:</label>
                        <input type="text" id="2" defaultValue={data.dataEnf?.avp} {...register('avp')} />
                        <label htmlFor='3'>Alergia:</label>
                        <input type="text" id="3" defaultValue={data.dataEnf?.alerg} {...register('alerg')} />
                        <label htmlFor='4'>HPP:</label>
                        <input type="text" id="4" defaultValue={data.dataEnf?.hpp} {...register('hpp')} />
                        <label htmlFor='5'>Rastreio:</label>
                        <input type="text" id="5" defaultValue={data.dataEnf?.rast} {...register('rast')} />
                        <label htmlFor='6'>Protocolo:</label>
                        <input type="text" id="6" defaultValue={data.dataEnf?.prot} {...register('prot')} />
                    </div>

                    <label htmlFor='7'>Observação</label>
                    <textarea id="7" className='model__textarea-enf' spellCheck='false' defaultValue={data.dataEnf?.obs} {...register('obs')}></textarea>

                    <label htmlFor='9'>Box</label>
                    {selectBox()}
                    <button type='submit'>Atualizar Dados</button>
                    <button type='button' onClick={() => { func.setModel(false), func.setEdit(false) }}>Fechar</button>
                </form>
            }
        </div>
    )
}
