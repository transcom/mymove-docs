# Happo

:::info More Happo documentation
There is [more information on Happo][docs-internal-happo] and how it's used in
our Storybook Testing Frontend Testing section.

[docs-internal-happo]: ../../frontend/testing/frontend.md "More Happo documentation"
:::

Happo is a UI diff checker tool that helps compare the UI pages from branches to master. When styling changes have been made, Happo notifies that a diff has occured and asks a reviewer to review the Happo changes before allowing the PR to be merged in.

## What to do with Happo Errors

When your CI/CD build has begun, you can view the status of the Happo under the CI/CD pipeline

![image](https://user-images.githubusercontent.com/84801109/141024060-32ff4825-b2b5-47e4-a281-682f6371a2d2.png)

If the Happo check has failed, you must review the changes. You will see a list of diffs that will need to be reviewed/resolved before the Happo check can be approved.

For example, you may have changed title content like this:

![image](https://user-images.githubusercontent.com/84801109/141023978-2dd94167-93fe-4add-9e4e-c739fece0006.png)

After reviewing this, you may `accept` or `reject` the changes. When it is accepted, the CI/CD Happo step will be approved.


## False Errors

Occasionally, Happo misinterprets a diff when one has not actually occured.

When pushing to Happo, you may notice that some diff checking are barely off by pixels.  You can ignore these types of diff errors. An example of this can be shown in the below image

![image](https://user-images.githubusercontent.com/84801109/141023587-28176a4a-0fc2-4510-ba09-29b9fb4f0634.png)

In this picture, the change is negligible, and nothing significant about the page. You can click `review`, then `accept` to pass the Happo check.


## Interactive Stories

Storybook stories can be created with [`play` functions](https://storybook.js.org/docs/react/writing-stories/play-function), which allow for Testing Library-style commands that interact with page elements, and execute immediately after a story renders. These functions can be used to get components into a specific state. While they can be useful for developers and designers, **Happo generally has issues displaying stories with these functions**. If you create a story with a `play` function, turn off Happo for it using `happo: false` in a `parameters` property.

```jsx
ErrorDatesAndLocation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByRole('button', { name: 'Save & Continue' })).toBeEnabled();

  await userEvent.click(canvas.getByRole('button', { name: 'Save & Continue' }));
};

ErrorDatesAndLocation.parameters = {
  happo: false,
};
```

