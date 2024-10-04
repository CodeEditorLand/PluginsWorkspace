if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_HAPTICS__ = (function (r) {
		"use strict";
		async function t(r, t = {}, e) {
			return window.__TAURI_INTERNALS__.invoke(r, t, e);
		}
		var e;
		"function" == typeof SuppressedError && SuppressedError,
			(function (r) {
				(r.WINDOW_RESIZED = "tauri://resize"),
					(r.WINDOW_MOVED = "tauri://move"),
					(r.WINDOW_CLOSE_REQUESTED = "tauri://close-requested"),
					(r.WINDOW_DESTROYED = "tauri://destroyed"),
					(r.WINDOW_FOCUS = "tauri://focus"),
					(r.WINDOW_BLUR = "tauri://blur"),
					(r.WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change"),
					(r.WINDOW_THEME_CHANGED = "tauri://theme-changed"),
					(r.WINDOW_CREATED = "tauri://window-created"),
					(r.WEBVIEW_CREATED = "tauri://webview-created"),
					(r.DRAG_ENTER = "tauri://drag-enter"),
					(r.DRAG_OVER = "tauri://drag-over"),
					(r.DRAG_DROP = "tauri://drag-drop"),
					(r.DRAG_LEAVE = "tauri://drag-leave");
			})(e || (e = {}));
		const a = {
				async vibrate(r) {
					try {
						return {
							status: "ok",
							data: await t("plugin:haptics|vibrate", {
								duration: r,
							}),
						};
					} catch (r) {
						if (r instanceof Error) throw r;
						return { status: "error", error: r };
					}
				},
				async impactFeedback(r) {
					try {
						return {
							status: "ok",
							data: await t("plugin:haptics|impact_feedback", {
								style: r,
							}),
						};
					} catch (r) {
						if (r instanceof Error) throw r;
						return { status: "error", error: r };
					}
				},
				async notificationFeedback(r) {
					try {
						return {
							status: "ok",
							data: await t(
								"plugin:haptics|notification_feedback",
								{ type: r },
							),
						};
					} catch (r) {
						if (r instanceof Error) throw r;
						return { status: "error", error: r };
					}
				},
				async selectionFeedback() {
					try {
						return {
							status: "ok",
							data: await t("plugin:haptics|selection_feedback"),
						};
					} catch (r) {
						if (r instanceof Error) throw r;
						return { status: "error", error: r };
					}
				},
			},
			{
				vibrate: i,
				impactFeedback: c,
				notificationFeedback: n,
				selectionFeedback: o,
			} = a;
		return (
			(r.impactFeedback = c),
			(r.notificationFeedback = n),
			(r.selectionFeedback = o),
			(r.vibrate = i),
			r
		);
	})({});
	Object.defineProperty(window.__TAURI__, "haptics", {
		value: __TAURI_PLUGIN_HAPTICS__,
	});
}
