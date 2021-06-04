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
import SimpleModal from "../../_components/Modal";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

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
  ignore: {
    textDecoration: "none",
  },
  bar: {
    display: "flex",
    justifyContent: "space-between",
  },
  bottomButton: {
    position: "fixed",
    right: 20,
    bottom: 20,
  },
  gutterBottom: {
    fontStyle: "bold",
  },
}));

// let categories = [
//   { id: 0, title: "Maths", description: "Lorem ipsum lara ip merol" },
//   { id: 1, title: "Physics", description: "Lorem ipsum lara ip merol" },
//   { id: 2, title: "Biology", description: "Lorem ipsum lara ip merol" },
//   { id: 3, title: "Chemistry", description: "Lorem ipsum lara ip merol" },
//   { id: 4, title: "Social Studies", description: "Lorem ipsum lara ip merol" },
//   { id: 5, title: "History", description: "Lorem ipsum lara ip merol" },
//   { id: 6, title: "English", description: "Lorem ipsum lara ip merol" },
//   { id: 7, title: "Amharic", description: "Lorem ipsum lara ip merol" },
//   { id: 8, title: "Sports", description: "Lorem ipsum lara ip merol" },
// ];

export default function AlbumCategory(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({});
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    dataService.getCategories().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const user = props.user || " ";
  const handleCloseToggle = (category, description, id = undefined) => {
    setOpen(!open);
    setValue({ category, description, id });
  };

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
        .editCategories(req.title, req.description, value.id)
        .then((data) => {
          setLoading(true);
          dataService.getCategories().then((data) => {
            setData(data);
            setLoading(false);
          });
          setOpen(!open);
        });
    } else {
      // post request
      dataService.addCategories(req.title, req.description).then((data) => {
        setLoading(true);
        dataService.getCategories().then((data) => {
          setData(data);
          setLoading(false);
        });
        setOpen(!open);
      });
    }
  }

  const modalBody = (category, description) => (
    <>
      <form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel>
            <Typography gutterBottom variant="h5" component="h2">
              Category Title
            </Typography>
          </FormLabel>
          <OutlinedInput
            name="title"
            fullWidth
            type="title"
            value={category}
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
              Category
            </Typography>

            {user.role && user.role.includes("Teacher") && (
              <Button
                onClick={() => {
                  handleCloseToggle("", "");
                }}
                color="primary"
              >
                Add Category
              </Button>
            )}
          </div>

          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Link
                  className={classes.ignore}
                  to={{
                    pathname: `/category/${card.title}`,
                    state: {
                      from: props.location,
                      data: {
                        categoryId: card.id,
                        categoryTitle: card.title,
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
                        {card.title}
                      </Typography>
                      <Typography>{card.description}</Typography>
                    </CardContent>
                    {user.role && user.role.includes("Teacher") && (
                      <CardActions>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCloseToggle(
                              card.head,
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
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {isLoading && <CircularProgress />}
      <SimpleModal
        open={open}
        handleClose={handleCloseToggle}
        body={modalBody}
      ></SimpleModal>
    </React.Fragment>
  );
}
