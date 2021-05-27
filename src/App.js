import './styles/main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import AccDetails from './pages/linked/AccDetails';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Panel from './pages/admin/Panel';
import Bookings from './pages/admin/bookings/Bookings';
import BookingDetails from './pages/admin/bookings/BookingDetails'
import Messages from './pages/admin/messages/Messages';
import MessageDetails from './pages/admin/messages/MessageDetails';
import CreateEst from './pages/admin/establishments/CreateEst';
import EditEst from './pages/admin/establishments/EditEst';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <ScrollToTop />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/accommodation' exact component={Accommodation} />
          <Route path='/accommodation/details/:id' exact component={AccDetails}/>
          <Route path='/contact' exact component={Contact} />
          <Route path='/login' exact component={Login} />
          <Route path='/panel' exact component={Panel} />
          <Route path='/panel/bookings' exact component={Bookings} />
          <Route path='/panel/bookings/details/:id' exact component={BookingDetails} />
          <Route path='/panel/messages' exact component={Messages} />
          <Route path='/panel/messages/details/:id' exact component={MessageDetails} />
          <Route path='/panel/est/create' exact component={CreateEst} />
          <Route path='/panel/est/edit/:id' exact component={EditEst} />
        </Switch>
        <Footer/>
      </Router>
     </AuthProvider>
  );
}

export default App;
