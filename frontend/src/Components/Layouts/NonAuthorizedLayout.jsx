import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MainPage from "../MainPage/MainPage";
const { Header, Content, Footer } = Layout;

const AuthorizedLayout = ({ children }) => {
    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                    items={[{ key: "home", label: "Home" },
                    { key: "about", label: "About" }]}
                />
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                <MainPage />
            </Content>
            <Footer style={{ textAlign: 'center' }}>InforceTestingApp</Footer>
        </Layout>
    );
}

export default AuthorizedLayout;