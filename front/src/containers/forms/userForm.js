import { Form, Formik, Field } from 'formik'
import Button from '@mui/material/Button'
import { Autocomplete, Select, TextField } from 'formik-mui'
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Typography
} from '@mui/material'
import * as yup from 'yup'
import MuiTextField from '@mui/material/TextField';
import { availabilityStatuses, universities } from '../../constants'

const UserFormContainer = () => {

  const defaultVisibilityStatusValue = availabilityStatuses
    .find(status => status.label.toLowerCase() === 'all').value;

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    name_visibility: yup.string().required('Name availability status is required'),
    email: yup.string().email('Should be a valid email address').required('Email is required'),
    email_visibility: yup.string().required('Email availability status is required'),
    phone: yup.string().required('Phone is required').matches(/^[0-9]+$/, 'Phone should contain only digits')
      .min(10, 'Phone should contain 10 digits')
      .max(10, 'Phone should contain 10 digits'),
    phone_visibility: yup.string().required('Phone availability status is required'),
    university: yup.string(),
    university_visibility: yup.string(),
  })

  return (
    <Box margin={5}>
      <Formik
        initialValues={{
          name: '',
          name_visibility: defaultVisibilityStatusValue,
          email: '',
          email_visibility: defaultVisibilityStatusValue,
          phone: '',
          phone_visibility: defaultVisibilityStatusValue,
          university_visibility: defaultVisibilityStatusValue,
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Paper elevation={16} sx={{ p: 3, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={12} mb={3}>
                  <Typography variant='h4' component='div'>My Profile</Typography>
                </Grid>
                <Grid container mb={3} height={85}>
                  <Grid item xs={8}>
                    <Typography color='text.secondary'>Name</Typography>
                    <Field
                      component={TextField}
                      fullWidth
                      type='text'
                      name='name'
                      sx={{width: 300}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Typography color='text.secondary'>Available to</Typography>
                    <FormControl>
                      <Field
                        component={Select}
                        type='text'
                        name='name_visibility'
                        id="name_visibility"
                        sx={{width: 165}}
                      >
                        {availabilityStatuses.map((option) => (
                          <MenuItem key={option.id} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container mb={3} height={85}>
                  <Grid item xs={8}>
                    <Typography color='text.secondary'>Email</Typography>
                    <Field
                      component={TextField}
                      fullWidth
                      type='text'
                      name='email'
                      sx={{width: 300}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Typography color='text.secondary'>Available to</Typography>
                    <FormControl>
                      <Field
                        component={Select}
                        type='text'
                        name='email_visibility'
                        id="email_visibility"
                        sx={{width: 165}}
                      >
                        {availabilityStatuses.map((option) => (
                          <MenuItem key={option.id} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container mb={3} height={85}>
                  <Grid item xs={8}>
                    <Typography color='text.secondary'>Phone</Typography>
                    <Field
                      component={TextField}
                      fullWidth
                      type='text'
                      name='phone'
                      sx={{width: 300}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Typography color='text.secondary'>Available to</Typography>
                    <FormControl>
                      <Field
                        component={Select}
                        type='text'
                        name='phone_visibility'
                        id="phone_visibility"
                        sx={{width: 165}}
                      >
                        {availabilityStatuses.map((option) => (
                          <MenuItem key={option.id} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container mb={3} height={85}>
                  <Grid item xs={8}>
                    <Typography color='text.secondary'>University</Typography>
                    <Field
                      name="university"
                      component={Autocomplete}
                      options={universities}
                      getOptionLabel={(option) => option.name}
                      style={{width: 300}}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          name="uni"
                          error={touched['uni'] && !!errors['uni']}
                          helperText={touched['uni'] && errors['uni']}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Typography color='text.secondary'>Available to</Typography>
                    <FormControl>
                      <Field
                        component={Select}
                        type='text'
                        name='university_visibility'
                        id="university_visibility"
                        sx={{width: 165}}
                      >
                        {availabilityStatuses.map((option) => (
                          <MenuItem key={option.id} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container sx={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <Button type='submit' disabled={isSubmitting} variant="contained">Save</Button>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default UserFormContainer
