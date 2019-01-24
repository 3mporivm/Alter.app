import React from 'react';
import PropTypes from 'prop-types';
import iconSettings from 'assets/img/settings.svg';
import iconDropdown from 'assets/img/dropdown.svg';
import iconBack from 'assets/img/back.svg';
import {
 compose, withState, lifecycle, withHandlers, withStateHandlers,
} from 'recompose';

import logo from '../../../assets/img/logo.svg';

import './style.scss';

const Header = ({
  styleContent,
  isExtended,
  isDropDown,
  title,
  onBackPress,
  onCenterPress,
  rightIcon,
  onRightPress,
  isDropdownOpen,
  setDropdownOpen,
  setDropdownRef,
  modal,
}) => (
  <div className="header">
    <div className="header__left">
      {
        onBackPress
        && <img
          onClick={onBackPress}
          className="header__left__icon-back"
          src={iconBack}
          alt=""
        />
      }
    </div>
    <div
      style={styleContent}
      ref={ref => setDropdownRef(ref)}
      id="header__center"
      className="header__center"
    >
      {
        !isExtended
          ? (
            <div className="header__center__logo">
              <img src={logo} alt="logo" className="header__center__logo__img" />
              <span className="header__center__logo__bold-text">
                alter
              </span>
              <span className="header__center__logo__text">
                app
              </span>
            </div>
          )
          : (
            <div
              onClick={() => isDropDown && setDropdownOpen(!isDropdownOpen)}
              style={isDropDown ? { cursor: 'pointer' } : {}}
              className="header__center__title-wrapper"
            >
              <span>{title}</span>
              {
                isDropDown
                && <img
                  className="header__center__icon-dropdown"
                  src={iconDropdown}
                  alt=""
                />
              }
            </div>
          )
      }
      {
        isDropdownOpen
        && modal
      }
    </div>
    <div style={styleContent} className="header__right">
      {
        onRightPress
        && <img
          onClick={onRightPress}
          className="header__right__icon-settings"
          src={rightIcon}
          alt=""
        />
      }
    </div>
    {
      isDropdownOpen && <div className="header__hide-background" />
    }
  </div>
);

Header.propTypes = {
  isExtended: PropTypes.bool,
  isDropDown: PropTypes.bool,
  title: PropTypes.string,
  onBackPress: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  rightIcon: PropTypes.any,
  onRightPress: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  modal: PropTypes.element,
  isDropdownOpen: PropTypes.bool.isRequired,
  setDropdownOpen: PropTypes.func.isRequired,
  setDropdownRef: PropTypes.func.isRequired,
  styleContent: PropTypes.any,
};

Header.defaultProps = {
  title: '',
  isExtended: false,
  isDropDown: false,
  onBackPress: false,
  rightIcon: iconSettings,
  onRightPress: false,
  modal: null,
  styleContent: null,
};


export default compose(
  withState('isDropdownOpen', 'setDropdownOpen', false),
  withStateHandlers(
    { dropdownRef: null },
    {
      setDropdownRef: ({ dropdownRef }) => (ref) => {
        if (dropdownRef === null) {
          return ({ dropdownRef: ref });
        }
      },
    },
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
