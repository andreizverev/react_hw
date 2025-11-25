import { CardList } from 'widgets/CardList';
import { useProducts } from 'features/Product';
import { ButtonBack } from 'shared/ui/ButtonBack';
import { WithQuery } from 'shared/lib/HOCs/WithQuery';
import { WithProtection } from 'features/Protection/model/WithProtection';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = WithProtection(() => {
	const { isLoading, isError, products, error } = useProducts();

	return (
		<>
			<br />
			<ButtonBack />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	);
});
