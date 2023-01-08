import 'antd/dist/antd.css';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
const LogIn
    = () => {
        let navigate = useNavigate();
        return (
            <div>
                <Input
                    placeholder="Username"
                    suffix={
                        <Tooltip title="Enter your username">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />

                <Input.Password placeholder="Input password" />

                <Button type="primary" block>
                    LOGIN
                </Button>
                <Button type="primary" block onClick={() => navigate("/register")}>
                    SIGN UP
                </Button>
            </div >
        );
    }

export default LogIn;