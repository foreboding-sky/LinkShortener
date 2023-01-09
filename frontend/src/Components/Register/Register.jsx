import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
const Register
    = () => {
        let navigate = useNavigate();
        return (
            <div>
                <Input
                    style={{ marginTop: "5px" }}
                    placeholder="Username"
                    suffix={
                        <Tooltip title="Enter your username">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />

                <Input.Password placeholder="Input password" style={{ marginTop: "5px" }} />
                <Input.Password placeholder="Repeat password" style={{ marginTop: "5px" }} />

                <Button type="primary" block style={{ marginTop: "5px" }}>
                    REGISTER
                </Button>
                <Button type="primary" block style={{ marginTop: "5px" }} onClick={() => navigate("*")}>
                    LOGIN
                </Button>
            </div>
        );
    }

export default Register;