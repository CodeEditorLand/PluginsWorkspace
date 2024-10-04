if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_DEEP_LINK__ = (function (e) {
		"use strict";
		function n(e, n = !1) {
			return window.__TAURI_INTERNALS__.transformCallback(e, n);
		}
		async function r(e, n = {}, r) {
			return window.__TAURI_INTERNALS__.invoke(e, n, r);
		}
		var t;
		async function i(e, t, i) {
			const a = { kind: "Any" };
			return r("plugin:event|listen", {
				event: e,
				target: a,
				handler: n(t),
			}).then(
				(n) => async () =>
					(async function (e, n) {
						await r("plugin:event|unlisten", {
							event: e,
							eventId: n,
						});
					})(e, n),
			);
		}
		async function a() {
			return await r("plugin:deep-link|get_current");
		}
		return (
			"function" == typeof SuppressedError && SuppressedError,
			(function (e) {
				(e.WINDOW_RESIZED = "tauri://resize"),
					(e.WINDOW_MOVED = "tauri://move"),
					(e.WINDOW_CLOSE_REQUESTED = "tauri://close-requested"),
					(e.WINDOW_DESTROYED = "tauri://destroyed"),
					(e.WINDOW_FOCUS = "tauri://focus"),
					(e.WINDOW_BLUR = "tauri://blur"),
					(e.WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change"),
					(e.WINDOW_THEME_CHANGED = "tauri://theme-changed"),
					(e.WINDOW_CREATED = "tauri://window-created"),
					(e.WEBVIEW_CREATED = "tauri://webview-created"),
					(e.DRAG_ENTER = "tauri://drag-enter"),
					(e.DRAG_OVER = "tauri://drag-over"),
					(e.DRAG_DROP = "tauri://drag-drop"),
					(e.DRAG_LEAVE = "tauri://drag-leave");
			})(t || (t = {})),
			(e.getCurrent = a),
			(e.isRegistered = async function (e) {
				return await r("plugin:deep-link|is_registered", {
					protocol: e,
				});
			}),
			(e.onOpenUrl = async function (e) {
				const n = await a();
				return (
					n && e(n),
					await i("deep-link://new-url", (n) => {
						e(n.payload);
					})
				);
			}),
			(e.register = async function (e) {
				return await r("plugin:deep-link|register", { protocol: e });
			}),
			(e.unregister = async function (e) {
				return await r("plugin:deep-link|unregister", { protocol: e });
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "deepLink", {
		value: __TAURI_PLUGIN_DEEP_LINK__,
	});
}
