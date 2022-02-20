import * as yup from 'yup'
import { availabilityStatuses, theme, universities } from '../../constants'
import UserForm from '../../components/forms/userForm'
import { useMutation } from 'react-query'
import { updateUser, updateUserAvatar } from '../user/api/usersCrud'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { dataUrlToFile } from '../../utils'

const UserFormContainer = ({ userId, user, setUser, setIsEditing, resolveFirstLetterFrom }) => {

  const [image, setImage] = useState()
  const [croppedImage, setCroppedImage] = useState()
  const [cropper, setCropper] = useState()

  const [imgFilename, setImgFilename] = useState('image.jpeg')

  const handleImageChange = e => {
    e.preventDefault()
    const file = e.target.files[0]

    if (file.type.match('image.*') && file.size < 10000000) {
      setImgFilename(file.name)
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      console.error('Wrong file format or size!')
    }
  }

  const cropImage = () => {
    if (typeof cropper !== 'undefined') {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL())
      setImage(null)
    }
  }

  const deleteImage = () => {
    setCroppedImage(null)
    setImage(null)
  }

  const mutation = useMutation((user) =>
    updateUser(userId, user),
  {
    onSuccess: (data, user) => {
      const updatedArticle = {
        name: user.name,
        name_visibility: user.nameVisibility,
        email: user.email,
        email_visibility: user.emailVisibility,
        phone: user.phone,
        phone_visibility: user.phoneVisibility,
        university: user.universityVisibility,
        university_visibility: user.universityVisibility
      }
      setUser(updatedArticle)
      setIsEditing(false)
    }
  })

  const avatarMutation = useMutation((avatar) =>
    updateUserAvatar(userId, avatar)
  )

  const onUserUpdate = (values, { setSubmitting, resetForm }) => {

    const userPayload = {
      name: values.name,
      nameVisibility: values.name_visibility.id,
      email: values.email,
      emailVisibility: values.email_visibility.id,
      phone: values.phone,
      phoneVisibility: values.phone_visibility.id,
      university: values.university && values.university.id,
      universityVisibility: values.university_visibility.id
    }
    mutation.mutate(userPayload)
    if (croppedImage) {
      avatarMutation.mutate({ avatar: dataUrlToFile(croppedImage, imgFilename)})
    }
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

  const availabilityStatusBy = (id) => {
    if (id) {
      return availabilityStatuses
        .find(status => status.id === id)
    } else {
      return defaultVisibilityStatusValue
    }
  }

  const initialValues = {
    name: user && user.name ? user.name : '',
    name_visibility: availabilityStatusBy(user && user.name_visibility ? user.name_visibility : undefined),
    email: user && user.email ? user.email : '',
    email_visibility: availabilityStatusBy(user && user.email_visibility ? user.email_visibility : undefined),
    phone: user && user.phone ? user.phone : '',
    phone_visibility: availabilityStatusBy(user && user.phone_visibility ? user.phone_visibility : undefined),
    university: undefined,
    university_visibility: availabilityStatusBy(user && user.university_visibility ? user.university_visibility : undefined)
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
    image={image}
    handleImageChange={handleImageChange}
    setCropper={setCropper}
    cropImage={cropImage}
    croppedImage={croppedImage}
    deleteImage={deleteImage}
    userImage={user?.avatar_id ? `http://localhost:3090/avatars/${user.avatar_id}/img` : undefined}
    resolveFirstLetterFrom={resolveFirstLetterFrom}
  />
  
}

UserFormContainer.propTypes = {
  userId: PropTypes.string,
  user: PropTypes.object,
  setUser: PropTypes.func,
  setIsEditing: PropTypes.func,
  resolveFirstLetterFrom: PropTypes.func
}

export default UserFormContainer
