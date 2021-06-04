import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

import SimpleModal from "../../_components/Modal";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  title: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  ignore: {
    textDecoration: "none",
  },
  bar: {
    display: "flex",
    justifyContent: "space-between",
  },
  spacing: {
    margin: theme.spacing(1),
  },
}));

const courses = [
  {
    id: 0,
    head: "Chapter 1",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
  {
    id: 1,
    head: "Chapter 2",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
  {
    id: 2,
    head: "Chapter 3",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
  {
    id: 3,
    head: "Chapter 4",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
  {
    id: 4,
    head: "Chapter 5",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
  {
    id: 5,
    head: "Chapter 6",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
  {
    id: 6,
    head: "Chapter 7",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
  {
    id: 7,
    head: "Chapter 8",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
  {
    id: 8,
    head: "Chapter 9",
    description: "Lorem ipsum lara ip merol",
    author: "Abenezer",
  },
];

export default function AlbumCourses(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({});
  const limit = 100;
  const rate = 4;
  const { categoryId, categoryDescription, categoryTitle } =
    props.location.state.data;
  console.log(props);
  const user = props.user || " ";

  const handleCloseToggle = (category, description) => {
    setOpen(!open);
    setValue({ category, description });
  };

  const modalBody = (category, description, author) => (
    <>
      <form action="/action_page.php">
        <label for="category">Category Title</label>
        <br />
        <input
          type="text"
          id="category"
          name="category"
          value={value.category}
        />
        <br />
        <label for="description">Description</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          value={value.description}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <div className={classes.bar}>
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              {categoryTitle}
            </Typography>
            {user.role && user.role.includes("Teacher") && (
              <Button onClick={() => handleCloseToggle("", "")} color="primary">
                Add Course
              </Button>
            )}
          </div>
          <Grid container spacing={4}>
            {courses.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Link
                  className={classes.ignore}
                  to={{
                    pathname: `/category/${categoryTitle}/courses/${card.id}/contents`,
                    state: {
                      from: props.location,
                      data: {
                        categoryId: categoryId,
                        categoryTitle: categoryTitle,
                        categoryDescription: categoryDescription,
                        courseId: card.id,
                        courseTitle: card.head,
                        courseDescription: card.description,
                        courseAuthor: card.author,
                      },
                    },
                  }}
                >
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.head}
                      </Typography>
                      <Typography>
                        {card.description.slice(0, limit)}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        by {card.author}
                      </Typography>
                    </CardContent>
                    {user.role && user.role.includes("Teacher") && (
                      <CardActions>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCloseToggle(
                              card.head,
                              card.description,
                              card.author
                            );
                            console.log("clicked");
                          }}
                          size="small"
                          color="primary"
                        >
                          Edit
                        </Button>
                      </CardActions>
                    )}
                    <Rating
                      className={classes.spacing}
                      readOnly="true"
                      value={rate}
                    />
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <SimpleModal
        open={open}
        handleClose={handleCloseToggle}
        body={modalBody}
      ></SimpleModal>
    </React.Fragment>
  );
}
