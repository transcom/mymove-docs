# Using Modals

## History

In a previous era, `src/components/Modal/Modal.jsx` would import from React USWDS's modal.
However, React USWDS decided to no longer support modals.
As a result, MilMove copied all the code from React USWDS' modal and placed it into `src/components/MigratedModal/MigratedModal.jsx`.

## Using Modal

`src/components/Modal/Modal.jsx` should be used, and **not** `src/components/MigratedModal/MigratedModal.jsx`.
At no point in time should folks be importing from `MigratedModal`.

### MyModal Example

```js
import styles from "./MyModal.module.scss";

import Modal, {
  ModalActions,
  ModalClose,
  ModalTitle,
  connectModal,
} from "components/Modal/Modal";

// MyModal should also be exported by itself so that you can import it as is
// without the overlay and the modal container. This is useful for both testing
// and storybook.
export const MyModal = ({ onClose }) => {
  return (
    <Modal className={styles.whateverStylesYouWant}>
      <ModalClose handleClick={() => onClose()} />
      <ModalTitle>
        <h4>My Modal</h4>
      </ModalTitle>
      My Modal Content
      <ModalActions>
        {/*There is usually another action button, but it has been left out of
        this example since I wanted to highlight is how this button passes a
        function that calls onClose as the onClick handler.*/}
        <Button type="button" secondary onClick={() => onClose()}>
          Back
        </Button>
      </ModalActions>
    </Modal>
  );
};

MyModal.propTypes = {
  onCLose: PropTypes.func.isRequired,
};

// It is important to have this display name so that connectModal knows how to
// re-export the modal. This modal will then be imported as ConnectedMyModal.
MyModal.displayName = "MyModal";

export default connectModal(MyModal);
```

### Using MyModal Example

```js
import React, {useState} from 'React';

import ConnectedMyModal from './MyModal'

const ComponentThatUsesMyModal = () => {
  const [myModalIsVisible, setMyModalIsVisible] = useState(false);

  const handleOpenMyModal = () => {
    setMyModalIsVisible(true)
  }

  const handleCloseMyModal = () => {
    setMyModalIsVisible(false)
  }

  return (
    <>
      <Button type="button" onClick={() => handleOpenMyModal()}>
      {/* The isOpen prop is passed down through Modal to Migrated modal and
      determines whether to return the modal component or return null.*/}
      <ConnectedMyModal isOpen={myModalIsVisible} onClose={handleCLoseMyModal}/>
    </>
  )
}
```

### Testing MyModal

Imports for testing MyModal should work as follows.

```js
import { MyModal } from "./MyModal";
```

### Storybook MyModal

Imports for MyModal in Storybook should work as follows.

```js
import { MyModal } from "./MyModal";
```
