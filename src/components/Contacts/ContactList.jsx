import Typography from '@mui/material/Typography';
import { ContactItem } from './ContactItem';
import {
  getAllContacts,
  getFilteredContacts,
  getIsLoading,
  getPage,
  getTotalPage,
} from 'redux/selectors';
import { Box } from 'components/Box';
import { SpinnerLoader } from 'components/SpinnerLoader/SpinnerLoader';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { updatePage } from 'redux/contactsSlice';
import { getContacts } from 'redux/contactsApi';
import { notifyError } from 'helpers/notify';

export const ContactList = () => {
  const page = useSelector(getPage);
  const totalPage = useSelector(getTotalPage)
  const dispatch = useDispatch()

  const allContacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContacts);
  const isLoading = useSelector(getIsLoading);
  const handleChange = async(e,value) => {

    try {
      await dispatch(updatePage(value));
      await dispatch(getContacts());
    } catch (error) {
       notifyError(`${error}`);
    }
  };
  if (allContacts.length === 0 && isLoading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <SpinnerLoader />
      </Box>
    );
  }

  if (allContacts.length === 0) {
    return (
      <Typography component="h1" variant="h5" textAlign="center">
        No contacts (
      </Typography>
    );
  }

  if (filteredContacts.length === 0) {
    return (
      <Typography component="h1" variant="h5" textAlign="center">
        No contacts with this name(
      </Typography>
    );
  }
  return (
    <Box
      as="ul"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gridGap={3}
      pb='25px'
    >
      {filteredContacts.map(item => {
        return (
          <li key={item._id}>
            <ContactItem contact={item} />
          </li>
        );
      })}
      <Pagination
        count={totalPage}
        page={page}
        onChange={handleChange}
        disabled={totalPage===1}
      />
    </Box>
  );
};
