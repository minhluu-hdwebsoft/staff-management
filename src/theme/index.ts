import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};
export const theme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        default: "blue.500",
        _dark: "blue.400",
      },
      secondary: {
        default: "teal.800",
        _dark: "teal.700",
      },
    },
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) ~ label, .chakra-select__wrapper ~ label": {
              ...activeLabelStyles,
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});
