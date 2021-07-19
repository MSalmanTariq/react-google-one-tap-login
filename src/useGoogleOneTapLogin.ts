import { useEffect } from 'react';
import {
  IUseGoogleOneTapLogin,
  IGoogleCallbackResponse,
  IGoogleEndPointResponse,
} from './types';
import useScript from './useScript';

const scriptFlag: string = '__googleOneTapScript__';
const googleClientScriptURL: string = 'https://accounts.google.com/gsi/client';
const oauthEndpointURL: string =
  'https://oauth2.googleapis.com/tokeninfo?id_token=';

function callback({
  data,
  onError,
  onSuccess,
}: {
  data: IGoogleCallbackResponse;
  onError?: IUseGoogleOneTapLogin['onError'];
  onSuccess?: IUseGoogleOneTapLogin['onSuccess'];
}) {
  if (data?.credential) {
    fetch(`${oauthEndpointURL}${data.credential}`)
      .then((resp) => {
        if (resp?.status === 200 && resp?.json) {
          return resp.json();
        } else {
          onError ? onError() : null;
          throw new Error('Something went wrong');
        }
      })
      .then((resp: IGoogleEndPointResponse) => {
        onSuccess ? onSuccess(resp) : null;
      })
      .catch((error) => {
        onError ? onError(error) : null;
        throw error;
      });
  }
}

export function useGoogleOneTapLogin({
  onError,
  disabled,
  onSuccess,
  googleAccountConfigs,
}: IUseGoogleOneTapLogin) {
  const script = useScript(googleClientScriptURL);

  useEffect(() => {
    if (!window?.[scriptFlag] && window.google && script === 'ready') {
      window.google.accounts.id.initialize({
        ...googleAccountConfigs,
        callback: (data: IGoogleCallbackResponse) =>
          callback({ data, onError, onSuccess }),
      });
      window[scriptFlag] = true;
    }
    if (window?.[scriptFlag] && script === 'ready' && !disabled) {
      window.google.accounts.id.prompt();
    }
  }, [script, window?.[scriptFlag], disabled]);

  return null;
}
