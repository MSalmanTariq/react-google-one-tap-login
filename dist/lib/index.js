"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGoogleOneTapLogin = void 0;
var react_1 = require("react");
var useGoogleIneTapLogin_1 = require("./useGoogleIneTapLogin");
Object.defineProperty(exports, "useGoogleOneTapLogin", { enumerable: true, get: function () { return useGoogleIneTapLogin_1.useGoogleOneTapLogin; } });
function GoogleOneTapLogin(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    useGoogleIneTapLogin_1.useGoogleOneTapLogin(props);
    return children;
}
exports.default = react_1.memo(GoogleOneTapLogin);
//# sourceMappingURL=index.js.map