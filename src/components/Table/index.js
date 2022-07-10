import * as React from 'react';
// import Image from 'next/image';
import Avatar from "@mui/material/Avatar";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
//Table Components
import TableListToolbar from "./TableListToolbar";
import TableListHead from './TableListHead';
import SearchNotFound from './SearchNotFound.js';
//Table autocompelte utility
import { applySortFilter, getComparator } from './TableFilter';

const columns = [
    {
        id: 'Country',
        label: 'Country',
        width: 280,
        minWidth: 250
    },
    {
        id: 'code',
        label: 'ISO2\u00a0Code',
    },
    {
        id: 'cases',
        label: 'Total\u00a0Cases',
    },
    {
        id: 'recovered',
        label: 'Recovered',
    },
    {
        id: 'deaths',
        label: 'Deaths',
    },
];


export default function StickyHeadTable() {
    const [isLoading, setIsLoading] = React.useState(false);
    const theme = useTheme();
    const [filterName, setFilterName] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState([]);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");

    React.useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then(data => {
                    setData(data);
                })
        };
        getCountriesData();
        setIsLoading(true);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const filteredCountries = applySortFilter(data, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredCountries.length === 0;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', background: theme.palette.grey[100] }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TableListToolbar filterName={filterName} onFilterName={handleFilterByName} />
                <TableContainer sx={{ flexGrow: 1 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableListHead
                            headLabel={columns}
                            onRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                        />
                        <TableBody>
                            {filteredCountries
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={row.country}
                                            role="checkbox"
                                        >
                                            <TableCell>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Box
                                                        sx={{
                                                            width: "37px",
                                                            height: "25px",
                                                            position: "relative",
                                                            borderRadius: "3px",
                                                            overflow: "hidden",
                                                            boxShadow: theme.customShadows.z24
                                                        }}
                                                        >
                                                        <Avatar
                                                            src={row.countryInfo.flag}
                                                            alt={row.country}
                                                            variant="square"
                                                            sx={{width: 37, height: 25}}
                                                        />
                                                    </Box>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {row.country}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                {row.countryInfo.iso2}
                                            </TableCell>
                                            <TableCell>
                                                {row.cases.toLocaleString("en-us")}
                                            </TableCell>
                                            <TableCell>
                                                {row.recovered.toLocaleString("en-us")}
                                            </TableCell>
                                            <TableCell>
                                                {row.deaths.toLocaleString("en-us")}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        {isUserNotFound && isLoading && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <SearchNotFound searchQuery={filterName} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                <Box
                    sx={{ marginTop: "auto" }}
                >
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        showFirstButton
                        showLastButton
                    />
                </Box>
            </Box>
        </Paper>
    );
}
