const {
  removeFile,
  writeFile,
} = require("../utils/files");

function cleanCRA(projectPath, typescript, tailwind) {
  const ext = typescript ? "tsx" : "js";

  const appContent = `function App() {
  return (
    <div>
      <h1>App</h1>
    </div>
  );
}

export default App;
`;

  writeFile(projectPath, `src/App.${ext}`, appContent);

  const indexCSSImport = tailwind ? `import "./index.css";\n` : "";

  writeFile(
    projectPath,
    `src/index.${ext}`,
    typescript
      ? `import React from "react";
import ReactDOM from "react-dom/client";
${indexCSSImport}import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
      : `import React from "react";
import ReactDOM from "react-dom/client";
${indexCSSImport}import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
  );

  [
    "src/logo.svg",
    "src/App.css",
    "src/App.test.js",
    "src/App.test.tsx",
    "src/setupTests.js",
    "src/setupTests.ts",
    "src/reportWebVitals.js",
    "src/reportWebVitals.ts",
  ].forEach((file) => {
    removeFile(projectPath, file);
  });
}

module.exports = cleanCRA;
