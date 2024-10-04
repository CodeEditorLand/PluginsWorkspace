if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_STORE__ = (function (e) {
		"use strict";
		var t, r;
		function a(e, t = !1) {
			return window.__TAURI_INTERNALS__.transformCallback(e, t);
		}
		async function i(e, t = {}, r) {
			return window.__TAURI_INTERNALS__.invoke(e, t, r);
		}
		"function" == typeof SuppressedError && SuppressedError;
		class n {
			get rid() {
				return (function (e, t, r, a) {
					if ("a" === r && !a)
						throw new TypeError(
							"Private accessor was defined without a getter",
						);
					if ("function" == typeof t ? e !== t || !a : !t.has(e))
						throw new TypeError(
							"Cannot read private member from an object whose class did not declare it",
						);
					return "m" === r
						? a
						: "a" === r
							? a.call(e)
							: a
								? a.value
								: t.get(e);
				})(this, t, "f");
			}
			constructor(e) {
				t.set(this, void 0),
					(function (e, t, r, a, i) {
						if ("function" == typeof t ? e !== t || !i : !t.has(e))
							throw new TypeError(
								"Cannot write private member to an object whose class did not declare it",
							);
						t.set(e, r);
					})(this, t, e);
			}
			async close() {
				return i("plugin:resources|close", { rid: this.rid });
			}
		}
		async function s(e, t, r) {
			const n = { kind: "Any" };
			return i("plugin:event|listen", {
				event: e,
				target: n,
				handler: a(t),
			}).then(
				(t) => async () =>
					(async function (e, t) {
						await i("plugin:event|unlisten", {
							event: e,
							eventId: t,
						});
					})(e, t),
			);
		}
		(t = new WeakMap()),
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
			})(r || (r = {}));
		class o extends n {
			constructor(e, t) {
				super(e), (this.path = t);
			}
			async set(e, t) {
				await i("plugin:store|set", {
					rid: this.rid,
					key: e,
					value: t,
				});
			}
			async get(e) {
				return await i("plugin:store|get", { rid: this.rid, key: e });
			}
			async has(e) {
				return await i("plugin:store|has", { rid: this.rid, key: e });
			}
			async delete(e) {
				return await i("plugin:store|delete", {
					rid: this.rid,
					key: e,
				});
			}
			async clear() {
				await i("plugin:store|clear", { rid: this.rid });
			}
			async reset() {
				await i("plugin:store|reset", { rid: this.rid });
			}
			async keys() {
				return await i("plugin:store|keys", { rid: this.rid });
			}
			async values() {
				return await i("plugin:store|values", { rid: this.rid });
			}
			async entries() {
				return await i("plugin:store|entries", { rid: this.rid });
			}
			async length() {
				return await i("plugin:store|length", { rid: this.rid });
			}
			async load() {
				await i("plugin:store|load", { rid: this.rid });
			}
			async save() {
				await i("plugin:store|save", { rid: this.rid });
			}
			async onKeyChange(e, t) {
				return await s("store://change", (r) => {
					r.payload.path === this.path &&
						r.payload.key === e &&
						t(r.payload.value);
				});
			}
			async onChange(e) {
				return await s("store://change", (t) => {
					t.payload.path === this.path &&
						e(t.payload.key, t.payload.value);
				});
			}
		}
		return (
			(e.Store = o),
			(e.createStore = async function (e, t) {
				const r = await i("plugin:store|create_store", {
					path: e,
					...t,
				});
				return new o(r, e);
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "store", {
		value: __TAURI_PLUGIN_STORE__,
	});
}
