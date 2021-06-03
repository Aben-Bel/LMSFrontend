import { CardMedia } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { ReactVideo } from "reactjs-media";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
          <ReactVideo
            src="https://www.example.com/url_to_video.mp4"
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
