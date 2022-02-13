import * as yup from 'yup'
import { availabilityStatuses, theme, universities } from '../../constants'
import UserForm from '../../components/forms/userForm'
import { useMutation } from 'react-query'
import { updateUser } from '../user/api/usersCrud'
import PropTypes from 'prop-types'

const UserFormContainer = ({ userId, user, setUser, setIsEditing }) => {

  const mutation = useMutation((user) =>
    updateUser(userId, user),
  {
    onSuccess: (data, user) => {
      setUser(user)
      setIsEditing(false)
    }
  })

  const onUserUpdate = (values, { setSubmitting, resetForm }) => {

    const user = {
      name: values.name,
      name_visibility: values.name_visibility.value,
      email: values.email,
      email_visibility: values.email_visibility.value,
      phone: values.phone,
      phone_visibility: values.phone_visibility.value,
      university: values.university && values.university.value,
      university_visibility: values.university_visibility.value
    }
    mutation.mutate(user)
    resetForm()
    setSubmitting(false)
  }

  const stopEditionOnCancel = () => {
    setIsEditing(false)
  }

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    name_visibility: yup.object().required('Name availability status is required'),
    email: yup.string().email('Should be a valid email address').required('Email is required'),
    email_visibility: yup.object().required('Email availability status is required'),
    phone: yup.string().required('Phone is required').matches(/^[0-9]+$/, 'Phone should contain only digits')
      .min(10, 'Phone should contain 10 digits')
      .max(10, 'Phone should contain 10 digits'),
    phone_visibility: yup.object().required('Phone availability status is required'),
    university: yup.object(),
    university_visibility: yup.object(),
  })

  const defaultVisibilityStatusValue = availabilityStatuses
    .find(status => status.label.toLowerCase() === 'all');

  const initialValues = {
    name: user && user.name ? user.name : '',
    name_visibility: defaultVisibilityStatusValue,
    email: user && user.email ? user.email : '',
    email_visibility: defaultVisibilityStatusValue,
    phone: user && user.phone ? user.phone : '',
    phone_visibility: defaultVisibilityStatusValue,
    university: undefined,
    university_visibility: defaultVisibilityStatusValue
  }

  return <UserForm
    availabilityStatuses={availabilityStatuses}
    schema={schema}
    initialValues={initialValues}
    title={'Update profile'}
    theme={theme}
    universities={universities}
    onUserUpdate={onUserUpdate}
    showCancel={true}
    onCancel={stopEditionOnCancel}
  />
  
}

UserFormContainer.propTypes = {
  userId: PropTypes.string,
  user: PropTypes.object,
  setUser: PropTypes.func,
  setIsEditing: PropTypes.func
}

export default UserFormContainer
