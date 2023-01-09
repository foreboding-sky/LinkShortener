import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';

const About = () => {
    return (
        <div style={{
            width: "500px",
            marginTop: "50px",
            margin: "auto",
        }}>
            <label>
                This is Link Shortener app.
                <br />You can use it to create short version of your URL.
                <br />Login or Register to access the ability to create shortened links.
            </label>
        </div >
    );
}

export default About;