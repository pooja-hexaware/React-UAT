import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editPerson, fetchPerson } from './store/Person.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditPerson = () => {
    const { id: PersonId } = useParams()

    const Person = useSelector((state) =>
        state.Person.entities.find(
            (Person) => Person.id.toString() === PersonId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(Person.name)

    const [age, setAge] = useState(Person.age)

    const [aa, setAa] = useState(Person.aa)

    const [bb, setBb] = useState(Person.bb)

    const [cc, setCc] = useState(Person.cc)

    const [dd, setDd] = useState(Person.dd.split('T')[0])

    const [ee, setEe] = useState(Person.ee)

    const [ff, setFf] = useState(Person.ff)

    const handleName = (e) => setName(e.target.value)
    const handleAge = (e) => setAge(parseInt(e.target.value))
    const handleAa = (e) => setAa(parseFloat(e.target.value))
    const handleBb = (e) => setBb(parseInt(e.target.value))
    const handleCc = (e) => setCc(parseInt(e.target.value))
    const handleDd = (e) => setDd(e.target.value)
    const handleEe = (e) => setEe(e.target.value)
    const handleFf = (e) => setFf(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editPerson({
                id: PersonId,
                name,
                age,
                aa,
                bb,
                cc,
                dd,
                ee,
                ff,
            })
        ).then(() => {
            dispatch(fetchPerson())
        })
        navigate('/Person')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditPerson', path: '/Person' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age || ''}
                                validators={['required']}
                                label="Age"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="aa"
                                id="aaInput"
                                onChange={handleAa}
                                value={aa || ''}
                                validators={['required']}
                                label="Aa"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="bb"
                                id="bbInput"
                                onChange={handleBb}
                                value={bb || ''}
                                validators={['required']}
                                label="Bb"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="cc"
                                id="ccInput"
                                onChange={handleCc}
                                value={cc || ''}
                                validators={['required']}
                                label="Cc"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="date"
                                name="dd"
                                id="ddInput"
                                onChange={handleDd}
                                value={dd}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={ee}
                                onChange={handleEe}
                                select
                                id="eeInput"
                                label="Ee"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
                            <TextField
                                type="number"
                                name="ff"
                                id="ffInput"
                                onChange={handleFf}
                                value={ff || ''}
                                validators={['required']}
                                label="Ff"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditPerson
