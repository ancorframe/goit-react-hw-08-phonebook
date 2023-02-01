import Typography from '@mui/material/Typography';
import { ContactItem } from './ContactItem';
import {
  getAllContacts,
  getFilteredContacts,
  getIsLoading,
} from 'redux/selectors';
import { Box } from 'components/Box';
import { SpinnerLoader } from 'components/SpinnerLoader/SpinnerLoader';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const allContacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContacts);
  const isLoading = useSelector(getIsLoading);

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
    >
      {filteredContacts.map(item => {
        return (
          <li key={item._id}>
            <ContactItem contact={item} />
          </li>
        );
      })}
    </Box>
  );
};
