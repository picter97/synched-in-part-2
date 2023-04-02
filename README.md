# SynchedIn

>This README describes part 2 of the activity. For part 1, see [github.com/jeremyrrose/synched-in](https://github.com/jeremyrrose/synched-in).

_OMG what if there were an app that let you connect with other professionals in your field?_

_Like, a social network, but with less disinformation and fewer selfies and more of, like, people just kinda boasting about their professional achievements!_

Let's build a proof of concept!

## Current status

This repository was created with `create-react-app` and includes all the accoutrements thereof.

The packages `react-bootstrap` and `react-router-dom` have also been pre-installed.

`package-lock.json` has been removed because it is a pain for learning. (Very useful in the future, though!)

There are some interesting things in the `utils` and `assets` directories, which we'll address as we need to.

The app currently fetches the data and displays a card for each user. Let's filter them!

## Setup

- Fork and clone this repository.
- `cd` into the resulting `synched-in` directory.
- Run `code .` or whatever you do to get a project directory up in VSCode.
- Run `npm i` to install React, React Router, and Bootstrap.
- Run `npm start` to fire up your dev server.

## Step 1: Pseudocode

Let's think about what we're doing.

This app will show a list of fake people who work at fake companies. Let's pretend it's real!

### Our goals
- Show the list of people in a sensible way. **DONE**
- Enable the app to show selected people based on their status in a few categories that are most important for business decsisions:
    - `devLevel`
    - `company`
    - `favoriteMusicGenre`
- Enable the user to add "favorites." These users can be shown in a special list.
- Enable the user to "block" users if they, for instance, have the temerity to list "Non Music" as their favorite music genre. That's insane. (Reasonable people call it "post-music," obviously.)

### Think ahead

We need some way to filter users by dev level. We'll need to set up a way for the user to select a level, then display results based on that. We can probably use `.filter()`...

## Step 2: Play with filter

In `App.js` we currently map through the entire array of people. Can we filter it? Look for this line:

```js
          { people.map(person => <Person key={person.id} person={person} />) }
```

What if we chained a `.filter()` right in there?

```js
          { people
              .filter(person => person.devLevel === "student")
              .map(person => <Person key={person.id} person={person} />) }
```

Try this and see what you see in the browser.

Cool! It's just students! Now change it back, because we need to set up a dynamic filter. We'll come back to this.

## Step 3: Create a form

Ok, we're going to need a way to store the user's preference for the dev level filter. State is perfect for that! In `App.js`:

```js
  const [ devLevelFilter, setDevLevelFilter ] = useState("")
```

OK, great. The thing is, we don't want to clutter up our `App.js` with the form logic. Create another component called `Filter.jsx` and set up a form! You can use Bootstrap's `Form` component. It might look like this:

```js
import Form from 'react-bootstrap/Form'

export default function Filter (props) {

    return (
        <Form>
            <Form.Label htmlFor="devLevel-select">Filter by developer level: </Form.Label>
            <Form.Select id="devLevel-select">
            <option value="">No filter</option>
            </Form.Select>
        </Form>
    )
}
```

Import this component into `App.js` and show it below the header.

## Step 4: Populate the form

First of all, what are the possible dev levels? This repository actually includes some constants, so we can just pull them in from `utils/constants.js`. In `Filter.jsx`:

```js
import { DEV_LEVELS as devLevels } from '../utils/constants'
```

You can console.log `devLevels` if you want. :shrug It's an array of strings!

We can actually map through this array to generate our form options! Each `<option>` should use the current `devLevel` for its `key` and `value` attributes, and also for its inner text. See if you can set it up!

## Step 5: Change state

That's a handsome form, but currently when we select a level, nothing happens. We'll need to hook it up to state in `App.js` by passing in our setter through props:

```js
    <Filter setDevLevelFilter={setDevLevelFilter}/>
```

Now we can use `props.setDevLevelFilter` in the `Filter` component! Set up an `onChange` callback for the form to set the desired dev level in state. Test with React dev tools to see if the value is changing!

## Step 6: Filter

>There are lots of ways to solve this, and depending on the situation in your future apps, you might use a variety of solutions. We'll look at one here.

### Pseudocode!

What do we need to do?

- If a filter is set, we should just show people whose dev level matches the selected level.
- If _no_ filter is set, just show the list of people

### Filter by dev level

We had some code earlier that worked to filter. We could set it up to work dynamically using our value in state just by plugging it in!

```js
          { people
              .filter(person => person.devLevel === devLevelFilter)
              .map(person => <Person key={person.id} person={person} />) }
```

Try it out. Pretty neat! There's a problem, though: If we select "No filter," we don't see _anybody_. :/

### Get logical

Take a look at just our callback function inside `.filter()`:

```js
    person => person.devLevel === devLevelFilter
```

Right now this function returns `true` if the person's dev level matches the filter. We need to add the logic to make it _also_ return `true` for everyone if the `devLevelFilter` is `""`. See if you can do it!

Hints:
- Remember that a callback function is... a function. It doesn't _have_ to be on one line.
- Also remember that, if you _want_ it to be on one line, you can use a ternary statement (`?`) or the _OR_ operator (`||`) to do some slick logic.

>Make sure to check with your instructor if you get stuck!

## BONUS: Set up another filter

`utils/constants.js` _also_ includes the enumerated values for `company` and `favoriteMusicGenre`. Import those values and add another drop-down.

How should you adjust your logic in `App.js` to filter by _both_?
