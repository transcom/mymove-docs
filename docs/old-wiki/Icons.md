# Icons

MilMove takes the majority of its icons from [Font Awesome](https://fontawesome.com/), and uses [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) in order to be able to easily render FontAwesome icons in React. We are using the [library implementation described here](https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently), so there is a `src/icons.js` file that initializes all of the icons, and is included in the app entry point (as well as Storybook and Jest config files).

## Using Existing Icons

To view icons we have already added, you can view the [Global > Icons page in Storybook](https://storybook.dp3.us/?path=/story/global-icons--all). Each icon is annotated with the `icon` prop value needed to use that icon.

Since we have set up the react-fontawesome icon library, you don't need to import individual icons into a component in order to use them. All you need to do is import the `FontAwesomeIcon` component (if it's not already imported), and use it with the correct `icon` prop (usually the icon name as a string, in snake-case and without the `fa` prefix):

```
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

<FontAwesomeIcon icon="file" />
```

> You may notice some icons have an `icon` prop that is an array, where the first item is a FontAwesome icon set prefix, such as `far`. That's to indicate the icon belongs to the `free-regular-svg-icons` bundle, instead of the `free-solid-svg-icons` (which is the default). More about the `icon` prop can be found [here](https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently).

react-fontawesome lets you do some basic customization using props, like change the size and orientation. See full documentation [here](https://github.com/FortAwesome/react-fontawesome#features). Color is set using the `color` CSS property (since the icons are rendered as SVG, they can be styled using CSS as well).

> You do _not_ need to add additional FontAwesome CSS classes (such as `fa`, `far`, `fa-sort`) to the component.

## Adding New Icons

1. Find the icon you want to add by searching at https://fontawesome.com/icons?d=gallery

> Only the `free-solid-svg-icons` and `free-regular-svg-icons` sets are included in this project. When you search, make sure to filter by "Free", "Solid" and "Regular".

2. Add the icon using its name to `src/icons.js`. The icon should be imported from the corresponding @fortawesome package (either `free-solid-svg-icons` or `free-regular-svg-icons`), and then added to the list of icons passed into `library.add()`. It should be prefixed with `fa` and camelCased. For example, to add [air-freshener](https://fontawesome.com/icons/air-freshener?style=solid):

```
// src/icons.js

  import {
    // other existing icons...
+   faAirFreshener,
  } from '@fortawesome/free-solid-svg-icons'

  library.add(
    // other existing icons...
+   faAirFreshener
  )
```

> Also see ["How do I import the same icon from two different styles"](https://github.com/FortAwesome/react-fontawesome#how-do-i-import-the-same-icon-from-two-different-styles)

3. Add an example of the icon to the Icons Storybook page (`src/stories/icons.stories.jsx`).