/**
 * Plugin Name:       Phoca Restaurant Menu - Groups and Items Block
 * Author:            Jan Pavelka ( <a href="https://www.phoca.cz">Phoca</a> )
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';
import { TextControl, TextareaControl, Button } from '@wordpress/components';
import { Icon, closeSmall, image } from '@wordpress/icons';
import { select } from '@wordpress/data';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	// Generate a unique key based on the block's client ID
	const instanceId = props.clientId;

	// itemDescription is inside items
	const { group, groupDescription, items } = attributes;

	// Options
	const {
		inheritedMenuType,
		inheritedHideImages,
		inheritedPriceFormat,
		inheritedPriceCurrencySymbol,
		inheritedPriceDecimalSymbol,
		inheritedPriceDecimals,
		inheritedPriceThousandsSeparator,
		inheritedPriceSuffix,
		inheritedPricePrefix,
		inheritedAdminDisplayGroupDescription,
		inheritedAdminDisplayItemDescription,
	} = attributes;

	// Get attributes from parent block
	const parent = select( 'core/block-editor' ).getBlockParents(
		props.clientId
	);
	const parentAttributes = select( 'core/block-editor' ).getBlockAttributes(
		parent[ 0 ]
	);

	if ( ! inheritedMenuType ) {
		setAttributes( { inheritedMenuType: parentAttributes.menuType } );
	}

	if ( ! inheritedHideImages ) {
		setAttributes( { inheritedHideImages: parentAttributes.hideImages } );
	}
	if ( ! inheritedPriceFormat ) {
		setAttributes( { inheritedPriceFormat: parentAttributes.priceFormat } );
	}
	if ( ! inheritedPriceCurrencySymbol ) {
		setAttributes( {
			inheritedPriceCurrencySymbol: parentAttributes.priceCurrencySymbol,
		} );
	}
	if ( ! inheritedPriceDecimalSymbol ) {
		setAttributes( {
			inheritedPriceDecimalSymbol: parentAttributes.priceDecimalSymbol,
		} );
	}
	if ( ! inheritedPriceDecimals ) {
		setAttributes( {
			inheritedPriceDecimals: parentAttributes.priceDecimals,
		} );
	}
	if ( ! inheritedPriceThousandsSeparator ) {
		setAttributes( {
			inheritedPriceThousandsSeparator:
				parentAttributes.priceThousandsSeparator,
		} );
	}
	if ( ! inheritedPriceSuffix ) {
		setAttributes( { inheritedPriceSuffix: parentAttributes.priceSuffix } );
	}
	if ( ! inheritedPricePrefix ) {
		setAttributes( { inheritedPricePrefix: parentAttributes.pricePrefix } );
	}

	if ( ! inheritedAdminDisplayGroupDescription ) {
		setAttributes( {
			inheritedAdminDisplayGroupDescription:
				parentAttributes.adminDisplayGroupDescription,
		} );
	}

	if ( ! inheritedAdminDisplayItemDescription ) {
		setAttributes( {
			inheritedAdminDisplayItemDescription:
				parentAttributes.adminDisplayItemDescription,
		} );
	}

	const updateField = ( index, key, value ) => {
		const newItems = [ ...items ];

		newItems[ index ][ key ] = value;
		setAttributes( { items: newItems } );
	};

	const addItem = () => {
		const newItems = [
			...items,
			{ image: '', quantity: '', title: '', price: '', description: '' },
		];
		setAttributes( { items: newItems } );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( item, i ) => i !== index );
		setAttributes( { items: newItems } );
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( {
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		} );
	};

	// Display or hide Group description in administration
	let groupDescriptionClass = 'phMenuHide';
	if ( inheritedAdminDisplayGroupDescription ) {
		groupDescriptionClass = 'phMenuDisplay';
	}

	// Display or hide Item description in administration
	let itemDescriptionClass =
		'phMenuItemEdit phMenuItemEditItemDescription phMenuHide';
	if ( inheritedAdminDisplayItemDescription ) {
		itemDescriptionClass =
			'phMenuItemEdit phMenuItemEditItemDescription phMenuDisplay';
	}

	return (
		<div
			className="phMenuBoxMenuGroupsItems"
			key={ `block-${ instanceId }` }
			id={ `block-${ instanceId }` }
		>
			<div { ...useBlockProps() }>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ attributes.alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				}
				<h5>
					{ __(
						'Groups and Items',
						'phoca-restaurant-menu-groups-items-block'
					) }
				</h5>
			</div>

			<TextControl
				label={ __(
					'Group',
					'phoca-restaurant-menu-groups-items-block'
				) }
				value={ group }
				onChange={ ( newGroup ) =>
					setAttributes( { group: newGroup } )
				}
			/>

			<TextareaControl
				className={ groupDescriptionClass }
				label={ __(
					'Group Description',
					'phoca-restaurant-menu-groups-items-block'
				) }
				value={ groupDescription }
				onChange={ ( newGroupDescription ) =>
					setAttributes( { groupDescription: newGroupDescription } )
				}
			/>

			<div className="phMenuItemEditsBoxHeader">
				<div className="phMenuItemEditHeader phMenuItemEditImage">
					{ __(
						'Image',
						'phoca-restaurant-menu-groups-items-block'
					) }
				</div>
				<div className="phMenuItemEditHeader phMenuItemEditQuantity">
					{ __(
						'Quantity',
						'phoca-restaurant-menu-groups-items-block'
					) }
				</div>
				<div className="phMenuItemEditHeader phMenuItemEditTitle">
					{ __(
						'Title',
						'phoca-restaurant-menu-groups-items-block'
					) }
				</div>
				<div className="phMenuItemEditHeader phMenuItemEditPrice">
					{ __(
						'Price',
						'phoca-restaurant-menu-groups-items-block'
					) }
				</div>
			</div>
			{ items.map( ( item, index ) => (
				<>
					<div
						key={ `items-${ instanceId }-${ index }` }
						className="form-row phMenuItemEditRowBox"
					>
						<MediaUploadCheck>
							<MediaUpload
								className="form-row phMenuItemEdit phMenuItemEditImage"
								key={ `image-${ instanceId }-${ index }` }
								onSelect={ ( media ) =>
									updateField( index, 'image', media.url )
								}
								allowedTypes={ [ 'image' ] }
								value={ item.image }
								render={ ( { open } ) => (
									<div className="phMenuItemEdit phMenuItemEditImageSelectedButtonBox">
										<button
											className="phMenuItemEditImageSelectedBox"
											onClick={ open }
										>
											{ item.image ? (
												<img
													className="phMenuItemEditImageSelected"
													src={ item.image }
													alt={ __(
														'Selected',
														'phoca-restaurant-menu-groups-items-block'
													) }
												/>
											) : (
												<Icon icon={ image } />
											) }
										</button>
									</div>
								) }
							/>
						</MediaUploadCheck>

						<TextControl
							className="phMenuItemEdit phMenuItemEditQuantity"
							key={ `quantity-${ instanceId }-${ index }` }
							value={ item.quantity }
							onChange={ ( quantity ) =>
								updateField( index, 'quantity', quantity )
							}
						/>
						<TextControl
							className="phMenuItemEdit phMenuItemEditTitle"
							key={ `title-${ instanceId }-${ index }` }
							value={ item.title }
							onChange={ ( title ) =>
								updateField( index, 'title', title )
							}
						/>
						<TextControl
							className="phMenuItemEdit phMenuItemEditPrice"
							key={ `price-${ instanceId }-${ index }` }
							value={ item.price }
							onChange={ ( price ) =>
								updateField( index, 'price', price )
							}
						/>

						<div className="phMenuItemEdit phMenuButtonRemoveBox">
							<Button
								onClick={ () => removeItem( index ) }
								isDestructive
								className="phMenuButtonRemove"
								key={ `remove-${ instanceId }-${ index }` }
							>
								<Icon
									icon={ closeSmall }
									alt={ __(
										'Remove Item',
										'phoca-restaurant-menu-groups-items-block'
									) }
								/>
							</Button>
						</div>
					</div>
					<div>
						<TextareaControl
							className={ itemDescriptionClass }
							label={ __(
								'Item Description',
								'phoca-restaurant-menu-groups-items-block'
							) }
							value={ item.description }
							onChange={ ( description ) =>
								updateField( index, 'description', description )
							}
						/>
					</div>
				</>
			) ) }
			<Button
				variant="secondary"
				onClick={ addItem }
				className="phMenuButtonAdd"
			>
				{ __( 'Add Item', 'phoca-restaurant-menu-groups-items-block' ) }
			</Button>
		</div>
	);
}
