# AC React FE Challenge

Deployed at : [https://ac-react-fe-challenge-main.vercel.app/](https://ac-react-fe-challenge-main.vercel.app/)

Welcome programmer.

This challenge contains two tasks, within a [Remix](https://remix.run/) application.

## Task One

In task one, you'll see a basic display of 24 Pokémon. There is two parts to this task.

### Part One

For Part One, you are asked to implement pagination of the list of Pokémon. The application fetches the list from [PokéAPI's GraphQL API](https://pokeapi.co/docs/graphql). Preferably the state for the pagination should come from the page URL, so that refreshing the browser would mean you remain on the same page.

> Be aware of the PokéAPI's GraphQL API is rate limited to 100 calls per hour, per IP. In memory caching has been implemented server side for the existing calls.

### Part Two

This part is a bit simpler, it asks for the Pokémon Cards to visually show the two types a Pokémon cab have on the card background. As currently it is only showing the first type's colour.

## Task Two

In the second task, you'll the beginning of a battery status visualization. This task again is split into two parts.

### Part One

Currently the battery percentage is centered within the remaining battery capacity. However it would be better within the center of the battery, as it currently displays poorly at low percentages.

Feel free to change other elements of the visualization, to improve the design.

### Part Two

Browsers expose the an API for reading the battery information, called the [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API). For this part you'll need to integrate with the Battery Status API to display the status on the page, just displaying the `level` is enough, but if you are feeling adventurous you could also visualize if the device is charging or not.

If you have a desktop computer, without a battery, it's fine to show whatever the Battery Status API returns.

> Sorry to any Firefox or Safari users, you don't have browser support here. Don't worry too much about adding fallbacks for those browsers as part of this task.

## Getting Setup

### Installing the dependencies

```shellscript
npm install
```

### Development

Run the dev server:

```shellscript
npm run dev
```
