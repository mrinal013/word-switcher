/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/rich-text"
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["richText"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************************!*\
  !*** ./resources/js/register-format-type.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);


/**
 * Add a format button to the rich text
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#richtexttoolbarbutton
 */


/**
 * Custom react hook for retrieving props from registered selectors.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#useselect
 */


const WORD_SWITCH_FORMAT_TYPE = "word-switch/format-type-delimiter";
const WORD_SWITCH_FORMAT_TYPE_WRAP = "word-switch/format-type-wrap";
const MyMultiTagButton = ({
  isActive,
  value,
  onChange
}) => {
  const selectedBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select("core/block-editor").getSelectedBlock();
  }, []);
  const permittedBlock = ["core/paragraph", "core/heading"];
  if (selectedBlock && permittedBlock.includes(selectedBlock.name) === false) {
    return null;
  }
  const selectedString = value.text.substring(value.start, value.end);
  const wordsArray = selectedString.split(",");
  value.activeFormats.forEach(function (format) {
    let type = format?.type;
    if (!type.includes("word-switch/")) {
      let tagName = format?.tagName;
      let style = format?.attributes?.style;
      let className = format?.attributes?.className;
      console.log(format);
      wordsArray.map((word, index) => {
        return wordsArray[index] = `<${tagName} class=${className} style=${style}>${word}</${tagName}>`;
      });
    }
  });
  const obj = {
    words: wordsArray,
    currentIndex: 0,
    isFading: false
  };
  const objString = JSON.stringify(obj);
  const onToggle = () => {
    // Apply the first format
    let nextValue = (0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__.toggleFormat)(value, {
      type: WORD_SWITCH_FORMAT_TYPE_WRAP,
      attributes: {
        "data-wp-interactive": "wpdevagent/word-switch",
        "data-wp-init": "callbacks.init",
        "data-wp-context": objString
      }
    });
    // Apply the second format to the result of the first
    nextValue = (0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__.toggleFormat)(nextValue, {
      type: WORD_SWITCH_FORMAT_TYPE,
      attributes: {
        "data-wp-text": "state.currentWord",
        "data-wp-class--fade": "context.isFading"
      }
    });
    onChange(nextValue);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichTextToolbarButton, {
    icon: "editor-code",
    onClick: onToggle,
    title: "Word Switch",
    isActive: isActive
  });
};
(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__.registerFormatType)(WORD_SWITCH_FORMAT_TYPE, {
  title: "Content",
  tagName: "span",
  className: "word-switch",
  edit: MyMultiTagButton
});
(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__.registerFormatType)(WORD_SWITCH_FORMAT_TYPE_WRAP, {
  title: "Wrap",
  tagName: "span",
  className: "word-switch-wrap",
  edit: null
});
})();

/******/ })()
;
//# sourceMappingURL=register-format-type.js.map