import { useEffect, useState } from "react"
import { Grid, Button, TextField, Box, Typography, IconButton, } from "@mui/material"
import Dropzone from "react-dropzone"
import { useTheme } from "@emotion/react"
import { Close } from "@mui/icons-material"
import { FlexBetween } from "../../components/FlexBetween"
import { useRegisterMutation } from "../../features/auth/authApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { login } from "features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import LoadingButton from "components/LoadingButton"
import Error from "components/Error"
const Form = () => {

    const { isLoading: isLoginLoading, isSuccess: isLoginSuccess, isError: loginError } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const theme = useTheme()
    const navigate = useNavigate()
    const [pageType, setPageType] = useState("login")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [occupation, setOccupation] = useState("")
    const [location, setLocation] = useState("")
    const [picturePath, setPicturePath] = useState("")
    const [register, { isLoading: isRegisterLoading, isError: isRegisterError, isSuccess: isRegisterSuccess, error: registerError }] = useRegisterMutation()

    const resetStates = () => {
        setFirstName("")
        setLastName("")
        setPassword("")
        setEmail("")
        setOccupation("")
        setLocation("")
        setPicturePath("")
    }

    useEffect(() => {
        if (isRegisterSuccess) {
            resetStates()
            navigate("/")
        }
    }, [isRegisterSuccess, navigate])


    useEffect(() => {
        if (isLoginSuccess) {
            resetStates()
            navigate("/")
        }
    }, [isLoginSuccess])

    const onPageTypeClicked = (type) => {
        resetStates()
        setPageType(type)
    }

    const onRegisterClicked = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        const values = { firstName: firstName, lastName: lastName, password: password, email: email, occupation: occupation, location: location, picture: picturePath[0] }
        Object.entries(values).map(([key, value]) =>
            formData.append(key, value)
        )

        formData.append("picturePath", picturePath[0].name)
        await register(formData)
    }

    const onLoginClicked = async (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))
    }

    const registerCanSave = [firstName, lastName, email, password, occupation, location, picturePath].every(Boolean)
    const loginCanSave = [email, password].every(Boolean)


    return (
        <form component="form" enctype="multipart/form-data" onSubmit={onRegisterClicked}>
            {
                pageType === "register" ?
                    (<Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField name="firstName" label="Fist Name" required onChange={e => setFirstName(e.target.value)} value={firstName} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="lastName" label="Last Name" required onChange={e => setLastName(e.target.value)} value={lastName} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="email" type="email" label="Email" required onChange={e => setEmail(e.target.value)} value={email} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="password" type="password" label="Password" required onChange={e => setPassword(e.target.value)} value={password} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="occupation" label="Occupation" required onChange={e => setOccupation(e.target.value)} value={occupation} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="location" label="Location" required onChange={e => setLocation(e.target.value)} value={location} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Box border={`1px solid ${theme.palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem">
                                <Dropzone acceptedFiles=".jpeg,.jpeg,.png" multiple={false} onDrop={acceptedFiles => { (setPicturePath(acceptedFiles)) }}>
                                    {({ getRootProps, getInputProps }) => {

                                        return (
                                            <FlexBetween {...getRootProps()} flexDirection="column" height="50px">
                                                {
                                                    picturePath ? (
                                                        <FlexBetween justifyContent="space-between" gap="2.25rem" margin="auto">
                                                            <Typography sx={{ position: "relative" }}>{picturePath[0].path}
                                                                <IconButton onClick={() => setPicturePath("")} sx={{ position: "absolute", padding: "0", top: "0", color: "red", width: "15px", ml: "0.25rem" }}>
                                                                    <Close sx={{ fontSize: "1rem" }} />
                                                                </IconButton>
                                                            </Typography>
                                                        </FlexBetween>
                                                    ) :
                                                        (
                                                            <Box margin="auto">
                                                                <TextField type="file" {...getInputProps()} name="picture" />
                                                                <Typography>Drag 'n' drop some files here, or click to select files</Typography>
                                                            </Box>
                                                        )
                                                }
                                            </FlexBetween>
                                        )
                                    }}
                                </Dropzone>
                            </Box>

                        </Grid>
                        {
                            isRegisterError && (
                                <Error error={registerError.data.message} />
                            )
                        }
                        <Grid item xs={12}>
                            {
                                isRegisterLoading ? (
                                    <LoadingButton />
                                ) :
                                    (
                                        <Button type="submit" sx={{ padding: "0.5rem 0.25rem", backgroundColor: theme.palette.neutral.mediumMain }} fullWidth disabled={!registerCanSave && true}>
                                            Register
                                        </Button>
                                    )
                            }
                            <Box p="1rem 0.25rem">
                                <Typography sx={{ color: theme.palette.primary.main }} >
                                    Already haven an account? Sign in <Link onClick={() => onPageTypeClicked("login")}>here.</Link>
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>) :
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Email" fullWidth onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" label="Password" onChange={(e) => setPassword(e.target.value)} value={password} fullWidth />
                        </Grid>
                        {
                            loginError && (
                                <Error error={loginError} />
                            )
                        }
                        <Grid item xs={12}>
                            {
                                isLoginLoading ? (
                                    <LoadingButton />
                                ) : (
                                    <Button sx={{ padding: "0.5rem 0.25rem", backgroundColor: theme.palette.neutral.mediumMain }} onClick={onLoginClicked} fullWidth disabled={!loginCanSave && true}>
                                        Login
                                    </Button>
                                )
                            }
                            <Box p="1rem 0.25rem" >
                                <Typography sx={{ color: theme.palette.primary.main }} >
                                    Don't have an account yet? Register <Link className="default-link" onClick={() => onPageTypeClicked("register")} underline="none">here.</Link>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
            }

        </form >

    )
}
export default Form