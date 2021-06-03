import { LayoutWithDrawer } from "../../_components/LayoutWithDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Content from "./Content";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  select: {
    backgroundColor: "#3f5160",
    color: "white",
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
        title={categoryTitle + " > " + courseTitle}
        content={<Content data={content} />}
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
