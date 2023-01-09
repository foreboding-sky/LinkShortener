import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Card } from 'antd';
import axios from 'axios';

const Details = ({ }) => {
    let { id } = useParams();
    useEffect(() => {
        console.log("sas");
        axios.get("/api/Links/" + id).then(res => {
            setItem(res.data);
            console.log(res.data);
        });
    }, []);

    const [item, setItem] = useState({});

    return (
        <Card title={"Link info"} style={{ width: 300, margin: "auto" }}>
            <p>Link: {item?.longLink}</p>
            <p>Short link: {item?.shortLink}</p>
            <p>Created by: {item?.createdBy?.userName}</p>
            <p>Date created: {item?.dateCreated}</p>
        </Card>
    );
}

export default Details;