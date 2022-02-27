"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/metadata/[name]";
exports.ids = ["pages/api/metadata/[name]"];
exports.modules = {

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "(api)/./pages/api/metadata/[name].js":
/*!**************************************!*\
  !*** ./pages/api/metadata/[name].js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nfunction handler(req, res) {\n    const { name  } = req.query;\n    const file = JSON.parse((__webpack_require__(/*! fs */ \"fs\").readFileSync)('collection/_metadata.json'));\n    const item = file.find((f)=>f.name === name\n    );\n    res.status(200).json({\n        ...item\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbWV0YWRhdGEvW25hbWVdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxRQUFRLENBQUNBLE9BQU8sQ0FBRUMsR0FBRyxFQUFFQyxHQUFHLEVBQUUsQ0FBQztJQUMxQyxLQUFLLENBQUMsQ0FBQyxDQUFDQyxJQUFJLEVBQUMsQ0FBQyxHQUFHRixHQUFHLENBQUNHLEtBQUs7SUFDMUIsS0FBSyxDQUFDQyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDQyxrREFBMEIsQ0FBQyxDQUEyQjtJQUM5RSxLQUFLLENBQUNFLElBQUksR0FBR0wsSUFBSSxDQUFDTSxJQUFJLEVBQUNDLENBQUMsR0FBSUEsQ0FBQyxDQUFDVCxJQUFJLEtBQUtBLElBQUk7O0lBRTNDRCxHQUFHLENBQUNXLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO1dBQUlKLElBQUk7SUFBQyxDQUFDO0FBQ2xDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYXJkaGF0LXByb2plY3QvLi9wYWdlcy9hcGkvbWV0YWRhdGEvW25hbWVdLmpzPzkzNGIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlciAocmVxLCByZXMpIHtcbiAgY29uc3QgeyBuYW1lIH0gPSByZXEucXVlcnlcbiAgY29uc3QgZmlsZSA9IEpTT04ucGFyc2UocmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoJ2NvbGxlY3Rpb24vX21ldGFkYXRhLmpzb24nKSlcbiAgY29uc3QgaXRlbSA9IGZpbGUuZmluZChmID0+IGYubmFtZSA9PT0gbmFtZSlcblxuICByZXMuc3RhdHVzKDIwMCkuanNvbih7IC4uLml0ZW0gfSlcbn1cbiJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwibmFtZSIsInF1ZXJ5IiwiZmlsZSIsIkpTT04iLCJwYXJzZSIsInJlcXVpcmUiLCJyZWFkRmlsZVN5bmMiLCJpdGVtIiwiZmluZCIsImYiLCJzdGF0dXMiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/metadata/[name].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/metadata/[name].js"));
module.exports = __webpack_exports__;

})();