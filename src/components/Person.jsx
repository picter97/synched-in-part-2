import React from 'react'
import Card from 'react-bootstrap/Card'

export default function Person (props) {

    return (
        <Card className="col-2 m-2 text-sm p-3">

            <Card.Subtitle style={{borderBottom: "1px solid black"}}>{props.person.devLevel}</Card.Subtitle>
            <Card.Title
                className="mb-3 mt-3"
                style={{ color: props.person.favoriteColor }} 
            >
                {props.person.fullName}
            </Card.Title>
            <Card.Subtitle>{props.person.company}</Card.Subtitle>
            <Card.Text>
                {props.person.bio}
            </Card.Text>
        </Card>
    )

}