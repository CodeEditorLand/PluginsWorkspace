if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_SQL__ = (function () {
		"use strict";
		async function e(e, t = {}, s) {
			return window.__TAURI_INTERNALS__.invoke(e, t, s);
		}
		"function" == typeof SuppressedError && SuppressedError;
		class t {
			constructor(e) {
				this.path = e;
			}
			static async load(s) {
				const n = await e("plugin:sql|load", { db: s });
				return new t(n);
			}
			static get(e) {
				return new t(e);
			}
			async execute(t, s) {
				const [n, r] = await e("plugin:sql|execute", {
					db: this.path,
					query: t,
					values: s ?? [],
				});
				return { lastInsertId: r, rowsAffected: n };
			}
			async select(t, s) {
				return await e("plugin:sql|select", {
					db: this.path,
					query: t,
					values: s ?? [],
				});
			}
			async close(t) {
				return await e("plugin:sql|close", { db: t });
			}
		}
		return t;
	})();
	Object.defineProperty(window.__TAURI__, "sql", {
		value: __TAURI_PLUGIN_SQL__,
	});
}
