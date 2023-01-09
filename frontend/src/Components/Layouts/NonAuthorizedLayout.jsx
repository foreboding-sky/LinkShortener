import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MainPage from "../MainPage/MainPage";
const { Header, Content, Footer } = Layout;


const NonAuthorizedLayout = ({ children }) => {
    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <Menu
                    defaultSelectedKeys={['1']}
                    theme="dark"
                    mode="horizontal"
                >
                    <Menu.Item key="1">
                        <span>Home</span>
                        <Link to="/" />
                    </Menu.Item>
                    <Menu.Item key="2">
                        <span>About</span>
                        <Link to="/about" />
                    </Menu.Item>
                    <Menu.Item key="3">
                        <span>Login</span>
                        <Link to="/login" />
                    </Menu.Item>
                    <Menu.Item key="4">
                        <span>Register</span>
                        <Link to="/register" />
                    </Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>InforceTestingApp</Footer>
        </Layout>
    );
}

export default NonAuthorizedLayout;