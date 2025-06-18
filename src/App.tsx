import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
// import Demo from './select';
// import Counter from './features/counter/index';
// import Cards from '@/features/card/index';
import Transaction from '@/features/transaction/index';
import Login from '@/features/user/index';
import Home from '@/features/home/index';
import './App.css';

function App() {
  return (
    <Box bg='white' w='100%' padding='48px'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/transaction' element={<Transaction />} />
      </Routes>
    </Box>
  );
}

export default App;
