if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_STRONGHOLD__ = (function (t) {
		"use strict";
		async function e(t, e = {}, r) {
			return window.__TAURI_INTERNALS__.invoke(t, e, r);
		}
		"function" == typeof SuppressedError && SuppressedError;
		class r {
			constructor(t, e) {
				(this.type = t), (this.payload = e);
			}
			static generic(t, e) {
				return new r("Generic", { vault: t, record: e });
			}
			static counter(t, e) {
				return new r("Counter", { vault: t, counter: e });
			}
		}
		class n {
			constructor(t) {
				this.procedureArgs = t;
			}
			async generateSLIP10Seed(t, r) {
				return await e("plugin:stronghold|execute_procedure", {
					...this.procedureArgs,
					procedure: {
						type: "SLIP10Generate",
						payload: { output: t, sizeBytes: r },
					},
				}).then((t) => Uint8Array.from(t));
			}
			async deriveSLIP10(t, r, n, a) {
				return await e("plugin:stronghold|execute_procedure", {
					...this.procedureArgs,
					procedure: {
						type: "SLIP10Derive",
						payload: {
							chain: t,
							input: { type: r, payload: n },
							output: a,
						},
					},
				}).then((t) => Uint8Array.from(t));
			}
			async recoverBIP39(t, r, n) {
				return await e("plugin:stronghold|execute_procedure", {
					...this.procedureArgs,
					procedure: {
						type: "BIP39Recover",
						payload: { mnemonic: t, passphrase: n, output: r },
					},
				}).then((t) => Uint8Array.from(t));
			}
			async generateBIP39(t, r) {
				return await e("plugin:stronghold|execute_procedure", {
					...this.procedureArgs,
					procedure: {
						type: "BIP39Generate",
						payload: { output: t, passphrase: r },
					},
				}).then((t) => Uint8Array.from(t));
			}
			async getEd25519PublicKey(t) {
				return await e("plugin:stronghold|execute_procedure", {
					...this.procedureArgs,
					procedure: {
						type: "PublicKey",
						payload: { type: "Ed25519", privateKey: t },
					},
				}).then((t) => Uint8Array.from(t));
			}
			async signEd25519(t, r) {
				return await e("plugin:stronghold|execute_procedure", {
					...this.procedureArgs,
					procedure: {
						type: "Ed25519Sign",
						payload: { privateKey: t, msg: r },
					},
				}).then((t) => Uint8Array.from(t));
			}
		}
		class a {
			constructor(t, e) {
				(this.path = t), (this.name = e);
			}
			getVault(t) {
				return new o(this.path, this.name, t);
			}
			getStore() {
				return new s(this.path, this.name);
			}
		}
		class s {
			constructor(t, e) {
				(this.path = t), (this.client = e);
			}
			async get(t) {
				return await e("plugin:stronghold|get_store_record", {
					snapshotPath: this.path,
					client: this.client,
					key: t,
				}).then((t) => t && Uint8Array.from(t));
			}
			async insert(t, r, n) {
				await e("plugin:stronghold|save_store_record", {
					snapshotPath: this.path,
					client: this.client,
					key: t,
					value: r,
					lifetime: n,
				});
			}
			async remove(t) {
				return await e("plugin:stronghold|remove_store_record", {
					snapshotPath: this.path,
					client: this.client,
					key: t,
				}).then((t) => t && Uint8Array.from(t));
			}
		}
		class o extends n {
			constructor(t, e, r) {
				super({ snapshotPath: t, client: e, vault: r }),
					(this.path = t),
					(this.client = e),
					(this.name = r);
			}
			async insert(t, r) {
				await e("plugin:stronghold|save_secret", {
					snapshotPath: this.path,
					client: this.client,
					vault: this.name,
					recordPath: t,
					secret: r,
				});
			}
			async remove(t) {
				await e("plugin:stronghold|remove_secret", {
					snapshotPath: this.path,
					client: this.client,
					vault: this.name,
					recordPath: t.payload.record,
				});
			}
		}
		class i {
			constructor(t) {
				this.path = t;
			}
			static async load(t, r) {
				return await e("plugin:stronghold|initialize", {
					snapshotPath: t,
					password: r,
				}).then(() => new i(t));
			}
			async unload() {
				await e("plugin:stronghold|destroy", {
					snapshotPath: this.path,
				});
			}
			async loadClient(t) {
				return await e("plugin:stronghold|load_client", {
					snapshotPath: this.path,
					client: t,
				}).then(() => new a(this.path, t));
			}
			async createClient(t) {
				return await e("plugin:stronghold|create_client", {
					snapshotPath: this.path,
					client: t,
				}).then(() => new a(this.path, t));
			}
			async save() {
				await e("plugin:stronghold|save", { snapshotPath: this.path });
			}
		}
		return (
			(t.Client = a),
			(t.Location = r),
			(t.Store = s),
			(t.Stronghold = i),
			(t.Vault = o),
			t
		);
	})({});
	Object.defineProperty(window.__TAURI__, "stronghold", {
		value: __TAURI_PLUGIN_STRONGHOLD__,
	});
}
