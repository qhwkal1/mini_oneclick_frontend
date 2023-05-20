import './App.css';
import Mypage from './pages/Mypage';
import MyEdit from './pages/MyEdit';
import MyClass from './pages/MyClass';
import Login from './pages/Login';
import MyWriteReview from './pages/MyWriteReview';
import MyUpdateReview from './pages/MyUpdateReview';
import ImgTest from './pages/ImgTest';
import MyCart from './pages/MyCart';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import AdminLogin from './pages/AdminLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserStore from './context/UserStore';
import Subs from './pages/Subs';
import Payment from './pages/Payment';
import OrdinaryPayment from './pages/OrdinaryPayment';
import PayComplite from './pages/PayComplite';
import Refund from './pages/Refund';
import Lecture from './pages/Lecture_Main';


function App() {
  return (
   <>
   <UserStore>
   <Router>
        <Routes>
         
          <Route path="/Mypage" element={<Mypage />}/>
          <Route path="/MyEdit" element={<MyEdit />} />
          <Route path="/MyClass" element={<MyClass />} />
          <Route path="/Login" element={<Login />}/>
          <Route path="/imgUpload" element={<ImgTest />}/>
          <Route path="/MyCart" element={<MyCart />}/>
          <Route path="/SignUp" element={<SignUp />}/>
          <Route path='/FindId' element={<FindId />} />
          <Route path='/FindPw' element={<FindPw />} />
          <Route path="/Subs" element={<Subs />}/>
          <Route path="/Payment" element={<Payment />}/>
          <Route path="/OrdinaryPayment" element={<OrdinaryPayment />}/>
          <Route path="/PayComplite" element={<PayComplite />}/>
          <Route path="/Refund" element={<Refund />}/>
          <Route path="/Class" element={<Lecture />}/>
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path="/MyWriteReview/:lectureId" element={<MyWriteReview />}/>
          <Route path="/MyUpdateReview/:lectureId/:reviewNum" element={<MyUpdateReview />}/>
          <Route path='/Search/:searchInput' element={<Search />}/>
          <Route path="/Home" element={<Home />}/>  
          <Route path="/" element={<Home />}/>  
        </Routes>
      </Router>
      </UserStore>
   </>
  );
}

export default App;
