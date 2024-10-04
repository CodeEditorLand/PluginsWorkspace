if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_POSITIONER__ = (function (t) {
		"use strict";
		async function e(t, e = {}, o) {
			return window.__TAURI_INTERNALS__.invoke(t, e, o);
		}
		var o;
		return (
			"function" == typeof SuppressedError && SuppressedError,
			(t.Position = void 0),
			((o = t.Position || (t.Position = {}))[(o.TopLeft = 0)] =
				"TopLeft"),
			(o[(o.TopRight = 1)] = "TopRight"),
			(o[(o.BottomLeft = 2)] = "BottomLeft"),
			(o[(o.BottomRight = 3)] = "BottomRight"),
			(o[(o.TopCenter = 4)] = "TopCenter"),
			(o[(o.BottomCenter = 5)] = "BottomCenter"),
			(o[(o.LeftCenter = 6)] = "LeftCenter"),
			(o[(o.RightCenter = 7)] = "RightCenter"),
			(o[(o.Center = 8)] = "Center"),
			(o[(o.TrayLeft = 9)] = "TrayLeft"),
			(o[(o.TrayBottomLeft = 10)] = "TrayBottomLeft"),
			(o[(o.TrayRight = 11)] = "TrayRight"),
			(o[(o.TrayBottomRight = 12)] = "TrayBottomRight"),
			(o[(o.TrayCenter = 13)] = "TrayCenter"),
			(o[(o.TrayBottomCenter = 14)] = "TrayBottomCenter"),
			(t.handleIconState = async function (t) {
				const o = {};
				o[`${t.rect.size.type}`] = {
					width: t.rect.size.width,
					height: t.rect.size.height,
				};
				const i = {};
				(i[`${t.rect.position.type}`] = {
					x: t.rect.position.x,
					y: t.rect.position.y,
				}),
					await e("plugin:positioner|set_tray_icon_state", {
						position: i,
						size: o,
					});
			}),
			(t.moveWindow = async function (t) {
				await e("plugin:positioner|move_window", { position: t });
			}),
			t
		);
	})({});
	Object.defineProperty(window.__TAURI__, "positioner", {
		value: __TAURI_PLUGIN_POSITIONER__,
	});
}
