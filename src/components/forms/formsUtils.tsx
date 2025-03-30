// Função para exibir mensagens de sucesso
export const showSuccessMessage = (setShowPopup: (value: boolean) => void) => {
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 3000); // Fecha o popup automaticamente após 3 segundos
};

// Função para resetar o formulário
export const resetForm = (
  setFormKey: (value: (prevKey: number) => number) => void
) => {
  setFormKey((prevKey) => prevKey + 1);
};
