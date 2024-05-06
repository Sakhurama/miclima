import React, { useState } from 'react';

const ContactForm = () => {
  // Utiliza el estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualiza el estado con los nuevos valores del formulario
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log(formData);
    // Limpia el formulario después de enviarlo
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label> <br></br>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      /> <br></br>

      <label htmlFor="email">Correo:  </label><br></br>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      /> <br></br>

      <label htmlFor="message">Mensaje:  </label> <br></br>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea> <br></br> <br></br>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;
