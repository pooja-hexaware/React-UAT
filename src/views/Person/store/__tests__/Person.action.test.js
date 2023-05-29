import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchPerson,
    addPerson,
    editPerson,
    deletePerson,
} from '../person.action'

const getPersonListResponse = [
    {
        id: 1,
        name: 'name',
        age: 54,
        aa: 91.48,
        bb: 33,
        cc: 98,
        dd: 'dd',
        ee: false,
        ff: 59,
    },
]

const addPersonListResponse = (data) => {
    return { id: 2, ...data }
}
const editPersonListResponse = (data) => {
    return data
}

describe('should test Person redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'person'
    test('Should be able to fetch the person list and update person redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getPersonListResponse)
        const result = await store.dispatch(fetchPerson())
        const personList = result.payload
        expect(result.type).toBe('person/fetchPerson/fulfilled')
        expect(personList).toEqual(getPersonListResponse)

        const state = store.getState().person
        expect(state.entities).toEqual(personList)
    })

    test('Should be able to add new person to list and make post api and update person redux store', async () => {
        const body = {
            name: 'name',
            age: 5,
            aa: 28.91,
            bb: 99,
            cc: 28,
            dd: 'dd',
            ee: true,
            ff: 7,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addPersonListResponse(body)
        )
        const result = await store.dispatch(addPerson(body))
        const personItem = result.payload
        expect(result.type).toBe('person/addPerson/fulfilled')
        expect(personItem).toEqual(addPersonListResponse(body))

        const state = store.getState().person
        expect(state.entities).toContainEqual(addPersonListResponse(body))
    })

    test('Should be able to edit person in list and make put api call and update person redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            age: 20,
            aa: 72.32,
            bb: 61,
            cc: 13,
            dd: 'dd',
            ee: true,
            ff: 71,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editPersonListResponse(body)
        )
        const result = await store.dispatch(editPerson(body))
        const personItem = result.payload
        expect(result.type).toBe('person/editPerson/fulfilled')
        expect(personItem).toEqual(editPersonListResponse(body))

        const state = store.getState().person
        let changedPerson = state.entities.find((p) => p.id === body.id)
        expect(changedPerson.name).toEqual(body.name)
    })

    test('Should be able to delete person in list and update person redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().person
        const initialLength = state.entities.length
        const result = await store.dispatch(deletePerson(input))
        const deletId = result.payload
        expect(result.type).toBe('person/deletePerson/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().person
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
