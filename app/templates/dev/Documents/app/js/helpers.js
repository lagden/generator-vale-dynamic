// Console
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "markTimeline", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Trim
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

// Load Css
function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

// Load Script
function loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Find object
function getObjects(obj, key, val, only) {
    only = only || false;
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val, only));
        } else if (i == key && obj[key] == val) {
            if(only) {
                if(!!obj[only])
                    objects.push(obj);
            } else
                objects.push(obj);
        }
    }
    return objects;
}

// Check style support
function styleSupport(prop) {
    var vendorProp, supportedProp,
        capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        prefixes = ["Moz", "Webkit", "O", "ms"],
        div = document.createElement("div");

    if (prop in div.style) {
        supportedProp = prop;
    } else {
        for (var i = 0; i < prefixes.length; i++) {
            vendorProp = prefixes[i] + capProp;
            if (vendorProp in div.style) {
                supportedProp = vendorProp;
                break;
            }
        }
    }

    div = null;
    return supportedProp;
}