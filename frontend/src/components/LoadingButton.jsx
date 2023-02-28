import { Button, CircularProgress } from "@mui/material"

const LoadingButton = () => {
    return (
        <Button fullWidth>
            <CircularProgress padding="0" size="25px">

            </CircularProgress>
        </Button>
    )
}

export default LoadingButton