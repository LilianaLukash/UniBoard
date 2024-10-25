import styles from './SearchBox.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter, setFilter } from '../../redux/filtersSlice';

export default function SearchBox() {

    const filter = useSelector(selectNameFilter);

    const dispatch = useDispatch();
    const handleFilterChange = (value) => {
    dispatch(setFilter(value));
  };

    return (
        <div className={styles.filter}>
            <label htmlFor="filter">Find contacts by name</label>
            <input
            className={styles.input}
                        type="text"
            
            
            value={filter}
            onChange={e => handleFilterChange(e.target.value)}
    />
        </div>
    )
}