import { Link } from 'react-router-dom';

const HomeIndex = () => {
  return (
    <div>
      <Link to='/login'>登入</Link>
      <br />
      <Link to='/transaction'>交易</Link>
    </div>
  );
};

export default HomeIndex;
