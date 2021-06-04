import { Box, Container, Grid } from "@material-ui/core";
import AccountProfileDetails from "./AcountStuff/AccountProfileDetails";

const AccountPage = () => (
  <>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default AccountPage;
