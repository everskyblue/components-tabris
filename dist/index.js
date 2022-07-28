"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = exports.Toast = exports.CategoryPreference = exports.ScreenPreference = exports.CheckBoxPreference = exports.SwitchPreference = exports.TextPreference = exports.ListPreference = exports.getValuePreference = exports.setPreference = exports.NavigationDrawer = exports.NavigationView = exports.ActionCollection = exports.ActionContainer = exports.Page = exports.version = void 0;
require("string-tocapitalize");
const package_json_1 = require("../package.json");
exports.version = package_json_1.version;
var view_1 = require("./view");
Object.defineProperty(exports, "Page", { enumerable: true, get: function () { return view_1.Page; } });
Object.defineProperty(exports, "ActionContainer", { enumerable: true, get: function () { return view_1.ActionContainer; } });
Object.defineProperty(exports, "ActionCollection", { enumerable: true, get: function () { return view_1.ActionCollection; } });
Object.defineProperty(exports, "NavigationView", { enumerable: true, get: function () { return view_1.NavigationView; } });
Object.defineProperty(exports, "NavigationDrawer", { enumerable: true, get: function () { return view_1.NavigationDrawer; } });
var preference_1 = require("./preference");
Object.defineProperty(exports, "setPreference", { enumerable: true, get: function () { return preference_1.setPreference; } });
Object.defineProperty(exports, "getValuePreference", { enumerable: true, get: function () { return preference_1.getValuePreference; } });
Object.defineProperty(exports, "ListPreference", { enumerable: true, get: function () { return preference_1.ListPreference; } });
Object.defineProperty(exports, "TextPreference", { enumerable: true, get: function () { return preference_1.TextPreference; } });
Object.defineProperty(exports, "SwitchPreference", { enumerable: true, get: function () { return preference_1.SwitchPreference; } });
Object.defineProperty(exports, "CheckBoxPreference", { enumerable: true, get: function () { return preference_1.CheckBoxPreference; } });
Object.defineProperty(exports, "ScreenPreference", { enumerable: true, get: function () { return preference_1.ScreenPreference; } });
Object.defineProperty(exports, "CategoryPreference", { enumerable: true, get: function () { return preference_1.CategoryPreference; } });
var modal_1 = require("./modal");
Object.defineProperty(exports, "Toast", { enumerable: true, get: function () { return modal_1.Toast; } });
Object.defineProperty(exports, "Modal", { enumerable: true, get: function () { return modal_1.Modal; } });
