import autoprefixer from "autoprefixer";

// Adds vendor prefixes automatically based on the "browserslist" field in
// package.json, so component CSS stays cross-browser without hand-written
// -webkit-/-moz- prefixes.
export default {
  plugins: [autoprefixer()],
};
