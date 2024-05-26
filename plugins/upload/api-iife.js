if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_UPLOAD__ = ((e) => {
		function t(e, t, n, o) {
			if ("a" === n && !o)
				throw new TypeError(
					"Private accessor was defined without a getter",
				);
			if ("function" == typeof t ? e !== t || !o : !t.has(e))
				throw new TypeError(
					"Cannot read private member from an object whose class did not declare it",
				);
			return "m" === n
				? o
				: "a" === n
					? o.call(e)
					: o
						? o.value
						: t.get(e);
		}
		function n(e, t, n, o, s) {
			if ("function" == typeof t ? e !== t || !s : !t.has(e))
				throw new TypeError(
					"Cannot write private member to an object whose class did not declare it",
				);
			return t.set(e, n), n;
		}
		var o, s, r;
		"function" == typeof SuppressedError && SuppressedError;
		class i {
			constructor() {
				(this.__TAURI_CHANNEL_MARKER__ = !0),
					o.set(this, () => {}),
					s.set(this, 0),
					r.set(this, {}),
					(this.id = ((e, t = !1) =>
						window.__TAURI_INTERNALS__.transformCallback(e, t))(
						({ message: e, id: i }) => {
							if (i === t(this, s, "f")) {
								n(this, s, i + 1),
									t(this, o, "f").call(this, e);
								const a = Object.keys(t(this, r, "f"));
								if (a.length > 0) {
									let e = i + 1;
									for (const n of a.sort()) {
										if (Number.parseInt(n) !== e) break;
										{
											const s = t(this, r, "f")[n];
											delete t(this, r, "f")[n],
												t(this, o, "f").call(this, s),
												(e += 1);
										}
									}
									n(this, s, e);
								}
							} else t(this, r, "f")[i.toString()] = e;
						},
					));
			}
			set onmessage(e) {
				n(this, o, e);
			}
			get onmessage() {
				return t(this, o, "f");
			}
			toJSON() {
				return `__CHANNEL__:${this.id}`;
			}
		}
		async function a(e, t = {}, n) {
			return window.__TAURI_INTERNALS__.invoke(e, t, n);
		}
		return (
			(o = new WeakMap()),
			(s = new WeakMap()),
			(r = new WeakMap()),
			(e.download = async (e, t, n, o) => {
				const s = new Uint32Array(1);
				window.crypto.getRandomValues(s);
				const r = s[0],
					c = new i();
				n && (c.onmessage = n),
					await a("plugin:upload|download", {
						id: r,
						url: e,
						filePath: t,
						headers: o ?? {},
						onProgress: c,
					});
			}),
			(e.upload = async (e, t, n, o) => {
				const s = new Uint32Array(1);
				window.crypto.getRandomValues(s);
				const r = s[0],
					c = new i();
				return (
					n && (c.onmessage = n),
					await a("plugin:upload|upload", {
						id: r,
						url: e,
						filePath: t,
						headers: o ?? {},
						onProgress: c,
					})
				);
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "upload", {
		value: __TAURI_PLUGIN_UPLOAD__,
	});
}
