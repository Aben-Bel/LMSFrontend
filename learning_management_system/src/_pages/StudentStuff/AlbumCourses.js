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
  { id: 0, head: "One", description: "Lorem ipsum lara ip merol" },
  { id: 1, head: "One", description: "Lorem ipsum lara ip merol" },
  { id: 2, head: "One", description: "Lorem ipsum lara ip merol" },
  { id: 3, head: "One", description: "Lorem ipsum lara ip merol" },
  { id: 4, head: "One", description: "Lorem ipsum lara ip merol" },
  { id: 5, head: "One", description: "Lorem ipsum lara ip merol" },
  { id: 6, head: "One", description: "Lorem ipsum lara ip merol" },
  { id: 7, head: "One", description: "Lorem ipsum lara ip merol" },
  { id: 8, head: "One", description: "Lorem ipsum lara ip merol" },
];

export default function AlbumCourses(props) {
  const classes = useStyles();
  const { categoryId, categoryDescription, categoryTitle } =
    props.location.state.data;

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography
        component="h1"
        variant="h2"
        align="left"
        color="textPrimary"
        gutterBottom
        className={classes.title}
      >
        {categoryTitle}
      </Typography>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {courses.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Link
                  to={{
                    pathname: `/category/${categoryTitle}/courses/${card.id}/contents`,
                    state: {
                      from: props.location,
                      data: {
                        categoryId: card.id,
                        categoryTitle: card.head,
                        categoryDescription: card.description,
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
