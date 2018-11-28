import React from 'react';
import PropTypes from 'prop-types';
import {compose, lifecycle, withHandlers, withState, withStateHandlers} from "recompose";
import Badge from '../Badge';
import iconTrash from 'assets/img/trash.svg';
import iconArrow from 'assets/img/arrow-bottom.svg';

import './style.scss';
const BalanceBlock = ({
  icon,
  backgroundColor,
  currency,
  balance,
  course,
  children,
  onPress,
  isHideExtended,
  setHideExtended,
  setRefChildren,
}) => (
  <div
    className={`balance-block ${children && children.$$typeof ? "extended" : ""}`}
    style={children && children.$$typeof ? { height: isHideExtended ? 197 : 479 } : {}}
  >
    <Badge
      icon={icon}
      backgroundColor={backgroundColor}
    />
    {
      onPress && <img className="balance-block__icon-trash" src={iconTrash} alt="" />
    }
    <div className="balance-block__title">
      {`${currency} BALANCE`}
    </div>
    <div className="balance-block__total">
      {balance}
    </div>
    <div className="balance-block__course">
      {course}
    </div>
    {
      children && children.$$typeof &&
      <div
        ref={setRefChildren}
        className="extended__children-wrapper"
        style={{ paddingTop: isHideExtended ? 20 : 0 }}
      >
        {children}
      </div>
    }
    {
      children && children.$$typeof &&
      <img
        onClick={setHideExtended}
        style={{ transform: `rotate(${!isHideExtended ? 180 : 0}deg)`}}
        className="extended__icon-arrow"
        src={iconArrow}
      />
    }
  </div>
);

BalanceBlock.propTypes = {
  icon: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  currency: PropTypes.string,
  balance: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  children: PropTypes.any,
  onPress: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  isHideExtended: PropTypes.bool.isRequired,
  setHideExtended: PropTypes.func.isRequired,
  setRefChildren: PropTypes.func.isRequired,
};

BalanceBlock.defaultProps = {
  currency: '',
  children: null,
  onPress: false,
};

export default compose(
  withState('isHideExtended', 'setHideExtended', true),
  withStateHandlers(
    { refChildren: null },
    {
      setRefChildren: ({ refChildren }) => ref => {
        if (refChildren === null) {
          return ({ refChildren: ref })
        }
      }
    }
  ),
  withStateHandlers(
    { isHideExtended: true },
    {
      setHideExtended: ({ isHideExtended }) => () => {
        return ({ isHideExtended: !isHideExtended })
      }
    }
  ),
  withHandlers({
    onBack: ({ router }) => () => {
      router.history.push('/coin');
    },
    // handleTransitionEnd: ({ setRefChildren, refChildren }) => (e) => {
    //   if (e.propertyName === "height") {
    //     refChildren.style.display = "none";
    //   }
    // },
  }),
  // lifecycle({
  //   componentDidMount() {
  //     const { handleTransitionEnd } = this.props;
  //     document.addEventListener('transitionend', handleTransitionEnd, false);
  //   },
  //   componentWillUnmount() {
  //     const { handleTransitionEnd } = this.props;
  //     document.addEventListener('transitionend', handleTransitionEnd, false);
  //   },
  // }),
)(BalanceBlock);
