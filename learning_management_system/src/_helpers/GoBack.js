import { Button } from "@material-ui/core";
import { history } from "./history";

function BackButton(props) {
  console.log(history);
  const goBack = () => history.back();
  return (
    <Button color="inherit" type="button" onClick={() => goBack()}>
      {props.children}
    </Button>
  );
}

export default BackButton;
