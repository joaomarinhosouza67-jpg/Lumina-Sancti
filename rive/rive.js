(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rive"] = factory();
	else
		root["rive"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: () => (/* reexport safe */ _Animation__WEBPACK_IMPORTED_MODULE_0__.Animation)
/* harmony export */ });
/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: () => (/* binding */ Animation)
/* harmony export */ });
/**
 * Represents an animation that can be played on an Artboard.
 * Wraps animations and instances from the runtime and keeps track of playback state.
 *
 * The `Animation` class manages the state and behavior of a single animation instance,
 * including its current time, loop count, and ability to scrub to a specific time.
 *
 * The class provides methods to advance the animation, apply its interpolated keyframe
 * values to the Artboard, and clean up the underlying animation instance when the
 * animation is no longer needed.
 */
var Animation = /** @class */ (function () {
    /**
     * Constructs a new animation
     * @constructor
     * @param {any} animation: runtime animation object
     * @param {any} instance: runtime animation instance object
     */
    function Animation(animation, artboard, runtime, playing) {
        this.animation = animation;
        this.artboard = artboard;
        this.playing = playing;
        this.loopCount = 0;
        /**
         * The time to which the animation should move to on the next render.
         * If not null, the animation will scrub to this time instead of advancing by the given time.
         */
        this.scrubTo = null;
        this.instance = new runtime.LinearAnimationInstance(animation, artboard);
    }
    Object.defineProperty(Animation.prototype, "name", {
        /**
         * Returns the animation's name
         */
        get: function () {
            return this.animation.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "time", {
        /**
         * Returns the animation's name
         */
        get: function () {
            return this.instance.time;
        },
        /**
         * Sets the animation's current time
         */
        set: function (value) {
            this.instance.time = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "loopValue", {
        /**
         * Returns the animation's loop type
         */
        get: function () {
            return this.animation.loopValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "needsScrub", {
        /**
         * Indicates whether the animation needs to be scrubbed.
         * @returns `true` if the animation needs to be scrubbed, `false` otherwise.
         */
        get: function () {
            return this.scrubTo !== null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Advances the animation by the give time. If the animation needs scrubbing,
     * time is ignored and the stored scrub value is used.
     * @param time the time to advance the animation by if no scrubbing required
     */
    Animation.prototype.advance = function (time) {
        if (this.scrubTo === null) {
            this.instance.advance(time);
        }
        else {
            this.instance.time = 0;
            this.instance.advance(this.scrubTo);
            this.scrubTo = null;
        }
    };
    /**
     * Apply interpolated keyframe values to the artboard. This should be called after calling
     * .advance() on an animation instance so that new values are applied to properties.
     *
     * Note: This does not advance the artboard, which updates all objects on the artboard
     * @param mix - Mix value for the animation from 0 to 1
     */
    Animation.prototype.apply = function (mix) {
        this.instance.apply(mix);
    };
    /**
     * Deletes the backing Wasm animation instance; once this is called, this
     * animation is no more.
     */
    Animation.prototype.cleanup = function () {
        this.instance.delete();
    };
    return Animation;
}());



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RuntimeLoader: () => (/* binding */ RuntimeLoader)
/* harmony export */ });
/* harmony import */ var _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _rive_threads_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _rive_threads_mjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rive_threads_mjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var package_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
var __assign = (undefined && undefined.__assign) || function () {
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



// A module with a shared memory, an atomic load and a SIMD constant.
var threadsProbe = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x09, 0x02, 0x60, 0x00,
    0x01, 0x7f, 0x60, 0x00, 0x01, 0x7b, 0x03, 0x03, 0x02, 0x00, 0x01, 0x05, 0x04,
    0x01, 0x03, 0x01, 0x01, 0x0a, 0x1f, 0x02, 0x08, 0x00, 0x41, 0x00, 0xfe, 0x10,
    0x02, 0x00, 0x0b, 0x14, 0x00, 0xfd, 0x0c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0b,
]);
// Null when this page can run the threaded build, else why not. A page that
// is not isolated gets no shared memory, and the threaded build never loads.
function threadsRefusal() {
    if (globalThis.crossOriginIsolated !== true) {
        return "the page is not cross origin isolated";
    }
    try {
        new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
    }
    catch (_a) {
        return "the page cannot share memory with workers";
    }
    if (!WebAssembly.validate(threadsProbe)) {
        return "the browser cannot run wasm threads with SIMD";
    }
    return null;
}
// The runtime's ceiling for maxResponseBytes.
var maxScriptFetchResponseBytes = 64 * 1024 * 1024;
// A non-negative integer that fits in a uint32, else the fallback.
var uint32Option = function (value, fallback) {
    return typeof value === "number" &&
        Number.isInteger(value) &&
        value >= 0 &&
        value <= 0xffffffff
        ? value
        : fallback;
};
var hostPattern = /^(\*\.)?[a-z0-9-]+(\.[a-z0-9-]+)*$/;
// Warns about allowedHosts entries that never match, or match a whole
// top-level domain.
var checkAllowedHosts = function (hosts) {
    for (var _i = 0, hosts_1 = hosts; _i < hosts_1.length; _i++) {
        var entry = hosts_1[_i];
        var host = String(entry).trim().toLowerCase();
        if (host === "*") {
            continue;
        }
        if (!hostPattern.test(host)) {
            console.warn("[Rive] allowedHosts entry \"".concat(entry, "\" never matches. Use a host name ") +
                "(\"api.example.com\"), \"*.example.com\" or \"*\".");
        }
        else if (host.startsWith("*.") && !host.includes(".", 2)) {
            console.warn("[Rive] allowedHosts entry \"".concat(entry, "\" allows every host under a ") +
                "top-level domain.");
        }
    }
};
// Warns about a proxy on this page's own origin, where the iframe's sandbox
// keeps nothing apart from the page.
var checkProxyUrl = function (proxyUrl) {
    var origin;
    try {
        origin = new URL(proxyUrl, document.baseURI).origin;
    }
    catch (_a) {
        return;
    }
    if (origin === location.origin) {
        console.warn("[Rive] proxyUrl \"".concat(proxyUrl, "\" is on this page's origin, so the proxy ") +
            "is not isolated from it. Host it on a separate domain.");
    }
};
// Runtime singleton; use getInstance to provide a callback that returns the
// Rive runtime
var RuntimeLoader = /** @class */ (function () {
    // Class is never instantiated
    function RuntimeLoader() {
    }
    // Rejects all pending awaitInstance() promises and resets loading state so
    // the next call to getInstance() / awaitInstance() can retry with a new URL.
    RuntimeLoader.notifyError = function (error) {
        var _a;
        RuntimeLoader.isLoading = false;
        while (RuntimeLoader.errorCallbackQueue.length > 0) {
            (_a = RuntimeLoader.errorCallbackQueue.shift()) === null || _a === void 0 ? void 0 : _a(error);
        }
        RuntimeLoader.callBackQueue = [];
    };
    RuntimeLoader.setSystemLanguages = function (languages) {
        RuntimeLoader.systemLanguages = languages;
        RuntimeLoader.applySystemLanguages();
    };
    RuntimeLoader.applySystemLanguages = function () {
        var _a, _b;
        var rive = RuntimeLoader.runtime;
        if (!rive) {
            // Applied once it loads.
            return;
        }
        var languages = (_a = RuntimeLoader.systemLanguages) !== null && _a !== void 0 ? _a : (typeof navigator !== "undefined" && navigator.languages
            ? navigator.languages
            : []);
        (_b = rive.setSystemLanguages) === null || _b === void 0 ? void 0 : _b.call(rive, __spreadArray([], languages, true));
    };
    RuntimeLoader.loaded = function (rive) {
        var _a, _b;
        if (RuntimeLoader.enablePerfMarks) {
            performance.mark('rive:wasm-init:end');
            performance.measure('rive:wasm-init', 'rive:wasm-init:start', 'rive:wasm-init:end');
        }
        RuntimeLoader.runtime = rive;
        RuntimeLoader.applyParallelParts();
        RuntimeLoader.applySystemLanguages();
        if (!RuntimeLoader.listeningForLanguageChange &&
            typeof window !== "undefined" &&
            typeof window.addEventListener === "function") {
            RuntimeLoader.listeningForLanguageChange = true;
            window.addEventListener("languagechange", function () {
                if (RuntimeLoader.systemLanguages === null) {
                    RuntimeLoader.applySystemLanguages();
                }
            });
        }
        RuntimeLoader.errorCallbackQueue = [];
        // Before any callback can import a file, so its images reach the worker.
        if (RuntimeLoader.replayWorker) {
            (_a = rive.enableReplayWorker) === null || _a === void 0 ? void 0 : _a.call(rive);
        }
        RuntimeLoader.applyScriptFetch();
        // Fire all the callbacks
        while (RuntimeLoader.callBackQueue.length > 0) {
            (_b = RuntimeLoader.callBackQueue.shift()) === null || _b === void 0 ? void 0 : _b(RuntimeLoader.runtime);
        }
    };
    // Loads the runtime, threaded once per page where it can be, and otherwise
    // without threads.
    RuntimeLoader.loadRuntime = function () {
        // Other packages bundle an empty module here, which webpack's interop
        // hands over as an object rather than undefined.
        var threaded = (_rive_threads_mjs__WEBPACK_IMPORTED_MODULE_1___default());
        var threadsUrl = RuntimeLoader.wasmThreadsURL;
        // A host's own binary is a build without threads.
        if (typeof threaded !== "function" ||
            threadsUrl === null ||
            RuntimeLoader.wasmBinary !== null ||
            RuntimeLoader.triedThreads) {
            RuntimeLoader.loadUnthreaded();
            return;
        }
        RuntimeLoader.triedThreads = true;
        var refusal = threadsRefusal();
        if (refusal !== null) {
            console.warn("Rive is running without threads: ".concat(refusal, "."));
            RuntimeLoader.loadUnthreaded();
            return;
        }
        if (RuntimeLoader.enablePerfMarks)
            performance.mark('rive:wasm-init:start');
        // Not a catch, which would also take a throw from a callback.
        threaded({ locateFile: function () { return threadsUrl; } }).then(RuntimeLoader.loaded, function (error) {
            var _a;
            console.warn("Rive is running without threads: the threaded build failed to load (".concat((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error, ")."));
            RuntimeLoader.loadUnthreaded();
        });
    };
    RuntimeLoader.loadUnthreaded = function () {
        // Capture the URL at call time so the catch closure always refers to the
        // URL this particular attempt used, even if wasmURL is mutated for a retry.
        var attemptedUrl = RuntimeLoader.wasmURL;
        var wasmBinary = RuntimeLoader.wasmBinary;
        if (RuntimeLoader.enablePerfMarks)
            performance.mark('rive:wasm-init:start');
        _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__["default"](__assign({ 
            // Loads Wasm bundle
            locateFile: function () { return attemptedUrl; } }, (wasmBinary ? { wasmBinary: wasmBinary } : {})))
            .then(RuntimeLoader.loaded)
            .catch(function (error) {
            // Capture specific error details
            var errorDetails = {
                message: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error",
                type: (error === null || error === void 0 ? void 0 : error.name) || "Error",
                // Some browsers may provide additional WebAssembly-specific details
                wasmError: error instanceof WebAssembly.CompileError ||
                    error instanceof WebAssembly.RuntimeError,
                originalError: error,
            };
            // Log detailed error for debugging
            console.debug("Rive WASM load error details:", errorDetails);
            // In case the primary URL fails, or the wasm was not supported, try the
            // fallback URL (a rive_fallback.wasm compiled for older architectures).
            // The fallback can be customised or disabled via setWasmFallbackUrl().
            // TODO: (Gordon): preemptively test browser support and load the correct wasm file. Then use the fallback only if the primary fails.
            var fallbackUrl = RuntimeLoader.wasmFallbackURL;
            var alreadyOnFallback = fallbackUrl !== null &&
                attemptedUrl.toLowerCase() === fallbackUrl.toLowerCase();
            if (fallbackUrl !== null && !alreadyOnFallback) {
                console.warn("Failed to load WASM from ".concat(attemptedUrl, " (").concat(errorDetails.message, "), trying fallback URL: ").concat(fallbackUrl));
                // Clear wasmBinary so the retry actually fetches via locateFile
                // instead of re-using the same (failing) in-memory binary.
                RuntimeLoader.wasmBinary = null;
                RuntimeLoader.setWasmUrl(fallbackUrl);
                RuntimeLoader.loadUnthreaded();
            }
            else {
                // When alreadyOnFallback is true, wasmURL has already been overwritten
                // with the fallback URL, so we can no longer recover the original
                // primary URL here. The primary URL was logged in the earlier warning.
                var triedUrls = alreadyOnFallback
                    ? "the configured WASM URL or its fallback (".concat(fallbackUrl, ")")
                    : attemptedUrl;
                var errorMessage = [
                    "Could not load Rive WASM file from ".concat(triedUrls, "."),
                    "Possible reasons:",
                    "- Network connection is down",
                    "- WebAssembly is not supported in this environment",
                    "- The WASM file is corrupted or incompatible",
                    "\nError details:",
                    "- Type: ".concat(errorDetails.type),
                    "- Message: ".concat(errorDetails.message),
                    "- WebAssembly-specific error: ".concat(errorDetails.wasmError),
                    "\nTo resolve, you may need to:",
                    "1. Check your network connection",
                    "2. Set a new WASM source via RuntimeLoader.setWasmUrl()",
                    "3. Call RuntimeLoader.awaitInstance() again",
                ].join("\n");
                console.error(errorMessage);
                RuntimeLoader.notifyError(new Error(errorMessage));
            }
        });
    };
    // Provides a runtime instance via a callback
    RuntimeLoader.getInstance = function (callback, onError) {
        // If it's not loading, start loading runtime
        if (!RuntimeLoader.isLoading) {
            RuntimeLoader.isLoading = true;
            RuntimeLoader.loadRuntime();
        }
        if (!RuntimeLoader.runtime) {
            RuntimeLoader.callBackQueue.push(callback);
            if (onError) {
                RuntimeLoader.errorCallbackQueue.push(onError);
            }
        }
        else {
            callback(RuntimeLoader.runtime);
        }
    };
    // Provides a runtime instance via a promise; rejects if WASM fails to load.
    RuntimeLoader.awaitInstance = function () {
        return new Promise(function (resolve, reject) {
            return RuntimeLoader.getInstance(resolve, reject);
        });
    };
    /**
     * @internal Resolves once the replay worker's device caps reach the page,
     * so scripts init against them. Null when there is nothing left to wait
     * for, which keeps every later instance's load synchronous.
     */
    RuntimeLoader.awaitReplayCaps = function () {
        var _a, _b;
        if (RuntimeLoader.replayCapsArrived) {
            return null;
        }
        var pending = (_b = (_a = RuntimeLoader.runtime) === null || _a === void 0 ? void 0 : _a.awaitReplayCaps) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (!pending) {
            return null;
        }
        // A worker that never answers must not hold every load back; its caps
        // then bind when the surface does, as before.
        var timeout = new Promise(function (resolve) {
            return setTimeout(resolve, RuntimeLoader.replayCapsTimeoutMs);
        });
        return Promise.race([pending, timeout]).then(function () {
            RuntimeLoader.replayCapsArrived = true;
        });
    };
    // Manually sets the wasm url
    RuntimeLoader.setWasmUrl = function (url) {
        RuntimeLoader.wasmURL = url;
    };
    // Gets the current wasm url
    RuntimeLoader.getWasmUrl = function () {
        return RuntimeLoader.wasmURL;
    };
    /**
     * Sets the URL used as a fallback when the primary WASM URL fails to load.
     * Pass `null` to disable the fallback entirely.
     *
     * Defaults to pulling from the jsdelivr CDN.
     */
    RuntimeLoader.setWasmFallbackUrl = function (url) {
        RuntimeLoader.wasmFallbackURL = url;
    };
    // Gets the current fallback wasm url (null means fallback is disabled)
    RuntimeLoader.getWasmFallbackUrl = function () {
        return RuntimeLoader.wasmFallbackURL;
    };
    /**
     * Sets the URL of the threaded build's wasm, which
     * `@rive-app/webgl2-threads` loads on a cross origin isolated page. Pass
     * `null` to always load the build without threads. Other packages have no
     * threaded build and ignore it.
     *
     * Defaults to pulling from the unpkg CDN.
     */
    RuntimeLoader.setWasmThreadsUrl = function (url) {
        RuntimeLoader.wasmThreadsURL = url;
    };
    // Gets the threaded build's wasm url (null means threads are off)
    RuntimeLoader.getWasmThreadsUrl = function () {
        return RuntimeLoader.wasmThreadsURL;
    };
    /**
     * Sets how many parts a script's parallel call gets on a page that runs
     * the threaded build, the page's thread and one worker thread for each
     * other part. 1 turns parallel calls off, and null leaves the runtime's
     * default of one part per core, up to 8. Set it before the first file
     * loads.
     */
    RuntimeLoader.setParallelParts = function (parts) {
        RuntimeLoader.parallelParts = parts;
        RuntimeLoader.applyParallelParts();
    };
    // Gets the parts set with setParallelParts (null means the default)
    RuntimeLoader.getParallelParts = function () {
        return RuntimeLoader.parallelParts;
    };
    RuntimeLoader.applyParallelParts = function () {
        var _a;
        var scripting = (_a = RuntimeLoader.runtime) === null || _a === void 0 ? void 0 : _a.riveScripting;
        if (scripting) {
            scripting.parallelParts = RuntimeLoader.parallelParts;
        }
    };
    /**
     * @experimental When the threaded build loads, instances with
     * `enableGPUCanvas` hand their canvas to one worker that replays every
     * instance's frames while the page records the next ones. Pass `false`
     * before the runtime loads to keep replay on the page's thread; a single
     * instance can opt out with `useReplayWorker: false`. Pages where the
     * browser cannot draw WebGL2 on a transferred canvas stay on the page's
     * thread regardless.
     *
     * True by default.
     */
    RuntimeLoader.setReplayWorker = function (enabled) {
        RuntimeLoader.replayWorker = enabled;
    };
    // Gets whether a threaded runtime may replay on a worker
    RuntimeLoader.getReplayWorker = function () {
        return RuntimeLoader.replayWorker;
    };
    /**
     * @experimental Lets scripts in Rive files call `fetch()`. Pass `true` or
     * options to enable it for every file on the page, `false` to disable it.
     * Only `@rive-app/webgl2-threads` running its threaded build has it;
     * elsewhere this warns once and does nothing.
     *
     * Enabling it lets any script in any file this page loads send what it
     * can read to the hosts it may reach. Limit them with `allowedHosts`.
     * Scripts can't fetch this page's own host unless `allowedHosts` names it.
     *
     * Each call replaces the previous options, and any option left out goes
     * back to its default (an omitted `allowedHosts` allows every host). To
     * change one option, spread the current ones:
     *
     * ```ts
     * RuntimeLoader.setScriptFetch({
     *   ...RuntimeLoader.getScriptFetch(),
     *   maxResponseBytes: 32 * 1024 * 1024,
     * });
     * ```
     *
     * Disabled by default.
     */
    RuntimeLoader.setScriptFetch = function (options) {
        var _a;
        if (options === true) {
            RuntimeLoader.scriptFetch = {};
        }
        else if (options && typeof options === "object") {
            var hosts = options.allowedHosts;
            // Anything else, such as a single host as a string, allows no host
            // rather than falling back to every host.
            if (hosts != null && !Array.isArray(hosts)) {
                console.warn("[Rive] allowedHosts must be an array of host names. Scripts may " +
                    "fetch from no host.");
                hosts = [];
            }
            if (hosts) {
                checkAllowedHosts(hosts);
            }
            if (options.proxyUrl) {
                checkProxyUrl(options.proxyUrl);
            }
            if (((_a = options.maxResponseBytes) !== null && _a !== void 0 ? _a : 0) > maxScriptFetchResponseBytes) {
                console.warn("[Rive] maxResponseBytes is capped at 64 MiB " +
                    "(".concat(maxScriptFetchResponseBytes, " bytes)."));
            }
            RuntimeLoader.scriptFetch = __assign(__assign({}, options), { allowedHosts: hosts === null || hosts === void 0 ? void 0 : hosts.slice() });
        }
        else {
            RuntimeLoader.scriptFetch = null;
        }
        RuntimeLoader.applyScriptFetch();
    };
    // Gets the script fetch options (null means disabled)
    RuntimeLoader.getScriptFetch = function () {
        var _a;
        var options = RuntimeLoader.scriptFetch;
        return options
            ? __assign(__assign({}, options), { allowedHosts: (_a = options.allowedHosts) === null || _a === void 0 ? void 0 : _a.slice() }) : null;
    };
    RuntimeLoader.applyScriptFetch = function () {
        var _a;
        var runtime = RuntimeLoader.runtime;
        if (!runtime) {
            return;
        }
        var options = RuntimeLoader.scriptFetch;
        if (!runtime.configureScriptFetch) {
            if (options && !RuntimeLoader.warnedNoScriptFetch) {
                RuntimeLoader.warnedNoScriptFetch = true;
                console.warn("[Rive] Script fetch is only available in @rive-app/webgl2-threads " +
                    "on a cross origin isolated page. Scripts' fetch() stays disabled.");
            }
            return;
        }
        runtime.configureScriptFetch(options && {
            proxyUrl: options.proxyUrl || null,
            allowedHosts: (_a = options.allowedHosts) !== null && _a !== void 0 ? _a : null,
            // 0 keeps the runtime's default.
            maxResponseBytes: uint32Option(options.maxResponseBytes, 0),
        });
    };
    // Manually sets the wasm binary or clears it with null
    RuntimeLoader.setWasmBinary = function (value) {
        if ((value instanceof ArrayBuffer) || value === null) {
            RuntimeLoader.wasmBinary = value;
            return;
        }
        console.error("setWasmBinary expects an ArrayBuffer or null");
    };
    // Gets the current wasm build as ArrayBuffer or null
    RuntimeLoader.getWasmBinary = function () {
        return RuntimeLoader.wasmBinary;
    };
    // Flag to indicate that loading has started/completed
    RuntimeLoader.isLoading = false;
    // List of callbacks for the runtime that come in while loading
    RuntimeLoader.callBackQueue = [];
    // Path to the Wasm file; default path works for testing only;
    // if embedded wasm is used then this is never used.
    RuntimeLoader.wasmURL = "https://unpkg.com/".concat(package_json__WEBPACK_IMPORTED_MODULE_2__.name, "@").concat(package_json__WEBPACK_IMPORTED_MODULE_2__.version, "/rive.wasm");
    // Fallback WASM URL tried when the primary URL fails. Set to null to disable
    // the fallback entirely. Defaults to pulling from the jsdelivr CDN.
    RuntimeLoader.wasmFallbackURL = "https://cdn.jsdelivr.net/npm/".concat(package_json__WEBPACK_IMPORTED_MODULE_2__.name, "@").concat(package_json__WEBPACK_IMPORTED_MODULE_2__.version, "/rive_fallback.wasm");
    RuntimeLoader.wasmBinary = null;
    // The threaded build's wasm, tried first on a page that can run it. Null
    // in packages without one, or to stay on the build without threads.
    RuntimeLoader.wasmThreadsURL = typeof (_rive_threads_mjs__WEBPACK_IMPORTED_MODULE_1___default()) === "function"
        ? "https://unpkg.com/".concat(package_json__WEBPACK_IMPORTED_MODULE_2__.name, "@").concat(package_json__WEBPACK_IMPORTED_MODULE_2__.version, "/rive_threads.wasm")
        : null;
    RuntimeLoader.triedThreads = false;
    // The parts a script's parallel call gets on the threaded build, or null
    // for the runtime's default.
    RuntimeLoader.parallelParts = null;
    // Whether a threaded runtime replays deferred frames on a worker.
    RuntimeLoader.replayWorker = true;
    RuntimeLoader.replayCapsArrived = false;
    RuntimeLoader.replayCapsTimeoutMs = 2000;
    // Script fetch options, or null while disabled.
    RuntimeLoader.scriptFetch = null;
    RuntimeLoader.warnedNoScriptFetch = false;
    // Error callbacks enqueued from .getInstance()
    RuntimeLoader.errorCallbackQueue = [];
    /**
     * When true, performance.mark / performance.measure entries are emitted for
     * WASM initialization.
     */
    RuntimeLoader.enablePerfMarks = false;
    // The languages text without one of its own shapes and falls back with,
    // most preferred first. Null follows navigator.languages, including when
    // the browser's change. See RiveFont.setSystemLanguages.
    RuntimeLoader.systemLanguages = null;
    RuntimeLoader.listeningForLanguageChange = false;
    return RuntimeLoader;
}());



/***/ }),
/* 4 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Rive=(()=>{var _scriptName=globalThis.document?.currentScript?.src;return async function(moduleArg={}){var moduleRtn;var m=moduleArg,aa=!!globalThis.window,ba=!!globalThis.WorkerGlobalScope;
function da(){let b=null,a=null;const c=(l,h,g)=>{const n=l?-1:1;let r=0,A=0,q=new Map;const v=p=>{const y=q;A=r=0;q=new Map;y.forEach(C=>{try{C(p)}catch(G){console.error(G)}});this.ab();b&&b.Db(l)};return{add:p=>{r||=h(v);const y=++A;q.set(y,p);return n*y},remove:p=>{q.delete(n*p);r&&0==q.size&&(g(r),r=0)}}},d=c(!1,l=>requestAnimationFrame(l),l=>cancelAnimationFrame(l)),f=c(!0,l=>null.request(l),l=>null.cancel(l));this.requestAnimationFrame=function(l){return d.add(l)};this.cancelAnimationFrame=
function(l){(0>l?f:d).remove(l)};this.Bb=function(l){a&&(document.body.remove(a),a=null);l||(a=document.createElement("div"),a.style.backgroundColor="black",a.style.position="fixed",a.style.right=0,a.style.top=0,a.style.color="white",a.style.padding="4px",a.innerHTML="RIVE FPS",l=function(h){a.innerHTML="RIVE FPS "+h.toFixed(1)},document.body.appendChild(a));b=new function(){let h=[0,0],g=0;this.Db=function(n){const r=performance.now();g?(++h[n?1:0],n=r-g,1E3<n&&(l(1E3*Math.max(h[0],h[1])/n),g=0)):
(g=r,h=[0,0])}}};this.yb=function(){a&&(document.body.remove(a),a=null);b=null};this.ab=function(){}}function ea(b){console.assert(!0);const a=new Map;let c=-Infinity;this.push=function(d){d=d+((1<<b)-1)>>b;a.has(d)&&clearTimeout(a.get(d));a.set(d,setTimeout(function(){a.delete(d);0==a.length?c=-Infinity:d==c&&(c=Math.max(...a.keys()),console.assert(c<d))},1E3));c=Math.max(d,c);return c<<b}}
function ha(b){return function(){b();const a=m.riveScripting;if(a)for(const c of a.frameBoundary())console.warn(c)}}const ia=m.onRuntimeInitialized;
m.onRuntimeInitialized=function(){ia&&ia();m.startFileScripts=function(h){const g=m.riveScripting;return h&&g&&h.startScripts?g.prepare().then(function(){h.startScripts();return h}):Promise.resolve(h)};let b=m.decodeAudio;m.decodeAudio=function(h,g,n=null){h=b(h,n??null);g(h)};let a=m.decodeFont;m.decodeFont=function(h,g,n=null){h=a(h,n??null);g(h)};const c=m.FileAsset.prototype.decode;m.FileAsset.prototype.decode=function(h,g){return c.call(this,h,g??null)};let d=m.setFallbackFontCb;m.setFallbackFontCallback=
"function"===typeof d?function(h){d(h)}:function(){console.warn("Module.setFallbackFontCallback called, but text support is not enabled in this build.")};"function"!==typeof m.setSystemLanguages&&(m.setSystemLanguages=function(){});const f=m.FileAssetLoader;m.ptrToAsset=h=>{let g=m.ptrToFileAsset(h);return g.isImage?m.ptrToImageAsset(h):g.isFont?m.ptrToFontAsset(h):g.isAudio?m.ptrToAudioAsset(h):g};m.CustomFileAssetLoader=f.extend("CustomFileAssetLoader",{__construct:function({loadContents:h}){this.__parent.__construct.call(this);
this.nb=h},loadContents:function(h,g){h=m.ptrToAsset(h);return this.nb(h,g)}});m.CDNFileAssetLoader=f.extend("CDNFileAssetLoader",{__construct:function(h){this.__parent.__construct.call(this);this.ob=h??null},loadContents:function(h){let g=m.ptrToAsset(h);h=g.cdnUuid;if(""===h)return!1;const n=this.ob??null;(function(r,A){var q=new XMLHttpRequest;q.responseType="arraybuffer";q.onreadystatechange=function(){4==q.readyState&&200==q.status&&A(q)};q.open("GET",r,!0);q.send(null)})(g.cdnBaseUrl+"/"+h,
r=>{g.decode(new Uint8Array(r.response),n)});return!0}});m.FallbackFileAssetLoader=f.extend("FallbackFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this);this.Za=[]},addLoader:function(h){this.Za.push(h)},loadContents:function(h,g){for(let n of this.Za)if(n.loadContents(h,g))return!0;return!1}});let l=m.computeAlignment;m.computeAlignment=function(h,g,n,r,A=1){return l.call(this,h,g,n,r,A)}};function la(){}const F=new Int32Array(5);
function ma(b,a,c,d,f){b(a,c,F);b=Math.max(F[0],0);const l=Math.max(F[1],0);a=Math.min(F[2],Math.ceil(d*a));c=Math.min(F[3],Math.ceil(f*c));F[4]=b!==F[0]||l!==F[1]||a!==F[2]||c!==F[3]?1:0;F[0]=b;F[1]=l;F[2]=a;F[3]=c;return a>b&&c>l}function na(){const b=oa.Mb();return 0===b?0:b}
function pa(b,a,c,d,f,l,h,g,n,r,A){var q=na(),v=q-1,p=v-6;if(!(0<p))return r(),la;let y=1,C=1;if(!ma(g,y,C,c,d))return r(),la;const G=F[2]-F[0],E=F[3]-F[1];if(G>v||E>v)if(y*=Math.min(1,p/G),C*=Math.min(1,p/E),!ma(g,y,C,c,d))return r(),la;c=F[0];d=F[1];v=F[2];p=F[3];g=0!==F[4];if(1>y||1>C)--c,--d,v+=1,p+=1;const H=v-c,L=p-d;b.i||(b.i=new m.DynamicRectanizer(q),b.i.reset(512,512));q=b.i.addRect(H+1,L+1);if(0>q&&(A(),q=b.i.addRect(H+1,L+1),0>q))return console.assert(!1,"draw does not fit in an empty atlas"),
r(),la;const R=q&65535,I=q>>16;b.m.push({pb:[y*f[0],C*f[1],y*f[2],C*f[3],y*f[4]-c+R,C*f[5]-d+I],qb:R,rb:I,Vb:H,Ya:L,$a:g,N:n,Pb:()=>{r()}});const S=c/y,Y=d/C,ca=H/y,ra=L/C,sa=b.M;return function(){const Ea=sa.canvas();Ea&&(a.save(),a.resetTransform(),a.globalCompositeOperation=l,a.globalAlpha=h,a.drawImage(Ea,R,I,H,L,S,Y,ca,ra),a.restore())}}class qa{constructor(){this.M=new ua;this.i=null;this.m=[];this.na=new ea(8);this.$=new ea(8)}}
const oa=new function(){function b(){if(!a){var q=document.createElement("canvas"),v={alpha:1,depth:0,stencil:0,antialias:0,premultipliedAlpha:1,preserveDrawingBuffer:0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:0,enableExtensionsByDefault:1,explicitSwapControl:1,renderViaOffscreenBackBuffer:1};let p;if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){if(p=q.getContext("webgl",v),c=1,!p)return console.log("No WebGL support. Image mesh will not be drawn."),!1}else if(p=q.getContext("webgl2",
v))c=2;else if(p=q.getContext("webgl",v))c=1;else return console.log("No WebGL support. Image mesh will not be drawn."),!1;p=new Proxy(p,{get(C,G){if(C.isContextLost()){if(n||(console.error("Cannot render the mesh because the GL Context was lost. Tried to invoke ",G),n=!0),"function"===typeof C[G])return function(){}}else return"function"===typeof C[G]?function(...E){return C[G].apply(C,E)}:C[G]},set(C,G,E){if(C.isContextLost())n||(console.error("Cannot render the mesh because the GL Context was lost. Tried to set property "+
G),n=!0);else return C[G]=E,!0}});d=Math.min(p.getParameter(p.MAX_RENDERBUFFER_SIZE),p.getParameter(p.MAX_TEXTURE_SIZE));function y(C,G,E){G=p.createShader(G);p.shaderSource(G,E);p.compileShader(G);E=p.getShaderInfoLog(G);if(0<(E||"").length)throw E;p.attachShader(C,G)}q=p.createProgram();y(q,p.VERTEX_SHADER,"attribute vec2 vertex;\n                attribute vec2 uv;\n                uniform vec4 mat;\n                uniform vec2 translate;\n                varying vec2 st;\n                void main() {\n                    st = uv;\n                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);\n                }");
y(q,p.FRAGMENT_SHADER,"precision highp float;\n                uniform sampler2D image;\n                varying vec2 st;\n                void main() {\n                    gl_FragColor = texture2D(image, st);\n                }");p.bindAttribLocation(q,0,"vertex");p.bindAttribLocation(q,1,"uv");p.linkProgram(q);v=p.getProgramInfoLog(q);if(0<(v||"").trim().length)throw v;f=p.getUniformLocation(q,"mat");l=p.getUniformLocation(q,"translate");p.useProgram(q);p.bindBuffer(p.ARRAY_BUFFER,p.createBuffer());
p.enableVertexAttribArray(0);p.enableVertexAttribArray(1);p.bindBuffer(p.ELEMENT_ARRAY_BUFFER,p.createBuffer());p.uniform1i(p.getUniformLocation(q,"image"),0);p.pixelStorei(p.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0);a=p}return!0}let a=null,c=0,d=0,f=null,l=null,h=0,g=0,n=!1;b();this.Mb=function(){b();return d};this.xb=function(q){a&&a.deleteTexture&&a.deleteTexture(q)};this.vb=function(q){if(!b())return null;const v=a.createTexture();if(!v)return null;a.bindTexture(a.TEXTURE_2D,v);a.texImage2D(a.TEXTURE_2D,
0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,q);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);2==c?(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.generateMipmap(a.TEXTURE_2D)):a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);return v};const r=new ea(10),A=new ea(10);this.Ab=function(q,v,p){if(b()&&a.canvas){if(a.canvas.width!=q||a.canvas.height!=
v)a.canvas.width=q,a.canvas.height=v;a.viewport(0,0,q,v);a.disable(a.SCISSOR_TEST);a.clearColor(0,0,0,0);a.clear(a.COLOR_BUFFER_BIT);var y=I=>I.N.image.Ca<<1|(I.$a?1:0);p.sort((I,S)=>y(S)-y(I));var C=0,G=0;for(var E of p)C+=E.N.pa.length,G+=E.N.indices.length;E=r.push(C);h!=E&&(a.bufferData(a.ARRAY_BUFFER,8*E,a.DYNAMIC_DRAW),h=E);E=0;for(var H of p)a.bufferSubData(a.ARRAY_BUFFER,E,H.N.pa),E+=4*H.N.pa.length;console.assert(E==4*C);for(var L of p)a.bufferSubData(a.ARRAY_BUFFER,E,L.N.hb),E+=4*L.N.hb.length;
console.assert(E==8*C);E=A.push(G);g!=E&&(a.bufferData(a.ELEMENT_ARRAY_BUFFER,2*E,a.DYNAMIC_DRAW),g=E);H=0;for(var R of p)a.bufferSubData(a.ELEMENT_ARRAY_BUFFER,H,R.N.indices),H+=2*R.N.indices.length;console.assert(H==2*G);R=0;L=!1;E=H=0;for(const I of p){p=I.N;p.image.Ca!=R&&(a.bindTexture(a.TEXTURE_2D,p.image.V||null),R=p.image.Ca);I.$a?(a.scissor(I.qb,v-I.rb-I.Ya,I.Vb,I.Ya),L||(a.enable(a.SCISSOR_TEST),L=!0)):L&&(a.disable(a.SCISSOR_TEST),L=!1);const S=I.pb,Y=2/q,ca=-2/v;a.uniform4f(f,S[0]*Y,S[1]*
ca,S[2]*Y,S[3]*ca);a.uniform2f(l,S[4]*Y-1,S[5]*ca+1);a.vertexAttribPointer(0,2,a.FLOAT,!1,0,E);a.vertexAttribPointer(1,2,a.FLOAT,!1,0,E+4*C);a.drawElements(a.TRIANGLES,p.indices.length,a.UNSIGNED_SHORT,H);E+=4*p.pa.length;H+=2*p.indices.length}console.assert(E==4*C);console.assert(H==2*G)}};this.canvas=function(){return b()&&a.canvas}};class ua{constructor(){this.La=!1}canvas(){return oa.canvas()||null}}const va=new qa;
function wa(b,a,c,d,f,l){const h=new DOMMatrix;h.a=b;h.b=a;h.c=c;h.d=d;h.e=f;h.f=l;return h}const xa="createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText".split(" "),ya=m.onRuntimeInitialized;
m.onRuntimeInitialized=function(){function b(e){switch(e){case y.srcOver:return"source-over";case y.additive:return"lighter";case y.screen:return"screen";case y.overlay:return"overlay";case y.darken:return"darken";case y.lighten:return"lighten";case y.colorDodge:return"color-dodge";case y.colorBurn:return"color-burn";case y.hardLight:return"hard-light";case y.softLight:return"soft-light";case y.difference:return"difference";case y.exclusion:return"exclusion";case y.multiply:return"multiply";case y.hue:return"hue";
case y.saturation:return"saturation";case y.color:return"color";case y.luminosity:return"luminosity"}}function a(e){return"rgba("+((16711680&e)>>>16)+","+((65280&e)>>>8)+","+((255&e)>>>0)+","+((4278190080&e)>>>24)/255+")"}function c(e,k,t,u,w){return{fb:e,gb:k,Ta:t,Ua:u,type:w,Ka:[],T:null}}function d(e,k,t,u){if(k.Y===H&&!(0<k.Z))return null;t=1===t;return{Ha:e.Ma(t?k.xa:null),gradientTransform:t?k.ca:null,Ub:t?k.Z*k.Ba:k.Z,fillRule:e.ha===L?"evenodd":"nonzero",opacity:u,style:k.Y,color:k.sa,Xa:k.I,
tb:k.ra,join:k.ya,sb:k.qa}}function f(e,k){return k.Y!==H||0<k.Z?{path:e.kb(e.ha),Ga:k.lb()}:null}function l(){if(0!==I.m.length){var e=na();if(0!==e){var k=Math.min(I.na.push(I.i.drawWidth()),e);e=Math.min(I.$.push(I.i.drawHeight()),e);oa.Ab(k,e,I.m)}}for(const t of ta){for(const u of t.G)u();t.G=[]}ta.clear();for(const t of I.m)t.Pb();I.m=[];I.i&&I.i.reset(512,512)}ya&&ya();var h=m.RenderPaintStyle,g=m.FillRule;const n=m.RenderPath,r=m.RenderPaint,A=m.Renderer,q=m.StrokeCap,v=m.StrokeJoin,p=m.StrokePosition,
y=m.BlendMode,C=m.ImageFilter,G=m.ImageWrap,E=h.fill,H=h.stroke,L=g.evenOdd,R=g.nonZero,I=va,S=I.M;let Y=1;var ca=m.RenderImage.extend("CanvasRenderImage",{__construct:function({ea:e,oa:k}={}){this.__parent.__construct.call(this);this.Ca=Y;Y=Y+1&2147483647||1;this.ea=e;this.oa=k;this.V=this.Qa=this.ia=this.wa=null},__destruct:function(){this.V&&(oa.xb(this.V),this.V=null);this.ia&&URL.revokeObjectURL(this.ia);this.__parent.__destruct.call(this)},decode:function(e){var k=this;k.oa&&k.oa(k);var t=new Image;
k.ia=URL.createObjectURL(new Blob([e],{type:"image/png"}));t.onload=function(){k.wa=t;k.V=oa.vb(t);k.size(t.width,t.height);k.ea&&k.ea(k)};t.src=k.ia}});class ra{constructor(e){this.i=e;this.path=new Path2D;this.m=null;this.ua=!1}M(){null!==this.m&&(this.path.lineTo(this.m.x,this.m.y),this.m=null)}moveTo(e,k){this.M();let t=e,u=k;null!==this.i&&(e=this.i.transformPoint({x:e,y:k}),t=e.x,u=e.y);this.path.moveTo(t,u);this.m={x:t,y:u}}lineTo(e,k){this.m=null;null!==this.i?(e=this.i.transformPoint({x:e,
y:k}),this.path.lineTo(e.x,e.y)):this.path.lineTo(e,k)}wb(e,k,t,u,w,B){this.m=null;null!==this.i?(e=this.i.transformPoint({x:e,y:k}),t=this.i.transformPoint({x:t,y:u}),w=this.i.transformPoint({x:w,y:B}),this.path.bezierCurveTo(e.x,e.y,t.x,t.y,w.x,w.y)):this.path.bezierCurveTo(e,k,t,u,w,B)}close(){this.m=null;this.path.closePath()}addPath(e,k,t,u,w,B,D){this.M();const z=new ra(null);for(const x of e)x(z);z.Wa();e=wa(k,t,u,w,B,D);null!==this.i&&(e=this.i.multiply(e));this.path.addPath(z.path,e)}Wa(){null===
this.m||this.ua||(this.M(),this.ua=!0)}dispose(){}}class sa{constructor(e){this.Lb=e;this.$=this.M=0;this.m=null;this.i=e(null)}clear(){this.na(null)}Da(e,k){for(((null===k?null!==this.m:null===this.m||this.m.a!==k.a||this.m.b!==k.b||this.m.c!==k.c||this.m.d!==k.d||this.m.e!==k.e||this.m.f!==k.f)||this.$<e.length&&(0<this.M||this.i.ua))&&this.na(k);this.$<e.length;)e[this.$++](this.i);this.i.Wa();this.M++;return this.i.path}Ja(e){null!==this.i&&e===this.i.path&&this.M--}dispose(){this.i.dispose();
this.i=null}na(e){this.i.dispose();this.$=this.M=0;this.m=e;this.i=this.Lb(e)}}var Ea=n.extend("CanvasRenderPath",{__construct:function(){this.__parent.__construct.call(this);this.W=[];this.ja=new sa(e=>new ra(e));this.ka=new sa(e=>new ra(e));this.X=new Map;this.ha=R;this.va=!1},__destruct:function(){this.ja.dispose();this.ka.dispose();for(const e of this.X.values())e.dispose();this.X.clear();this.__parent.__destruct.call(this)},rewind:function(){this.W.length=0;this.ja.clear();this.ka.clear();for(const e of this.X.values())e.clear();
this.va=!1},addPath:function(e,k,t,u,w,B,D){const z=e.W.slice();this.ba(x=>x.addPath(z,k,t,u,w,B,D))},fillRule:function(e){this.ha=e},moveTo:function(e,k){this.va=!0;this.ba(t=>t.moveTo(e,k))},lineTo:function(e,k){this.Pa();this.ba(t=>t.lineTo(e,k))},cubicTo:function(e,k,t,u,w,B){this.Pa();this.ba(D=>D.wb(e,k,t,u,w,B))},close:function(){this.ba(e=>e.close())},Pa:function(){this.va||this.moveTo(0,0)},ba:function(e){this.W.push(e)},Ma:function(e){e=null===e?this.ja.Da(this.W,null):this.ka.Da(this.W,
e);e.ref&&e.ref();return e},kb:function(e){var k=this.X.get(e);void 0===k&&(k=new sa(()=>S.Yb(e)),this.X.set(e,k));k=k.Da(this.W,null);k.ref&&k.ref();return k},za:function(e){this.ja.Ja(e);this.ka.Ja(e);for(const k of this.X.values())k.Ja(e);e.unref&&e.unref()}});const bc=c(0,0,0,0,0);var dc=r.extend("CanvasRenderPaint",{__construct:function(){this.__parent.__construct.call(this);this.Y=E;this.sa=4278190080;this.Z=1;this.ya=v.miter;this.ra=q.butt;this.Aa=p.center;this.ta=0;this.qa=b(y.srcOver);this.xa=
this.A=this.ca=this.I=null;this.Ba=1;this.B=0;this.S=null;this.Ra=-1},__destruct:function(){null!==this.S&&(m.unrefWebGL2Paint(this.S),this.S=null);this.__parent.__destruct.call(this)},color:function(e){this.sa=e;this.I=null;this.B++},thickness:function(e){this.Z=Math.abs(e);this.B++},join:function(e){this.ya=e;this.B++},cap:function(e){this.ra=e;this.B++},strokePosition:function(e){this.Aa=e;this.B++},feather:function(e){this.ta=Math.abs(e);this.B++},style:function(e){this.Y=e;this.B++},blendMode:function(e){this.qa=
b(e);this.B++},clearGradient:function(){this.I=null;this.B++},linearGradient:function(e,k,t,u){this.I=c(e,k,t,u,0);this.B++},radialGradient:function(e,k,t,u){this.I=c(e,k,t,u,1);this.B++},angularGradient:function(){this.I=c(0,0,0,0,2);this.B++},addStop:function(e,k){this.I.Ka.push({color:e,stop:k});this.I.T=null;this.B++},modulatedImage:function(e,k,t,u,w,B,D,z,x,J){const K=e.wa;K?this.A={image:K,jb:e.Qa,filter:k,Wb:t,Xb:u,transform:wa(w,B,D,z,x,J)}:this.A=null},completeGradient:function(){},_setGradientTransform:function(e,
k,t,u,w,B,D,z,x,J,K,P,T){1===e&&0===k&&0===t&&1===u&&0===w&&0===B?this.xa=this.ca=null:(this.ca=wa(e,k,t,u,w,B),this.xa=wa(D,z,x,J,K,P));this.Ba=T;this.B++},lb:function(){if(this.Ra!==this.B){null!==this.S&&m.unrefWebGL2Paint(this.S);const k=null!==this.I?this.I:bc;let t=null,u=null;if(null!==this.I){var e=k.Ka;t=new Uint32Array(e.length);u=new Float32Array(e.length);for(let ja=0,cc=e.length;ja<cc;ja++)t[ja]=e[ja].color,u[ja]=e[ja].stop}e=null;let w=C.bilinear,B=G.clamp,D=G.clamp,z=1,x=0,J=0,K=1,
P=0,T=0;null!==this.A&&(e=this.A.jb,w=this.A.filter,B=this.A.Wb,D=this.A.Xb,z=this.A.transform.a,x=this.A.transform.b,J=this.A.transform.c,K=this.A.transform.d,P=this.A.transform.e,T=this.A.transform.f);let Z=1,ka=0,Ga=0,Va=1,sb=0,tb=0;const fa=this.ca;null!==fa&&(Z=fa.a,ka=fa.b,Ga=fa.c,Va=fa.d,sb=fa.e,tb=fa.f);this.S=m.makeWebGL2Paint(this.Y,this.sa,this.Z,this.ya,this.ra,this.Aa,this.ta,t,u,k.type,k.fb,k.gb,k.Ta,k.Ua,Z,ka,Ga,Va,sb,tb,e,w,B,D,z,x,J,K,P,T);this.Ra=this.B}m.refWebGL2Paint(this.S);
return this.S}});const ta=new Set,ub=Object.prototype.hasOwnProperty;var ec=m.CanvasRenderer=A.extend("Renderer",{__construct:function(e){this.__parent.__construct.call(this);this.L=[1,0,0,1,0,0];this.F=[1];this.s=e.getContext("2d");this.Oa=e;this.G=[]},save:function(){this.L.push(...this.L.slice(this.L.length-6));this.F.push(this.F[this.F.length-1]);this.G.push(this.s.save.bind(this.s))},restore:function(){const e=this.L.length-6;if(6>e)throw"restore() called without matching save().";this.L.splice(e);
this.F.pop();this.G.push(this.s.restore.bind(this.s))},transform:function(e,k,t,u,w,B){const D=this.L,z=D.length-6;D.splice(z,6,D[z]*e+D[z+2]*k,D[z+1]*e+D[z+3]*k,D[z]*t+D[z+2]*u,D[z+1]*t+D[z+3]*u,D[z]*w+D[z+2]*B+D[z+4],D[z+1]*w+D[z+3]*B+D[z+5]);this.G.push(this.s.transform.bind(this.s,e,k,t,u,w,B))},rotate:function(e){const k=Math.sin(e);e=Math.cos(e);this.transform(e,k,-k,e,0,0)},modulateOpacity:function(e){this.F[this.F.length-1]*=e},_drawPath:function(e,k){const t=Math.max(0,this.F[this.F.length-
1]),u=k.A||k.Aa!==p.center&&S.La?2:0!==k.ta?S.La?2:0:null===k.I||null===k.ca?0:k.Y!==H||0<k.Ba?1:S.La?2:0;if(2===u)(null===k.A||k.A.jb)&&this.mb(e,k,t);else{var w=d(e,k,u,t);null!==w&&this.G.push(()=>{var B=this.s;const D=B.globalCompositeOperation,z=B.globalAlpha;B.globalCompositeOperation=w.sb;B.globalAlpha=w.opacity;if(null!==w.Xa){var x=w.Xa;if(null===x.T){var J=x.fb;const T=x.gb;var K=x.Ta,P=x.Ua;0==x.type?x.T=B.createLinearGradient(J,T,K,P):1==x.type?(K-=J,P-=T,x.T=B.createRadialGradient(J,
T,0,J,T,Math.sqrt(K*K+P*P))):x.T=B.createConicGradient(0,0,0);J=x.Ka;for(let Z=0,ka=J.length;Z<ka;Z++)x.T.addColorStop(J[Z].stop,a(J[Z].color))}x=x.T}else x=a(w.color);null!==w.gradientTransform&&(B.save(),B.transform(w.gradientTransform.a,w.gradientTransform.b,w.gradientTransform.c,w.gradientTransform.d,w.gradientTransform.e,w.gradientTransform.f));switch(w.style){case H:B.strokeStyle=x;B.lineWidth=w.Ub;a:{switch(w.tb){case q.butt:x="butt";break a;case q.round:x="round";break a;case q.square:x="square";
break a}x=void 0}B.lineCap=x;a:{switch(w.join){case v.miter:x="miter";break a;case v.round:x="round";break a;case v.bevel:x="bevel";break a}x=void 0}B.lineJoin=x;B.miterLimit=4;B.stroke(w.Ha);break;case E:B.fillStyle=x,B.fill(w.Ha,w.fillRule)}null!==w.gradientTransform&&B.restore();B.globalCompositeOperation=D;B.globalAlpha=z;e.za(w.Ha)})}},mb:function(e,k,t){const u=f(e,k);if(null!==u){var w=this.L.slice(this.L.length-6);k=pa(I,this.s,this.s.canvas.width,this.s.canvas.height,w,k.qa,t,(B,D,z)=>m.webGL2PathPixelBounds(u.path,
u.Ga,B*w[0],D*w[1],B*w[2],D*w[3],B*w[4],D*w[5],z),B=>B.drawPath(u.path,u.Ga),()=>{e.za(u.path);m.unrefWebGL2Paint(u.Ga)},l);ta.add(this);this.G.push(k)}},_drawRiveImage:function(e,k,t){var u=e.wa;if(u){var w=this.s,B=b(k),D=Math.max(0,t*this.F[this.F.length-1]);this.G.push(function(){w.globalCompositeOperation=B;w.globalAlpha=D;w.drawImage(u,0,0);w.globalAlpha=1})}},_getMatrix:function(e){const k=this.L,t=k.length-6;for(let u=0;6>u;++u)e[u]=k[t+u]},_drawImageMesh:function(e,k,t,u,w,B,D,z){const x=
e.Qa;x?this.Na(t,u,w,B,D,z,J=>m.drawWebGL2PendingMesh(J,k,x),()=>k.unref()):k.unref()},_drawImageMeshFromHeap:function(e,k,t,u,w,B,D,z,x,J,K,P,T){if(e.V){try{var Z=m.HEAPF32.slice(u>>2,(u>>2)+w);var ka=m.HEAPF32.slice(B>>2,(B>>2)+D);var Ga=m.HEAPU16.slice(z>>1,(z>>1)+x)}catch(Va){console.error("[Rive] _drawImageMesh: failed to read mesh data from WASM heap. Mesh skipped for this frame.");return}this.Na(k,t,J,K,P,T,{image:e,pa:Z,hb:ka,indices:Ga},()=>{})}},Na:function(e,k,t,u,w,B,D,z){e=pa(I,this.s,
this.s.canvas.width,this.s.canvas.height,this.L.slice(this.L.length-6),b(e),Math.max(0,k*this.F[this.F.length-1]),(x,J,K)=>{K[0]=Math.floor(t*x);K[1]=Math.floor(u*J);K[2]=Math.ceil(w*x);K[3]=Math.ceil(B*J)},D,z,l);ta.add(this);this.G.push(e)},_clipPath:function(e){const k=e.ha===L?"evenodd":"nonzero",t=e.Ma(null);this.G.push(()=>{this.s.clip(t,k);e.za(t)})},beginFrame:function(e=!0){ta.add(this);e&&this.G.push(this.s.clearRect.bind(this.s,0,0,this.Oa.width,this.Oa.height))},clear:function(){this.beginFrame(!0)},
flush:function(){},translate:function(e,k){this.transform(1,0,0,1,e,k)}});m.makeRenderer=function(e){const k=new ec(e),t=k.s;let u=null,w=null;const B={attachSession:function(z){if(z&&u===z)return!0;if(!z||u||"function"!==typeof m.c2dDeferredClaim||"function"!==typeof m.c2dDeferredRenderer||!m.c2dDeferredClaim(z))return!1;const x=m.c2dDeferredRenderer(z);if(!x)return!1;u=z;w=x;return!0},detachSession:function(){u&&m.c2dDeferredDetach(u);w=u=null},deferredActive:function(){return null!==w}},D={save:function(){m.c2dDeferredSave(u)},
restore:function(){m.c2dDeferredRestore(u)},transform:function(z,x,J,K,P,T){m.c2dDeferredTransform(u,z,x,J,K,P,T)},translate:function(z,x){m.c2dDeferredTransform(u,1,0,0,1,z,x)},rotate:function(z){const x=Math.sin(z);z=Math.cos(z);m.c2dDeferredTransform(u,z,x,-x,z,0,0)},align:function(z,x,J,K,P){m.c2dDeferredAlign(u,z,x,J.minX,J.minY,J.maxX,J.maxY,K.minX,K.minY,K.maxX,K.maxY,void 0===P?1:P)},beginFrame:function(z=!0){k.beginFrame(z);m.c2dDeferredBeginFrame(u)},clear:function(){k.beginFrame(!0);m.c2dDeferredBeginFrame(u)},
flush:function(){m.c2dDeferredReplay(u,k)}};return new Proxy(k,{get(z,x){if(ub.call(B,x))return B[x];if("_deferredRecorder"===x)return w;if(null!==w&&ub.call(D,x))return D[x];if("function"===typeof z[x])return function(...J){return z[x].apply(z,J)};if("function"===typeof t[x]){if(-1<xa.indexOf(x))throw Error("RiveException: Method call to '"+x+"()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods.");return function(...J){k.G.push(t[x].bind(t,
...J))}}return z[x]},set(z,x,J){if(x in t)return k.G.push(()=>{t[x]=J}),!0}})};m.decodeImage=function(e,k){(new ca({ea:k})).decode(e)};m.renderFactory={makeRenderPaint:function(){return new dc},makeRenderPath:function(){return new Ea},makeRenderImage:function(){let e=Wa;return new ca({oa:()=>{e.total++},ea:()=>{e.loaded++;if(e.loaded===e.total){const k=e.ready;k&&(k(),e.ready=null)}}})}};let fc=m.load,Wa=null;m.load=function(e,k,t=!0,u=null,w=!1){const B=new m.FallbackFileAssetLoader;void 0!==k&&
B.addLoader(k);t&&(k=new m.CDNFileAssetLoader(u),B.addLoader(k));return(new Promise(function(D){let z=null;Wa={total:0,loaded:0,ready:function(){D(z)}};z=fc(e,B,u??null,!!w);const x=m.riveScripting;x&&x.prepare();0==Wa.total&&D(z)})).then(m.startFileScripts)};const gc=m.Artboard.prototype.draw;m.Artboard.prototype.draw=function(e){gc.call(this,e._deferredRecorder||e)};let hc=m.RendererWrapper.prototype.align;m.RendererWrapper.prototype.align=function(e,k,t,u,w=1){hc.call(this,e,k,t,u,w)};h=new da;
m.requestAnimationFrame=h.requestAnimationFrame.bind(h);m.cancelAnimationFrame=h.cancelAnimationFrame.bind(h);m.enableFPSCounter=h.Bb.bind(h);m.disableFPSCounter=h.yb;g=ha(l);h.ab=g;m.resolveAnimationFrame=g;m.cleanup=function(){I.i&&(I.i["delete"](),I.i=null)}};ba&&(_scriptName=self.location.href);var za="",Aa,Ba;
if(aa||ba){try{za=(new URL(".",_scriptName)).href}catch{}ba&&(Ba=b=>{var a=new XMLHttpRequest;a.open("GET",b,!1);a.responseType="arraybuffer";a.send(null);return new Uint8Array(a.response)});Aa=async b=>{if(Ca(b))return new Promise((c,d)=>{var f=new XMLHttpRequest;f.open("GET",b,!0);f.responseType="arraybuffer";f.onload=()=>{200==f.status||0==f.status&&f.response?c(f.response):d(f.status)};f.onerror=d;f.send(null)});var a=await fetch(b,{credentials:"same-origin"});if(a.ok)return a.arrayBuffer();throw Error(a.status+
" : "+a.url);}}var Da=console.log.bind(console),Fa=console.error.bind(console),Ha,Ia=!1,Ca=b=>b.startsWith("file://"),Ja,Ka,La,M,Ma,Na,Oa,N,Pa,Qa,Ra=!1;function Sa(){var b=Ta.buffer;m.HEAP8=La=new Int8Array(b);Ma=new Int16Array(b);m.HEAPU8=M=new Uint8Array(b);m.HEAPU16=Na=new Uint16Array(b);m.HEAP32=Oa=new Int32Array(b);m.HEAPU32=N=new Uint32Array(b);m.HEAPF32=Pa=new Float32Array(b);Qa=new Float64Array(b)}
function Ua(b){m.onAbort?.(b);b="Aborted("+b+")";Fa(b);Ia=!0;b=new WebAssembly.RuntimeError(b+". Build with -sASSERTIONS for more info.");Ka?.(b);throw b;}var Xa;async function Ya(b){if(!Ha)try{var a=await Aa(b);return new Uint8Array(a)}catch{}if(b==Xa&&Ha)b=new Uint8Array(Ha);else if(Ba)b=Ba(b);else throw"both async and sync fetching of the wasm failed";return b}
async function Za(b,a){try{var c=await Ya(b);return await WebAssembly.instantiate(c,a)}catch(d){Fa(`failed to asynchronously prepare wasm: ${d}`),Ua(d)}}async function $a(b){var a=Xa;if(!Ha&&!Ca(a))try{var c=fetch(a,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(c,b)}catch(d){Fa(`wasm streaming compile failed: ${d}`),Fa("falling back to ArrayBuffer instantiation")}return Za(a,b)}
var ab,bb,cb=b=>{for(;0<b.length;)b.shift()(m)},db=[],eb=[],fb=()=>{var b=m.preRun.shift();eb.push(b)},gb=(b,a)=>Object.defineProperty(a,"name",{value:b}),hb=[],ib=[0,1,,1,null,1,!0,1,!1,1],O=class extends Error{constructor(b){super(b);this.name="BindingError"}},Q=b=>{if(!b)throw new O(`Cannot use deleted val. handle = ${b}`);return ib[b]},jb=b=>{switch(b){case void 0:return 2;case null:return 4;case !0:return 6;case !1:return 8;default:const a=hb.pop()||ib.length;ib[a]=b;ib[a+1]=1;return a}};
class kb extends Error{}
var U=b=>{for(var a="";;){var c=M[b++];if(!c)return a;a+=String.fromCharCode(c)}},lb={},mb=(b,a)=>{if(void 0===a)throw new O("ptr should not be undefined");for(;b.C;)a=b.fa(a),b=b.C;return a},nb={},qb=b=>{b=ob(b);var a=U(b);pb(b);return a},rb=(b,a)=>{var c=nb[b];if(void 0===c)throw b=`${a} has unknown type ${qb(b)}`,new O(b);return c},vb=()=>{},wb=!1,xb=b=>{if(!globalThis.FinalizationRegistry)return xb=a=>a,b;wb=new FinalizationRegistry(a=>{a=a.g;--a.count.value;0===a.count.value&&(a.D?a.K.P(a.D):
a.o.h.P(a.l))});xb=a=>{var c=a.g;c.D&&wb.register(a,{g:c},a);return a};vb=a=>{wb.unregister(a)};return xb(b)},yb={},zb=b=>{for(;b.length;){var a=b.pop();b.pop()(a)}};function Ab(b){return this.j(N[b>>2])}
var Bb={},Cb={},Db=class extends Error{constructor(b){super(b);this.name="InternalError"}},W=(b,a,c)=>{function d(g){g=c(g);if(g.length!==b.length)throw new Db("Mismatched type converter count");for(var n=0;n<b.length;++n)V(b[n],g[n])}b.forEach(g=>Cb[g]=a);var f=Array(a.length),l=[],h=0;for(let [g,n]of a.entries())nb.hasOwnProperty(n)?f[g]=nb[n]:(l.push(n),Bb.hasOwnProperty(n)||(Bb[n]=[]),Bb[n].push(()=>{f[g]=nb[n];++h;h===l.length&&d(f)}));0===l.length&&d(f)};
function Eb(b,a,c={}){var d=a.name;if(!b)throw new O(`type "${d}" must have a positive integer typeid pointer`);if(nb.hasOwnProperty(b)){if(c.Jb)return;throw new O(`Cannot register type '${d}' twice`);}nb[b]=a;delete Cb[b];Bb.hasOwnProperty(b)&&(a=Bb[b],delete Bb[b],a.forEach(f=>f()))}function V(b,a,c={}){return Eb(b,a,c)}var Fb=b=>{throw new O(b.g.o.h.name+" instance already deleted");},Gb=[];function Hb(){}
var Ib={},Jb=(b,a,c)=>{if(void 0===b[a].u){var d=b[a];b[a]=function(...f){if(!b[a].u.hasOwnProperty(f.length))throw new O(`Function '${c}' called with an invalid number of arguments (${f.length}) - expects one of (${b[a].u})!`);return b[a].u[f.length].apply(this,f)};b[a].u=[];b[a].u[d.R]=d}},Kb=(b,a,c)=>{if(m.hasOwnProperty(b)){if(void 0===c||void 0!==m[b].u&&void 0!==m[b].u[c])throw new O(`Cannot register public name '${b}' twice`);Jb(m,b,b);if(m[b].u.hasOwnProperty(c))throw new O(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
m[b].u[c]=a}else m[b]=a,m[b].R=c},Lb=b=>{b=b.replace(/[^a-zA-Z0-9_]/g,"$");var a=b.charCodeAt(0);return 48<=a&&57>=a?`_${b}`:b};function Mb(b,a,c,d,f,l,h,g){this.name=b;this.constructor=a;this.O=c;this.P=d;this.C=f;this.Eb=l;this.fa=h;this.zb=g;this.bb=[]}
var Nb=(b,a,c)=>{for(;a!==c;){if(!a.fa)throw new O(`Expected null or instance of ${c.name}, got an instance of ${a.name}`);b=a.fa(b);a=a.C}return b},Ob=b=>{if(null===b)return"null";var a=typeof b;return"object"===a||"array"===a||"function"===a?b.toString():""+b};
function Pb(b,a){if(null===a){if(this.Ea)throw new O(`null is not a valid ${this.name}`);return 0}if(!a.g)throw new O(`Cannot pass "${Ob(a)}" as a ${this.name}`);if(!a.g.l)throw new O(`Cannot pass deleted object as a pointer of type ${this.name}`);return Nb(a.g.l,a.g.o.h,this.h)}
function Qb(b,a){if(null===a){if(this.Ea)throw new O(`null is not a valid ${this.name}`);if(this.ma){var c=this.Ia();null!==b&&b.push(this.P,c);return c}return 0}if(!a||!a.g)throw new O(`Cannot pass "${Ob(a)}" as a ${this.name}`);if(!a.g.l)throw new O(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.la&&a.g.o.la)throw new O(`Cannot convert argument of type ${a.g.K?a.g.K.name:a.g.o.name} to parameter type ${this.name}`);c=Nb(a.g.l,a.g.o.h,this.h);if(this.ma){if(void 0===a.g.D)throw new O("Passing raw pointer to smart pointer is illegal");
switch(this.Tb){case 0:if(a.g.K===this)c=a.g.D;else throw new O(`Cannot convert argument of type ${a.g.K?a.g.K.name:a.g.o.name} to parameter type ${this.name}`);break;case 1:c=a.g.D;break;case 2:if(a.g.K===this)c=a.g.D;else{var d=a.clone();c=this.Ob(c,jb(()=>d["delete"]()));null!==b&&b.push(this.P,c)}break;default:throw new O("Unsupported sharing policy");}}return c}
function Rb(b,a){if(null===a){if(this.Ea)throw new O(`null is not a valid ${this.name}`);return 0}if(!a.g)throw new O(`Cannot pass "${Ob(a)}" as a ${this.name}`);if(!a.g.l)throw new O(`Cannot pass deleted object as a pointer of type ${this.name}`);if(a.g.o.la)throw new O(`Cannot convert argument of type ${a.g.o.name} to parameter type ${this.name}`);return Nb(a.g.l,a.g.o.h,this.h)}
var Sb=(b,a,c)=>{if(a===c)return b;if(void 0===c.C)return null;b=Sb(b,a,c.C);return null===b?null:c.zb(b)},Tb=(b,a)=>{a=mb(b,a);return lb[a]},Ub=(b,a)=>{if(!a.o||!a.l)throw new Db("makeClassHandle requires ptr and ptrType");if(!!a.K!==!!a.D)throw new Db("Both smartPtrType and smartPtr must be specified");a.count={value:1};return xb(Object.create(b,{g:{value:a,writable:!0}}))};
function Vb(b,a,c,d,f,l,h,g,n,r,A){this.name=b;this.h=a;this.Ea=c;this.la=d;this.ma=f;this.Nb=l;this.Tb=h;this.cb=g;this.Ia=n;this.Ob=r;this.P=A;f||void 0!==a.C?this.v=Qb:(this.v=d?Pb:Rb,this.H=null)}
var Wb=(b,a,c)=>{if(!m.hasOwnProperty(b))throw new Db("Replacing nonexistent public symbol");void 0!==m[b].u&&void 0!==c?m[b].u[c]=a:(m[b]=a,m[b].R=c)},Xb={},Zb=(b,a,c=[])=>{b.includes("j")?(b=b.replace(/p/g,"i"),a=(0,Xb[b])(a,...c)):a=Yb.get(a)(...c);return a},$b=(b,a)=>(...c)=>Zb(b,a,c),X=(b,a)=>{b=U(b);var c=b.includes("j")?$b(b,a):Yb.get(a);if("function"!=typeof c)throw new O(`unknown function pointer with signature ${b}: ${a}`);return c};class ac extends Error{}
var ic=(b,a)=>{function c(l){f[l]||nb[l]||(Cb[l]?Cb[l].forEach(c):(d.push(l),f[l]=!0))}var d=[],f={};a.forEach(c);throw new ac(`${b}: `+d.map(qb).join([", "]));};function jc(b){for(var a=1;a<b.length;++a)if(null!==b[a]&&void 0===b[a].H)return!0;return!1}
function kc(b,a,c,d,f){var l=a.length;if(2>l)throw new O("argTypes array size mismatch! Must at least get return value and 'this' types!");var h=null!==a[1]&&null!==c,g=jc(a),n=!a[0].Kb,r=l-2,A=Array(r),q=[],v=[];return gb(b,function(...p){v.length=0;q.length=h?2:1;q[0]=f;if(h){var y=a[1].v(v,this);q[1]=y}for(var C=0;C<r;++C)A[C]=a[C+2].v(v,p[C]),q.push(A[C]);p=d(...q);if(g)zb(v);else for(C=h?1:2;C<a.length;C++){var G=1===C?y:A[C-2];null!==a[C].H&&a[C].H(G)}y=n?a[0].j(p):void 0;return y})}
var lc=(b,a)=>{for(var c=[],d=0;d<b;d++)c.push(N[a+4*d>>2]);return c},mc=b=>{b=b.trim();const a=b.indexOf("(");return-1===a?b:b.slice(0,a)},nc=(b,a,c)=>{if(!(b instanceof Object))throw new O(`${c} with invalid "this": ${b}`);if(!(b instanceof a.h.constructor))throw new O(`${c} incompatible with "this" of type ${b.constructor.name}`);if(!b.g.l)throw new O(`cannot call emscripten binding method ${c} on deleted object`);return Nb(b.g.l,b.g.o.h,a.h)},oc=b=>{9<b&&0===--ib[b+1]&&(ib[b]=void 0,hb.push(b))},
pc={name:"emscripten::val",j:b=>{var a=Q(b);oc(b);return a},v:(b,a)=>jb(a),J:Ab,H:null},qc=(b,a,c)=>{switch(a){case 1:return c?function(d){return this.j(La[d])}:function(d){return this.j(M[d])};case 2:return c?function(d){return this.j(Ma[d>>1])}:function(d){return this.j(Na[d>>1])};case 4:return c?function(d){return this.j(Oa[d>>2])}:function(d){return this.j(N[d>>2])};default:throw new TypeError(`invalid integer width (${a}): ${b}`);}},rc=(b,a)=>{switch(a){case 4:return function(c){return this.j(Pa[c>>
2])};case 8:return function(c){return this.j(Qa[c>>3])};default:throw new TypeError(`invalid float width (${a}): ${b}`);}},sc=(b,a,c)=>{switch(a){case 1:return c?d=>La[d]:d=>M[d];case 2:return c?d=>Ma[d>>1]:d=>Na[d>>1];case 4:return c?d=>Oa[d>>2]:d=>N[d>>2];default:throw new TypeError(`invalid integer width (${a}): ${b}`);}},tc=globalThis.TextDecoder&&new TextDecoder,uc=(b,a,c,d)=>{c=a+c;if(d)return c;for(;b[a]&&!(a>=c);)++a;return a},vc=(b,a=0,c,d)=>{c=uc(b,a,c,d);if(16<c-a&&b.buffer&&tc)return tc.decode(b.subarray(a,
c));for(d="";a<c;){var f=b[a++];if(f&128){var l=b[a++]&63;if(192==(f&224))d+=String.fromCharCode((f&31)<<6|l);else{var h=b[a++]&63;f=224==(f&240)?(f&15)<<12|l<<6|h:(f&7)<<18|l<<12|h<<6|b[a++]&63;65536>f?d+=String.fromCharCode(f):(f-=65536,d+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else d+=String.fromCharCode(f)}return d},wc=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,xc=(b,a,c)=>{b>>=1;a=uc(Na,b,a/2,c);if(16<a-b&&wc)return wc.decode(Na.subarray(b,a));for(c="";b<a;++b)c+=String.fromCharCode(Na[b]);
return c},yc=(b,a,c)=>{c??=2147483647;if(2>c)return 0;c-=2;var d=a;c=c<2*b.length?c/2:b.length;for(var f=0;f<c;++f)Ma[a>>1]=b.charCodeAt(f),a+=2;Ma[a>>1]=0;return a-d},zc=b=>2*b.length,Ac=(b,a,c)=>{var d="";b>>=2;for(var f=0;!(f>=a/4);f++){var l=N[b+f];if(!l&&!c)break;d+=String.fromCodePoint(l)}return d},Bc=(b,a,c)=>{c??=2147483647;if(4>c)return 0;var d=a;c=d+c-4;for(var f=0;f<b.length;++f){var l=b.codePointAt(f);65535<l&&f++;Oa[a>>2]=l;a+=4;if(a+4>c)break}Oa[a>>2]=0;return a-d},Cc=b=>{for(var a=
0,c=0;c<b.length;++c)65535<b.codePointAt(c)&&c++,a+=4;return a},Dc=[],Ec=b=>{var a=Dc.length;Dc.push(b);return a},Fc=(b,a)=>{for(var c=Array(b),d=0;d<b;++d)c[d]=rb(N[a+4*d>>2],`parameter ${d}`);return c},Gc={},Hc=b=>{var a=Gc[b];return void 0===a?U(b):a},Ic=[null,[],[]];
(()=>{let b=Hb.prototype;Object.assign(b,{isAliasOf:function(c){if(!(this instanceof Hb&&c instanceof Hb))return!1;var d=this.g.o.h,f=this.g.l;c.g=c.g;var l=c.g.o.h;for(c=c.g.l;d.C;)f=d.fa(f),d=d.C;for(;l.C;)c=l.fa(c),l=l.C;return d===l&&f===c},clone:function(){this.g.l||Fb(this);if(this.g.aa)return this.g.count.value+=1,this;var c=xb,d=Object,f=d.create,l=Object.getPrototypeOf(this),h=this.g;c=c(f.call(d,l,{g:{value:{count:h.count,da:h.da,aa:h.aa,l:h.l,o:h.o,D:h.D,K:h.K}}}));c.g.count.value+=1;c.g.da=
!1;return c},["delete"](){this.g.l||Fb(this);if(this.g.da&&!this.g.aa)throw new O("Object already scheduled for deletion");vb(this);var c=this.g;--c.count.value;0===c.count.value&&(c.D?c.K.P(c.D):c.o.h.P(c.l));this.g.aa||(this.g.D=void 0,this.g.l=void 0)},isDeleted:function(){return!this.g.l},deleteLater:function(){this.g.l||Fb(this);if(this.g.da&&!this.g.aa)throw new O("Object already scheduled for deletion");Gb.push(this);this.g.da=!0;return this}});const a=Symbol.dispose;a&&(b[a]=b["delete"])})();
Object.assign(Vb.prototype,{Fb(b){this.cb&&(b=this.cb(b));return b},Sa(b){this.P?.(b)},J:Ab,j:function(b){function a(){return this.ma?Ub(this.h.O,{o:this.Nb,l:c,K:this,D:b}):Ub(this.h.O,{o:this,l:b})}var c=this.Fb(b);if(!c)return this.Sa(b),null;var d=Tb(this.h,c);if(void 0!==d){if(0===d.g.count.value)return d.g.l=c,d.g.D=b,d.clone();d=d.clone();this.Sa(b);return d}d=this.h.Eb(c);d=Ib[d];if(!d)return a.call(this);d=this.la?d.ub:d.pointerType;var f=Sb(c,this.h,d.h);return null===f?a.call(this):this.ma?
Ub(d.h.O,{o:d,l:f,K:this,D:b}):Ub(d.h.O,{o:d,l:f})}});m.print&&(Da=m.print);m.printErr&&(Fa=m.printErr);m.wasmBinary&&(Ha=m.wasmBinary);if(m.preInit)for("function"==typeof m.preInit&&(m.preInit=[m.preInit]);0<m.preInit.length;)m.preInit.shift()();
var pb,Jc,ob,Ta,Yb,Kc={_abort_js:()=>Ua(""),_embind_create_inheriting_constructor:(b,a,c)=>{b=U(b);a=rb(a,"wrapper");c=Q(c);var d=a.h,f=d.O,l=d.C.O,h=d.C.constructor;b=gb(b,function(...g){for(var n of d.C.bb)if(this[n]===l[n])throw new kb(`Pure virtual function ${n} must be implemented in JavaScript`);Object.defineProperty(this,"__parent",{value:f});this.__construct(...g)});f.__construct=function(...g){if(this===f)throw new O("Pass correct 'this' to __construct");g=h.implement(this,...g);vb(g);var n=
g.g;g.notifyOnDestruction();n.aa=!0;Object.defineProperties(this,{g:{value:n}});xb(this);g=n.l;g=mb(d,g);if(lb.hasOwnProperty(g))throw new O(`Tried to register registered instance: ${g}`);lb[g]=this};f.__destruct=function(){if(this===f)throw new O("Pass correct 'this' to __destruct");vb(this);var g=this.g.l;g=mb(d,g);if(lb.hasOwnProperty(g))delete lb[g];else throw new O(`Tried to unregister unregistered instance: ${g}`);};b.prototype=Object.create(f);Object.assign(b.prototype,c);return jb(b)},_embind_finalize_value_object:b=>
{var a=yb[b];delete yb[b];var c=a.Ia,d=a.P,f=a.Va,l=f.map(h=>h.Ib).concat(f.map(h=>h.Rb));W([b],l,h=>{var g={},n,r;for([n,r]of f.entries()){const A=h[n],q=r.Gb,v=r.Hb,p=h[n+f.length],y=r.Qb,C=r.Sb;g[r.Cb]={read:G=>A.j(q(v,G)),write:(G,E)=>{var H=[];y(C,G,p.v(H,E));zb(H)},optional:A.optional}}return[{name:a.name,j:A=>{var q={},v;for(v in g)q[v]=g[v].read(A);d(A);return q},v:(A,q)=>{for(var v in g)if(!(v in q||g[v].optional))throw new TypeError(`Missing field: "${v}"`);var p=c();for(v in g)g[v].write(p,
q[v]);null!==A&&A.push(d,p);return p},J:Ab,H:d}]})},_embind_register_bigint:()=>{},_embind_register_bool:(b,a,c,d)=>{a=U(a);V(b,{name:a,j:function(f){return!!f},v:function(f,l){return l?c:d},J:function(f){return this.j(M[f])},H:null})},_embind_register_class:(b,a,c,d,f,l,h,g,n,r,A,q,v)=>{A=U(A);l=X(f,l);g&&=X(h,g);r&&=X(n,r);v=X(q,v);var p=Lb(A);Kb(p,function(){ic(`Cannot construct ${A} due to unbound types`,[d])});W([b,a,c],d?[d]:[],y=>{y=y[0];if(d){var C=y.h;var G=C.O}else G=Hb.prototype;y=gb(A,
function(...R){if(Object.getPrototypeOf(this)!==E)throw new O(`Use 'new' to construct ${A}`);if(void 0===H.U)throw new O(`${A} has no accessible constructor`);var I=H.U[R.length];if(void 0===I)throw new O(`Tried to invoke ctor of ${A} with invalid number of parameters (${R.length}) - expected (${Object.keys(H.U).toString()}) parameters instead!`);return I.apply(this,R)});var E=Object.create(G,{constructor:{value:y}});y.prototype=E;var H=new Mb(A,y,E,v,C,l,g,r);if(H.C){var L;(L=H.C).ga??(L.ga=[]);
H.C.ga.push(H)}C=new Vb(A,H,!0,!1,!1);L=new Vb(A+"*",H,!1,!1,!1);G=new Vb(A+" const*",H,!1,!0,!1);Ib[b]={pointerType:L,ub:G};Wb(p,y);return[C,L,G]})},_embind_register_class_class_function:(b,a,c,d,f,l,h)=>{var g=lc(c,d);a=U(a);a=mc(a);l=X(f,l);W([],[b],n=>{function r(){ic(`Cannot call ${A} due to unbound types`,g)}n=n[0];var A=`${n.name}.${a}`;a.startsWith("@@")&&(a=Symbol[a.substring(2)]);var q=n.h.constructor;void 0===q[a]?(r.R=c-1,q[a]=r):(Jb(q,a,A),q[a].u[c-1]=r);W([],g,v=>{v=kc(A,[v[0],null].concat(v.slice(1)),
null,l,h);void 0===q[a].u?(v.R=c-1,q[a]=v):q[a].u[c-1]=v;if(n.h.ga)for(const p of n.h.ga)p.constructor.hasOwnProperty(a)||(p.constructor[a]=v);return[]});return[]})},_embind_register_class_class_property:(b,a,c,d,f,l,h,g)=>{a=U(a);l=X(f,l);W([],[b],n=>{n=n[0];var r=`${n.name}.${a}`,A={get(){ic(`Cannot access ${r} due to unbound types`,[c])},enumerable:!0,configurable:!0};A.set=g?()=>{ic(`Cannot access ${r} due to unbound types`,[c])}:()=>{throw new O(`${r} is a read-only property`);};Object.defineProperty(n.h.constructor,
a,A);W([],[c],q=>{q=q[0];var v={get(){return q.j(l(d))},enumerable:!0};g&&(g=X(h,g),v.set=p=>{var y=[];g(d,q.v(y,p));zb(y)});Object.defineProperty(n.h.constructor,a,v);return[]});return[]})},_embind_register_class_constructor:(b,a,c,d,f,l)=>{var h=lc(a,c);f=X(d,f);W([],[b],g=>{g=g[0];var n=`constructor ${g.name}`;void 0===g.h.U&&(g.h.U=[]);if(void 0!==g.h.U[a-1])throw new O(`Cannot register multiple constructors with identical number of parameters (${a-1}) for class '${g.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
g.h.U[a-1]=()=>{ic(`Cannot construct ${g.name} due to unbound types`,h)};W([],h,r=>{r.splice(1,0,null);g.h.U[a-1]=kc(n,r,null,f,l);return[]});return[]})},_embind_register_class_function:(b,a,c,d,f,l,h,g)=>{var n=lc(c,d);a=U(a);a=mc(a);l=X(f,l);W([],[b],r=>{function A(){ic(`Cannot call ${q} due to unbound types`,n)}r=r[0];var q=`${r.name}.${a}`;a.startsWith("@@")&&(a=Symbol[a.substring(2)]);g&&r.h.bb.push(a);var v=r.h.O,p=v[a];void 0===p||void 0===p.u&&p.className!==r.name&&p.R===c-2?(A.R=c-2,A.className=
r.name,v[a]=A):(Jb(v,a,q),v[a].u[c-2]=A);W([],n,y=>{y=kc(q,y,r,l,h);void 0===v[a].u?(y.R=c-2,v[a]=y):v[a].u[c-2]=y;return[]});return[]})},_embind_register_class_property:(b,a,c,d,f,l,h,g,n,r)=>{a=U(a);f=X(d,f);W([],[b],A=>{A=A[0];var q=`${A.name}.${a}`,v={get(){ic(`Cannot access ${q} due to unbound types`,[c,h])},enumerable:!0,configurable:!0};v.set=n?()=>ic(`Cannot access ${q} due to unbound types`,[c,h]):()=>{throw new O(q+" is a read-only property");};Object.defineProperty(A.h.O,a,v);W([],n?[c,
h]:[c],p=>{var y=p[0],C={get(){var E=nc(this,A,q+" getter");return y.j(f(l,E))},enumerable:!0};if(n){n=X(g,n);var G=p[1];C.set=function(E){var H=nc(this,A,q+" setter"),L=[];n(r,H,G.v(L,E));zb(L)}}Object.defineProperty(A.h.O,a,C);return[]});return[]})},_embind_register_emval:b=>V(b,pc),_embind_register_enum:(b,a,c,d,f)=>{a=U(a);f=0===f?"object":1===f?"number":"string";switch(f){case "object":function h(){}h.values={};V(b,{name:a,constructor:h,valueType:f,j:function(g){return this.constructor.values[g]},
v:(g,n)=>n.value,J:qc(a,c,d),H:null});Kb(a,h);break;case "number":var l={};V(b,{name:a,Fa:l,valueType:f,j:g=>g,v:(g,n)=>n,J:qc(a,c,d),H:null});Kb(a,l);delete m[a].R;break;case "string":l={},V(b,{name:a,ib:{},eb:{},Fa:l,valueType:f,j:function(g){return this.eb[g]},v:function(g,n){return this.ib[n]},J:qc(a,c,d),H:null}),Kb(a,l),delete m[a].R}},_embind_register_enum_value:(b,a,c)=>{var d=rb(b,"enum");a=U(a);switch(d.valueType){case "object":b=d.constructor;d=Object.create(d.constructor.prototype,{value:{value:c},
constructor:{value:gb(`${d.name}_${a}`,function(){})}});b.values[c]=d;b[a]=d;break;case "number":d.Fa[a]=c;break;case "string":d.ib[a]=c,d.eb[c]=a,d.Fa[a]=a}},_embind_register_float:(b,a,c)=>{a=U(a);V(b,{name:a,j:d=>d,v:(d,f)=>f,J:rc(a,c),H:null})},_embind_register_function:(b,a,c,d,f,l)=>{var h=lc(a,c);b=U(b);b=mc(b);f=X(d,f);Kb(b,function(){ic(`Cannot call ${b} due to unbound types`,h)},a-1);W([],h,g=>{Wb(b,kc(b,[g[0],null].concat(g.slice(1)),null,f,l),a-1);return[]})},_embind_register_integer:(b,
a,c,d,f)=>{a=U(a);let l=g=>g;if(0===d){var h=32-8*c;l=g=>g<<h>>>h;f=l(f)}V(b,{name:a,j:l,v:(g,n)=>n,J:sc(a,c,0!==d),H:null})},_embind_register_memory_view:(b,a,c)=>{function d(l){return new f(La.buffer,N[l+4>>2],N[l>>2])}var f=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][a];c=U(c);V(b,{name:c,j:d,J:d},{Jb:!0})},_embind_register_std_string:(b,a)=>{a=U(a);V(b,{name:a,j(c){var d=(d=c+4)?vc(M,d,N[c>>2],!0):"";pb(c);return d},v(c,d){d instanceof ArrayBuffer&&
(d=new Uint8Array(d));var f,l="string"==typeof d;if(!(l||ArrayBuffer.isView(d)&&1==d.BYTES_PER_ELEMENT))throw new O("Cannot pass non-string to std::string");var h;if(l)for(f=h=0;f<d.length;++f){var g=d.charCodeAt(f);127>=g?h++:2047>=g?h+=2:55296<=g&&57343>=g?(h+=4,++f):h+=3}else h=d.length;f=h;h=Jc(4+f+1);g=h+4;N[h>>2]=f;if(l){if(l=g,g=f+1,f=M,0<g){g=l+g-1;for(var n=0;n<d.length;++n){var r=d.codePointAt(n);if(127>=r){if(l>=g)break;f[l++]=r}else if(2047>=r){if(l+1>=g)break;f[l++]=192|r>>6;f[l++]=128|
r&63}else if(65535>=r){if(l+2>=g)break;f[l++]=224|r>>12;f[l++]=128|r>>6&63;f[l++]=128|r&63}else{if(l+3>=g)break;f[l++]=240|r>>18;f[l++]=128|r>>12&63;f[l++]=128|r>>6&63;f[l++]=128|r&63;n++}}f[l]=0}}else M.set(d,g);null!==c&&c.push(pb,h);return h},J:Ab,H(c){pb(c)}})},_embind_register_std_wstring:(b,a,c)=>{c=U(c);if(2===a){var d=xc;var f=yc;var l=zc}else d=Ac,f=Bc,l=Cc;V(b,{name:c,j:h=>{var g=d(h+4,N[h>>2]*a,!0);pb(h);return g},v:(h,g)=>{if("string"!=typeof g)throw new O(`Cannot pass non-string to C++ string type ${c}`);
var n=l(g),r=Jc(4+n+a);N[r>>2]=n/a;f(g,r+4,n+a);null!==h&&h.push(pb,r);return r},J:Ab,H(h){pb(h)}})},_embind_register_value_object:(b,a,c,d,f,l)=>{yb[b]={name:U(a),Ia:X(c,d),P:X(f,l),Va:[]}},_embind_register_value_object_field:(b,a,c,d,f,l,h,g,n,r)=>{yb[b].Va.push({Cb:U(a),Ib:c,Gb:X(d,f),Hb:l,Rb:h,Qb:X(g,n),Sb:r})},_embind_register_void:(b,a)=>{a=U(a);V(b,{Kb:!0,name:a,j:()=>{},v:()=>{}})},_emval_create_invoker:(b,a,c)=>{var [d,...f]=Fc(b,a),l=d.v.bind(d),h=f.map(n=>n.J.bind(n));b--;var g=Array(b);
a=`methodCaller<(${f.map(n=>n.name)}) => ${d.name}>`;return Ec(gb(a,(n,r,A,q)=>{for(var v=0,p=0;p<b;++p)g[p]=h[p](q+v),v+=8;switch(c){case 0:var y=Q(n).apply(null,g);break;case 2:y=Reflect.construct(Q(n),g);break;case 3:y=g[0];break;case 1:y=Q(n)[Hc(r)](...g)}n=[];y=l(n,y);n.length&&(N[A>>2]=jb(n));return y}))},_emval_decref:oc,_emval_get_module_property:b=>{b=Hc(b);return jb(m[b])},_emval_get_property:(b,a)=>{b=Q(b);a=Q(a);return jb(b[a])},_emval_incref:b=>{9<b&&(ib[b+1]+=1)},_emval_invoke:(b,a,
c,d,f)=>Dc[b](a,c,d,f),_emval_new_array:()=>jb([]),_emval_new_cstring:b=>jb(Hc(b)),_emval_new_object:()=>jb({}),_emval_run_destructors:b=>{var a=Q(b);zb(a);oc(b)},_emval_set_property:(b,a,c)=>{b=Q(b);a=Q(a);c=Q(c);b[a]=c},clock_time_get:function(b,a,c,d){if(!(0<=b&&3>=b))return 28;b=Math.round(1E6*(0===b?Date.now():performance.now()));bb=[b>>>0,(ab=b,1<=+Math.abs(ab)?0<ab?+Math.floor(ab/4294967296)>>>0:~~+Math.ceil((ab-+(~~ab>>>0))/4294967296)>>>0:0)];Oa[d>>2]=bb[0];Oa[d+4>>2]=bb[1];return 0},emscripten_resize_heap:b=>
{var a=M.length;b>>>=0;if(2147483648<b)return!1;for(var c=1;4>=c;c*=2){var d=a*(1+.2/c);d=Math.min(d,b+100663296);a:{d=(Math.min(2147483648,65536*Math.ceil(Math.max(b,d)/65536))-Ta.buffer.byteLength+65535)/65536|0;try{Ta.grow(d);Sa();var f=1;break a}catch(l){}f=void 0}if(f)return!0}return!1},fd_close:()=>52,fd_seek:function(){return 70},fd_write:(b,a,c,d)=>{for(var f=0,l=0;l<c;l++){var h=N[a>>2],g=N[a+4>>2];a+=8;for(var n=0;n<g;n++){var r=b,A=M[h+n],q=Ic[r];0===A||10===A?((1===r?Da:Fa)(vc(q)),q.length=
0):q.push(A)}f+=g}N[d>>2]=f;return 0}},Lc;
Lc=await (async function(){function b(c){c=Lc=c.exports;pb=c.free;Jc=c.malloc;ob=c.__getTypeName;Xb.vij=c.dynCall_vij;Xb.iij=c.dynCall_iij;Xb.ji=c.dynCall_ji;Xb.jiji=c.dynCall_jiji;Ta=c.memory;Yb=c.__indirect_function_table;Sa();return Lc}var a={env:Kc,wasi_snapshot_preview1:Kc};if(m.instantiateWasm)return new Promise(c=>{m.instantiateWasm(a,(d,f)=>{c(b(d,f))})});Xa??=m.locateFile?m.locateFile("canvas_advanced_c2d_only.wasm",za):za+"canvas_advanced_c2d_only.wasm";return b((await $a(a)).instance)}());
(function(){function b(){m.calledRun=!0;if(!Ia){Ra=!0;Lc.__wasm_call_ctors();Ja?.(m);m.onRuntimeInitialized?.();if(m.postRun)for("function"==typeof m.postRun&&(m.postRun=[m.postRun]);m.postRun.length;){var a=m.postRun.shift();db.push(a)}cb(db)}}if(m.preRun)for("function"==typeof m.preRun&&(m.preRun=[m.preRun]);m.preRun.length;)fb();cb(eb);m.setStatus?(m.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>m.setStatus(""),1);b()},1)):b()})();Ra?moduleRtn=m:moduleRtn=new Promise((b,a)=>{Ja=b;Ka=a});
;return moduleRtn}})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rive);


/***/ }),
/* 5 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"@rive-app/canvas-lite","version":"2.51.0","description":"Rive web runtime, lite version, canvas renderer. Rive is an agent-native 2D and 3D engine for games, apps, and interactive UI.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation","interactive","ui","game-engine","graphics"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive_fallback.wasm","rive.d.ts","rive_advanced.mjs.d.ts","runtimeLoader.d.ts","utils","semantics"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}');

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessibilityOverlay: () => (/* reexport safe */ _accessibilityOverlay__WEBPACK_IMPORTED_MODULE_1__.AccessibilityOverlay),
/* harmony export */   CHECK_STATE_MASK: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.CHECK_STATE_MASK),
/* harmony export */   CHECK_STATE_OFFSET: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.CHECK_STATE_OFFSET),
/* harmony export */   SemanticActionType: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SemanticActionType),
/* harmony export */   SemanticCheckState: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SemanticCheckState),
/* harmony export */   SemanticMode: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SemanticMode),
/* harmony export */   SemanticRole: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole),
/* harmony export */   SemanticState: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState),
/* harmony export */   SemanticTrait: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait),
/* harmony export */   SemanticTreeModel: () => (/* reexport safe */ _semanticTreeModel__WEBPACK_IMPORTED_MODULE_0__.SemanticTreeModel),
/* harmony export */   checkStateOf: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.checkStateOf),
/* harmony export */   hasState: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.hasState),
/* harmony export */   hasTrait: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.hasTrait),
/* harmony export */   roleName: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.roleName),
/* harmony export */   stateNames: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.stateNames),
/* harmony export */   traitNames: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.traitNames)
/* harmony export */ });
/* harmony import */ var _semanticTreeModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _accessibilityOverlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);





/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SemanticTreeModel: () => (/* binding */ SemanticTreeModel)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

/**
 * Maintains an in-memory semantic tree built from incremental
 * {@link SemanticsDiff} updates received each frame from the WASM runtime.
 *
 * Processing order within {@link applyDiff} follows the contract defined in
 * `semantic_snapshot.hpp`: removed → added → moved → childrenUpdated →
 * updatedSemantic → updatedGeometry.
 */
var SemanticTreeModel = /** @class */ (function () {
    function SemanticTreeModel() {
        this._nodesById = new Map();
        this._roots = [];
        this._semanticVersion = 0;
        this._geometryVersion = 0;
        this._geometryChangedIds = new Set();
        this._semanticChangedIds = new Set();
        this._debug = false;
    }
    Object.defineProperty(SemanticTreeModel.prototype, "nodeCount", {
        get: function () {
            return this._nodesById.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SemanticTreeModel.prototype, "semanticVersion", {
        /** Bumped when semantic content or tree structure changes. */
        get: function () {
            return this._semanticVersion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SemanticTreeModel.prototype, "geometryVersion", {
        /** Bumped when node bounds change without a semantic/structural change. */
        get: function () {
            return this._geometryVersion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SemanticTreeModel.prototype, "geometryChangedIds", {
        /** Node IDs whose bounds changed in the most recent {@link applyDiff}. */
        get: function () {
            return this._geometryChangedIds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SemanticTreeModel.prototype, "semanticChangedIds", {
        /**
         * Node IDs whose semantic fields (role/label/value/hint/flags/headingLevel)
         * changed in the most recent {@link applyDiff}. Structural changes (moves,
         * child reorders, removals) bump {@link semanticVersion} but don't mark
         * nodes here — element attributes don't depend on tree position.
         */
        get: function () {
            return this._semanticChangedIds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SemanticTreeModel.prototype, "roots", {
        /** Root node IDs in sibling order. */
        get: function () {
            return this._roots;
        },
        enumerable: false,
        configurable: true
    });
    /** Look up a node by its ID, or undefined if not in the tree. */
    SemanticTreeModel.prototype.nodeById = function (id) {
        return this._nodesById.get(id);
    };
    /** The node with SemanticState.Focused, or undefined. */
    SemanticTreeModel.prototype.focusedNode = function () {
        // Manual iteration: runs every frame and must stop at the first hit (the
        // TS target forbids for-of over Map iterators).
        var it = this._nodesById.values();
        for (var r = it.next(); !r.done; r = it.next()) {
            if ((0,_types__WEBPACK_IMPORTED_MODULE_0__.hasState)(r.value.stateFlags, _types__WEBPACK_IMPORTED_MODULE_0__.SemanticState.Focused))
                return r.value;
        }
        return;
    };
    /** Current index of a node among its siblings (or roots), or -1 if absent. */
    SemanticTreeModel.prototype.siblingIndexOf = function (id) {
        var node = this._nodesById.get(id);
        if (!node)
            return -1;
        if (node.parentId < 0)
            return this._roots.indexOf(id);
        var parent = this._nodesById.get(node.parentId);
        return parent ? parent.children.indexOf(id) : -1;
    };
    /** Detach a node from its current parent (or from roots). */
    SemanticTreeModel.prototype.detach = function (id) {
        var node = this._nodesById.get(id);
        if (!node)
            return;
        if (node.parentId < 0) {
            var idx = this._roots.indexOf(id);
            if (idx !== -1)
                this._roots.splice(idx, 1);
        }
        else {
            var parent_1 = this._nodesById.get(node.parentId);
            if (parent_1) {
                var idx = parent_1.children.indexOf(id);
                if (idx !== -1)
                    parent_1.children.splice(idx, 1);
            }
        }
    };
    /** Attach a node under a parent at a given sibling index (or as root). */
    SemanticTreeModel.prototype.attach = function (id, parentId, siblingIndex) {
        var node = this._nodesById.get(id);
        if (!node)
            return;
        if (parentId < 0) {
            node.parentId = -1;
            var idx = clamp(siblingIndex, 0, this._roots.length);
            this._roots.splice(idx, 0, id);
        }
        else {
            var parent_2 = this._nodesById.get(parentId);
            if (!parent_2) {
                node.parentId = -1;
                this._roots.push(id);
            }
            else {
                node.parentId = parentId;
                var idx = clamp(siblingIndex, 0, parent_2.children.length);
                parent_2.children.splice(idx, 0, id);
            }
        }
    };
    /** Recursively remove a node and all descendants. */
    SemanticTreeModel.prototype.removeSubtree = function (id) {
        var node = this._nodesById.get(id);
        if (!node)
            return;
        // Copy children array — we're mutating during traversal
        var kids = __spreadArray([], node.children, true);
        for (var _i = 0, kids_1 = kids; _i < kids_1.length; _i++) {
            var child = kids_1[_i];
            this.removeSubtree(child);
        }
        this.detach(id);
        this._nodesById.delete(id);
    };
    /**
     * Apply an incremental diff to the tree. Bumps version counters and notifies
     * listeners only when the tree actually changed.
     *
     * No-op diffs (field values identical to current model) do not bump
     * versions — the native side guards against emitting these, but applyDiff
     * defends its subscribers regardless.
     */
    SemanticTreeModel.prototype.applyDiff = function (diff) {
        var _a, _b;
        var _this = this;
        this._geometryChangedIds.clear();
        this._semanticChangedIds.clear();
        var semanticChanged = false;
        var geometryChanged = false;
        var markSemantic = function () {
            semanticChanged = true;
        };
        var markSemanticNode = function (id) {
            semanticChanged = true;
            _this._semanticChangedIds.add(id);
        };
        var markGeometry = function (id) {
            geometryChanged = true;
            _this._geometryChangedIds.add(id);
        };
        // 1. removed
        for (var _i = 0, _c = diff.removed; _i < _c.length; _i++) {
            var id = _c[_i];
            if (this._nodesById.has(id)) {
                this.removeSubtree(id);
                markSemantic();
            }
        }
        // 2. added
        for (var _d = 0, _e = diff.added; _d < _e.length; _d++) {
            var n = _e[_d];
            var existing = this._nodesById.get(n.id);
            if (existing) {
                if (semanticFieldsDiffer(existing, n)) {
                    applySemantic(existing, n);
                    markSemanticNode(n.id);
                }
                if (geometryFieldsDiffer(existing, n)) {
                    applyGeometry(existing, n);
                    markGeometry(n.id);
                }
            }
            else {
                this._nodesById.set(n.id, nodeFromDiff(n));
                markSemanticNode(n.id);
                markGeometry(n.id);
            }
            this.detach(n.id);
            this.attach(n.id, n.parentId, n.siblingIndex);
        }
        // 3. moved
        // The runtime emits a node as "moved" when its parentId OR siblingIndex
        // changes, so a reorder-only move (same parent, new index) is still a
        // structural/semantic change. Compare the actual position before and after
        // re-attaching so that geometry-only or no-op moves don't bump the semantic
        // version (which would defeat the semantic/geometry version split).
        for (var _f = 0, _g = diff.moved; _f < _g.length; _f++) {
            var n = _g[_f];
            var existing = this._nodesById.get(n.id);
            if (!existing)
                continue;
            var parentChanged = existing.parentId !== n.parentId;
            var oldIndex = this.siblingIndexOf(n.id);
            var geomChanged = geometryFieldsDiffer(existing, n);
            if (geomChanged) {
                applyGeometry(existing, n);
                markGeometry(n.id);
            }
            this.detach(n.id);
            this.attach(n.id, n.parentId, n.siblingIndex);
            if (parentChanged || this.siblingIndexOf(n.id) !== oldIndex) {
                markSemantic();
            }
        }
        // 4. childrenUpdated
        for (var _h = 0, _j = diff.childrenUpdated; _h < _j.length; _h++) {
            var update = _j[_h];
            if (update.parentId < 0) {
                var next = update.childIds.filter(function (id) { return _this._nodesById.has(id); });
                if (!arraysEqual(this._roots, next)) {
                    this._roots.length = 0;
                    (_a = this._roots).push.apply(_a, next);
                    for (var _k = 0, _l = this._roots; _k < _l.length; _k++) {
                        var id = _l[_k];
                        var node = this._nodesById.get(id);
                        if (node)
                            node.parentId = -1;
                    }
                    markSemantic();
                }
            }
            else {
                var parent_3 = this._nodesById.get(update.parentId);
                if (!parent_3)
                    continue;
                var next = update.childIds.filter(function (id) { return _this._nodesById.has(id); });
                if (!arraysEqual(parent_3.children, next)) {
                    parent_3.children.length = 0;
                    (_b = parent_3.children).push.apply(_b, next);
                    for (var _m = 0, _o = parent_3.children; _m < _o.length; _m++) {
                        var id = _o[_m];
                        var node = this._nodesById.get(id);
                        if (node)
                            node.parentId = update.parentId;
                    }
                    markSemantic();
                }
            }
        }
        // 5. updatedSemantic — semantic fields updated
        for (var _p = 0, _q = diff.updatedSemantic; _p < _q.length; _p++) {
            var n = _q[_p];
            var existing = this._nodesById.get(n.id);
            if (!existing)
                continue;
            if (!semanticFieldsDiffer(existing, n))
                continue;
            applySemantic(existing, n);
            markSemanticNode(n.id);
        }
        // 6. updatedGeometry — bounds of a semantic node updated
        for (var _r = 0, _s = diff.updatedGeometry; _r < _s.length; _r++) {
            var n = _s[_r];
            var existing = this._nodesById.get(n.id);
            if (!existing)
                continue;
            if (!geometryFieldsDiffer(existing, n))
                continue;
            applyGeometry(existing, n);
            markGeometry(n.id);
        }
        if (!semanticChanged && !geometryChanged)
            return;
        if (semanticChanged)
            this._semanticVersion++;
        if (geometryChanged)
            this._geometryVersion++;
        if (this._debug) {
            this.logDiff(diff, semanticChanged, geometryChanged);
        }
    };
    Object.defineProperty(SemanticTreeModel.prototype, "debug", {
        /** Enable/disable debug logging of diffs to the console. */
        set: function (enabled) {
            this._debug = enabled;
        },
        enumerable: false,
        configurable: true
    });
    SemanticTreeModel.prototype.logDiff = function (diff, semanticChanged, geometryChanged) {
        var lines = [
            "[rive:semantics] semantic v".concat(this._semanticVersion) +
                (geometryChanged ? " geometry v".concat(this._geometryVersion) : "") +
                (semanticChanged ? "" : " (geometry-only)"),
        ];
        for (var _i = 0, _a = diff.removed; _i < _a.length; _i++) {
            var id = _a[_i];
            lines.push("  - removed #".concat(id));
        }
        for (var _b = 0, _c = diff.added; _b < _c.length; _b++) {
            var n = _c[_b];
            lines.push("  + added #".concat(n.id, " ").concat((0,_types__WEBPACK_IMPORTED_MODULE_0__.roleName)(n.role)) +
                (n.label ? " \"".concat(n.label, "\"") : "") +
                " bounds:(".concat(n.minX.toFixed(1), ",").concat(n.minY.toFixed(1), ")-(").concat(n.maxX.toFixed(1), ",").concat(n.maxY.toFixed(1), ")") +
                " states=[".concat((0,_types__WEBPACK_IMPORTED_MODULE_0__.stateNames)(n.stateFlags), "]") +
                " traits=[".concat((0,_types__WEBPACK_IMPORTED_MODULE_0__.traitNames)(n.traitFlags), "]"));
        }
        for (var _d = 0, _e = diff.moved; _d < _e.length; _d++) {
            var n = _e[_d];
            lines.push("  ~ moved #".concat(n.id, " \u2192 parent=").concat(n.parentId, " idx=").concat(n.siblingIndex) +
                " bounds:(".concat(n.minX.toFixed(1), ",").concat(n.minY.toFixed(1), ")-(").concat(n.maxX.toFixed(1), ",").concat(n.maxY.toFixed(1), ")"));
        }
        for (var _f = 0, _g = diff.childrenUpdated; _f < _g.length; _f++) {
            var u = _g[_f];
            lines.push("  \u2195 children of ".concat(u.parentId < 0 ? "root" : "#" + u.parentId, ": [").concat(u.childIds.join(", "), "]"));
        }
        for (var _h = 0, _j = diff.updatedSemantic; _h < _j.length; _h++) {
            var n = _j[_h];
            lines.push("  \u270E semantic #".concat(n.id, " ").concat((0,_types__WEBPACK_IMPORTED_MODULE_0__.roleName)(n.role)) +
                (n.label ? " \"".concat(n.label, "\"") : "") +
                " states=[".concat((0,_types__WEBPACK_IMPORTED_MODULE_0__.stateNames)(n.stateFlags), "]") +
                " traits=[".concat((0,_types__WEBPACK_IMPORTED_MODULE_0__.traitNames)(n.traitFlags), "]"));
        }
        for (var _k = 0, _l = diff.updatedGeometry; _k < _l.length; _k++) {
            var n = _l[_k];
            lines.push("  \u229E geometry #".concat(n.id, " (").concat(n.minX.toFixed(1), ",").concat(n.minY.toFixed(1), ")-(").concat(n.maxX.toFixed(1), ",").concat(n.maxY.toFixed(1), ")"));
        }
        console.log(lines.join("\n"));
    };
    /**
     * Returns every node in depth-first order, paired with its depth level.
     * Useful for debug logging / rendering a flat list.
     */
    SemanticTreeModel.prototype.flattened = function () {
        var _this = this;
        var out = [];
        var walk = function (id, depth) {
            var node = _this._nodesById.get(id);
            if (!node)
                return;
            out.push({ depth: depth, node: node });
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                walk(child, depth + 1);
            }
        };
        for (var _i = 0, _a = this._roots; _i < _a.length; _i++) {
            var root = _a[_i];
            walk(root, 0);
        }
        return out;
    };
    return SemanticTreeModel;
}());

function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
}
function arraysEqual(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
function nodeFromDiff(n) {
    return {
        id: n.id,
        parentId: -1,
        role: n.role,
        label: n.label,
        value: n.value,
        hint: n.hint,
        stateFlags: n.stateFlags,
        traitFlags: n.traitFlags,
        headingLevel: n.headingLevel,
        minX: n.minX,
        minY: n.minY,
        maxX: n.maxX,
        maxY: n.maxY,
        children: [],
    };
}
/** Compare role/label/value/hint/stateFlags/traitFlags/headingLevel. */
function semanticFieldsDiffer(a, b) {
    return (a.role !== b.role ||
        a.label !== b.label ||
        a.value !== b.value ||
        a.hint !== b.hint ||
        a.stateFlags !== b.stateFlags ||
        a.traitFlags !== b.traitFlags ||
        a.headingLevel !== b.headingLevel);
}
/** Compare only bounds (minX/minY/maxX/maxY). */
function geometryFieldsDiffer(a, b) {
    return (a.minX !== b.minX ||
        a.minY !== b.minY ||
        a.maxX !== b.maxX ||
        a.maxY !== b.maxY);
}
function applySemantic(target, src) {
    target.role = src.role;
    target.label = src.label;
    target.value = src.value;
    target.hint = src.hint;
    target.stateFlags = src.stateFlags;
    target.traitFlags = src.traitFlags;
    target.headingLevel = src.headingLevel;
}
function applyGeometry(target, src) {
    target.minX = src.minX;
    target.minY = src.minY;
    target.maxX = src.maxX;
    target.maxY = src.maxY;
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHECK_STATE_MASK: () => (/* binding */ CHECK_STATE_MASK),
/* harmony export */   CHECK_STATE_OFFSET: () => (/* binding */ CHECK_STATE_OFFSET),
/* harmony export */   SemanticActionType: () => (/* binding */ SemanticActionType),
/* harmony export */   SemanticCheckState: () => (/* binding */ SemanticCheckState),
/* harmony export */   SemanticMode: () => (/* binding */ SemanticMode),
/* harmony export */   SemanticRole: () => (/* binding */ SemanticRole),
/* harmony export */   SemanticState: () => (/* binding */ SemanticState),
/* harmony export */   SemanticTrait: () => (/* binding */ SemanticTrait),
/* harmony export */   checkStateOf: () => (/* binding */ checkStateOf),
/* harmony export */   hasState: () => (/* binding */ hasState),
/* harmony export */   hasTrait: () => (/* binding */ hasTrait),
/* harmony export */   roleName: () => (/* binding */ roleName),
/* harmony export */   stateNames: () => (/* binding */ stateNames),
/* harmony export */   traitNames: () => (/* binding */ traitNames)
/* harmony export */ });
// ---------------------------------------------------------------------------
// SemanticRole — mirrors rive::SemanticRole
// ---------------------------------------------------------------------------
var SemanticRole = {
    none: 0,
    button: 1,
    link: 2,
    checkbox: 3,
    switchControl: 4,
    slider: 5,
    textField: 6,
    text: 7,
    image: 8,
    group: 9,
    list: 10,
    listItem: 11,
    tab: 12,
    tabList: 13,
    dialog: 14,
    alertDialog: 15,
    radioGroup: 16,
    radioButton: 17,
};
// ---------------------------------------------------------------------------
// SemanticState — mirrors rive::SemanticState bitmask
//
// Bits 0-7 are trait-gated (only meaningful when the corresponding
// SemanticTrait is set). Bits 8-13 are non-trait states.
//
// Check state is the exception: it is a two-bit *field* at bits 2-3 rather
// than a flag, because a checkbox is tri-state. It is not a member of this
// table — read it with checkStateOf().
// ---------------------------------------------------------------------------
var SemanticState = {
    None: 0,
    // Trait-gated
    Expanded: 1 << 0, // requires Expandable
    Selected: 1 << 1, // requires Selectable
    // Bits 2-3 are the check state field, not independent flags -- see SemanticCheckState.
    Toggled: 1 << 4, // requires Toggleable
    Required: 1 << 5, // requires Requirable
    Disabled: 1 << 6, // requires Enablable
    Focused: 1 << 7, // requires Focusable
    // Non-trait
    Hidden: 1 << 8,
    LiveRegion: 1 << 9,
    ReadOnly: 1 << 10,
    Modal: 1 << 11,
    Obscured: 1 << 12,
    Multiline: 1 << 13,
};
function hasState(flags, state) {
    return (flags & state) !== 0;
}
// SemanticCheckState — mirrors rive::SemanticCheckState
//
// The tri-state of a checkable node. Occupies two bits of stateFlags at
// CHECK_STATE_OFFSET, so it is read as a value rather than tested as a flag.
// Only meaningful when the Checkable trait is set.
var SemanticCheckState = {
    Unchecked: 0,
    Checked: 1,
    Mixed: 2,
};
/** Bit offset of the check field within stateFlags. */
var CHECK_STATE_OFFSET = 2;
/** Mask of the check field within stateFlags. */
var CHECK_STATE_MASK = 3 << CHECK_STATE_OFFSET;
/**
 * Decodes the check field out of `flags`. The field is two bits. Returns 0, 1, or 2
 * per the mapping in SemanticCheckState.
 */
function checkStateOf(flags) {
    var value = (flags & CHECK_STATE_MASK) >> CHECK_STATE_OFFSET;
    return value >= SemanticCheckState.Mixed
        ? SemanticCheckState.Mixed
        : value;
}
/**
 * Controls when the instance builds semantic trees and accessibility overlays.
 *
 * - `disabled`: no semantics work.
 * - `enabled`: semantics and overlay are active immediately after load.
 */
var SemanticMode = {
    Disabled: "disabled",
    Enabled: "enabled",
};
// ---------------------------------------------------------------------------
// SemanticTrait — mirrors rive::SemanticTrait bitmask
//
// Traits declare what *capabilities* a node has. A state flag is only
// meaningful when its corresponding trait is set.
// ---------------------------------------------------------------------------
var SemanticTrait = {
    None: 0,
    Expandable: 1 << 0,
    Selectable: 1 << 1,
    Checkable: 1 << 2,
    Toggleable: 1 << 3,
    Requirable: 1 << 4,
    Enablable: 1 << 5,
    Focusable: 1 << 6,
};
function hasTrait(flags, trait) {
    return (flags & trait) !== 0;
}
// ---------------------------------------------------------------------------
// SemanticActionType — mirrors rive::SemanticActionType
// ---------------------------------------------------------------------------
var SemanticActionType = {
    tap: 0,
    increase: 1,
    decrease: 2,
};
// ---------------------------------------------------------------------------
// Helpers — readable names for bitmask flags
// ---------------------------------------------------------------------------
var _roleNames = {};
for (var _i = 0, _a = Object.entries(SemanticRole); _i < _a.length; _i++) {
    var _b = _a[_i], name_1 = _b[0], val = _b[1];
    _roleNames[val] = name_1;
}
var _stateEntries = Object.entries(SemanticState).filter(function (_a) {
    var v = _a[1];
    return v !== 0;
});
var _traitEntries = Object.entries(SemanticTrait).filter(function (_a) {
    var v = _a[1];
    return v !== 0;
});
function roleName(role) {
    var _a;
    return (_a = _roleNames[role]) !== null && _a !== void 0 ? _a : "unknown(".concat(role, ")");
}
function stateNames(flags) {
    if (flags === 0)
        return "none";
    var active = [];
    for (var _i = 0, _stateEntries_1 = _stateEntries; _i < _stateEntries_1.length; _i++) {
        var _a = _stateEntries_1[_i], name_2 = _a[0], bit = _a[1];
        if (flags & bit)
            active.push(name_2);
    }
    switch (checkStateOf(flags)) {
        case SemanticCheckState.Checked:
            active.push("Checked");
            break;
        case SemanticCheckState.Mixed:
            active.push("Mixed");
            break;
    }
    return active.join(", ") || "none";
}
function traitNames(flags) {
    if (flags === 0)
        return "none";
    var active = [];
    for (var _i = 0, _traitEntries_1 = _traitEntries; _i < _traitEntries_1.length; _i++) {
        var _a = _traitEntries_1[_i], name_3 = _a[0], bit = _a[1];
        if (flags & bit)
            active.push(name_3);
    }
    return active.join(", ") || "none";
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessibilityOverlay: () => (/* binding */ AccessibilityOverlay)
/* harmony export */ });
/* harmony import */ var _claimedKeyEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _utils_canvasOffset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);



var warnedUnpositionedWrapper = false;
/**
 * Warns once per page when no positioned element sits at or inside the canvas's
 * nearest scroll container: the overlay then can't scroll with the canvas. Reads only.
 */
function warnIfWrapperUnpositioned(canvas) {
    if (warnedUnpositionedWrapper)
        return;
    // Null when detached (or display:none / fixed); nothing to judge yet.
    var offsetParent = canvas.offsetParent;
    if (!offsetParent)
        return;
    var scrolls = function (v) { return v === "auto" || v === "scroll" || v === "overlay"; };
    var scroller = null;
    var el = canvas.parentElement;
    // Bounds pathological nesting.
    var MAX_ANCESTOR_WALK = 32;
    for (var i = 0; el && el !== document.documentElement && i < MAX_ANCESTOR_WALK; i++, el = el.parentElement) {
        var style = getComputedStyle(el);
        if (scrolls(style.overflowX) || scrolls(style.overflowY)) {
            scroller = el;
            break;
        }
    }
    // Only the viewport scrolls: any offsetParent scrolls with the page.
    if (!scroller || scroller.contains(offsetParent))
        return;
    warnedUnpositionedWrapper = true;
    console.warn('[Rive] Semantics: give the element wrapping the <canvas> "position: relative" (or another positioned value) so the semantic overlay scrolls with the canvas. Without it, screen readers may scroll to stale positions when the canvas is inside a scrolling container.');
}
/**
 * Creates and manages an invisible DOM tree overlaying a Rive canvas. This is for
 * screen readers to discover and interact with the Rive content.
 *
 * Each semantic node in the {@link SemanticTreeModel} gets a corresponding
 * DOM element with appropriate ARIA role, states, and action handlers so
 * assistive technologies (i.e. screen readers) can discover
 * and interact with the Rive content.
 *
 * Each node receives a prefixed ID (`id=rive-{instanceId}-sem-{nodeId}`) to avoid host-page ID collisions.
 * The nodeID is Rive's semantic node ID from core runtime.
 * Each node is styled with `pointer-events: none`. Interactive nodes can receive
 * programmatic focus and keydown events without entering the browser Tab order.
 */
var AccessibilityOverlay = /** @class */ (function () {
    function AccessibilityOverlay(options) {
        var _this = this;
        var _a, _b;
        this.elements = new Map();
        /** Visually-hidden description spans keyed by node ID, referenced by aria-describedby. */
        this.descElements = new Map();
        this.lastSemanticVersion = -1;
        this.lastGeometryVersion = -1;
        /** Text elements whose fit-scale needs recomputing, batched per update (see flushTextGeometry). */
        this.pendingTextGeometry = [];
        /** Last measured box-size|text key per text element, to skip redundant re-measures. */
        this.textGeometryKeys = new WeakMap();
        /** Node data last passed to applyAttributes per element; see {@link setEditingHostNode}. */
        this.appliedNodes = new WeakMap();
        this.lastCanvasPositioning = {
            width: -1, height: -1, offsetTop: -1, offsetLeft: -1,
        };
        /**
         * Set when a ResizeObserver/window-resize signals the canvas geometry may have
         * changed, cleared once the transform is re-synced. Lets {@link needsUpdate}
         * report geometry changes without a per-frame `getBoundingClientRect()` reflow.
         * Starts true so the first update computes the transform.
         */
        this._geometryDirty = true;
        /** True while reconciling the DOM (reserved for future focus-sync guards). */
        this.isUpdating = false;
        /** Node whose element the editing host stands in for, or null. */
        this.editingHostNodeId = null;
        /** Semantic version last folded into the editing host's decoration. */
        this.editingHostSemanticVersion = -1;
        /**
         * Single child div of the overlay container that carries the artboard→CSS
         * transform. All semantic node elements are children of this div and express
         * their positions in raw artboard-space coordinates. The CSS transform on
         * this container maps artboard units to CSS pixels in one GPU pass — no
         * per-node matrix multiplication required.
         */
        this.transformContainer = null;
        this._artboardBounds = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
        this.repositionTimer = null;
        this.canvasResizeObserver = null;
        this.parentResizeObserver = null;
        /**
         * Detects canvas *position* drift. See {@link observePosition}.
         */
        this.positionObserver = null;
        this._onWindowResize = function () { return _this.scheduleReposition(); };
        this.instanceId = options.instanceId;
        this.fireAction = options.fireAction;
        this.requestFocus = options.requestFocus;
        this.clearFocus = options.clearFocus;
        this.canvas = options.canvas;
        this.semanticsOptions = options.semanticsOptions;
        this.allowFocusInterrupt = (_a = options.allowFocusInterrupt) !== null && _a !== void 0 ? _a : false;
        this.isEditingHostFocused = (_b = options.isEditingHostFocused) !== null && _b !== void 0 ? _b : (function () { return false; });
        this.container = this.createContainer(options.canvas);
        this.attachPositionObservers();
        warnIfWrapperUnpositioned(options.canvas);
    }
    /**
     * Hide the stood-in node's element (no duplicate textbox for AT); re-derive the previous
     * one's aria-hidden.
     */
    AccessibilityOverlay.prototype.setEditingHostNode = function (nodeId) {
        if (this.editingHostNodeId === nodeId)
            return;
        var previous = this.editingHostNodeId;
        this.editingHostNodeId = nodeId;
        if (previous !== null) {
            var previousEl = this.elements.get(previous);
            // Re-derive rather than un-hide: the node may have become Hidden mid-session.
            if (previousEl) {
                var previousNode = this.appliedNodes.get(previousEl);
                if (previousNode && this.isAriaHidden(previousNode)) {
                    setAttr(previousEl, "aria-hidden", "true");
                }
                else {
                    removeAttr(previousEl, "aria-hidden");
                }
            }
        }
        if (nodeId !== null) {
            var el = this.elements.get(nodeId);
            if (el)
                setAttr(el, "aria-hidden", "true");
        }
    };
    /**
     * Describe the focused text field on the host and hide its element; no-op unless
     * semantics changed.
     * @param force - apply even if semantics are unchanged (session start).
     */
    AccessibilityOverlay.prototype.syncEditingHost = function (tree, host, force) {
        var _a;
        if (!force && tree.semanticVersion === this.editingHostSemanticVersion)
            return;
        this.editingHostSemanticVersion = tree.semanticVersion;
        var node = tree.focusedNode();
        if (node === undefined || node.role !== _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.textField) {
            // Nothing to describe; drop the stale description rather than misname the host.
            if (this.editingHostNodeId !== null) {
                host.resetDecoration();
                this.setEditingHostNode(null);
            }
            return;
        }
        // Every key is passed on every call, nulls included, so nothing survives from
        // the previously described field.
        host.setSecure((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(node.stateFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Obscured));
        host.decorate({
            "aria-label": node.label || null,
            "aria-readonly": (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(node.stateFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.ReadOnly) ? "true" : null,
            "aria-multiline": (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(node.stateFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Multiline) ? "true" : null,
            // Trait-gated to match applyAttributes.
            "aria-required": (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(node.traitFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Requirable) &&
                (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(node.stateFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Required)
                ? "true"
                : null,
            // The hint span applyAttributes maintains (update() runs earlier in the frame).
            "aria-describedby": (node.hint && ((_a = this.descElements.get(node.id)) === null || _a === void 0 ? void 0 : _a.id)) || null,
        });
        this.setEditingHostNode(node.id);
    };
    /** True while the editing host stands in for a node's element. */
    AccessibilityOverlay.prototype.hasEditingHost = function () {
        return this.editingHostNodeId !== null;
    };
    /**
     * Undo the stand-in; if the host still has DOM focus, move it to the focused node's
     * element so AT announces it.
     */
    AccessibilityOverlay.prototype.releaseEditingHost = function (tree, host) {
        var _a;
        host === null || host === void 0 ? void 0 : host.resetDecoration();
        this.setEditingHostNode(null);
        this.editingHostSemanticVersion = -1;
        if (!(host === null || host === void 0 ? void 0 : host.hasDomFocus()))
            return;
        var focusedNodeId = (_a = tree === null || tree === void 0 ? void 0 : tree.focusedNode()) === null || _a === void 0 ? void 0 : _a.id;
        if (focusedNodeId !== undefined)
            this.focusNodeElement(focusedNodeId);
    };
    /** Move DOM focus onto a node's element. No-op for a node with no element. */
    AccessibilityOverlay.prototype.focusNodeElement = function (nodeId) {
        var el = this.elements.get(nodeId);
        if (!el)
            return;
        this.focusElementInPlace(el);
    };
    // The overlay is positioned outside the canvas's scroll chain, so a plain focus()
    // would scroll the root instead; scroll the canvas into view through its real ancestors.
    AccessibilityOverlay.prototype.focusElementInPlace = function (el) {
        var _a, _b;
        this.syncContainerBeforeFocus();
        el.focus({ preventScroll: true });
        (_b = (_a = this.canvas).scrollIntoView) === null || _b === void 0 ? void 0 : _b.call(_a, {
            block: "nearest",
            inline: "nearest",
            behavior: "instant",
        });
        // The scroll moved the canvas; re-align now rather than after the observer throttle.
        this.syncContainerGeometry();
        this.observePosition();
    };
    AccessibilityOverlay.prototype.getSemanticOverlayContainer = function () {
        return this.container;
    };
    // ---- Container lifecycle ----
    // Keep the a11y tree overlay matched to the canvas's position and size:
    // 1. The canvas resized           — ResizeObserver
    // 2. The canvas's parent resized   — ResizeObserver
    // 3. The window resized            — resize event
    // 4. The canvas moved/drifted      — IntersectionObserver (see observePosition)
    AccessibilityOverlay.prototype.attachPositionObservers = function () {
        var _this = this;
        this.canvasResizeObserver = new ResizeObserver(function () { return _this.scheduleReposition(); });
        this.canvasResizeObserver.observe(this.canvas);
        var parent = this.canvas.parentElement;
        if (parent) {
            this.parentResizeObserver = new ResizeObserver(function () { return _this.scheduleReposition(); });
            this.parentResizeObserver.observe(parent);
        }
        window.addEventListener("resize", this._onWindowResize);
        this.observePosition();
    };
    /**
     * Arms an IntersectionObserver whose root box is bounded to the canvas, so it
     * fires when the canvas moves relative to the viewport — position drift that
     * no ResizeObserver reports. Lets us re-sync the overlay container on a move
     * instead of recalculating the canvas bounding box every frame.
     */
    AccessibilityOverlay.prototype.observePosition = function () {
        var _this = this;
        var _a;
        if (typeof IntersectionObserver === "undefined")
            return;
        (_a = this.positionObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.positionObserver = null;
        var rect = this.canvas.getBoundingClientRect();
        // Can't frame a zero-area element; it will re-arm on the next reposition.
        if (!rect.width || !rect.height)
            return;
        // Shrink the viewport root box down to exactly the canvas: a negative inset
        // from each viewport edge to the matching canvas edge, in CSS shorthand
        // order (top, right, bottom, left). Rounded so sub-pixel jitter doesn't trip
        // the 1.0 threshold.
        var insetToPx = function (v) { return "".concat(-Math.round(v), "px"); };
        var rootMargin = [
            rect.top, // top:    viewport top → canvas top
            window.innerWidth - rect.right, // right:  viewport right → canvas right
            window.innerHeight - rect.bottom, // bottom: viewport bottom → canvas bottom
            rect.left, // left:   viewport left → canvas left
        ]
            .map(insetToPx)
            .join(" ");
        // The observer emits an initial notification for the current (contained)
        // state; ignore that and only react to a subsequent move.
        var armed = false;
        this.positionObserver = new IntersectionObserver(function () {
            if (!armed) {
                armed = true;
                return;
            }
            _this.scheduleReposition();
        }, { threshold: 1.0, rootMargin: rootMargin });
        this.positionObserver.observe(this.canvas);
    };
    AccessibilityOverlay.prototype.scheduleReposition = function () {
        var _this = this;
        // A resize/move may have changed canvas size/scale/position; force a
        // transform recompute on the next frame's update.
        this._geometryDirty = true;
        if (this.repositionTimer !== null)
            return;
        this.repositionTimer = setTimeout(function () {
            _this.repositionTimer = null;
            _this.syncContainerGeometry();
            // Re-arm the position observer at the canvas's new location.
            _this.observePosition();
        }, 500); // Throttle to avoid rapid style recalculations
    };
    /** Returns true when the container's size changed (node transforms need recomputing). */
    AccessibilityOverlay.prototype.syncContainerGeometry = function () {
        var rect = this.canvas.getBoundingClientRect();
        var _a = (0,_utils_canvasOffset__WEBPACK_IMPORTED_MODULE_1__.canvasOffset)(this.canvas), top = _a.top, left = _a.left;
        var sizeChanged = rect.width !== this.lastCanvasPositioning.width ||
            rect.height !== this.lastCanvasPositioning.height;
        if (!sizeChanged &&
            top === this.lastCanvasPositioning.offsetTop &&
            left === this.lastCanvasPositioning.offsetLeft)
            return false;
        this.container.style.top = top + "px";
        this.container.style.left = left + "px";
        this.container.style.width = rect.width + "px";
        this.container.style.height = rect.height + "px";
        this.container.tabIndex = -1;
        this.lastCanvasPositioning.width = rect.width;
        this.lastCanvasPositioning.height = rect.height;
        this.lastCanvasPositioning.offsetTop = top;
        this.lastCanvasPositioning.offsetLeft = left;
        return sizeChanged;
    };
    /**
     * Re-align the container right before focusing one of its elements. The position
     * observer re-syncs after scrolling on a throttle; focusing an element while the
     * container is stale would make the browser scroll the page to where it sits.
     */
    AccessibilityOverlay.prototype.syncContainerBeforeFocus = function () {
        if (this.syncContainerGeometry())
            this._geometryDirty = true;
    };
    AccessibilityOverlay.prototype.createContainer = function (canvas) {
        var _a, _b;
        var container = document.createElement("div");
        container.id = "rive-a11y-".concat(this.instanceId);
        container.setAttribute("role", "region");
        container.setAttribute("aria-label", (_b = (_a = this.semanticsOptions) === null || _a === void 0 ? void 0 : _a.riveCanvasLabel) !== null && _b !== void 0 ? _b : "Rive animation");
        // Size to the canvas's CSS layout box, not the parent container.
        var rect = canvas.getBoundingClientRect();
        var _c = (0,_utils_canvasOffset__WEBPACK_IMPORTED_MODULE_1__.canvasOffset)(this.canvas), top = _c.top, left = _c.left;
        container.style.cssText = [
            "position:absolute",
            "top:".concat(top, "px"),
            "left:".concat(left, "px"),
            "line-height:normal",
            "font-size:16px",
            "width:".concat(rect.width, "px"),
            "height:".concat(rect.height, "px"),
            "overflow:hidden",
            "pointer-events:none",
            // Visually hidden but still in the accessibility tree.
            // `display:none` and `visibility:hidden` would hide from AT.
            "opacity:0",
        ].join(";");
        canvas.insertAdjacentElement("afterend", container);
        return container;
    };
    /**
     * Returns what changed since the last update, or null if nothing changed.
     *
     * Callers use this to avoid recomputing the (relatively expensive)
     * artboard→canvas transform on frames where only node bounds changed in the
     * tree: the transform only needs recomputing when `layoutChanged` is true.
     */
    AccessibilityOverlay.prototype.needsUpdate = function (tree) {
        var semanticChanged = tree.semanticVersion !== this.lastSemanticVersion;
        var nodeGeometryChanged = tree.geometryVersion !== this.lastGeometryVersion;
        var layoutChanged = this._geometryDirty || !this.transformContainer;
        if (!semanticChanged && !nodeGeometryChanged && !layoutChanged)
            return null;
        return { semanticChanged: semanticChanged, nodeGeometryChanged: nodeGeometryChanged, layoutChanged: layoutChanged };
    };
    /**
     * Update the overlay DOM to reflect the current state of the semantic tree.
     * Call once per frame after `applyDiff` when {@link needsUpdate} reports a
     * change, when layout/transform inputs are dirty, or when a fresh
     * `forwardMat` is supplied (even if the tree versions are unchanged).
     *
     * @param tree           The in-memory semantic tree model
     * @param forwardMat     Artboard→canvas-pixel transform from `computeAlignment`,
     *                       or null to reuse the existing CSS transform on the
     *                       transform container
     * @param dpr            Device pixel ratio used for the canvas backing store
     * @param artboardBounds The artboard's own bounding rectangle
     */
    AccessibilityOverlay.prototype.update = function (tree, forwardMat, dpr, artboardBounds, change) {
        var overlayChange = change !== null && change !== void 0 ? change : this.needsUpdate(tree);
        if (!overlayChange && forwardMat) {
            overlayChange = {
                semanticChanged: false,
                nodeGeometryChanged: false,
                layoutChanged: true,
            };
        }
        if (!overlayChange)
            return;
        this.performUpdate(tree, forwardMat, dpr, artboardBounds, overlayChange);
    };
    AccessibilityOverlay.prototype.performUpdate = function (tree, forwardMat, dpr, artboardBounds, change) {
        var _a;
        var semanticChanged = change.semanticChanged, nodeGeometryChanged = change.nodeGeometryChanged;
        // Per-node change sets only describe the most recent applyDiff. If more
        // than one semantic version elapsed since our last update (first build,
        // or a diff we never consumed), fall back to re-applying attributes on
        // every node rather than trusting an incomplete set.
        var reapplyAllAttributes = tree.semanticVersion - this.lastSemanticVersion > 1;
        this.lastSemanticVersion = tree.semanticVersion;
        this.lastGeometryVersion = tree.geometryVersion;
        this.isUpdating = true;
        this._artboardBounds = artboardBounds;
        // Container box + artboard transform only run when a fresh forwardMat was
        // supplied (layout/transform dirty). Node-only bounds updates reuse the
        // existing CSS transform and go through updateGeometryForChangedNodes.
        // Skipping syncContainerGeometry here on semantic-only frames avoids a
        // getBoundingClientRect() reflow on every animation frame. The throttled
        // scheduleReposition() path still keeps the container aligned when the page
        // layout shifts.
        if (forwardMat) {
            this.syncContainerGeometry();
            this.syncTransformContainer(forwardMat, dpr, artboardBounds);
            // Transform is now in sync with the latest layout.
            this._geometryDirty = false;
        }
        if (semanticChanged) {
            var rootEl = (_a = this.transformContainer) !== null && _a !== void 0 ? _a : this.container;
            var activeIds_1 = new Set();
            this.rebuildChildren(rootEl, tree.roots, tree, 0, // parentLeft in artboard space (transform container origin)
            0, // parentTop  in artboard space
            activeIds_1, reapplyAllAttributes);
            var staleIds_2 = [];
            this.elements.forEach(function (_el, id) {
                if (!activeIds_1.has(id))
                    staleIds_2.push(id);
            });
            for (var _i = 0, staleIds_1 = staleIds_2; _i < staleIds_1.length; _i++) {
                var id = staleIds_1[_i];
                var el = this.elements.get(id);
                if (el && el.parentNode)
                    el.parentNode.removeChild(el);
                this.elements.delete(id);
                var desc = this.descElements.get(id);
                if (desc && desc.parentNode)
                    desc.parentNode.removeChild(desc);
                this.descElements.delete(id);
            }
        }
        else if (nodeGeometryChanged) {
            this.updateGeometryForChangedNodes(tree);
        }
        // Text scaling needs layout reads; batch them into one pass after all
        // position/attribute writes so each frame forces at most one reflow.
        this.flushTextGeometry();
        this.isUpdating = false;
    };
    /** Remove the overlay from the DOM entirely. */
    AccessibilityOverlay.prototype.destroy = function () {
        var _a, _b, _c;
        if (this.repositionTimer !== null) {
            clearTimeout(this.repositionTimer);
            this.repositionTimer = null;
        }
        window.removeEventListener("resize", this._onWindowResize);
        (_a = this.canvasResizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.parentResizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
        (_c = this.positionObserver) === null || _c === void 0 ? void 0 : _c.disconnect();
        if (this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.elements.clear();
        this.descElements.clear();
        this.pendingTextGeometry.length = 0;
    };
    // ---- Tree → DOM reconciliation ----
    /**
     * Reconcile a parent DOM element's children with an ordered list of
     * semantic node IDs. Creates, updates, and reorders elements as needed.
     *
     * Node positions are expressed in artboard-space coordinates. The CSS
     * transform on the transform container maps artboard units to CSS pixels,
     * so no per-node matrix multiplication is required here.
     *
     * @param parentArtboardLeft  Absolute artboard minX of the parent node (0 for roots)
     * @param parentArtboardTop   Absolute artboard minY of the parent node (0 for roots)
     */
    AccessibilityOverlay.prototype.rebuildChildren = function (parentEl, childIds, tree, parentArtboardLeft, parentArtboardTop, activeIds, applyAllAttributes) {
        for (var i = 0; i < childIds.length; i++) {
            var nodeId = childIds[i];
            var nodeData = tree.nodeById(nodeId);
            if (!nodeData)
                continue;
            activeIds.add(nodeId);
            var el = this.elements.get(nodeId);
            var isNew = !el;
            if (!el) {
                el = this.createElement(nodeData);
                this.elements.set(nodeId, el);
            }
            // Attributes are only applied to new elements and nodes whose semantic
            // fields changed in the latest diff. Skipping redundant setAttribute
            // calls eliminates WebKit AX notifications that knock VoiceOver off its
            // current element.
            if (isNew || applyAllAttributes || tree.semanticChangedIds.has(nodeId)) {
                this.applyAttributes(el, nodeData);
            }
            this.applyPosition(el, nodeData, parentArtboardLeft, parentArtboardTop);
            // Only touch the DOM tree if the element isn't already in the correct
            // position. Moving a focused element can blur it and knock AT off the
            // current node.
            var currentChild = parentEl.children[i];
            if (currentChild !== el) {
                if (currentChild) {
                    parentEl.insertBefore(el, currentChild);
                }
                else {
                    parentEl.appendChild(el);
                }
            }
            // Reflect the runtime Focused state into DOM focus. Runs after insertion
            // so the element is attached, and skips elements that already hold focus.
            // The cheap trait/state flag checks gate the (per-node) DOM queries below,
            // so the activeElement/closest/contains walks only run for a node that is
            // actually focusable + focused — not for every node on every frame.
            if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(nodeData.traitFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Focusable) &&
                (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(nodeData.stateFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Focused)) {
                var active = document.activeElement;
                // While focus is inside one of our modal dialogs, don't pull it back
                // out to a background node.
                var focusedModal = active === null || active === void 0 ? void 0 : active.closest('[aria-modal="true"]');
                var trappedByModal = !!focusedModal &&
                    this.container.contains(focusedModal) &&
                    !focusedModal.contains(el);
                // Not while the proxy has focus (would steal the caret, drop the keyboard) nor onto
                // its aria-hidden stand-in.
                if (nodeId !== this.editingHostNodeId &&
                    active !== el &&
                    !trappedByModal &&
                    !this.isEditingHostFocused() &&
                    this.canMoveFocus()) {
                    // No scrollIntoView: this runs on semantic diffs and must not drag the page.
                    this.syncContainerBeforeFocus();
                    el.focus({ preventScroll: true });
                }
            }
            // Recurse into children with this node's absolute artboard position.
            if (nodeData.children.length > 0) {
                this.rebuildChildren(el, nodeData.children, tree, nodeData.minX, nodeData.minY, activeIds, applyAllAttributes);
            }
            // Focus a modal/alert dialog when it first appears (after children are
            // built so the focus target can be resolved from the subtree).
            if (isNew)
                this.autoFocusDialogOnAppear(el, nodeData, tree);
        }
    };
    /**
     * Reposition only the subtrees whose bounds changed in the latest diff.
     * Descendants are included because node CSS positions are parent-relative.
     */
    AccessibilityOverlay.prototype.updateGeometryForChangedNodes = function (tree) {
        var _a, _b;
        for (var _i = 0, _c = Array.from(tree.geometryChangedIds); _i < _c.length; _i++) {
            var nodeId = _c[_i];
            var nodeData = tree.nodeById(nodeId);
            if (!nodeData)
                continue;
            var parentLeft = 0;
            var parentTop = 0;
            var parentEl = (_a = this.transformContainer) !== null && _a !== void 0 ? _a : this.container;
            if (nodeData.parentId >= 0) {
                var parent_1 = tree.nodeById(nodeData.parentId);
                if (parent_1) {
                    parentLeft = parent_1.minX;
                    parentTop = parent_1.minY;
                    parentEl = (_b = this.elements.get(nodeData.parentId)) !== null && _b !== void 0 ? _b : parentEl;
                }
            }
            this.updateNodeGeometrySubtree(tree, nodeId, parentLeft, parentTop, parentEl);
        }
    };
    AccessibilityOverlay.prototype.updateNodeGeometrySubtree = function (tree, nodeId, parentArtboardLeft, parentArtboardTop, _parentEl) {
        var nodeData = tree.nodeById(nodeId);
        if (!nodeData)
            return;
        var el = this.elements.get(nodeId);
        if (!el)
            return;
        this.applyPosition(el, nodeData, parentArtboardLeft, parentArtboardTop);
        for (var _i = 0, _a = nodeData.children; _i < _a.length; _i++) {
            var childId = _a[_i];
            this.updateNodeGeometrySubtree(tree, childId, nodeData.minX, nodeData.minY, el);
        }
    };
    /**
     * Whether the overlay may move focus now. Following focus already inside this
     * instance is always allowed; pulling it in from the host page is gated behind
     * allowFocusInterrupt (from the Rive class).
     */
    AccessibilityOverlay.prototype.canMoveFocus = function () {
        var active = document.activeElement;
        var focusAlreadyInScope = active === this.canvas || this.container.contains(active);
        return focusAlreadyInScope || this.allowFocusInterrupt;
    };
    /**
     * Move focus into a newly appeared modal/alert dialog so screen readers
     * announce and read its content (web ATs don't auto-enter a freshly mounted
     * dialog). Skips when focus can't move (see canMoveFocus) or a descendant
     * already holds it. The dialog's aria-modal keeps focus trapped inside.
     */
    AccessibilityOverlay.prototype.autoFocusDialogOnAppear = function (el, node, tree) {
        var _a;
        if (!isModalDialogRole(node.role, node.stateFlags))
            return;
        if (!this.canMoveFocus())
            return;
        // A descendant already holds focus — don't override it.
        var active = document.activeElement;
        if (active && active !== el && el.contains(active))
            return;
        var target = (_a = this.routeDefaultFocusTarget(node, tree)) !== null && _a !== void 0 ? _a : el;
        if (!target.hasAttribute("tabindex"))
            target.setAttribute("tabindex", "-1");
        if (document.activeElement !== target)
            target.focus({ preventScroll: true });
    };
    /**
     * Resolve the element assistive technologies (AT) should focus on appearance. Walks the subtree
     * depth-first and returns the first focusable node's host element, else the
     * inner <span> of the first labeled leaf. Container and unlabeled nodes are
     * descended into but never focused. Returns null if nothing qualifies.
     */
    AccessibilityOverlay.prototype.routeDefaultFocusTarget = function (node, tree) {
        var _a;
        for (var _i = 0, _b = node.children; _i < _b.length; _i++) {
            var childId = _b[_i];
            var child = tree.nodeById(childId);
            if (!child)
                continue;
            var childEl = this.elements.get(childId);
            // Focusable node → its host element (even if it has children).
            if (childEl && isFocusableNode(child))
                return childEl;
            // Container or unlabeled node → descend without focusing it.
            if (child.children.length > 0 || !child.label) {
                var nested = this.routeDefaultFocusTarget(child, tree);
                if (nested)
                    return nested;
                continue;
            }
            // Labeled leaf → its inner label span.
            if (childEl) {
                return (_a = childEl.querySelector(":scope > span")) !== null && _a !== void 0 ? _a : childEl;
            }
        }
        return null;
    };
    Object.defineProperty(AccessibilityOverlay.prototype, "nodeIdPrefix", {
        // ---- Element creation ----
        /** Shared `id` prefix for all semantic node elements of this instance. */
        get: function () {
            return "rive-".concat(this.instanceId, "-sem-");
        },
        enumerable: false,
        configurable: true
    });
    /** Recover the semantic node ID from an overlay element, or null. */
    AccessibilityOverlay.prototype.nodeIdFromElement = function (el) {
        if (!el.id.startsWith(this.nodeIdPrefix))
            return null;
        var raw = el.id.slice(this.nodeIdPrefix.length);
        // Guard the empty string explicitly: Number("") is 0, not NaN.
        if (!raw)
            return null;
        var id = Number(raw);
        return Number.isNaN(id) ? null : id;
    };
    AccessibilityOverlay.prototype.createElement = function (node) {
        var tag = tagForRole(node.role);
        var el = document.createElement(tag);
        el.id = "".concat(this.nodeIdPrefix).concat(node.id);
        el.style.cssText = BASE_NODE_STYLE;
        if (node.role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.text) {
            // The positioned outer div is the AX element
            // VoiceOver uses for its highlight box; an inner <span> carries the text
            // without position:absolute (which would strip the span from VoiceOver's
            // bounds calculation).
            var textSpan = document.createElement("span");
            textSpan.style.cssText = SPAN_EXP;
            el.appendChild(textSpan);
        }
        this.attachActionHandlers(el, node);
        return el;
    };
    // ---- Action handlers ----
    /**
     * Wire arrow-key roving focus for a group member (tab, radio). Arrow keys
     * move focus to the next/previous member (wrapping), optionally Home/End jump
     * to first/last, and the newly focused member receives a tap action.
     */
    AccessibilityOverlay.prototype.attachRovingNav = function (el, opts) {
        var _this = this;
        el.addEventListener("keydown", function (e) {
            var target = null;
            if (e.key === "ArrowRight" || e.key === "ArrowDown")
                target = "next";
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
                target = "prev";
            else if (opts.includeHomeEnd && e.key === "Home")
                target = "first";
            else if (opts.includeHomeEnd && e.key === "End")
                target = "last";
            if (!target)
                return;
            (0,_claimedKeyEvents__WEBPACK_IMPORTED_MODULE_0__.claimKeyEvent)(e);
            var members = opts.members();
            var idx = members.indexOf(el);
            if (idx < 0)
                return;
            var n = members.length;
            var next = target === "next" ? members[(idx + 1) % n]
                : target === "prev" ? members[(idx - 1 + n) % n]
                    : target === "first" ? members[0]
                        : members[n - 1];
            if (next && next !== el) {
                _this.focusElementInPlace(next);
                var nextId = _this.nodeIdFromElement(next);
                if (nextId !== null)
                    _this.fireAction(nextId, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticActionType.tap);
            }
        });
    };
    AccessibilityOverlay.prototype.attachActionHandlers = function (el, node) {
        var _this = this;
        var role = node.role;
        var nodeId = node.id;
        if (isClickableRole(role)) {
            el.addEventListener("click", function () {
                _this.fireAction(nodeId, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticActionType.tap);
            });
            // Links activate on Enter only (Space scrolls the page per browser
            // convention). All other clickable roles accept both Enter and Space.
            var activationKeys_1 = role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.link ? ["Enter"] : ["Enter", " "];
            el.addEventListener("keydown", function (e) {
                if (activationKeys_1.includes(e.key)) {
                    (0,_claimedKeyEvents__WEBPACK_IMPORTED_MODULE_0__.claimKeyEvent)(e);
                    _this.fireAction(nodeId, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticActionType.tap);
                }
            });
        }
        if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.slider) {
            el.addEventListener("keydown", function (e) {
                if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                    (0,_claimedKeyEvents__WEBPACK_IMPORTED_MODULE_0__.claimKeyEvent)(e);
                    _this.fireAction(nodeId, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticActionType.increase);
                }
                else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                    (0,_claimedKeyEvents__WEBPACK_IMPORTED_MODULE_0__.claimKeyEvent)(e);
                    _this.fireAction(nodeId, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticActionType.decrease);
                }
            });
        }
        if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.tab) {
            this.attachRovingNav(el, {
                includeHomeEnd: true,
                members: function () {
                    var parent = el.parentElement;
                    if (!parent)
                        return [];
                    return Array.from(parent.children).filter(function (c) {
                        return c instanceof HTMLElement && c.getAttribute("role") === "tab";
                    });
                },
            });
        }
        if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.radioButton) {
            this.attachRovingNav(el, {
                includeHomeEnd: false,
                members: function () {
                    var _a;
                    var group = (_a = el.closest('[role="radiogroup"]')) !== null && _a !== void 0 ? _a : el.parentElement;
                    if (!group)
                        return [];
                    return Array.from(group.querySelectorAll('[role="radio"]'));
                },
            });
        }
        // Focus handler for nodes with the Focusable trait. When AT focuses an
        // element, notify the C++ runtime so it can update internal focus state
        // (visual focus rings, etc.). Gated on Focusable trait
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(node.traitFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Focusable)) {
            el.addEventListener("focus", function () {
                _this.requestFocus(nodeId);
            });
        }
    };
    // ---- Attribute application ----
    AccessibilityOverlay.prototype.isAriaHidden = function (node) {
        var role = node.role;
        var flags = node.stateFlags;
        // Hide from AT when explicitly hidden, or when an image has no accessible
        // name — a nameless role="img" is a WCAG 1.1.1 violation; treat it as
        // decorative instead.
        var isDecorativeImage = role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.image && !node.label;
        // The <input> proxy is the accessible element for the node it stands in for.
        var isEditingHostStandIn = node.id === this.editingHostNodeId;
        return ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Hidden) ||
            // Obscured text fields stay reachable (value withheld, like a native password input).
            ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Obscured) && role !== _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.textField) ||
            isDecorativeImage ||
            isEditingHostStandIn);
    };
    AccessibilityOverlay.prototype.applyAttributes = function (el, node) {
        var _a, _b, _c;
        this.appliedNodes.set(el, node);
        var role = node.role;
        var flags = node.stateFlags;
        var traits = node.traitFlags;
        // Role
        var ariaRole = ariaRoleForSemantic(role);
        if (ariaRole) {
            setAttr(el, "role", ariaRole);
        }
        else {
            removeAttr(el, "role");
        }
        // Links: a bare <a> with no href has no link semantics, so set the role
        // explicitly (ariaRoleForSemantic returns null for link → native <a>).
        if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.link) {
            setAttr(el, "role", "link");
        }
        // Tabindex — keep the screen-reader overlay out of the browser's sequential
        // Tab order. Interactive/focusable nodes remain programmatically focusable
        // so AT/runtime focus sync can still target them when needed. List items are
        // included because Mobile Safari won't iterate them otherwise.
        if (isInteractiveRole(role) ||
            (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(traits, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Focusable) ||
            role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.listItem) {
            setAttr(el, "tabindex", "-1");
        }
        else {
            removeAttr(el, "tabindex");
        }
        // Label / value / hint
        if (node.label) {
            setAttr(el, "aria-label", node.label);
        }
        else {
            removeAttr(el, "aria-label");
        }
        if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.slider) {
            if (node.value) {
                // aria-valuenow must be numeric; keep the display string (e.g. "75%")
                // in aria-valuetext only.
                var numericValue = parseFloat(node.value);
                if (Number.isFinite(numericValue)) {
                    setAttr(el, "aria-valuenow", String(numericValue));
                }
                else {
                    removeAttr(el, "aria-valuenow");
                }
                setAttr(el, "aria-valuetext", node.value);
            }
            else {
                removeAttr(el, "aria-valuenow");
                removeAttr(el, "aria-valuetext");
            }
            // TODO: aria-valuemin / aria-valuemax are required by ARIA.
            // Defaulting to horizontal; vertical sliders need orientation data from C++.
            setAttr(el, "aria-orientation", "horizontal");
            setBoolAttr(el, "aria-readonly", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.ReadOnly));
        }
        else {
            removeAttr(el, "aria-valuenow");
            removeAttr(el, "aria-valuetext");
            removeAttr(el, "aria-orientation");
            removeAttr(el, "aria-readonly");
        }
        if (node.hint) {
            var descId = "rive-".concat(this.instanceId, "-desc-").concat(node.id);
            var descEl = this.descElements.get(node.id);
            if (!descEl) {
                descEl = document.createElement("span");
                descEl.id = descId;
                descEl.style.cssText = DESC_SPAN_STYLE;
                this.container.appendChild(descEl);
                this.descElements.set(node.id, descEl);
            }
            if (descEl.textContent !== node.hint)
                descEl.textContent = node.hint;
            setAttr(el, "aria-describedby", descId);
        }
        else {
            removeAttr(el, "aria-describedby");
            var staleDesc = this.descElements.get(node.id);
            if (staleDesc) {
                if (staleDesc.parentNode)
                    staleDesc.parentNode.removeChild(staleDesc);
                this.descElements.delete(node.id);
            }
        }
        // Text nodes: use textContent rather than aria-label so screen readers
        // announce the text in virtual/browse mode (aria-label on a bare <span>
        // with no widget role is ignored by some AT in document browse mode).
        if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.text) {
            var textSpan = (_a = el.querySelector(":scope > span")) !== null && _a !== void 0 ? _a : el;
            var text = (_b = node.label) !== null && _b !== void 0 ? _b : "";
            if (textSpan.textContent !== text)
                textSpan.textContent = text;
            removeAttr(el, "aria-label");
            if (node.headingLevel > 0) {
                setAttr(el, "role", "heading");
                setAttr(el, "aria-level", String(node.headingLevel));
            }
            else {
                // The generic role branch above already cleared role="heading";
                // aria-level must go with it when a heading reverts to plain text.
                removeAttr(el, "aria-level");
            }
        }
        // ---- Trait-gated states ----
        // Only set the ARIA property when the trait is present. When the trait
        // is absent, remove the attribute so AT sees "not applicable" rather
        // than "false".
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(traits, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Expandable) && ARIA_EXPANDED_ROLES.has(role)) {
            setBoolAttr(el, "aria-expanded", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Expanded));
        }
        else {
            removeAttr(el, "aria-expanded");
        }
        // aria-selected is required on ALL tabs per ARIA spec regardless of trait;
        // for other roles it is trait-gated and guarded to ARIA_SELECTED_ROLES.
        if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.tab) {
            setBoolAttr(el, "aria-selected", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Selected));
        }
        else if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(traits, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Selectable) && ARIA_SELECTED_ROLES.has(role)) {
            setBoolAttr(el, "aria-selected", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Selected));
        }
        else {
            removeAttr(el, "aria-selected");
        }
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(traits, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Checkable) && ARIA_CHECKED_ROLES.has(role)) {
            // Check state is a tri-state field, but not every checkable role
            // accepts all three values — see ARIA_MIXED_ROLES.
            var checkState = (0,_types__WEBPACK_IMPORTED_MODULE_2__.checkStateOf)(flags);
            if (checkState === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticCheckState.Mixed &&
                ARIA_MIXED_ROLES.has(role)) {
                setAttr(el, "aria-checked", "mixed");
            }
            else {
                setBoolAttr(el, "aria-checked", checkState === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticCheckState.Checked);
            }
        }
        else {
            removeAttr(el, "aria-checked");
        }
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(traits, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Toggleable)) {
            if (ARIA_PRESSED_ROLES.has(role)) {
                setBoolAttr(el, "aria-pressed", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Toggled));
            }
            else {
                removeAttr(el, "aria-pressed");
            }
            // switch uses aria-checked (not aria-pressed) for its on/off state.
            if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.switchControl) {
                setBoolAttr(el, "aria-checked", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Toggled));
            }
        }
        else {
            removeAttr(el, "aria-pressed");
        }
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(traits, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Requirable) && ARIA_REQUIRED_ROLES.has(role)) {
            setBoolAttr(el, "aria-required", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Required));
        }
        else {
            removeAttr(el, "aria-required");
        }
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(traits, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Enablable)) {
            setBoolAttr(el, "aria-disabled", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Disabled));
        }
        else {
            removeAttr(el, "aria-disabled");
        }
        // ---- Non-trait states ----
        if (this.isAriaHidden(node)) {
            setAttr(el, "aria-hidden", "true");
        }
        else {
            removeAttr(el, "aria-hidden");
        }
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.LiveRegion)) {
            setAttr(el, "aria-live", "polite");
        }
        else {
            removeAttr(el, "aria-live");
        }
        // textField-specific
        // TODO: Details here may change once we implement text inputs
        if (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.textField) {
            setBoolAttr(el, "aria-readonly", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.ReadOnly));
            setBoolAttr(el, "aria-multiline", (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Multiline));
            // Surface the current field value as DOM text so screen readers can
            // announce it. Only safe when the node has no semantic children —
            // setting textContent would remove any child elements from the DOM.
            if (node.children.length === 0) {
                var value = (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Obscured) ? "" : ((_c = node.value) !== null && _c !== void 0 ? _c : "");
                if (el.textContent !== value)
                    el.textContent = value;
            }
            else {
                // A value rendered earlier (before the node had children) must not linger,
                // least of all once the field turns Obscured.
                for (var _i = 0, _d = Array.from(el.childNodes); _i < _d.length; _i++) {
                    var child = _d[_i];
                    if (child.nodeType === Node.TEXT_NODE)
                        child.remove();
                }
            }
        }
        else {
            removeAttr(el, "aria-multiline");
        }
        // alertDialog is always modal per WAI-ARIA; a plain dialog only when the Modal state flag is set.
        if (isModalDialogRole(role, flags)) {
            setAttr(el, "aria-modal", "true");
        }
        else {
            removeAttr(el, "aria-modal");
        }
    };
    // ---- Positioning ----
    /**
     * Positions an element in artboard-space coordinates relative to its parent.
     *
     * Node bounds stay in raw artboard units — the CSS `transform: matrix(...)`
     * on the transform container maps artboard units to CSS pixels in one GPU
     * pass. No per-node forwardMat multiplication or DPR division needed here.
     *
     * Round to whole artboard units before comparing to avoid triggering AX
     * layout notifications from sub-unit floating-point animation jitter.
     */
    AccessibilityOverlay.prototype.applyPosition = function (el, node, parentArtboardLeft, parentArtboardTop) {
        // Clamp each node's rect to the artboard viewport before computing CSS.
        // Without this, nodes whose artboard bounds exceed the artboard (e.g. a
        // scroll list container whose height is the full content, not the viewport)
        // produce CSS heights that overflow the transform container. WebKit then
        // unions all descendant AX rects and extends the container's AX origin
        // above the canvas regardless of overflow:hidden on ancestors.
        var ab = this._artboardBounds;
        var clampedMinX = Math.max(node.minX, ab.minX);
        var clampedMinY = Math.max(node.minY, ab.minY);
        var clampedMaxX = Math.min(node.maxX, ab.maxX);
        var clampedMaxY = Math.min(node.maxY, ab.maxY);
        var elLeft = clampedMinX - parentArtboardLeft;
        var elTop = clampedMinY - parentArtboardTop;
        var elWidth = Math.max(0, clampedMaxX - clampedMinX);
        var elHeight = Math.max(0, clampedMaxY - clampedMinY);
        var tx = Math.round(elLeft);
        var ty = Math.round(elTop);
        var pxWidth = Math.round(elWidth) + "px";
        var pxHeight = Math.round(elHeight) + "px";
        // Use left/top layout properties for positioning. VoiceOver reliably
        // handles layout position + a single ancestor CSS transform (the transform
        // container). Chaining CSS transforms across multiple stacking contexts
        // (transform container → node identity → item translate) caused VoiceOver
        // to compute the correct SIZE but wrong POSITION. Artboard clamping above
        // guarantees tx/ty are always ≥ 0, so the negative-top overflow problem
        // that originally prompted the switch to CSS transforms no longer applies.
        var pxLeft = tx + "px";
        var pxTop = ty + "px";
        if (el.style.left !== pxLeft)
            el.style.left = pxLeft;
        if (el.style.top !== pxTop)
            el.style.top = pxTop;
        if (el.style.width !== pxWidth)
            el.style.width = pxWidth;
        if (el.style.height !== pxHeight)
            el.style.height = pxHeight;
        // Clear any CSS transform from a previous render pass.
        if (el.style.transform)
            el.style.transform = "";
        if (node.role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.text) {
            this.pendingTextGeometry.push(el);
        }
    };
    /**
     * Scale each queued text span to fit its layout box, batched so a frame
     * pays at most one synchronous layout: all measurement-reset writes first,
     * then all rect reads, then all transform writes. Interleaving
     * write→read→write per node would force a reflow per text node instead.
     *
     * Nodes whose box size and text are unchanged since the last pass are
     * skipped entirely (their existing transform is still correct — the scale
     * is a ratio of two rects, so ancestor transform changes cancel out).
     */
    AccessibilityOverlay.prototype.flushTextGeometry = function () {
        var _a;
        if (this.pendingTextGeometry.length === 0)
            return;
        // Phase 1 — writes: reset spans to their natural size for measurement.
        // The previous pass's scale must be cleared, or the rect reads below
        // would measure the scaled span and compound the correction.
        var toMeasure = [];
        for (var _i = 0, _b = this.pendingTextGeometry; _i < _b.length; _i++) {
            var host = _b[_i];
            var span = (_a = host.querySelector(":scope > span")) !== null && _a !== void 0 ? _a : host;
            var key = "".concat(host.style.width, "|").concat(host.style.height, "|").concat(span.textContent);
            if (this.textGeometryKeys.get(host) === key)
                continue;
            span.style.width = "auto";
            span.style.height = "auto";
            span.style.transformOrigin = "0 0";
            span.style.transform = "";
            toMeasure.push({ host: host, span: span, key: key });
        }
        this.pendingTextGeometry.length = 0;
        // Phase 2 — reads: one layout pass covers every rect measurement.
        var transforms = toMeasure.map(function (_a) {
            var host = _a.host, span = _a.span;
            var parentRect = host.getBoundingClientRect();
            var natural = span.getBoundingClientRect();
            if (natural.width > 0 && natural.height > 0) {
                var scaleX = parentRect.width / natural.width;
                var scaleY = parentRect.height / natural.height;
                return "scale(".concat(scaleX, ", ").concat(scaleY, ")");
            }
            return "none";
        });
        // Phase 3 — writes: apply all transforms.
        for (var i = 0; i < toMeasure.length; i++) {
            var _c = toMeasure[i], host = _c.host, span = _c.span, key = _c.key;
            span.style.transform = transforms[i];
            this.textGeometryKeys.set(host, key);
        }
    };
    // ---- Transform container ----
    /**
     * Creates (on first call) and updates the artboard-space transform container.
     *
     * The container is sized to the artboard dimensions and carries a CSS
     * `transform: matrix(...)` that maps artboard coordinates to the canvas's CSS box
     * (forwardMat in backing-store pixels, scaled by CSS size / backing-store size). All semantic
     * node elements are children of this container and use raw artboard
     * coordinates as their CSS `left/top/width/height`, so the CSS compositor
     * applies the artboard→screen mapping in one pass.
     */
    AccessibilityOverlay.prototype.syncTransformContainer = function (forwardMat, dpr, artboardBounds) {
        if (!this.transformContainer) {
            var tc = document.createElement("div");
            tc.style.cssText = [
                "position:absolute",
                "top:0",
                "left:0",
                // overflow:visible — artboard viewport clamping is done per-node in
                // applyPosition
                "overflow:visible",
                "pointer-events:none",
                "transform-origin:0 0",
            ].join(";");
            this.container.appendChild(tc);
            this.transformContainer = tc;
        }
        var w = artboardBounds.maxX - artboardBounds.minX;
        var h = artboardBounds.maxY - artboardBounds.minY;
        this.transformContainer.style.width = Math.round(w) + "px";
        this.transformContainer.style.height = Math.round(h) + "px";
        // Backing-store pixels → CSS pixels. Measured rather than 1/dpr: a canvas can be
        // stretched by CSS, or have a stale backing store after a resize, and the drawn
        // content follows the CSS box either way. Equal to 1/dpr when they match.
        var cssWidth = this.lastCanvasPositioning.width;
        var cssHeight = this.lastCanvasPositioning.height;
        var fallback = 1 / (dpr || 1);
        var sx = this.canvas.width > 0 && cssWidth > 0 ? cssWidth / this.canvas.width : fallback;
        var sy = this.canvas.height > 0 && cssHeight > 0 ? cssHeight / this.canvas.height : fallback;
        var a = forwardMat.xx * sx;
        var b = forwardMat.xy * sy;
        var c = forwardMat.yx * sx;
        var d = forwardMat.yy * sy;
        var tx = forwardMat.tx * sx;
        var ty = forwardMat.ty * sy;
        this.transformContainer.style.transform =
            "matrix(".concat(a, ",").concat(b, ",").concat(c, ",").concat(d, ",").concat(tx, ",").concat(ty, ")");
    };
    return AccessibilityOverlay;
}());

// ---------------------------------------------------------------------------
// Static helpers (module-private)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ARIA attribute eligibility — role sets
//
// Each set lists the Rive roles for which a given ARIA attribute is valid per
// WAI-ARIA 1.2 ("Used in roles" + "Inherits into roles"). The trait-gated
// blocks in applyAttributes check these before setting an attribute so that
// C++ nodes with unexpected trait combinations never produce invalid markup.
//
// To add a new role: append it to the relevant set(s) here — no other changes
// needed in applyAttributes.
// ---------------------------------------------------------------------------
/** aria-expanded: button, link, checkbox, switch (inherits button), tab. */
var ARIA_EXPANDED_ROLES = new Set([
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.button,
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.link,
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.checkbox,
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.switchControl,
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.tab,
]);
/**
 * aria-selected: tab is the only role in our current set that natively
 * supports it. Tab is also handled by an explicit unconditional branch in
 * applyAttributes (ARIA requires it there regardless of Selectable trait), but
 * the set still lists it so the constraint is visible in one place.
 */
var ARIA_SELECTED_ROLES = new Set([
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.tab,
]);
/** aria-checked: checkbox, radio, switch. */
var ARIA_CHECKED_ROLES = new Set([
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.checkbox,
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.radioButton,
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.switchControl,
]);
/**
 * aria-checked="mixed": checkbox only. ARIA defines checkbox as three-valued
 * (true/false/mixed) but radio and switch as two-valued (true/false), so an
 * indeterminate check state degrades to false for those roles rather than
 * emitting a value they do not support.
 */
var ARIA_MIXED_ROLES = new Set([
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.checkbox,
]);
/**
 * aria-pressed: button only. switch is a button subclass in ARIA but uses
 * aria-checked (not aria-pressed) for its on/off state — it is intentionally
 * excluded here and handled separately in the Toggleable block.
 */
var ARIA_PRESSED_ROLES = new Set([
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.button,
]);
/** aria-required: checkbox, textbox, radiogroup. */
var ARIA_REQUIRED_ROLES = new Set([
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.checkbox,
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.textField,
    _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.radioGroup,
]);
// ---------------------------------------------------------------------------
/** Style for visually-hidden description spans used with aria-describedby. */
var DESC_SPAN_STYLE = [
    "position:absolute",
    "width:1px",
    "height:1px",
    "overflow:hidden",
    "pointer-events:none",
    "left:-9999px",
].join(";");
var BASE_NODE_STYLE = [
    "position:absolute",
    "pointer-events:none",
    "box-sizing:border-box",
    "overflow:visible",
    "margin:0",
    "padding:0",
    "transform-origin: 0px 0px 0px",
    "border:none",
    "background:transparent",
    "color:transparent",
    // "list-style:none",
].join(";");
var SPAN_EXP = [
    "display:inline-block",
    "white-space:nowrap",
    "pointer-events:none",
].join(";");
/**
 * Attribute writers that skip same-value mutations. Even a no-op setAttribute
 * fires a mutation record, and whether AX layers dedupe those is
 * browser-specific — skipping the write is the only browser-proof guard.
 */
function setAttr(el, attr, value) {
    if (el.getAttribute(attr) !== value)
        el.setAttribute(attr, value);
}
function removeAttr(el, attr) {
    if (el.hasAttribute(attr))
        el.removeAttribute(attr);
}
function setBoolAttr(el, attr, value) {
    setAttr(el, attr, value ? "true" : "false");
}
/** Roles that receive click/Enter/Space action handlers. */
function isClickableRole(role) {
    switch (role) {
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.button:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.link:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.checkbox:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.switchControl:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.tab:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.radioButton:
            return true;
        default:
            return false;
    }
}
/** Roles that receive tabindex="-1" for programmatic/AT focus (not Tab order). */
function isInteractiveRole(role) {
    switch (role) {
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.button:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.link:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.checkbox:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.switchControl:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.slider:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.tab:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.radioButton:
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.textField:
            return true;
        default:
            return false;
    }
}
/**
 * A modal/alert dialog: alertDialog is always modal per WAI-ARIA, a plain
 * dialog only when the Modal state flag is set.
 */
function isModalDialogRole(role, flags) {
    return (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.alertDialog ||
        (role === _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.dialog && (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasState)(flags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticState.Modal)));
}
/** Whether a node can receive focus: an interactive role or the Focusable trait. */
function isFocusableNode(node) {
    return (isInteractiveRole(node.role) ||
        (0,_types__WEBPACK_IMPORTED_MODULE_2__.hasTrait)(node.traitFlags, _types__WEBPACK_IMPORTED_MODULE_2__.SemanticTrait.Focusable));
}
/**
 * Choose an HTML tag for a given role. Prefer native semantic elements
 * where they exist — screen readers treat them more reliably than
 * generic elements with ARIA role overrides.
 */
function tagForRole(role) {
    switch (role) {
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.link:
            return "a";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.text:
            // The outer div is the positioned AX element VoiceOver measures for its
            // highlight box. The text itself lives in a child <span> (see createElement).
            return "div";
        default:
            return "div";
    }
}
/**
 * Maps a Rive SemanticRole to an ARIA `role` attribute value.
 * Returns null for roles that don't need an explicit role attribute here
 * (e.g. text nodes use an outer div + inner span with textContent; heading
 * role is applied separately when headingLevel > 0).
 */
function ariaRoleForSemantic(role) {
    switch (role) {
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.none:
            // TODO: Role "none" removes the node from the accessibility tree. For now, setting to Group, but maybe we want to switch to "none"
            // or "presentation".
            return "group";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.button:
            return "button";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.link:
            return null; // native <a>
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.checkbox:
            return "checkbox";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.switchControl:
            return "switch";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.slider:
            return "slider";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.textField:
            return "textbox";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.image:
            return "img";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.group:
            return "group";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.list:
            return "list";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.listItem:
            return "listitem";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.tab:
            return "tab";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.tabList:
            return "tablist";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.dialog:
            return "dialog";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.alertDialog:
            return "alertdialog";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.radioGroup:
            return "radiogroup";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.radioButton:
            return "radio";
        case _types__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.text:
            // Text nodes use <span>; heading role is applied separately
            // when headingLevel > 0.
            return null;
        default:
            return null;
    }
}


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   claimKeyEvent: () => (/* binding */ claimKeyEvent),
/* harmony export */   isKeyEventClaimed: () => (/* binding */ isKeyEventClaimed)
/* harmony export */ });
var claimed = new WeakSet();
/**
 * Marks a key event as handled by a semantic overlay widget (and prevents its
 * default), so the Rive keyboard handler leaves it alone. A plain
 * `defaultPrevented` check can't tell these apart from host-page handlers.
 */
function claimKeyEvent(event) {
    event.preventDefault();
    claimed.add(event);
}
function isKeyEventClaimed(event) {
    return claimed.has(event);
}


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canvasOffset: () => (/* binding */ canvasOffset)
/* harmony export */ });
/**
 * Canvas offset within its offsetParent, minus the scroll of ancestors in between (they
 * move the canvas, not absolutely positioned siblings).
 */
function canvasOffset(canvas) {
    var top = canvas.offsetTop;
    var left = canvas.offsetLeft;
    var offsetParent = canvas.offsetParent;
    if (!offsetParent)
        return { top: top, left: left };
    for (var el = canvas.parentElement; el && el !== offsetParent; el = el.parentElement) {
        top -= el.scrollTop;
        left -= el.scrollLeft;
    }
    return { top: top, left: left };
}


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudioAssetWrapper: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.AudioAssetWrapper),
/* harmony export */   AudioWrapper: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.AudioWrapper),
/* harmony export */   BLANK_URL: () => (/* reexport safe */ _sanitizeUrl__WEBPACK_IMPORTED_MODULE_3__.BLANK_URL),
/* harmony export */   CustomFileAssetLoaderWrapper: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.CustomFileAssetLoaderWrapper),
/* harmony export */   FileAssetWrapper: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.FileAssetWrapper),
/* harmony export */   FileFinalizer: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.FileFinalizer),
/* harmony export */   FocusSessionState: () => (/* reexport safe */ _registerKeyboardInteractions__WEBPACK_IMPORTED_MODULE_1__.FocusSessionState),
/* harmony export */   FontAssetWrapper: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.FontAssetWrapper),
/* harmony export */   FontWrapper: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.FontWrapper),
/* harmony export */   GamepadInteractions: () => (/* reexport safe */ _gamepadInteractions__WEBPACK_IMPORTED_MODULE_2__.GamepadInteractions),
/* harmony export */   ImageAssetWrapper: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.ImageAssetWrapper),
/* harmony export */   ImageWrapper: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.ImageWrapper),
/* harmony export */   KeyboardInteractions: () => (/* reexport safe */ _registerKeyboardInteractions__WEBPACK_IMPORTED_MODULE_1__.KeyboardInteractions),
/* harmony export */   ReplayPacer: () => (/* reexport safe */ _replayPacer__WEBPACK_IMPORTED_MODULE_6__.ReplayPacer),
/* harmony export */   RiveFont: () => (/* reexport safe */ _riveFont__WEBPACK_IMPORTED_MODULE_5__.RiveFont),
/* harmony export */   createFinalization: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.createFinalization),
/* harmony export */   finalizationRegistry: () => (/* reexport safe */ _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__.finalizationRegistry),
/* harmony export */   registerTouchInteractions: () => (/* reexport safe */ _registerTouchInteractions__WEBPACK_IMPORTED_MODULE_0__.registerTouchInteractions),
/* harmony export */   sanitizeUrl: () => (/* reexport safe */ _sanitizeUrl__WEBPACK_IMPORTED_MODULE_3__.sanitizeUrl)
/* harmony export */ });
/* harmony import */ var _registerTouchInteractions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _registerKeyboardInteractions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _gamepadInteractions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _sanitizeUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _finalizationRegistry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _riveFont__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _replayPacer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);









/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerTouchInteractions: () => (/* binding */ registerTouchInteractions)
/* harmony export */ });
/* harmony import */ var _wheelMomentum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
var _this = undefined;

// A detented wheel reports lines; the runtime wants pixels.
var PIXELS_PER_LINE = 16;
// ScrollPhase.update and ScrollPhase.momentum. The DOM reports no gesture
// phase, so the runtime closes the gesture once it goes quiet.
var SCROLL_PHASE_UPDATE = 1;
var SCROLL_PHASE_MOMENTUM = 3;
/**
 * Touch state per canvas. It outlives a single registration, because Rive
 * re-registers the listeners (on play and pause) while a finger can still be
 * down.
 */
var touchStateByCanvas = new WeakMap();
/**
 * Extracts ClientCoordinates from a TouchList, respecting multi-touch vs.
 * single-touch mode. In single-touch mode, only the touch matching
 * primaryTouchId is returned (or the first touch when primaryTouchId is null).
 */
var getTouchCoordinates = function (changedTouches, enableMultiTouch, primaryTouchId) {
    var _a;
    var coordinates = [];
    if (enableMultiTouch) {
        for (var i = 0; i < changedTouches.length; i++) {
            var touch = changedTouches[i];
            coordinates.push({
                clientX: touch.clientX,
                clientY: touch.clientY,
                identifier: touch.identifier,
            });
        }
    }
    else {
        // In "single-touch mode", only track the primary finger identified at touchstart.
        // Search changedTouches for the touch matching the recorded primary touch identifier, or (on initial touchstart)
        // take the first available touch identifier.
        var primaryTouch = primaryTouchId !== null
            ? (_a = Array.from(changedTouches).find(function (t) { return t.identifier === primaryTouchId; })) !== null && _a !== void 0 ? _a : null
            : changedTouches[0];
        if (primaryTouch) {
            coordinates.push({
                clientX: primaryTouch.clientX,
                clientY: primaryTouch.clientY,
                identifier: primaryTouch.identifier,
            });
        }
    }
    return coordinates;
};
/**
 * Returns the clientX and clientY properties from touch or mouse events. Also
 * calls preventDefault() on the event if it is a touchstart or touchmove to prevent
 * scrolling the page on mobile devices
 * @param event - Either a TouchEvent or a MouseEvent
 * @param isTouchScrollEnabled - Whether touch scrolling is enabled
 * @param enableMultiTouch - Whether to process multiple simultaneous touches
 * @param primaryTouchId - When working with single touches, only process the touch
 *   with this identifier. Pass null to accept any touch (used during touchstart to
 *   capture the first finger down).
 * @returns - Coordinates of the clientX and clientY properties from the touch/mouse event
 */
var getClientCoordinates = function (event, isTouchScrollEnabled, enableMultiTouch, primaryTouchId) {
    var _a;
    var touchEvent = event;
    if ((_a = touchEvent.changedTouches) === null || _a === void 0 ? void 0 : _a.length) {
        // This flag, if false, prevents touch events on the canvas default behavior
        // which may prevent scrolling if a drag motion on the canvas is performed
        if (!isTouchScrollEnabled && ["touchstart", "touchmove"].includes(event.type)) {
            event.preventDefault();
        }
        return getTouchCoordinates(touchEvent.changedTouches, enableMultiTouch, primaryTouchId);
    }
    return [
        {
            clientX: event.clientX,
            clientY: event.clientY,
            identifier: 0,
        },
    ];
};
/**
 * Registers mouse move/up/down and wheel callback handlers on the canvas to send meaningful
 * coordinates to the state machine pointer move/up/down/scroll functions based on cursor
 * interaction
 */
var registerTouchInteractions = function (_a) {
    var _b;
    var canvas = _a.canvas, artboard = _a.artboard, _c = _a.stateMachines, stateMachines = _c === void 0 ? [] : _c, renderer = _a.renderer, rive = _a.rive, fit = _a.fit, alignment = _a.alignment, _d = _a.isTouchScrollEnabled, isTouchScrollEnabled = _d === void 0 ? false : _d, _e = _a.dispatchPointerExit, dispatchPointerExit = _e === void 0 ? true : _e, _f = _a.enableMultiTouch, enableMultiTouch = _f === void 0 ? false : _f, _g = _a.layoutScaleFactor, layoutScaleFactor = _g === void 0 ? 1.0 : _g, advanceAndDrain = _a.advanceAndDrain, summonKeyboard = _a.summonKeyboard, isTextProxyFocused = _a.isTextProxyFocused;
    if (!canvas ||
        !stateMachines.length ||
        !renderer ||
        !rive ||
        !artboard ||
        typeof window === "undefined") {
        return null;
    }
    // A gesture latched before the previous listeners came down (a pause, say)
    // never reached its idle timeout, and would take the next wheel wherever
    // it lands. These instances are live here; at teardown they may not be.
    for (var _i = 0, stateMachines_1 = stateMachines; _i < stateMachines_1.length; _i++) {
        var stateMachine = stateMachines_1[_i];
        stateMachine.cancelScroll();
    }
    /**
     * After a touchend event, some browsers may fire synthetic mouse events
     * (mouseover, mousedown, mousemove, mouseup) if the touch interaction did not cause
     * any default action (such as scrolling).
     *
     * This is done to simulate the behavior of a mouse for applications that do not support
     * touch events.
     *
     * We're keeping track of the previous event to not send the synthetic mouse events if the
     * touch event was a click (touchstart -> touchend).
     *
     * Emulated events only occur when `isTouchScrollEnabled` is true; when false,
     * touchstart is default-prevented, which suppresses them.
     * Emulated mousedown is prevented while the proxy is focused, or it would blur it and
     * drop the keyboard.
     **/
    var _prevEventType = null;
    var _syntheticEventsActive = false;
    /**
     * primaryTouchId: when enableMultiTouch is false ("single-touch mode"),
     * we track the identifier of the first finger that touched down. All
     * subsequent touch events are filtered to this identifier so that a second
     * finger moving cannot displace the tracked pointer position. Reset to null
     * when the primary finger lifts (or touchcancel is called).
     *
     * touches: a cancel may report no position, or none at all for some
     * touches, so it ends them where they were last seen.
     */
    var _touchState = (_b = touchStateByCanvas.get(canvas)) !== null && _b !== void 0 ? _b : {
        touches: new Map(),
        primaryTouchId: null,
    };
    touchStateByCanvas.set(canvas, _touchState);
    var _activeTouches = _touchState.touches;
    /**
     * A finger can lift while no listeners are registered (after stop(), say),
     * so its touchend never arrives. A touchstart or touchmove lists every
     * finger still down in `touches`; forget the rest.
     */
    var forgetLiftedTouches = function (_a) {
        var _b;
        var touches = _a.touches, changedTouches = _a.changedTouches;
        if (!touches) {
            return;
        }
        var down = new Set();
        for (var i = 0; i < touches.length; i++) {
            down.add(touches[i].identifier);
        }
        for (var i = 0; i < ((_b = changedTouches === null || changedTouches === void 0 ? void 0 : changedTouches.length) !== null && _b !== void 0 ? _b : 0); i++) {
            down.add(changedTouches[i].identifier);
        }
        _activeTouches.forEach(function (_, identifier) {
            if (!down.has(identifier)) {
                _activeTouches.delete(identifier);
            }
        });
        if (_touchState.primaryTouchId !== null &&
            !down.has(_touchState.primaryTouchId)) {
            _touchState.primaryTouchId = null;
        }
    };
    /**
     * Maps client-space points into Artboard space through the fit and alignment
     * of the canvas.
     */
    var mapToArtboard = function (boundingRect, points) {
        var forwardMatrix = rive.computeAlignment(fit, alignment, {
            minX: 0,
            minY: 0,
            maxX: boundingRect.width,
            maxY: boundingRect.height,
        }, artboard.bounds, layoutScaleFactor);
        var invertedMatrix = new rive.Mat2D();
        forwardMatrix.invert(invertedMatrix);
        var mapped = points.map(function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY;
            var canvasX = clientX - boundingRect.left;
            var canvasY = clientY - boundingRect.top;
            var canvasCoordinatesVector = new rive.Vec2D(canvasX, canvasY);
            var transformedVector = rive.mapXY(invertedMatrix, canvasCoordinatesVector);
            var point = { x: transformedVector.x(), y: transformedVector.y() };
            transformedVector.delete();
            canvasCoordinatesVector.delete();
            return point;
        });
        invertedMatrix.delete();
        forwardMatrix.delete();
        return mapped;
    };
    var processEventCallback = function (event) {
        var _a, _b;
        // Exit early out of all synthetic mouse events
        // https://stackoverflow.com/questions/9656990/how-to-prevent-simulated-mouse-events-in-mobile-browsers
        // https://stackoverflow.com/questions/25572070/javascript-touchend-versus-click-dilemma
        if (_syntheticEventsActive && event instanceof MouseEvent) {
            if (event.type === "mousedown" && (isTextProxyFocused === null || isTextProxyFocused === void 0 ? void 0 : isTextProxyFocused())) {
                event.preventDefault();
            }
            // Synthetic event finished
            if (event.type == "mouseup") {
                _syntheticEventsActive = false;
            }
            return;
        }
        // Test if it's a "touch click". This could cause the browser to send
        // synthetic mouse events.
        _syntheticEventsActive =
            isTouchScrollEnabled &&
                event.type === "touchend" &&
                _prevEventType === "touchstart";
        _prevEventType = event.type;
        var boundingRect = event.currentTarget.getBoundingClientRect();
        if (event.type === "touchstart" || event.type === "touchmove") {
            forgetLiftedTouches(event);
        }
        // On touchstart in single-touch mode, record the first new finger as the primary
        // touch if we aren't already tracking one.
        if (!enableMultiTouch && event.type === "touchstart" && _touchState.primaryTouchId === null) {
            var firstTouch = (_a = event.changedTouches) === null || _a === void 0 ? void 0 : _a[0];
            if (firstTouch) {
                _touchState.primaryTouchId = firstTouch.identifier;
            }
        }
        var coordinateSets = getClientCoordinates(event, isTouchScrollEnabled, enableMultiTouch, enableMultiTouch ? null : _touchState.primaryTouchId);
        var positionedSets = coordinateSets.filter(function (coordinateSet) { return coordinateSet.clientX || coordinateSet.clientY; });
        mapToArtboard(boundingRect, positionedSets).forEach(function (point, i) {
            positionedSets[i].transformedX = point.x;
            positionedSets[i].transformedY = point.y;
        });
        // Only a touchstart the scene saw starts tracking a touch, so a finger
        // that single-touch mode ignored can never be ended by a cancel. Any
        // finger that lifts stops being tracked, whether or not the scene saw it.
        if (event.type === "touchend") {
            var lifted = (_b = event.changedTouches) !== null && _b !== void 0 ? _b : [];
            for (var i = 0; i < lifted.length; i++) {
                _activeTouches.delete(lifted[i].identifier);
            }
        }
        else if (event.type === "touchstart" || event.type === "touchmove") {
            coordinateSets.forEach(function (_a) {
                var clientX = _a.clientX, clientY = _a.clientY, identifier = _a.identifier;
                var tracked = _activeTouches.has(identifier);
                if (event.type === "touchstart" && !tracked) {
                    _activeTouches.set(identifier, { clientX: clientX, clientY: clientY });
                }
                else if (tracked && (clientX || clientY)) {
                    _activeTouches.set(identifier, { clientX: clientX, clientY: clientY });
                }
            });
        }
        switch (event.type) {
            /**
             * There's a 2px buffer for a hitRadius when translating the pointer coordinates
             * down to the state machine. In cases where the hitbox is about that much away
             * from the Artboard border, we don't have exact precision on determining pointer
             * exit. We're therefore adding to the translated coordinates on mouseout of a canvas
             * to ensure that we report the mouse has truly exited the hitarea.
             * https://github.com/rive-app/rive-cpp/blob/master/src/animation/state_machine_instance.cpp#L336
             *
             */
            case "mouseout":
                var _loop_1 = function (stateMachine) {
                    if (dispatchPointerExit) {
                        coordinateSets.forEach(function (coordinateSet) {
                            stateMachine.pointerExit(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                        });
                    }
                    else {
                        coordinateSets.forEach(function (coordinateSet) {
                            stateMachine.pointerMove(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                        });
                    }
                };
                for (var _i = 0, stateMachines_2 = stateMachines; _i < stateMachines_2.length; _i++) {
                    var stateMachine = stateMachines_2[_i];
                    _loop_1(stateMachine);
                }
                break;
            // Pointer moving/hovering on the canvas
            case "touchmove":
            case "mouseover":
            case "mousemove": {
                var _loop_2 = function (stateMachine) {
                    coordinateSets.forEach(function (coordinateSet) {
                        stateMachine.pointerMove(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                    });
                };
                for (var _c = 0, stateMachines_3 = stateMachines; _c < stateMachines_3.length; _c++) {
                    var stateMachine = stateMachines_3[_c];
                    _loop_2(stateMachine);
                }
                break;
            }
            // Pointer click initiated but not released yet on the canvas
            case "touchstart":
            case "mousedown": {
                var _loop_3 = function (stateMachine) {
                    coordinateSets.forEach(function (coordinateSet) {
                        stateMachine.pointerDown(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                    });
                };
                for (var _d = 0, stateMachines_4 = stateMachines; _d < stateMachines_4.length; _d++) {
                    var stateMachine = stateMachines_4[_d];
                    _loop_3(stateMachine);
                }
                // Advance the state machine immediately so pointer down(s) takes effect synchronously
                advanceAndDrain(0, { pointerDown: true });
                break;
            }
            // Pointer click released on the canvas
            case "touchend": {
                var _loop_4 = function (stateMachine) {
                    coordinateSets.forEach(function (coordinateSet) {
                        stateMachine.pointerUp(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                        stateMachine.pointerExit(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                    });
                };
                for (var _e = 0, stateMachines_5 = stateMachines; _e < stateMachines_5.length; _e++) {
                    var stateMachine = stateMachines_5[_e];
                    _loop_4(stateMachine);
                }
                // Advance the state machine immediately so pointer up(s) takes effect synchronously
                advanceAndDrain(0);
                // Still inside the touch gesture — summon the keyboard if the tap focused a
                // text input
                summonKeyboard === null || summonKeyboard === void 0 ? void 0 : summonKeyboard();
                // Release the primary touch lock once that finger lifts so the next
                // touchstart can claim a new primary finger.
                if (!enableMultiTouch &&
                    coordinateSets.some(function (c) { return c.identifier === _touchState.primaryTouchId; })) {
                    _touchState.primaryTouchId = null;
                }
                break;
            }
            case "mouseup": {
                var _loop_5 = function (stateMachine) {
                    coordinateSets.forEach(function (coordinateSet) {
                        stateMachine.pointerUp(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                    });
                };
                for (var _f = 0, stateMachines_6 = stateMachines; _f < stateMachines_6.length; _f++) {
                    var stateMachine = stateMachines_6[_f];
                    _loop_5(stateMachine);
                }
                // Advance the state machine immediately so pointer up(s) takes effect synchronously
                advanceAndDrain(0);
                summonKeyboard === null || summonKeyboard === void 0 ? void 0 : summonKeyboard();
                break;
            }
            default:
        }
    };
    /**
     * The browser cancels a touch when the system takes the gesture: a home
     * indicator or edge swipe, an app switch, an alert. Each cancelled touch
     * gets pointerUp then pointerExit, like a lifted finger, so anything
     * waiting for the release doesn't stay pressed. It skips the tap-only side
     * effects (keyboard, emulated mouse events). A page scroll does not cancel
     * the touch in iOS Safari or Android Chrome (it ends with a touchend), so
     * this holds with touch scrolling enabled too.
     */
    var touchCancelCallback = function (event) {
        var _a, _b;
        var cancelled = new Set();
        var changedTouches = (_a = event.changedTouches) !== null && _a !== void 0 ? _a : [];
        for (var i = 0; i < changedTouches.length; i++) {
            var _c = changedTouches[i], identifier = _c.identifier, clientX = _c.clientX, clientY = _c.clientY;
            // Touches the scene never saw (a secondary finger in single-touch
            // mode, or one that already ended) are not tracked.
            if (!_activeTouches.has(identifier)) {
                continue;
            }
            cancelled.add(identifier);
            if (clientX || clientY) {
                _activeTouches.set(identifier, { clientX: clientX, clientY: clientY });
            }
        }
        // A cancel can name only some of the touches, or none. `touches` lists
        // every finger still down, so end any tracked touch missing from it.
        var down = new Set();
        var touches = (_b = event.touches) !== null && _b !== void 0 ? _b : [];
        for (var i = 0; i < touches.length; i++) {
            down.add(touches[i].identifier);
        }
        _activeTouches.forEach(function (_, identifier) {
            if (!down.has(identifier)) {
                cancelled.add(identifier);
            }
        });
        if (_touchState.primaryTouchId === null ||
            cancelled.has(_touchState.primaryTouchId)) {
            _touchState.primaryTouchId = null;
        }
        if (!cancelled.size) {
            return;
        }
        var identifiers = Array.from(cancelled);
        var points = mapToArtboard(event.currentTarget.getBoundingClientRect(), identifiers.map(function (identifier) { return _activeTouches.get(identifier); }));
        identifiers.forEach(function (identifier) { return _activeTouches.delete(identifier); });
        var _loop_6 = function (stateMachine) {
            identifiers.forEach(function (identifier, i) {
                var _a = points[i], x = _a.x, y = _a.y;
                stateMachine.pointerUp(x, y, identifier);
                stateMachine.pointerExit(x, y, identifier);
            });
        };
        for (var _i = 0, stateMachines_7 = stateMachines; _i < stateMachines_7.length; _i++) {
            var stateMachine = stateMachines_7[_i];
            _loop_6(stateMachine);
        }
        // Advance immediately so the release takes effect synchronously
        advanceAndDrain(0);
    };
    /**
     * Forwards wheel and trackpad scrolling to the state machines. The page keeps
     * the wheel unless a scroll view actually moves, so it still scrolls when
     * Rive has nothing to scroll or a view sits at its edge.
     */
    var wheelMomentum = new _wheelMomentum__WEBPACK_IMPORTED_MODULE_0__.WheelMomentumDetector();
    var wheelCallback = function (event) {
        // Pinch zoom arrives as a ctrl+wheel and belongs to the page. A wheel that
        // can't be cancelled is part of a sequence the page is already scrolling;
        // taking it too would move both.
        if (event.ctrlKey || !event.cancelable) {
            wheelMomentum.reset();
            return;
        }
        // Read before the deltas: Firefox reports pixels once a delta has been
        // read first.
        var deltaMode = event.deltaMode;
        var deltaX = event.deltaX;
        var deltaY = event.deltaY;
        // Shift+wheel scrolls sideways. Most browsers already report it on the x
        // axis; a vertical-only view would decline it on y.
        if (event.shiftKey && !deltaX) {
            deltaX = deltaY;
            deltaY = 0;
        }
        var boundingRect = event.currentTarget.getBoundingClientRect();
        // A page is the canvas's visible size, the nearest the host can get to the
        // scroll view's own.
        var toPixelsX = deltaMode === WheelEvent.DOM_DELTA_LINE
            ? PIXELS_PER_LINE
            : deltaMode === WheelEvent.DOM_DELTA_PAGE
                ? boundingRect.width
                : 1;
        var toPixelsY = deltaMode === WheelEvent.DOM_DELTA_LINE
            ? PIXELS_PER_LINE
            : deltaMode === WheelEvent.DOM_DELTA_PAGE
                ? boundingRect.height
                : 1;
        // The DOM reports how far to scroll; the runtime wants how far content
        // travels.
        var scrollX = -deltaX * toPixelsX;
        var scrollY = -deltaY * toPixelsY;
        if (!scrollX && !scrollY) {
            return;
        }
        // Mapping both ends of the delta keeps only the scale of the fit.
        var _a = mapToArtboard(boundingRect, [
            { clientX: event.clientX, clientY: event.clientY },
            { clientX: event.clientX + scrollX, clientY: event.clientY + scrollY },
        ]), position = _a[0], moved = _a[1];
        // The DOM never says whether a pixel delta came from a trackpad, so it
        // counts as precise either way, as it does in the browser's own scrolling.
        var precise = deltaMode === WheelEvent.DOM_DELTA_PIXEL;
        var timeStamp = event.timeStamp / 1000;
        // Momentum bounces at the end of a scroll view; the fingers stretch it.
        var phase = SCROLL_PHASE_UPDATE;
        if (!precise) {
            wheelMomentum.reset();
        }
        else if (wheelMomentum.isMomentum(event, deltaX, deltaY)) {
            phase = SCROLL_PHASE_MOMENTUM;
        }
        // A latched state machine owns the rest of its gesture, even past its edge.
        var latched = stateMachines.filter(function (sm) { return sm.hasScrollLatch(); });
        var ordered = latched.concat(stateMachines.filter(function (sm) { return latched.indexOf(sm) === -1; }));
        var consumed = ordered.some(function (stateMachine) {
            return stateMachine.pointerScroll(position.x, position.y, moved.x - position.x, moved.y - position.y, phase, precise, timeStamp, 0) !== 0;
        });
        if (!consumed) {
            return;
        }
        event.preventDefault();
        // Advance now so the scroll lands on the next frame drawn.
        advanceAndDrain(0);
    };
    var callback = processEventCallback.bind(_this);
    canvas.addEventListener("mouseover", callback);
    canvas.addEventListener("mouseout", callback);
    canvas.addEventListener("mousemove", callback);
    canvas.addEventListener("mousedown", callback);
    canvas.addEventListener("mouseup", callback);
    canvas.addEventListener("touchmove", callback, {
        passive: isTouchScrollEnabled,
    });
    canvas.addEventListener("touchstart", callback, {
        passive: isTouchScrollEnabled,
    });
    canvas.addEventListener("touchend", callback);
    canvas.addEventListener("touchcancel", touchCancelCallback);
    // Not passive, or preventDefault could not keep the page from scrolling.
    canvas.addEventListener("wheel", wheelCallback, { passive: false });
    return function () {
        canvas.removeEventListener("mouseover", callback);
        canvas.removeEventListener("mouseout", callback);
        canvas.removeEventListener("mousemove", callback);
        canvas.removeEventListener("mousedown", callback);
        canvas.removeEventListener("mouseup", callback);
        canvas.removeEventListener("touchmove", callback);
        canvas.removeEventListener("touchstart", callback);
        canvas.removeEventListener("touchend", callback);
        canvas.removeEventListener("touchcancel", touchCancelCallback);
        canvas.removeEventListener("wheel", wheelCallback);
    };
};


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WheelMomentumDetector: () => (/* binding */ WheelMomentumDetector)
/* harmony export */ });
// The runtime closes a scroll gesture after this long without events.
var GESTURE_GAP_MS = 100;
// Falls, and how far below the peak, before a stream counts as momentum.
var FALLING_EVENTS = 3;
var FALL_FROM_PEAK = 0.15;
// Rises in a row that mean fingers. One alone is two merged events.
var RISING_EVENTS = 2;
// Pixel deltas arrive rounded.
var JITTER = 1;
// Assumed slowest share momentum loses a second; a delta held longer is fingers.
var SLOWEST_DECAY = 0.6;
var HOLD_MARGIN = 1.5;
var SHORTEST_HOLD_MS = 50;
/** Tells the platform's momentum from the fingers in pixel wheel events. */
var WheelMomentumDetector = /** @class */ (function () {
    function WheelMomentumDetector() {
        this.lastTime = -Infinity;
        this.lastX = 0;
        this.lastY = 0;
        // The lowest delta since the last rise, and the peak it fell from.
        this.base = 0;
        this.peak = 0;
        this.falls = 0;
        this.rises = 0;
        this.heldSince = 0;
        this.momentum = false;
    }
    WheelMomentumDetector.prototype.reset = function () {
        this.lastTime = -Infinity;
        this.momentum = false;
    };
    WheelMomentumDetector.prototype.isMomentum = function (event, deltaX, deltaY) {
        // Browsers with WheelEvent.momentum know; the rest leave it to the deltas.
        if ("momentum" in event) {
            return event.momentum === true;
        }
        // Each axis rounds on its own, so the larger one is the size.
        var size = Math.max(Math.abs(deltaX), Math.abs(deltaY));
        var time = event.timeStamp;
        var newGesture = time - this.lastTime > GESTURE_GAP_MS ||
            deltaX * this.lastX + deltaY * this.lastY < 0;
        this.lastTime = time;
        this.lastX = deltaX;
        this.lastY = deltaY;
        if (newGesture) {
            this.restart(size, time);
            return false;
        }
        if (size > this.base + JITTER) {
            if (++this.rises >= RISING_EVENTS) {
                this.restart(size, time);
            }
            return this.momentum;
        }
        this.rises = 0;
        var longestHold = (HOLD_MARGIN * 1000) / (SLOWEST_DECAY * size);
        if (size < this.base) {
            this.falls++;
            this.base = size;
            this.heldSince = time;
        }
        else if (time - this.heldSince >
            Math.max(SHORTEST_HOLD_MS, longestHold)) {
            this.restart(size, time);
        }
        if (this.falls >= FALLING_EVENTS &&
            size <= this.peak - Math.max(2 * JITTER, FALL_FROM_PEAK * this.peak)) {
            this.momentum = true;
        }
        return this.momentum;
    };
    WheelMomentumDetector.prototype.restart = function (size, time) {
        this.base = this.peak = size;
        this.falls = this.rises = 0;
        this.heldSince = time;
        this.momentum = false;
    };
    return WheelMomentumDetector;
}());



/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusSessionState: () => (/* binding */ FocusSessionState),
/* harmony export */   KeyboardInteractions: () => (/* binding */ KeyboardInteractions)
/* harmony export */ });
/* harmony import */ var _keyMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _semantics_claimedKeyEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _textInputProxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);



/**
 * Defaults suppressed while typing (scroll/navigate/submit). Tab is traversal's; proxy
 * Space returns earlier as a printable.
 */
var EDITING_NAV_CODES = new Set([
    "Space",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Backspace",
    "Delete",
    "Home",
    "End",
    "Enter",
    "NumpadEnter",
]);
/** A keystroke that types a character (not a Ctrl/Cmd shortcut). */
function isPrintable(event) {
    return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
function isArrowKey(key) {
    return (key === _keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.left || key === _keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.right || key === _keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.up || key === _keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.down);
}
/**
 * Alt/Ctrl/Meta arrows are browser/OS shortcuts (Alt+Left = back, Cmd+Arrow, etc.).
 * Shift is allowed: it is the spatial-navigation chord in Vivaldi/Opera.
 */
function hasShortcutModifier(event) {
    return event.altKey || event.ctrlKey || event.metaKey;
}
/**
 * Tracks the relationship between DOM focus inside this Rive focus domain (canvas or semantic overlay)
 * and Rive's internal focus for the current focus session.
 *
 * NotFocused   — DOM focus left the domain, Rive released focus internally, or Tab walked
 *                off the end of the tree. Keyboard input isn't ours, so Tab is ignored and
 *                reaches the next page element.
 * EntryPending — DOM focus is inside the domain but Rive holds no node yet, so the next Tab
 *                enters the focus tree. Set by pointer focus on the canvas, by assistive technology (AT) focus landing
 *                in the overlay, and by keyboard focus whose entry attempt found no eligible node.
 * RiveFocused  — a Rive node holds focus. Tab/Shift+Tab route to the Rive focus manager and stay
 *                inside the domain until either Rive reports focus ended (pollFocusState) or
 *                Tab walks off the edge of the tree (focusNext()/focusPrevious() returns false and
 *                Rive no longer holds focus).
 *
 * Keyboard focus on the canvas enters the tree immediately: onCanvasFocus infers direction from
 * where focus came from and goes straight to RiveFocused when a node accepts.
 */
var FocusSessionState;
(function (FocusSessionState) {
    FocusSessionState["NotFocused"] = "notFocused";
    FocusSessionState["EntryPending"] = "entryPending";
    FocusSessionState["RiveFocused"] = "riveFocused";
})(FocusSessionState || (FocusSessionState = {}));
/**
 * Manages keyboard and DOM focus interactions for Rive's focus domain (<canvas>, semantic
 * overlay, text input proxy). Owns the proxy and the text input session state.
 * Because keyboard events can apply on either part of the domain, we need to track what events we should
 * handle/intercept, and when to release focus back to the page outside of the domain.
 *
 * Tracks the canvas focus session state (focusSessionState) and routes
 * Tab/Shift+Tab to the Rive state machine's focus manager. Exposes shared
 * state as properties so the Rive render loop can read them directly.
 */
var KeyboardInteractions = /** @class */ (function () {
    function KeyboardInteractions(_a) {
        var canvas = _a.canvas, stateMachine = _a.stateMachine, hasFocusNodes = _a.hasFocusNodes, getOverlayElement = _a.getOverlayElement;
        var _this = this;
        var _b, _c;
        this.focusSessionState = FocusSessionState.NotFocused;
        /** Whether the canvas currently has browser DOM focus. */
        this.canvasHasFocus = false;
        /** After Tab exits the last Rive node, ignore keydowns until focus re-enters the focus domain. */
        this.focusDomainReleased = false;
        /** Overlay element currently wired with focusin/keydown listeners, if any. */
        this.currentOverlayElement = null;
        /** Codes whose keydown an overlay widget took, so their keyup is skipped too. */
        this.claimedKeyCodes = new Set();
        this.textInputSessionActive = false;
        /**
         * The proxy is always empty: copy Rive's selection; always preventDefault.
         */
        this.onCopy = function (event) {
            var _a;
            event.preventDefault();
            var selected = _this.mainSm.selectedText();
            if (selected)
                (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("text/plain", selected);
        };
        /**
         * Handles the canvas gaining browser focus. The behavior differs based on how focus was gained -
         *
         * Pointer-driven focus: the canvas now has focus but Rive holds nothing yet, so we move to EntryPending — this lets the
         * next Tab enter the focus tree even when the focus is pointer-driven
         *
         * Keyboard-driven focus: we enter the Rive focus tree immediately once canvas gains focus.
         * The direction is inferred from where focus came from: an element before the canvas in DOM order
         * means a forward Tab (focusNext), one after means a Shift+Tab (focusPrevious). :focus-visible
         * gates this so a click doesn't yank Rive focus to the first node on the focus event itself.
         */
        this.onCanvasFocus = function (event) {
            _this.syncOverlayListener();
            _this.canvasHasFocus = true;
            _this.focusDomainReleased = false;
            if (_this.isInFocusDomain(event.relatedTarget) ||
                !_this.hasFocusNodes ||
                _this.mainSm.focusState().hasFocus) {
                return;
            }
            _this.focusSessionState = FocusSessionState.EntryPending;
            // Pointer focus waits for the user's next Tab (handled in onKeyDown). Keyboard focus enters now.
            if (!_this.isKeyboardDrivenFocus())
                return;
            var forward = _this.cameFromBeforeCanvas(event.relatedTarget);
            if (forward ? _this.mainSm.focusNext() : _this.mainSm.focusPrevious()) {
                _this.focusSessionState = FocusSessionState.RiveFocused;
            }
        };
        /**
         * Marks internal state that the canvas has lost DOM focus. Do not actually clear
         * Rive focus though if:
         * 1. DOM focus is still within Rive domain (i.e., semantic overlay)
         * 2. Document just lost focus (i.e. tab switching)
         *
         * When we're not in either of those buckets, it's safe to call `clearFocus()` on the SMI.
         */
        this.onCanvasBlur = function (event) {
            // Must stay before the state reset because beginTextInputSession sets the session state and
            // then focuses the proxy, which synchronously blurs the canvas.
            if (_this.inputProxy.owns(event.relatedTarget))
                return;
            _this.focusSessionState = FocusSessionState.NotFocused;
            _this.canvasHasFocus = false;
            if (_this.blurStaysWithRive(event.relatedTarget))
                return;
            _this.mainSm.clearFocus();
        };
        /**
         * Assistive technology (AT) focus landing inside the overlay is DOM focus inside the Rive focus domain, so open a
         * session even when no Rive node holds focus yet. shouldRiveHandleKeyEvent treats NotFocused
         * as authoritative, so without this the overlay's Tab keydowns reach onKeyDown and get dropped
         * at that gate — the browser would move focus out of Rive instead of to the next focus node.
         */
        this.onOverlayFocusIn = function (event) {
            if (!_this.isInOverlay(event.target))
                return;
            _this.focusDomainReleased = false;
            if (!_this.hasFocusNodes)
                return;
            if (_this.focusSessionState !== FocusSessionState.NotFocused)
                return;
            _this.focusSessionState = _this.mainSm.focusState().hasFocus
                ? FocusSessionState.RiveFocused
                : FocusSessionState.EntryPending;
        };
        /** Overlay listeners attach lazily, so the first focusin only ever lands here. */
        this.onFocusDomainHostFocusIn = function (event) {
            _this.syncOverlayListener();
            _this.onOverlayFocusIn(event);
            // Focus entering the proxy re-enters the focus domain, so clear any earlier Tab-out
            // release, or onKeyDown would drop the session's keystrokes.
            if (_this.inputProxy.owns(event.target)) {
                _this.focusDomainReleased = false;
            }
        };
        /**
         * Handles keydown events in the Rive focus domain. We route certain keys to different functions, with the following
         * fallback behavior:
         * 1. Tab/Shift+Tab - check if keyInput() takes this key, if not, call focusNext/Previous traversal if there are focus nodes
         * 2. Check - if a semantic overlay element's key handler claimed the event, don't intercept the key event further
         * 3. Send key to `keyInput()` on Rive state machine if applicable.
         * 4. If the keyInput returned false, and the key is directional arrow keys, call directional focus methods on state machine
         * 5. Printables: in a session the proxy's input event supplies text; otherwise textInput().
         *    A printable fires both keyInput and textInput even if a listener claims it.
         * @param event KeyboardEvent
         * @returns void
         */
        this.onKeyDown = function (event) {
            _this.syncOverlayListener();
            // Keys that are part of an IME composition belong to the IME (candidate
            // navigation, commit). Safari reports the first one as keyCode 229 with
            // isComposing still false.
            if (event.isComposing || event.keyCode === 229)
                return;
            // After Tab exits the last Rive node, ignore keys until focus re-enters the focus domain.
            if (_this.focusDomainReleased)
                return;
            if (!_this.shouldRiveHandleKeyEvent(event))
                return;
            if (event.key === "Tab" && _this.hasFocusNodes) {
                // Tab listeners are matched per phase (down/repeat/up), as in the editor, so
                // each event is offered on its own; one that isn't claimed traverses.
                if (_this.mainSm.focusState().hasFocus &&
                    _this.mainSm.keyInput(_keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.tab, (0,_keyMap__WEBPACK_IMPORTED_MODULE_0__.modifiersFromEvent)(event), true, event.repeat)) {
                    event.preventDefault();
                    return;
                }
                var forward = !event.shiftKey;
                var focusMoved = forward ? _this.mainSm.focusNext() : _this.mainSm.focusPrevious();
                var focusState = _this.mainSm.focusState();
                // focusMoved is false both at a Stop edge (focus stays put) and after walking off
                // the tree (focus cleared), so hasFocus discerns Stop edge from Rive releasing focus
                if (focusMoved || focusState.hasFocus) {
                    // A Rive node holds focus — keep trapping Tab inside Rive.
                    _this.focusSessionState = FocusSessionState.RiveFocused;
                    event.preventDefault();
                }
                else {
                    // No more traversable nodes — release Tab to the page.
                    if (document.activeElement !== _this.canvas &&
                        _this.isInFocusDomain(document.activeElement)) {
                        // The browser's default Tab starts from the focused element; from an overlay element,
                        // the nearest stop backward is the canvas itself. Start it from the
                        // canvas instead, so a Shift+Tab goes to the proper element before Rive.
                        _this.canvas.focus({ preventScroll: true });
                    }
                    _this.focusSessionState = FocusSessionState.NotFocused;
                    _this.focusDomainReleased = true;
                    _this.canvasHasFocus = false;
                }
                _this.syncOverlayListener();
                return;
            }
            // A semantic overlay widget (roving radio/tab group, slider, Enter/Space activation)
            // already acted on this key at its target, so don't act on it twice.
            if ((0,_semantics_claimedKeyEvents__WEBPACK_IMPORTED_MODULE_1__.isKeyEventClaimed)(event)) {
                _this.claimedKeyCodes.add(event.code);
                return;
            }
            // A new unclaimed press: drop any claim whose keyup never arrived.
            _this.claimedKeyCodes.delete(event.code);
            var fromProxy = _this.textInputSessionActive && _this.inputProxy.owns(event.target);
            var expectsKeyboardInput = _this.mainSm.focusState().expectsKeyboardInput;
            // The focused node gets first refusal (a TextInput's caret, or a keyboard listener
            // on that key). Keys with no Rive equivalent map to null and aren't dispatched.
            var key = (0,_keyMap__WEBPACK_IMPORTED_MODULE_0__.keyboardEventToRiveKey)(event);
            var consumed = key !== null &&
                _this.mainSm.keyInput(key, (0,_keyMap__WEBPACK_IMPORTED_MODULE_0__.modifiersFromEvent)(event), true, event.repeat);
            // An arrow key with no consumed key input moves focus spatially. While a Rive node holds focus,
            // arrows never scroll the page
            if (!consumed && key !== null && isArrowKey(key) && !hasShortcutModifier(event)) {
                consumed =
                    _this.focusInDirection(key) || _this.mainSm.focusState().hasFocus;
            }
            if (isPrintable(event)) {
                // During a session the printable must reach the proxy: its input event is the
                // (IME- and dead-key-correct) text source, and C++ inserts nothing from keyInput.
                if (fromProxy)
                    return;
                // Session live but focus elsewhere in Rive: refocus the proxy so the default inserts there.
                if (_this.textInputSessionActive && _this.isInFocusDomain(event.target)) {
                    _this.inputProxy.focus();
                    return;
                }
                if (!_this.textInputSessionActive && expectsKeyboardInput) {
                    _this.mainSm.textInput(event.key);
                }
            }
            // Rive consumed it, or an unmodified editing key while typing (would scroll/submit).
            var typing = fromProxy || expectsKeyboardInput;
            if (consumed ||
                (typing && !hasShortcutModifier(event) && EDITING_NAV_CODES.has(event.code))) {
                event.preventDefault();
            }
        };
        this.onKeyUp = function (event) {
            if (event.isComposing || event.keyCode === 229)
                return;
            if (_this.claimedKeyCodes.delete(event.code))
                return;
            if (_this.focusSessionState === FocusSessionState.NotFocused)
                return;
            var key = (0,_keyMap__WEBPACK_IMPORTED_MODULE_0__.keyboardEventToRiveKey)(event);
            if (key === null)
                return;
            _this.mainSm.keyInput(key, (0,_keyMap__WEBPACK_IMPORTED_MODULE_0__.modifiersFromEvent)(event), false, false);
        };
        this.canvas = canvas;
        this.mainSm = stateMachine;
        this.hasFocusNodes = hasFocusNodes;
        this.getOverlayElement = getOverlayElement;
        this.focusDomainHost = (_b = canvas.parentElement) !== null && _b !== void 0 ? _b : document;
        canvas.addEventListener("focus", this.onCanvasFocus);
        canvas.addEventListener("blur", this.onCanvasBlur);
        canvas.addEventListener("keydown", this.onKeyDown);
        canvas.addEventListener("keyup", this.onKeyUp);
        this.focusDomainHost.addEventListener("focusin", this.onFocusDomainHostFocusIn);
        this.syncOverlayListener();
        this.inputProxy = new _textInputProxy__WEBPACK_IMPORTED_MODULE_2__.TextInputProxy({
            container: (_c = canvas.parentElement) !== null && _c !== void 0 ? _c : document.body,
            canvas: canvas,
            textInput: function (text) { return _this.mainSm.textInput(text); },
            // Proxy keystrokes go through the same handlers as the canvas.
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
            onCopy: this.onCopy,
            onBlur: function (relatedTarget) { return _this.handleProxyBlur(relatedTarget); },
        });
    }
    KeyboardInteractions.prototype.isTextInputSessionActive = function () {
        return this.textInputSessionActive;
    };
    /** Session active and the proxy holds DOM focus. */
    KeyboardInteractions.prototype.isEditingHostFocused = function () {
        return this.textInputSessionActive && this.inputProxy.hasDomFocus();
    };
    /** @param focusProxy move DOM focus to the proxy; false leaves it where it is. */
    KeyboardInteractions.prototype.beginTextInputSession = function (focusProxy) {
        this.textInputSessionActive = true;
        this.focusSessionState = FocusSessionState.RiveFocused;
        if (focusProxy)
            this.inputProxy.focus();
    };
    /** @param fromBlur focus is already leaving; don't park it on the canvas. */
    KeyboardInteractions.prototype.endTextInputSession = function (fromBlur) {
        if (fromBlur === void 0) { fromBlur = false; }
        if (!this.textInputSessionActive)
            return;
        this.textInputSessionActive = false;
        this.inputProxy.endSession();
        if (fromBlur || !this.inputProxy.hasDomFocus())
            return;
        // Nothing took DOM focus from the proxy (e.g. semantics is off). Park it on the
        // canvas so keys keep reaching Rive; onCanvasFocus ignores focus from the input proxy.
        this.canvas.focus({ preventScroll: true });
    };
    /** Must run synchronously in the pointer gesture or mobile keyboards won't open. */
    KeyboardInteractions.prototype.summonForPointer = function () {
        if (this.textInputSessionActive)
            this.inputProxy.focus();
        else
            this.beginTextInputSession(true);
    };
    Object.defineProperty(KeyboardInteractions.prototype, "editingHost", {
        /** The text-input proxy, for the semantics layer to decorate while editing. */
        get: function () {
            return this.inputProxy;
        },
        enumerable: false,
        configurable: true
    });
    KeyboardInteractions.prototype.handleProxyBlur = function (relatedTarget) {
        // Teardown already in progress (endTextInputSession blurred the proxy).
        if (!this.textInputSessionActive)
            return;
        // Still in Rive or the document blurred: keep the session (pollFocusState tears down).
        if (this.blurStaysWithRive(relatedTarget))
            return;
        // Blurred out of Rive entirely: release C++ focus and end the session.
        this.mainSm.clearFocus();
        this.endTextInputSession(true);
        this.focusSessionState = FocusSessionState.NotFocused;
    };
    /**
     * Set the FocusSessionState. Useful for invoking a Rive "blur" without actually blurring from the <canvas>. This
     * helps put the DOM focus state on the canvas rather than the <body>, so the user doesn't lose the spot in page navigation
     *
     * @param state FocusSessionState enum
     */
    KeyboardInteractions.prototype.setFocusSessionState = function (state) {
        this.focusSessionState = state;
    };
    /**
     * Called by pollFocusState on the Rive instance when it observes hasFocus=true. Rive acquired
     * focus internally (e.g. via a listener action or state transition) without a DOM focus event,
     * so mark the session RiveFocused. This cannot resurrect a session that a DOM blur ended,
     * because onCanvasBlur clears Rive's focus alongside it.
     */
    KeyboardInteractions.prototype.notifyRiveFocused = function () {
        this.focusSessionState = FocusSessionState.RiveFocused;
    };
    /** Blur into the focus domain, or the whole document losing focus (tab/window switch). */
    KeyboardInteractions.prototype.blurStaysWithRive = function (relatedTarget) {
        return (this.isInFocusDomain(relatedTarget) ||
            (relatedTarget === null && !document.hasFocus()));
    };
    /** Arrow keys map to directional focus; anything else is not a focus move. */
    KeyboardInteractions.prototype.focusInDirection = function (key) {
        switch (key) {
            case _keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.left:
                return this.mainSm.focusLeft();
            case _keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.right:
                return this.mainSm.focusRight();
            case _keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.up:
                return this.mainSm.focusUp();
            case _keyMap__WEBPACK_IMPORTED_MODULE_0__.Key.down:
                return this.mainSm.focusDown();
            default:
                return false;
        }
    };
    /**
     * Determine if Rive should handle keyboard input. If session state is `NotFocused` - no.
     * DOM focus stays parked on the canvas after Rive releases focus internally, and that Tab
     * has to reach the page rather than re-enter the tree.
     *
     * Otherwise, the event still has to belong to Rive:
     * 1. If the current DOM focus is in Rive domain (canvas or semantic overlay)
     * 2. If the target for the key input is for the semantic overlay, or the canvas
     */
    KeyboardInteractions.prototype.shouldRiveHandleKeyEvent = function (event) {
        if (this.focusSessionState === FocusSessionState.NotFocused)
            return false;
        var inFocusDomain = this.isInFocusDomain(document.activeElement) ||
            this.isInOverlay(event.target);
        var eventOnCanvas = event.target === this.canvas;
        return inFocusDomain || this.canvasHasFocus || eventOnCanvas;
    };
    /** DOM that counts as inside Rive for focus: canvas, overlay subtree, text-input proxy. */
    KeyboardInteractions.prototype.isInFocusDomain = function (target) {
        if (target === this.canvas)
            return true;
        if (this.inputProxy.owns(target))
            return true;
        return this.isInOverlay(target);
    };
    /** Overlay only (excludes the canvas) — the accessibility overlay subtree. */
    KeyboardInteractions.prototype.isInOverlay = function (target) {
        var _a, _b, _c;
        if (!(target instanceof Node))
            return false;
        return (_c = (_b = (_a = this.getOverlayElement) === null || _a === void 0 ? void 0 : _a.call(this)) === null || _b === void 0 ? void 0 : _b.contains(target)) !== null && _c !== void 0 ? _c : false;
    };
    KeyboardInteractions.prototype.syncOverlayListener = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var nextOverlayElement = (_b = (_a = this.getOverlayElement) === null || _a === void 0 ? void 0 : _a.call(this)) !== null && _b !== void 0 ? _b : null;
        if (nextOverlayElement === this.currentOverlayElement)
            return;
        (_c = this.currentOverlayElement) === null || _c === void 0 ? void 0 : _c.removeEventListener("focusin", this.onOverlayFocusIn);
        (_d = this.currentOverlayElement) === null || _d === void 0 ? void 0 : _d.removeEventListener("keydown", this.onKeyDown);
        (_e = this.currentOverlayElement) === null || _e === void 0 ? void 0 : _e.removeEventListener("keyup", this.onKeyUp);
        this.currentOverlayElement = nextOverlayElement;
        (_f = this.currentOverlayElement) === null || _f === void 0 ? void 0 : _f.addEventListener("focusin", this.onOverlayFocusIn);
        // Bubble phase, so a semantic widget's own key handler runs first and can claim
        // the key via claimKeyEvent (see onKeyDown).
        (_g = this.currentOverlayElement) === null || _g === void 0 ? void 0 : _g.addEventListener("keydown", this.onKeyDown);
        (_h = this.currentOverlayElement) === null || _h === void 0 ? void 0 : _h.addEventListener("keyup", this.onKeyUp);
    };
    /**
     * Whether the canvas currently matches :focus-visible — the browser's heuristic for keyboard-
     * (vs pointer-) driven focus. For older browser versions that don't support this selector, return false
     * so that we don't incorrectly assume pointer vs keyboard focus. Next tab would enter the focus tree in those edge cases.
     */
    KeyboardInteractions.prototype.isKeyboardDrivenFocus = function () {
        try {
            return this.canvas.matches(":focus-visible");
        }
        catch (_a) {
            return false;
        }
    };
    KeyboardInteractions.prototype.cameFromBeforeCanvas = function (from) {
        if (!from)
            return true;
        var position = this.canvas.compareDocumentPosition(from);
        if (position & Node.DOCUMENT_POSITION_PRECEDING)
            return true;
        if (position & Node.DOCUMENT_POSITION_FOLLOWING)
            return false;
        return true;
    };
    KeyboardInteractions.prototype.cleanup = function () {
        var _a, _b, _c;
        this.canvas.removeEventListener("focus", this.onCanvasFocus);
        this.canvas.removeEventListener("blur", this.onCanvasBlur);
        this.canvas.removeEventListener("keydown", this.onKeyDown);
        this.canvas.removeEventListener("keyup", this.onKeyUp);
        this.claimedKeyCodes.clear();
        this.focusDomainHost.removeEventListener("focusin", this.onFocusDomainHostFocusIn);
        (_a = this.currentOverlayElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("focusin", this.onOverlayFocusIn);
        (_b = this.currentOverlayElement) === null || _b === void 0 ? void 0 : _b.removeEventListener("keydown", this.onKeyDown);
        (_c = this.currentOverlayElement) === null || _c === void 0 ? void 0 : _c.removeEventListener("keyup", this.onKeyUp);
        // Removing a focused element drops focus to <body> with no blur; park on the canvas.
        if (this.inputProxy.hasDomFocus()) {
            this.canvas.focus({ preventScroll: true });
        }
        this.inputProxy.cleanup();
        this.textInputSessionActive = false;
    };
    return KeyboardInteractions;
}());



/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Key: () => (/* binding */ Key),
/* harmony export */   KeyModifiers: () => (/* binding */ KeyModifiers),
/* harmony export */   keyboardEventToRiveKey: () => (/* binding */ keyboardEventToRiveKey),
/* harmony export */   modifiersFromEvent: () => (/* binding */ modifiersFromEvent)
/* harmony export */ });
/*
 * Maps DOM keyboard events to the GLFW-style key codes and modifier bitmask
 * that StateMachineInstance.keyInput() expects. Values mirror `enum class Key`
 * and `enum class KeyModifiers` in rive-runtime focusable.hpp;
 * they are stable GLFW codes, so they live here as constants instead of an
 * embind enum.
 */
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Key = {
    space: 32,
    apostrophe: 39, // '
    comma: 44, // ,
    minus: 45, // -
    period: 46, // .
    slash: 47, // /
    key0: 48,
    key1: 49,
    key2: 50,
    key3: 51,
    key4: 52,
    key5: 53,
    key6: 54,
    key7: 55,
    key8: 56,
    key9: 57,
    semicolon: 59, // ;
    equal: 61, // =
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    leftBracket: 91, // [
    backslash: 92, // \
    rightBracket: 93, // ]
    graveAccent: 96, // `
    world1: 161, // non-US #1
    world2: 162, // non-US #2
    escape: 256,
    enter: 257,
    tab: 258,
    backspace: 259,
    insert: 260,
    deleteKey: 261,
    right: 262,
    left: 263,
    down: 264,
    up: 265,
    pageUp: 266,
    pageDown: 267,
    home: 268,
    end: 269,
    capsLock: 280,
    scrollLock: 281,
    numLock: 282,
    printScreen: 283,
    pause: 284,
    f1: 290,
    f2: 291,
    f3: 292,
    f4: 293,
    f5: 294,
    f6: 295,
    f7: 296,
    f8: 297,
    f9: 298,
    f10: 299,
    f11: 300,
    f12: 301,
    f13: 302,
    f14: 303,
    f15: 304,
    f16: 305,
    f17: 306,
    f18: 307,
    f19: 308,
    f20: 309,
    f21: 310,
    f22: 311,
    f23: 312,
    f24: 313,
    f25: 314,
    kp0: 320,
    kp1: 321,
    kp2: 322,
    kp3: 323,
    kp4: 324,
    kp5: 325,
    kp6: 326,
    kp7: 327,
    kp8: 328,
    kp9: 329,
    kpDecimal: 330,
    kpDivide: 331,
    kpMultiply: 332,
    kpSubtract: 333,
    kpAdd: 334,
    kpEnter: 335,
    kpEqual: 336,
    leftShift: 340,
    leftControl: 341,
    leftAlt: 342,
    leftSuper: 343,
    rightShift: 344,
    rightControl: 345,
    rightAlt: 346,
    rightSuper: 347,
    menu: 348,
};
var KeyModifiers = {
    none: 0,
    shift: 1 << 0,
    ctrl: 1 << 1,
    alt: 1 << 2,
    meta: 1 << 3,
};
// Physical key (KeyboardEvent.code) to Rive key, by US-QWERTY position.
var CODE_TO_KEY = {
    // Modifiers are keys too (the editor sends them), and are also in the bitmask.
    ShiftLeft: Key.leftShift,
    ShiftRight: Key.rightShift,
    ControlLeft: Key.leftControl,
    ControlRight: Key.rightControl,
    AltLeft: Key.leftAlt,
    AltRight: Key.rightAlt,
    MetaLeft: Key.leftSuper,
    MetaRight: Key.rightSuper,
    KeyA: Key.a,
    KeyB: Key.b,
    KeyC: Key.c,
    KeyD: Key.d,
    KeyE: Key.e,
    KeyF: Key.f,
    KeyG: Key.g,
    KeyH: Key.h,
    KeyI: Key.i,
    KeyJ: Key.j,
    KeyK: Key.k,
    KeyL: Key.l,
    KeyM: Key.m,
    KeyN: Key.n,
    KeyO: Key.o,
    KeyP: Key.p,
    KeyQ: Key.q,
    KeyR: Key.r,
    KeyS: Key.s,
    KeyT: Key.t,
    KeyU: Key.u,
    KeyV: Key.v,
    KeyW: Key.w,
    KeyX: Key.x,
    KeyY: Key.y,
    KeyZ: Key.z,
    Digit0: Key.key0,
    Digit1: Key.key1,
    Digit2: Key.key2,
    Digit3: Key.key3,
    Digit4: Key.key4,
    Digit5: Key.key5,
    Digit6: Key.key6,
    Digit7: Key.key7,
    Digit8: Key.key8,
    Digit9: Key.key9,
    Numpad0: Key.kp0,
    Numpad1: Key.kp1,
    Numpad2: Key.kp2,
    Numpad3: Key.kp3,
    Numpad4: Key.kp4,
    Numpad5: Key.kp5,
    Numpad6: Key.kp6,
    Numpad7: Key.kp7,
    Numpad8: Key.kp8,
    Numpad9: Key.kp9,
    NumpadDecimal: Key.kpDecimal,
    NumpadDivide: Key.kpDivide,
    NumpadMultiply: Key.kpMultiply,
    NumpadSubtract: Key.kpSubtract,
    NumpadAdd: Key.kpAdd,
    NumpadEnter: Key.kpEnter,
    NumpadEqual: Key.kpEqual,
    Minus: Key.minus,
    Equal: Key.equal,
    BracketLeft: Key.leftBracket,
    BracketRight: Key.rightBracket,
    Backslash: Key.backslash,
    Semicolon: Key.semicolon,
    Quote: Key.apostrophe,
    Backquote: Key.graveAccent,
    Comma: Key.comma,
    Period: Key.period,
    Slash: Key.slash,
    IntlBackslash: Key.world1,
    IntlRo: Key.world2,
    Space: Key.space,
    Enter: Key.enter,
    Tab: Key.tab,
    Backspace: Key.backspace,
    Insert: Key.insert,
    Delete: Key.deleteKey,
    Escape: Key.escape,
    ArrowRight: Key.right,
    ArrowLeft: Key.left,
    ArrowDown: Key.down,
    ArrowUp: Key.up,
    PageUp: Key.pageUp,
    PageDown: Key.pageDown,
    Home: Key.home,
    End: Key.end,
    CapsLock: Key.capsLock,
    ScrollLock: Key.scrollLock,
    NumLock: Key.numLock,
    PrintScreen: Key.printScreen,
    Pause: Key.pause,
    ContextMenu: Key.menu,
    F1: Key.f1,
    F2: Key.f2,
    F3: Key.f3,
    F4: Key.f4,
    F5: Key.f5,
    F6: Key.f6,
    F7: Key.f7,
    F8: Key.f8,
    F9: Key.f9,
    F10: Key.f10,
    F11: Key.f11,
    F12: Key.f12,
    F13: Key.f13,
    F14: Key.f14,
    F15: Key.f15,
    F16: Key.f16,
    F17: Key.f17,
    F18: Key.f18,
    F19: Key.f19,
    F20: Key.f20,
    F21: Key.f21,
    F22: Key.f22,
    F23: Key.f23,
    F24: Key.f24,
    F25: Key.f25,
};
// Unshifted characters (event.key, lowercased) that name a Rive key.
var CHAR_TO_KEY = (function () {
    var map = {
        " ": Key.space,
        "'": Key.apostrophe,
        ",": Key.comma,
        "-": Key.minus,
        ".": Key.period,
        "/": Key.slash,
        ";": Key.semicolon,
        "=": Key.equal,
        "[": Key.leftBracket,
        "\\": Key.backslash,
        "]": Key.rightBracket,
        "`": Key.graveAccent,
    };
    for (var c = 0; c < 26; c++)
        map[String.fromCharCode(97 + c)] = Key.a + c;
    for (var d = 0; d <= 9; d++)
        map[String(d)] = Key.key0 + d;
    return map;
})();
// Non-printable event.key values; each shares its name with its code.
var NAMED_KEYS = new Set(__spreadArray([
    "Enter",
    "Tab",
    "Backspace",
    "Insert",
    "Delete",
    "Escape",
    "ArrowRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowUp",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    "CapsLock",
    "ScrollLock",
    "NumLock",
    "PrintScreen",
    "Pause",
    "ContextMenu"
], Array.from({ length: 25 }, function (_, i) { return "F".concat(i + 1); }), true));
/**
 * Maps a KeyboardEvent to a Rive key, or null if Rive has no equivalent.
 *
 * Resolves the logical key: what the user's layout labels the key, ignoring
 * Shift, so a listener on "A" fires on AZERTY's A too. `event.key` is preferred;
 * `event.code` is the fallback when `key` isn't a plain unshifted character
 * (shifted symbols, Option/AltGr output, non-Latin letters, dead keys).
 * Digit-row and numpad keys skip the character lookup so AZERTY's digit row
 * still reports digits and numpad digits stay distinct from the digit row.
 */
function keyboardEventToRiveKey(event) {
    var _a, _b;
    var code = event.code, key = event.key;
    if (NAMED_KEYS.has(key)) {
        // NumpadEnter reports key "Enter"; keep it distinct.
        return code === "NumpadEnter" ? Key.kpEnter : (_a = CODE_TO_KEY[key]) !== null && _a !== void 0 ? _a : null;
    }
    if (!code.startsWith("Digit") && !code.startsWith("Numpad") && key) {
        var fromChar = CHAR_TO_KEY[key.toLowerCase()];
        if (fromChar !== undefined)
            return fromChar;
    }
    return (_b = CODE_TO_KEY[code]) !== null && _b !== void 0 ? _b : null;
}
function modifiersFromEvent(event) {
    var modifiers = KeyModifiers.none;
    if (event.shiftKey)
        modifiers |= KeyModifiers.shift;
    if (event.ctrlKey)
        modifiers |= KeyModifiers.ctrl;
    if (event.altKey)
        modifiers |= KeyModifiers.alt;
    if (event.metaKey)
        modifiers |= KeyModifiers.meta;
    return modifiers;
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextInputProxy: () => (/* binding */ TextInputProxy)
/* harmony export */ });
/* harmony import */ var _canvasOffset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);

// 16px: the smallest font size at which iOS Safari doesn't zoom on focus
var FONT_SIZE_PX = 16;
/** Capture-critical attributes decorate() must not touch. */
var PROTECTED_ATTRS = new Set([
    "type",
    "value",
    "style",
    "tabindex",
    "autocapitalize",
    "autocomplete",
    "autocorrect",
    "spellcheck",
]);
/**
 * Invisible per-instance <input> capturing IME/dead-key/paste text; focusable inside a
 * gesture to raise mobile keyboards. Always empty: C++ owns value and caret. Decorated
 * for AT only while it holds DOM focus.
 */
var TextInputProxy = /** @class */ (function () {
    function TextInputProxy(params) {
        var _this = this;
        // True between compositionstart/compositionend; we never commit mid-composition.
        this.composing = false;
        // Names set by decorate(), removed by resetDecoration().
        this.decoratedKeys = new Set();
        // Last written left/top, to skip no-op style writes.
        this.lastLeft = NaN;
        this.lastTop = NaN;
        /** Re-sync before input: the canvas may have scrolled since the session began. */
        this.reposition = function () { return _this.positionOverCanvas(); };
        this.onCompositionStart = function () {
            _this.composing = true;
        };
        this.onCompositionEnd = function () {
            _this.composing = false;
            // The composed text is now committed in element.value; forward it here. A
            // trailing `input` event (order varies by browser) then sees an empty field.
            _this.commit();
        };
        this.onInput = function () {
            if (_this.composing)
                return;
            _this.commit();
        };
        // An <input type=text> strips line breaks from its value, so forward the clipboard
        // text directly. Core's single-line fields strip them themselves.
        this.onPaste = function (event) {
            var _a;
            var text = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
            if (!text)
                return;
            event.preventDefault();
            _this.params.textInput(text.replace(/\r\n?/g, "\n"));
        };
        this.onBlur = function (event) {
            _this.params.onBlur(event.relatedTarget);
        };
        this.params = params;
        this.element = this.createElement();
        this.positionOverCanvas();
        // Order vs. the overlay is unspecified; fine, Tab release starts from the canvas.
        this.params.container.appendChild(this.element);
    }
    // Registered first so it runs before the key handler inserts or moves the caret.
    TextInputProxy.prototype.listeners = function () {
        return [
            ["keydown", this.reposition],
            ["beforeinput", this.reposition],
            ["keydown", this.params.onKeyDown],
            ["keyup", this.params.onKeyUp],
            ["input", this.onInput],
            ["compositionstart", this.onCompositionStart],
            ["compositionend", this.onCompositionEnd],
            ["paste", this.onPaste],
            ["copy", this.params.onCopy],
            ["blur", this.onBlur],
        ];
    };
    TextInputProxy.prototype.createElement = function () {
        var el = document.createElement("input");
        el.type = "text";
        // Focusable but never in native tab order (Rive drives traversal synthetically),
        // and invisible without display:none (which would forbid focus).
        el.tabIndex = -1;
        el.setAttribute("aria-hidden", "true");
        // Always empty, so autocapitalize/autocorrect would misfire.
        el.setAttribute("autocapitalize", "off");
        el.setAttribute("autocomplete", "off");
        el.setAttribute("autocorrect", "off");
        el.spellcheck = false;
        // Over the canvas (not display:none) so iOS doesn't scroll-jump on keyboard open.
        // font-size must stay 16px or iOS Safari zooms on focus.
        el.style.cssText =
            "position:absolute;width:1px;height:1px;padding:0;margin:0;border:0;" +
                "outline:none;opacity:0;background:transparent;color:transparent;" +
                "caret-color:transparent;overflow:hidden;resize:none;z-index:0;" +
                // Focused programmatically only; must not swallow clicks
                "pointer-events:none;" +
                "font-size:".concat(FONT_SIZE_PX, "px;line-height:1;");
        for (var _i = 0, _a = this.listeners(); _i < _a.length; _i++) {
            var _b = _a[_i], type = _b[0], listener = _b[1];
            el.addEventListener(type, listener);
        }
        return el;
    };
    TextInputProxy.prototype.positionOverCanvas = function () {
        // Track the canvas (browsers scroll to the caret); clamp on-screen, one caret line box
        // (FONT_SIZE_PX) from the far edges, or the root scrolls to reveal it.
        var _a = (0,_canvasOffset__WEBPACK_IMPORTED_MODULE_0__.canvasOffset)(this.params.canvas), top = _a.top, left = _a.left;
        if (window.innerHeight > 0) {
            var r = this.params.canvas.getBoundingClientRect();
            top += clamp(r.top, 0, window.innerHeight - FONT_SIZE_PX) - r.top;
            left += clamp(r.left, 0, window.innerWidth - FONT_SIZE_PX) - r.left;
        }
        if (left !== this.lastLeft) {
            this.element.style.left = "".concat(left, "px");
            this.lastLeft = left;
        }
        if (top !== this.lastTop) {
            this.element.style.top = "".concat(top, "px");
            this.lastTop = top;
        }
    };
    /**
     * Forward the field's text to Rive and clear it.
     *
     * TODO: iOS won't autorepeat Backspace in an empty field (needs a text mirror).
     * */
    TextInputProxy.prototype.commit = function () {
        var text = this.element.value;
        if (!text)
            return;
        this.element.value = "";
        this.params.textInput(text);
    };
    /** Clear any transient value and decoration. Does not blur the element. */
    TextInputProxy.prototype.endSession = function () {
        this.element.value = "";
        // Browsers fire compositionend on blur, but a stuck flag would drop every
        // keystroke of the next session.
        this.composing = false;
        // Also covers blur-out, which bypasses the overlay.
        this.resetDecoration();
    };
    /** Must be called synchronously inside a gesture on iOS to raise the keyboard. */
    TextInputProxy.prototype.focus = function () {
        // Reposition first: iOS scrolls the focused input into view when the keyboard opens.
        this.positionOverCanvas();
        this.element.focus({ preventScroll: true });
    };
    TextInputProxy.prototype.hasDomFocus = function () {
        return document.activeElement === this.element;
    };
    TextInputProxy.prototype.owns = function (target) {
        return target === this.element;
    };
    /** See EditingHost.decorate. */
    TextInputProxy.prototype.decorate = function (attrs) {
        // aria-hidden outranks every attribute set below, so it must come off before this
        // element can stand in as the accessible element for the focused node.
        this.element.removeAttribute("aria-hidden");
        for (var _i = 0, _a = Object.entries(attrs); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], value = _b[1];
            // Never override capture attrs.
            if (PROTECTED_ATTRS.has(name_1.toLowerCase()))
                continue;
            if (value === null) {
                this.element.removeAttribute(name_1);
                this.decoratedKeys.delete(name_1);
            }
            else {
                // Skip no-op writes: setting an attribute to the value it already has still
                // emits a mutation, and assistive tech is focused on this element mid-edit.
                if (this.element.getAttribute(name_1) !== value) {
                    this.element.setAttribute(name_1, value);
                }
                this.decoratedKeys.add(name_1);
            }
        }
    };
    /**
     * type=password for obscured fields so AT doesn't echo keys.
     * TODO: source "type" from Core, not semantics.
     */
    TextInputProxy.prototype.setSecure = function (secure) {
        var type = secure ? "password" : "text";
        if (this.element.type !== type)
            this.element.type = type;
    };
    /** Drop all decoration and return to the AT-invisible baseline. */
    TextInputProxy.prototype.resetDecoration = function () {
        var _this = this;
        this.setSecure(false);
        this.decoratedKeys.forEach(function (name) { return _this.element.removeAttribute(name); });
        this.decoratedKeys.clear();
        this.element.setAttribute("aria-hidden", "true");
    };
    TextInputProxy.prototype.cleanup = function () {
        for (var _i = 0, _a = this.listeners(); _i < _a.length; _i++) {
            var _b = _a[_i], type = _b[0], listener = _b[1];
            this.element.removeEventListener(type, listener);
        }
        this.element.remove();
    };
    return TextInputProxy;
}());

function clamp(v, min, max) {
    return Math.min(Math.max(v, min), Math.max(min, max));
}


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GamepadInteractions: () => (/* binding */ GamepadInteractions)
/* harmony export */ });
/* harmony import */ var _gamepadBatchEncoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);

// Standard mapping: 17 buttons, 4 stick axes, plus triggers mirrored onto axes 4/5.
var STANDARD_BUTTON_COUNT = 17;
var STANDARD_STICK_AXIS_COUNT = 4;
var LEFT_TRIGGER_BUTTON = 6;
var RIGHT_TRIGGER_BUTTON = 7;
// Consecutive rejected batches before giving up on a state machine.
var MAX_SUBMIT_FAILURES = 3;
function zeros(n) {
    var out = [];
    for (var i = 0; i < n; i++) {
        out.push(0);
    }
    return out;
}
function restState(pad) {
    return {
        deviceId: pad.deviceId,
        mapping: pad.mapping,
        buttons: zeros(pad.buttons.length),
        axes: zeros(pad.axes.length),
    };
}
function readNavigatorGamepads() {
    if (typeof navigator === "undefined" || !navigator.getGamepads) {
        return [];
    }
    try {
        return Array.prototype.slice.call(navigator.getGamepads());
    }
    catch (_a) {
        // Permissions-Policy or insecure-origin SecurityError.
        return [];
    }
}
function readButtons(pad, count) {
    var buttons = [];
    for (var i = 0; i < count; i++) {
        buttons.push(pad.buttons[i] ? pad.buttons[i].value : 0);
    }
    return buttons;
}
function toPadState(deviceId, pad) {
    var _a;
    if (pad.mapping !== "standard") {
        // Unknown layout: sent as reported, up to the core's caps.
        return {
            deviceId: deviceId,
            mapping: _gamepadBatchEncoder__WEBPACK_IMPORTED_MODULE_0__.GamepadMappingKind.Unknown,
            buttons: readButtons(pad, Math.min(pad.buttons.length, _gamepadBatchEncoder__WEBPACK_IMPORTED_MODULE_0__.GAMEPAD_MAX_BUTTONS)),
            axes: pad.axes.slice(0, _gamepadBatchEncoder__WEBPACK_IMPORTED_MODULE_0__.GAMEPAD_MAX_AXES),
        };
    }
    var buttons = readButtons(pad, STANDARD_BUTTON_COUNT);
    var axes = [];
    for (var i = 0; i < STANDARD_STICK_AXIS_COUNT; i++) {
        axes.push((_a = pad.axes[i]) !== null && _a !== void 0 ? _a : 0);
    }
    axes.push(buttons[LEFT_TRIGGER_BUTTON], buttons[RIGHT_TRIGGER_BUTTON]);
    return { deviceId: deviceId, mapping: _gamepadBatchEncoder__WEBPACK_IMPORTED_MODULE_0__.GamepadMappingKind.Standard, buttons: buttons, axes: axes };
}
/**
 * Page-wide gamepad reader shared by every Rive instance: one `getGamepads()` per frame,
 * device ids allocated once (monotonic from 1, never reused), and a single window listener.
 */
var GamepadSource = /** @class */ (function () {
    function GamepadSource() {
        var _this = this;
        this.subscribers = 0;
        this.hasPads = false;
        this.nextDeviceId = 1;
        this.slots = {};
        this.cachedTime = NaN;
        this.cached = [];
        this.onConnected = function () {
            _this.hasPads = true;
        };
    }
    GamepadSource.prototype.subscribe = function () {
        if (this.subscribers++ > 0 || typeof window === "undefined") {
            return;
        }
        window.addEventListener("gamepadconnected", this.onConnected);
        // The event doesn't re-fire for pads exposed before we started listening.
        this.hasPads = readNavigatorGamepads().some(function (pad) { return !!pad; });
    };
    GamepadSource.prototype.unsubscribe = function () {
        if (--this.subscribers > 0 || typeof window === "undefined") {
            return;
        }
        window.removeEventListener("gamepadconnected", this.onConnected);
        this.hasPads = false;
        this.cachedTime = NaN;
        this.cached = [];
    };
    /** Current pads; cached per rAF timestamp so instances share one read. */
    GamepadSource.prototype.read = function (time) {
        if (!this.hasPads) {
            return [];
        }
        if (time === this.cachedTime) {
            return this.cached;
        }
        var pads = [];
        // Rebuilt each read so emptied slots drop out.
        var slots = {};
        var gamepads = readNavigatorGamepads();
        for (var i = 0; i < gamepads.length; i++) {
            var pad = gamepads[i];
            if (!pad || !pad.connected) {
                continue;
            }
            var prev = this.slots[pad.index];
            var slot = prev && prev.id === pad.id
                ? prev
                : { deviceId: this.nextDeviceId++, id: pad.id };
            slots[pad.index] = slot;
            pads.push(toPadState(slot.deviceId, pad));
        }
        this.slots = slots;
        this.hasPads = pads.length > 0;
        this.cachedTime = time;
        this.cached = pads;
        return pads;
    };
    return GamepadSource;
}());
var gamepadSource = new GamepadSource();
/**
 * Per-Rive-instance gamepad bridge driving a single state machine. Tracks what that state
 * machine has been sent and submits only the difference, so after a pause it catches up
 * without duplicate connected events.
 */
var GamepadInteractions = /** @class */ (function () {
    function GamepadInteractions(params) {
        this.params = params;
        this.encoder = new _gamepadBatchEncoder__WEBPACK_IMPORTED_MODULE_0__.GamepadBatchEncoder();
        // deviceId -> values last sent to `stateMachine`.
        this.lastSentPads = new Map();
        this.submitFailures = 0;
        gamepadSource.subscribe();
    }
    /** Poll, diff and submit one batch. Call once per frame before advancing. */
    GamepadInteractions.prototype.handleGamepadInputs = function (time, stateMachine) {
        if (!stateMachine) {
            return;
        }
        if (stateMachine !== this.stateMachine) {
            // A new state machine knows no devices yet; resend connected records.
            this.stateMachine = stateMachine;
            this.lastSentPads.clear();
            this.submitFailures = 0;
        }
        if (this.submitFailures >= MAX_SUBMIT_FAILURES) {
            return;
        }
        var pads = gamepadSource.read(time);
        // Nothing connected and nothing left to disconnect.
        if (pads.length === 0 && this.lastSentPads.size === 0) {
            return;
        }
        if (this.params.requireFocus && !this.params.isFocusWithin()) {
            // Keep devices connected but release everything they hold.
            pads = pads.map(restState);
        }
        this.encoder.begin();
        this.encodeDiff(pads);
        if (this.encoder.isEmpty) {
            return;
        }
        if (stateMachine.submitGamepadsFromBuffer(this.encoder.end())) {
            this.submitFailures = 0;
            return;
        }
        // The core stops at the first bad record, so resend connected records next
        // frame rather than updates for devices it may never have seen.
        this.lastSentPads.clear();
        if (++this.submitFailures >= MAX_SUBMIT_FAILURES) {
            console.error("[Rive] Gamepad input was rejected by the state machine " +
                "".concat(MAX_SUBMIT_FAILURES, " times in a row; gamepad input is disabled for it."));
        }
    };
    GamepadInteractions.prototype.dispose = function () {
        this.stateMachine = undefined;
        this.lastSentPads.clear();
        gamepadSource.unsubscribe();
    };
    /** Writes records that bring `lastSentPads` up to `pads`, updating it as it goes. */
    GamepadInteractions.prototype.encodeDiff = function (pads) {
        var _this = this;
        var present = {};
        for (var i = 0; i < pads.length; i++) {
            var pad = pads[i];
            present[pad.deviceId] = true;
            var prev = this.lastSentPads.get(pad.deviceId);
            if (!prev) {
                // Connect at rest so inputs already held fire as updates.
                prev = restState(pad);
                this.encoder.connected(pad.deviceId, pad.mapping, prev.buttons, prev.axes);
                this.lastSentPads.set(pad.deviceId, prev);
            }
            this.encodeChanges(pad.deviceId, _gamepadBatchEncoder__WEBPACK_IMPORTED_MODULE_0__.GamepadChangeKind.Button, prev.buttons, pad.buttons);
            this.encodeChanges(pad.deviceId, _gamepadBatchEncoder__WEBPACK_IMPORTED_MODULE_0__.GamepadChangeKind.Axis, prev.axes, pad.axes);
        }
        this.lastSentPads.forEach(function (_, deviceId) {
            if (!present[deviceId]) {
                _this.encoder.disconnected(deviceId);
                _this.lastSentPads.delete(deviceId);
            }
        });
    };
    GamepadInteractions.prototype.encodeChanges = function (deviceId, kind, prev, next) {
        for (var i = 0; i < next.length; i++) {
            var value = next[i];
            if (value !== prev[i]) {
                this.encoder.update(deviceId, kind, i, value);
                prev[i] = value;
            }
        }
    };
    return GamepadInteractions;
}());



/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GAMEPAD_BATCH_VERSION: () => (/* binding */ GAMEPAD_BATCH_VERSION),
/* harmony export */   GAMEPAD_MAX_AXES: () => (/* binding */ GAMEPAD_MAX_AXES),
/* harmony export */   GAMEPAD_MAX_BUTTONS: () => (/* binding */ GAMEPAD_MAX_BUTTONS),
/* harmony export */   GamepadBatchEncoder: () => (/* binding */ GamepadBatchEncoder),
/* harmony export */   GamepadChangeKind: () => (/* binding */ GamepadChangeKind),
/* harmony export */   GamepadMappingKind: () => (/* binding */ GamepadMappingKind),
/* harmony export */   GamepadRecordType: () => (/* binding */ GamepadRecordType)
/* harmony export */ });
/** Must match `rive::kGamepadBatchWireVersion` (runtime/include/rive/input/gamepad_batch.hpp). */
var GAMEPAD_BATCH_VERSION = 2;
var GAMEPAD_MAX_BUTTONS = 32;
var GAMEPAD_MAX_AXES = 16;
// Byte sizes of the wire fields/records.
var VERSION_SIZE = 4; // u32
var VALUE_SIZE = 4; // f32 button/axis value
// type(1) + deviceId(4) + mapping(1) + nButtons(1) + nAxes(1) + padding(1); values follow
var CONNECTED_HEADER_SIZE = 9;
// type(1) + deviceId(4) + nChanges(1) + kind(1) + index(1) + value(4)
// Always 12B because we send one change per event, but we could revisit to send larger updates.
var UPDATE_RECORD_SIZE = 12;
// type(1) + deviceId(4)
var DISCONNECTED_RECORD_SIZE = 5;
/** C++ `rive::GamepadRecordType`. */
var GamepadRecordType;
(function (GamepadRecordType) {
    GamepadRecordType[GamepadRecordType["Connected"] = 0] = "Connected";
    GamepadRecordType[GamepadRecordType["Update"] = 1] = "Update";
    GamepadRecordType[GamepadRecordType["Disconnected"] = 2] = "Disconnected";
})(GamepadRecordType || (GamepadRecordType = {}));
/** C++ `rive::GamepadInputChangeKind`. */
var GamepadChangeKind;
(function (GamepadChangeKind) {
    GamepadChangeKind[GamepadChangeKind["Button"] = 0] = "Button";
    GamepadChangeKind[GamepadChangeKind["Axis"] = 1] = "Axis";
})(GamepadChangeKind || (GamepadChangeKind = {}));
/** C++ `rive::GamepadMappingKind`. */
var GamepadMappingKind;
(function (GamepadMappingKind) {
    GamepadMappingKind[GamepadMappingKind["Standard"] = 0] = "Standard";
    GamepadMappingKind[GamepadMappingKind["Unknown"] = 1] = "Unknown";
})(GamepadMappingKind || (GamepadMappingKind = {}));
/**
 * Builds buffer to send to the state machine for gamepad input connection/updates/disconnect.
 *
 * Each `update` record carries a single change: the core
 * applies and dispatches records in order, so N single-change records in one batch behave like
 * N separate submits.
 *
 * `end()` returns a view into a reused scratch buffer, valid until the next `begin()`.
 */
var GamepadBatchEncoder = /** @class */ (function () {
    function GamepadBatchEncoder(initialCapacity) {
        if (initialCapacity === void 0) { initialCapacity = 256; }
        this.offset = 0;
        this.buffer = new ArrayBuffer(initialCapacity);
        this.view = new DataView(this.buffer);
        this.bytes = new Uint8Array(this.buffer);
    }
    GamepadBatchEncoder.prototype.begin = function () {
        this.offset = 0;
        this.ensure(VERSION_SIZE);
        this.writeU32(GAMEPAD_BATCH_VERSION);
    };
    Object.defineProperty(GamepadBatchEncoder.prototype, "isEmpty", {
        /** True when no records were written since `begin()`. */
        get: function () {
            return this.offset <= VERSION_SIZE;
        },
        enumerable: false,
        configurable: true
    });
    /** Set up buffer size/initialized values for a connected device */
    GamepadBatchEncoder.prototype.connected = function (deviceId, mapping, buttonValues, axes) {
        var nButtons = Math.min(buttonValues.length, GAMEPAD_MAX_BUTTONS);
        var nAxes = Math.min(axes.length, GAMEPAD_MAX_AXES);
        this.ensure(CONNECTED_HEADER_SIZE + (nButtons + nAxes) * VALUE_SIZE);
        this.writeU8(GamepadRecordType.Connected);
        this.writeI32(deviceId);
        this.writeU8(mapping);
        this.writeU8(nButtons);
        this.writeU8(nAxes);
        this.writeU8(0); // padding
        for (var i = 0; i < nButtons; i++) {
            this.writeF32(buttonValues[i]);
        }
        for (var i = 0; i < nAxes; i++) {
            this.writeF32(axes[i]);
        }
    };
    /**  */
    GamepadBatchEncoder.prototype.update = function (deviceId, kind, index, value) {
        this.ensure(UPDATE_RECORD_SIZE);
        this.writeU8(GamepadRecordType.Update);
        this.writeI32(deviceId);
        this.writeU8(1); // one change per record
        this.writeU8(kind);
        this.writeU8(index);
        this.writeF32(value);
    };
    GamepadBatchEncoder.prototype.disconnected = function (deviceId) {
        this.ensure(DISCONNECTED_RECORD_SIZE);
        this.writeU8(GamepadRecordType.Disconnected);
        this.writeI32(deviceId);
    };
    GamepadBatchEncoder.prototype.end = function () {
        return this.bytes.subarray(0, this.offset);
    };
    /** ---------------- Helper/private methods ---------------- */
    // The below write* methods write a value to the buffer and increment the offset position in our central buffer
    GamepadBatchEncoder.prototype.writeU8 = function (value) {
        this.view.setUint8(this.offset, value);
        this.offset += 1;
    };
    GamepadBatchEncoder.prototype.writeU32 = function (value) {
        this.view.setUint32(this.offset, value, true);
        this.offset += 4;
    };
    GamepadBatchEncoder.prototype.writeI32 = function (value) {
        this.view.setInt32(this.offset, value, true);
        this.offset += 4;
    };
    GamepadBatchEncoder.prototype.writeF32 = function (value) {
        this.view.setFloat32(this.offset, value, true);
        this.offset += 4;
    };
    // Increase the byte buffer size if necessary
    GamepadBatchEncoder.prototype.ensure = function (additional) {
        var required = this.offset + additional;
        if (required <= this.buffer.byteLength) {
            return;
        }
        var capacity = this.buffer.byteLength * 2;
        while (capacity < required) {
            capacity *= 2;
        }
        var grown = new ArrayBuffer(capacity);
        var grownBytes = new Uint8Array(grown);
        grownBytes.set(this.bytes.subarray(0, this.offset));
        this.buffer = grown;
        this.view = new DataView(grown);
        this.bytes = grownBytes;
    };
    return GamepadBatchEncoder;
}());



/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLANK_URL: () => (/* binding */ BLANK_URL),
/* harmony export */   sanitizeUrl: () => (/* binding */ sanitizeUrl)
/* harmony export */ });
// Reference: https://github.com/braintree/sanitize-url/tree/main
var invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
var htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
var htmlCtrlEntityRegex = /&(newline|tab);/gi;
var ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
var urlSchemeRegex = /^.+(:|&colon;)/gim;
var relativeFirstCharacters = [".", "/"];
var BLANK_URL = "about:blank";
function isRelativeUrlWithoutProtocol(url) {
    return relativeFirstCharacters.indexOf(url[0]) > -1;
}
// adapted from https://stackoverflow.com/a/29824550/2601552
function decodeHtmlCharacters(str) {
    var removedNullByte = str.replace(ctrlCharactersRegex, "");
    return removedNullByte.replace(htmlEntitiesRegex, function (match, dec) {
        return String.fromCharCode(dec);
    });
}
function sanitizeUrl(url) {
    if (!url) {
        return BLANK_URL;
    }
    var sanitizedUrl = decodeHtmlCharacters(url)
        .replace(htmlCtrlEntityRegex, "")
        .replace(ctrlCharactersRegex, "")
        .trim();
    if (!sanitizedUrl) {
        return BLANK_URL;
    }
    if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
        return sanitizedUrl;
    }
    var urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);
    if (!urlSchemeParseResults) {
        return sanitizedUrl;
    }
    var urlScheme = urlSchemeParseResults[0];
    if (invalidProtocolRegex.test(urlScheme)) {
        return BLANK_URL;
    }
    return sanitizedUrl;
}


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudioAssetWrapper: () => (/* binding */ AudioAssetWrapper),
/* harmony export */   AudioWrapper: () => (/* binding */ AudioWrapper),
/* harmony export */   CustomFileAssetLoaderWrapper: () => (/* binding */ CustomFileAssetLoaderWrapper),
/* harmony export */   FileAssetWrapper: () => (/* binding */ FileAssetWrapper),
/* harmony export */   FileFinalizer: () => (/* binding */ FileFinalizer),
/* harmony export */   FontAssetWrapper: () => (/* binding */ FontAssetWrapper),
/* harmony export */   FontWrapper: () => (/* binding */ FontWrapper),
/* harmony export */   ImageAssetWrapper: () => (/* binding */ ImageAssetWrapper),
/* harmony export */   ImageWrapper: () => (/* binding */ ImageWrapper),
/* harmony export */   createFinalization: () => (/* binding */ createFinalization),
/* harmony export */   finalizationRegistry: () => (/* binding */ finalizationRegistry)
/* harmony export */ });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FileFinalizer = /** @class */ (function () {
    function FileFinalizer(file, session) {
        if (session === void 0) { session = null; }
        this.selfUnref = false;
        this._file = file;
        this._session = session;
    }
    FileFinalizer.prototype.unref = function () {
        if (this._file) {
            this._file.unref();
        }
        // After the file, never before: the file's resources belong to the session.
        if (this._session) {
            this._session.delete();
            this._session = null;
        }
    };
    // Disarms the GC path for a file cleanup() already released.
    FileFinalizer.prototype.release = function () {
        this._file = null;
        this._session = null;
    };
    return FileFinalizer;
}());
var ObjectFinalizer = /** @class */ (function () {
    function ObjectFinalizer(finalizableObject) {
        this._finalizableObject = finalizableObject;
    }
    ObjectFinalizer.prototype.unref = function () {
        this._finalizableObject.unref();
    };
    return ObjectFinalizer;
}());
var AssetWrapper = /** @class */ (function () {
    function AssetWrapper() {
        this.selfUnref = false;
    }
    AssetWrapper.prototype.unref = function () { };
    return AssetWrapper;
}());
var ImageWrapper = /** @class */ (function (_super) {
    __extends(ImageWrapper, _super);
    function ImageWrapper(image) {
        var _this = _super.call(this) || this;
        _this._nativeImage = image;
        return _this;
    }
    Object.defineProperty(ImageWrapper.prototype, "nativeImage", {
        get: function () {
            return this._nativeImage;
        },
        enumerable: false,
        configurable: true
    });
    ImageWrapper.prototype.unref = function () {
        if (this.selfUnref) {
            this._nativeImage.unref();
        }
    };
    return ImageWrapper;
}(AssetWrapper));
var AudioWrapper = /** @class */ (function (_super) {
    __extends(AudioWrapper, _super);
    function AudioWrapper(audio) {
        var _this = _super.call(this) || this;
        _this._nativeAudio = audio;
        return _this;
    }
    Object.defineProperty(AudioWrapper.prototype, "nativeAudio", {
        get: function () {
            return this._nativeAudio;
        },
        enumerable: false,
        configurable: true
    });
    AudioWrapper.prototype.unref = function () {
        if (this.selfUnref) {
            this._nativeAudio.unref();
        }
    };
    return AudioWrapper;
}(AssetWrapper));
var FontWrapper = /** @class */ (function (_super) {
    __extends(FontWrapper, _super);
    function FontWrapper(font) {
        var _this = _super.call(this) || this;
        _this._nativeFont = font;
        return _this;
    }
    Object.defineProperty(FontWrapper.prototype, "nativeFont", {
        get: function () {
            return this._nativeFont;
        },
        enumerable: false,
        configurable: true
    });
    FontWrapper.prototype.unref = function () {
        if (this.selfUnref) {
            this._nativeFont.unref();
        }
    };
    return FontWrapper;
}(AssetWrapper));
var CustomFileAssetLoaderWrapper = /** @class */ (function () {
    function CustomFileAssetLoaderWrapper(runtime, loaderCallback, session) {
        if (session === void 0) { session = null; }
        this._assetLoaderCallback = loaderCallback;
        this._session = session;
        this.assetLoader = new runtime.CustomFileAssetLoader({
            loadContents: this.loadContents.bind(this),
        });
    }
    CustomFileAssetLoaderWrapper.prototype.loadContents = function (asset, bytes) {
        var assetWrapper;
        if (asset.isImage) {
            assetWrapper = new ImageAssetWrapper(asset, this._session);
        }
        else if (asset.isAudio) {
            assetWrapper = new AudioAssetWrapper(asset, this._session);
        }
        else if (asset.isFont) {
            assetWrapper = new FontAssetWrapper(asset, this._session);
        }
        else {
            return false;
        }
        return this._assetLoaderCallback(assetWrapper, bytes);
    };
    return CustomFileAssetLoaderWrapper;
}());
/**
 * Rive class representing a FileAsset with relevant metadata fields to describe
 * an asset associated wtih the Rive File
 */
var FileAssetWrapper = /** @class */ (function () {
    function FileAssetWrapper(nativeAsset, session) {
        if (session === void 0) { session = null; }
        this._nativeFileAsset = nativeAsset;
        this._session = session;
    }
    FileAssetWrapper.prototype.decode = function (bytes) {
        // The session travels with the asset so a deferred file's assets are
        // session-typed without the caller needing to know the file's rendering mode.
        this._nativeFileAsset.decode(bytes, this._session);
    };
    Object.defineProperty(FileAssetWrapper.prototype, "name", {
        get: function () {
            return this._nativeFileAsset.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAssetWrapper.prototype, "fileExtension", {
        get: function () {
            return this._nativeFileAsset.fileExtension;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAssetWrapper.prototype, "uniqueFilename", {
        get: function () {
            return this._nativeFileAsset.uniqueFilename;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAssetWrapper.prototype, "isAudio", {
        get: function () {
            return this._nativeFileAsset.isAudio;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAssetWrapper.prototype, "isImage", {
        get: function () {
            return this._nativeFileAsset.isImage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAssetWrapper.prototype, "isFont", {
        get: function () {
            return this._nativeFileAsset.isFont;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAssetWrapper.prototype, "cdnUuid", {
        get: function () {
            return this._nativeFileAsset.cdnUuid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAssetWrapper.prototype, "nativeFileAsset", {
        get: function () {
            return this._nativeFileAsset;
        },
        enumerable: false,
        configurable: true
    });
    return FileAssetWrapper;
}());
/**
 * Rive class extending the FileAsset that exposes a `setRenderImage()` API with a
 * decoded Image (via the `decodeImage()` API) to set a new Image on the Rive FileAsset
 */
var ImageAssetWrapper = /** @class */ (function (_super) {
    __extends(ImageAssetWrapper, _super);
    function ImageAssetWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageAssetWrapper.prototype.setRenderImage = function (image) {
        this._nativeFileAsset.setRenderImage(image.nativeImage);
    };
    return ImageAssetWrapper;
}(FileAssetWrapper));
/**
 * Rive class extending the FileAsset that exposes a `setAudioSource()` API with a
 * decoded Audio (via the `decodeAudio()` API) to set a new Audio on the Rive FileAsset
 */
var AudioAssetWrapper = /** @class */ (function (_super) {
    __extends(AudioAssetWrapper, _super);
    function AudioAssetWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioAssetWrapper.prototype.setAudioSource = function (audio) {
        this._nativeFileAsset.setAudioSource(audio.nativeAudio);
    };
    return AudioAssetWrapper;
}(FileAssetWrapper));
/**
 * Rive class extending the FileAsset that exposes a `setFont()` API with a
 * decoded Font (via the `decodeFont()` API) to set a new Font on the Rive FileAsset
 */
var FontAssetWrapper = /** @class */ (function (_super) {
    __extends(FontAssetWrapper, _super);
    function FontAssetWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FontAssetWrapper.prototype.setFont = function (font) {
        this._nativeFileAsset.setFont(font.nativeFont);
    };
    return FontAssetWrapper;
}(FileAssetWrapper));
var FakeFinalizationRegistry = /** @class */ (function () {
    function FakeFinalizationRegistry(_) {
    }
    FakeFinalizationRegistry.prototype.register = function (object) {
        object.selfUnref = true;
    };
    FakeFinalizationRegistry.prototype.unregister = function (_) { };
    return FakeFinalizationRegistry;
}());
var MyFinalizationRegistry = typeof FinalizationRegistry !== "undefined"
    ? FinalizationRegistry
    : FakeFinalizationRegistry;
var finalizationRegistry = new MyFinalizationRegistry(function (ob) {
    ob === null || ob === void 0 ? void 0 : ob.unref();
});
var createFinalization = function (target, finalizable) {
    var finalizer = new ObjectFinalizer(finalizable);
    finalizationRegistry.register(target, finalizer);
};



/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RiveFont: () => (/* binding */ RiveFont)
/* harmony export */ });
/* harmony import */ var _runtimeLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

// Class to manage fallback fonts for Rive.
var RiveFont = /** @class */ (function () {
    // Class is never instantiated
    function RiveFont() {
    }
    /**
     * Set a callback to dynamically set a list of fallback fonts based on the missing glyph and/or style of the default font.
     * Set null to clear the callback.
     * @param fontCallback Callback to set a list of fallback fonts.
     */
    RiveFont.setFallbackFontCallback = function (fontCallback) {
        RiveFont._fallbackFontCallback = fontCallback !== null && fontCallback !== void 0 ? fontCallback : null;
        RiveFont._wireFallbackProc();
    };
    /**
     * Set the preferred languages (BCP 47 tags, most preferred first) that text
     * without a `language` of its own shapes and falls back with, like
     * `navigator.languages` is for a page. Pass nothing to follow
     * `navigator.languages`, which is also what happens until this is called,
     * including when the browser's languages change.
     * @param languages The languages to use, or nothing for the browser's.
     */
    RiveFont.setSystemLanguages = function (languages) {
        _runtimeLoader__WEBPACK_IMPORTED_MODULE_0__.RuntimeLoader.setSystemLanguages(languages !== null && languages !== void 0 ? languages : null);
    };
    // Get the pointer value to the Embind Font object from FontWrapper
    RiveFont._fontToPtr = function (fontWrapper) {
        var _a;
        if (fontWrapper == null)
            return null;
        var embindFont = fontWrapper.nativeFont;
        var ptr = (_a = embindFont === null || embindFont === void 0 ? void 0 : embindFont.ptr) === null || _a === void 0 ? void 0 : _a.call(embindFont);
        return ptr !== null && ptr !== void 0 ? ptr : null;
    };
    RiveFont._getFallbackPtr = function (fonts, index) {
        if (index < 0 || index >= fonts.length)
            return null;
        return RiveFont._fontToPtr(fonts[index]);
    };
    // Create the callback Rive expects to use for fallback fonts (regardless if set via a user-supplied static list, or callback)
    // 1. Ensure WASM is ready
    // 2. Bias for checking user callback over static list of fonts and pass it down to Rive to store as reference
    //    - When calling the user callback, check if we have any fonts left to check, and if not, return null to indicate there are no more fallbacks to try.
    //    - If the user callback returns an array of fonts, pass the pointer value to Rive of the font to try
    // 3. If no callback is provided, or the callback returns null, try the static list of fonts if they set any
    // 4. If no fallback method is set, return null.
    RiveFont._wireFallbackProc = function () {
        _runtimeLoader__WEBPACK_IMPORTED_MODULE_0__.RuntimeLoader.getInstance(function (rive) {
            var cb = RiveFont._fallbackFontCallback;
            if (cb) {
                rive.setFallbackFontCallback((function (missingGlyph, fallbackFontIndex, weight, languages) {
                    var fontsReturned = cb(missingGlyph, weight, languages !== null && languages !== void 0 ? languages : []);
                    if (fontsReturned) {
                        if (Array.isArray(fontsReturned)) {
                            return RiveFont._getFallbackPtr(fontsReturned, fallbackFontIndex);
                        }
                        // If the user callback only returns a single font, provide it to Rive the first time, otherwise if Rive
                        // calls back a second time, return null to indicate there are no more fallbacks to try.
                        return fallbackFontIndex === 0 ? RiveFont._fontToPtr(fontsReturned) : null;
                    }
                    return null;
                }));
            }
            else {
                rive.setFallbackFontCallback(null);
            }
        });
    };
    RiveFont._fallbackFontCallback = null;
    return RiveFont;
}());



/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReplayPacer: () => (/* binding */ ReplayPacer)
/* harmony export */ });
var kRefreshSamples = 15;
// The frames the worker's replay time averages over, plus the three still in
// flight when the cadence changes.
var kSettleFrames = 12;
var kProbeAfterMs = 1000;
var kMaxProbeAfterMs = 16000;
// A worker only slightly slower than its cadence fills its queue now and then,
// a worker that keeps up almost never.
var kBackupWindow = 60;
var kSaturatedBackups = 3;
var median = function (values) {
    var sorted = values.slice().sort(function (a, b) { return a - b; });
    return sorted[sorted.length >> 1];
};
/**
 * Paces recording to a replay worker slower than the display. Recording as
 * soon as its queue frees sends frames in bursts, so instead they go out every
 * N refreshes, with N following the worker's recent replay time.
 */
var ReplayPacer = /** @class */ (function () {
    function ReplayPacer() {
        this.lastTime = 0;
        this.lastRecord = 0;
        this.intervals = [];
        this.divisor = 1;
        // Frames recorded since the divisor changed, which the replay time still
        // averages in.
        this.settle = 0;
        this.nextProbe = 0;
        this.probing = false;
        // Failed probes back off, since each one costs a few uneven frames.
        this.probeAfter = kProbeAfterMs;
        // Whether the worker's queue filled since the last decision.
        this.backedUp = false;
        this.recentBackups = [];
    }
    /**
     * Called on every animation frame. Returns whether this one should record,
     * given the worker's replay time and whether its queue has room.
     */
    ReplayPacer.prototype.shouldRecord = function (time, replayMs, accepts) {
        if (this.lastTime && time > this.lastTime) {
            this.intervals.push(time - this.lastTime);
            if (this.intervals.length > kRefreshSamples) {
                this.intervals.shift();
            }
        }
        this.lastTime = time;
        if (!accepts) {
            // A canvas the worker has yet to take refuses frames too.
            if (replayMs > 0) {
                this.backedUp = true;
            }
            return false;
        }
        if (replayMs > 0 && this.intervals.length > 0) {
            var refresh = median(this.intervals);
            if (this.settle === 0) {
                this.adapt(time, replayMs / refresh);
            }
            if (this.divisor > 1 &&
                time - this.lastRecord < (this.divisor - 0.5) * refresh) {
                return false;
            }
        }
        this.lastRecord = time;
        this.settle = Math.max(0, this.settle - 1);
        return true;
    };
    ReplayPacer.prototype.adapt = function (time, ratio) {
        var divisor = this.divisor;
        var backedUp = this.backedUp;
        this.backedUp = false;
        this.recentBackups.push(backedUp);
        if (this.recentBackups.length > kBackupWindow) {
            this.recentBackups.shift();
        }
        var saturated = this.recentBackups.filter(Boolean).length >= kSaturatedBackups;
        var lagging = ratio > divisor * 1.1;
        // A worker that keeps up never fills its queue, however long each frame
        // takes to finish, so only a lag with a full queue slows the cadence. A
        // probe fails on either, since it settled at the new cadence.
        if (this.probing
            ? lagging || backedUp
            : (lagging && backedUp) || (ratio > divisor && saturated)) {
            this.probeAfter = this.probing
                ? Math.min(this.probeAfter * 2, kMaxProbeAfterMs)
                : kProbeAfterMs;
            // At most doubling, since settling at the cadence one bad replay time
            // asks for can hold recording back for seconds.
            this.setDivisor(time, Math.min(Math.max(divisor + 1, Math.ceil(ratio)), divisor * 2));
        }
        else if (ratio < (divisor - 1) * 0.9) {
            // Paced frames no longer overlap, so their replay time is a ceiling
            // and a faster cadence under it is safe.
            this.probeAfter = kProbeAfterMs;
            this.setDivisor(time, Math.max(1, Math.ceil(ratio / 0.9)));
        }
        else if (this.probing) {
            // A worker only slightly too slow takes a while to fill its queue.
            if (this.recentBackups.length >= kBackupWindow) {
                this.probing = false;
                this.probeAfter = kProbeAfterMs;
            }
        }
        else if (divisor > 1 && time >= this.nextProbe) {
            // Frames that overlap on the GPU can keep up with a cadence shorter
            // than one frame's replay, which only trying it shows.
            this.setDivisor(time, divisor - 1);
            this.probing = true;
        }
    };
    ReplayPacer.prototype.setDivisor = function (time, divisor) {
        this.divisor = divisor;
        this.settle = kSettleFrames;
        this.probing = false;
        this.backedUp = false;
        this.recentBackups = [];
        this.nextProbe = time + this.probeAfter;
    };
    return ReplayPacer;
}());



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alignment: () => (/* binding */ Alignment),
/* harmony export */   DataEnum: () => (/* binding */ DataEnum),
/* harmony export */   DataType: () => (/* binding */ DataType),
/* harmony export */   DeprecationKeys: () => (/* binding */ DeprecationKeys),
/* harmony export */   DrawOptimizationOptions: () => (/* binding */ DrawOptimizationOptions),
/* harmony export */   EventType: () => (/* binding */ EventType),
/* harmony export */   Fit: () => (/* binding */ Fit),
/* harmony export */   Layout: () => (/* binding */ Layout),
/* harmony export */   LoopType: () => (/* binding */ LoopType),
/* harmony export */   Rive: () => (/* binding */ Rive),
/* harmony export */   RiveEventType: () => (/* binding */ RiveEventType),
/* harmony export */   RiveFile: () => (/* binding */ RiveFile),
/* harmony export */   RiveFont: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.RiveFont),
/* harmony export */   RuntimeLoader: () => (/* reexport safe */ _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader),
/* harmony export */   SemanticMode: () => (/* reexport safe */ _semantics__WEBPACK_IMPORTED_MODULE_2__.SemanticMode),
/* harmony export */   StateMachineInput: () => (/* binding */ StateMachineInput),
/* harmony export */   StateMachineInputType: () => (/* binding */ StateMachineInputType),
/* harmony export */   Testing: () => (/* binding */ Testing),
/* harmony export */   ViewModel: () => (/* binding */ ViewModel),
/* harmony export */   ViewModelInstance: () => (/* binding */ ViewModelInstance),
/* harmony export */   ViewModelInstanceArtboard: () => (/* binding */ ViewModelInstanceArtboard),
/* harmony export */   ViewModelInstanceAssetFont: () => (/* binding */ ViewModelInstanceAssetFont),
/* harmony export */   ViewModelInstanceAssetImage: () => (/* binding */ ViewModelInstanceAssetImage),
/* harmony export */   ViewModelInstanceBoolean: () => (/* binding */ ViewModelInstanceBoolean),
/* harmony export */   ViewModelInstanceColor: () => (/* binding */ ViewModelInstanceColor),
/* harmony export */   ViewModelInstanceEnum: () => (/* binding */ ViewModelInstanceEnum),
/* harmony export */   ViewModelInstanceList: () => (/* binding */ ViewModelInstanceList),
/* harmony export */   ViewModelInstanceNumber: () => (/* binding */ ViewModelInstanceNumber),
/* harmony export */   ViewModelInstanceString: () => (/* binding */ ViewModelInstanceString),
/* harmony export */   ViewModelInstanceTrigger: () => (/* binding */ ViewModelInstanceTrigger),
/* harmony export */   ViewModelInstanceValue: () => (/* binding */ ViewModelInstanceValue),
/* harmony export */   decodeAudio: () => (/* binding */ decodeAudio),
/* harmony export */   decodeFont: () => (/* binding */ decodeFont),
/* harmony export */   decodeImage: () => (/* binding */ decodeImage)
/* harmony export */ });
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _semantics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




var RiveError = /** @class */ (function (_super) {
    __extends(RiveError, _super);
    function RiveError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isHandledError = true;
        return _this;
    }
    return RiveError;
}(Error));


// #regions helpers
var resolveErrorMessage = function (error) {
    return error && error.isHandledError
        ? error.message
        : "Problem loading file; may be corrupt!";
};
// #region layout
// Fit options for the canvas
var Fit;
(function (Fit) {
    Fit["Cover"] = "cover";
    Fit["Contain"] = "contain";
    Fit["Fill"] = "fill";
    Fit["FitWidth"] = "fitWidth";
    Fit["FitHeight"] = "fitHeight";
    Fit["None"] = "none";
    Fit["ScaleDown"] = "scaleDown";
    Fit["Layout"] = "layout";
})(Fit || (Fit = {}));
// Alignment options for the canvas
var Alignment;
(function (Alignment) {
    Alignment["Center"] = "center";
    Alignment["TopLeft"] = "topLeft";
    Alignment["TopCenter"] = "topCenter";
    Alignment["TopRight"] = "topRight";
    Alignment["CenterLeft"] = "centerLeft";
    Alignment["CenterRight"] = "centerRight";
    Alignment["BottomLeft"] = "bottomLeft";
    Alignment["BottomCenter"] = "bottomCenter";
    Alignment["BottomRight"] = "bottomRight";
})(Alignment || (Alignment = {}));
// Drawing optimization options
var DrawOptimizationOptions;
(function (DrawOptimizationOptions) {
    DrawOptimizationOptions["AlwaysDraw"] = "alwaysDraw";
    DrawOptimizationOptions["DrawOnChanged"] = "drawOnChanged";
})(DrawOptimizationOptions || (DrawOptimizationOptions = {}));
// Alignment options for Rive animations in a HTML canvas
var Layout = /** @class */ (function () {
    function Layout(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.fit = (_a = params === null || params === void 0 ? void 0 : params.fit) !== null && _a !== void 0 ? _a : Fit.Contain;
        this.alignment = (_b = params === null || params === void 0 ? void 0 : params.alignment) !== null && _b !== void 0 ? _b : Alignment.Center;
        this.layoutScaleFactor = (_c = params === null || params === void 0 ? void 0 : params.layoutScaleFactor) !== null && _c !== void 0 ? _c : 1;
        this.minX = (_d = params === null || params === void 0 ? void 0 : params.minX) !== null && _d !== void 0 ? _d : 0;
        this.minY = (_e = params === null || params === void 0 ? void 0 : params.minY) !== null && _e !== void 0 ? _e : 0;
        this.maxX = (_f = params === null || params === void 0 ? void 0 : params.maxX) !== null && _f !== void 0 ? _f : 0;
        this.maxY = (_g = params === null || params === void 0 ? void 0 : params.maxY) !== null && _g !== void 0 ? _g : 0;
    }
    // Alternative constructor to build a Layout from an interface/object
    Layout.new = function (_a) {
        var fit = _a.fit, alignment = _a.alignment, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        warnOnce(DeprecationKeys.legacyConstructors, "This function is deprecated: please use `new Layout({})` instead");
        return new Layout({ fit: fit, alignment: alignment, minX: minX, minY: minY, maxX: maxX, maxY: maxY });
    };
    /**
     * Makes a copy of the layout, replacing any specified parameters
     */
    Layout.prototype.copyWith = function (_a) {
        var fit = _a.fit, alignment = _a.alignment, layoutScaleFactor = _a.layoutScaleFactor, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        return new Layout({
            fit: fit !== null && fit !== void 0 ? fit : this.fit,
            alignment: alignment !== null && alignment !== void 0 ? alignment : this.alignment,
            layoutScaleFactor: layoutScaleFactor !== null && layoutScaleFactor !== void 0 ? layoutScaleFactor : this.layoutScaleFactor,
            minX: minX !== null && minX !== void 0 ? minX : this.minX,
            minY: minY !== null && minY !== void 0 ? minY : this.minY,
            maxX: maxX !== null && maxX !== void 0 ? maxX : this.maxX,
            maxY: maxY !== null && maxY !== void 0 ? maxY : this.maxY,
        });
    };
    // Returns fit for the Wasm runtime format
    Layout.prototype.runtimeFit = function (rive) {
        if (this.cachedRuntimeFit)
            return this.cachedRuntimeFit;
        var fit;
        if (this.fit === Fit.Cover)
            fit = rive.Fit.cover;
        else if (this.fit === Fit.Contain)
            fit = rive.Fit.contain;
        else if (this.fit === Fit.Fill)
            fit = rive.Fit.fill;
        else if (this.fit === Fit.FitWidth)
            fit = rive.Fit.fitWidth;
        else if (this.fit === Fit.FitHeight)
            fit = rive.Fit.fitHeight;
        else if (this.fit === Fit.ScaleDown)
            fit = rive.Fit.scaleDown;
        else if (this.fit === Fit.Layout)
            fit = rive.Fit.layout;
        else
            fit = rive.Fit.none;
        this.cachedRuntimeFit = fit;
        return fit;
    };
    // Returns alignment for the Wasm runtime format
    Layout.prototype.runtimeAlignment = function (rive) {
        if (this.cachedRuntimeAlignment)
            return this.cachedRuntimeAlignment;
        var alignment;
        if (this.alignment === Alignment.TopLeft)
            alignment = rive.Alignment.topLeft;
        else if (this.alignment === Alignment.TopCenter)
            alignment = rive.Alignment.topCenter;
        else if (this.alignment === Alignment.TopRight)
            alignment = rive.Alignment.topRight;
        else if (this.alignment === Alignment.CenterLeft)
            alignment = rive.Alignment.centerLeft;
        else if (this.alignment === Alignment.CenterRight)
            alignment = rive.Alignment.centerRight;
        else if (this.alignment === Alignment.BottomLeft)
            alignment = rive.Alignment.bottomLeft;
        else if (this.alignment === Alignment.BottomCenter)
            alignment = rive.Alignment.bottomCenter;
        else if (this.alignment === Alignment.BottomRight)
            alignment = rive.Alignment.bottomRight;
        else
            alignment = rive.Alignment.center;
        this.cachedRuntimeAlignment = alignment;
        return alignment;
    };
    return Layout;
}());

// #endregion
// #region runtime

// #endregion
// #region state machines
/**
 * @deprecated State machine inputs are deprecated and will be removed in a
 * future major version: please use data binding properties instead. See
 * {@link https://rive.app/docs/editor/data-binding/migration-guide#state-machine-inputs}
 * for how to migrate.
 */
var StateMachineInputType;
(function (StateMachineInputType) {
    StateMachineInputType[StateMachineInputType["Number"] = 56] = "Number";
    StateMachineInputType[StateMachineInputType["Trigger"] = 58] = "Trigger";
    StateMachineInputType[StateMachineInputType["Boolean"] = 59] = "Boolean";
})(StateMachineInputType || (StateMachineInputType = {}));
/**
 * An input for a state machine
 * @deprecated State machine inputs are deprecated and will be removed in a
 * future major version: please use data binding properties instead. See
 * {@link https://rive.app/docs/editor/data-binding/migration-guide#state-machine-inputs}
 * for how to migrate.
 */
var StateMachineInput = /** @class */ (function () {
    function StateMachineInput(type, runtimeInput) {
        this.type = type;
        this.runtimeInput = runtimeInput;
    }
    Object.defineProperty(StateMachineInput.prototype, "name", {
        /**
         * Returns the name of the input
         */
        get: function () {
            return this.runtimeInput.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateMachineInput.prototype, "value", {
        /**
         * Returns the current value of the input
         */
        get: function () {
            return this.runtimeInput.value;
        },
        /**
         * Sets the value of the input
         */
        set: function (value) {
            this.runtimeInput.value = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Fires a trigger; does nothing on Number or Boolean input types
     */
    StateMachineInput.prototype.fire = function () {
        if (this.type === StateMachineInputType.Trigger) {
            this.runtimeInput.fire();
        }
    };
    /**
     * Deletes the input
     */
    StateMachineInput.prototype.delete = function () {
        this.runtimeInput = null;
    };
    return StateMachineInput;
}());

/**
 * @deprecated Subscribing to Rive Events at runtime is deprecated and will be removed in a future major
 * version: please use data binding instead. See
 * {@link https://rive.app/docs/runtimes/web/rive-events} for how to migrate.
 */
var RiveEventType;
(function (RiveEventType) {
    RiveEventType[RiveEventType["General"] = 128] = "General";
    RiveEventType[RiveEventType["OpenUrl"] = 131] = "OpenUrl";
})(RiveEventType || (RiveEventType = {}));
var BaseArtboard = /** @class */ (function () {
    function BaseArtboard(_isBindableArtboard) {
        this.isBindableArtboard = false;
        this.isBindableArtboard = _isBindableArtboard;
    }
    return BaseArtboard;
}());
var Artboard = /** @class */ (function (_super) {
    __extends(Artboard, _super);
    function Artboard(artboard, _file) {
        var _this = _super.call(this, false) || this;
        _this.nativeArtboard = artboard;
        _this.file = _file;
        return _this;
    }
    return Artboard;
}(BaseArtboard));
var BindableArtboard = /** @class */ (function (_super) {
    __extends(BindableArtboard, _super);
    function BindableArtboard(artboard) {
        var _this = _super.call(this, true) || this;
        _this.selfUnref = false;
        _this.nativeArtboard = artboard;
        return _this;
    }
    Object.defineProperty(BindableArtboard.prototype, "viewModel", {
        set: function (value) {
            this.nativeViewModel = value.nativeInstance;
        },
        enumerable: false,
        configurable: true
    });
    BindableArtboard.prototype.destroy = function () {
        var _a;
        if (this.selfUnref) {
            this.nativeArtboard.unref();
            (_a = this.nativeViewModel) === null || _a === void 0 ? void 0 : _a.unref();
        }
    };
    return BindableArtboard;
}(BaseArtboard));
var StateMachine = /** @class */ (function () {
    /**
     * @constructor
     * @param stateMachine runtime state machine object
     * @param instance runtime state machine instance object
     */
    function StateMachine(stateMachine, runtime, playing, artboard) {
        this.stateMachine = stateMachine;
        this.playing = playing;
        this.artboard = artboard;
        /**
         * Caches the inputs from the runtime
         */
        this.inputs = [];
        this.instance = new runtime.StateMachineInstance(stateMachine, artboard);
        this.initInputs(runtime);
    }
    Object.defineProperty(StateMachine.prototype, "hasFocusNodes", {
        /**
         * Whether this state machine has focus nodes
         */
        get: function () {
            return this.instance.hasFocusNodes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateMachine.prototype, "name", {
        get: function () {
            return this.stateMachine.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StateMachine.prototype, "statesChanged", {
        /**
         * Returns a list of state names that have changed on this frame
         */
        get: function () {
            var names = [];
            for (var i = 0; i < this.instance.stateChangedCount(); i++) {
                names.push(this.instance.stateChangedNameByIndex(i));
            }
            return names;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Advances the state machine instance by a given time.
     * @param time - the time to advance the animation by in seconds
     */
    StateMachine.prototype.advance = function (time) {
        this.instance.advance(time);
    };
    /**
     * Advances the state machine instance by a given time and apply changes to artboard.
     * @param time - the time to advance the animation by in seconds
     */
    StateMachine.prototype.advanceAndApply = function (time) {
        this.instance.advanceAndApply(time);
    };
    /**
     * Enables semantic tree tracking for this state machine instance.
     */
    StateMachine.prototype.enableSemantics = function () {
        this.instance.enableSemantics();
    };
    /**
     * Returns the incremental semantic diff since the last call, or null
     * if semantics is not enabled or nothing changed.
     */
    StateMachine.prototype.drainSemanticsDiff = function () {
        return this.instance.drainSemanticsDiff();
    };
    /**
     * Fire a semantic action (tap, increase, decrease) on a node.
     * @param nodeId - The semantic node ID to target
     * @param actionType - 0 = tap, 1 = increase, 2 = decrease
     */
    StateMachine.prototype.fireSemanticAction = function (nodeId, actionType) {
        this.instance.fireSemanticAction(nodeId, actionType);
    };
    /**
     * When tools that enable accessible experiences traverse elements with focus,
     * we should call this method to focus the semantic node. It will also trigger
     * focus on any Focus listeners for this node
     * @param nodeId ID of the Semantic Node to focus
     * @returns boolean - True if focus was set, false otherwise
     */
    StateMachine.prototype.focusSemanticNode = function (nodeId) {
        return this.instance.focusSemanticNode(nodeId);
    };
    /**
     * Returns the number of events reported from the last advance call
     * @returns Number of events reported
     */
    StateMachine.prototype.reportedEventCount = function () {
        return this.instance.reportedEventCount();
    };
    /**
     * Returns a RiveEvent object emitted from the last advance call at the given index
     * of a list of potentially multiple events. If an event at the index is not found,
     * undefined is returned.
     * @param i index of the event reported in a list of potentially multiple events
     * @returns RiveEvent or extended RiveEvent object returned, or undefined
     */
    StateMachine.prototype.reportedEventAt = function (i) {
        return this.instance.reportedEventAt(i);
    };
    /**
     * Fetches references to the state machine's inputs and caches them
     * @param runtime an instance of the runtime; needed for the SMIInput types
     */
    StateMachine.prototype.initInputs = function (runtime) {
        // Fetch the inputs from the runtime if we don't have them
        for (var i = 0; i < this.instance.inputCount(); i++) {
            var input = this.instance.input(i);
            this.inputs.push(this.mapRuntimeInput(input, runtime));
        }
    };
    /**
     * Maps a runtime input to it's appropriate type
     * @param input
     */
    StateMachine.prototype.mapRuntimeInput = function (input, runtime) {
        if (input.type === runtime.SMIInput.bool) {
            return new StateMachineInput(StateMachineInputType.Boolean, input.asBool());
        }
        else if (input.type === runtime.SMIInput.number) {
            return new StateMachineInput(StateMachineInputType.Number, input.asNumber());
        }
        else if (input.type === runtime.SMIInput.trigger) {
            return new StateMachineInput(StateMachineInputType.Trigger, input.asTrigger());
        }
    };
    /**
     * Deletes the backing Wasm state machine instance; once this is called, this
     * state machine is no more.
     */
    StateMachine.prototype.cleanup = function () {
        this.inputs.forEach(function (input) {
            input.delete();
        });
        this.inputs.length = 0;
        this.instance.delete();
    };
    StateMachine.prototype.bindViewModelInstance = function (viewModelInstance) {
        if (viewModelInstance.runtimeInstance != null) {
            this.instance.bindViewModelInstance(viewModelInstance.runtimeInstance);
        }
    };
    /**
     * Get metadata about the state of focus if applicable for this state machine.
     * @returns FocusState - { hasFocus: boolean, expectsKeyboardInput: boolean, expectsTextInput: boolean }
     */
    StateMachine.prototype.focusState = function () {
        return this.instance.focusState();
    };
    /**
     * Clear focus from the Rive focus node tree.
     */
    StateMachine.prototype.clearFocus = function () {
        this.instance.clearFocus();
    };
    return StateMachine;
}());
// #endregion
// #region animator
/**
 * Manages animation
 */
var Animator = /** @class */ (function () {
    /**
     * Constructs a new animator
     * @constructor
     * @param runtime Rive runtime; needed to instance animations & state machines
     * @param artboard the artboard that holds all animations and state machines
     * @param animations optional list of animations
     * @param stateMachines optional list of state machines
     */
    function Animator(runtime, artboard, eventManager, animations, stateMachines) {
        if (animations === void 0) { animations = []; }
        if (stateMachines === void 0) { stateMachines = []; }
        this.runtime = runtime;
        this.artboard = artboard;
        this.eventManager = eventManager;
        this.animations = animations;
        this.stateMachines = stateMachines;
    }
    /**
     * Adds animations and state machines by their names. If names are shared
     * between animations & state machines, then the first one found will be
     * created. Best not to use the same names for these in your Rive file.
     * @param animatable the name(s) of animations and state machines to add
     * @returns a list of names of the playing animations and state machines
     */
    Animator.prototype.add = function (animatables, playing, fireEvent, semanticsActive) {
        if (fireEvent === void 0) { fireEvent = true; }
        if (semanticsActive === void 0) { semanticsActive = false; }
        animatables = mapToStringArray(animatables);
        // If animatables is empty, play or pause everything
        if (animatables.length === 0) {
            this.animations.forEach(function (a) { return (a.playing = playing); });
            this.stateMachines.forEach(function (m) { return (m.playing = playing); });
        }
        else {
            // Play/pause already instanced items, or create new instances
            var instancedAnimationNames = this.animations.map(function (a) { return a.name; });
            var instancedMachineNames = this.stateMachines.map(function (m) { return m.name; });
            for (var i = 0; i < animatables.length; i++) {
                var aIndex = instancedAnimationNames.indexOf(animatables[i]);
                var mIndex = instancedMachineNames.indexOf(animatables[i]);
                if (aIndex >= 0 || mIndex >= 0) {
                    if (aIndex >= 0) {
                        // Animation is instanced, play/pause it
                        this.animations[aIndex].playing = playing;
                    }
                    else {
                        // State machine is instanced, play/pause it
                        this.stateMachines[mIndex].playing = playing;
                    }
                }
                else {
                    // Try to create a new animation instance
                    var anim = this.artboard.animationByName(animatables[i]);
                    if (anim) {
                        var newAnimation = new _animation__WEBPACK_IMPORTED_MODULE_0__.Animation(anim, this.artboard, this.runtime, playing);
                        // Display the first frame of the specified animation
                        newAnimation.advance(0);
                        newAnimation.apply(1.0);
                        this.animations.push(newAnimation);
                    }
                    else {
                        // Try to create a new state machine instance
                        var sm = this.artboard.stateMachineByName(animatables[i]);
                        if (sm) {
                            var newStateMachine = new StateMachine(sm, this.runtime, playing, this.artboard);
                            if (semanticsActive) {
                                newStateMachine.enableSemantics();
                            }
                            this.stateMachines.push(newStateMachine);
                        }
                    }
                }
            }
        }
        // Fire play/paused events for animations
        if (fireEvent) {
            if (playing) {
                this.eventManager.fire({
                    type: EventType.Play,
                    data: this.playing,
                });
            }
            else {
                this.eventManager.fire({
                    type: EventType.Pause,
                    data: this.paused,
                });
            }
        }
        return playing ? this.playing : this.paused;
    };
    /**
     * Adds linear animations by their names.
     * @param animatables the name(s) of animations to add
     * @param playing whether animations should play on instantiation
     */
    Animator.prototype.initLinearAnimations = function (animatables, playing, isFallingBackFromStateMachines) {
        if (isFallingBackFromStateMachines === void 0) { isFallingBackFromStateMachines = false; }
        // Play/pause already instanced items, or create new instances
        // This validation is kept to maintain compatibility with current behavior.
        // But given that it this is called during artboard initialization
        // it should probably be safe to remove.
        var instancedAnimationNames = this.animations.map(function (a) { return a.name; });
        for (var i = 0; i < animatables.length; i++) {
            var aIndex = instancedAnimationNames.indexOf(animatables[i]);
            if (aIndex >= 0) {
                this.animations[aIndex].playing = playing;
            }
            else {
                // Try to create a new animation instance
                var anim = this.artboard.animationByName(animatables[i]);
                if (anim) {
                    var newAnimation = new _animation__WEBPACK_IMPORTED_MODULE_0__.Animation(anim, this.artboard, this.runtime, playing);
                    // Display the first frame of the specified animation
                    newAnimation.advance(0);
                    newAnimation.apply(1.0);
                    this.animations.push(newAnimation);
                }
                else if (isFallingBackFromStateMachines) { // Throw LoadError if we cannot load the state machine name at all
                    var smInitializationMessage = "State Machine with name ".concat(animatables[i], " not found");
                    throw new RiveError(smInitializationMessage);
                }
                else {
                    console.error("Animation with name ".concat(animatables[i], " not found."));
                }
            }
        }
    };
    /**
     * Adds state machines by their names.
     * @param animatables the name(s) of state machines to add
     * @param playing whether state machines should play on instantiation
     */
    Animator.prototype.initStateMachines = function (animatables, playing, semanticsActive) {
        // Play/pause already instanced items, or create new instances
        // This validation is kept to maintain compatibility with current behavior.
        // But given that it this is called during artboard initialization
        // it should probably be safe to remove.
        var instancedStateMachineNames = this.stateMachines.map(function (a) { return a.name; });
        for (var i = 0; i < animatables.length; i++) {
            var aIndex = instancedStateMachineNames.indexOf(animatables[i]);
            if (aIndex >= 0) {
                this.stateMachines[aIndex].playing = playing;
            }
            else {
                // Try to create a new state machine instance
                var sm = this.artboard.stateMachineByName(animatables[i]);
                if (sm) {
                    var newStateMachine = new StateMachine(sm, this.runtime, playing, this.artboard);
                    if (semanticsActive) {
                        newStateMachine.enableSemantics();
                    }
                    this.stateMachines.push(newStateMachine);
                }
                else {
                    console.warn("State Machine with name ".concat(animatables[i], " not found. Falling back to find an animation with the same name."));
                    // TODO: Remove this fallback in next major release as it complicates initialization.
                    // In order to maintain compatibility with current behavior, if a state machine is not found
                    // we look for an animation with the same name
                    this.initLinearAnimations([animatables[i]], playing, true);
                }
            }
        }
    };
    /**
     * Play the named animations/state machines
     * @param animatables the names of the animations/machines to play; plays all if empty
     * @returns a list of the playing items
     */
    Animator.prototype.play = function (animatables) {
        return this.add(animatables, true);
    };
    /**
     * Advance state machines if they are paused after initialization
     */
    Animator.prototype.advanceIfPaused = function () {
        this.stateMachines.forEach(function (sm) {
            if (!sm.playing) {
                sm.advanceAndApply(0);
            }
        });
    };
    /**
     * Pauses named animations and state machines, or everything if nothing is
     * specified
     * @param animatables names of the animations and state machines to pause
     * @returns a list of names of the animations and state machines paused
     */
    Animator.prototype.pause = function (animatables) {
        return this.add(animatables, false);
    };
    /**
     * Set time of named animations
     * @param animations names of the animations to scrub
     * @param value time scrub value, a floating point number to which the playhead is jumped
     * @returns a list of names of the animations that were scrubbed
     */
    Animator.prototype.scrub = function (animatables, value) {
        var forScrubbing = this.animations.filter(function (a) {
            return animatables.includes(a.name);
        });
        forScrubbing.forEach(function (a) { return (a.scrubTo = value); });
        return forScrubbing.map(function (a) { return a.name; });
    };
    Object.defineProperty(Animator.prototype, "playing", {
        /**
         * Returns a list of names of all animations and state machines currently
         * playing
         */
        get: function () {
            return this.animations
                .filter(function (a) { return a.playing; })
                .map(function (a) { return a.name; })
                .concat(this.stateMachines.filter(function (m) { return m.playing; }).map(function (m) { return m.name; }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animator.prototype, "paused", {
        /**
         * Returns a list of names of all animations and state machines currently
         * paused
         */
        get: function () {
            return this.animations
                .filter(function (a) { return !a.playing; })
                .map(function (a) { return a.name; })
                .concat(this.stateMachines.filter(function (m) { return !m.playing; }).map(function (m) { return m.name; }));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Stops and removes all named animations and state machines
     * @param animatables animations and state machines to remove
     * @returns a list of names of removed items
     */
    Animator.prototype.stop = function (animatables) {
        var _this = this;
        animatables = mapToStringArray(animatables);
        // If nothing's specified, wipe them out, all of them
        var removedNames = [];
        // Stop everything
        if (animatables.length === 0) {
            removedNames = this.animations
                .map(function (a) { return a.name; })
                .concat(this.stateMachines.map(function (m) { return m.name; }));
            // Clean up before emptying the arrays
            this.animations.forEach(function (a) { return a.cleanup(); });
            this.stateMachines.forEach(function (m) { return m.cleanup(); });
            // Empty out the arrays
            this.animations.splice(0, this.animations.length);
            this.stateMachines.splice(0, this.stateMachines.length);
        }
        else {
            // Remove only the named animations/state machines
            var animationsToRemove = this.animations.filter(function (a) {
                return animatables.includes(a.name);
            });
            animationsToRemove.forEach(function (a) {
                a.cleanup();
                _this.animations.splice(_this.animations.indexOf(a), 1);
            });
            var machinesToRemove = this.stateMachines.filter(function (m) {
                return animatables.includes(m.name);
            });
            machinesToRemove.forEach(function (m) {
                m.cleanup();
                _this.stateMachines.splice(_this.stateMachines.indexOf(m), 1);
            });
            removedNames = animationsToRemove
                .map(function (a) { return a.name; })
                .concat(machinesToRemove.map(function (m) { return m.name; }));
        }
        this.eventManager.fire({
            type: EventType.Stop,
            data: removedNames,
        });
        // Return the list of animations removed
        return removedNames;
    };
    Object.defineProperty(Animator.prototype, "isPlaying", {
        /**
         * Returns true if at least one animation is active
         */
        get: function () {
            return (this.animations.reduce(function (acc, curr) { return acc || curr.playing; }, false) ||
                this.stateMachines.reduce(function (acc, curr) { return acc || curr.playing; }, false));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animator.prototype, "isPaused", {
        /**
         * Returns true if all animations are paused and there's at least one animation
         */
        get: function () {
            return (!this.isPlaying &&
                (this.animations.length > 0 || this.stateMachines.length > 0));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animator.prototype, "isStopped", {
        /**
         * Returns true if there are no playing or paused animations/state machines
         */
        get: function () {
            return this.animations.length === 0 && this.stateMachines.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * If there are no animations or state machines, add the first one found
     * @returns the name of the animation or state machine instanced
     */
    Animator.prototype.atLeastOne = function (playing, fireEvent, semanticsActive) {
        if (fireEvent === void 0) { fireEvent = true; }
        if (semanticsActive === void 0) { semanticsActive = false; }
        var instancedName;
        if (this.animations.length === 0 && this.stateMachines.length === 0) {
            if (this.artboard.animationCount() > 0) {
                // Warn only when the v3 default would actually change what plays
                if (this.artboard.stateMachineCount() > 0) {
                    warnOnce(DeprecationKeys.defaultStateMachine, "No `stateMachine` was specified, so the artboard's first linear animation is playing by default. " +
                        "In the next major version, the artboard's state machine will be played by default instead when one exists. " +
                        "Pass the `stateMachine` parameter to adopt that behavior now.");
                }
                // Add the first animation
                this.add([(instancedName = this.artboard.animationByIndex(0).name)], playing, fireEvent);
            }
            else if (this.artboard.stateMachineCount() > 0) {
                // Add the first state machine
                this.add([(instancedName = this.artboard.stateMachineByIndex(0).name)], playing, fireEvent, semanticsActive);
            }
        }
        return instancedName;
    };
    /**
     * Checks if any animations have looped and if so, fire the appropriate event
     */
    Animator.prototype.handleLooping = function () {
        for (var _i = 0, _a = this.animations.filter(function (a) { return a.playing; }); _i < _a.length; _i++) {
            var animation = _a[_i];
            // Emit if the animation looped
            if (animation.loopValue === 0 && animation.loopCount) {
                animation.loopCount = 0;
                // This is a one-shot; if it has ended, delete the instance
                this.stop(animation.name);
            }
            else if (animation.loopValue === 1 && animation.loopCount) {
                this.eventManager.fire({
                    type: EventType.Loop,
                    data: { animation: animation.name, type: LoopType.Loop },
                });
                animation.loopCount = 0;
            }
            // Wasm indicates a loop at each time the animation
            // changes direction, so a full loop/lap occurs every
            // two loop counts
            else if (animation.loopValue === 2 && animation.loopCount > 1) {
                this.eventManager.fire({
                    type: EventType.Loop,
                    data: { animation: animation.name, type: LoopType.PingPong },
                });
                animation.loopCount = 0;
            }
        }
    };
    /**
     * Checks if states have changed in state machines and fires a statechange
     * event
     */
    Animator.prototype.handleStateChanges = function () {
        var statesChanged = [];
        for (var _i = 0, _a = this.stateMachines.filter(function (sm) { return sm.playing; }); _i < _a.length; _i++) {
            var stateMachine = _a[_i];
            statesChanged.push.apply(statesChanged, stateMachine.statesChanged);
        }
        if (statesChanged.length > 0) {
            this.eventManager.fire({
                type: EventType.StateChange,
                data: statesChanged,
            });
        }
    };
    Animator.prototype.handleAdvancing = function (time) {
        this.eventManager.fire({
            type: EventType.Advance,
            data: time,
        });
    };
    return Animator;
}());
// #endregion
// #region events
/**
 * Supported event types triggered in Rive
 */
var EventType;
(function (EventType) {
    EventType["Load"] = "load";
    EventType["LoadError"] = "loaderror";
    EventType["Play"] = "play";
    EventType["Pause"] = "pause";
    EventType["Stop"] = "stop";
    /**
     * @deprecated Loop events are deprecated and will be removed in a future
     * major version: they are only reported for linear animation playback, which
     * is deprecated. Use a state machine to control playback and data binding to
     * react to changes instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide} for how
     * to migrate.
     */
    EventType["Loop"] = "loop";
    EventType["Draw"] = "draw";
    EventType["Advance"] = "advance";
    /**
     * @deprecated Subscribing to state change events at runtime is deprecated
     * and will be removed in a future major version: use data binding (view model
     * property observers) or state machine actions to react to changes from your
     * graphic instead. See
     * {@link https://rive.app/docs/editor/state-machine/states#actions} for more details.
     */
    EventType["StateChange"] = "statechange";
    /**
     * @deprecated Subscribing to Rive Events at runtime is deprecated and will be removed in a future
     * major version: please use data binding instead. See
     * {@link https://rive.app/docs/runtimes/web/rive-events} for how to migrate.
     */
    EventType["RiveEvent"] = "riveevent";
    EventType["AudioStatusChange"] = "audiostatuschange";
})(EventType || (EventType = {}));
var riveEventsDeprecationWarning = "Subscribing to Rive Events at runtime is deprecated and will be removed in a future major version: " +
    "please use data binding instead. See " +
    "https://rive.app/docs/runtimes/web/rive-events for how to migrate.";
var stateMachineInputsDeprecationWarning = "State machine inputs are deprecated and will be removed in a future major version: " +
    "please use data binding properties instead. See " +
    "https://rive.app/docs/editor/data-binding/migration-guide#state-machine-inputs for how to migrate.";
var textRunsDeprecationWarning = "Text run APIs are deprecated and will be removed in a future major version: " +
    "please use data binding instead. See " +
    "https://rive.app/docs/editor/data-binding/migration-guide#updating-text-runs-at-runtime for how to migrate.";
var loopEventsDeprecationWarning = "Loop events are deprecated and will be removed in a future major version: " +
    "they are only reported for linear animation playback, which is deprecated. " +
    "Use a state machine to control playback and data binding to react to changes instead. See " +
    "https://rive.app/docs/editor/data-binding/migration-guide for how to migrate.";
var stateChangeEventsDeprecationWarning = "Subscribing to state change events at runtime is deprecated and will be removed in a future major version: " +
    "use data binding (view model property observers) or state machine actions to react to " +
    "changes from your graphic instead. See " +
    "https://rive.app/docs/editor/state-machine/states#actions for how to migrate.";
/**
 * The deprecations this runtime warns about. Each warning prints its own id, so
 * the value can be copied straight out of the console into
 * {@link Rive.suppressDeprecationWarnings}.
 */
var DeprecationKeys = {
    animationNames: "animation-names",
    animationsParam: "animations-param",
    defaultStateMachine: "default-state-machine",
    legacyConstructors: "legacy-constructors",
    legacyUnsubscribe: "legacy-unsubscribe",
    loopEvents: "loop-events",
    namesArray: "names-array",
    riveEvents: "rive-events",
    scrub: "scrub",
    stateChangeEvents: "state-change-events",
    stateMachineInputs: "state-machine-inputs",
    stateMachinesParam: "state-machines-param",
    textRuns: "text-runs",
};
// Derived from `DeprecationKeys`
var deprecationIds = new Set(Object.keys(DeprecationKeys).map(function (name) { return DeprecationKeys[name]; }));
// Deprecations that a consumer has opted out of. Kept at module scope so
// `warnOnce` can read it without referencing the `Rive` class
var suppressedDeprecations = new Set();
/** @internal Backing store for `Rive.suppressDeprecationWarnings`. */
var setSuppressedDeprecations = function (ids) {
    suppressedDeprecations.clear();
    if (!Array.isArray(ids)) {
        console.warn("[Rive] `suppressDeprecationWarnings` expects an array of deprecation ids, " +
            "received ".concat(typeof ids, ". Nothing was suppressed."));
        return;
    }
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
        var id = ids_1[_i];
        if (deprecationIds.has(id)) {
            suppressedDeprecations.add(id);
        }
    }
};
// Deprecation warnings already emitted; each is logged at most once per page
// session to avoid flooding the console when many instances are created.
var emittedWarnings = new Set();
/**
 * Logs a deprecation warning at most once per page session, unless its id has
 * been passed to `Rive.suppressDeprecationWarnings`.
 */
var warnOnce = function (id, message) {
    if (suppressedDeprecations.has(id)) {
        return;
    }
    var key = "".concat(id, ":").concat(message);
    if (emittedWarnings.has(key)) {
        return;
    }
    emittedWarnings.add(key);
    console.warn("[Rive: ".concat(id, "] ").concat(message, "\n") +
        "To suppress this warning, set Rive.suppressDeprecationWarnings = [\"".concat(id, "\"]"));
};
/**
 * Warns that a playback-control method received an array of names; the next
 * major version restricts these parameters to a single string, since playing
 * multiple animations or state machines at once will not be supported.
 */
var warnIfNamesArray = function (names, methodName) {
    if (Array.isArray(names)) {
        warnOnce(DeprecationKeys.namesArray, "Passing an array of names to `".concat(methodName, "()` is deprecated: in the next major version this parameter will be a single string, and playing multiple animations or state machines at once will not be supported."));
    }
};
/**
 * Warns that a playback-control method received linear animation names;
 * name-based control remains supported for state machines only, so
 * user-specified linear animation names are going away in a future major
 * version.
 */
var warnDeprecatedAnimationNames = function (methodName) {
    warnOnce(DeprecationKeys.animationNames, "Passing linear animation names to `".concat(methodName, "()` is deprecated and will be removed in a future major version: ") +
        "Pass a single state machine name to control playback instead.");
};
/**
 * Looping types: one-shot, loop, and ping-pong
 * @deprecated Loop events are deprecated and will be removed in a future major
 * version: they are only reported for linear animation playback, which is
 * deprecated. Use a state machine to control playback and data binding to
 * react to changes instead.
 */
var LoopType;
(function (LoopType) {
    LoopType["OneShot"] = "oneshot";
    LoopType["Loop"] = "loop";
    LoopType["PingPong"] = "pingpong";
})(LoopType || (LoopType = {}));
// Manages Rive events and listeners
var EventManager = /** @class */ (function () {
    function EventManager(listeners) {
        if (listeners === void 0) { listeners = []; }
        this.listeners = listeners;
    }
    // Gets listeners of specified type
    EventManager.prototype.getListeners = function (type) {
        return this.listeners.filter(function (e) { return e.type === type; });
    };
    // Adds a listener
    EventManager.prototype.add = function (listener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener);
        }
    };
    /**
     * Removes a listener
     * @param listener the listener with the callback to be removed
     */
    EventManager.prototype.remove = function (listener) {
        // We can't simply look for the listener as it'll be a different instance to
        // one originally subscribed. Find all the listeners of the right type and
        // then check their callbacks which should match.
        for (var i = 0; i < this.listeners.length; i++) {
            var currentListener = this.listeners[i];
            if (currentListener.type === listener.type) {
                if (currentListener.callback === listener.callback) {
                    this.listeners.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * Clears all listeners of specified type, or every listener if no type is
     * specified
     * @param type the type of listeners to clear, or all listeners if not
     * specified
     */
    EventManager.prototype.removeAll = function (type) {
        var _this = this;
        if (!type) {
            this.listeners.splice(0, this.listeners.length);
        }
        else {
            this.listeners
                .filter(function (l) { return l.type === type; })
                .forEach(function (l) { return _this.remove(l); });
        }
    };
    // Fires an event
    EventManager.prototype.fire = function (event) {
        var eventListeners = this.getListeners(event.type);
        eventListeners.forEach(function (listener) { return listener.callback(event); });
    };
    return EventManager;
}());
// Manages a queue of tasks
var TaskQueueManager = /** @class */ (function () {
    function TaskQueueManager(eventManager) {
        this.eventManager = eventManager;
        this.queue = [];
    }
    // Adds a task top the queue
    TaskQueueManager.prototype.add = function (task) {
        this.queue.push(task);
    };
    // Processes all tasks in the queue
    TaskQueueManager.prototype.process = function () {
        while (this.queue.length > 0) {
            var task = this.queue.shift();
            if (task === null || task === void 0 ? void 0 : task.action) {
                task.action();
            }
            if (task === null || task === void 0 ? void 0 : task.event) {
                this.eventManager.fire(task.event);
            }
        }
    };
    return TaskQueueManager;
}());
// #endregion
// #region Audio
var SystemAudioStatus;
(function (SystemAudioStatus) {
    SystemAudioStatus[SystemAudioStatus["AVAILABLE"] = 0] = "AVAILABLE";
    SystemAudioStatus[SystemAudioStatus["UNAVAILABLE"] = 1] = "UNAVAILABLE";
})(SystemAudioStatus || (SystemAudioStatus = {}));
// Class to handle audio context availability and status changes
var AudioManager = /** @class */ (function (_super) {
    __extends(AudioManager, _super);
    function AudioManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._started = false;
        _this._enabled = false;
        _this._status = SystemAudioStatus.UNAVAILABLE;
        return _this;
    }
    AudioManager.prototype.delay = function (time) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, time); })];
            });
        });
    };
    AudioManager.prototype.timeout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (_, reject) { return setTimeout(reject, 50); })];
            });
        });
    };
    // Alerts animations on status changes and removes the listeners to avoid alerting twice.
    AudioManager.prototype.reportToListeners = function () {
        this.fire({ type: EventType.AudioStatusChange });
        this.removeAll();
    };
    /**
     * The audio context has been resolved.
     * Alert any listeners that we can now play audio.
     * Rive will now play audio at the configured volume.
     */
    AudioManager.prototype.enableAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._enabled) {
                    this._enabled = true;
                    this._status = SystemAudioStatus.AVAILABLE;
                    this.reportToListeners();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Check if we are able to play audio.
     *
     * We currently check the audio context, when resume() returns before a timeout we know that the
     * audio context is running and we can enable audio.
     */
    AudioManager.prototype.testAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._status === SystemAudioStatus.UNAVAILABLE &&
                            this._audioContext !== null)) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.race([this._audioContext.resume(), this.timeout()])];
                    case 2:
                        _b.sent();
                        this.enableAudio();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Establish audio for use with rive.
     * We both test if we can use audio intermittently and listen for user interaction.
     * The aim is to enable audio playback as soon as the browser allows this.
     */
    AudioManager.prototype._establishAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._started) return [3 /*break*/, 5];
                        this._started = true;
                        if (!(typeof window == "undefined")) return [3 /*break*/, 1];
                        this.enableAudio();
                        return [3 /*break*/, 5];
                    case 1:
                        this._audioContext = new AudioContext();
                        this.listenForUserAction();
                        _a.label = 2;
                    case 2:
                        if (!(this._status === SystemAudioStatus.UNAVAILABLE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.testAudio()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.delay(1000)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AudioManager.prototype.listenForUserAction = function () {
        var _this = this;
        // NOTE: AudioContexts are ready immediately if requested in a ui callback
        // we *could* re request one in this listener.
        var _clickListener = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // note this has "better" results than calling `await this.testAudio()`
                // as we force audio to be enabled in the current thread, rather than chancing
                // the thread to be passed over for some other async context
                this.enableAudio();
                return [2 /*return*/];
            });
        }); };
        // NOTE: we should test this on mobile/pads
        document.addEventListener("pointerdown", _clickListener, {
            once: true,
        });
    };
    /**
     * Establish the audio context for rive, this lets rive know that we can play audio.
     */
    AudioManager.prototype.establishAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._establishAudio();
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(AudioManager.prototype, "systemVolume", {
        get: function () {
            if (this._status === SystemAudioStatus.UNAVAILABLE) {
                // We do an immediate test to avoid depending on the delay of the running test
                this.testAudio();
                return 0;
            }
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    return AudioManager;
}(EventManager));
var audioManager = new AudioManager();
var FakeResizeObserver = /** @class */ (function () {
    function FakeResizeObserver() {
    }
    FakeResizeObserver.prototype.observe = function () { };
    FakeResizeObserver.prototype.unobserve = function () { };
    FakeResizeObserver.prototype.disconnect = function () { };
    return FakeResizeObserver;
}());
var MyResizeObserver = globalThis.ResizeObserver || FakeResizeObserver;
/**
 * This class takes care of any observers that will be attached to an animation.
 * It should be treated as a singleton because observers are much more performant
 * when used for observing multiple elements by a single instance.
 */
var ObjectObservers = /** @class */ (function () {
    function ObjectObservers() {
        var _this = this;
        this._elementsMap = new Map();
        /**
         * Resize observers trigger both when the element changes its size and also when the
         * element is added or removed from the document.
         */
        this._onObservedEntry = function (entry) {
            var observed = _this._elementsMap.get(entry.target);
            if (observed !== null) {
                observed.onResize(entry.target.clientWidth == 0 || entry.target.clientHeight == 0);
            }
            else {
                _this._resizeObserver.unobserve(entry.target);
            }
        };
        this._onObserved = function (entries) {
            entries.forEach(_this._onObservedEntry);
        };
        this._resizeObserver = new MyResizeObserver(this._onObserved);
    }
    // Adds an observable element
    ObjectObservers.prototype.add = function (element, onResize) {
        var observed = {
            onResize: onResize,
            element: element,
        };
        this._elementsMap.set(element, observed);
        this._resizeObserver.observe(element);
        return observed;
    };
    // Removes an observable element
    ObjectObservers.prototype.remove = function (observed) {
        this._resizeObserver.unobserve(observed.element);
        this._elementsMap.delete(observed.element);
    };
    return ObjectObservers;
}());
var observers = new ObjectObservers();
// #endregion
// #region Rive
var nextRiveInstanceId = 0;
/**
 * Resolves which animation/state machine names playback should start with.
 * The `stateMachine` parameter takes priority; the deprecated plural
 * `animations`/`stateMachines` parameters apply only when it
 * is not provided.
 */
var resolveStartingPlayback = function (_a) {
    var stateMachine = _a.stateMachine, animations = _a.animations, stateMachines = _a.stateMachines;
    if (animations !== undefined) {
        warnOnce(DeprecationKeys.animationsParam, "The `animations` parameter is deprecated and will be removed in a future major version: please use the `stateMachine` parameter to play a state machine instead.");
    }
    if (stateMachines !== undefined) {
        warnOnce(DeprecationKeys.stateMachinesParam, "The `stateMachines` parameter is deprecated: please use `stateMachine` with a single state machine name instead.");
    }
    if (stateMachine) {
        return {
            startingAnimationNames: [],
            startingStateMachineNames: [stateMachine],
        };
    }
    return {
        startingAnimationNames: mapToStringArray(animations),
        startingStateMachineNames: mapToStringArray(stateMachines),
    };
};
var RiveFile = /** @class */ (function () {
    function RiveFile(params) {
        // Allow the runtime to automatically load assets hosted in Rive's runtime.
        this.enableRiveAssetCDN = true;
        // Decode parts of the file on first use instead of at import.
        this.deferDecoding = false;
        // When true, emits performance.mark/measure entries during RiveFile load.
        this.enablePerfMarks = false;
        this.referenceCount = 0;
        this.destroyed = false;
        this.selfUnref = false;
        this.bindableArtboards = [];
        // Deferred rendering was requested; the session may still be null if this
        // build has no deferred support.
        this.deferred = false;
        // The session this file imported through, null when immediate. Owned here:
        // it has to outlive the file, so it is deleted after the file is released.
        this.session = null;
        // Attaching is once per session: a detached session can never replay again,
        // so a claimed file re-imports for the next instance implicitly. Mirrors the native
        // latch (WebGL2DeferredSession::everBound, C2DDeferredSession::claim).
        this._sessionClaimed = false;
        // Releasing this file has to be deterministic once a session owns its
        // resources, so the finalizer is disarmed rather than left to GC.
        this.fileFinalizer = null;
        this.boundElsewhereWarned = false;
        this.src = params.src;
        this.buffer = params.buffer;
        this.deferred = !!params.enableGPUCanvas;
        if (params.assetLoader)
            this.assetLoader = params.assetLoader;
        this.enableRiveAssetCDN =
            typeof params.enableRiveAssetCDN == "boolean"
                ? params.enableRiveAssetCDN
                : true;
        this.deferDecoding = !!params.deferDecoding;
        this.enablePerfMarks = !!params.enablePerfMarks;
        if (this.enablePerfMarks)
            _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.enablePerfMarks = true;
        // New event management system
        this.eventManager = new EventManager();
        if (params.onLoad)
            this.on(EventType.Load, params.onLoad);
        if (params.onLoadError)
            this.on(EventType.LoadError, params.onLoadError);
    }
    RiveFile.prototype.releaseFile = function () {
        var _a, _b;
        // Release here rather than leaving it to the finalization registry. The
        // native file frees GL-backed resources when its last reference goes, and
        // callers reach this with the renderer's context current; a finalizer runs
        // with none, so those deletes would silently do nothing.
        (_a = this.fileFinalizer) === null || _a === void 0 ? void 0 : _a.release();
        (_b = this.file) === null || _b === void 0 ? void 0 : _b.unref();
        this.fileFinalizer = null;
        this.file = null;
    };
    RiveFile.prototype.releaseSession = function () {
        var _a;
        // Known limitation: cleanup() on a file an instance is still drawing
        // deletes the session under it. A RiveFile's creator holds no reference of
        // its own, so their cleanup() can take the count to zero.
        (_a = this.session) === null || _a === void 0 ? void 0 : _a.delete();
        this.session = null;
    };
    RiveFile.prototype.releaseBindableArtboards = function () {
        this.bindableArtboards.forEach(function (bindableArtboard) {
            return bindableArtboard.destroy();
        });
    };
    RiveFile.prototype.initData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1, loader, loaderWrapper, _b, error_2, fileFinalizer;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.src && !this.buffer)) return [3 /*break*/, 4];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, loadRiveFile(this.src)];
                    case 2:
                        _a.buffer = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        if (error_1 instanceof Error) {
                            throw error_1;
                        }
                        throw new RiveError(RiveFile.fileLoadErrorMessage);
                    case 4:
                        if (this.destroyed) {
                            return [2 /*return*/];
                        }
                        if (this.deferred && this.session === null) {
                            this.session = RiveFile.makeDeferredSession(this.runtime);
                        }
                        if (this.assetLoader) {
                            loaderWrapper = new _utils__WEBPACK_IMPORTED_MODULE_3__.CustomFileAssetLoaderWrapper(this.runtime, this.assetLoader, this.session);
                            loader = loaderWrapper.assetLoader;
                        }
                        // Load the Rive file
                        if (this.enablePerfMarks)
                            performance.mark('rive:file-load:start');
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        _b = this;
                        return [4 /*yield*/, this.runtime.load(new Uint8Array(this.buffer), loader, this.enableRiveAssetCDN, this.session, this.deferDecoding)];
                    case 6:
                        _b.file = _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _c.sent();
                        // The finalizer that would reclaim the session is only registered once
                        // the import succeeds, so a failed load has to release it here.
                        this.releaseSession();
                        throw error_2;
                    case 8:
                        if (this.enablePerfMarks) {
                            performance.mark('rive:file-load:end');
                            performance.measure('rive:file-load', 'rive:file-load:start', 'rive:file-load:end');
                        }
                        if (this.destroyed) {
                            this.releaseFile();
                            this.releaseSession();
                            return [2 /*return*/];
                        }
                        if (this.file === null) {
                            // A malformed file resolves to null rather than rejecting. Release the
                            // session now: a finalizer for a file that does not exist would keep it
                            // alive until GC, or for as long as the caller holds the failed RiveFile.
                            this.releaseSession();
                            this.fireLoadError(RiveFile.fileLoadErrorMessage);
                            return [2 /*return*/];
                        }
                        fileFinalizer = new _utils__WEBPACK_IMPORTED_MODULE_3__.FileFinalizer(this.file, this.session);
                        this.fileFinalizer = fileFinalizer;
                        _utils__WEBPACK_IMPORTED_MODULE_3__.finalizationRegistry.register(this, fileFinalizer);
                        this.eventManager.fire({
                            type: EventType.Load,
                            data: this,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    RiveFile.prototype.loadRiveFileBytes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bufferPromise;
            return __generator(this, function (_a) {
                if (this.enablePerfMarks)
                    performance.mark('rive:fetch-riv:start');
                bufferPromise = this.src
                    ? loadRiveFile(this.src)
                    : Promise.resolve(this.buffer);
                if (this.enablePerfMarks && this.src) {
                    bufferPromise.then(function () {
                        performance.mark('rive:fetch-riv:end');
                        performance.measure('rive:fetch-riv', 'rive:fetch-riv:start', 'rive:fetch-riv:end');
                    });
                }
                return [2 /*return*/, bufferPromise];
            });
        });
    };
    RiveFile.prototype.loadRuntime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var runtimePromise;
            return __generator(this, function (_a) {
                if (this.enablePerfMarks)
                    performance.mark('rive:await-wasm:start');
                runtimePromise = _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.awaitInstance();
                if (this.enablePerfMarks) {
                    runtimePromise.then(function () {
                        performance.mark('rive:await-wasm:end');
                        performance.measure('rive:await-wasm', 'rive:await-wasm:start', 'rive:await-wasm:end');
                    });
                }
                return [2 /*return*/, runtimePromise];
            });
        });
    };
    RiveFile.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bufferResolved, runtimeResolved, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // If no source file url specified, it's a bust
                        if (!this.src && !this.buffer) {
                            this.fireLoadError(RiveFile.missingErrorMessage);
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Promise.all([this.loadRiveFileBytes(), this.loadRuntime()])];
                    case 2:
                        _a = _b.sent(), bufferResolved = _a[0], runtimeResolved = _a[1];
                        if (this.destroyed) {
                            return [2 /*return*/];
                        }
                        // .riv file buffer and WASM runtime instance
                        this.buffer = bufferResolved;
                        this.runtime = runtimeResolved;
                        if (this.enablePerfMarks)
                            performance.mark('rive:init-data:start');
                        return [4 /*yield*/, this.initData()];
                    case 3:
                        _b.sent();
                        if (this.enablePerfMarks) {
                            performance.mark('rive:init-data:end');
                            performance.measure('rive:init-data', 'rive:init-data:start', 'rive:init-data:end');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _b.sent();
                        this.fireLoadError(error_3 instanceof Error ? error_3.message : RiveFile.fileLoadErrorMessage);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RiveFile.prototype.fireLoadError = function (message) {
        this.eventManager.fire({
            type: EventType.LoadError,
            data: message,
        });
        throw new RiveError(message);
    };
    /**
     * Subscribe to Rive-generated events
     * @param type the type of event to subscribe to
     * @param callback callback to fire when the event occurs
     */
    RiveFile.prototype.on = function (type, callback) {
        this.eventManager.add({
            type: type,
            callback: callback,
        });
    };
    /**
     * Unsubscribes from a Rive-generated event
     * @param type the type of event to unsubscribe from
     * @param callback the callback to unsubscribe
     */
    RiveFile.prototype.off = function (type, callback) {
        this.eventManager.remove({
            type: type,
            callback: callback,
        });
    };
    RiveFile.prototype.cleanup = function () {
        this.referenceCount -= 1;
        if (this.referenceCount <= 0) {
            this.removeAllRiveEventListeners();
            this.releaseFile();
            this.releaseBindableArtboards();
            // Everything imported through the session is gone; the session can go.
            this.releaseSession();
            this.destroyed = true;
        }
    };
    // Deferred is only compiled into some runtime builds, so feature detect it
    // and degrade to an immediate import rather than failing the load.
    RiveFile.makeDeferredSession = function (runtime) {
        var _a, _b;
        var session = (_b = (_a = runtime.makeDeferredSession) === null || _a === void 0 ? void 0 : _a.call(runtime)) !== null && _b !== void 0 ? _b : null;
        if (session === null && !RiveFile.deferredUnsupportedWarned) {
            RiveFile.deferredUnsupportedWarned = true;
            console.warn("Rive: `enableGPUCanvas: true` was ignored because this runtime build has no GPU Canvas support; importing in immediate mode. Use a @rive-app/webgl2 or @rive-app/canvas build with deferred rendering compiled in.");
        }
        return session;
    };
    Object.defineProperty(RiveFile.prototype, "deferredSession", {
        /**
         * @internal The deferred session this file imported through, or null if it
         * was imported in immediate mode.
         */
        get: function () {
            return this.session;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RiveFile.prototype, "deferredRequested", {
        /**
         * @internal Whether deferred was asked for, even when this build could not
         * honor it and imported immediate.
         */
        get: function () {
            return this.deferred;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RiveFile.prototype, "sessionClaimed", {
        /**
         * @internal Whether this file's session has ever been attached to a renderer.
         * Attaching is once per session, so a claimed file re-imports for the next
         * instance even after the renderer it was bound to is gone.
         */
        get: function () {
            return this._sessionClaimed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @internal Marks this file's session as spent. There is no matching release:
     * a session that has been attached can never replay for another renderer.
     */
    RiveFile.prototype.claimSession = function () {
        this._sessionClaimed = true;
    };
    /**
     * @internal One warning per file however many instances collide on it.
     */
    RiveFile.prototype.warnBoundElsewhereOnce = function () {
        if (this.boundElsewhereWarned) {
            return;
        }
        this.boundElsewhereWarned = true;
        console.warn("Rive: this deferred RiveFile is already bound to another Rive instance's canvas, and a deferred session cannot span canvases. Re-importing the file for this instance (an extra parse of the retained buffer, no extra network request).");
    };
    /**
     * @internal Re-imports this file from its retained buffer into a mode of its
     * own. The copy is owned by whoever asked for it and never joins this file's
     * reference count.
     */
    RiveFile.prototype.reimport = function (deferred) {
        return __awaiter(this, void 0, void 0, function () {
            var copy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        copy = new RiveFile({
                            buffer: this.buffer,
                            assetLoader: this.assetLoader,
                            enableRiveAssetCDN: this.enableRiveAssetCDN,
                            deferDecoding: this.deferDecoding,
                            enablePerfMarks: this.enablePerfMarks,
                            enableGPUCanvas: deferred,
                        });
                        return [4 /*yield*/, copy.init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, copy];
                }
            });
        });
    };
    /**
     * Unsubscribes all Rive listeners from an event type, or everything if no type is
     * given
     * @param type the type of event to unsubscribe from, or all types if
     * undefined
     */
    RiveFile.prototype.removeAllRiveEventListeners = function (type) {
        this.eventManager.removeAll(type);
    };
    RiveFile.prototype.getInstance = function () {
        if (this.file !== null) {
            this.referenceCount += 1;
            return this.file;
        }
    };
    RiveFile.prototype.destroyIfUnused = function () {
        if (this.referenceCount <= 0) {
            this.cleanup();
        }
    };
    RiveFile.prototype.createBindableArtboard = function (nativeBindableArtboard) {
        if (nativeBindableArtboard != null) {
            var bindableArtboard = new BindableArtboard(nativeBindableArtboard);
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(bindableArtboard, bindableArtboard.nativeArtboard);
            this.bindableArtboards.push(bindableArtboard);
            return bindableArtboard;
        }
        return null;
    };
    /**
     * @deprecated This function is deprecated. For better stability and memory management
     * use `getBindableArtboard()` instead.
     * @param {string} name - The name of the artboard.
     * @returns {Artboard} The artboard to bind to.
     */
    RiveFile.prototype.getArtboard = function (name) {
        var nativeArtboard = this.file.artboardByName(name);
        if (nativeArtboard != null) {
            return new Artboard(nativeArtboard, this);
        }
    };
    RiveFile.prototype.getBindableArtboard = function (name) {
        var nativeArtboard = this.file.bindableArtboardByName(name);
        return this.createBindableArtboard(nativeArtboard);
    };
    RiveFile.prototype.getDefaultBindableArtboard = function () {
        var nativeArtboard = this.file.bindableArtboardDefault();
        return this.createBindableArtboard(nativeArtboard);
    };
    RiveFile.prototype.internalBindableArtboardFromArtboard = function (artboard) {
        var nativeBindableArtboard = this.file.internalBindableArtboardFromArtboard(artboard);
        return this.createBindableArtboard(nativeBindableArtboard);
    };
    RiveFile.prototype.viewModelByName = function (name) {
        var viewModel = this.file.viewModelByName(name);
        if (viewModel !== null) {
            return new ViewModel(viewModel);
        }
        return null;
    };
    /**
     * @returns the names of the file's global view models, in file order.
     */
    RiveFile.prototype.globalViewModelNames = function () {
        return this.file.globalViewModelNames();
    };
    // Error message for missing source or buffer
    RiveFile.missingErrorMessage = "Rive source file or data buffer required";
    // Error message for file load error
    RiveFile.fileLoadErrorMessage = "The file failed to load";
    // Deferred support is per build, so the warning is per page, not per file.
    RiveFile.deferredUnsupportedWarned = false;
    return RiveFile;
}());

var Rive = /** @class */ (function () {
    function Rive(params) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        // Tracks if a Rive file is loaded
        this.loaded = false;
        // Tracks if a Rive file is destroyed
        this.destroyed = false;
        // Reference of an object that handles any observers for the animation
        this._observed = null;
        /**
         * Tracks if a Rive file is loaded; we need this in addition to loaded as some
         * commands (e.g. contents) can be called as soon as the file is loaded.
         * However, playback commands need to be queued and run in order once initial
         * animations and autoplay has been sorted out. This applies to play, pause,
         * and start.
         */
        this.readyForPlaying = false;
        // Deferred rendering was requested for this instance. The file it renders
        // has the final say, since a file's mode is fixed at import.
        this.deferredRenderer = false;
        // Whether a deferred instance may hand its canvas to the replay worker.
        this.useReplayWorker = true;
        // Decides the context attributes on every init(); cleared if the renderer can't inkbleed.
        this._inkbleedCapable = false;
        this._inkbleed = false;
        // Whether this instance imported the file in `riveFile` (true) or the caller
        // supplied it (false). Only a file we imported may be released without a
        // matching getInstance(): a caller's file is theirs however this init ends.
        this.ownsRiveFile = false;
        // Runtime artboard
        this.artboard = null;
        // place to clear up pointer/touch event listeners
        this.eventCleanup = null;
        // Manages keyboard and DOM-focus interactions for the canvas.
        this._keyboardInteractions = null;
        // Polls game controllers and forwards input to the first playing state machine.
        this._gamepadInteractions = null;
        this.shouldDisableRiveListeners = false;
        this.shouldDisableGamepad = false;
        this._gamepadOptions = {
            requireFocus: false,
        };
        this.automaticallyHandleEvents = false;
        this.dispatchPointerExit = true;
        // Allow all pointers to be passed to the runtime
        this.enableMultiTouch = false;
        // Allow the runtime to automatically load assets hosted in Rive's runtime.
        this.enableRiveAssetCDN = true;
        // Forwarded to the file this instance imports itself.
        this.deferDecoding = false;
        this.semanticsMode = _semantics__WEBPACK_IMPORTED_MODULE_2__.SemanticMode.Disabled;
        this.semanticsOptions = {
            riveCanvasLabel: "Rive animation",
        };
        /** True when this instance may drain semantics and render the overlay. */
        this._semanticsActive = false;
        // Keep a local value of the set volume to update it asynchronously
        this._volume = 1;
        // Keep a local value of the set width to update it asynchronously
        this._artboardWidth = undefined;
        // Keep a local value of the set height to update it asynchronously
        this._artboardHeight = undefined;
        // Keep a local value of the device pixel ratio used in rendering and canvas/artboard resizing
        this._devicePixelRatioUsed = 1;
        // Whether the canvas element's size is 0
        this._hasZeroSize = false;
        // Whether a draw operation needs to be forced
        this._needsRedraw = false;
        // Canvas width and height. Values are lazily updated so they might
        // not be in sync with current canvas size.
        this._currentCanvasWidth = 0;
        this._currentCanvasHeight = 0;
        // Audio event listener
        this._audioEventListener = null;
        // draw method bound to the class
        this._boundDraw = null;
        // Page visibility handler — prevents state machine advancing / rAF from being invoked with large time delta
        // when the browser tab is switched back to after being hidden.
        this._pageVisibilityHandler = null;
        // True only when the page visibility handler itself cancelled an active frame.
        // Set by stopRendering(), cleared by startRendering(). Prevents the
        // visibilitychange handler from restarting a rendering loop the caller intentionally stopped.
        this._explicitlyStoppedRendering = false;
        this._viewModelInstance = null;
        // User-provided global view model instances, keyed by their global view
        // model's name. Globals not present here are still driven by the default
        // instances the runtime seeds; the getter only surfaces instances the user
        // has explicitly set.
        this._globalViewModelInstances = new Map();
        this._dataEnums = null;
        this._tabIndex = null;
        this._prevHasFocus = false;
        this._prevWantsTextInputSession = false;
        // Pointer-down defers the proxy focus: mousedown's default would refocus the canvas and
        // touchstart isn't user activation; pointer-up focuses it.
        this._inPointerDownDrain = false;
        this._focusOptions = {
            allowFocusInterrupt: false,
        };
        // Tracks the semantic tree for the given graphic
        this._semanticTree = null;
        this._accessibilityOverlay = null;
        /**
         * True when an input to the accessibility overlay's artboard→canvas transform
         * (layout fit/alignment/bounds, devicePixelRatio, or layout scale) has changed
         * and the matrix must be recomputed on the next overlay update. Avoids calling
         * computeAlignment every frame when only the semantic tree changed.
         */
        this._overlayTransformDirty = true;
        // Module-level counter for unique instance IDs for semantic overlay containers
        this._instanceId = "".concat(nextRiveInstanceId++);
        this.drawOptimization = DrawOptimizationOptions.DrawOnChanged;
        // When true, emits performance.mark/measure entries for load and render.
        this.enablePerfMarks = false;
        // Durations to generate a frame for the last second. Used for performance profiling.
        this.durations = [];
        this.frameTimes = [];
        this.frameCount = 0;
        this.isTouchScrollEnabled = false;
        this.onCanvasResize = function (hasZeroSize) {
            var toggledDisplay = _this._hasZeroSize !== hasZeroSize;
            _this._hasZeroSize = hasZeroSize;
            if (!hasZeroSize) {
                if (toggledDisplay) {
                    _this.resizeDrawingSurfaceToCanvas();
                }
            }
            else if (!_this._layout.maxX || !_this._layout.maxY) {
                _this.resizeToCanvas();
            }
        };
        this.isEditingHostFocused = function () { var _a, _b; return (_b = (_a = _this._keyboardInteractions) === null || _a === void 0 ? void 0 : _a.isEditingHostFocused()) !== null && _b !== void 0 ? _b : false; };
        this.isFocusWithinCanvas = function () {
            var _a, _b, _c;
            if (typeof document === "undefined") {
                return false;
            }
            // Inside a shadow root, document.activeElement is the shadow host.
            var root = _this.canvas instanceof HTMLCanvasElement ? _this.canvas.getRootNode() : null;
            var active = (_a = (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot
                ? root.activeElement
                : null)) !== null && _a !== void 0 ? _a : document.activeElement;
            if (!active) {
                return false;
            }
            // Canvas, overlay and the text input proxy.
            if (_this._keyboardInteractions) {
                return _this._keyboardInteractions.isInFocusDomain(active);
            }
            if (active === _this.canvas) {
                return true;
            }
            var overlay = (_c = (_b = _this._accessibilityOverlay) === null || _b === void 0 ? void 0 : _b.getSemanticOverlayContainer()) !== null && _c !== void 0 ? _c : null;
            return !!overlay && overlay.contains(active);
        };
        // rAF time of the last frame; 0 makes the next frame start the clock.
        this.lastRenderTime = 0;
        // Tracks the current animation frame request
        this.frameRequestId = null;
        this.replayPacer = new _utils__WEBPACK_IMPORTED_MODULE_3__.ReplayPacer();
        /**
         * Used be draw to track when a second of active rendering time has passed.
         * Used for debugging purposes
         */
        this.renderSecondTimer = 0;
        this._boundDraw = this.draw.bind(this);
        if (typeof document !== 'undefined') {
            this._pageVisibilityHandler = this._onPageVisibilityChange.bind(this);
            document.addEventListener('visibilitychange', this._pageVisibilityHandler);
        }
        this.canvas = params.canvas;
        if (params.canvas.constructor === HTMLCanvasElement) {
            this._observed = observers.add(this.canvas, this.onCanvasResize);
        }
        this._currentCanvasWidth = this.canvas.width;
        this._currentCanvasHeight = this.canvas.height;
        this.src = params.src;
        this.buffer = params.buffer;
        this.riveFile = params.riveFile;
        this.layout = (_a = params.layout) !== null && _a !== void 0 ? _a : new Layout();
        this.shouldDisableRiveListeners = !!params.shouldDisableRiveListeners;
        this.shouldDisableGamepad = !!params.shouldDisableGamepad;
        this._gamepadOptions = (_b = params.gamepadOptions) !== null && _b !== void 0 ? _b : this._gamepadOptions;
        this.isTouchScrollEnabled = !!params.isTouchScrollEnabled;
        if (params.automaticallyHandleEvents) {
            warnOnce(DeprecationKeys.riveEvents, "The `automaticallyHandleEvents` parameter is deprecated. " +
                riveEventsDeprecationWarning);
        }
        this.automaticallyHandleEvents = !!params.automaticallyHandleEvents;
        this.dispatchPointerExit =
            params.dispatchPointerExit === false
                ? params.dispatchPointerExit
                : this.dispatchPointerExit;
        this.enableMultiTouch = !!params.enableMultiTouch;
        this.drawOptimization = (_c = params.drawingOptions) !== null && _c !== void 0 ? _c : this.drawOptimization;
        this.enableRiveAssetCDN =
            params.enableRiveAssetCDN === undefined
                ? true
                : params.enableRiveAssetCDN;
        this.deferDecoding = !!params.deferDecoding;
        this.enablePerfMarks = !!params.enablePerfMarks;
        if (this.enablePerfMarks)
            _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.enablePerfMarks = true;
        this._focusOptions = (_d = params.focusOptions) !== null && _d !== void 0 ? _d : this._focusOptions;
        this._tabIndex = (_e = params.tabIndex) !== null && _e !== void 0 ? _e : null;
        this.deferredRenderer = !!params.enableGPUCanvas;
        this.useReplayWorker = (_f = params.useReplayWorker) !== null && _f !== void 0 ? _f : true;
        this._inkbleedCapable = !!params.enableInkbleed;
        this._inkbleed = this._inkbleedCapable;
        // New event management system
        this.eventManager = new EventManager();
        if (params.onLoad)
            this.on(EventType.Load, params.onLoad);
        if (params.onLoadError)
            this.on(EventType.LoadError, params.onLoadError);
        if (params.onPlay)
            this.on(EventType.Play, params.onPlay);
        if (params.onPause)
            this.on(EventType.Pause, params.onPause);
        if (params.onStop)
            this.on(EventType.Stop, params.onStop);
        if (params.onLoop)
            this.on(EventType.Loop, params.onLoop);
        if (params.onStateChange)
            this.on(EventType.StateChange, params.onStateChange);
        if (params.onAdvance)
            this.on(EventType.Advance, params.onAdvance);
        /**
         * @deprecated Use camelCase'd versions instead.
         */
        if (params.onload && !params.onLoad)
            this.on(EventType.Load, params.onload);
        if (params.onloaderror && !params.onLoadError)
            this.on(EventType.LoadError, params.onloaderror);
        if (params.onplay && !params.onPlay)
            this.on(EventType.Play, params.onplay);
        if (params.onpause && !params.onPause)
            this.on(EventType.Pause, params.onpause);
        if (params.onstop && !params.onStop)
            this.on(EventType.Stop, params.onstop);
        if (params.onloop && !params.onLoop)
            this.on(EventType.Loop, params.onloop);
        if (params.onstatechange && !params.onStateChange)
            this.on(EventType.StateChange, params.onstatechange);
        /**
         * Asset loading
         */
        if (params.assetLoader)
            this.assetLoader = params.assetLoader;
        // Hook up the task queue
        this.taskQueue = new TaskQueueManager(this.eventManager);
        this.init({
            src: this.src,
            buffer: this.buffer,
            riveFile: this.riveFile,
            autoplay: params.autoplay,
            autoBind: params.autoBind,
            stateMachine: params.stateMachine,
            animations: params.animations,
            stateMachines: params.stateMachines,
            artboard: params.artboard,
            useOffscreenRenderer: params.useOffscreenRenderer,
            tabIndex: params.tabIndex,
            semanticsMode: params.semanticsMode,
            semanticsOptions: params.semanticsOptions,
            enableGPUCanvas: this.deferredRenderer,
        });
    }
    Object.defineProperty(Rive, "suppressDeprecationWarnings", {
        /**
         * Deprecation warnings to silence, by {@link DeprecationId}. Each warning
         * prints the id needed to silence it, so you can copy it out of the console.
         *
         * ```ts
         * Rive.suppressDeprecationWarnings = ["rive-events", "text-runs"];
         * ```
         *
         * Assigning replaces the whole list.
         * There is no option to silence everything
         */
        get: function () {
            return Object.freeze(Array.from(suppressedDeprecations));
        },
        set: function (ids) {
            setSuppressedDeprecations(ids);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "viewModelCount", {
        get: function () {
            return this.file.viewModelCount();
        },
        enumerable: false,
        configurable: true
    });
    // Alternative constructor to build a Rive instance from an interface/object
    Rive.new = function (params) {
        warnOnce(DeprecationKeys.legacyConstructors, "This function is deprecated: please use `new Rive({})` instead");
        return new Rive(params);
    };
    /**
     * @experimental Turns on semantics and the accessibility overlay for this
     * instance. Idempotent; safe to call before or after load. Use this to drive
     * a consumer-controlled accessibility toggle when constructed with the
     * default {@link SemanticMode.Disabled}.
     */
    Rive.prototype.enableSemantics = function () {
        this.semanticsMode = _semantics__WEBPACK_IMPORTED_MODULE_2__.SemanticMode.Enabled;
        this.activateSemantics();
    };
    Rive.prototype.activateSemantics = function () {
        if (this._semanticsActive || this.semanticsMode === _semantics__WEBPACK_IMPORTED_MODULE_2__.SemanticMode.Disabled) {
            return;
        }
        this._semanticsActive = true;
        this.syncSemanticsOnStateMachines();
    };
    Rive.prototype.syncSemanticsOnStateMachines = function () {
        if (!this._semanticsActive || !this.animator) {
            return;
        }
        for (var _i = 0, _a = this.animator.stateMachines; _i < _a.length; _i++) {
            var stateMachine = _a[_i];
            stateMachine.enableSemantics();
        }
    };
    /**
     * Tears down the semantic tree and accessibility overlay. The overlay captures the
     * active state machine in its action closures, so it must not outlive the
     * instances it points at (reset/load delete them)
     */
    Rive.prototype.cleanupSemantics = function () {
        this._semanticTree = null;
        if (this._accessibilityOverlay) {
            this._accessibilityOverlay.destroy();
            this._accessibilityOverlay = null;
        }
    };
    // Event handler for when audio context becomes available
    Rive.prototype.onSystemAudioChanged = function () {
        this.volume = this._volume;
    };
    // Initializes the Rive object either from constructor or load()
    Rive.prototype.init = function (_a) {
        var _this = this;
        var _b, _c, _d, _e, _f;
        var src = _a.src, buffer = _a.buffer, riveFile = _a.riveFile, stateMachine = _a.stateMachine, animations = _a.animations, stateMachines = _a.stateMachines, artboard = _a.artboard, _g = _a.autoplay, autoplay = _g === void 0 ? false : _g, _h = _a.useOffscreenRenderer, useOffscreenRenderer = _h === void 0 ? false : _h, _j = _a.autoBind, autoBind = _j === void 0 ? false : _j, tabIndex = _a.tabIndex, semanticsMode = _a.semanticsMode, semanticsOptions = _a.semanticsOptions, enableGPUCanvas = _a.enableGPUCanvas;
        if (this.destroyed) {
            return;
        }
        // Validated before any state changes, so a call with no source leaves a
        // running instance untouched.
        if (!src && !buffer && !riveFile) {
            throw new RiveError(Rive.missingErrorMessage);
        }
        // Reload releases the outgoing file in the same order cleanup() uses:
        // artboard, then the renderer's session, then the file. The artboard goes
        // first because it holds an rcp<File> and its resources came from the
        // session about to be released. stop() has already deleted the animation
        // and state machine instances; reload deliberately skips cleanupInstances(),
        // which would also drop the event listeners load() keeps in place.
        if (this.artboard) {
            // Free GPU-backed resources with their own context current. No-op on
            // the canvas2d build.
            (_c = (_b = this.renderer) === null || _b === void 0 ? void 0 : _b.bindContext) === null || _c === void 0 ? void 0 : _c.call(_b);
            (_d = this.animator) === null || _d === void 0 ? void 0 : _d.stop();
            this.artboard.delete();
            this.artboard = null;
        }
        // Detach before the session is deleted: the handle dies with it.
        if (this.renderer) {
            (_f = (_e = this.renderer).detachSession) === null || _f === void 0 ? void 0 : _f.call(_e);
        }
        this.releaseCurrentRiveFile(/* isTeardown */ false);
        this.src = src;
        this.buffer = buffer;
        this.riveFile = riveFile;
        // initData flips this if it ends up importing the file itself.
        this.ownsRiveFile = false;
        // Sticky across reloads so a constructor-set flag survives; an explicit
        // `false` still turns it off.
        this.deferredRenderer = enableGPUCanvas !== null && enableGPUCanvas !== void 0 ? enableGPUCanvas : this.deferredRenderer;
        this._tabIndex = tabIndex !== null && tabIndex !== void 0 ? tabIndex : null;
        this.semanticsMode = semanticsMode !== null && semanticsMode !== void 0 ? semanticsMode : _semantics__WEBPACK_IMPORTED_MODULE_2__.SemanticMode.Disabled;
        this.semanticsOptions = semanticsOptions !== null && semanticsOptions !== void 0 ? semanticsOptions : this.semanticsOptions;
        // Names of the animations and state machines that should be initialized
        var _k = resolveStartingPlayback({
            stateMachine: stateMachine,
            animations: animations,
            stateMachines: stateMachines,
        }), startingAnimationNames = _k.startingAnimationNames, startingStateMachineNames = _k.startingStateMachineNames;
        // Ensure loaded is marked as false if loading new file
        this.loaded = false;
        this.readyForPlaying = false;
        this.lastRenderTime = 0;
        // Ensure the runtime is loaded
        _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.awaitInstance()
            .then(function (runtime) {
            var _a, _b;
            if (_this.destroyed) {
                return;
            }
            _this.runtime = runtime;
            _this.removeRiveListeners();
            // load() reinitializes without cleanupInstances(); drop any stale overlay
            // bound to the previous file's state machines (no-op on first construct).
            _this.cleanupSemantics();
            _this.deleteRiveRenderer();
            // Get the canvas where you want to render the animation and create a renderer
            if (_this.enablePerfMarks)
                performance.mark('rive:make-renderer:start');
            try {
                // Always immediate at creation; a deferred file attaches its session
                // to this renderer once the file has loaded.
                _this.renderer = _this.runtime.makeRenderer(_this.canvas, useOffscreenRenderer, {
                    inkbleed: _this._inkbleedCapable,
                    // An immediate file would only re-import for the worker.
                    replayWorker: _this.deferredRenderer &&
                        _this.useReplayWorker &&
                        ((_b = (_a = _this.riveFile) === null || _a === void 0 ? void 0 : _a.deferredRequested) !== null && _b !== void 0 ? _b : true),
                    // Draws notice a restored context, so one has to be scheduled.
                    onContextRestored: function () {
                        if (!_this._explicitlyStoppedRendering) {
                            _this.scheduleRendering();
                        }
                    },
                });
                if (!_this.renderer) {
                    throw new Error("Renderer is null, cannot render Rive on the canvas.");
                }
            }
            catch (e) {
                console.error(e);
                throw new RiveError("Unable to create the renderer, your environment may not support WebGL. Try the @rive-app/canvas runtime as an alternative.");
            }
            if (_this._inkbleedCapable) {
                _this.applyInkbleed();
            }
            if (_this.enablePerfMarks) {
                performance.mark('rive:make-renderer:end');
                performance.measure('rive:make-renderer', 'rive:make-renderer:start', 'rive:make-renderer:end');
            }
            // Initial size adjustment based on devicePixelRatio if no width/height are
            // specified explicitly
            if (!(_this.canvas.width || _this.canvas.height)) {
                _this.resizeDrawingSurfaceToCanvas();
            }
            // Load Rive data from a source uri or a data buffer
            _this.initData(artboard, startingAnimationNames, startingStateMachineNames, autoplay, autoBind)
                .then(function (hasInitialized) {
                if (hasInitialized) {
                    return _this.setupRiveListeners();
                }
            })
                .catch(function (e) {
                // initData already catches RiveErrors for load issues like artboard/state machine initialization
                // failures, so just console error and catch here so we don't double-fire the LoadError event
                console.error(e);
            });
        })
            .catch(function (e) {
            _this.eventManager.fire({ type: EventType.LoadError, data: e.message });
        });
    };
    /**
     * Setup Rive Listeners on the canvas
     * @param riveListenerOptions - Enables TouchEvent events on the canvas. Set to true to allow
     * touch scrolling on the canvas element on touch-enabled devices
     * i.e. { isTouchScrollEnabled: true }
     */
    Rive.prototype.setupRiveListeners = function (riveListenerOptions) {
        var _this = this;
        if (this.eventCleanup) {
            this.eventCleanup();
        }
        this.cleanupKeyboardInteractions();
        if (!this.shouldDisableRiveListeners) {
            var playingStateMachines = this.animator.stateMachines.filter(function (sm) { return sm.playing; });
            var activeStateMachines = playingStateMachines
                .filter(function (sm) { return _this.runtime.hasListeners(sm.instance); })
                .map(function (sm) { return sm.instance; });
            var touchScrollEnabledOption = this.isTouchScrollEnabled;
            var dispatchPointerExit = this.dispatchPointerExit;
            var enableMultiTouch = this.enableMultiTouch;
            if (riveListenerOptions &&
                "isTouchScrollEnabled" in riveListenerOptions) {
                touchScrollEnabledOption = riveListenerOptions.isTouchScrollEnabled;
            }
            this.eventCleanup = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.registerTouchInteractions)({
                canvas: this.canvas,
                artboard: this.artboard,
                stateMachines: activeStateMachines,
                renderer: this.renderer,
                rive: this.runtime,
                fit: this._layout.runtimeFit(this.runtime),
                alignment: this._layout.runtimeAlignment(this.runtime),
                isTouchScrollEnabled: touchScrollEnabledOption,
                dispatchPointerExit: dispatchPointerExit,
                enableMultiTouch: enableMultiTouch,
                layoutScaleFactor: this._layout.layoutScaleFactor,
                advanceAndDrain: this.advanceAndDrainForPointer.bind(this),
                summonKeyboard: this.summonKeyboardForGesture.bind(this),
                isTextProxyFocused: this.isEditingHostFocused,
            });
            this.ensureKeyboardInteractions();
            this.ensureGamepadInteractions();
        }
    };
    Object.defineProperty(Rive.prototype, "focusStateMachine", {
        // Assumes a single state machine drives focus.
        get: function () {
            return this.animator.stateMachines.find(function (sm) { return sm.playing && sm.hasFocusNodes; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Wire keyboard interactions when a playing state machine has focus nodes.
     * Called at listener setup and lazily each frame so late-bound bindable artboards work.
     */
    Rive.prototype.ensureKeyboardInteractions = function () {
        var _this = this;
        if (this._keyboardInteractions ||
            this.shouldDisableRiveListeners ||
            typeof window === "undefined" ||
            !(this.canvas instanceof HTMLCanvasElement)) {
            return;
        }
        var smWithFocusNodes = this.focusStateMachine;
        if (!smWithFocusNodes) {
            return;
        }
        var currentCanvasTabIndex = this.canvas.tabIndex;
        if (currentCanvasTabIndex === -1 || isNaN(currentCanvasTabIndex)) {
            this.canvas.tabIndex = (this._tabIndex !== null ? this._tabIndex : 0);
        }
        this._keyboardInteractions = new _utils__WEBPACK_IMPORTED_MODULE_3__.KeyboardInteractions({
            canvas: this.canvas,
            stateMachine: smWithFocusNodes.instance,
            hasFocusNodes: true,
            getOverlayElement: function () { var _a, _b; return (_b = (_a = _this._accessibilityOverlay) === null || _a === void 0 ? void 0 : _a.getSemanticOverlayContainer()) !== null && _b !== void 0 ? _b : null; },
        });
    };
    /** Runs inside touchend/mouseup so focusing the proxy raises the mobile keyboard. */
    Rive.prototype.summonKeyboardForGesture = function () {
        if (!this._keyboardInteractions)
            return;
        var activeSm = this.focusStateMachine;
        if (!activeSm)
            return;
        if (this.wantsTextInputSession(activeSm.focusState().expectsTextInput)) {
            this._keyboardInteractions.summonForPointer();
        }
    };
    /** expectsTextInput (not key listeners alone), and with semantics on a textField. */
    Rive.prototype.wantsTextInputSession = function (expectsTextInput) {
        var _a;
        if (!expectsTextInput)
            return false;
        var node = (_a = this._semanticTree) === null || _a === void 0 ? void 0 : _a.focusedNode();
        return node === undefined || node.role === _semantics__WEBPACK_IMPORTED_MODULE_2__.SemanticRole.textField;
    };
    Rive.prototype.advanceAndDrainForPointer = function (elapsedTime, options) {
        if (!(options === null || options === void 0 ? void 0 : options.pointerDown)) {
            this.advanceAndReportChanges(elapsedTime);
            return;
        }
        this._inPointerDownDrain = true;
        try {
            this.advanceAndReportChanges(elapsedTime);
        }
        finally {
            this._inPointerDownDrain = false;
        }
    };
    Rive.prototype.cleanupKeyboardInteractions = function () {
        var _a;
        if (this._keyboardInteractions) {
            this._keyboardInteractions.cleanup();
            this._keyboardInteractions = null;
        }
        this._prevWantsTextInputSession = false;
        (_a = this._accessibilityOverlay) === null || _a === void 0 ? void 0 : _a.releaseEditingHost(null, null);
    };
    // Survives play/pause/stop so the state machine only receives missed changes on resume.
    Rive.prototype.ensureGamepadInteractions = function () {
        if (this._gamepadInteractions ||
            this.shouldDisableGamepad ||
            this.shouldDisableRiveListeners) {
            return;
        }
        this._gamepadInteractions = new _utils__WEBPACK_IMPORTED_MODULE_3__.GamepadInteractions({
            requireFocus: !!this._gamepadOptions.requireFocus,
            isFocusWithin: this.isFocusWithinCanvas,
        });
    };
    Rive.prototype.cleanupGamepadInteractions = function () {
        var _a;
        (_a = this._gamepadInteractions) === null || _a === void 0 ? void 0 : _a.dispose();
        this._gamepadInteractions = null;
    };
    /**
     * Remove Rive Listeners setup on the canvas
     */
    Rive.prototype.removeRiveListeners = function () {
        if (this.eventCleanup) {
            this.eventCleanup();
            this.eventCleanup = null;
        }
        this.cleanupKeyboardInteractions();
    };
    /**
     * If the instance has audio and the system audio is not ready
     * we hook the instance to the audio manager
     */
    Rive.prototype.initializeAudio = function () {
        var _this = this;
        var _a;
        // Initialize audio if needed
        if (audioManager.status == SystemAudioStatus.UNAVAILABLE) {
            if (this.file.hasAudio ||
                (((_a = this.artboard) === null || _a === void 0 ? void 0 : _a.hasAudio) && this._audioEventListener === null)) {
                this._audioEventListener = {
                    type: EventType.AudioStatusChange,
                    callback: function () { return _this.onSystemAudioChanged(); },
                };
                audioManager.add(this._audioEventListener);
                audioManager.establishAudio();
            }
        }
    };
    Rive.prototype.initArtboardSize = function () {
        if (!this.artboard)
            return;
        // Use preset values if they are not undefined
        this._artboardWidth = this.artboard.width =
            this._artboardWidth || this.artboard.width;
        this._artboardHeight = this.artboard.height =
            this._artboardHeight || this.artboard.height;
    };
    // Initializes runtime with Rive data and preps for playing.
    // Returns true for successful initialization.
    Rive.prototype.initData = function (artboardName, animationNames, stateMachineNames, autoplay, autoBind) {
        return __awaiter(this, void 0, void 0, function () {
            var riveFile, error_4, msg;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 8, , 9]);
                        // A caller-supplied riveFile is theirs to release; one we import here is
                        // ours, which matters if a deferred fallback replaces it below.
                        this.ownsRiveFile = this.riveFile == null;
                        if (!this.ownsRiveFile) return [3 /*break*/, 2];
                        riveFile = new RiveFile({
                            src: this.src,
                            buffer: this.buffer,
                            enableRiveAssetCDN: this.enableRiveAssetCDN,
                            deferDecoding: this.deferDecoding,
                            assetLoader: this.assetLoader,
                            enablePerfMarks: this.enablePerfMarks,
                            // The instance owns this file, so its flag is the file's flag.
                            enableGPUCanvas: this.deferredRenderer,
                        });
                        this.riveFile = riveFile;
                        return [4 /*yield*/, riveFile.init()];
                    case 1:
                        _g.sent();
                        if (this.destroyed) {
                            // In the very unlikely scenario where the rive file created by this Rive is shared by
                            // another rive file, we only want to destroy it if this file is the only owner.
                            riveFile.destroyIfUnused();
                            return [2 /*return*/, false];
                        }
                        _g.label = 2;
                    case 2:
                        if (!(this.riveFile.deferredSession !== null ||
                            this.deferredRenderer ||
                            ((_b = (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.replaysOnWorker) === null || _b === void 0 ? void 0 : _b.call(_a)) === true)) return [3 /*break*/, 7];
                        if (!(((_d = (_c = this.renderer) === null || _c === void 0 ? void 0 : _c.replaysOnWorker) === null || _d === void 0 ? void 0 : _d.call(_c)) === true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.awaitReplayCaps()];
                    case 3:
                        _g.sent();
                        _g.label = 4;
                    case 4:
                        if (!!this.destroyed) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.resolveDeferredRendering()];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        if (this.destroyed) {
                            // cleanup() ran during a re-import. Taking a reference now would
                            // resurrect a file this instance is never going to draw. Only ours
                            // to release — a caller-supplied file stays theirs.
                            if (this.ownsRiveFile) {
                                (_e = this.riveFile) === null || _e === void 0 ? void 0 : _e.destroyIfUnused();
                            }
                            return [2 /*return*/, false];
                        }
                        _g.label = 7;
                    case 7:
                        this.file = this.riveFile.getInstance();
                        this.reportDisplayScale();
                        // Initialize and draw frame
                        this.initArtboard(artboardName, animationNames, stateMachineNames, autoplay, autoBind);
                        // Initialize the artboard size
                        this.initArtboardSize();
                        // Check for audio
                        this.initializeAudio();
                        if (this.semanticsMode === _semantics__WEBPACK_IMPORTED_MODULE_2__.SemanticMode.Enabled) {
                            this.activateSemantics();
                        }
                        else if (this._semanticsActive) {
                            this.syncSemanticsOnStateMachines();
                        }
                        // Everything's set up, emit a load event
                        try {
                            this.loaded = true;
                            this.eventManager.fire({
                                type: EventType.Load,
                                data: (_f = this.src) !== null && _f !== void 0 ? _f : "buffer",
                            });
                        }
                        catch (e) {
                            // If any synchronous errors surface from the user-supplied onLoad callback,
                            // this will console.error the error but will not invoke LoadError (onLoadError).
                            // Notably, this will not interfere with Rive rendering
                            console.error(e);
                        }
                        // Only initialize paused state machines after the load event has been fired
                        // to allow users to initialize inputs and view models before the first advance
                        this.animator.advanceIfPaused();
                        // Flag ready for playback commands and clear the task queue; this order
                        // is important or it may infinitely recurse
                        this.readyForPlaying = true;
                        this.taskQueue.process();
                        this.drawFrame();
                        return [2 /*return*/, true];
                    case 8:
                        error_4 = _g.sent();
                        msg = resolveErrorMessage(error_4);
                        this.eventManager.fire({ type: EventType.LoadError, data: msg });
                        return [2 /*return*/, Promise.reject(msg)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Settles which rendering mode this Rive instance runs in. The file dictates: its rendering mode
     * is fixed at import, and an immediate renderer silently drops a deferred
     * file's resources. Every mismatch warns and degrades to something that
     * renders, so users shouldn't have a blank canvas. A fallback self-reimport replaces `this.riveFile`;
     * only a file this instance imported is released when that happens.
     */
    Rive.prototype.resolveDeferredRendering = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, ownsFile, renderer, session, deferredOnly, attached_1, attachSession, immediate, _a, copy, attached, fallback;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        file = this.riveFile;
                        ownsFile = this.ownsRiveFile;
                        renderer = this.renderer;
                        session = file.deferredSession;
                        deferredOnly = ((_b = renderer === null || renderer === void 0 ? void 0 : renderer.replaysOnWorker) === null || _b === void 0 ? void 0 : _b.call(renderer)) === true;
                        if (!(session === null)) return [3 /*break*/, 3];
                        if (!deferredOnly) return [3 /*break*/, 2];
                        console.warn("Rive: this canvas draws on the replay worker, which only replays GPU Canvas files. Re-importing the file with `enableGPUCanvas: true` for this instance.");
                        return [4 /*yield*/, this.attachDeferredCopy(file, renderer)];
                    case 1:
                        attached_1 = (_d.sent()).attached;
                        if (attached_1 && ownsFile) {
                            file.destroyIfUnused();
                        }
                        return [2 /*return*/];
                    case 2:
                        // No second warning when the file asked for deferred and the build
                        // could not honor it; the unsupported-build warning already fired, and
                        // telling the user to set a flag they set would mislead.
                        if (this.deferredRenderer && !file.deferredRequested) {
                            console.warn("Rive: `enableGPUCanvas: true` was ignored because this RiveFile was imported without it. The mode is fixed at import: construct the RiveFile with `enableGPUCanvas: true` to opt in.");
                        }
                        return [2 /*return*/];
                    case 3:
                        if (!this.deferredRenderer) {
                            console.warn("Rive: this RiveFile was imported with `enableGPUCanvas: true`, so this instance renders deferred even though `enableGPUCanvas` is false on the instance. An immediate renderer would drop the file's deferred resources and draw nothing.");
                        }
                        attachSession = renderer === null || renderer === void 0 ? void 0 : renderer.attachSession;
                        if (!(typeof attachSession !== "function")) return [3 /*break*/, 5];
                        // Offscreen renderers share one context across canvases, which a session
                        // cannot record for. An immediate copy of the file still renders.
                        console.warn("Rive: this renderer cannot replay a deferred session (`useOffscreenRenderer` is not supported with deferred rendering). Re-importing the file in immediate mode for this instance.");
                        return [4 /*yield*/, file.reimport(false)];
                    case 4:
                        immediate = _d.sent();
                        if (this.destroyed) {
                            // cleanup() ran while we were importing; nothing will use this copy.
                            immediate.destroyIfUnused();
                            return [2 /*return*/];
                        }
                        this.riveFile = immediate;
                        this.ownsRiveFile = true;
                        if (ownsFile) {
                            // Nothing else can reach the deferred import we just walked away from.
                            file.destroyIfUnused();
                        }
                        return [2 /*return*/];
                    case 5:
                        // Never re-offered once claimed, even if that renderer is gone: the
                        // resources the session's stream refers to died with it.
                        if (!file.sessionClaimed && attachSession.call(renderer, session)) {
                            file.claimSession();
                            return [2 /*return*/];
                        }
                        // Bound to another instance. Re-import from the retained buffer into a
                        // session of our own.
                        file.warnBoundElsewhereOnce();
                        return [4 /*yield*/, this.attachDeferredCopy(file, renderer)];
                    case 6:
                        _a = _d.sent(), copy = _a.copy, attached = _a.attached;
                        if (attached || this.destroyed) {
                            return [2 /*return*/];
                        }
                        if (deferredOnly) {
                            console.warn("Rive: could not attach the re-imported file's deferred session to this canvas, which draws on the replay worker and has no immediate fallback.");
                            return [2 /*return*/];
                        }
                        // The copy's session could not take this canvas either (this renderer
                        // already holds one). An immediate re-import still renders; a deferred file
                        // on an immediate renderer would drop its resources and draw nothing.
                        console.warn("Rive: could not attach the re-imported file's deferred session to this canvas; falling back to immediate rendering for this instance.");
                        // If a leftover session is why the attach failed, it would keep routing
                        // the immediate file's draws into its recorder, which drops them.
                        (_c = renderer.detachSession) === null || _c === void 0 ? void 0 : _c.call(renderer);
                        return [4 /*yield*/, file.reimport(false)];
                    case 7:
                        fallback = _d.sent();
                        // The deferred copy was only ever ours, so it always goes.
                        copy.destroyIfUnused();
                        if (this.destroyed) {
                            fallback.destroyIfUnused();
                            return [2 /*return*/];
                        }
                        this.riveFile = fallback;
                        this.ownsRiveFile = true;
                        if (ownsFile) {
                            file.destroyIfUnused();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Reloads what this instance was playing. State the reload does not carry,
    // such as a view model instance bound by hand, starts over.
    Rive.prototype.reloadForRestoredContext = function () {
        // A copy re-imported for this instance kept no source to reload from.
        var riveFile = this.ownsRiveFile ? undefined : this.riveFile;
        if (!this.src && !this.buffer && !riveFile) {
            this.stopRendering();
            if (!Rive.replayContextLostWarned) {
                Rive.replayContextLostWarned = true;
                console.warn("Rive: the replay worker's WebGL context was restored, but this instance has no `src` or `buffer` to reload from, so its canvas stays blank.");
            }
            return;
        }
        this.load({
            src: this.src,
            buffer: this.buffer,
            riveFile: riveFile,
            artboard: this.activeArtboard,
            animations: this.playingAnimationNames.concat(this.pausedAnimationNames),
            stateMachines: this.playingStateMachineNames.concat(this.pausedStateMachineNames),
            autoplay: this.isPlaying,
            autoBind: this._viewModelInstance !== null,
            enableGPUCanvas: this.deferredRenderer,
        });
    };
    /**
     * Re-imports `file` deferred and attaches the copy's session to `renderer`.
     * The copy becomes this instance's file either way, unless the instance was
     * destroyed while it imported.
     */
    Rive.prototype.attachDeferredCopy = function (file, renderer) {
        return __awaiter(this, void 0, void 0, function () {
            var copy, copySession, attached;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, file.reimport(true)];
                    case 1:
                        copy = _b.sent();
                        if (this.destroyed) {
                            // The renderer was deleted while we imported; attaching to it would hand
                            // embind a deleted object.
                            copy.destroyIfUnused();
                            return [2 /*return*/, { copy: copy, attached: false }];
                        }
                        this.riveFile = copy;
                        this.ownsRiveFile = true;
                        copySession = copy.deferredSession;
                        attached = copySession !== null && ((_a = renderer.attachSession) === null || _a === void 0 ? void 0 : _a.call(renderer, copySession)) === true;
                        if (attached) {
                            copy.claimSession();
                        }
                        return [2 /*return*/, { copy: copy, attached: attached }];
                }
            });
        });
    };
    // Initialize for playback
    Rive.prototype.initArtboard = function (artboardName, animationNames, stateMachineNames, autoplay, autoBind) {
        if (!this.file) {
            return;
        }
        // Fetch the artboard
        var rootArtboard = artboardName
            ? this.file.artboardByName(artboardName)
            : this.file.defaultArtboard();
        // Check we have a working artboard
        if (!rootArtboard) {
            throw new RiveError("Invalid artboard name or no default artboard");
        }
        this.artboard = rootArtboard;
        rootArtboard.volume = this._volume * audioManager.systemVolume;
        // Initialize the animator
        this.animator = new Animator(this.runtime, this.artboard, this.eventManager);
        // Initialize the animations; as loaded hasn't happened yet, we need to
        // suppress firing the play/pause events until the load event has fired. To
        // do this we tell the animator to suppress firing events, and add event
        // firing to the task queue.
        var instanceNames;
        if (animationNames.length > 0 || stateMachineNames.length > 0) {
            instanceNames = animationNames.concat(stateMachineNames);
            this.animator.initLinearAnimations(animationNames, autoplay);
            this.animator.initStateMachines(stateMachineNames, autoplay, this._semanticsActive);
        }
        else {
            instanceNames = [this.animator.atLeastOne(autoplay, false, this._semanticsActive)];
        }
        // Queue up firing the playback events
        this.taskQueue.add({
            event: {
                type: autoplay ? EventType.Play : EventType.Pause,
                data: instanceNames,
            },
        });
        if (autoBind) {
            // Set the main view model instance (if the artboard has one)...
            var viewModel = this.file.defaultArtboardViewModel(rootArtboard);
            if (viewModel !== null) {
                var runtimeInstance = viewModel.defaultInstance();
                if (runtimeInstance !== null) {
                    var viewModelInstance = new ViewModelInstance(runtimeInstance, null);
                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(viewModelInstance, viewModelInstance.runtimeInstance);
                    this.setViewModelInstance(viewModelInstance);
                }
            }
            // ...and a default instance for each global view model (no longer
            // auto-created by the runtime), then apply everything in one rebind.
            for (var _i = 0, _a = this.file.globalViewModelNames(); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                var globalViewModel = this.file.viewModelByName(name_1);
                if (globalViewModel !== null) {
                    var instance = new ViewModel(globalViewModel).defaultInstance();
                    if (instance !== null) {
                        this.setGlobalViewModelInstance(name_1, instance);
                    }
                }
            }
            this.bind();
        }
    };
    // Draws the current artboard frame
    Rive.prototype.drawFrame = function () {
        var _a, _b;
        if ((_a = document === null || document === void 0 ? void 0 : document.timeline) === null || _a === void 0 ? void 0 : _a.currentTime) {
            if (this.loaded && this.artboard && !this.frameRequestId) {
                this.draw(null);
                (_b = this.runtime) === null || _b === void 0 ? void 0 : _b.resolveAnimationFrame();
            }
        }
        else {
            this.scheduleRendering();
        }
    };
    Rive.prototype._canvasSizeChanged = function () {
        var changed = false;
        if (this.canvas) {
            if (this.canvas.width !== this._currentCanvasWidth) {
                this._currentCanvasWidth = this.canvas.width;
                changed = true;
            }
            if (this.canvas.height !== this._currentCanvasHeight) {
                this._currentCanvasHeight = this.canvas.height;
                changed = true;
            }
        }
        return changed;
    };
    // Content the artboard's change flag cannot see: ore and GPU canvas commands
    // scripts record straight into the session. Must be read before the renderer
    // clears — clearing marks the stream, so a later read is true every frame.
    Rive.prototype._deferredWorkPending = function () {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.deferredSession) === null || _b === void 0 ? void 0 : _b.recordedThisFrame()) !== null && _c !== void 0 ? _c : false;
    };
    /** Rive can move focus on its own, so reconcile the text session and DOM focus each frame. */
    Rive.prototype.pollFocusState = function () {
        this.ensureKeyboardInteractions();
        var ki = this._keyboardInteractions;
        var activeSm = ki ? this.focusStateMachine : undefined;
        if (!ki || !activeSm || !(this.canvas instanceof HTMLCanvasElement)) {
            this._prevHasFocus = false;
            this._prevWantsTextInputSession = false;
            return;
        }
        var _a = activeSm.focusState(), hasFocus = _a.hasFocus, expectsTextInput = _a.expectsTextInput;
        this.syncTextInputSession(ki, this.wantsTextInputSession(expectsTextInput));
        this.syncRiveFocus(ki, this.canvas, hasFocus);
    };
    /** Begin/end the text session on wantsSession edges; decorate the proxy while it has DOM focus. */
    Rive.prototype.syncTextInputSession = function (ki, wantsSession) {
        var host = ki.editingHost;
        var overlay = this._accessibilityOverlay;
        if (wantsSession) {
            var began = !this._prevWantsTextInputSession;
            if (began) {
                // In-domain or opted-in only; during pointer-down, pointer-up focuses instead.
                var focusProxy = !this._inPointerDownDrain &&
                    (ki.isInFocusDomain(document.activeElement) ||
                        !!this._focusOptions.allowFocusInterrupt);
                ki.beginTextInputSession(focusProxy);
            }
            // The <input> proxy stands in for the semantic DOM field only while it holds DOM focus.
            if (overlay && this._semanticTree) {
                if (host.hasDomFocus()) {
                    overlay.syncEditingHost(this._semanticTree, host, began || !overlay.hasEditingHost());
                }
                else if (overlay.hasEditingHost()) {
                    overlay.releaseEditingHost(this._semanticTree, host);
                }
            }
        }
        else if (this._prevWantsTextInputSession) {
            // Overlay hand-off first, ahead of endTextInputSession's park-on-canvas fallback.
            overlay === null || overlay === void 0 ? void 0 : overlay.releaseEditingHost(this._semanticTree, host);
            ki.endTextInputSession();
        }
        this._prevWantsTextInputSession = wantsSession;
    };
    /** Mirror Rive's hasFocus into the keyboard session state and, on opt-in, canvas focus. */
    Rive.prototype.syncRiveFocus = function (ki, canvas, hasFocus) {
        if (hasFocus) {
            ki.notifyRiveFocused();
            // Pull focus from outside Rive only with allowFocusInterrupt.
            if (!this._prevHasFocus) {
                if (!ki.isInFocusDomain(document.activeElement) &&
                    this._focusOptions.allowFocusInterrupt) {
                    canvas.focus();
                }
                this._prevHasFocus = true;
            }
        }
        else {
            this._prevHasFocus = false;
            // Rive released focus internally (e.g. a state change): drop the Tab trap so the next
            // Tab leaves the canvas.
            if (ki.focusSessionState === _utils__WEBPACK_IMPORTED_MODULE_3__.FocusSessionState.RiveFocused) {
                ki.setFocusSessionState(_utils__WEBPACK_IMPORTED_MODULE_3__.FocusSessionState.NotFocused);
            }
        }
    };
    /**
     * Handles important sequence of reporting Rive events, advancing the state machine or animation, and invoking various callbacks
     * due to state changes, view model property changes, etc.
     *
     * @param elapsedTime time to advance the state machine by
     * @param frameTime the rAF timestamp; omitted by pointer drains, which skip gamepad polling.
     */
    Rive.prototype.advanceAndReportChanges = function (elapsedTime, frameTime) {
        var _a, _b, _c, _d;
        // - Advance non-paused animations by the elapsed number of seconds
        // - Advance any animations that require scrubbing
        // - Advance to the first frame even when autoplay is false
        var activeAnimations = this.animator.animations
            .filter(function (a) { return a.playing || a.needsScrub; })
            // The scrubbed animations must be applied first to prevent weird artifacts
            // if the playing animations conflict with the scrubbed animating attribuates.
            .sort(function (first) { return (first.needsScrub ? -1 : 1); });
        for (var _i = 0, activeAnimations_1 = activeAnimations; _i < activeAnimations_1.length; _i++) {
            var animation = activeAnimations_1[_i];
            animation.advance(elapsedTime);
            if (animation.instance.didLoop) {
                animation.loopCount += 1;
            }
            animation.apply(1.0);
        }
        // - Advance non-paused state machines by the elapsed number of seconds
        // - Advance to the first frame even when autoplay is false
        var activeStateMachines = this.animator.stateMachines.filter(function (a) { return a.playing; });
        // Gamepad input lands before this frame's advance.
        // Also, frameTime is not passed for other places this function is called (i.e. after pointer events)
        if (frameTime !== undefined) {
            (_a = this._gamepadInteractions) === null || _a === void 0 ? void 0 : _a.handleGamepadInputs(frameTime, (_b = activeStateMachines[0]) === null || _b === void 0 ? void 0 : _b.instance);
        }
        // Instrument the first 3 frames so the Performance timeline shows precise
        // per-call latency for advance, draw, and flush without polluting the trace.
        var _perfFrame = this.enablePerfMarks && this.frameCount < 3 ? this.frameCount : -1;
        for (var _e = 0, activeStateMachines_1 = activeStateMachines; _e < activeStateMachines_1.length; _e++) {
            var stateMachine = activeStateMachines_1[_e];
            // Check for events before the current frame's state machine advance
            var numEventsReported = stateMachine.reportedEventCount();
            if (numEventsReported) {
                for (var i = 0; i < numEventsReported; i++) {
                    var event_1 = stateMachine.reportedEventAt(i);
                    if (event_1) {
                        if (event_1.type === RiveEventType.OpenUrl) {
                            this.eventManager.fire({
                                type: EventType.RiveEvent,
                                data: event_1,
                            });
                            // Handle the event side effect if explicitly enabled
                            if (this.automaticallyHandleEvents) {
                                var newAnchorTag = document.createElement("a");
                                var _f = event_1, url = _f.url, target = _f.target;
                                var sanitizedUrl = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.sanitizeUrl)(url);
                                url && newAnchorTag.setAttribute("href", sanitizedUrl);
                                target && newAnchorTag.setAttribute("target", target);
                                if (sanitizedUrl && sanitizedUrl !== _utils__WEBPACK_IMPORTED_MODULE_3__.BLANK_URL) {
                                    newAnchorTag.click();
                                }
                            }
                        }
                        else {
                            this.eventManager.fire({
                                type: EventType.RiveEvent,
                                data: event_1,
                            });
                        }
                    }
                }
            }
            if (_perfFrame >= 0)
                performance.mark("rive:sm-advance:start:f".concat(_perfFrame));
            stateMachine.advanceAndApply(elapsedTime);
            if (_perfFrame >= 0) {
                performance.mark("rive:sm-advance:end:f".concat(_perfFrame));
                performance.measure("rive:sm-advance:f".concat(_perfFrame), "rive:sm-advance:start:f".concat(_perfFrame), "rive:sm-advance:end:f".concat(_perfFrame));
            }
            if (this._semanticsActive) {
                var diff = stateMachine.drainSemanticsDiff();
                if (diff) {
                    if (!this._semanticTree) {
                        this._semanticTree = new _semantics__WEBPACK_IMPORTED_MODULE_2__.SemanticTreeModel();
                    }
                    this._semanticTree.applyDiff(diff);
                }
            }
        }
        // Update the accessibility overlay after all state machines have
        // been advanced and their diffs applied to the tree model.
        if (this._semanticsActive &&
            this._semanticTree &&
            activeStateMachines.length > 0 &&
            this.canvas instanceof HTMLCanvasElement) {
            if (!this._accessibilityOverlay) {
                var mainSm_1 = activeStateMachines[0];
                this._accessibilityOverlay = new _semantics__WEBPACK_IMPORTED_MODULE_2__.AccessibilityOverlay({
                    canvas: this.canvas,
                    instanceId: this._instanceId,
                    semanticsOptions: this.semanticsOptions,
                    allowFocusInterrupt: this._focusOptions.allowFocusInterrupt,
                    isEditingHostFocused: this.isEditingHostFocused,
                    fireAction: function (nodeId, actionType) {
                        mainSm_1.fireSemanticAction(nodeId, actionType);
                    },
                    requestFocus: function (nodeId) {
                        return mainSm_1.focusSemanticNode(nodeId);
                    },
                    clearFocus: function () {
                        return mainSm_1.instance.clearFocus();
                    },
                });
            }
            var overlayChange = (_c = this._accessibilityOverlay) === null || _c === void 0 ? void 0 : _c.needsUpdate(this._semanticTree);
            if (overlayChange || this._overlayTransformDirty) {
                // Only recompute the artboard→canvas transform when something that
                // affects it changed (canvas geometry or a layout/dpr input). When only
                // the semantic tree changed we pass null and reuse the existing CSS
                // transform on the overlay container.
                var forwardMat = null;
                if ((overlayChange === null || overlayChange === void 0 ? void 0 : overlayChange.layoutChanged) || this._overlayTransformDirty) {
                    var fit_1 = this._layout.runtimeFit(this.runtime);
                    var alignment = this._layout.runtimeAlignment(this.runtime);
                    forwardMat = this.runtime.computeAlignment(fit_1, alignment, {
                        minX: this._layout.minX,
                        minY: this._layout.minY,
                        maxX: this._layout.maxX,
                        maxY: this._layout.maxY,
                    }, this.artboard.bounds, this._devicePixelRatioUsed * this._layout.layoutScaleFactor);
                    this._overlayTransformDirty = false;
                }
                this._accessibilityOverlay.update(this._semanticTree, forwardMat, this._devicePixelRatioUsed, this.artboard.bounds, overlayChange);
                forwardMat === null || forwardMat === void 0 ? void 0 : forwardMat.delete();
            }
        }
        // For linear animations that have been applied to the artboard, advance it
        // by the elapsed time.
        if (this.animator.stateMachines.length == 0) {
            this.artboard.advance(elapsedTime);
        }
        // Check for any animations that looped
        this.animator.handleLooping();
        // Check for any state machines that had a state change
        this.animator.handleStateChanges();
        // Report advanced time
        this.animator.handleAdvancing(elapsedTime);
        // Poll focus state to see whether or not to blur or pull up a virtual keyboard for any change to a text input node.
        this.pollFocusState();
        // Reattaches after reset(), which doesn't rerun setupRiveListeners. Runs after the
        // advance so a new state machine has its initial focus before input arrives.
        this.ensureGamepadInteractions();
        // Handle callbacks for main view model property changes
        (_d = this._viewModelInstance) === null || _d === void 0 ? void 0 : _d.handleCallbacks();
        // Handle callbacks for global view model property changes
        this._globalViewModelInstances.forEach(function (instance) {
            if (instance) {
                instance.handleCallbacks();
            }
        });
    };
    /**
     * Draw rendering loop; renders animation frames at the correct time interval.
     * @param time the rAF timestamp, or null to draw now without advancing
     */
    Rive.prototype.draw = function (time, onSecond) {
        var _a, _b, _c, _d, _e, _f;
        // Clear the frameRequestId, as we're now rendering a fresh frame
        this.frameRequestId = null;
        // load() tears the artboard down and re-inits asynchronously; a frame
        // queued before that lands here with nothing to draw.
        if (!this.artboard) {
            return;
        }
        // The replay worker's context came back empty, so everything it held has
        // to be recorded again through a fresh renderer and session.
        if (((_b = (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.contextRestored) === null || _b === void 0 ? void 0 : _b.call(_a)) === true) {
            this.reloadForRestoredContext();
            return;
        }
        // The replay worker has yet to take the canvas, is still on earlier
        // frames, or is slower than the display and this frame falls between its
        // paced ones. Waiting keeps its queue bounded, and the frame that follows
        // advances by the whole wait, so playback keeps time.
        var accepts = ((_d = (_c = this.renderer) === null || _c === void 0 ? void 0 : _c.acceptsFrame) === null || _d === void 0 ? void 0 : _d.call(_c)) !== false;
        var replayMs = (_f = (_e = this.renderer) === null || _e === void 0 ? void 0 : _e.replayMs) === null || _f === void 0 ? void 0 : _f.call(_e);
        if (time !== null && replayMs !== undefined
            ? !this.replayPacer.shouldRecord(time, replayMs, accepts)
            : !accepts) {
            this.scheduleRendering();
            return;
        }
        var before = performance.now();
        // Instrument the first 3 frames so the Performance timeline shows precise
        // per-call latency for advance, draw, and flush without polluting the trace.
        var _perfFrame = this.enablePerfMarks && this.frameCount < 3 ? this.frameCount : -1;
        var batch = Rive.batchStart;
        if (time !== null && batch.time !== time) {
            batch.time = time;
            batch.now = before;
        }
        // A frame queued during a long task is stamped inside it: start at now.
        if (!this.lastRenderTime && time !== null) {
            this.lastRenderTime = Math.max(time, batch.now);
        }
        else if (time !== null && time < this.lastRenderTime) {
            // The now-seed can lead the next stamp by a vsync; restart, don't freeze.
            this.lastRenderTime = time;
        }
        // Out-of-frame draws keep the clock: timeline time is frozen per task.
        var frameTime = time === null ? this.lastRenderTime : Math.max(time, this.lastRenderTime);
        // Handle the onSecond callback
        this.renderSecondTimer += frameTime - this.lastRenderTime;
        if (this.renderSecondTimer > 5000) {
            this.renderSecondTimer = 0;
            onSecond === null || onSecond === void 0 ? void 0 : onSecond();
        }
        // Calculate the elapsed time between frames in seconds
        var elapsedTime = (frameTime - this.lastRenderTime) / 1000;
        this.lastRenderTime = frameTime;
        this.advanceAndReportChanges(elapsedTime, time);
        var renderer = this.renderer;
        // Don't draw on a 0-size canvas; redraw once it has area. The observer
        // flags zero size late, so also check the surface itself.
        var hasSurface = this.canvas.width > 0 && this.canvas.height > 0;
        if (!hasSurface) {
            this._needsRedraw = true;
        }
        if (!this._hasZeroSize && hasSurface) {
            // If there was no dirt on this frame, do not clear and draw. The deferred
            // term has to be read here, before `clear()` below: clearing opens the
            // session's recording window and marks its stream, so a read taken after
            // it reports every frame as dirty and nothing is ever skipped.
            if (this.drawOptimization == DrawOptimizationOptions.AlwaysDraw ||
                this.artboard.didChange() ||
                this._deferredWorkPending() ||
                this._needsRedraw ||
                this._canvasSizeChanged()) {
                // Canvas must be wiped to prevent artifacts
                renderer.clear();
                renderer.save();
                // Update the renderer alignment if necessary
                if (_perfFrame >= 0)
                    performance.mark("rive:align-renderer:start:f".concat(_perfFrame));
                this.alignRenderer();
                if (_perfFrame >= 0) {
                    performance.mark("rive:align-renderer:end:f".concat(_perfFrame));
                    performance.measure("rive:align-renderer:f".concat(_perfFrame), "rive:align-renderer:start:f".concat(_perfFrame), "rive:align-renderer:end:f".concat(_perfFrame));
                }
                if (_perfFrame >= 0)
                    performance.mark("rive:artboard-draw:start:f".concat(_perfFrame));
                this.artboard.draw(renderer);
                if (_perfFrame >= 0) {
                    performance.mark("rive:artboard-draw:end:f".concat(_perfFrame));
                    performance.measure("rive:artboard-draw:f".concat(_perfFrame), "rive:artboard-draw:start:f".concat(_perfFrame), "rive:artboard-draw:end:f".concat(_perfFrame));
                }
                renderer.restore();
                if (_perfFrame >= 0)
                    performance.mark("rive:renderer-flush:start:f".concat(_perfFrame));
                renderer.flush();
                if (_perfFrame >= 0) {
                    performance.mark("rive:renderer-flush:end:f".concat(_perfFrame));
                    performance.measure("rive:renderer-flush:f".concat(_perfFrame), "rive:renderer-flush:start:f".concat(_perfFrame), "rive:renderer-flush:end:f".concat(_perfFrame));
                }
                this._needsRedraw = false;
            }
        }
        // Add duration to create frame to durations array
        this.frameCount++;
        var after = performance.now();
        this.frameTimes.push(after);
        this.durations.push(after - before);
        while (this.frameTimes[0] <= after - 1000) {
            this.frameTimes.shift();
            this.durations.shift();
        }
        // Calling requestAnimationFrame will rerun draw() at the correct rate:
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
        if (this.animator.isPlaying) {
            // Request a new rendering frame
            this.scheduleRendering();
        }
        else if (this.animator.isPaused) {
            // Reset the end time so on playback it starts at the correct frame
            this.lastRenderTime = 0;
        }
        else if (this.animator.isStopped) {
            // Reset animation instances, artboard and time
            // TODO: implement this properly when we have instancing
            // this.initArtboard();
            // this.drawFrame();
            this.lastRenderTime = 0;
        }
    };
    /**
     * Align the renderer
     */
    Rive.prototype.alignRenderer = function () {
        var _a = this, renderer = _a.renderer, runtime = _a.runtime, _layout = _a._layout, artboard = _a.artboard;
        // Align things up safe in the knowledge we can restore if changed
        renderer.align(_layout.runtimeFit(runtime), _layout.runtimeAlignment(runtime), {
            minX: _layout.minX,
            minY: _layout.minY,
            maxX: _layout.maxX,
            maxY: _layout.maxY,
        }, artboard.bounds, this._devicePixelRatioUsed * _layout.layoutScaleFactor);
    };
    Object.defineProperty(Rive.prototype, "fps", {
        get: function () {
            return this.durations.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "frameTime", {
        get: function () {
            if (this.durations.length === 0) {
                return 0;
            }
            return (this.durations.reduce(function (a, b) { return a + b; }, 0) / this.durations.length).toFixed(4);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Cleans up all Wasm-generated objects that need to be manually destroyed:
     * artboard instances, animation instances, state machine instances,
     * renderer instance, file and runtime.
     *
     * Once this is called, you will need to initialise a new instance of the
     * Rive class
     */
    Rive.prototype.cleanup = function () {
        var _a, _b, _c, _d, _e;
        this.destroyed = true;
        // Stop the renderer if it hasn't already been stopped.
        this.stopRendering();
        // Make the GL context backing this renderer current before any WASM teardown
        // that frees GPU resources. Binding here covers the artboard/file deletes;
        // deleteRiveRenderer() re-binds for the renderer's own delete. No-op on the
        // canvas2d build
        (_b = (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.bindContext) === null || _b === void 0 ? void 0 : _b.call(_a);
        // Clean up any artboard, animation or state machine instances.
        this.cleanupInstances();
        // Remove from observer
        if (this._observed !== null) {
            observers.remove(this._observed);
        }
        this.removeRiveListeners();
        // The file and its session go before the renderer: the session's replay
        // state lives in the renderer's context. But the renderer must let go of
        // the session first — its detach handle dies with session.delete(), and a
        // later detach would pass embind a deleted object.
        if (this.renderer) {
            (_d = (_c = this.renderer).detachSession) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
        this.releaseCurrentRiveFile(/* isTeardown */ true);
        this.riveFile = null;
        this.deleteRiveRenderer();
        if (this._audioEventListener !== null) {
            audioManager.remove(this._audioEventListener);
            this._audioEventListener = null;
        }
        if (this._pageVisibilityHandler) {
            document.removeEventListener('visibilitychange', this._pageVisibilityHandler);
            this._pageVisibilityHandler = null;
        }
        (_e = this._viewModelInstance) === null || _e === void 0 ? void 0 : _e.cleanup();
        this._viewModelInstance = null;
        this._globalViewModelInstances.forEach(function (instance) { return instance.cleanup(); });
        this._globalViewModelInstances.clear();
        this._dataEnums = null;
    };
    /**
     * Drops this instance's hold on `this.riveFile`. A reference taken through
     * getInstance() is given back; a file we imported but never referenced is
     * released outright so its session goes with it. A caller-supplied file we
     * never referenced is left alone.
     *
     * `isTeardown` distinguishes cleanup() from a reload. Teardown always hands
     * the reference back, as it always has. A reload must not do that for a
     * caller-supplied file: a RiveFile carries no reference for its creator, so
     * releasing here would take the last one and destroy a file the caller still
     * holds.
     */
    Rive.prototype.releaseCurrentRiveFile = function (isTeardown) {
        var _a, _b;
        if (this.file) {
            if (isTeardown || this.ownsRiveFile) {
                (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.cleanup();
            }
            this.file = null;
        }
        else if (this.ownsRiveFile) {
            (_b = this.riveFile) === null || _b === void 0 ? void 0 : _b.destroyIfUnused();
        }
    };
    /**
     * Cleans up the Renderer object. Only call this API if you no longer
     * need to render Rive content in your session.
     */
    Rive.prototype.deleteRiveRenderer = function () {
        var _a, _b;
        if (this.renderer) {
            // A session outliving this renderer has to stop pointing at it, and its
            // replay state has to drop while this context is still alive. No-op when
            // nothing was ever attached.
            (_b = (_a = this.renderer).detachSession) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.renderer.delete();
        }
        this.renderer = null;
    };
    Object.defineProperty(Rive.prototype, "deferredRendererActive", {
        /**
         * @experimental This API is early and may encounter breaking behavior change without a major version bump
         *
         * Whether this instance is rendering through a deferred session. False whenever
         * a fallback ran, whatever was requested.
         */
        get: function () {
            var _a, _b, _c;
            return (_c = (_b = (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.deferredActive) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Cleans up any Wasm-generated objects that need to be manually destroyed:
     * artboard instances, animation instances, state machine instances.
     *
     * Once this is called, things will need to be reinitialized or bad things
     * might happen.
     */
    Rive.prototype.cleanupInstances = function () {
        var _a;
        if (this.eventCleanup !== null) {
            this.eventCleanup();
        }
        this.cleanupKeyboardInteractions();
        this.cleanupGamepadInteractions();
        // Tear down semantics before deleting state machines — the overlay's action
        // closures point at instances that stop() is about to free.
        this.cleanupSemantics();
        // Delete all animation and state machine instances synchronously via the
        // animator
        (_a = this.animator) === null || _a === void 0 ? void 0 : _a.stop();
        if (this.artboard) {
            this.artboard.delete();
            this.artboard = null;
        }
    };
    /**
     * Tries to query the setup Artboard for a text run node with the given name.
     *
     * @param textRunName - Name of the text run node associated with a text object
     * @returns - TextValueRun node or undefined if the text run cannot be queried
     */
    Rive.prototype.retrieveTextRun = function (textRunName) {
        var _a;
        if (!textRunName) {
            console.warn("No text run name provided");
            return;
        }
        if (!this.artboard) {
            console.warn("Tried to access text run, but the Artboard is null");
            return;
        }
        var textRun = this.artboard.textRun(textRunName);
        if (!textRun) {
            console.warn("Could not access a text run with name '".concat(textRunName, "' in the '").concat((_a = this.artboard) === null || _a === void 0 ? void 0 : _a.name, "' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime."));
            return;
        }
        return textRun;
    };
    /**
     * Returns a string from a given text run node name, or undefined if the text run
     * cannot be queried.
     *
     * @deprecated Text run APIs are deprecated: use data binding instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide#updating-text-runs-at-runtime}
     * for how to migrate.
     * @param textRunName - Name of the text run node associated with a text object
     * @returns - String value of the text run node or undefined
     */
    Rive.prototype.getTextRunValue = function (textRunName) {
        warnOnce(DeprecationKeys.textRuns, textRunsDeprecationWarning);
        var textRun = this.retrieveTextRun(textRunName);
        return textRun ? textRun.text : undefined;
    };
    /**
     * Sets a text value for a given text run node name if possible
     *
     * @deprecated Text run APIs are deprecated: use data binding instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide#updating-text-runs-at-runtime}
     * for how to migrate.
     * @param textRunName - Name of the text run node associated with a text object
     * @param textRunValue - String value to set on the text run node
     */
    Rive.prototype.setTextRunValue = function (textRunName, textRunValue) {
        warnOnce(DeprecationKeys.textRuns, textRunsDeprecationWarning);
        var textRun = this.retrieveTextRun(textRunName);
        if (textRun) {
            textRun.text = textRunValue;
        }
    };
    /**
     * Warns when playback-control names match linear animations in the
     * Animator's instanced context; state machine playback remain supported.
     *
     * Remove for v3 release
     */
    Rive.prototype.warnIfLinearAnimationNames = function (names, methodName) {
        if (this.animator &&
            this.animator.animations.some(function (a) { return names.includes(a.name); })) {
            warnDeprecatedAnimationNames(methodName);
        }
    };
    /**
     * Plays specified animations or state machines; if none specified, it
     * unpauses everything.
     * @param animationNames Animation or state machine name(s) to play.
     *
     * Deprecated usage: passing linear animation names (control playback with a
     * state machine instead) and passing an array of names (this parameter
     * becomes a single string in the next major version).
     */
    Rive.prototype.play = function (animationNames, autoplay) {
        var _this = this;
        warnIfNamesArray(animationNames, "play");
        var names = mapToStringArray(animationNames);
        // If the file's not loaded, queue up the play
        if (!this.readyForPlaying) {
            this.taskQueue.add({
                action: function () { return _this.play(animationNames, autoplay); },
            });
            return;
        }
        this.animator.play(names);
        this.warnIfLinearAnimationNames(names, "play");
        this.syncSemanticsOnStateMachines();
        if (this.eventCleanup) {
            this.eventCleanup();
        }
        this.cleanupKeyboardInteractions();
        this.setupRiveListeners();
        this.startRendering();
    };
    /**
     * Pauses specified animations or state machines; if none specified, pauses
     * all.
     * @param animationNames Animation or state machine name(s) to pause.
     *
     * Deprecated usage: passing linear animation names (control playback with a
     * state machine instead) and passing an array of names (this parameter
     * becomes a single string in the next major version).
     */
    Rive.prototype.pause = function (animationNames) {
        var _this = this;
        warnIfNamesArray(animationNames, "pause");
        var names = mapToStringArray(animationNames);
        // If the file's not loaded, early out, nothing to pause
        if (!this.readyForPlaying) {
            this.taskQueue.add({
                action: function () { return _this.pause(animationNames); },
            });
            return;
        }
        if (this.eventCleanup) {
            this.eventCleanup();
        }
        this.cleanupKeyboardInteractions();
        this.animator.pause(names);
        this.warnIfLinearAnimationNames(names, "pause");
    };
    /**
     * Scrubs specified animations to the given time; if none specified, scrubs
     * all of them.
     * @deprecated `scrub()` will be removed in a future major version: use a
     * state machine to control playback instead
     */
    Rive.prototype.scrub = function (animationNames, value) {
        var _this = this;
        warnOnce(DeprecationKeys.scrub, "`scrub()` is deprecated and will be removed in a future major version: " +
            "use a state machine to control playback instead.");
        var names = mapToStringArray(animationNames);
        // If the file's not loaded, early out, nothing to pause
        if (!this.readyForPlaying) {
            this.taskQueue.add({
                action: function () { return _this.scrub(animationNames, value); },
            });
            return;
        }
        // Scrub the animation time; we draw a single frame here so that if
        // nothing's currently playing, the scrubbed animation is still rendered/
        this.animator.scrub(names, value || 0);
        this.drawFrame();
    };
    /**
     * Stops specified animations or state machines; if none specified, stops
     * them all.
     * @param animationNames Animation or state machine name(s) to stop.
     *
     * Deprecated usage: passing linear animation names (control playback with a
     * state machine instead) and passing an array of names (this parameter
     * becomes a single string in the next major version).
     */
    Rive.prototype.stop = function (animationNames) {
        var _this = this;
        warnIfNamesArray(animationNames, "stop");
        var names = mapToStringArray(animationNames);
        // If the file's not loaded, early out, nothing to pause
        if (!this.readyForPlaying) {
            this.taskQueue.add({
                action: function () { return _this.stop(animationNames); },
            });
            return;
        }
        this.warnIfLinearAnimationNames(names, "stop");
        // If there is no artboard, this.animator will be undefined
        if (this.animator) {
            this.animator.stop(names);
        }
        if (this.eventCleanup) {
            this.eventCleanup();
        }
        this.cleanupKeyboardInteractions();
        this.cleanupSemantics();
    };
    /**
     * Resets the animation
     * @param artboard the name of the artboard, or default if none given
     * @param stateMachine the name of the state machine for playback
     * @param autoplay whether to autoplay when reset, defaults to false
     *
     */
    Rive.prototype.reset = function (params) {
        var _a, _b;
        // Get the current artboard, animations, state machines, and playback states
        var artBoardName = params === null || params === void 0 ? void 0 : params.artboard;
        var _c = resolveStartingPlayback({
            stateMachine: params === null || params === void 0 ? void 0 : params.stateMachine,
            animations: params === null || params === void 0 ? void 0 : params.animations,
            stateMachines: params === null || params === void 0 ? void 0 : params.stateMachines,
        }), animationNames = _c.startingAnimationNames, stateMachineNames = _c.startingStateMachineNames;
        var autoplay = (_a = params === null || params === void 0 ? void 0 : params.autoplay) !== null && _a !== void 0 ? _a : false;
        var autoBind = (_b = params === null || params === void 0 ? void 0 : params.autoBind) !== null && _b !== void 0 ? _b : false;
        // Stop everything and clean up
        this.cleanupInstances();
        // Reinitialize an artboard instance with the state
        this.initArtboard(artBoardName, animationNames, stateMachineNames, autoplay, autoBind);
        // Only drain the task queue once playback commands can execute; tasks
        // queued before then re-add themselves in a loop.
        if (this.readyForPlaying) {
            this.taskQueue.process();
        }
    };
    // Loads a new Rive file, keeping listeners in place
    Rive.prototype.load = function (params) {
        // Before stop(), so a call with no source leaves playback running.
        if (!params.src && !params.buffer && !params.riveFile) {
            throw new RiveError(Rive.missingErrorMessage);
        }
        // Stop all animations
        this.stop();
        // Reinitialize
        this.init(params);
    };
    Object.defineProperty(Rive.prototype, "layout", {
        /**
         * Returns the current layout. Note that layout should be treated as
         * immutable. If you want to change the layout, create a new one use the
         * layout setter
         */
        get: function () {
            return this._layout;
        },
        // Sets a new layout
        set: function (layout) {
            this._layout = layout;
            this.reportDisplayScale();
            // Fit/alignment/bounds feed the overlay transform.
            this._overlayTransformDirty = true;
            // If the maxX or maxY are 0, then set them to the canvas width and height
            if (!layout.maxX || !layout.maxY) {
                this.resizeToCanvas();
            }
            if (this.loaded && !this.animator.isPlaying) {
                this.drawFrame();
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the layout bounds to the current canvas size; this is typically called
     * when the canvas is resized
     */
    Rive.prototype.resizeToCanvas = function () {
        this._layout = this.layout.copyWith({
            minX: 0,
            minY: 0,
            maxX: this.canvas.width,
            maxY: this.canvas.height,
        });
        // Layout bounds feed the overlay transform.
        this._overlayTransformDirty = true;
    };
    /**
     * Accounts for devicePixelRatio as a multiplier to render the size of the canvas drawing surface.
     * Uses the size of the backing canvas to set new width/height attributes. Need to re-render
     * and resize the layout to match the new drawing surface afterwards.
     * Useful function for consumers to include in a window resize listener.
     *
     * This method will set the {@link devicePixelRatioUsed} property.
     *
     * Optionally, you can provide a {@link customDevicePixelRatio} to provide a
     * custom value.
     */
    Rive.prototype.resizeDrawingSurfaceToCanvas = function (customDevicePixelRatio) {
        if (this.canvas instanceof HTMLCanvasElement && !!window) {
            var _a = this.canvas.getBoundingClientRect(), width = _a.width, height = _a.height;
            var dpr = customDevicePixelRatio || window.devicePixelRatio || 1;
            this.devicePixelRatioUsed = dpr;
            this.canvas.width = dpr * width;
            this.canvas.height = dpr * height;
            this._needsRedraw = true;
            this.resizeToCanvas();
            if (this.layout.fit === Fit.Layout && this.artboard) {
                var scaleFactor = this._layout.layoutScaleFactor;
                this.artboard.width = width / scaleFactor;
                this.artboard.height = height / scaleFactor;
            }
            this.drawFrame();
        }
    };
    Object.defineProperty(Rive.prototype, "source", {
        // Returns the animation source, which may be undefined
        get: function () {
            return this.src;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "activeArtboard", {
        /**
         * Returns the name of the active artboard
         */
        get: function () {
            return this.artboard ? this.artboard.name : "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "semanticTree", {
        /**
         * Returns the semantic tree model when semantics are enabled, or null.
         * The overlay and external consumers use this to inspect the
         * current state of the semantic tree.
         */
        get: function () {
            return this._semanticTree;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "accessibilityOverlay", {
        /**
         * Returns the accessibility overlay when semantics are enabled, or null.
         * External consumers can use this to inspect the
         * current state of the accessibility overlay for this instance.
         */
        get: function () {
            return this._accessibilityOverlay;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "animationNames", {
        // Returns a list of animation names on the chosen artboard
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded || !this.artboard) {
                return [];
            }
            var animationNames = [];
            for (var i = 0; i < this.artboard.animationCount(); i++) {
                animationNames.push(this.artboard.animationByIndex(i).name);
            }
            return animationNames;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "stateMachineNames", {
        /**
         * Returns a list of state machine names from the current artboard
         */
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded || !this.artboard) {
                return [];
            }
            var stateMachineNames = [];
            for (var i = 0; i < this.artboard.stateMachineCount(); i++) {
                stateMachineNames.push(this.artboard.stateMachineByIndex(i).name);
            }
            return stateMachineNames;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the inputs for the specified instanced state machine, or an empty
     * list if the name is invalid or the state machine is not instanced. Returns
     * undefined if the file is not loaded yet.
     *
     * @deprecated State machine inputs are deprecated: use data binding
     * properties instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide#state-machine-inputs}
     * for how to migrate.
     * @param name the state machine name
     * @returns the inputs for the named state machine or undefined
     */
    Rive.prototype.stateMachineInputs = function (name) {
        warnOnce(DeprecationKeys.stateMachineInputs, stateMachineInputsDeprecationWarning);
        // If the file's not loaded, early out, nothing to pause
        if (!this.loaded) {
            return;
        }
        var stateMachine = this.animator.stateMachines.find(function (m) { return m.name === name; });
        return stateMachine === null || stateMachine === void 0 ? void 0 : stateMachine.inputs;
    };
    // Returns the input with the provided name at the given path
    Rive.prototype.retrieveInputAtPath = function (name, path) {
        if (!name) {
            console.warn("No input name provided for path '".concat(path, "'"));
            return;
        }
        if (!this.artboard) {
            console.warn("Tried to access input: '".concat(name, "', at path: '").concat(path, "', but the Artboard is null"));
            return;
        }
        var input = this.artboard.inputByPath(name, path);
        if (!input) {
            console.warn("Could not access an input with name: '".concat(name, "', at path:'").concat(path, "'"));
            return;
        }
        return input;
    };
    /**
     * Set the boolean input with the provided name at the given path with value
     * @deprecated State machine inputs are deprecated: use data binding
     * properties instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide#state-machine-inputs}
     * for how to migrate.
     * @param input the state machine input name
     * @param value the value to set the input to
     * @param path the path the input is located at an artboard level
     */
    Rive.prototype.setBooleanStateAtPath = function (inputName, value, path) {
        warnOnce(DeprecationKeys.stateMachineInputs, stateMachineInputsDeprecationWarning);
        var input = this.retrieveInputAtPath(inputName, path);
        if (!input)
            return;
        if (input.type === StateMachineInputType.Boolean) {
            input.asBool().value = value;
        }
        else {
            console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a boolean"));
        }
    };
    /**
     * Set the number input with the provided name at the given path with value
     * @deprecated State machine inputs are deprecated: use data binding
     * properties instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide#state-machine-inputs}
     * for how to migrate.
     * @param input the state machine input name
     * @param value the value to set the input to
     * @param path the path the input is located at an artboard level
     */
    Rive.prototype.setNumberStateAtPath = function (inputName, value, path) {
        warnOnce(DeprecationKeys.stateMachineInputs, stateMachineInputsDeprecationWarning);
        var input = this.retrieveInputAtPath(inputName, path);
        if (!input)
            return;
        if (input.type === StateMachineInputType.Number) {
            input.asNumber().value = value;
        }
        else {
            console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a number"));
        }
    };
    /**
     * Fire the trigger with the provided name at the given path
     * @deprecated State machine inputs are deprecated: use data binding
     * properties instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide#state-machine-inputs}
     * for how to migrate.
     * @param input the state machine input name
     * @param path the path the input is located at an artboard level
     */
    Rive.prototype.fireStateAtPath = function (inputName, path) {
        warnOnce(DeprecationKeys.stateMachineInputs, stateMachineInputsDeprecationWarning);
        var input = this.retrieveInputAtPath(inputName, path);
        if (!input)
            return;
        if (input.type === StateMachineInputType.Trigger) {
            input.asTrigger().fire();
        }
        else {
            console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a trigger"));
        }
    };
    // Returns the TextValueRun object for the provided name at the given path
    Rive.prototype.retrieveTextAtPath = function (name, path) {
        if (!name) {
            console.warn("No text name provided for path '".concat(path, "'"));
            return;
        }
        if (!path) {
            console.warn("No path provided for text '".concat(name, "'"));
            return;
        }
        if (!this.artboard) {
            console.warn("Tried to access text: '".concat(name, "', at path: '").concat(path, "', but the Artboard is null"));
            return;
        }
        var text = this.artboard.textByPath(name, path);
        if (!text) {
            console.warn("Could not access text with name: '".concat(name, "', at path:'").concat(path, "'"));
            return;
        }
        return text;
    };
    /**
     * Retrieves the text value for a specified text run at a given path
     * @param textName The name of the text run
     * @param path The path to the text run within the artboard
     * @returns The text value of the text run, or undefined if not found
     *
     * @example
     * // Get the text value for a text run named "title" at one nested artboard deep
     * const titleText = riveInstance.getTextRunValueAtPath("title", "artboard1");
     *
     * @example
     * // Get the text value for a text run named "subtitle" within a nested group two artboards deep
     * const subtitleText = riveInstance.getTextRunValueAtPath("subtitle", "group/nestedGroup");
     *
     * @remarks
     * If the text run cannot be found at the specified path, a warning will be logged to the console.
     *
     * @deprecated Text run APIs are deprecated: use data binding instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide#updating-text-runs-at-runtime}
     * for how to migrate.
     */
    Rive.prototype.getTextRunValueAtPath = function (textName, path) {
        warnOnce(DeprecationKeys.textRuns, textRunsDeprecationWarning);
        var run = this.retrieveTextAtPath(textName, path);
        if (!run) {
            console.warn("Could not get text with name: '".concat(textName, "', at path:'").concat(path, "'"));
            return;
        }
        return run.text;
    };
    /**
     * Sets the text value for a specified text run at a given path
     * @param textName The name of the text run
     * @param value The new text value to set
     * @param path The path to the text run within the artboard
     * @returns void
     *
     * @example
     * // Set the text value for a text run named "title" at one nested artboard deep
     * riveInstance.setTextRunValueAtPath("title", "New Title", "artboard1");
     *
     * @example
     * // Set the text value for a text run named "subtitle" within a nested group two artboards deep
     * riveInstance.setTextRunValueAtPath("subtitle", "New Subtitle", "group/nestedGroup");
     *
     * @remarks
     * If the text run cannot be found at the specified path, a warning will be logged to the console.
     *
     * @deprecated Text run APIs are deprecated: use data binding instead. See
     * {@link https://rive.app/docs/editor/data-binding/migration-guide#updating-text-runs-at-runtime}
     * for how to migrate.
     */
    Rive.prototype.setTextRunValueAtPath = function (textName, value, path) {
        warnOnce(DeprecationKeys.textRuns, textRunsDeprecationWarning);
        var run = this.retrieveTextAtPath(textName, path);
        if (!run) {
            console.warn("Could not set text with name: '".concat(textName, "', at path:'").concat(path, "'"));
            return;
        }
        run.text = value;
    };
    Object.defineProperty(Rive.prototype, "playingStateMachineNames", {
        // Returns a list of playing machine names
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            return this.animator.stateMachines
                .filter(function (m) { return m.playing; })
                .map(function (m) { return m.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "playingAnimationNames", {
        // Returns a list of playing animation names
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            return this.animator.animations.filter(function (a) { return a.playing; }).map(function (a) { return a.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "pausedAnimationNames", {
        // Returns a list of paused animation names
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            return this.animator.animations
                .filter(function (a) { return !a.playing; })
                .map(function (a) { return a.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "pausedStateMachineNames", {
        /**
         *  Returns a list of paused machine names
         * @returns a list of state machine names that are paused
         */
        get: function () {
            // If the file's not loaded, we got nothing to return
            if (!this.loaded) {
                return [];
            }
            return this.animator.stateMachines
                .filter(function (m) { return !m.playing; })
                .map(function (m) { return m.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "isPlaying", {
        /**
         * @returns true if any animation is playing
         */
        get: function () {
            return this.animator.isPlaying;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "isPaused", {
        /**
         * @returns true if all instanced animations are paused
         */
        get: function () {
            return this.animator.isPaused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "isStopped", {
        /**
         * @returns true if no animations are playing or paused
         */
        get: function () {
            var _a, _b;
            return (_b = (_a = this.animator) === null || _a === void 0 ? void 0 : _a.isStopped) !== null && _b !== void 0 ? _b : true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "bounds", {
        /**
         * @returns the bounds of the current artboard, or undefined if the artboard
         * isn't loaded yet.
         */
        get: function () {
            return this.artboard ? this.artboard.bounds : undefined;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Subscribe to Rive-generated events
     *
     * Note: subscribing to {@link EventType.RiveEvent},
     * {@link EventType.StateChange}, or {@link EventType.Loop} is deprecated;
     * use data binding instead. See
     * {@link https://rive.app/docs/runtimes/web/rive-events} (Rive Events) and
     * {@link https://rive.app/docs/editor/data-binding/migration-guide} for how
     * to migrate Rive graphics to a data binding workflow instead.
     * @param type the type of event to subscribe to
     * @param callback callback to fire when the event occurs
     */
    Rive.prototype.on = function (type, callback) {
        if (type === EventType.RiveEvent) {
            warnOnce(DeprecationKeys.riveEvents, riveEventsDeprecationWarning);
        }
        else if (type === EventType.StateChange) {
            warnOnce(DeprecationKeys.stateChangeEvents, stateChangeEventsDeprecationWarning);
        }
        else if (type === EventType.Loop) {
            warnOnce(DeprecationKeys.loopEvents, loopEventsDeprecationWarning);
        }
        this.eventManager.add({
            type: type,
            callback: callback,
        });
    };
    /**
     * Unsubscribes from a Rive-generated event
     * @param type the type of event to unsubscribe from
     * @param callback the callback to unsubscribe
     */
    Rive.prototype.off = function (type, callback) {
        this.eventManager.remove({
            type: type,
            callback: callback,
        });
    };
    /**
     * Unsubscribes from a Rive-generated event
     * @deprecated
     * @param callback the callback to unsubscribe from
     */
    Rive.prototype.unsubscribe = function (type, callback) {
        warnOnce(DeprecationKeys.legacyUnsubscribe, "This function is deprecated: please use `off()` instead.");
        this.off(type, callback);
    };
    /**
     * Unsubscribes all Rive listeners from an event type, or everything if no type is
     * given
     * @param type the type of event to unsubscribe from, or all types if
     * undefined
     */
    Rive.prototype.removeAllRiveEventListeners = function (type) {
        this.eventManager.removeAll(type);
    };
    /**
     * Unsubscribes all listeners from an event type, or everything if no type is
     * given
     * @deprecated
     * @param type the type of event to unsubscribe from, or all types if
     * undefined
     */
    Rive.prototype.unsubscribeAll = function (type) {
        warnOnce(DeprecationKeys.legacyUnsubscribe, "This function is deprecated: please use `removeAllRiveEventListeners()` instead.");
        this.removeAllRiveEventListeners(type);
    };
    /**
     * Stops the rendering loop; this is different from pausing in that it doesn't
     * change the state of any animation. It stops rendering from occurring. This
     * is designed for situations such as when Rive isn't visible.
     *
     * The only way to start rendering again is to call `startRendering`.
     * Animations that are marked as playing will start from the position that
     * they would have been at if rendering had not been stopped.
     */
    Rive.prototype.stopRendering = function () {
        this._explicitlyStoppedRendering = true;
        if (this.loaded && this.frameRequestId) {
            if (this.runtime.cancelAnimationFrame) {
                this.runtime.cancelAnimationFrame(this.frameRequestId);
            }
            else {
                cancelAnimationFrame(this.frameRequestId);
            }
            this.frameRequestId = null;
        }
    };
    /**
     * Starts the rendering loop if it has been previously stopped. If the
     * renderer is already active, then this will have zero effect.
     */
    Rive.prototype.startRendering = function () {
        this._explicitlyStoppedRendering = false;
        this.drawFrame();
    };
    Rive.prototype.scheduleRendering = function () {
        var _a, _b;
        if (this.loaded && this.artboard && !this.frameRequestId) {
            if (this.runtime.requestAnimationFrame) {
                this.frameRequestId = this.runtime.requestAnimationFrame(this._boundDraw, ((_b = (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.replaysOnWorker) === null || _b === void 0 ? void 0 : _b.call(_a)) === true);
            }
            else {
                this.frameRequestId = requestAnimationFrame(this._boundDraw);
            }
        }
    };
    /**
     * Called when document.visibilitychange fires (tab change, window minimize, etc.).
     * Cancels the rAF loop on hide and resets the time reference so that no accumulated time is
     * applied to state machines when the tab becomes visible again. This prevents state machine
     * advances with large time deltas when rAF starts up again.
     */
    Rive.prototype._onPageVisibilityChange = function () {
        var _a, _b;
        if (document.hidden) {
            if (this.frameRequestId !== null) {
                if ((_a = this.runtime) === null || _a === void 0 ? void 0 : _a.cancelAnimationFrame) {
                    this.runtime.cancelAnimationFrame(this.frameRequestId);
                }
                else {
                    cancelAnimationFrame(this.frameRequestId);
                }
                this.frameRequestId = null;
            }
            // Reset so the first resumed frame starts with elapsedTime === 0.
            this.lastRenderTime = 0;
        }
        else if (((_b = this.animator) === null || _b === void 0 ? void 0 : _b.isPlaying) && !this._explicitlyStoppedRendering) {
            this.scheduleRendering();
        }
    };
    /**
     * Enables frames-per-second (FPS) reporting for the runtime
     * If no callback is provided, Rive will append a fixed-position div at the top-right corner of
     * the page with the FPS reading
     * @param fpsCallback - Callback from the runtime during the RAF loop that supplies the FPS value
     */
    Rive.prototype.enableFPSCounter = function (fpsCallback) {
        this.runtime.enableFPSCounter(fpsCallback);
    };
    /**
     * Disables frames-per-second (FPS) reporting for the runtime
     */
    Rive.prototype.disableFPSCounter = function () {
        this.runtime.disableFPSCounter();
    };
    Object.defineProperty(Rive.prototype, "contents", {
        /**
         * Returns the contents of a Rive file: the artboards, animations, and state machines
         */
        get: function () {
            if (!this.loaded) {
                return undefined;
            }
            var riveContents = {
                artboards: [],
            };
            for (var i = 0; i < this.file.artboardCount(); i++) {
                var artboard = this.file.artboardByIndex(i);
                var artboardContents = {
                    name: artboard.name,
                    animations: [],
                    stateMachines: [],
                };
                for (var j = 0; j < artboard.animationCount(); j++) {
                    var animation = artboard.animationByIndex(j);
                    artboardContents.animations.push(animation.name);
                }
                for (var k = 0; k < artboard.stateMachineCount(); k++) {
                    var stateMachine = artboard.stateMachineByIndex(k);
                    var name_2 = stateMachine.name;
                    var instance = new this.runtime.StateMachineInstance(stateMachine, artboard);
                    var inputContents = [];
                    for (var l = 0; l < instance.inputCount(); l++) {
                        var input = instance.input(l);
                        inputContents.push({ name: input.name, type: input.type });
                    }
                    artboardContents.stateMachines.push({
                        name: name_2,
                        inputs: inputContents,
                    });
                }
                riveContents.artboards.push(artboardContents);
            }
            return riveContents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "volume", {
        /**
         * Getter / Setter for the volume of the artboard
         */
        get: function () {
            if (this.artboard && this.artboard.volume !== this._volume) {
                this._volume = this.artboard.volume;
            }
            return this._volume;
        },
        set: function (value) {
            this._volume = value;
            if (this.artboard) {
                this.artboard.volume = value * audioManager.systemVolume;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "artboardWidth", {
        /**
         * The width of the artboard.
         *
         * This will return 0 if the artboard is not loaded yet and a custom
         * width has not been set.
         *
         * Do not set this value manually when using {@link resizeDrawingSurfaceToCanvas}
         * with a {@link Layout.fit} of {@link Fit.Layout}, as the artboard width is
         * automatically set.
         */
        get: function () {
            var _a;
            if (this.artboard) {
                return this.artboard.width;
            }
            return (_a = this._artboardWidth) !== null && _a !== void 0 ? _a : 0;
        },
        set: function (value) {
            this._artboardWidth = value;
            if (this.artboard) {
                this.artboard.width = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "artboardHeight", {
        /**
         * The height of the artboard.
         *
         * This will return 0 if the artboard is not loaded yet and a custom
         * height has not been set.
         *
         * Do not set this value manually when using {@link resizeDrawingSurfaceToCanvas}
         * with a {@link Layout.fit} of {@link Fit.Layout}, as the artboard height is
         * automatically set.
         */
        get: function () {
            var _a;
            if (this.artboard) {
                return this.artboard.height;
            }
            return (_a = this._artboardHeight) !== null && _a !== void 0 ? _a : 0;
        },
        set: function (value) {
            this._artboardHeight = value;
            if (this.artboard) {
                this.artboard.height = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Reset the artboard size to its original values.
     */
    Rive.prototype.resetArtboardSize = function () {
        if (this.artboard) {
            this.artboard.resetArtboardSize();
            this._artboardWidth = this.artboard.width;
            this._artboardHeight = this.artboard.height;
        }
        else {
            // If the artboard isn't loaded, we need to reset the custom width and height
            this._artboardWidth = undefined;
            this._artboardHeight = undefined;
        }
    };
    Object.defineProperty(Rive.prototype, "devicePixelRatioUsed", {
        /**
         * The device pixel ratio used in rendering and canvas/artboard resizing.
         *
         * This value will be overidden by the device pixel ratio used in
         * {@link resizeDrawingSurfaceToCanvas}. If you use that method, do not set this value.
         */
        get: function () {
            return this._devicePixelRatioUsed;
        },
        set: function (value) {
            if (value !== this._devicePixelRatioUsed) {
                this._overlayTransformDirty = true;
            }
            this._devicePixelRatioUsed = value;
            this.reportDisplayScale();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rive.prototype, "inkbleed", {
        /**
         * @experimental (WebGL2 only) Whether inkbleed antialiasing is in effect. Can only be
         * turned on if `enableInkbleed: true` was passed at construction.
         */
        get: function () {
            return this._inkbleedCapable && this._inkbleed;
        },
        set: function (value) {
            if (!this._inkbleedCapable) {
                if (value && !Rive.inkbleedNotCapableWarned) {
                    Rive.inkbleedNotCapableWarned = true;
                    console.warn("Rive: `inkbleed` can't be enabled on this instance. It needs `enableInkbleed: true` at construction, on @rive-app/webgl2 without `useOffscreenRenderer`.");
                }
                return;
            }
            this._inkbleed = value;
            if (this.renderer) {
                this.applyInkbleed();
            }
            this._needsRedraw = true;
            this.drawFrame();
        },
        enumerable: false,
        configurable: true
    });
    Rive.prototype.applyInkbleed = function () {
        var enabled = this._inkbleed;
        var setInkbleed = this.renderer.setInkbleed;
        var supported = typeof setInkbleed === "function"
            ? setInkbleed.call(this.renderer, enabled)
            : !enabled;
        if (!supported) {
            this._inkbleedCapable = false;
            if (!Rive.inkbleedUnsupportedWarned) {
                Rive.inkbleedUnsupportedWarned = true;
                console.warn("Rive: `inkbleed` is not supported by this renderer (it needs @rive-app/webgl2 without `useOffscreenRenderer`, and a canvas context with depth and stencil). Rendering without it.");
            }
        }
    };
    // Not per frame: the scale is per file, and instances sharing one would trade
    // it every frame.
    Rive.prototype.reportDisplayScale = function () {
        var _a;
        (_a = this.file) === null || _a === void 0 ? void 0 : _a.displayScale(this._devicePixelRatioUsed * this._layout.layoutScaleFactor);
    };
    /**
     * Sets the main view model instance and applies it (rebinds). Equivalent to
     * `setViewModelInstance(vmi)` followed by `bind()`.
     */
    Rive.prototype.bindViewModelInstance = function (viewModelInstance) {
        if (!viewModelInstance) {
            return;
        }
        this.setViewModelInstance(viewModelInstance);
        this.bind();
    };
    /**
     * Sets the main view model instance in the data context WITHOUT rebinding.
     * Call {@link bind} to apply. Use this with {@link setGlobalViewModelInstance}
     * to batch multiple changes into a single rebind.
     */
    Rive.prototype.setViewModelInstance = function (viewModelInstance) {
        var _a;
        var runtimeInstance = viewModelInstance === null || viewModelInstance === void 0 ? void 0 : viewModelInstance.runtimeInstance;
        if (!this.artboard ||
            this.destroyed ||
            !viewModelInstance ||
            !runtimeInstance) {
            return;
        }
        viewModelInstance.internalIncrementReferenceCount();
        (_a = this._viewModelInstance) === null || _a === void 0 ? void 0 : _a.cleanup();
        this._viewModelInstance = viewModelInstance;
        if (this.animator.stateMachines.length > 0) {
            this.animator.stateMachines.forEach(function (stateMachine) {
                return stateMachine.instance.setViewModelInstance(runtimeInstance);
            });
        }
        else {
            this.artboard.setViewModelInstance(runtimeInstance);
        }
    };
    /**
     * Applies any pending `set*` view model instance changes by rebinding the
     * data binds once.
     * Implicitly creates and binds any view models that have not been set.
     */
    Rive.prototype.bind = function () {
        if (!this.artboard || this.destroyed) {
            return;
        }
        if (this.animator.stateMachines.length > 0) {
            this.animator.stateMachines.forEach(function (stateMachine) {
                return stateMachine.instance.bind();
            });
        }
        else {
            this.artboard.bind();
        }
    };
    Object.defineProperty(Rive.prototype, "viewModelInstance", {
        get: function () {
            return this._viewModelInstance;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets (or replaces) the global view model instance for the given global view
     * model name in the data context WITHOUT rebinding. The main instance and any
     * other globals keep their order. Call {@link bind} to apply — batch several
     * `set*` calls then a single `bind()` to avoid rebinding per set.
     * @param name - the name of the global view model
     * @param viewModelInstance - the instance to set for that global
     * @returns whether the instance was set (false if `name` does not match a
     * global view model in the file)
     */
    Rive.prototype.setGlobalViewModelInstance = function (name, viewModelInstance) {
        var _a;
        var runtimeInstance = viewModelInstance === null || viewModelInstance === void 0 ? void 0 : viewModelInstance.runtimeInstance;
        if (!this.artboard || this.destroyed || !runtimeInstance) {
            return false;
        }
        var bound = false;
        if (this.animator.stateMachines.length > 0) {
            this.animator.stateMachines.forEach(function (stateMachine) {
                if (stateMachine.instance.setGlobalViewModelInstance(name, runtimeInstance)) {
                    bound = true;
                }
            });
        }
        else {
            bound = this.artboard.setGlobalViewModelInstance(name, runtimeInstance);
        }
        if (bound) {
            viewModelInstance.internalIncrementReferenceCount();
            (_a = this._globalViewModelInstances.get(name)) === null || _a === void 0 ? void 0 : _a.cleanup();
            this._globalViewModelInstances.set(name, viewModelInstance);
        }
        return bound;
    };
    /**
     * @param name - the name of the global view model
     * @returns the global view model instance bound under the given name — the
     * instance set via {@link setGlobalViewModelInstance} or one created by
     * auto-bind — or null if none has been set/created for that name (globals are
     * not auto-created; the getter never creates one).
     */
    Rive.prototype.globalViewModelInstance = function (name) {
        var cached = this._globalViewModelInstances.get(name);
        if (cached) {
            return cached;
        }
        if (!this.artboard || this.destroyed) {
            return null;
        }
        // State machines share the artboard's data context; query the first one
        // when present (mirroring how the setter routes), otherwise the artboard.
        // This is a pure read — it returns null unless an instance was set/bound.
        var runtimeInstance = this.animator.stateMachines.length > 0
            ? this.animator.stateMachines[0].instance.globalViewModelInstance(name)
            : this.artboard.globalViewModelInstance(name);
        if (runtimeInstance === null) {
            return null;
        }
        var viewModelInstance = new ViewModelInstance(runtimeInstance, null);
        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(viewModelInstance, runtimeInstance);
        viewModelInstance.internalIncrementReferenceCount();
        this._globalViewModelInstances.set(name, viewModelInstance);
        return viewModelInstance;
    };
    /**
     * @returns the names of the file's global view models, in file order. Use
     * these with {@link setGlobalViewModelInstance} / {@link globalViewModelInstance}.
     */
    Rive.prototype.globalViewModelNames = function () {
        var _a, _b;
        return (_b = (_a = this.file) === null || _a === void 0 ? void 0 : _a.globalViewModelNames()) !== null && _b !== void 0 ? _b : [];
    };
    Rive.prototype.viewModelByIndex = function (index) {
        var viewModel = this.file.viewModelByIndex(index);
        if (viewModel !== null) {
            return new ViewModel(viewModel);
        }
        return null;
    };
    Rive.prototype.viewModelByName = function (name) {
        var _a;
        return (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.viewModelByName(name);
    };
    Rive.prototype.enums = function () {
        if (this._dataEnums === null) {
            var dataEnums = this.file.enums();
            this._dataEnums = dataEnums.map(function (dataEnum) {
                return new DataEnum(dataEnum);
            });
        }
        return this._dataEnums;
    };
    Rive.prototype.defaultViewModel = function () {
        if (this.artboard) {
            var viewModel = this.file.defaultArtboardViewModel(this.artboard);
            if (viewModel) {
                return new ViewModel(viewModel);
            }
        }
        return null;
    };
    /**
     * @deprecated This function is deprecated. For better stability and memory management
     * use `getBindableArtboard()` instead.
     * @param {string} name - The name of the artboard.
     * @returns {Artboard} The artboard to bind to.
     */
    Rive.prototype.getArtboard = function (name) {
        var _a, _b;
        return (_b = (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.getArtboard(name)) !== null && _b !== void 0 ? _b : null;
    };
    Rive.prototype.getBindableArtboard = function (name) {
        var _a, _b;
        return (_b = (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.getBindableArtboard(name)) !== null && _b !== void 0 ? _b : null;
    };
    Rive.prototype.getDefaultBindableArtboard = function () {
        var _a, _b;
        return (_b = (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.getDefaultBindableArtboard()) !== null && _b !== void 0 ? _b : null;
    };
    /**
     * Clear focus applicable to active state machines with focus nodes. Useful if users want to
     * reset focus state and behavior within the Rive graphic at any point (i.e. blurring off the canvas)
     */
    Rive.prototype.clearFocus = function () {
        var playingStateMachines = this.animator.stateMachines.filter(function (sm) { return sm.playing && sm.hasFocusNodes; });
        playingStateMachines.forEach(function (sm) { return sm.clearFocus(); });
    };
    Rive.inkbleedUnsupportedWarned = false;
    Rive.replayContextLostWarned = false;
    Rive.inkbleedNotCapableWarned = false;
    // Error message for missing source or buffer
    Rive.missingErrorMessage = "Rive source file or data buffer required";
    // Error message for removed rive file
    Rive.cleanupErrorMessage = "Attempt to use file after calling cleanup.";
    // performance.now() at the current rAF batch's start; first frames seed from it.
    Rive.batchStart = { time: -1, now: 0 };
    return Rive;
}());

var DataType;
(function (DataType) {
    DataType["none"] = "none";
    DataType["string"] = "string";
    DataType["number"] = "number";
    DataType["boolean"] = "boolean";
    DataType["color"] = "color";
    DataType["list"] = "list";
    DataType["enumType"] = "enumType";
    DataType["trigger"] = "trigger";
    DataType["viewModel"] = "viewModel";
    DataType["integer"] = "integer";
    DataType["listIndex"] = "listIndex";
    DataType["image"] = "image";
    DataType["artboard"] = "artboard";
})(DataType || (DataType = {}));
var ViewModel = /** @class */ (function () {
    function ViewModel(viewModel) {
        this._viewModel = viewModel;
    }
    Object.defineProperty(ViewModel.prototype, "instanceCount", {
        get: function () {
            return this._viewModel.instanceCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "name", {
        get: function () {
            return this._viewModel.name;
        },
        enumerable: false,
        configurable: true
    });
    ViewModel.prototype.instanceByIndex = function (index) {
        var instance = this._viewModel.instanceByIndex(index);
        if (instance !== null) {
            var viewModelInstance = new ViewModelInstance(instance, null);
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(viewModelInstance, instance);
            return viewModelInstance;
        }
        return null;
    };
    ViewModel.prototype.instanceByName = function (name) {
        var instance = this._viewModel.instanceByName(name);
        if (instance !== null) {
            var viewModelInstance = new ViewModelInstance(instance, null);
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(viewModelInstance, instance);
            return viewModelInstance;
        }
        return null;
    };
    ViewModel.prototype.defaultInstance = function () {
        var runtimeInstance = this._viewModel.defaultInstance();
        if (runtimeInstance !== null) {
            var viewModelInstance = new ViewModelInstance(runtimeInstance, null);
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(viewModelInstance, runtimeInstance);
            return viewModelInstance;
        }
        return null;
    };
    ViewModel.prototype.instance = function () {
        var runtimeInstance = this._viewModel.instance();
        if (runtimeInstance !== null) {
            var viewModelInstance = new ViewModelInstance(runtimeInstance, null);
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(viewModelInstance, runtimeInstance);
            return viewModelInstance;
        }
        return null;
    };
    Object.defineProperty(ViewModel.prototype, "properties", {
        get: function () {
            return this._viewModel.getProperties();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "instanceNames", {
        get: function () {
            return this._viewModel.getInstanceNames();
        },
        enumerable: false,
        configurable: true
    });
    return ViewModel;
}());

var DataEnum = /** @class */ (function () {
    function DataEnum(dataEnum) {
        this._dataEnum = dataEnum;
    }
    Object.defineProperty(DataEnum.prototype, "name", {
        get: function () {
            return this._dataEnum.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataEnum.prototype, "values", {
        get: function () {
            return this._dataEnum.values;
        },
        enumerable: false,
        configurable: true
    });
    return DataEnum;
}());

var PropertyType;
(function (PropertyType) {
    PropertyType["Number"] = "number";
    PropertyType["String"] = "string";
    PropertyType["Boolean"] = "boolean";
    PropertyType["Color"] = "color";
    PropertyType["Trigger"] = "trigger";
    PropertyType["Enum"] = "enum";
    PropertyType["List"] = "list";
    PropertyType["Image"] = "image";
    PropertyType["Font"] = "font";
    PropertyType["Artboard"] = "artboard";
})(PropertyType || (PropertyType = {}));
var ViewModelInstance = /** @class */ (function () {
    function ViewModelInstance(runtimeInstance, parent) {
        this._parents = [];
        this._children = [];
        this._viewModelInstances = new Map();
        this._propertiesWithCallbacks = [];
        this._referenceCount = 0;
        this.selfUnref = false;
        this._runtimeInstance = runtimeInstance;
        if (parent !== null) {
            this._parents.push(parent);
        }
    }
    Object.defineProperty(ViewModelInstance.prototype, "runtimeInstance", {
        get: function () {
            return this._runtimeInstance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewModelInstance.prototype, "nativeInstance", {
        get: function () {
            return this._runtimeInstance;
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstance.prototype.handleCallbacks = function () {
        if (this._propertiesWithCallbacks.length !== 0) {
            this._propertiesWithCallbacks.forEach(function (property) {
                property.handleCallbacks();
            });
            this._propertiesWithCallbacks.forEach(function (property) {
                property.clearChanges();
            });
        }
        this._children.forEach(function (child) { return child.handleCallbacks(); });
    };
    ViewModelInstance.prototype.addParent = function (parent) {
        if (!this._parents.includes(parent)) {
            this._parents.push(parent);
            if (this._propertiesWithCallbacks.length > 0 ||
                this._children.length > 0) {
                parent.addToViewModelCallbacks(this);
            }
        }
    };
    ViewModelInstance.prototype.removeParent = function (parent) {
        var index = this._parents.indexOf(parent);
        if (index !== -1) {
            var parent_1 = this._parents[index];
            parent_1.removeFromViewModelCallbacks(this);
            this._parents.splice(index, 1);
        }
    };
    /*
     * method for internal use, it shouldn't be called externally
     */
    ViewModelInstance.prototype.addToPropertyCallbacks = function (property) {
        var _this = this;
        if (!this._propertiesWithCallbacks.includes(property)) {
            this._propertiesWithCallbacks.push(property);
            if (this._propertiesWithCallbacks.length > 0) {
                this._parents.forEach(function (parent) {
                    parent.addToViewModelCallbacks(_this);
                });
            }
        }
    };
    /*
     * method for internal use, it shouldn't be called externally
     */
    ViewModelInstance.prototype.removeFromPropertyCallbacks = function (property) {
        var _this = this;
        if (this._propertiesWithCallbacks.includes(property)) {
            this._propertiesWithCallbacks = this._propertiesWithCallbacks.filter(function (prop) { return prop !== property; });
            if (this._children.length === 0 &&
                this._propertiesWithCallbacks.length === 0) {
                this._parents.forEach(function (parent) {
                    parent.removeFromViewModelCallbacks(_this);
                });
            }
        }
    };
    /*
     * method for internal use, it shouldn't be called externally
     */
    ViewModelInstance.prototype.addToViewModelCallbacks = function (instance) {
        var _this = this;
        if (!this._children.includes(instance)) {
            this._children.push(instance);
            this._parents.forEach(function (parent) {
                parent.addToViewModelCallbacks(_this);
            });
        }
    };
    /*
     * method for internal use, it shouldn't be called externally
     */
    ViewModelInstance.prototype.removeFromViewModelCallbacks = function (instance) {
        var _this = this;
        if (this._children.includes(instance)) {
            this._children = this._children.filter(function (child) { return child !== instance; });
            if (this._children.length === 0 &&
                this._propertiesWithCallbacks.length === 0) {
                this._parents.forEach(function (parent) {
                    parent.removeFromViewModelCallbacks(_this);
                });
            }
        }
    };
    ViewModelInstance.prototype.clearCallbacks = function () {
        this._propertiesWithCallbacks.forEach(function (property) {
            property.clearCallbacks();
        });
    };
    ViewModelInstance.prototype.propertyFromPath = function (path, type) {
        var pathSegments = path.split("/");
        return this.propertyFromPathSegments(pathSegments, 0, type);
    };
    ViewModelInstance.prototype.viewModelFromPathSegments = function (pathSegments, index) {
        var viewModelInstance = this.internalViewModelInstance(pathSegments[index]);
        if (viewModelInstance !== null) {
            if (index == pathSegments.length - 1) {
                return viewModelInstance;
            }
            else {
                return viewModelInstance.viewModelFromPathSegments(pathSegments, index++);
            }
        }
        return null;
    };
    ViewModelInstance.prototype.propertyFromPathSegments = function (pathSegments, index, type) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        if (index < pathSegments.length - 1) {
            var viewModelInstance = this.internalViewModelInstance(pathSegments[index]);
            if (viewModelInstance !== null) {
                return viewModelInstance.propertyFromPathSegments(pathSegments, index + 1, type);
            }
            else {
                return null;
            }
        }
        var instance = null;
        switch (type) {
            case PropertyType.Number:
                instance = (_b = (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.number(pathSegments[index])) !== null && _b !== void 0 ? _b : null;
                if (instance !== null) {
                    return new ViewModelInstanceNumber(instance, this);
                }
                break;
            case PropertyType.String:
                instance = (_d = (_c = this._runtimeInstance) === null || _c === void 0 ? void 0 : _c.string(pathSegments[index])) !== null && _d !== void 0 ? _d : null;
                if (instance !== null) {
                    return new ViewModelInstanceString(instance, this);
                }
                break;
            case PropertyType.Boolean:
                instance = (_f = (_e = this._runtimeInstance) === null || _e === void 0 ? void 0 : _e.boolean(pathSegments[index])) !== null && _f !== void 0 ? _f : null;
                if (instance !== null) {
                    return new ViewModelInstanceBoolean(instance, this);
                }
                break;
            case PropertyType.Color:
                instance = (_h = (_g = this._runtimeInstance) === null || _g === void 0 ? void 0 : _g.color(pathSegments[index])) !== null && _h !== void 0 ? _h : null;
                if (instance !== null) {
                    return new ViewModelInstanceColor(instance, this);
                }
                break;
            case PropertyType.Trigger:
                instance = (_k = (_j = this._runtimeInstance) === null || _j === void 0 ? void 0 : _j.trigger(pathSegments[index])) !== null && _k !== void 0 ? _k : null;
                if (instance !== null) {
                    return new ViewModelInstanceTrigger(instance, this);
                }
                break;
            case PropertyType.Enum:
                instance = (_m = (_l = this._runtimeInstance) === null || _l === void 0 ? void 0 : _l.enum(pathSegments[index])) !== null && _m !== void 0 ? _m : null;
                if (instance !== null) {
                    return new ViewModelInstanceEnum(instance, this);
                }
                break;
            case PropertyType.List:
                instance = (_p = (_o = this._runtimeInstance) === null || _o === void 0 ? void 0 : _o.list(pathSegments[index])) !== null && _p !== void 0 ? _p : null;
                if (instance !== null) {
                    return new ViewModelInstanceList(instance, this);
                }
                break;
            case PropertyType.Image:
                instance = (_r = (_q = this._runtimeInstance) === null || _q === void 0 ? void 0 : _q.image(pathSegments[index])) !== null && _r !== void 0 ? _r : null;
                if (instance !== null) {
                    return new ViewModelInstanceAssetImage(instance, this);
                }
                break;
            case PropertyType.Font:
                instance = (_t = (_s = this._runtimeInstance) === null || _s === void 0 ? void 0 : _s.font(pathSegments[index])) !== null && _t !== void 0 ? _t : null;
                if (instance !== null) {
                    return new ViewModelInstanceAssetFont(instance, this);
                }
                break;
            case PropertyType.Artboard:
                instance = (_v = (_u = this._runtimeInstance) === null || _u === void 0 ? void 0 : _u.artboard(pathSegments[index])) !== null && _v !== void 0 ? _v : null;
                if (instance !== null) {
                    return new ViewModelInstanceArtboard(instance, this);
                }
                break;
        }
        return null;
    };
    ViewModelInstance.prototype.internalViewModelInstance = function (name) {
        var _a;
        if (this._viewModelInstances.has(name)) {
            return this._viewModelInstances.get(name);
        }
        var viewModelRuntimeInstance = (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.viewModel(name);
        if (viewModelRuntimeInstance !== null) {
            var viewModelInstance = new ViewModelInstance(viewModelRuntimeInstance, this);
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(viewModelInstance, viewModelRuntimeInstance);
            viewModelInstance.internalIncrementReferenceCount();
            this._viewModelInstances.set(name, viewModelInstance);
            return viewModelInstance;
        }
        return null;
    };
    /**
     * method to access a property instance of type number belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the number property
     */
    ViewModelInstance.prototype.number = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Number);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a property instance of type string belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the string property
     */
    ViewModelInstance.prototype.string = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.String);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a property instance of type boolean belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the boolean property
     */
    ViewModelInstance.prototype.boolean = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Boolean);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a property instance of type color belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the ttrigger property
     */
    ViewModelInstance.prototype.color = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Color);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a property instance of type trigger belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the trigger property
     */
    ViewModelInstance.prototype.trigger = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Trigger);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a property instance of type enum belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the enum property
     */
    ViewModelInstance.prototype.enum = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Enum);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a property instance of type list belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the list property
     */
    ViewModelInstance.prototype.list = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.List);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a view model property instance belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the image property
     */
    ViewModelInstance.prototype.image = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Image);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a view model property instance belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the font property
     */
    ViewModelInstance.prototype.font = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Font);
        return viewmodelInstanceValue;
    };
    /**
     * method to access an artboard property instance belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the image property
     */
    ViewModelInstance.prototype.artboard = function (path) {
        var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Artboard);
        return viewmodelInstanceValue;
    };
    /**
     * method to access a view model property instance belonging
     * to the view model instance or to a nested view model instance
     * @param path - path to the view model property
     */
    ViewModelInstance.prototype.viewModel = function (path) {
        var pathSegments = path.split("/");
        var parentViewModelInstance = pathSegments.length > 1
            ? this.viewModelFromPathSegments(pathSegments.slice(0, pathSegments.length - 1), 0)
            : this;
        if (parentViewModelInstance != null) {
            return parentViewModelInstance.internalViewModelInstance(pathSegments[pathSegments.length - 1]);
        }
        return null;
    };
    ViewModelInstance.prototype.internalReplaceViewModel = function (name, value) {
        var _a;
        if (value.runtimeInstance !== null) {
            var result = ((_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.replaceViewModel(name, value.runtimeInstance)) ||
                false;
            if (result) {
                value.internalIncrementReferenceCount();
                var oldInstance_1 = this.internalViewModelInstance(name);
                if (oldInstance_1 !== null) {
                    oldInstance_1.removeParent(this);
                    if (this._children.includes(oldInstance_1)) {
                        this._children = this._children.filter(function (child) { return child !== oldInstance_1; });
                    }
                    oldInstance_1.cleanup();
                }
                this._viewModelInstances.set(name, value);
                value.addParent(this);
            }
            return result;
        }
        return false;
    };
    /**
     * method to replace a view model property with another view model value
     * @param path - path to the view model property
     * @param value - view model that will replace the original
     */
    ViewModelInstance.prototype.replaceViewModel = function (path, value) {
        var _a;
        var pathSegments = path.split("/");
        var viewModelInstance = pathSegments.length > 1
            ? this.viewModelFromPathSegments(pathSegments.slice(0, pathSegments.length - 1), 0)
            : this;
        return ((_a = viewModelInstance === null || viewModelInstance === void 0 ? void 0 : viewModelInstance.internalReplaceViewModel(pathSegments[pathSegments.length - 1], value)) !== null && _a !== void 0 ? _a : false);
    };
    /*
     * method to add one to the reference counter of the instance.
     * Use if the file owning the reference is destroyed but the instance needs to stay around
     */
    ViewModelInstance.prototype.incrementReferenceCount = function () {
        var _a;
        this._referenceCount++;
        (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.incrementReferenceCount();
    };
    /*
     * method to subtract one to the reference counter of the instance.
     * Use if incrementReferenceCount has been called
     */
    ViewModelInstance.prototype.decrementReferenceCount = function () {
        var _a;
        this._referenceCount--;
        (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.decrementReferenceCount();
    };
    Object.defineProperty(ViewModelInstance.prototype, "properties", {
        get: function () {
            var _a;
            return (((_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.getProperties().map(function (prop) { return (__assign({}, prop)); })) || []);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewModelInstance.prototype, "viewModelName", {
        /**
         * Get the name of the ViewModel definition this instance was created from.
         */
        get: function () {
            var _a, _b;
            return (_b = (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.getViewModelName()) !== null && _b !== void 0 ? _b : "";
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstance.prototype.internalIncrementReferenceCount = function () {
        this._referenceCount++;
    };
    ViewModelInstance.prototype.cleanup = function () {
        var _this = this;
        var _a;
        this._referenceCount--;
        if (this._referenceCount <= 0) {
            if (this.selfUnref) {
                (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.unref();
            }
            this._runtimeInstance = null;
            this.clearCallbacks();
            this._propertiesWithCallbacks = [];
            this._viewModelInstances.forEach(function (value) {
                value.cleanup();
            });
            this._viewModelInstances.clear();
            var children = __spreadArray([], this._children, true);
            this._children.length = 0;
            var parents = __spreadArray([], this._parents, true);
            this._parents.length = 0;
            children.forEach(function (child) {
                child.removeParent(_this);
            });
            parents.forEach(function (parent) {
                parent.removeFromViewModelCallbacks(_this);
            });
        }
    };
    return ViewModelInstance;
}());

var ViewModelInstanceValue = /** @class */ (function () {
    function ViewModelInstanceValue(instance, parent) {
        this.callbacks = [];
        this._viewModelInstanceValue = instance;
        this._parentViewModel = parent;
    }
    ViewModelInstanceValue.prototype.on = function (callback) {
        // Since we don't clean the changed flag for properties that don't have listeners,
        // we clean it the first time we add a listener to it
        if (this.callbacks.length === 0) {
            this._viewModelInstanceValue.clearChanges();
        }
        if (!this.callbacks.includes(callback)) {
            this.callbacks.push(callback);
            this._parentViewModel.addToPropertyCallbacks(this);
        }
    };
    ViewModelInstanceValue.prototype.off = function (callback) {
        if (!callback) {
            this.callbacks.length = 0;
        }
        else {
            this.callbacks = this.callbacks.filter(function (cb) { return cb !== callback; });
        }
        if (this.callbacks.length === 0) {
            this._parentViewModel.removeFromPropertyCallbacks(this);
        }
    };
    ViewModelInstanceValue.prototype.internalHandleCallback = function (callback) { };
    ViewModelInstanceValue.prototype.handleCallbacks = function () {
        var _this = this;
        if (this._viewModelInstanceValue.hasChanged) {
            this.callbacks.forEach(function (callback) {
                _this.internalHandleCallback(callback);
            });
        }
    };
    ViewModelInstanceValue.prototype.clearChanges = function () {
        this._viewModelInstanceValue.clearChanges();
    };
    ViewModelInstanceValue.prototype.clearCallbacks = function () {
        this.callbacks.length = 0;
    };
    Object.defineProperty(ViewModelInstanceValue.prototype, "name", {
        get: function () {
            return this._viewModelInstanceValue.name;
        },
        enumerable: false,
        configurable: true
    });
    return ViewModelInstanceValue;
}());

var ViewModelInstanceString = /** @class */ (function (_super) {
    __extends(ViewModelInstanceString, _super);
    function ViewModelInstanceString(instance, parent) {
        return _super.call(this, instance, parent) || this;
    }
    Object.defineProperty(ViewModelInstanceString.prototype, "value", {
        get: function () {
            return this._viewModelInstanceValue.value;
        },
        set: function (val) {
            this._viewModelInstanceValue.value = val;
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceString.prototype.internalHandleCallback = function (callback) {
        callback(this.value);
    };
    return ViewModelInstanceString;
}(ViewModelInstanceValue));

var ViewModelInstanceNumber = /** @class */ (function (_super) {
    __extends(ViewModelInstanceNumber, _super);
    function ViewModelInstanceNumber(instance, parent) {
        return _super.call(this, instance, parent) || this;
    }
    Object.defineProperty(ViewModelInstanceNumber.prototype, "value", {
        get: function () {
            return this._viewModelInstanceValue.value;
        },
        set: function (val) {
            this._viewModelInstanceValue.value = val;
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceNumber.prototype.internalHandleCallback = function (callback) {
        callback(this.value);
    };
    return ViewModelInstanceNumber;
}(ViewModelInstanceValue));

var ViewModelInstanceBoolean = /** @class */ (function (_super) {
    __extends(ViewModelInstanceBoolean, _super);
    function ViewModelInstanceBoolean(instance, parent) {
        return _super.call(this, instance, parent) || this;
    }
    Object.defineProperty(ViewModelInstanceBoolean.prototype, "value", {
        get: function () {
            return this._viewModelInstanceValue.value;
        },
        set: function (val) {
            this._viewModelInstanceValue.value = val;
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceBoolean.prototype.internalHandleCallback = function (callback) {
        callback(this.value);
    };
    return ViewModelInstanceBoolean;
}(ViewModelInstanceValue));

var ViewModelInstanceTrigger = /** @class */ (function (_super) {
    __extends(ViewModelInstanceTrigger, _super);
    function ViewModelInstanceTrigger(instance, parent) {
        return _super.call(this, instance, parent) || this;
    }
    ViewModelInstanceTrigger.prototype.trigger = function () {
        return this._viewModelInstanceValue.trigger();
    };
    ViewModelInstanceTrigger.prototype.internalHandleCallback = function (callback) {
        callback();
    };
    return ViewModelInstanceTrigger;
}(ViewModelInstanceValue));

var ViewModelInstanceEnum = /** @class */ (function (_super) {
    __extends(ViewModelInstanceEnum, _super);
    function ViewModelInstanceEnum(instance, parent) {
        return _super.call(this, instance, parent) || this;
    }
    Object.defineProperty(ViewModelInstanceEnum.prototype, "value", {
        get: function () {
            return this._viewModelInstanceValue.value;
        },
        set: function (val) {
            this._viewModelInstanceValue.value = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewModelInstanceEnum.prototype, "valueIndex", {
        get: function () {
            return this._viewModelInstanceValue
                .valueIndex;
        },
        set: function (val) {
            this._viewModelInstanceValue.valueIndex = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewModelInstanceEnum.prototype, "values", {
        get: function () {
            return this._viewModelInstanceValue.values;
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceEnum.prototype.internalHandleCallback = function (callback) {
        callback(this.value);
    };
    return ViewModelInstanceEnum;
}(ViewModelInstanceValue));

var ViewModelInstanceList = /** @class */ (function (_super) {
    __extends(ViewModelInstanceList, _super);
    function ViewModelInstanceList(instance, parent) {
        return _super.call(this, instance, parent) || this;
    }
    Object.defineProperty(ViewModelInstanceList.prototype, "length", {
        get: function () {
            return this._viewModelInstanceValue.size;
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceList.prototype.addInstance = function (instance) {
        if (instance.runtimeInstance != null) {
            this._viewModelInstanceValue.addInstance(instance.runtimeInstance);
            instance.addParent(this._parentViewModel);
        }
    };
    ViewModelInstanceList.prototype.addInstanceAt = function (instance, index) {
        if (instance.runtimeInstance != null) {
            if (this._viewModelInstanceValue.addInstanceAt(instance.runtimeInstance, index)) {
                instance.addParent(this._parentViewModel);
                return true;
            }
        }
        return false;
    };
    ViewModelInstanceList.prototype.removeInstance = function (instance) {
        if (instance.runtimeInstance != null) {
            this._viewModelInstanceValue.removeInstance(instance.runtimeInstance);
            instance.removeParent(this._parentViewModel);
        }
    };
    ViewModelInstanceList.prototype.removeInstanceAt = function (index) {
        this._viewModelInstanceValue.removeInstanceAt(index);
    };
    ViewModelInstanceList.prototype.instanceAt = function (index) {
        var runtimeInstance = this._viewModelInstanceValue.instanceAt(index);
        if (runtimeInstance != null) {
            var viewModelInstance = new ViewModelInstance(runtimeInstance, this._parentViewModel);
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.createFinalization)(viewModelInstance, runtimeInstance);
            return viewModelInstance;
        }
        return null;
    };
    ViewModelInstanceList.prototype.swap = function (a, b) {
        this._viewModelInstanceValue.swap(a, b);
    };
    ViewModelInstanceList.prototype.internalHandleCallback = function (callback) {
        callback();
    };
    return ViewModelInstanceList;
}(ViewModelInstanceValue));

var ViewModelInstanceColor = /** @class */ (function (_super) {
    __extends(ViewModelInstanceColor, _super);
    function ViewModelInstanceColor(instance, parent) {
        return _super.call(this, instance, parent) || this;
    }
    Object.defineProperty(ViewModelInstanceColor.prototype, "value", {
        get: function () {
            return this._viewModelInstanceValue.value;
        },
        set: function (val) {
            this._viewModelInstanceValue.value = val;
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceColor.prototype.rgb = function (r, g, b) {
        this._viewModelInstanceValue.rgb(r, g, b);
    };
    ViewModelInstanceColor.prototype.rgba = function (r, g, b, a) {
        this._viewModelInstanceValue.argb(a, r, g, b);
    };
    ViewModelInstanceColor.prototype.argb = function (a, r, g, b) {
        this._viewModelInstanceValue.argb(a, r, g, b);
    };
    // Value 0 to 255
    ViewModelInstanceColor.prototype.alpha = function (a) {
        this._viewModelInstanceValue.alpha(a);
    };
    // Value 0 to 1
    ViewModelInstanceColor.prototype.opacity = function (o) {
        this._viewModelInstanceValue.alpha(Math.round(Math.max(0, Math.min(1, o)) * 255));
    };
    ViewModelInstanceColor.prototype.internalHandleCallback = function (callback) {
        callback(this.value);
    };
    return ViewModelInstanceColor;
}(ViewModelInstanceValue));

var ViewModelInstanceAssetImage = /** @class */ (function (_super) {
    __extends(ViewModelInstanceAssetImage, _super);
    function ViewModelInstanceAssetImage(instance, root) {
        return _super.call(this, instance, root) || this;
    }
    Object.defineProperty(ViewModelInstanceAssetImage.prototype, "value", {
        set: function (image) {
            var _a;
            this._viewModelInstanceValue.value((_a = image === null || image === void 0 ? void 0 : image.nativeImage) !== null && _a !== void 0 ? _a : null);
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceAssetImage.prototype.internalHandleCallback = function (callback) {
        callback();
    };
    return ViewModelInstanceAssetImage;
}(ViewModelInstanceValue));

var ViewModelInstanceAssetFont = /** @class */ (function (_super) {
    __extends(ViewModelInstanceAssetFont, _super);
    function ViewModelInstanceAssetFont(instance, root) {
        return _super.call(this, instance, root) || this;
    }
    Object.defineProperty(ViewModelInstanceAssetFont.prototype, "value", {
        set: function (font) {
            var _a;
            this._viewModelInstanceValue.value((_a = font === null || font === void 0 ? void 0 : font.nativeFont) !== null && _a !== void 0 ? _a : null);
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceAssetFont.prototype.internalHandleCallback = function (callback) {
        callback();
    };
    return ViewModelInstanceAssetFont;
}(ViewModelInstanceValue));

var ViewModelInstanceArtboard = /** @class */ (function (_super) {
    __extends(ViewModelInstanceArtboard, _super);
    function ViewModelInstanceArtboard(instance, root) {
        return _super.call(this, instance, root) || this;
    }
    Object.defineProperty(ViewModelInstanceArtboard.prototype, "value", {
        set: function (artboard) {
            var _a, _b;
            var bindableArtboard;
            if (artboard.isBindableArtboard) {
                bindableArtboard = artboard;
            }
            else {
                bindableArtboard = artboard.file.internalBindableArtboardFromArtboard(artboard.nativeArtboard);
            }
            this._viewModelInstanceValue.value((_a = bindableArtboard === null || bindableArtboard === void 0 ? void 0 : bindableArtboard.nativeArtboard) !== null && _a !== void 0 ? _a : null);
            if (bindableArtboard === null || bindableArtboard === void 0 ? void 0 : bindableArtboard.nativeViewModel) {
                this._viewModelInstanceValue.viewModelInstance((_b = bindableArtboard === null || bindableArtboard === void 0 ? void 0 : bindableArtboard.nativeViewModel) !== null && _b !== void 0 ? _b : null);
            }
        },
        enumerable: false,
        configurable: true
    });
    ViewModelInstanceArtboard.prototype.internalHandleCallback = function (callback) {
        callback();
    };
    return ViewModelInstanceArtboard;
}(ViewModelInstanceValue));

// Loads Rive data from a URI via fetch.
var loadRiveFile = function (src) { return __awaiter(void 0, void 0, void 0, function () {
    var req, res, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = new Request(src);
                return [4 /*yield*/, fetch(req)];
            case 1:
                res = _a.sent();
                if (!res.ok) {
                    throw new Error("Failed to fetch the Rive file: HTTP ".concat(res.status));
                }
                return [4 /*yield*/, res.arrayBuffer()];
            case 2:
                buffer = _a.sent();
                return [2 /*return*/, buffer];
        }
    });
}); };
// #endregion
// #region utility functions
/*
 * Utility function to ensure an object is a string array
 */
var mapToStringArray = function (obj) {
    if (typeof obj === "string") {
        return [obj];
    }
    else if (obj instanceof Array) {
        return obj;
    }
    // If obj is undefined, return empty array
    return [];
};
// #endregion
// #region testing utilities
// Exports to only be used for tests
var Testing = {
    EventManager: EventManager,
    TaskQueueManager: TaskQueueManager,
};
// #endregion
// #region asset loaders
/**
 * Decodes bytes into an audio asset.
 *
 * Be sure to call `.unref()` on the audio once it is no longer needed. This
 * allows the engine to clean it up when it is not used by any more animations.
 */
var decodeAudio = function (bytes) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedPromise, audio, audioWrapper;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decodedPromise = new Promise(function (resolve) {
                    return _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.getInstance(function (rive) {
                        rive.decodeAudio(bytes, resolve, null);
                    });
                });
                return [4 /*yield*/, decodedPromise];
            case 1:
                audio = _a.sent();
                audioWrapper = new _utils__WEBPACK_IMPORTED_MODULE_3__.AudioWrapper(audio);
                _utils__WEBPACK_IMPORTED_MODULE_3__.finalizationRegistry.register(audioWrapper, audio);
                return [2 /*return*/, audioWrapper];
        }
    });
}); };
/**
 * Decodes bytes into an image.
 *
 * Be sure to call `.unref()` on the image once it is no longer needed. This
 * allows the engine to clean it up when it is not used by any more animations.
 */
var decodeImage = function (bytes) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedPromise, image, imageWrapper;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decodedPromise = new Promise(function (resolve) {
                    return _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.getInstance(function (rive) {
                        rive.decodeImage(bytes, resolve, null);
                    });
                });
                return [4 /*yield*/, decodedPromise];
            case 1:
                image = _a.sent();
                imageWrapper = new _utils__WEBPACK_IMPORTED_MODULE_3__.ImageWrapper(image);
                _utils__WEBPACK_IMPORTED_MODULE_3__.finalizationRegistry.register(imageWrapper, image);
                return [2 /*return*/, imageWrapper];
        }
    });
}); };
/**
 * Decodes bytes into a font.
 *
 * Be sure to call `.unref()` on the font once it is no longer needed. This
 * allows the engine to clean it up when it is not used by any more animations.
 */
var decodeFont = function (bytes) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedPromise, font, fontWrapper;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decodedPromise = new Promise(function (resolve) {
                    return _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.getInstance(function (rive) {
                        rive.decodeFont(bytes, resolve, null);
                    });
                });
                return [4 /*yield*/, decodedPromise];
            case 1:
                font = _a.sent();
                fontWrapper = new _utils__WEBPACK_IMPORTED_MODULE_3__.FontWrapper(font);
                _utils__WEBPACK_IMPORTED_MODULE_3__.finalizationRegistry.register(fontWrapper, font);
                return [2 /*return*/, fontWrapper];
        }
    });
}); };
// #endregion

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=rive.js.map