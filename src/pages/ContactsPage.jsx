import { Box } from 'components/Box';
import { ContactForm } from 'components/Contacts/AddContactForm';
import { ContactList } from 'components/Contacts/ContactList';
import { Filter } from 'components/Contacts/Filter';
import { notifyError } from 'helpers/notify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getContacts } from 'redux/contactsApi';

export const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const contoller = new AbortController();
    (async () => {
      try {
        await dispatch(getContacts(contoller.signal)).unwrap()
      } catch (error) {
        notifyError(`${error}`);
      }
    })();
    return () => contoller.abort();
  }, [dispatch]);

  return (
    <Box
      as="main"
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gridGap={6}
    >
      <ContactForm />
      <Box gridArea="1 / 2 / 2 / 3">
        <Filter />
        <ContactList />
      </Box>
    </Box>
  );
};
