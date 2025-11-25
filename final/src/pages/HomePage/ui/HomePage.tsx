import { LoadMore } from 'widgets/LoadMore';
import { CardList } from 'widgets/CardList/index';
import { WithQuery } from 'shared/lib/HOCs/WithQuery';
import { useProducts } from 'features/Product';
import { WithProtection } from 'features/Protection/model/WithProtection';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
