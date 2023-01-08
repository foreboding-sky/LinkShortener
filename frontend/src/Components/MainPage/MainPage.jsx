import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;


const MainPage = () => {

    // useEffect(() => {
    //     console.log("sas");
    //     axios.get("/api/Rab/all").then(res => {
    //         setArray(res.data);
    //         console.log(res.data);
    //     });
    // }, []);

    // const [count, setCount] = useState(0);
    // const [array, setArray] = useState([]);
    const data = [
        {
            key: '1',
            longLink: 'John',
            shortLink: 'Brown',
        },
        {
            key: '2',
            longLink: 'Jim',
            shortLink: 'Green',
        },
        {
            key: '3',
            longLink: 'Joe',
            shortLink: 'Black',
        },
    ];


    return (
        <Table dataSource={data}>
            <ColumnGroup title="Name">
                <Column title="Long Url" dataIndex="longLink" key="longLink" />
                <Column title="Short Url" dataIndex="shortLink" key="shortLink" />
            </ColumnGroup>
            <Column
                title="Delete Link"
                key="action"
                width={"200px"}
                render={(_, record) => (
                    <Space size="middle">
                        <a>Delete</a>
                    </Space>
                )}
            />
        </Table>);
}

export default MainPage;