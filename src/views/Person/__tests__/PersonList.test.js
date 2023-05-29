const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import PersonList from '../PersonList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Person rows when api response has data', async () => {
    const endPoint = 'person'
    const getPersonListResponse = [
        {
            id: 1,
            name: 'name',
            age: 16,
            aa: 72.31,
            bb: 96,
            cc: 35,
            dd: 'dd',
            ee: false,
            ff: 91,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getPersonListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <PersonList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const personNameCell = await screen.findByText(/name/i)

    expect(personNameCell).toHaveTextContent(/name/i)
    mock.reset()
})
