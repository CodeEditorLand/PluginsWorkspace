if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_WEBSOCKET__ = (function () {
		"use strict";
		function e(e, t, s, n) {
			if ("a" === s && !n)
				throw new TypeError(
					"Private accessor was defined without a getter",
				);
			if ("function" == typeof t ? e !== t || !n : !t.has(e))
				throw new TypeError(
					"Cannot read private member from an object whose class did not declare it",
				);
			return "m" === s
				? n
				: "a" === s
					? n.call(e)
					: n
						? n.value
						: t.get(e);
		}
		function t(e, t, s, n, r) {
			if ("function" == typeof t ? e !== t || !r : !t.has(e))
				throw new TypeError(
					"Cannot write private member to an object whose class did not declare it",
				);
			return t.set(e, s), s;
		}
		var s, n, r;
		"function" == typeof SuppressedError && SuppressedError;
		class i {
			constructor() {
				(this.__TAURI_CHANNEL_MARKER__ = !0),
					s.set(this, () => {}),
					n.set(this, 0),
					r.set(this, {}),
					(this.id = (function (e, t = !1) {
						return window.__TAURI_INTERNALS__.transformCallback(
							e,
							t,
						);
					})(({ message: i, id: a }) => {
						if (a === e(this, n, "f")) {
							t(this, n, a + 1), e(this, s, "f").call(this, i);
							const o = Object.keys(e(this, r, "f"));
							if (o.length > 0) {
								let i = a + 1;
								for (const t of o.sort()) {
									if (parseInt(t) !== i) break;
									{
										const n = e(this, r, "f")[t];
										delete e(this, r, "f")[t],
											e(this, s, "f").call(this, n),
											(i += 1);
									}
								}
								t(this, n, i);
							}
						} else e(this, r, "f")[a.toString()] = i;
					}));
			}
			set onmessage(e) {
				t(this, s, e);
			}
			get onmessage() {
				return e(this, s, "f");
			}
			toJSON() {
				return `__CHANNEL__:${this.id}`;
			}
		}
		async function a(e, t = {}, s) {
			return window.__TAURI_INTERNALS__.invoke(e, t, s);
		}
		(s = new WeakMap()), (n = new WeakMap()), (r = new WeakMap());
		class o {
			constructor(e, t) {
				(this.id = e), (this.listeners = t);
			}
			static async connect(e, t) {
				const s = [],
					n = new i();
				return (
					(n.onmessage = (e) => {
						s.forEach((t) => {
							t(e);
						});
					}),
					t?.headers &&
						(t.headers = Array.from(
							new Headers(t.headers).entries(),
						)),
					await a("plugin:websocket|connect", {
						url: e,
						onMessage: n,
						config: t,
					}).then((e) => new o(e, s))
				);
			}
			addListener(e) {
				this.listeners.push(e);
			}
			async send(e) {
				let t;
				if ("string" == typeof e) t = { type: "Text", data: e };
				else if ("object" == typeof e && "type" in e) t = e;
				else {
					if (!Array.isArray(e))
						throw new Error(
							"invalid `message` type, expected a `{ type: string, data: any }` object, a string or a numeric array",
						);
					t = { type: "Binary", data: e };
				}
				await a("plugin:websocket|send", { id: this.id, message: t });
			}
			async disconnect() {
				await this.send({
					type: "Close",
					data: { code: 1e3, reason: "Disconnected by client" },
				});
			}
		}
		return o;
	})();
	Object.defineProperty(window.__TAURI__, "websocket", {
		value: __TAURI_PLUGIN_WEBSOCKET__,
	});
}
