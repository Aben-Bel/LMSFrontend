import React, { useEffect } from "react";
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
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import SimpleModal from "../../_components/Modal";
import { dataService } from "../../_services/data.service";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  bottomButton: {
    position: "fixed",
    right: 20,
    bottom: 20,
  },
  center: {
    position: "fixed",
    top: "50%",
    left: "50%",
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
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const limit = 100;
  const rate = 4;
  const { categoryId, categoryDescription, categoryTitle } =
    props.location.state.data;
  console.log(props);

  const user = props.user || " ";

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const req = {};
    for (var pair of formData.entries()) {
      req[pair[0]] = pair[1];
    }

    if (value.id) {
      // put request
      dataService
        .editCourse(req.title, req.description, value.id, categoryId)
        .then((data) => {
          setLoading(true);
          dataService.getCourses().then((data) => {
            setData(data);
            setLoading(false);
          });
          setLoading(false);
          setOpen(!open);
        });
    } else {
      // post request
      dataService
        .addCourse(req.title, req.description, categoryId)
        .then((data) => {
          setLoading(true);
          dataService
            .getCourses()
            .then((data) => {
              setData(data);
              setLoading(false);
              setOpen(!open);
            })
            .catch(() => {
              setLoading(false);
              setOpen(!open);
            });
          setOpen(!open);
        });
    }
  }

  const handleCloseToggle = (title, description, id = undefined) => {
    setOpen(!open);
    setValue({ title, description, id });
  };

  useEffect(() => {
    setLoading(true);
    dataService.getCourses(categoryId).then(
      (data) => {
        // const result = [];
        // data.forEach((element) => {
        //   dataService
        //     .getRating(element.categoryId, element.id)
        //     .then((rating) => {
        //       result.push({ rate: rating.value, ...element });
        //     })
        //     .catch((error) => {
        //       result.push({ rate: 0, ...element });
        //     });
        // });
        // console.log("res:", result);
        // setData(result);
        setData(data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  }, []);

  const modalBody = () => {
    const title = value.title;
    const description = value.description;
    return (
      <>
        <form onSubmit={submitHandler}>
          <FormGroup>
            <FormLabel>
              <Typography gutterBottom variant="h5" component="h2">
                Course Title
              </Typography>
            </FormLabel>
            <OutlinedInput
              name="title"
              fullWidth
              type="title"
              value={title}
              placeholder="Content Title"
            />

            <FormLabel>
              <Typography gutterBottom variant="h5" component="h2">
                Description
              </Typography>
            </FormLabel>
            <OutlinedInput
              name="description"
              fullWidth
              type="description"
              value={description}
              placeholder="your description"
            />

            <Button className={classes.bottomButton} type="submit">
              Submit
            </Button>
          </FormGroup>
        </form>
      </>
    );
  };

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
            {data.map((card) => (
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
                        courseTitle: card.title,
                        courseDescription: card.description,
                        courseAuthor: card.username,
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
                        {card.title}
                      </Typography>
                      <Typography>
                        {card.description.slice(0, limit)}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        by {card.username}
                      </Typography>
                    </CardContent>
                    {user.role && user.role.includes("Teacher") && (
                      <CardActions>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCloseToggle(
                              card.title,
                              card.description,
                              card.id
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
                      disabled={true}
                      value={data.rate}
                    />
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {isLoading && <CircularProgress className={classes.center} />}
      <SimpleModal
        open={open}
        handleClose={handleCloseToggle}
        body={modalBody}
      ></SimpleModal>
    </React.Fragment>
  );
}
