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
import { Typography } from "@material-ui/core";

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
  const {
    categoryId,
    categoryDescription,
    categoryTitle,
    courseId,
    courseTitle,
    courseDescription,
    courseAuthor,
  } = props.location.state.data;

  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState({
    id: 0,
    type: "",
    title: "",
  });

  function toObj(id, title, type) {
    return { id, title, contentType: type, ...props.data };
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
            <div className={classes.ratingArea}>
              <HoverRating />
            </div>
          </div>
        }
        content={<Content className={classes.full} data={content} />}
        mainListItems={
          <div>
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
    </div>
  );
}
