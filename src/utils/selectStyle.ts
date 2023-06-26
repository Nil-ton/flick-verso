export const customStyles = {
    control: (provided: any) => ({
        ...provided,
        border: "1px solid #D1D5DB",
        borderRadius: "0.375rem",
        backgroundColor: "transparent",
        padding: "0.5rem",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#1E3A8A",
        },
    }),
    option: (provided: any) => ({
        ...provided,
        color: "#1E3A8A",
        "&:hover": {
            backgroundColor: "#E5E7EB",
        },
    }),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};