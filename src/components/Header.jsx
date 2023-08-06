import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../images/logo2.gif';
import logo2 from '../images/logo1.gif';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Check if the user is an admin
  const isAdmin = userInfo && userInfo._id === '64be7487c7e3c685cd39cb1d';

  return (
    <nav className="navbar shadow navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid" style={{ backgroundColor: '#e0f2f1' }}>
        <NavLink className="navbar-brand" to="/">
          <div className="logo-container">
            <img src={logo2} alt="logo" />
            <img src={logo} alt="logo" />
          </div>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav navbar-link ms-auto mb-2 mb-lg-0">
            {userInfo ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/service">
                    Services
                  </NavLink>
                </li>
                {isAdmin ? (
                  // Render this if the user is an admin
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/meusers">
                        MEUsers
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/mevideos">
                        MEVideos
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" style={{ color: '#27ae60' }} to="/profile">
                        {userInfo.name}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link btn btn-link" onClick={logoutHandler}>
                        Logout
                      </NavLink>
                    </li>
                  </>
                ) : (
                  // Render this if the user is not an admin
                  <>

                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contact">
                        Contact
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/submainhome">
                        Subscription
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/chathome">
                        Chat
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" style={{ color: '#27ae60' }} to="/profile">
                        {userInfo.name}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link btn btn-link" onClick={logoutHandler}>
                        Logout
                      </NavLink>
                    </li>
                  </>
                )}
              </>
            ) : (
              // Render this if the user is not logged in
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/service">
                    Service
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: '#27ae60' }} to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
