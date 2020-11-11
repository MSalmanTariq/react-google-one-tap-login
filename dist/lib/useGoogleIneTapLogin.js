"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGoogleOneTapLogin = void 0;
var react_1 = require("react");
var useScript_1 = __importDefault(require("./useScript"));
var scriptFlag = '__googleOneTapLoginScript__';
var googleClientScriptURL = 'https://accounts.google.com/gsi/client';
var oauthEndpointURL = 'https://oauth2.googleapis.com/tokeninfo?id_token=';
function callback(_a) {
    var data = _a.data, onError = _a.onError, onSuccess = _a.onSuccess;
    if (data === null || data === void 0 ? void 0 : data.credential) {
        fetch("" + oauthEndpointURL + data.credential)
            .then(function (resp) {
            if ((resp === null || resp === void 0 ? void 0 : resp.status) === 200 && (resp === null || resp === void 0 ? void 0 : resp.json)) {
                return resp.json();
            }
            else {
                onError();
                throw new Error('Something went wrong');
            }
        })
            .then(function (resp) {
            onSuccess(resp);
        })
            .catch(function (error) {
            onError(error);
            throw error;
        });
    }
}
function useGoogleOneTapLogin(_a) {
    var onError = _a.onError, disabled = _a.disabled, onSuccess = _a.onSuccess, googleAccountConfigs = _a.googleAccountConfigs;
    var loaded = window === null || window === void 0 ? void 0 : window[scriptFlag];
    var script = useScript_1.default(googleClientScriptURL);
    react_1.useEffect(function () {
        if (!loaded && script === 'ready') {
            window.google.accounts.id.initialize(__assign(__assign({}, googleAccountConfigs), { callback: function (data) {
                    return callback({ data: data, onError: onError, onSuccess: onSuccess });
                } }));
            window[scriptFlag] = true;
        }
        if (loaded && script === 'ready' && !disabled) {
            window.google.accounts.id.prompt();
        }
    }, [script, loaded, disabled]);
    return null;
}
exports.useGoogleOneTapLogin = useGoogleOneTapLogin;
//# sourceMappingURL=useGoogleIneTapLogin.js.map