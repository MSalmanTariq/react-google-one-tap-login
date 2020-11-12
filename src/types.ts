import { ReactElement } from 'react';

declare global {
  interface Window {
    google: any;
    [key: string]: any;
  }
}

export interface IGoogleOneTap extends IUseGoogleOneTap {
  children: ReactElement;
}

export interface IUseGoogleOneTap {
  disabled?: boolean;
  onError: (error?: Error | string) => void;
  googleAccountConfigs: IGoogleOneTapProps;
  onSuccess: (response: IGoogleEndPointResponse) => void;
}

export interface IGoogleOneTapProps {
  nonce?: boolean;
  context?: string;
  client_id: string;
  callback?: boolean;
  auto_select?: boolean;
  native_callback?: boolean;
  prompt_parent_id?: boolean;
  state_cookie_domain?: string;
  cancel_on_tap_outside?: boolean;
}

export interface IGoogleCallbackResponse {
  credential?: string;
}

export interface IGoogleEndPointResponse {
  iss: string;
  sub: string;
  azp: string;
  aud: string;
  iat: string;
  exp: string;
  name: string;
  email: string;
  local: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: string;
}
