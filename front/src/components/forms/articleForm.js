import { Form, Formik, Field } from 'formik'
import Button from '@mui/material/Button'
import { TextField } from 'formik-mui'
import { Box, CardMedia, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import FormikAutocomplete from './FormikAutocomplete'
import { autocompleteOptionPropTypes } from '../../constants'
import { Cropper } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const ArticleForm = ({
  availabilityStatuses,
  schema,
  initialValues,
  theme,
  onArticleSubmit,
  onCancel,
  title,
  submitButtonText,
  showCancel,
  image,
  handleImageChange,
  setCropper,
  cropImage,
  croppedImage,
  deleteImage,
  userImage
}) => {

  const STYLE_VALUES = {
    WIDTH: 500,
    TEXT_AREA_HEIGHT: 170,
    NUMBER_OF_ROWS: 5,
    MARGIN_BOTTOM: 3,
    BUTTON_WIDTH: '50%'
  }

  return (
    <Box margin={5}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onArticleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Paper elevation={16}
              sx={{ p: 3, margin: 'auto', maxWidth: STYLE_VALUES.WIDTH, flexGrow: 1, textAlign: 'left' }}>
              <Grid container>
                <Grid item xs={12} mb={STYLE_VALUES.MARGIN_BOTTOM}>
                  <Typography variant='h4' component='div'>{title}</Typography>
                </Grid>
                
                <Grid item xs={12} mb={STYLE_VALUES.MARGIN_BOTTOM}>
                  <Box>
                    {userImage && <img src={`http://localhost:3090/files?img=${userImage}`}  alt='Article image' />}
                  </Box>
                  <Box>
                    {croppedImage && <CardMedia
                      component='img'
                      style={{
                        width: 'auto',
                        maxHeight: '200px',
                      }}
                      image={croppedImage}
                      alt='Article image'
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
                
                <Grid item xs={12} mb={STYLE_VALUES.MARGIN_BOTTOM} height={STYLE_VALUES.TEXT_AREA_HEIGHT}>
                  <Field
                    component={TextField}
                    multiline={true}
                    minRows={STYLE_VALUES.NUMBER_OF_ROWS}
                    maxRows={STYLE_VALUES.NUMBER_OF_ROWS}
                    fullWidth
                    label='Article text'
                    type='text'
                    name='article'
                    sx={{ width: STYLE_VALUES.WIDTH }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} mb={STYLE_VALUES.MARGIN_BOTTOM}>
                  <Field
                    component={FormikAutocomplete}
                    name='article_availability'
                    id='article_availability'
                    options={availabilityStatuses}
                    style={{ width: STYLE_VALUES.WIDTH }}
                    textFieldProps={{
                      label: 'Available to',
                      variant: 'outlined'
                    }}
                  />
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
                      variant='contained'>{submitButtonText}</Button>
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

ArticleForm.propTypes = {
  title: PropTypes.string.isRequired,
  availabilityStatuses: PropTypes.arrayOf(
    autocompleteOptionPropTypes
  ).isRequired,
  onCancel: PropTypes.func,
  showCancel: PropTypes.bool,
  initialValues: PropTypes.shape({
    article: PropTypes.string,
    article_availability: autocompleteOptionPropTypes
  }),
  theme: PropTypes.object,
  schema: PropTypes.object,
  onArticleSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  image: PropTypes.string,
  handleImageChange: PropTypes.func,
  setCropper: PropTypes.func,
  cropImage: PropTypes.func,
  croppedImage: PropTypes.string,
  deleteImage: PropTypes.func,
  userImage: PropTypes.string
}

export default ArticleForm
