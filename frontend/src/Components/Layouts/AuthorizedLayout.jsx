import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MainPage from "../MainPage/MainPage";
import Details from "../Details/Details";
import CreateLink from "../CreateLink/CreateLink";
import About from "../About/About";
import { connect } from 'react-redux';
import { logout } from '../../data/actionCreators/LoginActions';
import PropTypes from 'prop-types';
const { Header, Content, Footer } = Layout;


const AuthorizedLayout = ({ children, logout }) => {
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
                        <span>Create</span>
                        <Link to="/create" />
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => { logout(); }}>
                        <span>Logout</span>
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

AuthorizedLayout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect((state) => { return {} }, { logout })(AuthorizedLayout);