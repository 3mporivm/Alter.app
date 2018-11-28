import { withProps } from 'recompose';
import { SubmissionError } from 'redux-form/immutable';

const FormErrorsHandlerHOC = () => WrappedComponent => withProps(
  ({ onSubmit }) => ({
    onSubmit: (values) => {
      if (values.get('confirmPassword') !== values.get('password')) {
        throw new SubmissionError({
          _error: 'Password does not match the confirm password!',
        });
      } else if (values.get('password') && values.get('password').length < 5) {
        throw new SubmissionError({
          _error: 'Password must have length greater than or equal to 6!',
        });
      }
      onSubmit(values)
    },
  }),
)(WrappedComponent);

export default FormErrorsHandlerHOC;
