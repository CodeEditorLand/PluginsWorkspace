if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_BIOMETRIC__ = (function (e) {
		"use strict";
		async function i(e, i = {}, t) {
			return window.__TAURI_INTERNALS__.invoke(e, i, t);
		}
		var t;
		return (
			"function" == typeof SuppressedError && SuppressedError,
			(e.BiometryType = void 0),
			((t = e.BiometryType || (e.BiometryType = {}))[(t.None = 0)] =
				"None"),
			(t[(t.TouchID = 1)] = "TouchID"),
			(t[(t.FaceID = 2)] = "FaceID"),
			(t[(t.Iris = 3)] = "Iris"),
			(e.authenticate = async function (e, t) {
				await i("plugin:biometric|authenticate", { reason: e, ...t });
			}),
			(e.checkStatus = async function () {
				return await i("plugin:biometric|status");
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "biometric", {
		value: __TAURI_PLUGIN_BIOMETRIC__,
	});
}
