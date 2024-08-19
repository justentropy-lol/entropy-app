import { writable } from "svelte/store";

export const activeModal = writable(null);

export const toggleModal = (modalName) => {
  activeModal.update((current) => {
    if (current === null) {
      return modalName;
    } else {
      return null;
    }
  });
};

//export { toggleModal };
