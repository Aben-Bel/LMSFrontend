import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import Note from "./Note";
import Quiz from "./Quiz";
import VideoC from "./VideoC";

const useStyles = makeStyles((theme) => ({
  ratingArea: {
    margin: theme.spacing(5),
  },
  averageRating: {
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(5),
    position: "fixed",
    right: 0,
  },
  row: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
}));

export default function Content(props) {
  const classes = useStyles();
  const { id, title, contentType, courseAuthor } = props.data;
  const type = contentType ? contentType.toLowerCase() : "";
  console.log("Author: ", courseAuthor);

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <div className={classes.row}>
          <Typography
            component="h3"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            {title}
          </Typography>
          <div className={classes.author}>
            <Typography variant="subtitle1" color="textSecondary">
              by {courseAuthor}
            </Typography>
          </div>
        </div>

        <CardContent className={classes.content}>
          {type.includes("video") && (
            <div>
              <VideoC src="path"></VideoC>
            </div>
          )}

          {type.includes("quiz") && (
            <div>
              <Quiz />
            </div>
          )}

          {type.includes("note") && (
            <div>
              <Note />
            </div>
          )}
        </CardContent>

        {/* <div className={classes.ratingArea}>
          <Typography>Give your rating on the content below</Typography>

        </div> */}
      </div>
    </Card>
  );
}
