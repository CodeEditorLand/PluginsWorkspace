if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_BARCODE_SCANNER__ = (function (n) {
		"use strict";
		async function e(n, e = {}, r) {
			return window.__TAURI_INTERNALS__.invoke(n, e, r);
		}
		var r;
		return (
			"function" == typeof SuppressedError && SuppressedError,
			(n.Format = void 0),
			((r = n.Format || (n.Format = {})).QRCode = "QR_CODE"),
			(r.UPC_A = "UPC_A"),
			(r.UPC_E = "UPC_E"),
			(r.EAN8 = "EAN_8"),
			(r.EAN13 = "EAN_13"),
			(r.Code39 = "CODE_39"),
			(r.Code93 = "CODE_93"),
			(r.Code128 = "CODE_128"),
			(r.Codabar = "CODABAR"),
			(r.ITF = "ITF"),
			(r.Aztec = "AZTEC"),
			(r.DataMatrix = "DATA_MATRIX"),
			(r.PDF417 = "PDF_417"),
			(n.cancel = async function () {
				await e("plugin:barcode-scanner|cancel");
			}),
			(n.checkPermissions = async function () {
				return await (async function (n) {
					return e(`plugin:${n}|check_permissions`);
				})("barcode-scanner").then((n) => n.camera);
			}),
			(n.openAppSettings = async function () {
				await e("plugin:barcode-scanner|open_app_settings");
			}),
			(n.requestPermissions = async function () {
				return await (async function (n) {
					return e(`plugin:${n}|request_permissions`);
				})("barcode-scanner").then((n) => n.camera);
			}),
			(n.scan = async function (n) {
				return await e("plugin:barcode-scanner|scan", { ...n });
			}),
			n
		);
	})({});
	Object.defineProperty(window.__TAURI__, "barcodeScanner", {
		value: __TAURI_PLUGIN_BARCODE_SCANNER__,
	});
}
