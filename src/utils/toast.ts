import { createStandaloneToast } from "@chakra-ui/react";
import { theme } from "../theme";

const toast = createStandaloneToast({
  theme: theme,

  defaultOptions: {
    duration: 2000,
    variant: "solid",
    isClosable: true,
    position: "top",
  },
});

export default toast;
