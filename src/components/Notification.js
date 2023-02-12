const Notification = ({ message }) => {
    const errorMessageStyle = {
      color: "green",
      fontStyle: "bold",
      fontSize: 26,
      padding: 10,
      backgroundColor: "#D3D3D3",
      border: "2px solid green",
      width: "70%",
    };
    if (message === null) {
      return null;
    }

    return (
      <div className="error" style={errorMessageStyle}>
        {message}
      </div>
    );
  };

  export default Notification