import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { toast } from 'react-toastify';
import { Box } from 'components/Box';
import { useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
// import { useDeleteContactMutation } from 'redux/contactsApi';
import { EditingForm } from './EditingForm';

export const ContactItem = ({ contact }) => {
  // const notify = e =>
  //   toast.success(e, {
  //     theme: 'dark',
  //   });

  // const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      window.addEventListener('keydown', onEsc);
    }
    return () => {
      if (showModal) {
        window.removeEventListener('keydown', onEsc);
      }
    };
  });

  const handleDelete = e => {
    // deleteContact(e.currentTarget.id)
    //   .unwrap()
    //   .then(({ name }) => notify(`${name} was deleted`))
    //   .catch(({ error }) => notify(`${error}`));
    
  };

  const onEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const onOpen = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Box width="396px" display="flex" justifyContent="space-between">
        <Box
          width="300px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <span>{contact.name}</span>
          <span>{contact.phone}</span>
        </Box>
        <Fab color="secondary" aria-label="edit" size="small" onClick={onOpen}>
          <EditIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label="delete"
          type="button"
          id={contact.id}
          onClick={handleDelete}
          // disabled={isLoading}
          size="small"
        >
          <DeleteIcon />
        </Fab>
      </Box>
      {showModal && (
        <Modal onBackdropClose={onBackdropClose}>
          <EditingForm value={contact} close={() => onClose()} />
        </Modal>
      )}
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
