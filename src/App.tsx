import { Box } from '@chakra-ui/react';
// import Demo from './select';
// import Counter from './features/counter/index';
// import Cards from '@/features/card/index';
import Transaction from '@/features/transaction/index';
import Login from '@/features/User/index';
import './App.css';

function App() {
  return (
    <Box bg='white' w='100%' padding='48px'>
      {/* <Cards /> */}
      <Login />
      {/* <Transaction /> */}
    </Box>
  );
}

export default App;
