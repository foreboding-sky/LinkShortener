import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CreateLink = () => {

    const [link, setLink] = useState('');

    const Create = () => {
        axios.post("/api/Links", { LongLink: link }).then(res => { navigate('*') }).catch((error) => { console.log(error) })
    };
    let navigate = useNavigate();
    return (
        <div style={{
            width: "500px",
            marginTop: "50px",
            margin: "auto",
        }}>
            <label>
                Entry your URL here:
            </label>
            <Input
                onChange={(e) => { setLink(e.target.value) }}
                placeholder="Enter your URL"
                style={{
                    marginTop: "10px",
                }}
                suffix={
                    <Tooltip title="Enter your link here">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />

            <Button type="primary" block onClick={() => { Create() }} style={{ marginTop: "10px" }}>
                Create
            </Button>
            {/* <Button type="primary" block onClick={() => navigate("/register")}>
            </Button> */}
        </div >
    );
}

export default CreateLink;