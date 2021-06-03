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
  const { categoryId, categoryDescription, categoryTitle } =
    props.location.state.data;

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            {categoryTitle}
          </Typography>
          <Grid container spacing={4}>
            {courses.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Link
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
                      <Typography>{card.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
