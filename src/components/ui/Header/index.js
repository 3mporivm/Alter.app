import React from 'react';
import PropTypes from 'prop-types';
import iconSettings from 'assets/img/settings.svg';
import iconDropdown from 'assets/img/dropdown.svg';
import { compose, withState, lifecycle, withHandlers, withStateHandlers } from "recompose";

import './style.scss';

const Header = ({
  isExtended,
  isDropDown,
  title,
  onCenterPress,
  onRightPress,
  isDropdownOpen,
  setDropdownOpen,
  setDropdownRef,
  modal,
}) => (
  <div className="header">
    <div className="header__left"/>
    <div
      ref={ref => setDropdownRef(ref)}
      id="header__center"
      className="header__center"
    >
      {
        !isExtended ?
          <div className="header__center__empty"/>
          :
          (
            <div
              onClick={() => isDropDown && setDropdownOpen(!isDropdownOpen)}
              style={isDropDown ? { cursor: 'pointer'} : {}}
              className="header__center__title-wrapper"
            >
              <span>{title}</span>
              {
                isDropDown &&
                <img
                  className="header__center__icon-dropdown"
                  src={iconDropdown}
                  alt=""
                />
              }
            </div>
          )
      }
      {
        isDropdownOpen &&
        modal
      }
    </div>
    <div className="header__right">
      {
        isExtended &&
        <img
          onClick={onRightPress}
          className="header__right__icon-settings"
          src={iconSettings}
          alt=""
        />
      }
    </div>
    {
      isDropdownOpen && <div className="header__hide-background"/>
    }
  </div>
);

Header.propTypes = {
  isExtended: PropTypes.bool,
  isDropDown: PropTypes.bool,
  title: PropTypes.string,
  onRightPress: PropTypes.func,
  modal: PropTypes.element,
  isDropdownOpen: PropTypes.bool.isRequired,
  setDropdownOpen: PropTypes.func.isRequired,
  setDropdownRef: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: "",
  isExtended: false,
  isDropDown: false,
  onRightPress: () => {},
  modal: null,
};


export default compose(
  withState('isDropdownOpen', 'setDropdownOpen', false),
  withStateHandlers(
    { dropdownRef: null },
    {
      setDropdownRef: ({ dropdownRef }) => ref => {
        if (dropdownRef === null) {
          return ({ dropdownRef: ref })
        }
      }
    }
  ),
  withHandlers({
    handleOuterDropdownClick: ({ setDropdownOpen, dropdownRef }) => (e) => {
      if (dropdownRef.contains(e.target)) {
        return;
      }
      setDropdownOpen(false);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { handleOuterDropdownClick } = this.props;
      document.addEventListener('mousedown', handleOuterDropdownClick, false);
    },
    componentWillUnmount() {
      const { handleOuterDropdownClick } = this.props;
      document.addEventListener('mousedown', handleOuterDropdownClick, false);
    },
  }),
)(Header);
