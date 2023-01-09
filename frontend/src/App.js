import logo from './logo.svg';
import './App.css';
import AuthorizedLayout from './Components/Layouts/AuthorizedLayout';
import NonAuthorizedLayout from './Components/Layouts/NonAuthorizedLayout';
import MainPage from './Components/MainPage/MainPage';
import About from './Components/About/About';
import CreateLink from './Components/CreateLink/CreateLink';
import Details from './Components/Details/Details';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import store from './data/Store'
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  let test = store.getState();
  const isAuthorized = store.getState()?.AuthorizationReducer?.isAuthorized;
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          {
            isAuthorized ?
              <AuthorizedLayout>
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/create" element={<CreateLink />} />
                  <Route path="/details/:id" element={<Details />} />
                  <Route path="*" element={<MainPage />} />
                </Routes>
              </AuthorizedLayout>
              :
              <NonAuthorizedLayout>
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<MainPage />} />
                </Routes>
              </NonAuthorizedLayout>
          }
        </Router>
      </div>
    </Provider>
  );
}

export default App;
