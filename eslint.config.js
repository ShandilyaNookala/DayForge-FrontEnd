import { FlatCompat } from "@eslint/eslintrc";
import reactAppConfig from "eslint-config-react-app";

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.config({
    ...reactAppConfig,
  }),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
