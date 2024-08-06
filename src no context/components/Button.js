function Button({ action, children }) {
  return (
    <button className="btn btn-ui" onClick={action}>
      {children}
    </button>
  );
}

export default Button;
