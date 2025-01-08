interface WalletBalance {
  currency: string;
  amount: number;
}
  
interface Props extends BoxProps {}

const WalletPage = (props: Props) => {
  const { children, ...rest } = props;

  const {balances, getPriority} = useWalletBalances(); // move the 'getPriority' function into the 'useWalletBalances' hook
  const pricesMap = usePrices();

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.currency);

      return balancePriority > -99 && balance.amount > 0
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.currency);
      const rightPriority = getPriority(rhs.currency);

      return rightPriority - leftPriority
    });
  }, [balances, pricesMap]);

  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = pricesMap[balance.currency] * balance.amount;
    const formattedBalanceAmount = balance.amount.toFixed()

    return (
      <WalletRow 
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedBalanceAmount}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
