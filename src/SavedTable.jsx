import React, { useState, useContext } from "react";
import "./StockTable.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { StockContext } from "./StockContext";
import { StockPresentContext } from "./StockPresentContext";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const SavedTable = ({ tableHeading }) => {
  // eslint-disable-next-line
  const [savedData, setSavedData] = useContext(StockContext);
  const classes = useStyles();
  // eslint-disable-next-line
  const [mainTable, setMainTable] = useState(tableHeading);
  // eslint-disable-next-line
  const [saved, setSaved] = useContext(StockPresentContext);

  return (
    <div className="table">
      <h3 className="table-search-heading">Saved Stock Details</h3>
      <div className="stock-table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">{mainTable[0]}</StyledTableCell>

                {mainTable?.length > 0 &&
                  mainTable
                    .slice(1)
                    .map((heading) => (
                      <StyledTableCell align="right">{heading}</StyledTableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {savedData.map((row) => (
                <StyledTableRow>
                  <StyledTableCell align="left" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="stock-symbol">
                      <FiberManualRecordIcon />
                      {row.symbol}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to="/view">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          savedData.splice(
                            savedData.findIndex((a) => a.symbol === row.symbol),
                            1
                          );
                          saved.splice(
                            saved.findIndex((a) => a.symbol === row.symbol),
                            1
                          );
                        }}
                      >
                        DELETE
                      </Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.region}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="backtohome">
          <Link to="/home">
            <Button variant="contained" color="primary">
              BACK
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SavedTable;
