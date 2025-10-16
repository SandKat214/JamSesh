import type { CSSProperties } from "react"

declare module "@mui/material/styles" {
    interface Palette {
        purple: Palette["primary"]
        gray: Palette["primary"]
        jamRed: Palette["primary"]
        white: Palette["primary"]
    }

    interface PaletteOptions {
        purple?: PaletteOptions["primary"]
        gray?: PaletteOptions["primary"]
        jamRed?: PaletteOptions["primary"]
        white?: PaletteOptions["primary"]
    }

    interface TypographyVariants {
        formLabel: CSSProperties
    }

    interface TypographyVariantsOptions {
        formLabel?: CSSProperties
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        containedPurple: true
        containedNeutral: true
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        formLabel: true
    }
}