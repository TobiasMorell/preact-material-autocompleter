import { h, Component } from 'preact';
import './style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';

/**
 * Material design autocompleter. Opens up a dropdown when the TextField is selected, where the user may select one of
 * the items in a collection.
 */
export default class Index extends Component {
	state = {
		autocompleting: false,
		currentInput: '',
		relevantItems: []
	};

	/**
	 * Gets the current value of the autocompleter.
	 * @returns {string}
	 */
	getRecommendation = () => this.state.currentInput;

	/**
	 * Sets the current value of the autocompleter.
	 * @param value {string} The value to set.
	 */
	setRecommendation = (value) => {
		this.setState({ currentInput: value });
	};

	/**
	 * Autocomplete by reading the value of an option and setting the TextField's value to that.
	 * @param e {event} onClick event object.
	 * @private
	 */
	_autocomplete = (e) => {
		let input;
		if (e.target.children.length)
			input = e.target.children[0].innerHTML;
		else
			input = e.target.innerHTML;
		this.setState({ currentInput: input });
		this._stop();
	};

	/**
	 * Create an item for the dropdown menu.
	 * @param itemName {string} The name of the item to create.
	 * @returns {*} An HTML element representing the item.
	 * @private
	 */
	_createItem(itemName) {
		return (
			<div onClick={this._autocomplete}><strong>{itemName}</strong></div>
		);
	}

	/**
	 * Starts the autocompleter by showing the dropdown menu and resetting the value of the input field.
	 */
	start = () => {
		this.setState({ autocompleting: true });
		this._onInput({ target: { value: '' } });
	};
	/**
	 * Stops the auto completion by hiding the dropdown menu and firing the onChange event, if that is set.
	 * @private
	 */
	_stop = () => {
		this.setState({ autocompleting: false });
		if (this.state.onChange)
			this.state.onChange({
				target: { value: this.getRecommendation() }
			});
	};
	/**
	 * Abort the autocompletion by hiding the dropdown. The onChange event is not fired when aborting autocompletion.
	 */
	abort = () => {
		setTimeout(() => {
			this.setState({ autocompleting: false });
		}, 100);
	};

	/**
	 * Responds to a user keystroke by finding suggestions and updating the dropdown correspondingly.
	 * @param e {event} - The onInput event object from the TextField.
	 * @private
	 */
	_onInput = (e) => {
		let newVal = e.target.value;
		console.log(this.state.allItems);

		let matches;
		if (this.state.allItems) {
			matches = newVal ? this.state.allItems.filter(item => item.includes(newVal)) : this.state.allItems;
		}
		else
			matches = [];
		this.setState({
			relevantItems: matches,
			currentInput: newVal
		});
	};

	addNewCategory = e => {
		this.state.allItems.push(this.state.currentInput);
		this._stop();
	};

	render({ items, className, allowAddNewItems = false, hintText = undefined, id = undefined, onChange = undefined }) {
		this.state.allItems = items;
		this.state.onChange = onChange;

		let suggestions;
		if (this.state.relevantItems.length > 0)
			suggestions = this.state.relevantItems.map(i => this._createItem(i));
		else if (allowAddNewItems)
			suggestions = <div onClick={this.addNewCategory}><strong>No such item, click here to add it.</strong></div>;
		else
			suggestions = <div><strong>No item matches your search.</strong></div>;

		return (
			<div className={className} class={className}>
				<div className="autocomplete" class="autocomplete">
					<TextField id={id} label={hintText}
							   onInput={this._onInput}
							   onfocusin={this.start} value={this.state.currentInput} onfocusout={e => this.abort()}
					/>
					<div className={['autocomplete-items', this.state.autocompleting ? 'active' : ''].join(' ')}
						 class={['autocomplete-items', this.state.autocompleting ? 'active' : ''].join(' ')} >
						{suggestions}
					</div>
				</div>
			</div>
		);
	}
}