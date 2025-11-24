import s from './CartPage.module.css';
import classNames from 'classnames';
import { useActionState, useRef } from 'react';
import { cartActions } from 'entities/Cart/model/cart';
import { useAppDispatch } from 'shared/store';
import { toast } from 'react-toastify';

type CartAmountProps = {
	products: CartProduct[];
};

type FormState = {
	products: CartProduct[];
};
export const CartAmount = (products: CartAmountProps) => {
	// noinspection JSUnusedLocalSymbols
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const dispatch = useAppDispatch();
	const tryCounterRef = useRef(0);
	const stateReducer = async (state: FormState) => {
		const result = await new Promise((resolve) => {
			setTimeout(() => {
				tryCounterRef.current += 1;
				resolve(tryCounterRef.current == 2);
			}, 1000);
		});
		if (result) {
			state.products.forEach((p) =>
				dispatch(cartActions.deleteCartProduct(p.id))
			);
			return { products: [] };
		} else {
			toast.warning('Ошибка при оформлении заказа. Попробуйте еще раз.');
			return products;
		}
	};
	const [state, formAction, isPending] = useActionState<FormState>(
		stateReducer,
		{
			products: products.products,
		}
	);
	const allPrice = state.products.reduce(
		(acc, p) => p.price * p.count + acc,
		0
	);
	const allDiscount = state.products.reduce(
		(acc, p) => p.discount * p.count + acc,
		0
	);

	return (
		<form className={classNames(s['cart-amount'])} action={formAction}>
			<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
			<div className={classNames(s['cart-amount__table'])}>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						{`Товары (${state.products.length})`}
					</span>
					<span className={classNames(s['cart-amount__table-value'])}>
						{`${allPrice} ₽`}
					</span>
				</div>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						Скидка
					</span>
					<span
						className={classNames(
							s['cart-amount__table-value'],
							s['cart-amount__table-value-discount']
						)}>
						{`${allDiscount} ₽`}
					</span>
				</div>
			</div>
			<div className={classNames(s['cart-amount__total-cost'])}>
				<h2 className={classNames(s['cart-amount__total-cost-title'])}>
					Общая стоимость
				</h2>
				<span className={classNames(s['cart-amount__total-cost-value'])}>
					{`${allPrice - allDiscount} ₽`}
				</span>
			</div>
			<button
				type='submit'
				className={classNames(
					s['button'],
					s['button_type_primary'],
					s['button_type_wide']
				)}>
				{!isPending && 'Оформить заказ'}
				{isPending && 'Заказ оформляется...'}
			</button>
		</form>
	);
};
