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
exports.id = "pages/api/upload";
exports.ids = ["pages/api/upload"];
exports.modules = {

/***/ "@pinata/sdk":
/*!******************************!*\
  !*** external "@pinata/sdk" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@pinata/sdk");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "(api)/./pages/api/upload.js":
/*!*****************************!*\
  !*** ./pages/api/upload.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nconst pinataSDK = __webpack_require__(/*! @pinata/sdk */ \"@pinata/sdk\");\nconst pinata = pinataSDK(\"aabcca080822cfe65451\", \"e308ee08982d3209f32ee9c748edd61681e15f33afd99fbf9cdd05c03e8e22f0\");\nconst collectionMetadata = __webpack_require__(/*! ../../collection/_metadata.json */ \"(api)/./collection/_metadata.json\");\nconst hashedCollectionMetadata = [];\nasync function handler(req, res) {\n    try {\n        await pinata.testAuthentication();\n        console.log('[*] About to update %d files', collectionMetadata.length);\n        for await (let item of collectionMetadata){\n            const { IpfsHash  } = await pinata.pinFromFS(`collection/${item.name}.png`);\n            hashedCollectionMetadata.push({\n                ...item,\n                image: 'https://gateway.pinata.cloud/ipfs/' + IpfsHash\n            });\n            console.log('[*] Uploaded: ', item.name, IpfsHash);\n        }\n        (__webpack_require__(/*! fs */ \"fs\").writeFileSync)('collection/_metadata.json', JSON.stringify(hashedCollectionMetadata));\n        res.json({\n            message: 'Done'\n        });\n    } catch (err) {\n        res.status(503).json({\n            err\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdXBsb2FkLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxLQUFLLENBQUNBLFNBQVMsR0FBR0MsbUJBQU8sQ0FBQyxnQ0FBYTtBQUN2QyxLQUFLLENBQUNDLE1BQU0sR0FBR0YsU0FBUyxDQUN0Qkcsc0JBQTBCLEVBQzFCQSxrRUFBNkI7QUFFL0IsS0FBSyxDQUFDSSxrQkFBa0IsR0FBR04sbUJBQU8sQ0FBQywwRUFBaUM7QUFDcEUsS0FBSyxDQUFDTyx3QkFBd0IsR0FBRyxDQUFDLENBQUM7QUFFcEIsZUFBZUMsT0FBTyxDQUFFQyxHQUFHLEVBQUVDLEdBQUcsRUFBRSxDQUFDO0lBQ2hELEdBQUcsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDVCxNQUFNLENBQUNVLGtCQUFrQjtRQUMvQkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBOEIsK0JBQUVQLGtCQUFrQixDQUFDUSxNQUFNO1FBQ3JFLEdBQUcsUUFBUSxHQUFHLENBQUNDLElBQUksSUFBSVQsa0JBQWtCLENBQUUsQ0FBQztZQUMxQyxLQUFLLENBQUMsQ0FBQyxDQUFDVSxRQUFRLEVBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQ2YsTUFBTSxDQUFDZ0IsU0FBUyxFQUFFLFdBQVcsRUFBRUYsSUFBSSxDQUFDRyxJQUFJLENBQUMsSUFBSTtZQUN4RVgsd0JBQXdCLENBQUNZLElBQUksQ0FBQyxDQUFDO21CQUMxQkosSUFBSTtnQkFDUEssS0FBSyxFQUFFLENBQW9DLHNDQUFHSixRQUFRO1lBQ3hELENBQUM7WUFDREosT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBZ0IsaUJBQUVFLElBQUksQ0FBQ0csSUFBSSxFQUFFRixRQUFRO1FBQ25ELENBQUM7UUFDRGhCLG1EQUEyQixDQUN6QixDQUEyQiw0QkFDM0JzQixJQUFJLENBQUNDLFNBQVMsQ0FBQ2hCLHdCQUF3QjtRQUV6Q0csR0FBRyxDQUFDYyxJQUFJLENBQUMsQ0FBQztZQUFDQyxPQUFPLEVBQUUsQ0FBTTtRQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLEtBQUssRUFBRUMsR0FBRyxFQUFFLENBQUM7UUFDYmhCLEdBQUcsQ0FBQ2lCLE1BQU0sQ0FBQyxHQUFHLEVBQUVILElBQUksQ0FBQyxDQUFDO1lBQUNFLEdBQUc7UUFBQyxDQUFDO0lBQzlCLENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFyZGhhdC1wcm9qZWN0Ly4vcGFnZXMvYXBpL3VwbG9hZC5qcz81NTcyIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBpbmF0YVNESyA9IHJlcXVpcmUoJ0BwaW5hdGEvc2RrJylcbmNvbnN0IHBpbmF0YSA9IHBpbmF0YVNESyhcbiAgcHJvY2Vzcy5lbnYuUElOQVRBX0FQSV9LRVksXG4gIHByb2Nlc3MuZW52LlBJTkFUQV9BUElfU0VDUkVUXG4pXG5jb25zdCBjb2xsZWN0aW9uTWV0YWRhdGEgPSByZXF1aXJlKCcuLi8uLi9jb2xsZWN0aW9uL19tZXRhZGF0YS5qc29uJylcbmNvbnN0IGhhc2hlZENvbGxlY3Rpb25NZXRhZGF0YSA9IFtdXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIgKHJlcSwgcmVzKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgcGluYXRhLnRlc3RBdXRoZW50aWNhdGlvbigpXG4gICAgY29uc29sZS5sb2coJ1sqXSBBYm91dCB0byB1cGRhdGUgJWQgZmlsZXMnLCBjb2xsZWN0aW9uTWV0YWRhdGEubGVuZ3RoKVxuICAgIGZvciBhd2FpdCAobGV0IGl0ZW0gb2YgY29sbGVjdGlvbk1ldGFkYXRhKSB7XG4gICAgICBjb25zdCB7IElwZnNIYXNoIH0gPSBhd2FpdCBwaW5hdGEucGluRnJvbUZTKGBjb2xsZWN0aW9uLyR7aXRlbS5uYW1lfS5wbmdgKVxuICAgICAgaGFzaGVkQ29sbGVjdGlvbk1ldGFkYXRhLnB1c2goe1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBpbWFnZTogJ2h0dHBzOi8vZ2F0ZXdheS5waW5hdGEuY2xvdWQvaXBmcy8nICsgSXBmc0hhc2hcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZygnWypdIFVwbG9hZGVkOiAnLCBpdGVtLm5hbWUsIElwZnNIYXNoKVxuICAgIH1cbiAgICByZXF1aXJlKCdmcycpLndyaXRlRmlsZVN5bmMoXG4gICAgICAnY29sbGVjdGlvbi9fbWV0YWRhdGEuanNvbicsXG4gICAgICBKU09OLnN0cmluZ2lmeShoYXNoZWRDb2xsZWN0aW9uTWV0YWRhdGEpXG4gICAgKVxuICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ0RvbmUnIH0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJlcy5zdGF0dXMoNTAzKS5qc29uKHsgZXJyIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJwaW5hdGFTREsiLCJyZXF1aXJlIiwicGluYXRhIiwicHJvY2VzcyIsImVudiIsIlBJTkFUQV9BUElfS0VZIiwiUElOQVRBX0FQSV9TRUNSRVQiLCJjb2xsZWN0aW9uTWV0YWRhdGEiLCJoYXNoZWRDb2xsZWN0aW9uTWV0YWRhdGEiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwidGVzdEF1dGhlbnRpY2F0aW9uIiwiY29uc29sZSIsImxvZyIsImxlbmd0aCIsIml0ZW0iLCJJcGZzSGFzaCIsInBpbkZyb21GUyIsIm5hbWUiLCJwdXNoIiwiaW1hZ2UiLCJ3cml0ZUZpbGVTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsImpzb24iLCJtZXNzYWdlIiwiZXJyIiwic3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/upload.js\n");

