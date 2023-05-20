import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Filter, FilterInput, FilterLabel } from './Filter.styled';

const FilterName = ({ filterValue, handleFilterChange }) => {
  const filterId = nanoid();

  return (
    <Filter>
      <FilterLabel htmlFor={filterId}>Find contacts by name</FilterLabel>
      <FilterInput
        autoComplete="off"
        type="text"
        id={filterId}
        name="filter"
        value={filterValue}
        onChange={handleFilterChange}
      ></FilterInput>
    </Filter>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string,
  handleFilterChange: PropTypes.func,
};

export default FilterName;
