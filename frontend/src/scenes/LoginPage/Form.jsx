import { Formik } from "formik"
import { useState } from "react"
import { Grid, Button, Input, FormControl, TextField, Box, Typography, } from "@mui/material"
import Dropzone from "react-dropzone"
import { useTheme } from "@emotion/react"
import { EditOutlined } from "@mui/icons-material"
import { FlexBetween } from "../../components/FlexBetween"
import { useLoginMutation } from "../../features/auth/authApiSlice"

const Form = () => {
    const theme = useTheme()
    const [pageType, setPageType] = useState("login")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [occupation, setOccupation] = useState("")
    const [location, setLocation] = useState("")
    const [picturePath, setPicturePatch] = useState("")



    const onRegisterClicked = () => {

    }


    return (
        <FormControl >
            {
                pageType === "register" ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Fist Name" onChange={e => setFirstName(e.target.value)} error={!firstName} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Last Name" onChange={e => setLastName(e.target.value)} error={!lastName} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" onChange={e => setEmail(e.target.value)} error={!lastName} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField type="password" label="Password" onChange={e => setPassword(e.target.value)} error={!lastName} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Occupation" onChange={e => setOccupation(e.target.value)} error={!lastName} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Location" onChange={e => setLocation(e.target.value)} error={!lastName} fullWidth />
                        </Grid>
                        <Grid item sm={12}>
                            <Box border={`1px solid ${theme.palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem">
                                <Dropzone acceptedFiles=".jpeg,.jpeg,.png" multiple="false" onDrop={acceptedFiles => (setPicturePatch(acceptedFiles[0].path))}>
                                    {({ getRootProps, getInputProps }) => {

                                        return (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    {
                                                        picturePath ? (
                                                            <FlexBetween>
                                                                <Typography>{picturePath}</Typography>
                                                                <EditOutlined />
                                                            </FlexBetween>
                                                        ) :
                                                            <p>Drag 'n' drop some files here, or click to select files</p>}
                                                </div>
                                            </section>
                                        )
                                    }}
                                </Dropzone>
                            </Box>

                        </Grid>
                        <Grid item xs={12}>
                            <Button sx={{ padding: "0.5rem 0.25rem", backgroundColor: theme.palette.neutral.mediumMain }} fullWidth>
                                Register
                            </Button>
                            <Box p="1rem 0.25rem">
                                <Typography sx={{ color: theme.palette.primary.main }} onClick={() => setPageType("login")}>
                                    Already have an account? Sign in here.
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>
                ) :
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button sx={{ padding: "0.5rem 0.25rem", backgroundColor: theme.palette.neutral.mediumMain }} fullWidth>
                                Login
                            </Button>
                            <Box p="1rem 0.25rem">
                                <Typography sx={{ color: theme.palette.primary.main }} onClick={() => setPageType("register")}>
                                    Don't have an account yet? Register here.
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
            }

        </FormControl>

    )
}
export default Form