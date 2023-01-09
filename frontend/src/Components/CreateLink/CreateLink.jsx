import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';

const CreateLink = () => {
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

            <Button type="primary" block style={{ marginTop: "10px" }}>
                Create
            </Button>
            {/* <Button type="primary" block onClick={() => navigate("/register")}>
            </Button> */}
        </div >
    );
}

export default CreateLink;