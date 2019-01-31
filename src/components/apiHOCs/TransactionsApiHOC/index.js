import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { requestAsync, querySelectors } from '@digitalwing.co/redux-query-immutable';
import { transactions } from 'api';
import { getTransactions } from './selectors';

const TransactionsApiHOC = () => WrappedComponent => compose(
  connect(
    state => ({
      transactions: getTransactions(state, 'transactions'),
      getTransactionsIsFetching: querySelectors.isPending(
        state.get('queries'),
        { queryKey: 'getTransactions' },
      ) || false,
    }),
    dispatch => ({
      ...bindActionCreators({
        getTransactions: (chain, address) => requestAsync(
          transactions.queries.getTransactions(({ chain, address })),
        ),
        getTransactionsEtx: address => requestAsync(
          transactions.queries.getTransactionsEtx(({ address })),
        ),
        postBroadcast: (chain, rawTx) => requestAsync(
          transactions.queries.postBroadcast(({ chain, rawTx })),
        ),
        getCommission: chain => requestAsync(
          transactions.queries.getCommission(({ chain })),
        ),
      }, dispatch),
    }),
  ),
)(WrappedComponent);

export default TransactionsApiHOC;
