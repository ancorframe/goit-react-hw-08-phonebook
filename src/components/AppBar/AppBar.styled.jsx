import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const ButtonLink = styled(NavLink)`
  height: 30px;
  padding: 3px 9px;
  text-decoration: none;
  border: 1px solid rgba(25, 118, 210, 0.5);
  border-radius: 4px;
  color: #1976d2;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  :hover,
  :focus {
    background-color: rgba(25, 118, 210, 0.04);
    border: 1px solid #1976d2;
  }
  &.active {
    color: #fff;
    background-color: #1976d2;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    :hover,
    :focus {
      text-decoration: none;
      background-color: #1565c0;
      box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
        0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
  }
`;
