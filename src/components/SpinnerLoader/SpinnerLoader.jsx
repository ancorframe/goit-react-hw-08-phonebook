import ClipLoader from 'react-spinners/ClipLoader';

export const SpinnerLoader = () => {
  return (
    <ClipLoader
      color={'#1976d2'}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
