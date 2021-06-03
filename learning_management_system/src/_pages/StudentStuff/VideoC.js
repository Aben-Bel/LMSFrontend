import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { ReactVideo } from "reactjs-media";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifySelf: "center",
    justifyContent: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(10),
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: "center",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  video: {
    height: "30rem",
    width: "50rem",
  },
}));

export default function VideoC(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5"></Typography>
          <ReactVideo
            src={props.src}
            poster="https://www.example.com/poster.png"
            primaryColor="red"
            className={classes.video}
            // other props
          />
        </CardContent>
      </div>
    </Card>
  );
}
