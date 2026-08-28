// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Prefix convention: enforced for NEW components as warnings; existing public
      // selectors (clickOutside, visibleForScreen, ...) can't be renamed without breaking consumers.
      "@angular-eslint/directive-selector": [
        "warn",
        {
          type: "attribute",
          prefix: "lib",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "warn",
        {
          type: "element",
          prefix: "lib",
          style: "kebab-case",
        },
      ],

      // Intentional design / public API — these rules do not fit this library
      "@angular-eslint/no-input-rename": "off",     // kebab-case aliased inputs are public API (e.g. [page-size])
      "@angular-eslint/no-output-on-prefix": "off", // onSearch/onShowMore/onItemSelected are public API
      "@angular-eslint/no-output-rename": "off",    // aliased outputs are public API
      "@angular-eslint/prefer-standalone": "off",   // abstract BaseListComponent + compat-shim NgModules are deliberate

      // Tracked modernization / cleanup debt — surfaced as warnings, not blocking
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-unused-vars": "warn",           // dead code — burn down incrementally
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-namespace": "warn",
      "@typescript-eslint/no-duplicate-enum-values": "warn", // NOTE: SidePaneOverlayType has Default='' and Light='' — review
      "@typescript-eslint/prefer-for-of": "warn",
      "no-useless-escape": "warn",  // redundant regex-pattern escapes — harmless; stripping risks changing matching
      "@angular-eslint/prefer-inject": "warn",
      "@angular-eslint/no-empty-lifecycle-method": "warn",
      "@angular-eslint/prefer-on-push-component-change-detection": "warn",
      "@angular-eslint/no-output-native": "warn",            // e.g. side-view-layout `cancel` output
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      // Deferred Phase 3 polish (two templates still on *ngIf/*ngFor)
      "@angular-eslint/template/prefer-control-flow": "warn",
      // Accessibility — real but numerous; addressed incrementally
      "@angular-eslint/template/click-events-have-key-events": "warn",
      "@angular-eslint/template/interactive-supports-focus": "warn",
      "@angular-eslint/template/role-has-required-aria": "warn",
      "@angular-eslint/template/alt-text": "warn",
      "@angular-eslint/template/eqeqeq": "warn",
    },
  }
]);
