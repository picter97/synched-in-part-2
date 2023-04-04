import React from 'react'
import Form from 'react-bootstrap/Form'
import { DEV_LEVELS as devLevels } from '../utils/constants'


export default function Filter (props) {
    let setFilter = props.setFilter
    return (
        <Form>
            <Form.Label htmlFor="devLevel-select"> Filter by developer level: </Form.Label>
            <Form.Select id="devLevel-select" onChange={(e) => setFilter(e.target.value)}>
            <option value="">No Filter</option>
            <option value={devLevels[0]}>{devLevels[0]}</option>
            <option value={devLevels[1]}>{devLevels[1]}</option>
            <option value={devLevels[2]}>{devLevels[2]}</option>
            <option value={devLevels[3]}>{devLevels[3]}</option>
            </Form.Select>
        </Form>
    )
}