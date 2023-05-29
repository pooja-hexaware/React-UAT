const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditPerson from '../EditPerson'
import { PersonAdded } from '../store/PersonSlice'
beforeAll(() => {
    store.dispatch(
        PersonAdded({
            id: 1,
            name: 'name',
            age: 87,
            aa: 54.17,
            bb: 40,
            cc: 34,
            dd: 'dd',
            ee: true,
            ff: 5,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Person/edit/1" replace />
                                }
                            />
                            <Route
                                path="Person/edit/:id"
                                element={<EditPerson />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of PersonEdit Component', () => {
    test('should render EditPerson and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const savePersonButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)
        const ddElement = screen.getByLabelText(/Dd/i)
        const eeElement = screen.getByLabelText(/Ee/i)
        const ffElement = screen.getByLabelText(/Ff/i)

        expect(savePersonButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(aaElement).toBeInTheDocument()
        expect(bbElement).toBeInTheDocument()
        expect(ccElement).toBeInTheDocument()
        expect(ddElement).toBeInTheDocument()
        expect(eeElement).toBeInTheDocument()
        expect(ffElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Person edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)
        const ddElement = screen.getByLabelText(/Dd/i)
        const eeElement = screen.getByLabelText(/Ee/i)
        const ffElement = screen.getByLabelText(/Ff/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(ageElement, { target: { value: 87 } })
        fireEvent.change(aaElement, { target: { value: 43.24 } })
        fireEvent.change(bbElement, { target: { value: 44 } })
        fireEvent.change(ccElement, { target: { value: 38 } })
        fireEvent.change(ddElement, { target: { value: 'dd' } })
        fireEvent.change(ffElement, { target: { value: 78 } })

        expect(nameElement.value).toBe('name')

        expect(ageElement.value).toBe(87)
        expect(aaElement.value).toBe(43.24)
        expect(bbElement.value).toBe(44)
        expect(ccElement.value).toBe(38)
        expect(ddElement.value).toBe('dd')
        expect(ffElement.value).toBe(78)

        fireEvent.mouseDown(eeElement)
        const eelistbox = within(screen.getByRole('listbox'))
        fireEvent.click(eelistbox.getByText(/False/))
        expect(eeElement).toHaveTextContent(/False/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)
        const ddElement = screen.getByLabelText(/Dd/i)
        const ffElement = screen.getByLabelText(/Ff/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(ageElement, { target: { value: '' } })
        fireEvent.change(aaElement, { target: { value: '' } })
        fireEvent.change(bbElement, { target: { value: '' } })
        fireEvent.change(ccElement, { target: { value: '' } })
        fireEvent.change(ddElement, { target: { value: '' } })
        fireEvent.change(ffElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const savePersonButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(savePersonButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(7)
    })
})
