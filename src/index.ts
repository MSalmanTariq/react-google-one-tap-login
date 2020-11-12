import { memo } from 'react';
import { IGoogleOneTap } from './types';
import { useGoogleOneTap } from './useGoogleOneTap';

function GoogleOneTap({ children, ...props }: IGoogleOneTap) {
  useGoogleOneTap(props);
  return children;
}

export default memo(GoogleOneTap);

export { useGoogleOneTap };
