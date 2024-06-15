import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './Layout';
import { Signup } from './components/Signup';
import { Verfication } from './components/Verfication';

function App() {
  return (
    <>
    <BrowserRouter>
    <Layout/>
    <Routes>
      {/* <Route path="/" element={Layout}></Route> */}
      <Route path="/" element={<Signup/>}></Route>
      <Route path='/signup/verification/:emailid' element={<Verfication/>}/>
    </Routes>
    </BrowserRouter>
    

    </>
  );
}

export default App;
