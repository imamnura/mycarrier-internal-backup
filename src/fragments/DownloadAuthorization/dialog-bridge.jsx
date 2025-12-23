
let api = {};

export function setDialogApi(next) {
  api = next;
}

export const dialog = {
  show(message) {
    api.show?.(message);
  },
  hide() {
    api.hide?.();
  },
};
