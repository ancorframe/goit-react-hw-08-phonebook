import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from 'components/Box';
import { useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { EditingForm } from './EditingForm';
import { useDispatch } from 'react-redux';
import { deleteContactById, updateFavoriteById } from 'redux/contactsApi';
import { notifyError, notifySuccess } from 'helpers/notify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const ContactItem = ({ contact }) => {
  const [deleteBtn, setDeleteBtn] = useState({
    isLoading: false,
    color: 'primary',
  });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

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

  const handleDelete = async e => {
    setDeleteBtn({ isLoading: true });
    dispatch(deleteContactById(e.currentTarget.id))
      .unwrap()
      .then(() => notifySuccess(`Contact delete`))
      .catch(error => {
        setDeleteBtn({ isLoading: false });
        setDeleteBtn({ color: 'error' });
        notifyError(`${error}`);
      });
  };

  const setFavorite = async e => {
    const body = { favorite: !contact.favorite };
    const id = e.currentTarget.id;
    dispatch(updateFavoriteById({ id, body }))
      .unwrap()
      .then(c =>
        c.update.favorite
          ? notifySuccess(`Contact add to favorite`)
          : notifySuccess(`Contact remove from favorite`)
      )
      .catch(error => notifyError(`${error}`));
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
      <Box
        width="396px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="15px"
        bg="#f7f7ff"
      >
        <Box width="250px">
          <p>Name: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </Box>
        <Fab
          id={contact._id}
          type="button"
          aria-label="favorite"
          size="small"
          onClick={setFavorite}
        >
          {contact.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Fab>
        <Fab
          type="button"
          color="secondary"
          aria-label="edit"
          size="small"
          onClick={onOpen}
        >
          <EditIcon />
        </Fab>
        <Fab
          color={deleteBtn.color}
          aria-label="delete"
          type="button"
          id={contact._id}
          onClick={handleDelete}
          disabled={deleteBtn.isLoading}
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
