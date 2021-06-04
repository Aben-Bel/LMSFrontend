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

import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useTheme } from "@material-ui/core/styles";

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
  bottomButton: {
    position: "fixed",
    right: 20,
    bottom: 20,
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
  const theme = useTheme();
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
  const [type, setType] = useState("");
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

  const handleRadioButton = (e, value) => {
    setType(value);
  };

  function getQuizFromat() {
    return `
    title: "Your Title",
    pages: [
      {
        questions: [
          {
            type: "radiogroup",
            name: "civilwar",
            title: "When was the Civil War?",
            choices: [
              "1750-1800",
              "1800-1850",
              "1850-1900",
              "1900-1950",
              "after 1950",
            ],
            correctAnswer: "1850-1900",
          },
          {
            type: "radiogroup",
            name: "libertyordeath",
            title: "Who said 'Give me liberty or give me death?'",
            choicesOrder: "random",
            choices: [
              "John Hancock",
              "James Madison",
              "Patrick Henry",
              "Samuel Adams",
            ],
            correctAnswer: "Patrick Henry",
          },
          {
            type: "radiogroup",
            name: "magnacarta",
            title: "What is the Magna Carta?",
            choicesOrder: "random",
            choices: [
              "The foundation of the British parliamentary system",
              "The Great Seal of the monarchs of England",
              "The French Declaration of the Rights of Man",
              "The charter signed by the Pilgrims on the Mayflower",
            ],
            correctAnswer: "The foundation of the British parliamentary system",
          },
        ],
      },
    ]`;
  }

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  }

  const modalBody = (category, description, author) => (
    <form onSubmit={submitHandler}>
      <FormGroup>
        <FormLabel>
          <Typography gutterBottom variant="h5" component="h2">
            Content Title
          </Typography>
        </FormLabel>
        <OutlinedInput
          name="title"
          fullWidth
          type="title"
          placeholder="Content Title"
        />

        <FormLabel>
          <Typography gutterBottom variant="h5" component="h2">
            Content Type
          </Typography>
        </FormLabel>
        <RadioGroup name="type" aria-label="gender">
          <FormControlLabel
            control={<Radio color="primary" />}
            label="Video"
            value="video"
            labelPlacement="end"
            onChange={(e) => {
              return handleRadioButton(e, "video");
            }}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            label="Quiz"
            labelPlacement="end"
            value="quiz"
            onChange={(e) => {
              return handleRadioButton(e, "quiz");
            }}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            label="Note"
            labelPlacement="end"
            value="note"
            onChange={(e) => {
              return handleRadioButton(e, "note");
            }}
          />
        </RadioGroup>
        {type && type.includes("note") && (
          <>
            <FormGroup>
              <FormLabel>Note (Enter your note in MARKDOWN format)</FormLabel>
              <OutlinedInput name="note" fullWidth multiline rows="10" />
            </FormGroup>
          </>
        )}
        {type && type.includes("quiz") && (
          <>
            <FormGroup>
              <FormLabel>Quiz (use the example in the textarea)</FormLabel>
              <OutlinedInput
                placeholder={getQuizFromat()}
                fullWidth
                multiline
                rows="10"
                name="quiz"
              />
            </FormGroup>
          </>
        )}
        {type && type.includes("video") && (
          <>
            <FormGroup>
              <FormLabel>Video</FormLabel>
              <OutlinedInput
                fullWidth
                type="file"
                name="video"
                placeholder="Default input"
                endAdornment={
                  <InputAdornment position="end">Browse</InputAdornment>
                }
              />
            </FormGroup>
          </>
        )}
        <Button className={classes.bottomButton} type="submit">
          Submit
        </Button>
      </FormGroup>
    </form>
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
