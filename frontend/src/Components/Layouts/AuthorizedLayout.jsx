import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MainPage from "../MainPage/MainPage";
import Details from "../Details/Details";
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
                    { key: "about", label: "About" },
                    { key: "add", label: "Create Link" }]}
                />
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                <MainPage />
                <Details />
            </Content>
            <Footer style={{ textAlign: 'center' }}>InforceTestingApp</Footer>
        </Layout>
    );
}

export default AuthorizedLayout;