import { Avatar, Box, CardMedia, FormControl, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import Button from '@mui/material/Button'
import FormikAutocomplete from './FormikAutocomplete'
import PropTypes from 'prop-types'
import { autocompleteOptionPropTypes } from '../../constants'
import { Cropper } from 'react-cropper'

const UserForm = ({
  availabilityStatuses,
  schema,
  initialValues,
  onUserUpdate,
  title,
  theme,
  universities,
  showCancel,
  onCancel,
  image,
  handleImageChange,
  setCropper,
  cropImage,
  croppedImage,
  deleteImage,
  userImage,
  resolveFirstLetterFrom
}) => {

  const STYLE_VALUES = {
    CONTAINER_WIDTH: 500,
    LEFT_COLUMN_WIDTH: 300,
    RIGHT_COLUMN_WIDTH: 165,
    LINE_HEIGHT: 85,
    MARGIN_BOTTOM: 3,
    BUTTON_WIDTH: '50%'
  }

  return (
    <Box margin={5}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onUserUpdate}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Paper elevation={16} sx={{ p: 3, margin: 'auto', maxWidth: STYLE_VALUES.CONTAINER_WIDTH, flexGrow: 1 }}>
              <Grid container>
                {title && <Grid item xs={12} mb={STYLE_VALUES.MARGIN_BOTTOM}>
                  <Typography variant='h4' component='div'>{title}</Typography>
                </Grid>}
                <Grid item xs={12} mb={STYLE_VALUES.MARGIN_BOTTOM}>
                  <Box>
                    {userImage && <Avatar src={userImage}  alt='Article image' sx={{ width: 100, height: 100 }} />}
                    {userImage == null && <Avatar
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 76,
                        height: 76
                      }} >
                      {resolveFirstLetterFrom(initialValues.name)}
                    </Avatar>}
                  </Box>
                  <Box>
                    {croppedImage && <CardMedia
                      component='img'
                      style={{
                        width: 'auto',
                        maxHeight: '200px',
                      }}
                      image={croppedImage}
                      alt='Avatar image'
                    />}
                  </Box>
                  <Box>
                    {!image && <Button variant='contained' component='label' sx={{ mb: 1, mr: 1, mt: 1 }}>
                      Choose image
                      <input type='file' hidden onChange={handleImageChange} />
                    </Button>}
                    {(image || croppedImage) && <Button variant='contained' onClick={deleteImage} sx={{ mb: 1, mr: 1, mt: 1 }}>Delete image</Button>}
                    {image && (
                      <Cropper
                        src={image}
                        onInitialized={instance => setCropper(instance)}
                        rotatable={false}
                        viewMode={1}
                      />
                    )}
                    {image && (
                      <Button variant='contained' onClick={cropImage} sx={{ mb: 1, mr: 1, mt: 1 }}>Crop</Button>
                    )}
                  </Box>
                </Grid>
                <Grid container mb={STYLE_VALUES.MARGIN_BOTTOM} height={STYLE_VALUES.LINE_HEIGHT}>
                  <Grid item xs={8}>
                    <Typography color='text.secondary'>Name</Typography>
                    <Field
                      component={TextField}
                      fullWidth
                      type='text'
                      name='name'
                      sx={{ width: STYLE_VALUES.LEFT_COLUMN_WIDTH }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Typography color='text.secondary'>Available to</Typography>
                    <FormControl>
                      <Field
                        component={FormikAutocomplete}
                        name='name_visibility'
                        id='name_visibility'
                        options={availabilityStatuses}
                        style={{ width: STYLE_VALUES.RIGHT_COLUMN_WIDTH }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container mb={STYLE_VALUES.MARGIN_BOTTOM} height={STYLE_VALUES.LINE_HEIGHT}>
                  <Grid item xs={8}>
                    <Typography color='text.secondary'>Email</Typography>
                    <Field
                      component={TextField}
                      fullWidth
                      type='text'
                      name='email'
                      sx={{ width: STYLE_VALUES.LEFT_COLUMN_WIDTH }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Typography color='text.secondary'>Available to</Typography>
                    <Field
                      component={FormikAutocomplete}
                      name='email_visibility'
                      id='email_visibility'
                      options={availabilityStatuses}
                      style={{ width: STYLE_VALUES.RIGHT_COLUMN_WIDTH }}
                    />
                  </Grid>
                </Grid>
                <Grid container mb={STYLE_VALUES.MARGIN_BOTTOM} height={STYLE_VALUES.LINE_HEIGHT}>
                  <Grid item xs={8}>
                    <Typography color='text.secondary'>Phone</Typography>
                    <Field
                      component={TextField}
                      fullWidth
                      type='text'
                      name='phone'
                      sx={{ width: STYLE_VALUES.LEFT_COLUMN_WIDTH }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Typography color='text.secondary'>Available to</Typography>
                    <Field
                      component={FormikAutocomplete}
                      name='phone_visibility'
                      id='phone_visibility'
                      options={availabilityStatuses}
                      sx={{ width: STYLE_VALUES.RIGHT_COLUMN_WIDTH }}
                    />
                  </Grid>
                </Grid>
                <Grid container mb={STYLE_VALUES.MARGIN_BOTTOM} height={STYLE_VALUES.LINE_HEIGHT}>
                  <Grid item xs={8}>
                    <Typography color='text.secondary'>University</Typography>
                    <Field
                      component={FormikAutocomplete}
                      name='university'
                      id='university'
                      options={universities}
                      style={{ width: STYLE_VALUES.LEFT_COLUMN_WIDTH }}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Typography color='text.secondary'>Available to</Typography>
                    <Field
                      component={FormikAutocomplete}
                      name='university_visibility'
                      id='university_visibility'
                      options={availabilityStatuses}
                      style={{ width: STYLE_VALUES.RIGHT_COLUMN_WIDTH }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    {showCancel && <ThemeProvider theme={theme}>
                      <Button sx={{ width: STYLE_VALUES.BUTTON_WIDTH }} onClick={onCancel} disabled={isSubmitting}
                        variant='outlined' color='neutral'>Cancel</Button>
                    </ThemeProvider>}
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Button sx={{ width: STYLE_VALUES.BUTTON_WIDTH }} type='submit' disabled={isSubmitting}
                      variant='contained'>Save</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

UserForm.propTypes = {
  title: PropTypes.string,
  availabilityStatuses: PropTypes.arrayOf(
    autocompleteOptionPropTypes
  ).isRequired,
  universities: PropTypes.arrayOf(
    autocompleteOptionPropTypes
  ).isRequired,
  onCancel: PropTypes.func,
  showCancel: PropTypes.bool,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    name_visibility: autocompleteOptionPropTypes,
    email: PropTypes.string,
    email_visibility: autocompleteOptionPropTypes,
    phone: PropTypes.string,
    phone_visibility: autocompleteOptionPropTypes,
    university: autocompleteOptionPropTypes,
    university_visibility: autocompleteOptionPropTypes
  }),
  theme: PropTypes.object,
  schema: PropTypes.object,
  onUserUpdate: PropTypes.func.isRequired,
  image: PropTypes.string,
  handleImageChange: PropTypes.func,
  setCropper: PropTypes.func,
  cropImage: PropTypes.func,
  croppedImage: PropTypes.string,
  deleteImage: PropTypes.func,
  userImage: PropTypes.string,
  resolveFirstLetterFrom: PropTypes.func
}

export default UserForm
