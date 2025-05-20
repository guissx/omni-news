export const showSuccessMessage = (
  setShowPopup: (value: boolean) => void,
  callback?: () => void
): void => {
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
    callback?.();
  }, 3000);
}

export const resetForm = (setFormKey: React.Dispatch<React.SetStateAction<number>>): void => {
  setFormKey((prevKey: number) => prevKey + 1);
};