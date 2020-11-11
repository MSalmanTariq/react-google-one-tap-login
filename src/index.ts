import { memo } from 'react';
import { IGoogleOneTapLogin } from './types';
import { useGoogleOneTapLogin } from './useGoogleIneTapLogin';

function GoogleOneTapLogin({ children, ...props }: IGoogleOneTapLogin) {
  useGoogleOneTapLogin(props);
  return children;
}

export default memo(GoogleOneTapLogin);

export { useGoogleOneTapLogin };
