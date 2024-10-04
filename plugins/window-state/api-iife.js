if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_WINDOW_STATE__ = (function (e) {
		"use strict";
		var t, i, n, a;
		function l(e, t = !1) {
			return window.__TAURI_INTERNALS__.transformCallback(e, t);
		}
		async function s(e, t = {}, i) {
			return window.__TAURI_INTERNALS__.invoke(e, t, i);
		}
		"function" == typeof SuppressedError && SuppressedError;
		class r {
			get rid() {
				return (function (e, t, i, n) {
					if ("a" === i && !n)
						throw new TypeError(
							"Private accessor was defined without a getter",
						);
					if ("function" == typeof t ? e !== t || !n : !t.has(e))
						throw new TypeError(
							"Cannot read private member from an object whose class did not declare it",
						);
					return "m" === i
						? n
						: "a" === i
							? n.call(e)
							: n
								? n.value
								: t.get(e);
				})(this, t, "f");
			}
			constructor(e) {
				t.set(this, void 0),
					(function (e, t, i, n, a) {
						if ("function" == typeof t ? e !== t || !a : !t.has(e))
							throw new TypeError(
								"Cannot write private member to an object whose class did not declare it",
							);
						t.set(e, i);
					})(this, t, e);
			}
			async close() {
				return s("plugin:resources|close", { rid: this.rid });
			}
		}
		t = new WeakMap();
		class o {
			constructor(e, t) {
				(this.type = "Logical"), (this.width = e), (this.height = t);
			}
			toPhysical(e) {
				return new u(this.width * e, this.height * e);
			}
		}
		class u {
			constructor(e, t) {
				(this.type = "Physical"), (this.width = e), (this.height = t);
			}
			toLogical(e) {
				return new o(this.width / e, this.height / e);
			}
		}
		class c {
			constructor(e, t) {
				(this.type = "Logical"), (this.x = e), (this.y = t);
			}
			toPhysical(e) {
				return new d(this.x * e, this.x * e);
			}
		}
		class d {
			constructor(e, t) {
				(this.type = "Physical"), (this.x = e), (this.y = t);
			}
			toLogical(e) {
				return new c(this.x / e, this.y / e);
			}
		}
		async function h(e, t) {
			await s("plugin:event|unlisten", { event: e, eventId: t });
		}
		async function w(e, t, i) {
			var n;
			const a =
				"string" == typeof (null == i ? void 0 : i.target)
					? { kind: "AnyLabel", label: i.target }
					: null !== (n = null == i ? void 0 : i.target) &&
						  void 0 !== n
						? n
						: { kind: "Any" };
			return s("plugin:event|listen", {
				event: e,
				target: a,
				handler: l(t),
			}).then((t) => async () => h(e, t));
		}
		!(function (e) {
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
		})(i || (i = {}));
		class b extends r {
			constructor(e) {
				super(e);
			}
			static async new(e, t, i) {
				return s("plugin:image|new", {
					rgba: y(e),
					width: t,
					height: i,
				}).then((e) => new b(e));
			}
			static async fromBytes(e) {
				return s("plugin:image|from_bytes", { bytes: y(e) }).then(
					(e) => new b(e),
				);
			}
			static async fromPath(e) {
				return s("plugin:image|from_path", { path: e }).then(
					(e) => new b(e),
				);
			}
			async rgba() {
				return s("plugin:image|rgba", { rid: this.rid }).then(
					(e) => new Uint8Array(e),
				);
			}
			async size() {
				return s("plugin:image|size", { rid: this.rid });
			}
		}
		function y(e) {
			return null == e
				? null
				: "string" == typeof e
					? e
					: e instanceof b
						? e.rid
						: e;
		}
		!(function (e) {
			(e[(e.Critical = 1)] = "Critical"),
				(e[(e.Informational = 2)] = "Informational");
		})(n || (n = {}));
		class p {
			constructor(e) {
				(this._preventDefault = !1),
					(this.event = e.event),
					(this.id = e.id);
			}
			preventDefault() {
				this._preventDefault = !0;
			}
			isPreventDefault() {
				return this._preventDefault;
			}
		}
		function g() {
			return new v(
				window.__TAURI_INTERNALS__.metadata.currentWindow.label,
				{ skip: !0 },
			);
		}
		async function _() {
			return s("plugin:window|get_all_windows").then((e) =>
				e.map((e) => new v(e, { skip: !0 })),
			);
		}
		!(function (e) {
			(e.None = "none"),
				(e.Normal = "normal"),
				(e.Indeterminate = "indeterminate"),
				(e.Paused = "paused"),
				(e.Error = "error");
		})(a || (a = {}));
		const m = ["tauri://created", "tauri://error"];
		class v {
			constructor(e, t = {}) {
				var i;
				(this.label = e),
					(this.listeners = Object.create(null)),
					(null == t ? void 0 : t.skip) ||
						s("plugin:window|create", {
							options: {
								...t,
								parent:
									"string" == typeof t.parent
										? t.parent
										: null === (i = t.parent) ||
											  void 0 === i
											? void 0
											: i.label,
								label: e,
							},
						})
							.then(async () => this.emit("tauri://created"))
							.catch(async (e) => this.emit("tauri://error", e));
			}
			static async getByLabel(e) {
				var t;
				return null !== (t = (await _()).find((t) => t.label === e)) &&
					void 0 !== t
					? t
					: null;
			}
			static getCurrent() {
				return g();
			}
			static async getAll() {
				return _();
			}
			static async getFocusedWindow() {
				for (const e of await _()) if (await e.isFocused()) return e;
				return null;
			}
			async listen(e, t) {
				return this._handleTauriEvent(e, t)
					? () => {
							const i = this.listeners[e];
							i.splice(i.indexOf(t), 1);
						}
					: w(e, t, {
							target: { kind: "Window", label: this.label },
						});
			}
			async once(e, t) {
				return this._handleTauriEvent(e, t)
					? () => {
							const i = this.listeners[e];
							i.splice(i.indexOf(t), 1);
						}
					: (async function (e, t, i) {
							return w(
								e,
								(i) => {
									h(e, i.id), t(i);
								},
								i,
							);
						})(e, t, {
							target: { kind: "Window", label: this.label },
						});
			}
			async emit(e, t) {
				if (!m.includes(e))
					return (async function (e, t) {
						await s("plugin:event|emit", { event: e, payload: t });
					})(e, t);
				for (const i of this.listeners[e] || [])
					i({ event: e, id: -1, payload: t });
			}
			async emitTo(e, t, i) {
				if (!m.includes(t))
					return (async function (e, t, i) {
						const n =
							"string" == typeof e
								? { kind: "AnyLabel", label: e }
								: e;
						await s("plugin:event|emit_to", {
							target: n,
							event: t,
							payload: i,
						});
					})(e, t, i);
				for (const e of this.listeners[t] || [])
					e({ event: t, id: -1, payload: i });
			}
			_handleTauriEvent(e, t) {
				return (
					!!m.includes(e) &&
					(e in this.listeners
						? this.listeners[e].push(t)
						: (this.listeners[e] = [t]),
					!0)
				);
			}
			async scaleFactor() {
				return s("plugin:window|scale_factor", { label: this.label });
			}
			async innerPosition() {
				return s("plugin:window|inner_position", {
					label: this.label,
				}).then(({ x: e, y: t }) => new d(e, t));
			}
			async outerPosition() {
				return s("plugin:window|outer_position", {
					label: this.label,
				}).then(({ x: e, y: t }) => new d(e, t));
			}
			async innerSize() {
				return s("plugin:window|inner_size", {
					label: this.label,
				}).then(({ width: e, height: t }) => new u(e, t));
			}
			async outerSize() {
				return s("plugin:window|outer_size", {
					label: this.label,
				}).then(({ width: e, height: t }) => new u(e, t));
			}
			async isFullscreen() {
				return s("plugin:window|is_fullscreen", { label: this.label });
			}
			async isMinimized() {
				return s("plugin:window|is_minimized", { label: this.label });
			}
			async isMaximized() {
				return s("plugin:window|is_maximized", { label: this.label });
			}
			async isFocused() {
				return s("plugin:window|is_focused", { label: this.label });
			}
			async isDecorated() {
				return s("plugin:window|is_decorated", { label: this.label });
			}
			async isResizable() {
				return s("plugin:window|is_resizable", { label: this.label });
			}
			async isMaximizable() {
				return s("plugin:window|is_maximizable", { label: this.label });
			}
			async isMinimizable() {
				return s("plugin:window|is_minimizable", { label: this.label });
			}
			async isClosable() {
				return s("plugin:window|is_closable", { label: this.label });
			}
			async isVisible() {
				return s("plugin:window|is_visible", { label: this.label });
			}
			async title() {
				return s("plugin:window|title", { label: this.label });
			}
			async theme() {
				return s("plugin:window|theme", { label: this.label });
			}
			async center() {
				return s("plugin:window|center", { label: this.label });
			}
			async requestUserAttention(e) {
				let t = null;
				return (
					e &&
						(t =
							e === n.Critical
								? { type: "Critical" }
								: { type: "Informational" }),
					s("plugin:window|request_user_attention", {
						label: this.label,
						value: t,
					})
				);
			}
			async setResizable(e) {
				return s("plugin:window|set_resizable", {
					label: this.label,
					value: e,
				});
			}
			async setEnabled(e) {
				return s("plugin:window|set_enabled", {
					label: this.label,
					value: e,
				});
			}
			async isEnabled() {
				return s("plugin:window|is_enabled", { label: this.label });
			}
			async setMaximizable(e) {
				return s("plugin:window|set_maximizable", {
					label: this.label,
					value: e,
				});
			}
			async setMinimizable(e) {
				return s("plugin:window|set_minimizable", {
					label: this.label,
					value: e,
				});
			}
			async setClosable(e) {
				return s("plugin:window|set_closable", {
					label: this.label,
					value: e,
				});
			}
			async setTitle(e) {
				return s("plugin:window|set_title", {
					label: this.label,
					value: e,
				});
			}
			async maximize() {
				return s("plugin:window|maximize", { label: this.label });
			}
			async unmaximize() {
				return s("plugin:window|unmaximize", { label: this.label });
			}
			async toggleMaximize() {
				return s("plugin:window|toggle_maximize", {
					label: this.label,
				});
			}
			async minimize() {
				return s("plugin:window|minimize", { label: this.label });
			}
			async unminimize() {
				return s("plugin:window|unminimize", { label: this.label });
			}
			async show() {
				return s("plugin:window|show", { label: this.label });
			}
			async hide() {
				return s("plugin:window|hide", { label: this.label });
			}
			async close() {
				return s("plugin:window|close", { label: this.label });
			}
			async destroy() {
				return s("plugin:window|destroy", { label: this.label });
			}
			async setDecorations(e) {
				return s("plugin:window|set_decorations", {
					label: this.label,
					value: e,
				});
			}
			async setShadow(e) {
				return s("plugin:window|set_shadow", {
					label: this.label,
					value: e,
				});
			}
			async setEffects(e) {
				return s("plugin:window|set_effects", {
					label: this.label,
					value: e,
				});
			}
			async clearEffects() {
				return s("plugin:window|set_effects", {
					label: this.label,
					value: null,
				});
			}
			async setAlwaysOnTop(e) {
				return s("plugin:window|set_always_on_top", {
					label: this.label,
					value: e,
				});
			}
			async setAlwaysOnBottom(e) {
				return s("plugin:window|set_always_on_bottom", {
					label: this.label,
					value: e,
				});
			}
			async setContentProtected(e) {
				return s("plugin:window|set_content_protected", {
					label: this.label,
					value: e,
				});
			}
			async setSize(e) {
				if (!e || ("Logical" !== e.type && "Physical" !== e.type))
					throw new Error(
						"the `size` argument must be either a LogicalSize or a PhysicalSize instance",
					);
				const t = {};
				return (
					(t[`${e.type}`] = { width: e.width, height: e.height }),
					s("plugin:window|set_size", { label: this.label, value: t })
				);
			}
			async setMinSize(e) {
				if (e && "Logical" !== e.type && "Physical" !== e.type)
					throw new Error(
						"the `size` argument must be either a LogicalSize or a PhysicalSize instance",
					);
				let t = null;
				return (
					e &&
						((t = {}),
						(t[`${e.type}`] = {
							width: e.width,
							height: e.height,
						})),
					s("plugin:window|set_min_size", {
						label: this.label,
						value: t,
					})
				);
			}
			async setMaxSize(e) {
				if (e && "Logical" !== e.type && "Physical" !== e.type)
					throw new Error(
						"the `size` argument must be either a LogicalSize or a PhysicalSize instance",
					);
				let t = null;
				return (
					e &&
						((t = {}),
						(t[`${e.type}`] = {
							width: e.width,
							height: e.height,
						})),
					s("plugin:window|set_max_size", {
						label: this.label,
						value: t,
					})
				);
			}
			async setSizeConstraints(e) {
				function t(e) {
					return e ? { Logical: e } : null;
				}
				return s("plugin:window|set_size_constraints", {
					label: this.label,
					value: {
						minWidth: t(null == e ? void 0 : e.minWidth),
						minHeight: t(null == e ? void 0 : e.minHeight),
						maxWidth: t(null == e ? void 0 : e.maxWidth),
						maxHeight: t(null == e ? void 0 : e.maxHeight),
					},
				});
			}
			async setPosition(e) {
				if (!e || ("Logical" !== e.type && "Physical" !== e.type))
					throw new Error(
						"the `position` argument must be either a LogicalPosition or a PhysicalPosition instance",
					);
				const t = {};
				return (
					(t[`${e.type}`] = { x: e.x, y: e.y }),
					s("plugin:window|set_position", {
						label: this.label,
						value: t,
					})
				);
			}
			async setFullscreen(e) {
				return s("plugin:window|set_fullscreen", {
					label: this.label,
					value: e,
				});
			}
			async setFocus() {
				return s("plugin:window|set_focus", { label: this.label });
			}
			async setIcon(e) {
				return s("plugin:window|set_icon", {
					label: this.label,
					value: y(e),
				});
			}
			async setSkipTaskbar(e) {
				return s("plugin:window|set_skip_taskbar", {
					label: this.label,
					value: e,
				});
			}
			async setCursorGrab(e) {
				return s("plugin:window|set_cursor_grab", {
					label: this.label,
					value: e,
				});
			}
			async setCursorVisible(e) {
				return s("plugin:window|set_cursor_visible", {
					label: this.label,
					value: e,
				});
			}
			async setCursorIcon(e) {
				return s("plugin:window|set_cursor_icon", {
					label: this.label,
					value: e,
				});
			}
			async setCursorPosition(e) {
				if (!e || ("Logical" !== e.type && "Physical" !== e.type))
					throw new Error(
						"the `position` argument must be either a LogicalPosition or a PhysicalPosition instance",
					);
				const t = {};
				return (
					(t[`${e.type}`] = { x: e.x, y: e.y }),
					s("plugin:window|set_cursor_position", {
						label: this.label,
						value: t,
					})
				);
			}
			async setIgnoreCursorEvents(e) {
				return s("plugin:window|set_ignore_cursor_events", {
					label: this.label,
					value: e,
				});
			}
			async startDragging() {
				return s("plugin:window|start_dragging", { label: this.label });
			}
			async startResizeDragging(e) {
				return s("plugin:window|start_resize_dragging", {
					label: this.label,
					value: e,
				});
			}
			async setProgressBar(e) {
				return s("plugin:window|set_progress_bar", {
					label: this.label,
					value: e,
				});
			}
			async setVisibleOnAllWorkspaces(e) {
				return s("plugin:window|set_visible_on_all_workspaces", {
					label: this.label,
					value: e,
				});
			}
			async setTitleBarStyle(e) {
				return s("plugin:window|set_title_bar_style", {
					label: this.label,
					value: e,
				});
			}
			async setTheme(e) {
				return s("plugin:window|set_theme", {
					label: this.label,
					value: e,
				});
			}
			async onResized(e) {
				return this.listen(i.WINDOW_RESIZED, (t) => {
					var i;
					(t.payload = ((i = t.payload), new u(i.width, i.height))),
						e(t);
				});
			}
			async onMoved(e) {
				return this.listen(i.WINDOW_MOVED, (t) => {
					(t.payload = I(t.payload)), e(t);
				});
			}
			async onCloseRequested(e) {
				return this.listen(i.WINDOW_CLOSE_REQUESTED, async (t) => {
					const i = new p(t);
					await e(i), i.isPreventDefault() || (await this.destroy());
				});
			}
			async onDragDropEvent(e) {
				const t = await this.listen(i.DRAG_ENTER, (t) => {
						e({
							...t,
							payload: {
								type: "enter",
								paths: t.payload.paths,
								position: I(t.payload.position),
							},
						});
					}),
					n = await this.listen(i.DRAG_OVER, (t) => {
						e({
							...t,
							payload: {
								type: "over",
								position: I(t.payload.position),
							},
						});
					}),
					a = await this.listen(i.DRAG_DROP, (t) => {
						e({
							...t,
							payload: {
								type: "drop",
								paths: t.payload.paths,
								position: I(t.payload.position),
							},
						});
					}),
					l = await this.listen(i.DRAG_LEAVE, (t) => {
						e({ ...t, payload: { type: "leave" } });
					});
				return () => {
					t(), a(), n(), l();
				};
			}
			async onFocusChanged(e) {
				const t = await this.listen(i.WINDOW_FOCUS, (t) => {
						e({ ...t, payload: !0 });
					}),
					n = await this.listen(i.WINDOW_BLUR, (t) => {
						e({ ...t, payload: !1 });
					});
				return () => {
					t(), n();
				};
			}
			async onScaleChanged(e) {
				return this.listen(i.WINDOW_SCALE_FACTOR_CHANGED, e);
			}
			async onThemeChanged(e) {
				return this.listen(i.WINDOW_THEME_CHANGED, e);
			}
		}
		var f, E, D;
		function I(e) {
			return new d(e.x, e.y);
		}
		async function S(e, t) {
			await s("plugin:window-state|restore_state", {
				label: e,
				flags: t,
			});
		}
		return (
			(function (e) {
				(e.AppearanceBased = "appearanceBased"),
					(e.Light = "light"),
					(e.Dark = "dark"),
					(e.MediumLight = "mediumLight"),
					(e.UltraDark = "ultraDark"),
					(e.Titlebar = "titlebar"),
					(e.Selection = "selection"),
					(e.Menu = "menu"),
					(e.Popover = "popover"),
					(e.Sidebar = "sidebar"),
					(e.HeaderView = "headerView"),
					(e.Sheet = "sheet"),
					(e.WindowBackground = "windowBackground"),
					(e.HudWindow = "hudWindow"),
					(e.FullScreenUI = "fullScreenUI"),
					(e.Tooltip = "tooltip"),
					(e.ContentBackground = "contentBackground"),
					(e.UnderWindowBackground = "underWindowBackground"),
					(e.UnderPageBackground = "underPageBackground"),
					(e.Mica = "mica"),
					(e.Blur = "blur"),
					(e.Acrylic = "acrylic"),
					(e.Tabbed = "tabbed"),
					(e.TabbedDark = "tabbedDark"),
					(e.TabbedLight = "tabbedLight");
			})(f || (f = {})),
			(function (e) {
				(e.FollowsWindowActiveState = "followsWindowActiveState"),
					(e.Active = "active"),
					(e.Inactive = "inactive");
			})(E || (E = {})),
			(e.StateFlags = void 0),
			((D = e.StateFlags || (e.StateFlags = {}))[(D.SIZE = 1)] = "SIZE"),
			(D[(D.POSITION = 2)] = "POSITION"),
			(D[(D.MAXIMIZED = 4)] = "MAXIMIZED"),
			(D[(D.VISIBLE = 8)] = "VISIBLE"),
			(D[(D.DECORATIONS = 16)] = "DECORATIONS"),
			(D[(D.FULLSCREEN = 32)] = "FULLSCREEN"),
			(D[(D.ALL = 63)] = "ALL"),
			(e.filename = async function () {
				return await s("plugin:window-state|filename");
			}),
			(e.restoreState = S),
			(e.restoreStateCurrent = async function (e) {
				await S(g().label, e);
			}),
			(e.saveWindowState = async function (e) {
				await s("plugin:window-state|save_window_state", { flags: e });
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "windowState", {
		value: __TAURI_PLUGIN_WINDOW_STATE__,
	});
}
