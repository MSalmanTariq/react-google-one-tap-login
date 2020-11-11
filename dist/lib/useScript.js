"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://usehooks.com/useScript/
var react_1 = require("react");
function useScript(src) {
    // Keep track of script status ("idle", "loading", "ready", "error")
    var _a = react_1.useState(src ? 'loading' : 'idle'), status = _a[0], setStatus = _a[1];
    react_1.useEffect(function () {
        // Allow falsy src value if waiting on other data needed for
        // constructing the script URL passed to this hook.
        if (!src) {
            setStatus('idle');
            return;
        }
        // Fetch existing script element by src
        // It may have been added by another intance of this hook
        var script = document.querySelector("script[src=\"" + src + "\"]");
        if (!script) {
            // Create script
            script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.setAttribute('data-status', 'loading');
            // Add script to document body
            document.body.appendChild(script);
            // Store status in attribute on script
            // This can be read by other instances of this hook
            var setAttributeFromEvent = function (event) {
                !!script &&
                    script.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
            };
            script.addEventListener('load', setAttributeFromEvent);
            script.addEventListener('error', setAttributeFromEvent);
        }
        else {
            // Grab existing script status from attribute and set to state.
            setStatus(script.getAttribute('data-status') || 'idle');
        }
        // Script event handler to update status in state
        // Note: Even if the script already exists we still need to add
        // event handlers to update the state for *this* hook instance.
        var setStateFromEvent = function (event) {
            setStatus(event.type === 'load' ? 'ready' : 'error');
        };
        // Add event listeners
        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);
        // Remove event listeners on cleanup
        return function () {
            if (script) {
                script.removeEventListener('load', setStateFromEvent);
                script.removeEventListener('error', setStateFromEvent);
            }
        };
    }, [src]);
    return status;
}
exports.default = useScript;
//# sourceMappingURL=useScript.js.map