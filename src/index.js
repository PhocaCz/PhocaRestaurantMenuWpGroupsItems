/**
 * Plugin Name:       Phoca Restaurant Menu - Groups and Items Block
 * Author:            Jan Pavelka ( <a href="https://www.phoca.cz">Phoca</a> )
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,

	icon: {
		src: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="ionicon"
				viewBox="0 0 512 512"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M160 144h288M160 256h288M160 368h288"
				/>
				<circle
					cx="80"
					cy="144"
					r="16"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
				/>
				<circle
					cx="80"
					cy="256"
					r="16"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
				/>
				<circle
					cx="80"
					cy="368"
					r="16"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
				/>
			</svg>
		),
	},
} );
