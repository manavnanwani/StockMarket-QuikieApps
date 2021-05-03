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
import SearchIcon from "@material-ui/icons/Search";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";
import { StockContext } from "./StockContext";
import { StockPresentContext } from "./StockPresentContext";
import { APIKEY } from "./Api_Key";

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

const StockTable = ({ tableHeading, isSearch }) => {
  // eslint-disable-next-line
  const [savedData, setSavedData] = useContext(StockContext);
  const [saved, setSaved] = useContext(StockPresentContext);
  const classes = useStyles();
  const [searchStock, setSearchStock] = useState("");
  // eslint-disable-next-line
  const [searchData, setSearchData] = useState([]);
  // eslint-disable-next-line
  const [mainTable, setMainTable] = useState(tableHeading);

  const Search = () => {
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchStock}&apikey=${APIKEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchData(data.bestMatches);
        // if (data.bestMatches.length === 0) {
        //   alert("No stock found!!");
        // }
      });
  };
  return (
    <div className="table">
      {isSearch ? (
        <div className="table-search">
          <h3 className="table-search-heading">Stock Details</h3>
          <div>
            <input
              onChange={(e) => {
                setSearchStock(e.target.value);
              }}
              type="text"
              placeholder="Search stock here...."
            />
            <span className="search-button" onClick={Search}>
              <SearchIcon />
            </span>
          </div>
        </div>
      ) : (
        <h3 className="table-search-heading">Saved Stock Details Table</h3>
      )}
      <div className="stock-table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">{mainTable[0]}</StyledTableCell>
                {mainTable?.length > 0 &&
                  mainTable.slice(1).map((heading) => (
                    <StyledTableCell align="right" key={heading}>
                      {heading}
                    </StyledTableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchData?.length > 0 &&
                searchData.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell align="left" scope="row">
                      {row["2. name"]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <div className="stock-symbol">
                        <FiberManualRecordIcon />
                        {row["1. symbol"]}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row["4. region"]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {saved.includes(row["1. symbol"]) ? (
                        <Link to="/view">
                          <Button variant="contained" color="secondary">
                            VIEW
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            row["9. matchScore"] = 0;
                            setSavedData((prev) => [
                              ...prev,
                              {
                                symbol: row["1. symbol"],
                                name: row["2. name"],
                                region: row["4. region"],
                              },
                            ]);
                            setSaved((prev) => [...prev, row["1. symbol"]]);
                          }}
                        >
                          Save Data
                        </Button>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row["3. type"]}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default StockTable;
