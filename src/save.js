/**
 * Plugin Name:       Phoca Restaurant Menu - Groups and Items Block
 * Author:            Jan Pavelka ( <a href="https://www.phoca.cz">Phoca</a> )
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */
import { useBlockProps } from '@wordpress/block-editor';

function numberFormat( number, decimals, dec_point, thousands_sep ) {
	// Strip all characters but numerical ones.
	number = ( number + '' ).replace( /[^0-9+\-Ee.]/g, '' );
	var n = ! isFinite( +number ) ? 0 : +number,
		prec = ! isFinite( +decimals ) ? 0 : Math.abs( decimals ),
		sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
		dec = typeof dec_point === 'undefined' ? '.' : dec_point,
		s = '',
		toFixedFix = function ( n, prec ) {
			var k = Math.pow( 10, prec );
			return '' + Math.round( n * k ) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = ( prec ? toFixedFix( n, prec ) : '' + Math.round( n ) ).split( '.' );
	if ( s[ 0 ].length > 3 ) {
		s[ 0 ] = s[ 0 ].replace( /\B(?=(?:\d{3})+(?!\d))/g, sep );
	}
	if ( ( s[ 1 ] || '' ).length < prec ) {
		s[ 1 ] = s[ 1 ] || '';
		s[ 1 ] += new Array( prec - s[ 1 ].length + 1 ).join( '0' );
	}
	return s.join( dec );
}

export default function save( props ) {
	const { attributes } = props;
	const { group, groupDescription, items } = attributes;

	const menuType = attributes.inheritedMenuType;
	const hideImages = attributes.inheritedHideImages;
	const priceFormat = attributes.inheritedPriceFormat;
	const priceCurrencySymbol = attributes.inheritedPriceCurrencySymbol;
	const priceDecimalSymbol = attributes.inheritedPriceDecimalSymbol;
	const priceDecimals = attributes.inheritedPriceDecimals;
	const priceThousandsSeparator = attributes.inheritedPriceThousandsSeparator;
	const priceSuffix = attributes.inheritedPriceSuffix;
	const pricePrefix = attributes.inheritedPricePrefix;

	// Change output but don't change the variables iself
	// const itemsOutput = items;
	const itemsOutput = structuredClone( items );
	items.forEach( function ( item, index ) {
		itemsOutput[ index ].price = numberFormat(
			item.price,
			priceDecimals,
			priceDecimalSymbol,
			priceThousandsSeparator
		);

		if ( priceFormat == '2' ) {
			itemsOutput[ index ].price =
				itemsOutput[ index ].price + '' + priceCurrencySymbol;
		} else if ( priceFormat == '3' ) {
			itemsOutput[ index ].price =
				priceCurrencySymbol + '' + itemsOutput[ index ].price;
		} else if ( priceFormat == '4' ) {
			itemsOutput[ index ].price =
				priceCurrencySymbol + ' ' + itemsOutput[ index ].price;
		} else {
			itemsOutput[ index ].price =
				itemsOutput[ index ].price + ' ' + priceCurrencySymbol;
		}

		if ( pricePrefix != '' ) {
			itemsOutput[ index ].price =
				pricePrefix + itemsOutput[ index ].price;
		}

		if ( priceSuffix != '' ) {
			itemsOutput[ index ].price =
				itemsOutput[ index ].price + priceSuffix;
		}
	} );

	return (
		<>
			<div { ...useBlockProps.save() }>{ props.message }</div>
			<div className="phMenuGroupRowBox">
				<h3 className="phMenuGroup">{ group }</h3>
				{ groupDescription != '' ? (
					<div className="phMenuGroupDescription">
						{ groupDescription }
					</div>
				) : (
					<></>
				) }
				<div className="phMenuItemsBox">
					{ itemsOutput.map( ( item, index ) => (
						<>
							{ item.title != '' ? (
								<>
									<div
										key={ index }
										className="phMenuItemRowBox"
									>
										{ hideImages ? (
											<div className="phMenuItem phMenuItemImage phMenuItemNoImage"></div>
										) : (
											<div className="phMenuItem phMenuItemImage">
												<img src={ item.image } />
											</div>
										) }
										<div className="phMenuItem phMenuItemQuantity">
											{ item.quantity }
										</div>
										<div className="phMenuItem phMenuItemTitle">
											{ item.title }
										</div>
										<div className="phMenuItem phMenuItemPrice">
											{ item.price }
										</div>
									</div>

									{ item.description != '' ? (
										<div className="phMenuItemRowBox">
											{ hideImages ? (
												<div className="phMenuItem phMenuItemImage phMenuItemNoImage"></div>
											) : (
												<div className="phMenuItem phMenuItemImage"></div>
											) }
											<div className="phMenuItem phMenuItemQuantity"></div>
											<div className="phMenuItem phMenuItemDescription">
												{ item.description }
											</div>
											<div className="phMenuItem phMenuItemPrice"></div>
										</div>
									) : (
										<></>
									) }
								</>
							) : (
								<div
									key={ index }
									className="phMenuItemRowBox"
								></div>
							) }
						</>
					) ) }
				</div>
			</div>
		</>
	);
}
