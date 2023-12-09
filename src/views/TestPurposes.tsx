import React from "react";

interface TemplateProps {
  darkMode: boolean;
}

const TemplateComponent: React.FC<TemplateProps> = ({ darkMode }) => {
  // Define classes based on the darkMode prop
  const containerClass = darkMode ? "bg-dark text-white" : "bg-light text-dark";
  const buttonVariant = darkMode ? "secondary" : "primary";

  return (
    <div
      className={containerClass}
      style={{ padding: "20px", minHeight: "100vh" }}
    >
      <h1>React Template with Light/Dark Mode</h1>
      <p>
        This is a simple template component that adapts to light and dark modes.
      </p>
      <button className={`btn btn-${buttonVariant}`}>Click Me</button>
    </div>
  );
};

export default TemplateComponent;
