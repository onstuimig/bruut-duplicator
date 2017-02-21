# Duplicator

This plugin adds the functionality to duplicate elements to a specific `target`.

## Usage

Include the duplicator.js plugin (included in Bruut 3.x) and create a new `instance` of Duplicator, attaching it to a element with `data-duplicate`:

	document.addEventListener("DOMContentLoaded", function () {
	    var duplicateTrigger = document.getElementById('my-duplicator');
	    new Duplicator(duplicateTrigger);
	});

## Barebones example

	<a href="#" data-duplicator='{"id" : "#my-duplicate-element"}'>Click me</a>

When used like this, the plugin will:

Find a element with `id=â€œmy-duplicate-elementâ€` and duplicate it to the next sibling of the trigger. If thereâ€™s no sibling, a div with the class `duplicator-duplicates` will be created on init.

## All options in the data attributes

	<a href="#" data-duplicator='{"id" : "#id", "target" : "#id", "max" : BOOL|number, "callback" : "myFunction"}'>Click me</a>

> Please note: You must provide a valid JSON encoded string to get the plugin to work. If the plugin fails to process the string, it will throw a error in the console.

- **id** | Required
The id of the element that needs to be duplicated. Please note: the â€˜idâ€™ attribute will be removed from the duplicated element.
- **target** | Optional (default: sibling of element)
The id of the element where the duplicates will be appended to. If not provided, the plugin will find the sibling of the trigger. If a sibling does not exist, a div with the class `duplicator-duplicates` will be created.
- **max** | Optional (default: false)
If you want to limit the amount of duplicates, add a `number` for the maximum amount of duplicates in the `target`.
- **callback** | Optional
If you want to fire a function when a duplicate is appended, add the name of this function (without () ) and it will be fired when the duplication is completed. The function will not fire when the maximum amount of duplicates is reached and the `trigger` is clicked. The plugin will pass one argument:
    - `instance` - The current instance of Duplicator with all the data

## Properties
A instance of Duplicator will provide the following properties:

- **duplicateItem**
The latest duplicate of `duplicateOriginal`
- **duplicateOriginal**
The element that will be duplicated
- **duplicateTarget**
The element where the duplicates will be appended to
- **data**
The object containing the JSON data from the `trigger`
- **maxDuplicates**
The amount of duplicates that is allowed. If `false`, thereâ€™s no limit
- **trigger**
The element that has `data-duplicator` and that will be clicked to duplicate