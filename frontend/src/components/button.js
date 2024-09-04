import Button from "@mui/material/Button";
const ReusableButton = (props) => {
  return (
    <Button variant={props.buttonVariant} color={props.buttonColor}>
      {props.buttonText}
    </Button>
  );
};

export default ReusableButton;