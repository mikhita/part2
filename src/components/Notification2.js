const Notification2 = ({ message }) => {
    const errorMessageStyle = {
      color: "red",
      fontStyle: "bold",
      fontSize: 26,
      padding: 10,
      backgroundColor: "#D3D3D3",
      border: "2px solid red",
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

  export default Notification2