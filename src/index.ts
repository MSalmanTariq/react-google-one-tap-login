import { memo } from 'react';
import { IGoogleOneTapLogin } from './types';
import { useGoogleOneTapLogin } from './useGoogleOneTap';

function GoogleOneTapLogin({ children, ...props }: IGoogleOneTapLogin) {
  useGoogleOneTapLogin(props);
  return children;
}

export default memo(GoogleOneTapLogin);

export { useGoogleOneTapLogin };
