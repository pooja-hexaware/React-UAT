import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const PersonList = Loadable(lazy(() => import('./PersonList')))
const EditPerson = Loadable(lazy(() => import('./EditPerson')))
const AddPerson = Loadable(lazy(() => import('./AddPerson')))

const PersonRoutes = [
    {
        path: '/Person',
        element: <PersonList />,
    },
    {
        path: '/Person/edit/:id',
        element: <EditPerson />,
    },
    {
        path: '/Person/add',
        element: <AddPerson />,
    },
]

export default PersonRoutes
