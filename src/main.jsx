import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './css/app.css';
import './css/features.css';
import './css/adminpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ServiceScreen from './screens/ServiceScreen';
import ContactScreen from './screens/ContactScreen';
// features import
import MSHome from './screens/moviesandsongs/MSHome.jsx';
import UploadVideoPage from "./screens/moviesandsongs/UploadVideoPage.jsx";
import HomepageofMS from './screens/moviesandsongs/Home.jsx'
import MuseumHome from './screens/virtualmuseum/MuseumHome.jsx';
import SHome from './screens/subscription/SHome.jsx';
import SubscriptionHomePage from './screens/subscription/Home.jsx';
import MuseumHomeMain from './screens/virtualmuseum/home.jsx';
import GameHome from './screens/games/GameHome.jsx'
import TTTGAME from './screens/games/TicTacToeGame.jsx'
import SnakeGame from './screens/games/snakegame/SnakeGame.jsx';
import PuzzleGame from './screens/games/PuzzleGame.jsx'
import MEUsers from './screens/admin_screens/MEUsers.jsx';
import MEVideos from './screens/admin_screens/MEVideos.jsx';
import KaraokeHome from './screens/karaoke/karaokeHome.jsx'
import ChatHome from './screens/ChatHome.jsx';
import Modal from 'react-modal';
import ResetPasswordScreen from './screens/ResetPasswordScreen.jsx'; // Replace 'path/to' with the actual path to your ResetPasswordScreen component file
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

Modal.setAppElement('#root'); // Set the root element as the app element

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/service' element={<ServiceScreen />} />
      <Route path='/contact' element={<ContactScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* <Route path='/mshome' element={<MSHome />} /> */}
      <Route path='/updatepassword/:token' element={<ResetPasswordScreen />} />


      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/homepageofms' element={<HomepageofMS />} />
        <Route path='/mshome' element={<MSHome />} />
        <Route path='/video/upload' element={<UploadVideoPage />} />
        <Route path='/shome' element={<SHome />} />
        <Route path='/museumhome' element={< MuseumHome />} />
        <Route path='/submainhome' element={< SubscriptionHomePage />} />
        <Route path='/mhome' element={<MuseumHomeMain />} />
        <Route path='/gamehome' element={<GameHome />} />
        <Route path='/snakegame' element={<SnakeGame />} />
        <Route path='/tttgame' element={<TTTGAME />} />
        <Route path='/puzzlegame' element={<PuzzleGame />} />
        <Route path='/meusers' element={< MEUsers />} />
        <Route path='/mevideos' element={<MEVideos />} />
        <Route path='/karaokehome' element={<KaraokeHome />} />
        <Route path='/chathome' element={<ChatHome />} />

      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)