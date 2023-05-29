import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Person'

export const fetchPerson = createAsyncThunk('Person/fetchPerson', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Person = await response.data
    return Person
})

export const addPerson = createAsyncThunk(
    'Person/addPerson',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Person = await response.data
        thunkAPI.dispatch(showSuccess('Person added successfully'))
        return Person
    }
)

export const editPerson = createAsyncThunk(
    'Person/editPerson',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Person = await response.data
        thunkAPI.dispatch(showSuccess('Person updated successfully'))
        return Person
    }
)

export const deletePerson = createAsyncThunk(
    'Person/deletePerson',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Person deleted successfully.')
            )
            return data.id
        }
    }
)
