import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;


const MainPage = () => {
    let name = useSelector((state) => state.AuthorizationReducer?.user.unique_name);
    let isAuthorized = useSelector((state) => state.AuthorizationReducer?.isAuthorized);
    let isAdmin = useSelector((state) => state.AuthorizationReducer?.isAdmin);

    useEffect(() => {
        console.log("sas");
        axios.get("/api/Links").then(res => {
            setArray(res.data);
            console.log(res.data);
        });
    }, []);

    const [count, setCount] = useState(0);
    const [array, setArray] = useState([]);

    const DeleteLink = (record) => {
        axios.delete("/api/Links/" + record.id).then(res => {
            let newArray = array.filter(link => { return link.id !== record.id; });
            setArray(newArray);
        })
    };

    let navigate = useNavigate();
    return (
        <Table dataSource={array}>
            <Column title="Long Url" dataIndex="longLink" key="longLink" />
            <Column title="Short Url" dataIndex="shortLink" key="shortLink" />
            {isAuthorized && <Column
                title="Delete Link"
                key="action"
                width={"200px"}
                render={(_, record) => {
                    console.log(record.createdBy);
                    console.log(name);
                    return ((isAdmin || record.createdBy == name) &&
                        <Button type="primary" block onClick={() => DeleteLink(record)}>
                            Delete
                        </Button>)
                }}
            />}
            {
                isAuthorized && <Column
                    title="Deteils"
                    key="action"
                    width={"200px"}
                    render={(_, record) => (
                        <Button type="primary" block onClick={() => navigate("/details/" + record.id)}>
                            Details
                        </Button>
                    )}
                />
            }

        </Table >);
}

export default MainPage;