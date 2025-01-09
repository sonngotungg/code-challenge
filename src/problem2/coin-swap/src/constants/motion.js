export const primaryBtnVariants = {
    default: {
        background: "var(--btn-primary-gradient-default)",
    },
    hover: {
        background: "var(--btn-primary-gradient-hover)",
        transition: { duration: 0.3 },
    },
    active: {
        background: "var(--btn-primary-gradient-active)",
        transition: { duration: 0.3 },
    },
};

export const centerVariants = {
    hidden: {
        opacity: 0,
        y: -50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 3,
            bounce: 0.3,
            staggerChildren: 0.3,
        },
    },
};
