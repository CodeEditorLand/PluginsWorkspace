if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_GEOLOCATION__ = (function (t) {
		"use strict";
		function e(t, e, n, i) {
			if ("a" === n && !i)
				throw new TypeError(
					"Private accessor was defined without a getter",
				);
			if ("function" == typeof e ? t !== e || !i : !e.has(t))
				throw new TypeError(
					"Cannot read private member from an object whose class did not declare it",
				);
			return "m" === n
				? i
				: "a" === n
					? i.call(t)
					: i
						? i.value
						: e.get(t);
		}
		function n(t, e, n, i, o) {
			if ("function" == typeof e ? t !== e || !o : !e.has(t))
				throw new TypeError(
					"Cannot write private member to an object whose class did not declare it",
				);
			return e.set(t, n), n;
		}
		var i, o, s;
		"function" == typeof SuppressedError && SuppressedError;
		class r {
			constructor() {
				(this.__TAURI_CHANNEL_MARKER__ = !0),
					i.set(this, () => {}),
					o.set(this, 0),
					s.set(this, {}),
					(this.id = (function (t, e = !1) {
						return window.__TAURI_INTERNALS__.transformCallback(
							t,
							e,
						);
					})(({ message: t, id: r }) => {
						if (r === e(this, o, "f")) {
							n(this, o, r + 1), e(this, i, "f").call(this, t);
							const a = Object.keys(e(this, s, "f"));
							if (a.length > 0) {
								let t = r + 1;
								for (const n of a.sort()) {
									if (parseInt(n) !== t) break;
									{
										const o = e(this, s, "f")[n];
										delete e(this, s, "f")[n],
											e(this, i, "f").call(this, o),
											(t += 1);
									}
								}
								n(this, o, t);
							}
						} else e(this, s, "f")[r.toString()] = t;
					}));
			}
			set onmessage(t) {
				n(this, i, t);
			}
			get onmessage() {
				return e(this, i, "f");
			}
			toJSON() {
				return `__CHANNEL__:${this.id}`;
			}
		}
		async function a(t, e = {}, n) {
			return window.__TAURI_INTERNALS__.invoke(t, e, n);
		}
		return (
			(i = new WeakMap()),
			(o = new WeakMap()),
			(s = new WeakMap()),
			(t.checkPermissions = async function () {
				return await (async function (t) {
					return a(`plugin:${t}|check_permissions`);
				})("geolocation");
			}),
			(t.clearWatch = async function (t) {
				await a("plugin:geolocation|clear_watch", { channelId: t });
			}),
			(t.getCurrentPosition = async function (t) {
				return await a("plugin:geolocation|get_current_position", {
					options: t,
				});
			}),
			(t.requestPermissions = async function (t) {
				return await a("plugin:geolocation|request_permissions", {
					permissions: t,
				});
			}),
			(t.watchPosition = async function (t, e) {
				const n = new r();
				return (
					(n.onmessage = (t) => {
						"string" == typeof t ? e(null, t) : e(t);
					}),
					await a("plugin:geolocation|watch_position", {
						options: t,
						channel: n,
					}),
					n.id
				);
			}),
			t
		);
	})({});
	Object.defineProperty(window.__TAURI__, "geolocation", {
		value: __TAURI_PLUGIN_GEOLOCATION__,
	});
}
