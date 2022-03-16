const Button = function ({ children, onClick }) {
  console.log("button render");
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
