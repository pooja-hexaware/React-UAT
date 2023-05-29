import store from 'store/store'
import { personAdded, personDeleted, personUpdated } from '../personSlice'

describe('testing person redux store reducers', () => {
    test('add person to store test', () => {
        let state = store.getState().person
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            age: 43,
            aa: 55.63,
            bb: 80,
            cc: 67,
            dd: 'Mon May 29 2023 12:52:11 GMT+0000 (Coordinated Universal Time)',
            ee: true,
            ff: 55,
        }
        store.dispatch(personAdded(initialInput))
        state = store.getState().person
        expect(state.entities).toHaveLength(1)
    })

    test('update person from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            age: 56,
            aa: 27.63,
            bb: 31,
            cc: 4,
            dd: 'Mon May 29 2023 12:52:11 GMT+0000 (Coordinated Universal Time)',
            ee: false,
            ff: 95,
        }
        store.dispatch(personAdded(initialInput))
        let state = store.getState().person
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name',
            age: 52,
            aa: 93.08,
            bb: 73,
            cc: 60,
            dd: 'dd',
            ee: false,
            ff: 68,
        }
        store.dispatch(personUpdated(updatedInput))
        state = store.getState().person
        let changedPerson = state.entities.find((p) => p.id === 2)
        expect(changedPerson).toStrictEqual(updatedInput)
    })

    test('delete person from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            age: 67,
            aa: 92.17,
            bb: 45,
            cc: 4,
            dd: 'Mon May 29 2023 12:52:11 GMT+0000 (Coordinated Universal Time)',
            ee: false,
            ff: 54,
        }
        store.dispatch(personAdded(initialInput))
        let state = store.getState().person
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            personDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().person
        expect(state.entities).toHaveLength(2)
    })
})
