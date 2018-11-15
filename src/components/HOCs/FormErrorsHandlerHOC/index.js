import _ from 'lodash';
import { withProps } from 'recompose';
import { SubmissionError } from 'redux-form/immutable';

// todo validate error
const FormErrorsHandlerHOC = () => WrappedComponent => withProps(
  ({ submitAction, onSuccess }) => ({
    onSubmit: async (values) => {
      if (values.get('confirmPassword') !== values.get('newPassword')) {
        throw new SubmissionError({
          _error: 'Password does not match the confirm password!',
        });
      } else if (values.get('newPassword') && !values.get('oldPassword')) {
        throw new SubmissionError({
          _error: 'You must enter the old password!',
        });
      } else if (values.get('newPassword') && values.get('oldPassword').length < 5) {
        throw new SubmissionError({
          _error: 'New password must have length greater than or equal to 6!',
        });
      }
      const { body } = await submitAction(values);
      if (body.statusText) {
        throw new SubmissionError({
          _error: body.statusText,
        });
      }
      if (_.isFunction(onSuccess)) {
        onSuccess(body);
      }
    },
  }),
)(WrappedComponent);

export default FormErrorsHandlerHOC;
