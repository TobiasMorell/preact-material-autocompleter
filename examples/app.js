import { h, Component } from 'preact';
import AutoCompleter from '../';
import style from './style.css';

export default class App extends Component {

	render() {
		return (
			<div id="app" >
				<AutoCompleter items={['one', 'two', 'three']} className="centeredWithMargin" allowAddNewItems
							   onChange={e => console.log('You selected' + e.target.value)} hintText="Select an item"
				/>
			</div>
		);
	}
}
