if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_AUTOSTART__ = (function (n) {
		"use strict";
		async function t(n, t = {}, a) {
			return window.__TAURI_INTERNALS__.invoke(n, t, a);
		}
		return (
			"function" == typeof SuppressedError && SuppressedError,
			(n.disable = async function () {
				await t("plugin:autostart|disable");
			}),
			(n.enable = async function () {
				await t("plugin:autostart|enable");
			}),
			(n.isEnabled = async function () {
				return await t("plugin:autostart|is_enabled");
			}),
			n
		);
	})({});
	Object.defineProperty(window.__TAURI__, "autostart", {
		value: __TAURI_PLUGIN_AUTOSTART__,
	});
}
