import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Button, Input, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../data/actionCreators/LoginActions';
import PropTypes from 'prop-types';
const Login
    = ({ login }) => {

        const [userName, setUserName] = useState('');
        const [password, setPassword] = useState('');

        let navigate = useNavigate();
        return (
            <div>
                <Input onChange={(e) => { setUserName(e.target.value) }}
                    style={{ marginTop: "5px" }}
                    placeholder="Username"
                    suffix={
                        <Tooltip title="Enter your username">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />
                <Input.Password onChange={(e) => { setPassword(e.target.value) }} placeholder="Input password" style={{ marginTop: "5px" }} />

                <Button type="primary" block onClick={() => { login({ userName, password }) }} style={{ marginTop: "5px" }}>
                    LOGIN
                </Button>
                <Button type="primary" block style={{ marginTop: "5px" }} onClick={() => navigate("/register")}>
                    SIGN UP
                </Button>
            </div >
        );
    }

Login.propTypes = {
    login: PropTypes.func.isRequired
}
export default connect((state) => { return {} }, { login })(Login);