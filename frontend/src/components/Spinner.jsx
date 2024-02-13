function Spinner() {
  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  const spinnerStyle = {
    border: '16px solid #f3f3f3', /* Light grey */
    borderTop: '16px solid #3498db', /* Blue */
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite'
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
}

export default Spinner;
