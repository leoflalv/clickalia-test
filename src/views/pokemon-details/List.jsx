import { Box, Button, Card, Grid, Typography } from '@mui/material';

const Item = ({ item, removeFunction }) => (
  <Box m={1}>
    <Card>
      <Box pt={3} pb={3} pl={2} width={400}>
        <Grid container direction="row">
          <Grid item xs={7}>
            <Typography>{item}</Typography>
          </Grid>
          {removeFunction && (
            <Grid item xs={1}>
              <Button variant="contained" color="error" onClick={() => removeFunction(item)}>
                Remove
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Card>
  </Box>
);

const List = ({ items = [], removeFunction }) => {
  return (
    <Box
      ml={2}
      mt={4}
      sx={{
        maxHeight: 500,
        overflowY: 'auto'
      }}
    >
      {items.map((item) => (
        <Item key={item} item={item} removeFunction={removeFunction} />
      ))}
    </Box>
  );
};

export default List;
