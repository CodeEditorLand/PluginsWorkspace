if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_NFC__ = (function (n) {
		"use strict";
		async function e(n, e = {}, t) {
			return window.__TAURI_INTERNALS__.invoke(n, e, t);
		}
		"function" == typeof SuppressedError && SuppressedError;
		const t = [84],
			r = [85];
		var o, c;
		function a(n, e, t, r) {
			return {
				format: n,
				kind:
					"string" == typeof e
						? Array.from(new TextEncoder().encode(e))
						: e,
				id:
					"string" == typeof t
						? Array.from(new TextEncoder().encode(t))
						: t,
				payload:
					"string" == typeof r
						? Array.from(new TextEncoder().encode(r))
						: r,
			};
		}
		(n.TechKind = void 0),
			((o = n.TechKind || (n.TechKind = {}))[(o.IsoDep = 0)] = "IsoDep"),
			(o[(o.MifareClassic = 1)] = "MifareClassic"),
			(o[(o.MifareUltralight = 2)] = "MifareUltralight"),
			(o[(o.Ndef = 3)] = "Ndef"),
			(o[(o.NdefFormatable = 4)] = "NdefFormatable"),
			(o[(o.NfcA = 5)] = "NfcA"),
			(o[(o.NfcB = 6)] = "NfcB"),
			(o[(o.NfcBarcode = 7)] = "NfcBarcode"),
			(o[(o.NfcF = 8)] = "NfcF"),
			(o[(o.NfcV = 9)] = "NfcV"),
			(n.NFCTypeNameFormat = void 0),
			((c = n.NFCTypeNameFormat || (n.NFCTypeNameFormat = {}))[
				(c.Empty = 0)
			] = "Empty"),
			(c[(c.NfcWellKnown = 1)] = "NfcWellKnown"),
			(c[(c.Media = 2)] = "Media"),
			(c[(c.AbsoluteURI = 3)] = "AbsoluteURI"),
			(c[(c.NfcExternal = 4)] = "NfcExternal"),
			(c[(c.Unknown = 5)] = "Unknown"),
			(c[(c.Unchanged = 6)] = "Unchanged");
		const i = [
			"",
			"http://www.",
			"https://www.",
			"http://",
			"https://",
			"tel:",
			"mailto:",
			"ftp://anonymous:anonymous@",
			"ftp://ftp.",
			"ftps://",
			"sftp://",
			"smb://",
			"nfs://",
			"ftp://",
			"dav://",
			"news:",
			"telnet://",
			"imap:",
			"rtsp://",
			"urn:",
			"pop:",
			"sip:",
			"sips:",
			"tftp:",
			"btspp://",
			"btl2cap://",
			"btgoep://",
			"tcpobex://",
			"irdaobex://",
			"file://",
			"urn:epc:id:",
			"urn:epc:tag:",
			"urn:epc:pat:",
			"urn:epc:raw:",
			"urn:epc:",
			"urn:nfc:",
		];
		function f(n) {
			const { type: e, ...t } = n;
			return { [e]: t };
		}
		return (
			(n.RTD_TEXT = t),
			(n.RTD_URI = r),
			(n.isAvailable = async function () {
				return await e("plugin:nfc|is_available");
			}),
			(n.record = a),
			(n.scan = async function (n, t) {
				return await e("plugin:nfc|scan", { kind: f(n), ...t });
			}),
			(n.textRecord = function (e, r, o = "en") {
				const c = Array.from(new TextEncoder().encode(o + e));
				return (
					c.unshift(o.length),
					a(n.NFCTypeNameFormat.NfcWellKnown, t, r ?? [], c)
				);
			}),
			(n.uriRecord = function (e, t) {
				return a(
					n.NFCTypeNameFormat.NfcWellKnown,
					r,
					t ?? [],
					(function (n) {
						let e = "";
						i.slice(1).forEach(function (t) {
							(0 !== e.length && "urn:" !== e) ||
								0 !== n.indexOf(t) ||
								(e = t);
						}),
							0 === e.length && (e = "");
						const t = Array.from(
								new TextEncoder().encode(n.slice(e.length)),
							),
							r = i.indexOf(e);
						return t.unshift(r), t;
					})(e),
				);
			}),
			(n.write = async function (n, t) {
				const { kind: r, ...o } = t ?? {};
				r && (o.kind = f(r)),
					await e("plugin:nfc|write", { records: n, ...o });
			}),
			n
		);
	})({});
	Object.defineProperty(window.__TAURI__, "nfc", {
		value: __TAURI_PLUGIN_NFC__,
	});
}
