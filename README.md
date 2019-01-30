# Preact Material AutoCompleter
A material-design autocompleter with a dropdown. Simple to set up and use along with preact.

You can also find this as an npm package [here](https://www.npmjs.com/package/preact-material-autocompleter).

*DISCLAIMER*: The package is currently broken, as css classes for some reason is removed from the jsx when installing through npm. I'm working on this issue, but feel free to open an issue and come with suggestions if you have an idea.

## Options
| Option | Description | Required |
| ------ | ----------- | -------- |
| items  | The list of items that should be displayed to the user in the dropdown. Must be a list of strings. | Yes |
| className | The name of the outer-most container class | No |
| allowAddNewItems | A flag indicating whether or not the user is allowed to add items | No |
| hintText | A string describing what the user is choosing | No |
| id | The id of the underlying TextField | No |
| onChange | A callback function that is called when the user selects a value from the dropdown | No |

## Examples

### Example 1
Render the autocompleter with three items; 'one', 'two' and 'three' and without the possibility to add options.

![autocompleter without 'allowAddNewItems' option enabled][example-no-add.png]

```javascript
import AutoCompleter from 'preact-material-autocompleter';

export default class App extends Component {

	render() {
		return (
			<div id="app" >
				<AutoCompleter items={['one', 'two', 'three']}
							   onChange={e => console.log('You selected' + e.target.value)} hintText="Select an item"
				/>
			</div>
		);
	}
}
```

### Example 2
Render the autocompleter with three items; 'one', 'two' and 'three' and allow users to add items.

![autocompleter with 'allowAddNewItems' option enabled][example-with-add.png]

```javascript
import AutoCompleter from 'preact-material-autocompleter';

export default class App extends Component {

	render() {
		return (
			<div id="app" >
				<AutoCompleter items={['one', 'two', 'three']}
							   onChange={e => console.log('You selected' + e.target.value)} hintText="Select an item"
							   allowAddNewItems
				/>
			</div>
		);
	}
}
```