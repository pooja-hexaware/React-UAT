import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPerson, fetchPerson } from './store/Person.action'

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

const AddPerson = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [aa, setAa] = useState('')
    const [bb, setBb] = useState('')
    const [cc, setCc] = useState('')
    const [dd, setDd] = useState('')
    const [ee, setEe] = useState('')
    const [ff, setFf] = useState('')

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
            addPerson({
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

    useEffect(() => {
        return () => {
            setName('')
            setAge('')
            setAa('')
            setBb('')
            setCc('')
            setDd('')
            setEe('')
            setFf('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddPerson', path: '/Person' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                label="Name"
                            />

                            <TextField
                                type="number"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age || ''}
                                label="Age"
                            />

                            <TextField
                                type="number"
                                name="aa"
                                id="aaInput"
                                onChange={handleAa}
                                value={aa || ''}
                                label="Aa"
                            />

                            <TextField
                                type="number"
                                name="bb"
                                id="bbInput"
                                onChange={handleBb}
                                value={bb || ''}
                                label="Bb"
                            />

                            <TextField
                                type="number"
                                name="cc"
                                id="ccInput"
                                onChange={handleCc}
                                value={cc || ''}
                                label="Cc"
                            />

                            <TextField
                                type="date"
                                name="dd"
                                id="ddInput"
                                onChange={handleDd}
                                value={dd || ''}
                            />

                            <TextField
                                value={ee}
                                onChange={handleEe}
                                select
                                id="eeInput"
                                label="Ee"
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
                                label="Ff"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddPerson
