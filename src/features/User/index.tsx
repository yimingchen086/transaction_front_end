import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loginGoogle } from './action';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useAppDispatch();
  const { googleUserInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(googleUserInfo);
  }, [googleUserInfo]);
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            const decoded: any = jwtDecode(credentialResponse.credential);
            console.log('登入成功', decoded);
            // decoded.name / decoded.email / decoded.picture 都可以拿來用
            // 將 credential 傳給後端驗證
            dispatch(loginGoogle(credentialResponse.credential));
          }
        }}
        onError={() => {
          console.log('登入失敗');
        }}
      />
    </div>
  );
};

export default Login;
