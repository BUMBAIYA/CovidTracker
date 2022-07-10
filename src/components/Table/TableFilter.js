import PropTypes from "prop-types";

applySortFilter.propTypes = {
    array: PropTypes.array,
    comparator: PropTypes.func,
    query: PropTypes.string
}

function filter(array, predicate) {
    let index = -1
    let resIndex = 0
    const length = array == null ? 0 : array.length
    const result = []
    
    while (++index < length){
        const value = array[index]
        if (predicate(value, index, array)) {
            result[resIndex++] = value
        }
    }
    return result
}

export function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_country) => _country.country.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

getComparator.propTypes = {
    order: PropTypes.oneOf(["desc", "asc"]),
    orderBy: PropTypes.oneOf(["desc", "asc"]),
}

export function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}