/***/ }),

/***/ "(api)/./collection/_metadata.json":
/*!***********************************!*\
  !*** ./collection/_metadata.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"dna":"011010209070804","name":"1","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmZ3wNuwtvQAL7Fut2h6uc7es3FWYraWAuwDnvze7SvNAr","date":1645991992984,"attributes":[{"value":"7","trait_type":"background","rarity":"original"},{"value":"2","trait_type":"body","rarity":"original"},{"value":"3","trait_type":"eye","rarity":"original"},{"value":"9","trait_type":"hair","rarity":"original"},{"value":"8","trait_type":"mouth","rarity":"original"},{"value":"9","trait_type":"neck","rarity":"original"},{"value":"5","trait_type":"nose","rarity":"original"}]},{"dna":"01000107020400","name":"2","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmYyHCN3XE5x74UGytmABYNRZPaAQ9tGk6j5Cv8NLyMfHM","date":1645991993172,"attributes":[{"value":"10","trait_type":"background","rarity":"original"},{"value":"1","trait_type":"body","rarity":"original"},{"value":"2","trait_type":"eye","rarity":"original"},{"value":"7","trait_type":"hair","rarity":"original"},{"value":"3","trait_type":"mouth","rarity":"original"},{"value":"5","trait_type":"neck","rarity":"original"},{"value":"1","trait_type":"nose","rarity":"original"}]},{"dna":"07010305060802","name":"3","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmQ6rtju7tyYa5PEtzn4AW93rgS7jf3uh9yMEdj7XAGTtF","date":1645991993335,"attributes":[{"value":"3","trait_type":"background","rarity":"original"},{"value":"2","trait_type":"body","rarity":"original"},{"value":"4","trait_type":"eye","rarity":"original"},{"value":"5","trait_type":"hair","rarity":"original"},{"value":"7","trait_type":"mouth","rarity":"original"},{"value":"9","trait_type":"neck","rarity":"original"},{"value":"3","trait_type":"nose","rarity":"original"}]},{"dna":"011010300020804","name":"4","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmRbm1vhBR9qGyGpZCWKhzyRnGmpy7m1Xbksn8RBXZXG7U","date":1645991993502,"attributes":[{"value":"7","trait_type":"background","rarity":"original"},{"value":"2","trait_type":"body","rarity":"original"},{"value":"4","trait_type":"eye","rarity":"original"},{"value":"1","trait_type":"hair","rarity":"original"},{"value":"3","trait_type":"mouth","rarity":"original"},{"value":"9","trait_type":"neck","rarity":"original"},{"value":"5","trait_type":"nose","rarity":"original"}]},{"dna":"08010106050201","name":"5","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmNrAV3UH6qaWaSrtGfrVuSuqt97ZkNMfo9GyGfazQv4sZ","date":1645991993665,"attributes":[{"value":"4","trait_type":"background","rarity":"original"},{"value":"2","trait_type":"body","rarity":"original"},{"value":"2","trait_type":"eye","rarity":"original"},{"value":"6","trait_type":"hair","rarity":"original"},{"value":"6","trait_type":"mouth","rarity":"original"},{"value":"3","trait_type":"neck","rarity":"original"},{"value":"2","trait_type":"nose","rarity":"original"}]},{"dna":"00000501020000","name":"6","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmeJPs3VvkuLkuiVGGjXAo2KSJ3DTLTQYLkY2AkSGQieQP","date":1645991993838,"attributes":[{"value":"1","trait_type":"background","rarity":"original"},{"value":"1","trait_type":"body","rarity":"original"},{"value":"6","trait_type":"eye","rarity":"original"},{"value":"10","trait_type":"hair","rarity":"original"},{"value":"3","trait_type":"mouth","rarity":"original"},{"value":"1","trait_type":"neck","rarity":"original"},{"value":"1","trait_type":"nose","rarity":"original"}]},{"dna":"06020103060803","name":"7","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmY4bDHKKUezUH2W6yrG9Hxwzyu8Hr9As8ki89H9xtVdeC","date":1645991993996,"attributes":[{"value":"2","trait_type":"background","rarity":"original"},{"value":"3","trait_type":"body","rarity":"original"},{"value":"2","trait_type":"eye","rarity":"original"},{"value":"3","trait_type":"hair","rarity":"original"},{"value":"7","trait_type":"mouth","rarity":"original"},{"value":"9","trait_type":"neck","rarity":"original"},{"value":"4","trait_type":"nose","rarity":"original"}]},{"dna":"08020105060703","name":"8","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmagDHxZNnYgUfUvMm8XNuTEjTaBP7mAZXgdKt2iVTcdNs","date":1645991994152,"attributes":[{"value":"4","trait_type":"background","rarity":"original"},{"value":"3","trait_type":"body","rarity":"original"},{"value":"2","trait_type":"eye","rarity":"original"},{"value":"5","trait_type":"hair","rarity":"original"},{"value":"7","trait_type":"mouth","rarity":"original"},{"value":"8","trait_type":"neck","rarity":"original"},{"value":"4","trait_type":"nose","rarity":"original"}]},{"dna":"08010308060801","name":"9","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmRqx9uTNnknYLCZ7Aa2xTnQXbjdP7qKJmpQfcvxhg11ye","date":1645991994311,"attributes":[{"value":"4","trait_type":"background","rarity":"original"},{"value":"2","trait_type":"body","rarity":"original"},{"value":"4","trait_type":"eye","rarity":"original"},{"value":"8","trait_type":"hair","rarity":"original"},{"value":"7","trait_type":"mouth","rarity":"original"},{"value":"9","trait_type":"neck","rarity":"original"},{"value":"2","trait_type":"nose","rarity":"original"}]},{"dna":"07010507000703","name":"10","description":"This is an NFT made by the coolest generative code.","image":"https://gateway.pinata.cloud/ipfs/QmfHZyZPZgiXiiBxLgDtnEp7vjPfVVpdaXLhHiFa1hAAzw","date":1645991994464,"attributes":[{"value":"3","trait_type":"background","rarity":"original"},{"value":"2","trait_type":"body","rarity":"original"},{"value":"6","trait_type":"eye","rarity":"original"},{"value":"7","trait_type":"hair","rarity":"original"},{"value":"1","trait_type":"mouth","rarity":"original"},{"value":"8","trait_type":"neck","rarity":"original"},{"value":"4","trait_type":"nose","rarity":"original"}]}]');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/upload.js"));
module.exports = __webpack_exports__;

})();