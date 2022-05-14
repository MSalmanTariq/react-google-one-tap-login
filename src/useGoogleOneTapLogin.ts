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
    const id_token = data.credential;
    console.log("got id_token: " + id_token);
    fetch(`${oauthEndpointURL}${id_token}`)
      .then((resp) => {
        if (resp?.status === 200 && resp?.json) {
          return resp.json();
        } else {
          if (onError) {
            onError();
          }
          throw new Error('Something went wrong');
        }
      })
      .then((resp: IGoogleEndPointResponse) => {
        if (onSuccess) {
          resp.id_token = id_token;
          onSuccess(resp);
        }
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
        throw error;
      });
  }
}

export function useGoogleOneTapLogin({
  onError,
  disabled,
  onSuccess,
  googleAccountConfigs,
  disableCancelOnUnmount = false,
}: IUseGoogleOneTapLogin) {
  const script = useScript(googleClientScriptURL);
  // Use the user's custom callback if they specified one; otherwise use the default one defined above:
  const callbackToUse = googleAccountConfigs.callback
    ? googleAccountConfigs.callback
    : (data: IGoogleCallbackResponse) => callback({ data, onError, onSuccess });

  useEffect(() => {
    if (!window?.[scriptFlag] && window.google && script === 'ready') {
      window.google.accounts.id.initialize({
        ...googleAccountConfigs,
        callback: callbackToUse,
      });
      window[scriptFlag] = true;
    }
    if (window?.[scriptFlag] && script === 'ready' && !disabled) {
      window.google.accounts.id.prompt();

      return () => {
        if (!disableCancelOnUnmount) {
          window.google.accounts.id.cancel();
        }
      };
    }
  }, [script, window?.[scriptFlag], disabled]);

  return null;
}
