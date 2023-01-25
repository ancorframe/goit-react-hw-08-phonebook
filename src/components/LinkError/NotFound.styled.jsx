import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


export const HomeLink = styled(NavLink)`
padding: 5px;
  margin: 15px;
  /* font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; */
  font-weight: 700;
  font-size: 20px;
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