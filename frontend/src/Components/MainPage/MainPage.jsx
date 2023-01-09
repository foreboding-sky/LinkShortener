import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;


const MainPage = () => {
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

    const authorized = true;

    return (
        <Table dataSource={array}>
            <Column title="Long Url" dataIndex="longLink" key="longLink" />
            <Column title="Short Url" dataIndex="shortLink" key="shortLink" />
            {authorized && <Column
                title="Delete Link"
                key="action"
                width={"200px"}
                render={(_, record) => (
                    <Button type="primary" block onClick={() => DeleteLink(record)}>
                        Delete
                    </Button>
                )}
            />}
            {authorized && <Column
                title="Deteils"
                key="action"
                width={"200px"}
                render={(_, record) => (
                    <Button type="primary" block onClick={() => navigate("/details/" + record.id)}>
                        Details
                    </Button>
                )}
            />}

        </Table>);
}

export default MainPage;