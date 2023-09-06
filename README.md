# React - Google One Tap Login

React wrapper for Google one tap authentication.

## Install

Using npm:

```
npm install react-google-one-tap-login
```

Or using yarn:

```
yarn add react-google-one-tap-login
```

## How to use

### As a Hook

```js
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

useGoogleOneTapLogin({
    onError: error => console.log(error),
    onSuccess: response => console.log(response),
    googleAccountConfigs: {
      client_id: // Your google client id here !!!
    },
  });
```

### As a Component

```js
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleOneTapLogin from 'react-google-one-tap-login';

ReactDOM.render(
  <GoogleOneTapLogin 
      onError={(error) => console.log(error)}
      onSuccess={(response) => console.log(response)}
      googleAccountConfigs={{ client_id: // Your google client id here !!! }} 
  />,
  document.getElementById('root')
);
```

## Example: Next.js 13 (App Router)

This example covers a scenario on how to handle login process with cookies in a Next.js 13 app. Detailed information and example codes can be found in the [nextjs13 directory](/nextjs13/) or you can [read more in the dedicated README](/nextjs13/README.md).

## Props

| Name                   | Type     | Required |                                                         Description                                                          |
| ---------------------- | -------- | :------: | :--------------------------------------------------------------------------------------------------------------------------: |
| disabled               | boolean  |  false   |                                                   Disable the login prompt                                                   |
| onError                | callback |  false   |                                                       onError : Error                                                        | null |
| onSuccess              | callback |  false   |                                        onSuccess : GoogleEndpointResponse (See below)                                        |
| disableCancelOnUnmount | boolean  |  false   |                                       Disable cancelation of one tap login on unmount                                        |
| googleAccountConfigs   | object   |   true   | [Google One Tap JS API Reference](https://developers.google.com/identity/one-tap/web/reference/js-reference#IdConfiguration) |

#### \*client_id is required in googleAccountConfigs

## Google EndPoint Response

[More details](https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint)
| Name | Type |
|----------------|--------|
| iss | string |
| sup | string |
| azp | string |
| aud | string |
| iat | string |
| exp | string |
| name | string |
| email | string |
| local | string |
| picture | string |
| given_name | string |
| family_name | string |
| email_verified | string |
