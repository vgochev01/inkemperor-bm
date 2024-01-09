import { faUser, faLock, faEnvelope, faUserTag } from '@fortawesome/free-solid-svg-icons';

const userFormFields = (data, mode) => {
  const fields = [
    {
      controlId: 'email',
      name: 'email',
      label: 'Email',
      icon: faEnvelope,
      type: 'email',
      placeholder: 'Enter email',
      required: true,
    },
    {
      controlId: 'username',
      name: 'username',
      label: 'Username',
      icon: faUser,
      type: 'text',
      placeholder: 'Enter username',
      required: true,
    },
    {
      controlId: 'password',
      name: 'password',
      label: 'Password',
      icon: faLock,
      type: 'password',
      placeholder: 'Password',
      required: true
    },
    {
      controlId: 'userRole',
      name: 'userRole',
      label: 'User Role',
      icon: faUserTag,
      type: 'select',
      options: [
        { value: 'owner', text: 'Owner' },
        { value: 'artist', text: 'Artist' },
        { value: 'subscriber', text: 'Subscriber' }
      ],
      placeholder: 'Select User Role',
      required: true,
    }
  ];

  return mode === 'login' ? fields.filter(field => ['username', 'password'].includes(field.name)) : fields;
};

export default userFormFields;
