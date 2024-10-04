if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_LOG__ = (function (e) {
		"use strict";
		function n(e, n = !1) {
			return window.__TAURI_INTERNALS__.transformCallback(e, n);
		}
		async function r(e, n = {}, r) {
			return window.__TAURI_INTERNALS__.invoke(e, n, r);
		}
		var a, t;
		async function o(e, a, t) {
			const o = { kind: "Any" };
			return r("plugin:event|listen", {
				event: e,
				target: o,
				handler: n(a),
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
		async function i(e, n, a) {
			const t = new Error().stack?.split("\n").map((e) => e.split("@")),
				o = t?.filter(
					([e, n]) => e.length > 0 && "[native code]" !== n,
				),
				{ file: i, line: c, keyValues: u } = a ?? {};
			let l = o?.[0]?.filter((e) => e.length > 0).join("@");
			"Error" === l && (l = "webview::unknown"),
				await r("plugin:log|log", {
					level: e,
					message: n,
					location: l,
					file: i,
					line: c,
					keyValues: u,
				});
		}
		async function c(e) {
			return await o("log://log", (n) => {
				const { level: r } = n.payload;
				let { message: a } = n.payload;
				(a = a.replace(
					/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
					"",
				)),
					e({ message: a, level: r });
			});
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
			})(a || (a = {})),
			(function (e) {
				(e[(e.Trace = 1)] = "Trace"),
					(e[(e.Debug = 2)] = "Debug"),
					(e[(e.Info = 3)] = "Info"),
					(e[(e.Warn = 4)] = "Warn"),
					(e[(e.Error = 5)] = "Error");
			})(t || (t = {})),
			(e.attachConsole = async function () {
				return await c(({ level: e, message: n }) => {
					switch (e) {
						case t.Trace:
							console.log(n);
							break;
						case t.Debug:
							console.debug(n);
							break;
						case t.Info:
							console.info(n);
							break;
						case t.Warn:
							console.warn(n);
							break;
						case t.Error:
							console.error(n);
							break;
						default:
							throw new Error(`unknown log level ${e}`);
					}
				});
			}),
			(e.attachLogger = c),
			(e.debug = async function (e, n) {
				await i(t.Debug, e, n);
			}),
			(e.error = async function (e, n) {
				await i(t.Error, e, n);
			}),
			(e.info = async function (e, n) {
				await i(t.Info, e, n);
			}),
			(e.trace = async function (e, n) {
				await i(t.Trace, e, n);
			}),
			(e.warn = async function (e, n) {
				await i(t.Warn, e, n);
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "log", {
		value: __TAURI_PLUGIN_LOG__,
	});
}
