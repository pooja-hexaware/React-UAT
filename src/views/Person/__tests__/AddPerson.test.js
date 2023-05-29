const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddPerson from '../AddPerson'

beforeEach(() => {
    const endPoint = 'Person'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            age: 10,
            aa: 75.42,
            bb: 15,
            cc: 92,
            dd: 'dd',
            ee: true,
            ff: 30,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddPerson />
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

describe('testing view PersonAdd Component', () => {
    test('should render AddPerson and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addPersonButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)
        const ddElement = screen.getByLabelText(/Dd/i)
        const eeElement = screen.getByLabelText(/Ee/i)
        const ffElement = screen.getByLabelText(/Ff/i)

        expect(addPersonButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(aaElement).toBeInTheDocument()
        expect(bbElement).toBeInTheDocument()
        expect(ccElement).toBeInTheDocument()
        expect(ddElement).toBeInTheDocument()
        expect(eeElement).toBeInTheDocument()
        expect(ffElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Person add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const aaElement = screen.getByLabelText(/Aa/i)
        const bbElement = screen.getByLabelText(/Bb/i)
        const ccElement = screen.getByLabelText(/Cc/i)
        const ddElement = screen.getByLabelText(/Dd/i)
        const eeElement = screen.getByLabelText(/Ee/i)
        const ffElement = screen.getByLabelText(/Ff/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(ageElement, { target: { value: 76 } })
        fireEvent.change(aaElement, { target: { value: 84.28 } })
        fireEvent.change(bbElement, { target: { value: 93 } })
        fireEvent.change(ccElement, { target: { value: 12 } })
        fireEvent.change(ddElement, { target: { value: 'dd' } })
        fireEvent.change(ffElement, { target: { value: 81 } })

        fireEvent.mouseDown(eeElement)
        const eelistbox = within(screen.getByRole('listbox'))
        fireEvent.click(eelistbox.getByText(/True/))
        expect(eeElement).toHaveTextContent(/True/i)
    })

    test('should return error message when add Person button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addPersonButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addPersonButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(8)
    })
})
