export const selectStyles = {
  control: (base) => ({
    ...base,
    borderColor: "#d1d5db",
    borderRadius: "0.5rem",
    padding: "0.25rem",
    fontSize: "1rem",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#01959F" : "#fff",
    color: state.isSelected ? "#fff" : "#000",
  }),
};