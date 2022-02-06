import { Form, Formik, Field } from 'formik'
import Button from '@mui/material/Button'
import { Select, TextField } from 'formik-mui'
import { Box, FormControl, Grid, MenuItem, Paper, ThemeProvider, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const ArticleForm = ({availabilityStatuses, schema, initialValues, theme, onArticleSubmit, onCancel, title, submitButtonText, showCancel}) => {

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
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Paper elevation={16} sx={{ p: 3, margin: 'auto', maxWidth: STYLE_VALUES.WIDTH, flexGrow: 1, textAlign: 'left' }}>
              <Grid container>
                <Grid item xs={12} mb={STYLE_VALUES.MARGIN_BOTTOM}>
                  <Typography variant='h4' component='div'>{title}</Typography>
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
                  <FormControl>
                    <Field
                      component={Select}
                      type='text'
                      name='article_availability'
                      id='article_availability'
                      label='Available to'
                      sx={{ width: STYLE_VALUES.WIDTH }}
                    >
                      {availabilityStatuses && availabilityStatuses.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    {showCancel && <ThemeProvider theme={theme}>
                      <Button sx={{width: STYLE_VALUES.BUTTON_WIDTH}} onClick={onCancel} disabled={isSubmitting} variant='outlined' color='neutral'>Cancel</Button>
                    </ThemeProvider>}
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Button sx={{width: STYLE_VALUES.BUTTON_WIDTH}} type='submit' disabled={isSubmitting} variant='contained'>{submitButtonText}</Button>
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
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      label: PropTypes.string
    })).isRequired,
  onCancel: PropTypes.func,
  showCancel: PropTypes.bool,
  initialValues: PropTypes.shape({
    article: PropTypes.string,
    article_availability: PropTypes.string
  }),
  theme: PropTypes.object,
  schema: PropTypes.object,
  onArticleSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
}

export default ArticleForm
