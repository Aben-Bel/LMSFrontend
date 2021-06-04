import { LayoutWithDrawer } from "../../_components/LayoutWithDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Content from "./Content";
import HoverRating from "./HoverRating";
import { Button, ButtonBase, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Rating from "@material-ui/lab/Rating";
import SimpleModal from "../../_components/Modal";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  select: {
    backgroundColor: "#3f5160",
    color: "white",
  },
  full: {
    width: "100%",
  },
  buttonColor: {
    color: "white",
    htmlColor: "white",
    margin: "auto",
    width: "80%",
    backgroundColor: "#0a822a",
  },
  ratingArea: {
    width: 200,
  },
  whiteColor: {
    color: "white",
  },
  modal: {
    height: "90vh",
    width: "90vw",
  },
}));

const contents = [
  {
    id: 0,
    type: "video",
    title: "first",
  },
  {
    id: 2,
    type: "video",
    title: "Second",
  },
  {
    id: 3,
    type: "quiz",
    title: "third",
  },
  {
    id: 4,
    type: "Note",
    title: "fourth",
  },
];

export default function CourseDetail(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    id: 0,
    contentTitle: "",
    contentType: "",
  });

  const {
    categoryId,
    categoryDescription,
    categoryTitle,
    courseId,
    courseTitle,
    courseDescription,
    courseAuthor,
  } = props.location.state.data;

  const rate = 4;

  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState({
    id: 0,
    contentTitle: "",
    contentType: "",
  });
  const user = props.user || " ";

  const handleCloseToggle = (category, description) => {
    setOpen(!open);
    setValue({ category, description });
  };

  const modalBody = (category, description, author) => (
    <>
      <form action="/action_page.php">
        <label for="content">Content Title</label>
        <br />
        <input
          type="text"
          id="content"
          name="content"
          value={value.contentTitle}
        />
        <br />
        <label for="type">Type</label>
        <br />
        <input type="radio" id="video" name="type" value="video" />
        <label for="video">Video</label>
        <br />
        <input type="radio" id="video" name="type" value="quiz" />
        <label for="quiz">Quiz</label>
        <br />
        <input type="radio" id="quiz" name="type" value="note" />
        <label for="note">Note</label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );

  function toObj(id, title, type) {
    return { id, title, contentType: type, ...props.location.state.data };
  }

  function onClickHandlerList(id, title, contentType) {
    setSelected(id);
    setContent(toObj(id, title, contentType));
  }

  return (
    <div>
      <LayoutWithDrawer
        courseHeader={
          <div>
            <div>
              <Typography variant="subtitle1" color="textSecondary">
                {categoryTitle} {" | "} {courseTitle}
              </Typography>
            </div>
            {user.role && user.role.includes("Student") && (
              <div className={classes.ratingArea}>
                <HoverRating />
              </div>
            )}
            {user.role && user.role.includes("Teacher") && (
              <Rating
                className={classes.ratingArea}
                readOnly="true"
                value={rate}
              />
            )}
          </div>
        }
        content={<Content className={classes.full} data={content} />}
        mainListItems={
          <div>
            {user.role && user.role.includes("Teacher") && (
              <ButtonBase
                onClick={() =>
                  handleCloseToggle(
                    contents.head,
                    contents.type,
                    contents.author
                  )
                }
                style={{ width: "100%" }}
              >
                <ListItem className={classes.buttonColor}>
                  <ListItemIcon>
                    <AddCircleIcon className={classes.whiteColor} />
                  </ListItemIcon>
                  <ListItemText primary="Add Content" />
                </ListItem>
              </ButtonBase>
            )}

            {contents.map((ele) => (
              <Link
                key={ele.id}
                onClick={(e) => {
                  e.preventDefault();
                  return onClickHandlerList(ele.id, ele.title, ele.type);
                }}
                to={{
                  pathname: `/category/${categoryTitle}/courses/${courseId}/contents/${ele.id}`,
                  state: {
                    from: props.location,
                    //   data: {
                    //     categoryId: categoryId,
                    //     categoryTitle: categoryTitle,
                    //     categoryDescription: categoryDescription,
                    //     courseId: courseId,
                    //     courseTitle: courseTitle,
                    //     courseDescription: courseDescription,
                    //     contentId: ele.id,
                    //     contentTitle: ele.title,
                    //     contentType: ele.type,
                    //   },
                  },
                }}
                className={classes.link}
              >
                <ListItem
                  className={selected === ele.id ? classes.select : null}
                >
                  <ListItemIcon>
                    <PlayCircleFilledIcon />
                  </ListItemIcon>
                  <ListItemText primary={ele.title} />
                </ListItem>
              </Link>
            ))}
          </div>
        }
      />
      <SimpleModal
        className={classes.modal}
        open={open}
        handleClose={handleCloseToggle}
        body={modalBody}
      ></SimpleModal>
    </div>
  );
}
