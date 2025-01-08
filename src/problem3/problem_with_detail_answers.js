interface WalletBalance {
  currency: string;
  amount: number;
}

// we don't use 'formattedWalletBalance' so can remove the  'FormattedWalletBalance' interface
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}

// anti-pattern: no need "Props" in "(props: Props)" because we already declare it in "React.FC<Props>"
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  // we assume the 2 hooks always return valid arrays. 
  // If not, we need to validate the "balances" and "prices"
  const balances = useWalletBalances();
  const prices = usePrices();

  // getPriority() receive wallet currency as input:
  // --> the type should be 'string' instead of 'any' because
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }


  // useMemo() might not working because 'balances' and 'prices' are reference types and get from custom hooks
  // to make it work, If balances and prices come from custom hooks, ensure that those hooks return memoized values using useMemo or useCallback internally

  // balances is get from  'useWalletBalances' hook
  // so it's reasonable to put the 'getPriority' function inside the 'useWalletBalances' hook as well
  // because the 'getPriority' function only working with wallet balance value, not relate to the component state
  // by doing this, we don't need to redeclare 'getPriority' function in another component that need 'sortedBalances'.
  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);  // correct: balance.currency
          if (lhsPriority > -99) {
            // Logic issue: "amount" value can't be negative
              if (balance.amount <= 0) {
                return true;
              }
          }
          return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain); // correct: lhs.currency
          const rightPriority = getPriority(rhs.blockchain);  // correct: rhs.currency

          // can refactor to make it cleaner
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
    });
  }, [balances, prices]);

  // We don't need to create 'formattedBalances' variable, 'sortedBalances' is good enough
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    // seems like "prices" is an Object so shouldn't name it "prices", use "pricesMap"
    const usdValue = prices[balance.currency] * balance.amount;

    // add this line of code:
    // const formattedBalanceAmount = balance.amount.toFixed()

    // add custom style
    // const rowClass = ...

    return (
      <WalletRow 
        // 'classes' is not defined --> need to remove
        // if we want to customize the row style based on balance, just create a 'rowClass' and assign to 'className'
        className={classes.row} 
        // Anti-pattern: Using "index" as key
          // This might lead to performance Issues due to unnecessary re-renders
          // solution: should use balance currency or combination of balance currency and index as key
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted} // should be this: formattedAmount={balance.formattedBalanceAmount}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}