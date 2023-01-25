import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


export const Link = styled(NavLink)`
  margin: 0;
  /* font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; */
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: #1976d2;
  /* -webkit-text-decoration: underline; */
  text-decoration: underline;
  text-decoration-color: rgba(25, 118, 210, 0.4);
  :hover,
  :focus {
    text-decoration-color: inherit;
  }
`;