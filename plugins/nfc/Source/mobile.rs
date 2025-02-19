// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

use serde::de::DeserializeOwned;
use tauri::{
	AppHandle,
	Runtime,
	plugin::{PluginApi, PluginHandle},
};

use crate::models::*;
