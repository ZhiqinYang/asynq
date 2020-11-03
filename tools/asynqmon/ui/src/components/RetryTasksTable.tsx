import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Typography from "@material-ui/core/Typography";
import SyntaxHighlighter from "react-syntax-highlighter";
import syntaxHighlightStyle from "react-syntax-highlighter/dist/esm/styles/hljs/github";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  id: string,
  type: string,
  payload: Object,
  retryIn: string,
  lastFailedAt: string,
  lastError: string,
  retried: number,
  maxRetry: number
) {
  return {
    id,
    type,
    payload,
    retryIn,
    lastFailedAt,
    lastError,
    retried,
    maxRetry,
  };
}

const rows = [
  createData(
    "jklfdjasf12323kjkldsaf",
    "send_email",
    { userId: 13 },
    "10s",
    "3m ago",
    "server error",
    4,
    12
  ),
  createData(
    "fdfdfadsfdaskl123232jk",
    "send_email",
    { userId: 12 },
    "10s",
    "3m ago",
    "server error",
    4,
    12
  ),
  createData(
    "fdafkd12343l333333332l",
    "send_email",
    { userId: 23 },
    "10s",
    "3m ago",
    "server error",
    4,
    12
  ),
  createData(
    "lklfdjasf12323kjkldsaf",
    "send_email",
    { userId: 32 },
    "10s",
    "3m ago",
    "server error",
    4,
    12
  ),
  createData(
    "7klfdjasf12323kjkldsaf",
    "send_email",
    { userId: 53 },
    "10s",
    "3m ago",
    "server error",
    4,
    12
  ),
];

function RetryTasksTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader={true}
        className={classes.table}
        aria-label="retry tasks table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Retry In</TableCell>
            <TableCell align="right">Last Failed</TableCell>
            <TableCell align="right">Last Error</TableCell>
            <TableCell align="right">Retried</TableCell>
            <TableCell align="right">Max Retry</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow key={row.id} className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.retryIn}</TableCell>
        <TableCell align="right">{row.lastFailedAt}</TableCell>
        <TableCell align="right">{row.lastError}</TableCell>
        <TableCell align="right">{row.retried}</TableCell>
        <TableCell align="right">{row.maxRetry}</TableCell>
        <TableCell align="right">
          <Button>Cancel</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Payload
              </Typography>
              <SyntaxHighlighter language="json" style={syntaxHighlightStyle}>
                {JSON.stringify(row.payload, null, 2)}
              </SyntaxHighlighter>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default RetryTasksTable;
